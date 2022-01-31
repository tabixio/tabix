import { antlr4ErrorLexer, antlr4ErrorParser, antlrErrorList } from './antlr4ParserErrorCollector';
import { SupportLanguage } from '../supportLanguage';
import { ClickhouseSQL } from './languages/ClickhouseSQL';
import IBaseAntlr4 from './languages/IBaseLanguage';
import * as monaco from 'monaco-editor';
import { ParsedQuery } from './ParsedQuery';
import { Token } from 'antlr4ts';
import { AbstractSQLTreeVisitor } from './languages/AbstractSQLTreeVisitor';

export interface Range {
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
}

export type ColumnRef = { tableId: string; columnId: string; isAssumed: boolean };

export type QuotableIdentifier = { name: string; quoted: boolean };

export class Column {
  readonly columnReferences: Array<ColumnRef> = [];

  constructor(
    readonly id: string,
    public label: string,
    readonly range?: Range,
    readonly data?: unknown,
    readonly isAssumed?: boolean
  ) {}
}

/**
 * Base relation class representing any relation in query: query itself, subquery, source table, CTE
 */
export abstract class Relation {
  constructor(
    readonly id: string,
    readonly columns: Array<Column>,
    readonly parent?: QueryRelation,
    readonly range?: Range
  ) {}

  findColumn(columnName: QuotableIdentifier): Column | undefined {
    return this.columns.find((c) =>
      columnName.quoted
        ? c.label == columnName.name
        : c.label.localeCompare(columnName.name, undefined, {
            sensitivity: 'accent',
          }) == 0
    );
  }

  resolveColumn(columnName: QuotableIdentifier): ColumnRef | undefined {
    const col = this.findColumn(columnName);
    const re =
      col !== undefined
        ? {
            tableId: this.id,
            columnId: col.id,
            isAssumed: false,
          }
        : undefined;
    // console.log(`resolveColumn ${columnName.name}`, re);
    return re;
  }
}

export interface TablePrimary {
  catalogName?: string;
  schemaName?: string;
  tableName: string;
  alias?: string;
  range?: Range;
}

/**
 * Relation representing source table.
 */
export class TableRelation extends Relation {
  constructor(
    id: string,
    readonly tablePrimary: TablePrimary,
    columns: Array<Column>,
    readonly isFetched: boolean,
    parent?: QueryRelation,
    range?: Range,
    readonly data?: unknown
  ) {
    super(id, columns, parent, range);
  }

  addAssumedColumn(columnName: QuotableIdentifier, range: Range): ColumnRef {
    const column = new Column(
      `column_${this.columns.length + 1}`,
      columnName.name,
      range,
      undefined,
      true
    );
    this.columns.push(column);
    // console.log(`addAssumedColumn[ ${columnName.name} ] `, this.columns);
    return { tableId: this.id, columnId: column.id, isAssumed: true };
  }
}

/** SQL clause where dependency occured. */
export type EdgeType = 'select' | 'from' | 'where' | 'group by' | 'order by' | 'having';

/**
 * Relation representing (sub-)query.
 */
export class QueryRelation extends Relation {
  // CTEs from this context
  ctes: Map<string, QueryRelation> = new Map();

  // relations for this context extracted from FROM
  relations: Map<string, Relation> = new Map();

  // sequence generator for columns in this context
  columnIdSeq = 0;

  currentClause?: string;

  currentColumnId?: string;

  columnReferences: Array<ColumnRef> = [];

  constructor(id: string, parent?: QueryRelation, range?: Range) {
    super(id, [], parent, range);
  }

  findLocalRelation(tableName: QuotableIdentifier): Relation | undefined {
    for (const rel of this.relations) {
      if (tableName.quoted) {
        if (rel[0] == tableName.name) return rel[1];
      } else {
        if (
          tableName.name.localeCompare(rel[0], undefined, {
            sensitivity: 'accent',
          }) == 0
        )
          return rel[1];
      }
    }

    return undefined;
  }

  findRelation(tableName: QuotableIdentifier): Relation | undefined {
    return this.findLocalRelation(tableName) ?? this.parent?.findRelation(tableName);
  }

  findCTE(tableName: QuotableIdentifier): Relation | undefined {
    for (const rel of this.ctes) {
      if (tableName.quoted) {
        if (rel[0] == tableName.name) return rel[1];
      } else {
        if (
          tableName.name.localeCompare(rel[0], undefined, {
            sensitivity: 'accent',
          }) == 0
        )
          return rel[1];
      }
    }

    return this.parent?.findCTE(tableName);
  }

