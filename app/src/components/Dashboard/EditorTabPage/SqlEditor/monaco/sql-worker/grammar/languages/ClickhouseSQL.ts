import antlr4, { CommonTokenStream, InputStream } from 'antlr4';
import { ClickHouseLexer, ClickHouseParser } from './clickhouse';
import IBaseAntlr4, { IBaseLanguageConfiguration } from './IBaseLanguage';
// import { ParseTreeVisitor } from 'antlr4/tree/Tree';
import { ClickhouseSQLMonaco } from './ClickhouseSQL.editor';
import * as monaco from 'monaco-editor';
import {
  AliasReference,
  QToken,
  Reference,
  ReferenceContext,
  ReferenceMap,
  ReferenceType,
  TableReference,
} from '../CommonSQL';
import { ParseTreeListener } from 'antlr4/tree/Tree';
// import antlr4ParserErrorCollector from '../antlr4ParserErrorCollector';
// import { Token } from 'antlr4/Token';
// ------------------------------------------------------------------------
export class ClickhouseSQL extends IBaseAntlr4 {
  /**
   * Create Parser from SQL
   *
   * @param lexer
   */
  public createParser(lexer: antlr4.Lexer): ClickHouseParser {
    return new ClickHouseParser(new CommonTokenStream(lexer));
  }

  /**
   * Create Lexer
   *
   * @param input String query
   */
  public createLexer(input: string): ClickHouseLexer {
    const chars = new InputStream(input); // Some Lexer only support uppercase token, So you need transform
    // return (<unknown>new ClickHouseLexer(chars)) as Lexer;
    return new ClickHouseLexer(chars);
  }

  //
  // public getVisitor(): ParseTreeVisitor {
  //   return new ClickHouseParserVisitor();
  // }

  /**
   * Base function
   *
   */
  public processor(): string {
    return 'sql';
  }

  private _find_database_name(tokens: Array<QToken>): QToken | undefined {
    return tokens.find((q) =>
      q.treeText.includes('TableIdentifierContext,DatabaseIdentifierContext,IdentifierContext')
    );
  }

  private _find_table_name(tokens: Array<QToken>): QToken | undefined {
    return tokens.find((q) =>
      q.treeText.includes('TableExprIdentifierContext,TableIdentifierContext,IdentifierContext')
    );
  }

  private _find_table_alias(tokens: Array<QToken>): QToken | undefined {
    return tokens.find((q) => q.treeText.includes('TableExprAliasContext,IdentifierContext'));
  }

  private _table_context_reference(tableContext: Array<QToken>): TableReference | undefined {
    // if `tableName` = [TableExprIdentifierContext,TableIdentifierContext,IdentifierContext]
    // if `alias` = [TableExprAliasContext,IdentifierContext];
    // if `dbName` = TableIdentifierContext,DatabaseIdentifierContext,IdentifierContext
    const tb = this._find_table_name(tableContext);

    let ref: TableReference | undefined = undefined;
    if (!tb) {
      // WARN
      return undefined;
    }
    let alias: AliasReference | null = null;
    const db = this._find_database_name(tableContext);
    const al = this._find_table_alias(tableContext);

    if (al) {
      alias = {
        type: ReferenceType.TableRef,
        alias: this.unquote(al.text),
        start: al.start,
        stop: al.stop,
      };
    }

    const start: Array<number> = [];
    const stop: Array<number> = [];

    if (db) {
      start.push(db.start);
      stop.push(db.stop);
    }
    if (tb) {
      start.push(tb.start);
      stop.push(tb.stop);
    }
    if (al) {
      start.push(al.start);
      stop.push(al.stop);
    }
    ref = {
      type: ReferenceType.TableRef,
      database: db ? this.unquote(db.text) : undefined,
      table: this.unquote(tb.text),
      aliasReference: alias,
      start: Math.min(...start),
      stop: Math.max(...stop),
    };
    return ref;
  }

