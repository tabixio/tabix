import {ErrorListener} from "antlr4/error";
import antlr4 from "antlr4/index";

export default abstract class CommonSQL {

  abstract processor(): string;

  abstract createParser(lexer: antlr4.Lexer): antlr4.Parser

  abstract createLexer(input: string): antlr4.Lexer

  private _lexer : antlr4.Lexer | undefined;

  private _parser: antlr4.Parser | undefined;

  /**
   * Parse one query
   *
   * @param input String query
   * @param errors
   */
  public parse(input: string, errors?: ErrorListener): antlr4.ParserRuleContext {
    const lexer = this.createLexer(input);
    const parser = this.createParser(lexer);
    this._parser=parser;
    this._lexer = lexer;
    parser.buildParseTrees = true;
    if (errors) {
      parser.removeErrorListeners();
      parser.addErrorListener(errors);
    }
    return parser[this.processor()]();
  }

  /**
   * Result ParserRuleContext
   *
   */
  public parseDefault(): antlr4.ParserRuleContext
  {
      return this.parse('SELECT 1 as a1');
  }

  public getParser(): antlr4.Parser
  {
    if (!this._parser) throw "Error not set Parser";
    return this._parser;
  }

  public getLexer(): antlr4.Lexer
  {
    if (!this._lexer) throw "Error not set Lexer";
    return this._lexer;
  }

  public getSymbolicNames():any
  {

    const parser=this.getParser();
    // @ts-ignore
    parser.symbolicNames?.forEach((ruleName,index) => {
      // @ts-ignore
      const lit = parser.literalNames[index];

      console.log(index,ruleName,lit);
      // if (ruleName in lexer) {
      //  const index = lexer[ruleName as keyof typeof lexer];
      });
  }
}