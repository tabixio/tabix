//
//
import * as monaco from 'monaco-editor';
import { SupportLanguage } from './supportLanguage';
import {
  configuration as configurationClickhouse,
  language as languageClickhouse,
} from '../language/Clickhouse';

type tMonaco = typeof monaco;

export class SqlWorker {
  constructor() {
    //
  }

  public registerCompletion = (language: SupportLanguage, thisMonaco: tMonaco): void => {
    // Register second CompletionItemProvider
    thisMonaco.languages.registerCompletionItemProvider('clickhouse', {
      provideCompletionItems: this.getTableCompletionSuggestions,
    });
  };

  public registerLanguage = (language: SupportLanguage, thisMonaco: tMonaco): void => {
    // Register a new language - add clickhouse
    thisMonaco.languages.register({ id: language, extensions: ['.sql'], aliases: ['chsql'] });
    // Register a tokens provider for the language
    thisMonaco.languages.setMonarchTokensProvider(
      language,
      languageClickhouse as monaco.languages.IMonarchLanguage
    );
    // Set the editing configuration for the language
    thisMonaco.languages.setLanguageConfiguration(
      language,
      configurationClickhouse as monaco.languages.LanguageConfiguration
    );
  };

  public getVariables = (q: string): any =>
    // result array
    [];

  public getSymbolicNames = (): any =>
    // lexer?
    [];

  public makeQueryId = (): string => {
    let text: string = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 9; i += 1)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text.toLocaleLowerCase();
  };

  public splitQuery = (sql: string) => {
    // AS
  };
}