  public processTokens(tokens: Array<QToken>): ReferenceMap | undefined {
    //
    // COL_ALIAS  - ColumnsExprColumnContext,ColumnExprAliasContext,IdentifierContext
    // COL_NAME   - ColumnExprIdentifierContext,ColumnIdentifierContext,NestedIdentifierContext,IdentifierContext
    // DB_NAME    - TableExprIdentifierContext,TableIdentifierContext,DatabaseIdentifierContext,IdentifierContext
    // TABLE_NAME - TableExprIdentifierContext,TableIdentifierContext,IdentifierContext
    // ALIAS_TABLE- TableExprAliasContext,IdentifierContext
    // isSelect   - SelectUnionStmtContext,SelectStmtWithParensContext
    // FUNCTION   - ColumnExprFunctionContext,IdentifierContext
    // = 123 Num  - WhereClauseContext...LiteralContext,NumberLiteralContext
    // = '1' Str  - WhereClauseContext...ColumnExprLiteralContext,LiteralContext

    if (!tokens.length) return undefined;
    const resultReference: ReferenceMap = new Map<string, Array<Reference>>();
    //
    // ------------------------------- [dbName.]tbName as aliasName -----------------------------------
    //
    const tableContext: Array<QToken> = tokens.filter((q) => q.counter.has('JoinExprTableContext'));
    if (tableContext.length) {
      const tb = this._table_context_reference(tableContext);
      if (tb) {
        if (!resultReference.has(ReferenceType.TableRef))
          resultReference.set(ReferenceType.TableRef, []);
        resultReference.get(ReferenceType.TableRef)!.push(tb);
      }
    }

    //
    //
    //   SELECT	[] (0:5)
    //    *		  [,ColumnExprListContext,ColumnsExprAsteriskContext] (7:7)
    //   FROM		[,FromClauseContext] (9:12)
    //   tabl1	[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprIdentifierContext,TableIdentifierContext,IdentifierContext] (14:18)
    //   JOIN		[,FromClauseContext,JoinExprOpContext] (20:23)
    //   dbnname[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprIdentifierContext,TableIdentifierContext,DatabaseIdentifierContext,IdentifierContext] (25:31)
    //   .		  [,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprIdentifierContext,TableIdentifierContext] (32:32)
    //   tabl2	[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprIdentifierContext,TableIdentifierContext,IdentifierContext] (33:37)
    //   as		  [,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext] (39:40)
    //   tt2		[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,IdentifierContext] (42:44)
    //   USING	[,FromClauseContext,JoinExprOpContext,JoinConstraintClauseContext] (46:50)
    //   (		  [,FromClauseContext,JoinExprOpContext,JoinConstraintClauseContext] (52:52)
    //   key		[,FromClauseContext,JoinExprOpContext,JoinConstraintClauseContext,ColumnExprListContext,ColumnsExprColumnContext,ColumnExprIdentifierContext,ColumnIdentifierContext,NestedIdentifierContext,IdentifierContext,KeywordContext] (53:55)
    //    )		  [,FromClauseContext,JoinExprOpContext,JoinConstraintClauseContext] (56:56)
    //   JOIN		[,FromClauseContext,JoinExprOpContext] (58:61)
    //   (		  [,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext] (63:63)
    //   SELECT	[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext] (65:70)
    //   *		  [,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext,ColumnExprListContext,ColumnsExprAsteriskContext] (72:72)
    //   FROM		[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext] (74:77)
    //   db2		[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext,TableExprIdentifierContext,TableIdentifierContext,DatabaseIdentifierContext,IdentifierContext] (79:81)
    //    .		  [,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext,TableExprIdentifierContext,TableIdentifierContext] (82:82)
    //   tt2		[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext,TableExprIdentifierContext,TableIdentifierContext,IdentifierContext] (83:85)
    //   JOIN		[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext] (87:90)
    //   db3		[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext,TableExprIdentifierContext,TableIdentifierContext,DatabaseIdentifierContext,IdentifierContext] (92:94)
    //      .		[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext,TableExprIdentifierContext,TableIdentifierContext] (95:95)
    //   tb3		[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext,TableExprIdentifierContext,TableIdentifierContext,IdentifierContext] (96:98)
    //   USING	[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext,JoinConstraintClauseContext] (100:104)
    //   (		  [,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext,JoinConstraintClauseContext] (106:106)
    //   kkey		[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext,JoinConstraintClauseContext,ColumnExprListContext,ColumnsExprColumnContext,ColumnExprIdentifierContext,ColumnIdentifierContext,NestedIdentifierContext,IdentifierContext] (107:110)
    // )		    [,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext,JoinConstraintClauseContext] (111:111)
    // )		    [,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,TableExprSubqueryContext] (113:113)
    //   as		  [,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext] (115:116)
    //   jtb2		[,FromClauseContext,JoinExprOpContext,JoinExprTableContext,TableExprAliasContext,IdentifierContext] (118:121)
    //   USING	[,FromClauseContext,JoinExprOpContext,JoinConstraintClauseContext] (123:127)
    //   (		  [,FromClauseContext,JoinExprOpContext,JoinConstraintClauseContext] (129:129)
    //   kkey		[,FromClauseContext,JoinExprOpContext,JoinConstraintClauseContext,ColumnExprListContext,ColumnsExprColumnContext,ColumnExprIdentifierContext,ColumnIdentifierContext,NestedIdentifierContext,IdentifierContext] (130:133)
    // )		    [,FromClauseContext,JoinExprOpContext,JoinConstraintClauseContext] (134:134)
    return resultReference;

    //
    //
    //
    //
    //   // COL_ALIAS  - ColumnsExprColumnContext,ColumnExprAliasContext,IdentifierContext
    //   if (str.includes('ColumnsExprColumnContext,ColumnExprAliasContext,IdentifierContext')) {
    //     // const r: ColumnReference = {};
    //   }
    // });
  }

