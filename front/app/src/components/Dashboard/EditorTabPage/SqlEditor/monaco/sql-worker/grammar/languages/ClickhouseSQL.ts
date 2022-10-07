import { ClickHouseLexer, ClickHouseParser, ClickHouseParserVisitor } from './CHSql';
import { CharStreams, Lexer, CommonTokenStream, Token, ANTLRInputStream } from 'antlr4ts';
import IBaseAntlr4, { IBaseLanguageConfiguration } from './IBaseLanguage';
import { ClickhouseSQLMonaco } from './ClickhouseSQL.editor';
import { ClickhouseSQLVisitor } from './ClickhouseSQLVisitor';
import * as monaco from 'monaco-editor';
import { AbstractSQLTreeVisitor } from './AbstractSQLTreeVisitor';
import { CodePointCharStream } from 'antlr4ts/CodePointCharStream';

// ------------------------------------------------------------------------
export class ClickhouseSQL extends IBaseAntlr4 {
  /**
   * Create Parser from SQL
   *
   * @param lexer
   */
  public createParser(lexer: Lexer): ClickHouseParser {
    return new ClickHouseParser(new CommonTokenStream(lexer));
  }

  /**
   * Create Lexer
   *
   * @param input String query
   */
  public createLexer(input: CodePointCharStream): ClickHouseLexer {
    // const chars = CharStreams.fromString(input); // Some Lexer only support uppercase token, So you need transform
    // return (<unknown>new ClickHouseLexer(chars)) as Lexer;
    return new ClickHouseLexer(input);
  }

  public getVisitor(): AbstractSQLTreeVisitor<any> {
    return new ClickhouseSQLVisitor();
  }

  /**
   * Base function
   *
   */
  public processor(): string {
    return 'sql';
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

interface Result {
  references: Array<string>;
  incomplete: Array<string>;
}
