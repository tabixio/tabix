import {
  antlr4ErrorLexer,
  antlr4ErrorParser,
  Antlr4ParserErrorCollector,
} from './antlr4ParserErrorCollector';
import { Token } from 'antlr4/Token';
import { SupportLanguage } from '../supportLanguage';
import { ClickhouseSQL, ClickhouseSQLParserListener } from './languages/ClickhouseSQL';
import IBaseAntlr4 from './languages/IBaseLanguage';
import * as monaco from 'monaco-editor';
import { RuleNode, ParseTreeListener } from 'antlr4/tree/Tree';
import { ParsedQuery } from './ParsedQuery';
// import antlr4 from 'antlr4';
// ts-mysql-parser,parser-listener.ts
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
  errors?: Antlr4ParserErrorCollector[];
  refs?: ReferenceMap;
}

function skipLeadingWhitespace(text: string, head: number, tail: number): number {
  while (head < tail && text[head] <= ' ') {
    head++;
  }
  return head;
}

interface ResultParseState {
  tokens: Array<QToken>;
  errors: Antlr4ParserErrorCollector[];
}

export interface QToken {
  treeText: string;
  counter: Map<string, number | undefined>;
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
  text: string;
  symbolic: string;
}

const nodeVisitor = <Result = void>(visitor: { visitNode: (node: RuleNode) => void }): any => ({
  visit: () => {
    //
  },
  visitTerminal: (node: any) => {
    // if (!node) { return; } console.info('child > > > ', node);
  },
  visitErrorNode: () => {
    //
  },
  visitChildren(node: any) {
    if (!node) {
      return;
    }
    visitor.visitNode(node);
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (child && child.children) {
        child.accept(this);
      } else {
        if (child && !child.children) {
          // visitor.visitNode(child);
        }
      }
    }
  },
});

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
    const states = this.splitStatements(input);
    if (!states.length) return null;
    states.forEach((st, index) => {
      const res = this.parseOneStatement(st.text);
      if (res.tokens.length) {
        states[index].refs = this.baseAntlr4.processTokens(res.tokens);
        states[index].isParsed = true;
        states[index].tokens = res.tokens;
        states[index].errors = res.errors;
      }
    });
    return new ParsedQuery(states);
  }

  /**
   * Use Antlr4 for parse, if parsed ok result ParsedQuery
   *
   * @param input
   */
  public parseOneStatement(input: string): ResultParseState {
    // ------------------------------------------------------------------------------------------------
    const lexer = this.baseAntlr4.createLexer(input + '\n');
    const parser = this.baseAntlr4.createParser(lexer);
    const tokensList: Array<QToken> = [];
    const errP = new antlr4ErrorParser();
    const errL = new antlr4ErrorLexer();
    // ------------------------------------------------------------------------------------------------
    // parser.buildParseTrees = true;
    parser.removeErrorListeners();
    lexer.removeErrorListeners();
    //
    lexer.addErrorListener(errL);
    parser.addErrorListener(errL);
    //
    parser.addParseListener(this.getParseListener());
    //
    const tokens: Token[] = lexer.getAllTokens();
    lexer.reset();
    //
    const proc = this.baseAntlr4.configuration().topStatements;
    const tree = parser[proc]();
    // --------- Base End
    const current_points: Map<string, number> = new Map();
    // @ts-ignore
    const symbolicNames = parser.getSymbolicNames();
    // ------ fetch QTok ------------------------------------------------------------------------------
    tokens.forEach((tok: Token, index) => {
      tokensList.push({
        treeText: '',
        counter: new Map(),
        exception: [],
        invokingState: new Map(),
        ruleIndex: new Map(),
        channel: tok.channel,
        column: tok.column,
        line: tok.line,
        start: tok.start,
        stop: tok.stop,
        tokenIndex: index,
        type: tok.type,
        text: tok.text,
        symbolic: symbolicNames[tok.type],
      });
    });
    // ------------------------------------------------------------------------------------------------
    console.log('ParseTreeVisitor');
    // ParseTreeVisitor
    tree.accept(
      nodeVisitor({
        visitNode(ctx: any) {
          const name: string = ctx.constructor.name;
          let start: Token | null = null;
          let stop: Token | null = null;
          if (ctx.symbol) {
            start = ctx.symbol;
            stop = ctx.symbol;
          }
          if (ctx.start && ctx.stop) {
            start = ctx.start;
            stop = ctx.stop;
          }
          let exception = false;
          let invokingState = -1;
          let ruleIndex = -1;
          if (ctx.invokingState) {
            invokingState = ctx.invokingState;
          }
          if (ctx.ruleIndex) {
            ruleIndex = ctx.ruleIndex;
          }
          if (ctx.exception) {
            exception = true;
          }
          if (!start || !stop) {
            console.warn('EMPTY TAG`s', name, ctx, start, stop);
            return;
          }
          current_points.set(name, (current_points.get(name) ?? 0) + 1);
          // console.info('CXT', name, ctx, current_points);
          if (start && stop) {
            tokensList.forEach((tok: QToken, index) => {
              if (
                start &&
                stop &&
                tok.tokenIndex >= start.tokenIndex &&
                tok.tokenIndex <= stop.tokenIndex
              ) {
                // map.set("a", (map.get("a") ?? 0) + 1)
                tokensList[index].counter.set(name, current_points.get(name));

                if (exception) {
                  tokensList[index].exception.push(name);
                }
                if (invokingState >= 0) {
                  tokensList[index].invokingState.set(name, invokingState);
                }
                if (ruleIndex >= 0) {
                  tokensList[index].ruleIndex.set(name, ruleIndex);
                }
              } // if in `token`
            }); // tokensList loop
          } // have start & stop
        }, // visitNode
      }) // nodeVisitor
    ); // accept
    // Convert to string like `ColumnsExprColumnContext,ColumnExprAliasContext,IdentifierContext`
    tokensList.forEach(
      (t, i) => (tokensList[i].treeText = t.counter ? Array.from(t.counter.keys()).join(',') : '')
    );
    // ------------------------------------------------------------------------------------------------
    // ALL OK!
    return { tokens: tokensList, errors: [...errP.getErrors(), ...errL.getErrors()] };
  }

  public getParseListener(): ParseTreeListener {
    //
    return new ClickhouseSQLParserListener();
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

  //
  // public getParser(): antlr4.Parser {
  //   if (!this._parser) throw 'Error not set Parser';
  //   return this._parser;
  // }
  //
  // public getLexer(): antlr4.Lexer {
  //   if (!this._lexer) throw 'Error not set Lexer';
  //   return this._lexer;
  // }
  //
  // public getSymbolicNames(): any {
  //   const parser = this.getParser();
  //   // @ts-ignore
  //   parser.symbolicNames?.forEach((ruleName, index) => {
  //     // @ts-ignore
  //     const lit = parser.literalNames[index];
  //     // -- // --
  //     // console.log(index, ruleName, lit)
  //     // if (ruleName in lexer) {
  //     //  const index = lexer[ruleName as keyof typeof lexer];
  //   });
  // }
}
