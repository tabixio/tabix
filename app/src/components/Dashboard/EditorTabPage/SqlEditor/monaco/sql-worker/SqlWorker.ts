import * as monaco from 'monaco-editor';
import { ServerStructure } from 'services';
import { SuggestionsMaker } from './SuggestionsMaker';
import { SupportLanguage } from './supportLanguage';
import { configurationClickhouse, languageClickhouse } from './editorConfig';
import { ClickhouseSQL, CommonSQL } from './grammar';
// import {VocabularyPack} from './lib/vocabularyPack';
type tMonaco = typeof monaco;

type IReadOnlyModel = monaco.editor.IReadOnlyModel;

export class SqlWorker {
  private serverStructure?: ServerStructure.Server;

  private languageWords: any;

  private parserMap: Map<string, CommonSQL>;

  constructor() {
    this.parserMap = new Map<string, CommonSQL>();
    // console.info("SqlWorker->create");
    //
  }

  //
  // private getTableCompletionSuggestions = (
  //   model: IReadOnlyModel,
  //   position: monaco.Position,
  //   context: monaco.languages.CompletionContext,
  //   token: monaco.CancellationToken
  // ): monaco.languages.ProviderResult<monaco.languages.CompletionList> =>
  //   // See monaco/lang/compl
  //   this.sqlWorker.getSuggestions(
  //     model,
  //     position,
  //     context,
  //     token,
  //     this.props.currentDatabase,
  //     this.props.serverStructure
  //   );
  public applyServerStructure(serverStructure: ServerStructure.Server, thisMonaco: tMonaco): void {
    this.serverStructure = serverStructure;
    SuggestionsMaker.setServerStructure(serverStructure, thisMonaco);
  }

  private getParserANTLR(language: SupportLanguage): CommonSQL | undefined {
    if (!this.parserMap.has(language)) {
      // @TODO: Support other lang
      this.parserMap.set(language, new ClickhouseSQL());
    }
    return this.parserMap.get(language);
  }

  public register(language: SupportLanguage, thisMonaco: tMonaco): void {
    console.info('register1');
    // thisMonaco.editor.getModel().id;
    this.registerLanguage(language, thisMonaco);
    this.registerCompletion(language, thisMonaco);
  }

  public getSuggestions(
    model: IReadOnlyModel,
    position: monaco.Position,
    context: monaco.languages.CompletionContext,
    token: monaco.CancellationToken
  ): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
    return SuggestionsMaker.getSuggestions(model, position, context, token);
  }

  /**
   * Add CompletionItemProvider
   * @param language
   * @param thisMonaco
   */
  private registerCompletion(language: SupportLanguage, thisMonaco: tMonaco): void {
    //
    const self = this;
    // this.addProvider(language,Completion) =
    thisMonaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: self.getSuggestions,
    });
  }

  /**
   * Register a tokens provider for the language
   *
   * @param language
   */
  private getLanguageConfiguration(
    language: SupportLanguage
  ): monaco.languages.LanguageConfiguration {
    return configurationClickhouse as monaco.languages.LanguageConfiguration;
  }

  /**
   * Set the editing configuration for the language
   *
   * @param language
   */
  private getIMonarchLanguage(language: SupportLanguage): monaco.languages.IMonarchLanguage {
    //   lexer?.ruleNames -> ['INDEX', 'INF', 'INJECTIVE', 'INNER', 'INSERT', 'INTERVAL', 'INTO', 'IS', ]
    //   lexer?.literalNames -> [null,....,"'+'","'?'"]
    //   lexer?.symbolicNames -> ['ADD', 'AFTER', 'ALIAS', 'ALL', 'ALTER', 'AND', 'ANTI', 'ANY']
    // languageWords
    // languageSettings.builtinFunctions = [];
    // .typeKeywords
    // .keywordsGlobal
    // .keywords
    // .

    const p = this.getParserANTLR(language);
    console.warn(' p p p p', language, p);

    if (p) {
      console.warn('parseDefault', p.parseDefault());
      console.warn('getLexer', p.getLexer());
      console.warn('getParser', p.getParser());
      console.warn('getSymbolicNames', p.getSymbolicNames());

      // const voc = new VocabularyPack(p.getLexer(),p.getParser());
      // console.info('VOC',voc);
      //
    }
    //  serverStructure.editorRules.builtinFunctions.forEach((func: any) => {
    //         languageSettings.builtinFunctions.push(func.name);

    // highlight tables and databases
    // languageSettings.dbtables.push(`${table.database}.${table.insertName}`);
    // languageSettings.dbtables.push(`${table.database}.${table.insertName.replace(/"/g, '`')}`);
    // languageSettings.tables.push(`${table.insertName}`);
    // languageSettings.tables.push(`${db.name}`);
    //
    // table.columns.forEach((column: ServerStructure.Column) => {
    //   // col highlingts
    //   languageSettings.fields.push(`${table.insertName}.${column.name}`);
    //   languageSettings.fields.push(`${column.name}`);
    // });
    let lang: monaco.languages.IMonarchLanguage;

    // if (language === SupportLanguage.CLICKHOUSE) {  // @TODO: Support other language

    lang = languageClickhouse as monaco.languages.IMonarchLanguage;

    // Merge

    //
    return lang;
  }

  private registerLanguage(language: SupportLanguage, thisMonaco: tMonaco): void {
    // Register a new language - add clickhouse
    thisMonaco.languages.register({ id: language, extensions: ['.sql'], aliases: ['chsql'] });
    // this.addProvider(language,Monarc) =
    thisMonaco.languages.setMonarchTokensProvider(language, this.getIMonarchLanguage(language));
    thisMonaco.languages.setLanguageConfiguration(
      language,
      this.getLanguageConfiguration(language)
    );
  }

  private getVariables(q: string): any {
    return [];
  }

  private getSymbolicName(): any {
    //
    return [];
  }

  private makeQueryId(): string {
    let text: string = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 9; i += 1)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text.toLocaleLowerCase();
  }

  private splitQuery(sql: string) {
    // AS
    //
  }
}