  getCTENames(): string[] {
    const localCtes = Array.from(this.ctes.keys());
    if (this.parent !== undefined) {
      return localCtes.concat(this.parent.getCTENames());
    } else {
      return localCtes;
    }
  }

  resolveOrAssumeRelationColumn(
    columnName: QuotableIdentifier,
    range: Range,
    tableName?: QuotableIdentifier
  ): ColumnRef | undefined {
    // console.log(`resolveOrAssumeRelationColumn "${columnName?.name}" in table=${tableName?.name}`);
    if (tableName !== undefined) {
      const rel = this.findRelation(tableName);
      const col = rel?.resolveColumn(columnName);
      // console.log('ResolveCol [X1]', col, tableName);
      if (col === undefined && rel != undefined && rel instanceof TableRelation) {
        return rel.addAssumedColumn(columnName, range);
      }
      return col;
    } else {
      const tables: TableRelation[] = [];
      for (const r of this.relations) {
        const rel = r[1];
        // console.log('resolveColumn(columnName) [X2]', columnName);
        const col = rel.resolveColumn(columnName);
        if (col) {
          return col;
        }
        if (rel instanceof TableRelation) {
          tables.push(rel);
        }
      }

      const assumed = tables.filter((t) => !t.isFetched);
      if (assumed.length == 1) {
        return assumed[0].addAssumedColumn(columnName, range);
      } else if (tables.length == 1) {
        return tables[0].addAssumedColumn(columnName, range);
      }

      return undefined;
    }
  }

  getNextColumnId(): string {
    this.columnIdSeq++;
    return `column_${this.columnIdSeq}`;
  }
}

export type ReferenceContext =
  | 'fromClause'
  | 'whereClause'
  | 'withClause'
  | 'limitClause'
  | 'groupClause'
  | 'havingClause'
  | 'orderClause';

export enum ReferenceType {
  FunctionRef = 'FunctionRef',
  KeywordRef = 'KeywordRef',
  ColumnRef = 'ColumnRef',
  SchemaRef = 'SchemaRef',
  TableRef = 'TableRef',
  AliasRef = 'AliasRef',
  ValueRef = 'ValueRef',
}

export type Reference =
  | FunctionReference
  | KeywordReference
  | TableReference
  | ColumnReference
  | SchemaReference
  | AliasReference
  | ValueReference;

export type ReferenceMap = Map<string, Array<Reference>>;

interface KeywordReference {
  type: ReferenceType;
  keyword: string;
  start: number;
  stop: number;
}

export interface SchemaReference {
  type: ReferenceType;
  schema: string;
  start: number;
  stop: number;
}

export interface TableReference {
  type: ReferenceType;
  database?: string;
  aliasReference: AliasReference | null;
  table: string;
  start: number;
  stop: number;
}

export interface ColumnReference {
  type: ReferenceType;
  context: ReferenceContext | null;
  tableReference: TableReference | null;
  aliasReference: AliasReference | null;
  column: string;
  start: number;
  stop: number;
}

export interface AliasReference {
  type: ReferenceType;
  alias: string;
  start: number;
  stop: number;
}

export interface ValueReference {
  type: ReferenceType;
  context: ReferenceContext | null;
  columnReference: ColumnReference | null;
  dataType: string;
  value: string;
  start: number;
  stop: number;
}

export interface FunctionReference {
  type: ReferenceType;
  context: ReferenceContext | null;
  function: string;
  start: number;
  stop: number;
}

/** Statement represents a single query */
export interface Statement {
  text: string;
  start: number;
  stop: number;
  isParsed: boolean;
  tokens?: Array<QToken>;
  errors?: antlrErrorList[];
  refs?: ReferenceMap;
  visitor?: AbstractSQLTreeVisitor<any>;
}

function skipLeadingWhitespace(text: string, head: number, tail: number): number {
  while (head < tail && text[head] <= ' ') {
    head++;
  }
  return head;
}

export interface QToken {
  treeText: string;
  counter: Map<string, number | undefined>;
  context: Array<string>;
  exception: Array<string>;
  invokingState: Map<string, number>;
  ruleIndex: Map<string, number>;
  channel: number;
  column: number;
  line: number;
  start: number;
  stop: number;
  tokenIndex: number;
  type: number;
  text?: string;
  symbolic: string;
  up: number;
}

export default class CommonSQL {
  private language: SupportLanguage;
  private baseAntlr4: IBaseAntlr4;

  constructor(language: SupportLanguage) {
    if (language !== SupportLanguage.CLICKHOUSE) throw 'Language not support by parser';
    this.language = language;
    // @TODO: Support other language
    this.baseAntlr4 = new ClickhouseSQL();
  }

