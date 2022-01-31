import { QToken, Statement, Reference, ReferenceType, TableReference } from './CommonSQL';
import { Token } from 'antlr4ts';
import { AbstractSQLTreeVisitor } from './languages/AbstractSQLTreeVisitor';

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
    const str = ``;
    // this.statements[st_num].visitor?.getTokens()?.forEach((t) => {
    //   str +=
    //     t.text + `\t\t[` + Array.from(t.counter.keys()).join(',') + `] (${t.start}:${t.stop})  \n`;
    // });
    return str;
  }

  public getToken(offset: number): QToken | undefined {
    return this.getVisitor(offset)
      ?.getTokens()
      .find((st) => st.start <= offset && offset <= st.stop);
  }

  public info(off: number): string {
    const res = 'Token:`' + JSON.stringify(this.getToken(off)?.context);
    const st = this.getStatementAtOffset(off);
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

  public getVisitor(offset: number): AbstractSQLTreeVisitor<any> | undefined {
    return this.getStatementAtOffset(offset)?.visitor;
  }

  public getTokens(): Array<QToken> {
    return [];
    // if (!this.tokensList) throw 'Can`t get tokens';
    // return this.tokensList;
  }

  //
  // public getTableReference(offset: number): Array<TableReference> | undefined {
  //   return this.getStatementAtOffset(offset)?.refs?.get(
  //     ReferenceType.TableRef
  //   ) as Array<TableReference>;
  // }

  public getTablesNames(offset: number): Array<string> | undefined {
    const v = this.getVisitor(offset);

    return [''];
    // console.info(this.getTableReference(offset));
    // return this.getTableReference(offset)?.map((r) => r.table);
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
