import { CharStreams, Lexer, Parser } from 'antlr4ts';
import * as monaco from 'monaco-editor';
// import { QToken, ReferenceMap } from '../CommonSQL';
// import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { AbstractSQLTreeVisitor } from './AbstractSQLTreeVisitor';
import { CodePointCharStream } from 'antlr4ts/CodePointCharStream';

export interface IBaseLanguageConfiguration {
  querySeparator: Array<string>; // Like [ `;;`, SEMICOLON ]
  topStatements: string; // `sql` Top-level statements
  // ALTER => [alterStmt,alterTableClause,createStmt,describeStmt,dropStmt,explainStmt,insertStmt,killStmt,systemStmt,truncateStmt,]
  // SELECT => [selectUnionStmt]
}

export default abstract class IBaseLanguage {
  abstract configuration(): IBaseLanguageConfiguration;

  abstract createParser(lexer: Lexer): Parser;

  abstract createLexer(input: CodePointCharStream): Lexer;

  abstract getVisitor(): AbstractSQLTreeVisitor<any>;

  abstract getLanguageConfiguration(): monaco.languages.LanguageConfiguration;

  abstract getIMonarchLanguage(): monaco.languages.IMonarchLanguage;

  // abstract processTokens(tokens: Array<QToken>): ReferenceMap | undefined;

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
