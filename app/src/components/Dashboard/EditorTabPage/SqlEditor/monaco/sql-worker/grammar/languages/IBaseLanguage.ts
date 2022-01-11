import antlr4 from 'antlr4/index';
import * as monaco from 'monaco-editor';
import { QToken, ReferenceMap } from '../CommonSQL';

export interface IBaseLanguageConfiguration {
  querySeparator: Array<string>; // Like [ `;;`, SEMICOLON ]
  topStatements: string; // `sql` Top-level statements
  // ALTER => [alterStmt,alterTableClause,createStmt,describeStmt,dropStmt,explainStmt,insertStmt,killStmt,systemStmt,truncateStmt,]
  // SELECT => [selectUnionStmt]
}

export default abstract class IBaseLanguage {
  abstract configuration(): IBaseLanguageConfiguration;

  abstract createParser(lexer: antlr4.Lexer): antlr4.Parser;

  abstract createLexer(input: string): antlr4.Lexer;

  // abstract getVisitor(): ParseTreeVisitor;

  abstract getLanguageConfiguration(): monaco.languages.LanguageConfiguration;

  abstract getIMonarchLanguage(): monaco.languages.IMonarchLanguage;

  abstract processTokens(tokens: Array<QToken>): ReferenceMap | undefined;

  protected unquote(text?: string): string {
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
}
