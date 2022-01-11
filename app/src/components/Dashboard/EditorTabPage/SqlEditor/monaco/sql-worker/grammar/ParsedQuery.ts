import { QToken, Statement, Reference, ReferenceType, TableReference } from './CommonSQL';

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
  private statements: Statement[];
  private countStm = -1;

  //
  constructor(statements: Statement[]) {
    this.statements = statements;

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
  }

  public dumpTokens(st_num: number): string {
    let str = ``;
    this.statements[st_num].tokens?.forEach((t) => {
      str +=
        t.text + `\t\t[` + Array.from(t.counter.keys()).join(',') + `] (${t.start}:${t.stop})  \n`;
    });
    return str;
  }

  // private splitQuery(SPLIT_QUERY_CONTEXT_NAME: string): void {
  //   let _counterSplitQuery = 0;
  //   const _listSplitQuery = [];
  //   let _startSplit: QToken | null = null;
  //   let _prev: QToken | null = null;
  //   this.tokensList?.forEach((q, index) => {
  //     const numQ = q.counter.get(SPLIT_QUERY_CONTEXT_NAME);
  //     if (numQ && numQ > _counterSplitQuery) {
  //       if (_startSplit && _prev) {
  //         _listSplitQuery.push({ start: _startSplit, stop: _prev });
  //       }
  //       _startSplit = q;
  //       _counterSplitQuery++;
  //     }
  //     _prev = q;
  //   });
  //   if (_startSplit && _prev) {
  //     _listSplitQuery.push({ start: _startSplit, stop: _prev });
  //   }
  //   this.countStm = _listSplitQuery.length;
  //   this.splitStm = _listSplitQuery;
  // }

  public getToken(offset: number): QToken | undefined {
    return undefined;

    // return this.tokensList?.find((q) => q.start <= offset && offset <= q.stop);
  }

  public info(off: number): string {
    const res = '`' + this.getToken(off)?.text;
    return res + '`';
  }

  public isAsteriskSelect(): boolean {
    // if select * from - return true

    // if ColumnsExprAsteriskContext,QueryStmtContext,SelectUnionStmtContext - for CH
    return false;
  }

  public getCountOfStmt(): number {
    return this.statements.length;
  }

  public getTokensInRange(offStart: number, offStop: number): Array<QToken> | null {
    return null;
  }

  public getStatementNumAtOffset(offset: number): number | undefined {
    return this.statements.findIndex((st) => st.start <= offset && offset <= st.stop);
  }

  public getStatementAtOffset(offset: number): Statement | undefined {
    return this.statements.find((st) => st.start <= offset && offset <= st.stop);
  }

  public getTokens(): Array<QToken> {
    return [];
    // if (!this.tokensList) throw 'Can`t get tokens';
    // return this.tokensList;
  }

  public getTableReference(offset: number): Array<TableReference> | undefined {
    return this.getStatementAtOffset(offset)?.refs?.get(
      ReferenceType.TableRef
    ) as Array<TableReference>;
  }

  public getTablesNames(offset: number): Array<string> | undefined {
    console.info(this.getTableReference(offset));
    return this.getTableReference(offset)?.map((r) => r.table);
  }

  public getColumnReference(): Array<string> {
    return [];
  }

  public getAliasReference(offset: number): Array<string> {
    return [];
  }

  public getValueReference(): Array<string> {
    return [];
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