  /**
   * Parse one/many query
   *
   * @param input String query
   */
  public parse(input: string): ParsedQuery | null {
    console.log(`PARSE:"${input}"`);
    const states = this.splitStatements(input);
    if (!states.length) return null;
    states.forEach((st, index) => {
      const result = this.parseOneStatement(st.text);
      states[index].visitor = result.visitor;
      states[index].visitor?.getCurrentRelation();
      states[index].errors = result.errors;
      states[index].isParsed = true;

      // states[index].tokens = visitor.getTokens;
      //
      // if (res.tokens.length) {
      //   states[index].refs = this.baseAntlr4.processTokens(res.tokens);
      //   states[index].isParsed = true;
      //   states[index].tokens = res.tokens;
      //   states[index].errors = res.errors;
      // }
    });
    return new ParsedQuery(states);
  }

  /**
   * Use Antlr4 for parse, if parsed ok result ParsedQuery
   *
   * @param input
   */
  public parseOneStatement(input: string): any {
    const lexer = this.baseAntlr4.createLexer(input + '\n');
    const parser = this.baseAntlr4.createParser(lexer);
    const tokensList: Array<QToken> = [];
    const errP = new antlr4ErrorParser(lexer);
    const errL = new antlr4ErrorLexer(lexer);
    // ------------------------------------------------------------------------------------------------
    parser.buildParseTree = true;
    parser.removeErrorListeners();
    lexer.removeErrorListeners();
    //
    lexer.addErrorListener(errL);
    parser.addErrorListener(errP);
    //
    const visitor = this.baseAntlr4.getVisitor();
    const tokens: Token[] = lexer.getAllTokens();
    // ------ fetch QTok ---------------------------
    tokens.forEach((tok: Token, index) => {
      tokensList.push({
        treeText: '',
        counter: new Map(),
        exception: [],
        invokingState: new Map(),
        ruleIndex: new Map(),
        channel: tok.channel,
        column: tok.line,
        line: tok.line,
        start: tok.startIndex,
        stop: tok.stopIndex,
        tokenIndex: index,
        type: tok.type,
        text: tok.text,
        symbolic: '',
        up: 0,
        context: [],
      });
    });
    visitor.setTokenList(tokensList);
    lexer.reset();
    // -------------------------------------------
    const proc = this.baseAntlr4.configuration().topStatements;
    let tree: any;
    try {
      tree = parser[proc]();
      // GoTo visitor
      tree.accept(visitor);
    } catch (e) {
      console.error(e);
    }
    return { visitor: visitor, errors: [...errP.getErrors(), ...errL.getErrors()] };
  }

  /**
   * Result ParserRuleContext
   *
   */
  public parseDefault(): ParsedQuery | null {
    return this.parse(
      'SELECT DISTINCT sin(x) as si,cos(x) as co, (si+co) as pi, user_name FROM system.users WHERE user_name LIKE "%bad%" ORDER BY user_id LIMIT 40,12' +
        // 'SELECT sin(x) as si,cos(x) as co, (si+co) as pi;' +
        '\n' +
        'SELECT pings as pinga2a'
      // '\n\n' +
      // 'DROP TABLE sy.swqws;SELECT 1 as wewe'
    );
  }

