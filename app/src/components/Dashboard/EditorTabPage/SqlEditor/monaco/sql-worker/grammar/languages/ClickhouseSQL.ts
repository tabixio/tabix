import antlr4, { InputStream, CommonTokenStream, Lexer } from 'antlr4';
import { ClickHouseLexer, ClickHouseParser } from './clickhouse';
import IBaseAntlr4, { IBaseLanguageConfiguration } from './IBaseLanguage';
// import { ParseTreeVisitor } from 'antlr4/tree/Tree';
import { ClickhouseSQLMonaco } from './ClickhouseSQL.editor';
import * as monaco from 'monaco-editor';
// import antlr4ParserErrorCollector from '../antlr4ParserErrorCollector';
// import { Token } from 'antlr4/Token';
// ------------------------------------------------------------------------
export default class ClickhouseSQL extends IBaseAntlr4 {
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
