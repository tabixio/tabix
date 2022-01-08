import { Antlr4ParserErrorCollector } from './antlr4ParserErrorCollector';
import { Token } from 'antlr4';
import antlr4 from 'antlr4/index';
import { RuleNode } from 'antlr4/tree/Tree';
import { QToken } from './CommonSQL';

enum wew {
  QUERY = '__QueryStmt',
  SELECT = '__SelectUnionStmt',
  IDENT_COL = '__Identifier',
  IDENT_DB = '__IdentifierDB',
  // DDL - alter,create[db,event,index,function,table...],drop,rename,truncate
  // DML - select,insert,update,delete,replace,call,load

  // CH:DDL  - alterStmt,attachStmt,createStmt,dropStmt,killStmt,optimizeStmt,renameStmt,truncateStmt
  // CH:DML  - selectUnionStmt,insertStmt,optimizeStmt,
  // CH - checkStmt,describeStmt,existsStmt,explainStmt,setStmt,showStmt,systemStmt,useStmt,watchStmt
}

export class ParsedQuery {
  private tokensList: Array<QToken> | null;
  private process = {
    countQuery: 0,
  };

  constructor(tokensList: Array<QToken>, err: Antlr4ParserErrorCollector[]) {
    this.tokensList = tokensList;
    // https://github.com/contiamo/rhombic
    // https://github.com/elastic/kibana
    // https://github.com/adelsz/pgtyped
    // https://github.com/segmentio/ts-mysql-plugin
    // [Unfinished multiline comment | Unfinished ...] https://github.com/stevenmiller888/ts-mysql-parser/blob/master/src/listeners/lexer-error-listener.ts
    // https://github.com/cube-js/cube.js/blob/master/packages/cubejs-schema-compiler/src/parser/SqlParser.ts
    console.info('tokensList', tokensList);
    /**
     * Todo:
     * 0. Add LexerErrorListener
     * 1. getTableReference, identifier or dotIdentifier -> add [type: ReferenceType.TableRef]
     * 2. getColumnReference
     * 3. getNestedColumnRef
     *
     * x. untokenizedText - from errors, `untokenizedText = input.substring(column);`
     * x. Test like this https://github.com/stevenmiller888/ts-mysql-parser/blob/master/src/__tests__/statements.txt
     *
     */
    // ---------- Split Query ---------------
    try {
      this.splitQuery('QueryStmtContext'); // <!- if other lang
    } catch (e) {
      console.error('ParsedQuery -> splitQuery()', e);
    }
    // ---------- Search Table`s ---------------
    // ---------- Search DB names`s ---------------
    // ---------- Search Alias`s ---------------
    // ---------- Search Value`s ---------------
  }

  private splitQuery(SPLIT_QUERY_CONTEXT_NAME: string): void {
    let _counterSplitQuery = 0;
    const _listSplitQuery = [];
    let _startSplit: QToken | null = null;
    let _prev: QToken | null = null;
    this.tokensList?.forEach((q, index) => {
      const numQ = q.counter.get(SPLIT_QUERY_CONTEXT_NAME);
      if (numQ && numQ > _counterSplitQuery) {
        if (_startSplit && _prev) {
          _listSplitQuery.push({ start: _startSplit, stop: _prev });
        }
        _startSplit = q;
        _counterSplitQuery++;
      }
      _prev = q;
    });
    if (_startSplit && _prev) {
      _listSplitQuery.push({ start: _startSplit, stop: _prev });
    }
    this.process.countQuery = _listSplitQuery.length;
    console.info('_listSplitQuery', _listSplitQuery);
  }

  public getTableReference(): Array<string> {
    return [];
  }

  public getColumnReference(): Array<string> {
    return [];
  }

  public getAliasReference(): Array<string> {
    return [];
  }

  public getValueReference(): Array<string> {
    return [];
  }

  private unquote(text?: string): string {
    if (!text) {
      return '';
    }

    if (text.length < 2) {
      return text;
    }

    if (
      text.startsWith('"') ||
      text.startsWith('`') ||
      (text.startsWith("'") && text.startsWith(text[text.length - 1]))
    ) {
      return text.substr(1, text.length - 2);
    }

    return text;
  }

  public toString(): string {
    return '';
    // return this._parser.toStringTree();
  }

  // public canParse() {
  //   return !this.errors.length;
  // }
  //
  // public throwErrorsIfAny() {
  //   if (this.errors.length) {
  //     throw new UserError(
  //       `SQL Parsing Error:\n${this.errors.map(({ msg, column, line }) => `${line}:${column} ${msg}`).join('\n')}`
  //     );
  //   }
  // }
  public mapErrorToMonaco(): any {
    // return {
    //   from: CodeMirror.Pos(err.row, err.col),
    //   to: CodeMirror.Pos(err.row, err.col + 3),
    //   message: err.text,
    //   severity: 'error'
  }
}
