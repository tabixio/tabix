import {
  QToken,
  Statement,
  Reference,
  ReferenceType,
  TableReference,
  ResultQueryStructure,
} from './CommonSQL';
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
  private debug = false;

  //
  constructor(statements: Statement[]) {
    this.statements = statements;
    this.statements.forEach((st) => {
      if (st.isDebug) this.debug = true;
    });
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

  public isDebug(): boolean {
    return this.debug;
  }

  public dumpTokens(st_num: number): string {
    const str = ``;
    // this.statements[st_num].visitor?.getTokens()?.forEach((t) => {
    //   str +=
    //     t.text + `\t\t[` + Array.from(t.counter.keys()).join(',') + `] (${t.start}:${t.stop})  \n`;
    // });
    return str;
  }

  public getVisitor(offset: number): AbstractSQLTreeVisitor<any> | undefined {
    return this.getStatementAtOffset(offset)?.visitor;
  }

  public getTokens(offset: number): Array<QToken> | undefined {
    return this.getVisitor(offset)?.getTokens();
    // if (!this.tokensList) throw 'Can`t get tokens';
    // return this.tokensList;
  }

  public getStatementNumAtOffset(offset: number): number | undefined {
    return this.statements.findIndex((st) => st.start <= offset && offset <= st.stop);
  }

  public getStatementAtOffset(offset: number): Statement | undefined {
    return this.statements.find((st) => st.start <= offset && offset <= st.stop);
  }

  public getToken(offset: number): QToken | undefined {
    return this.getVisitor(offset)?.getToken(offset);
  }

  public info(offset: number): string {
    let str = '```Info\n\n';
    str += 'Offset:' + offset + '\n';
    // str += '' + JSON.stringify(this.getVisitor(offset)?.getStructureData(offset)) + '\n';
    // str += 'Index:' + JSON.stringify(this.getToken(offset)?.tokenIndex) + '\n';
    str += 'text:' + JSON.stringify(this.getToken(offset)?.text) + '\n';
    str += 'clause:' + JSON.stringify(this.getToken(offset)?.clause) + '\n';
    str += 'context:' + JSON.stringify(this.getToken(offset)?.context) + '\n';
    str += 'clause:' + JSON.stringify(this.getToken(offset)?.link) + '\n';
    return str + '```';
  }

  public getStructureData(offset: number): ResultQueryStructure | undefined {
    return this.getVisitor(offset)?.getStructureData(offset);
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

  //
  // public getTableReference(offset: number): Array<TableReference> | undefined {
  //   return this.getStatementAtOffset(offset)?.refs?.get(
  //     ReferenceType.TableRef
  //   ) as Array<TableReference>;
  // }

  public getTablesNames(offset: number): any {
    return this.getVisitor(offset)?.getRelation(offset);
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