  public getReferenceContext(t: QToken): ReferenceContext | null {
    // To-Do: move to CH.parser()
    if (t.counter.has('WithClauseContext')) {
      return 'withClause';
    }
    if (t.counter.has('FromClauseContext')) {
      return 'fromClause';
    }
    if (t.counter.has('WhereClauseContext') || t.counter.has('PrewhereClauseContext')) {
      return 'whereClause';
    }
    if (t.counter.has('HavingClauseContext')) {
      return 'havingClause';
    }
    if (t.counter.has('OrderByClauseContext')) {
      return 'orderClause';
    }
    if (t.counter.has('LimitClauseContext') || t.counter.has('LimitByClauseContext')) {
      return 'limitClause';
    }
    // arrayJoinClause
    // windowClause
    // prewhereClause
    // orderByClause
    // limitByClause
    // settingsClause
    return null;
  }

  public configuration(): IBaseLanguageConfiguration {
    return { querySeparator: [';', ';;'], topStatements: 'sql' };
  }

  public getLanguageConfiguration(): monaco.languages.LanguageConfiguration {
    return ClickhouseSQLMonaco.configuration;
  }

  public getIMonarchLanguage(): monaco.languages.IMonarchLanguage {
    return ClickhouseSQLMonaco.language;
  }
}

export class ClickhouseSQLParserListener {
  visitTerminal(node: any) {}

  visitErrorNode(node: any) {}

  enterEveryRule(node: any) {}

  exitColumnsExprAsteriskContext(n: any) {
    console.log(n);
  }

  // exitEveryRule(node: any) {
  exitEveryRule(node: any) {
    // console.log(node);
  }

  exitFromClause(ctx: any) {
    console.log(ctx);
  }

  exitSelectStmt(ctx: any) {
    console.log(ctx);
  }

  exitJoinExprOp(ctx: any) {
    console.log(ctx);
  }
}
