// Use ts-ignore, because is native js code
// @ts-ignore
import { Token, Recognizer, InputStream, CommonTokenStream, Lexer } from 'antlr4';
import { ErrorListener } from 'antlr4/error';
import { ClickHouseLexer } from './grammar/clickhouse/ClickHouseLexer.js';
// @ts-ignore
import { QueryContext, ClickHouseParser } from './grammar/clickhouse/ClickHouseParser.js';
// ------------------------------------------------------------------------
import { ConsoleParserErrorListener } from './ParseErrors';

export default class ClickhouseSQL {
  // extends BasicParser {

  /**
   *
   *
   * @param input String query
   */
  public createParser(input: string): ClickHouseParser {
    const lexer = this.createLexer(input);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ClickHouseParser(tokenStream);
    parser.buildParseTrees = true;
    return parser;
    // const listener = new ConsoleParserErrorListener();
    // console.warn('lexer',lexer);
    // console.info('tokenStream',tokenStream);
    // parser.removeErrorListeners();
    // parser.addErrorListener(listener);
    // parser.addErrorListener(new ParserErrorListener(errorListener));
    // console.info('parser',parser);
    // console.info('query',parser.query());
  }

  /**
   * Parse one query
   *
   * @param input String query
   * @param errors
   */
  public parse(input: string, errors: ErrorListener): QueryContext {
    const parser = this.createParser(input);
    parser.removeErrorListeners();
    parser.addErrorListener(errors);
    return parser.query();
  }

  /**
   * Create Lexer
   *
   * @param input String query
   */
  public createLexer(input: string): ClickHouseLexer {
    const chars = new InputStream(input); // Some Lexer only support uppercase token, So you need transform
    const lexer = (<unknown>new ClickHouseLexer(chars)) as Lexer;
    return lexer;
  }

  /**
   * Base function
   *
   */
  public processor(): string {
    return 'query';
  }
  // public getAllTokens(input: string): Token[] {
  //   return this.createLexer(input).getAllTokens();
  // };
  // /**
  //  * It convert tree to string, it's convenient to use in unit test.
  //  * @param string input
  //  */
  // public parserTreeToString(input: string): string {
  //   const parser = this.createParser(input);
  //   this._parser = parser;
  //
  //   const tree = parser.program();
  //   return tree.toStringTree(parser.ruleNames);
  // }
  //
  // /**
  //  * Get List-like style tree string
  //  * @param parserTree
  //  */
  // public toString(parserTree: any): string {
  //   return parserTree.toStringTree(this._parser.ruleNames);
  // }
  // public validate(input: string): ParserError[] {
  //   const lexerError = []; const syntaxErrors = [];
  //
  //   const parser = this.createParser(input);
  //   this._parser = parser;
  //
  //   parser.removeErrorListeners();
  //   parser.addErrorListener(new ParserErrorCollector(syntaxErrors));
  //
  //   parser.program();
  //
  //   return lexerError.concat(syntaxErrors);
  // }
}