  /**
   * Split a text of MySQL queries into multiple statements, optionally specifying the line break and delimiter.
   * Source from https://github.com/segmentio/ts-mysql-plugin
   *
   * @param text
   * @param lineBreak
   * @param delimiter
   * @returns Statement[]
   */
  public splitStatements(text: string, lineBreak?: string, delimiter?: string): Statement[] {
    lineBreak = lineBreak || '\n';
    delimiter = delimiter || ';';

    const statements: Statement[] = [];
    let delimiterHead = delimiter[0];
    const keywordPos = 0;
    const start = 0;
    let head = start;
    let tail = head;
    const end = head + text.length;

    // Set when anything else but comments were found for the current statement.
    let haveContent = false;

    while (tail < end) {
      switch (text[tail]) {
        // Possible multi line comment or hidden (conditional) command.
        case '/': {
          if (text[tail + 1] === '*') {
            tail += 2;
            const isHiddenCommand = text[tail] === '!';

            // eslint-disable-next-line no-constant-condition
            while (true) {
              while (tail < end && text[tail] !== '*') {
                tail++;
              }

              // Unfinished comment.
              if (tail === end) {
                break;
              } else {
                if (text[++tail] === '/') {
                  // Skip the slash too.
                  tail++;
                  break;
                }
              }
            }

            if (isHiddenCommand) {
              haveContent = true;
            }

            if (!haveContent) {
              // Skip over the comment.
              head = tail;
            }
          } else {
            tail++;
          }

          break;
        }
        // Possible single line comment.
        case '-': {
          const endChar = tail + 2;
          if (
            text[tail + 1] === '-' &&
            (text[endChar] === ' ' || text[endChar] === '\t' || text[endChar] === lineBreak)
          ) {
            // Skip everything until the end of the line.
            tail += 2;

            while (tail < end && text[tail] !== lineBreak) {
              tail++;
            }

            if (!haveContent) {
              head = tail;
            }
          } else {
            tail++;
          }

          break;
        }
        // MySQL single line comment.
        case '#': {
          while (tail < end && text[tail] !== lineBreak) {
            tail++;
          }

          if (!haveContent) {
            head = tail;
          }

          break;
        }
        case '"':
        case "'":
        case '`': {
          haveContent = true;
          const quote = text[tail++];

          while (tail < end && text[tail] !== quote) {
            // Skip any escaped character too.
            if (text[tail] === '\\') {
              tail++;
            }
            tail++;
          }

          // Skip trailing quote char if one was there.
          if (text[tail] === quote) {
            tail++;
          }

          break;
        }
        case 'd':
        case 'D': {
          haveContent = true;

          // Possible start of the keyword DELIMITER. Must be at the start of the text or a character,
          // which is not part of a regular MySQL identifier (0-9, A-Z, a-z, _, $, \u0080-\uffff).
          const previous = tail > start ? tail - 1 : 0;
          const isIdentifierChar =
            previous >= 0x80 ||
            (text[previous] >= '0' && text[previous] <= '9') ||
            (text[previous | 0x20] >= 'a' && text[previous | 0x20] <= 'z') ||
            text[previous] === '$' ||
            text[previous] === '_';

          if (tail === start || !isIdentifierChar) {
            let run = tail + 1;
            let kw = keywordPos + 1;
            let count = 9;

            while (count-- > 1 && (run++ | 0x20) === kw++);

            if (count === 0 && text[run] === ' ') {
              // Delimiter keyword found. Get the new delimiter (everything until the end of the line).
              tail = run++;
              while (run < end && text[run] !== lineBreak) {
                ++run;
              }

              delimiter = text.substring(tail, run - tail).trim();
              delimiterHead = delimiter;

              // Skip over the delimiter statement and any following line breaks.
              while (text[run] === lineBreak) {
                ++run;
              }
              tail = run;
              head = tail;
            } else {
              ++tail;
            }
          } else {
            ++tail;
          }

          break;
        }
        default: {
          if (text[tail] > ' ') {
            haveContent = true;
          }

          tail++;
          break;
        }
      }

      if (text[tail] === delimiterHead) {
        // Found possible start of the delimiter. Check if it really is.
        let count = delimiter.length;

        if (count === 1) {
          // Most common case. Trim the statement and check if it is not empty before adding the range.
          head = skipLeadingWhitespace(text, head, tail);
          if (head < tail) {
            statements.push({
              text: text.substring(head, tail),
              start: head,
              stop: tail,
              isParsed: false,
            });
          }
          head = ++tail;
          haveContent = false;
        } else {
          let run = tail + 1;
          let del = delimiterHead.length + 1;

          while (count-- > 1 && text[run++] === text[del++]);

          if (count === 0) {
            // Multi char delimiter is complete. Tail still points to the start of the delimiter.
            // Run points to the first character after the delimiter.
            head = skipLeadingWhitespace(text, head, tail);

            if (head < tail) {
              statements.push({
                text: text.substring(head, tail),
                start: head,
                stop: tail,
                isParsed: false,
              });
            }

            tail = run;
            head = run;
            haveContent = false;
          }
        }
      }
    }

    // Add remaining text to the range list.
    head = skipLeadingWhitespace(text, head, tail);

    if (head < tail) {
      statements.push({
        text: text.substring(head, tail),
        start: head,
        stop: tail,
        isParsed: false,
      });
    }

    return statements;
  }

  /**
   * Monaco editing configuration for the language
   */
  public getLanguageConfiguration(): monaco.languages.LanguageConfiguration {
    return this.baseAntlr4.getLanguageConfiguration();
  }

  /**
   * Monaco editing configuration for the language
   */
  public getIMonarchLanguage(): monaco.languages.IMonarchLanguage {
    return this.baseAntlr4.getIMonarchLanguage();
  }
}
