import antlr4, { InputStream, CommonTokenStream, Lexer } from 'antlr4';
import { ClickHouseLexer, ClickHouseParser } from './clickhouse';
// ------------------------------------------------------------------------
// import { ConsoleParserErrorListener } from '../ParseErrors';
import CommonSQL from './CommonSQL';

export default class ClickhouseSQL extends CommonSQL {
  /**
   * Create Parser from SQL
   *
   * @param input String query
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
    return (<unknown>new ClickHouseLexer(chars)) as Lexer;
  }

  /**
   * Base function
   *
   */
  public processor(): string {
    return 'query';
  }
}
