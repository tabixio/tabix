import monacoEditor from "monaco-editor";
import { ServerStructure } from 'services';
import * as monaco from "monaco-editor";

type tMonaco = typeof monaco;
type IReadOnlyModel = monaco.editor.IReadOnlyModel;

export abstract class SuggestionsMaker {
  static completionItems: Array<monacoEditor.languages.CompletionItem> = [];

  static serverStructure: ServerStructure.Server;

  static keywordsLang:any;

  public static setServerStructure(serverStructure: ServerStructure.Server, thisMonaco: tMonaco) {
    console.warn('setServerStructure',serverStructure);
    this.serverStructure = serverStructure;
  }

  public static getSuggestions(   model: IReadOnlyModel,
                                  position: monaco.Position,
                                  context: monaco.languages.CompletionContext,
                                  token: monaco.CancellationToken)
    : monaco.languages.ProviderResult<monaco.languages.CompletionList>
  // currentDatabase: string,
                                  // serverStructure?: ServerStructure.Server)
  {

    const completionItems: Array<monaco.languages.CompletionItem> = [];

    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };


    if (this.serverStructure?.databases) {
      this.serverStructure?.databases.forEach((db: ServerStructure.Database) => {
        // Completion:dbName
        completionItems.push({
          label: db.name,
          insertText: db.name,
          kind: monaco.languages.CompletionItemKind.Reference,
          detail: `database`,
          range,
        });
        // Completion:Tables
        db.tables.forEach((table: ServerStructure.Table) => {
          // table
          completionItems.push({
            label: table.name,
            insertText: `${table.database}.${table.insertName}`,
            kind: monaco.languages.CompletionItemKind.Interface,
            detail: `table:${table.engine}`,
            documentation: table.id,
            range,
          });

          completionItems.push({
            label: `${table.database}.${table.insertName}`,
            insertText: `${table.database}.${table.insertName}`,
            kind: monaco.languages.CompletionItemKind.Interface,
            detail: `table:${table.engine}`,
            documentation: table.id,
            range,
          });
        });
      });
    } // <-databases
    // push to completionItems: builtinFunctions & Dictionaries
    if (this.serverStructure?.editorRules) {
      this.serverStructure.editorRules.builtinFunctions?.forEach((func: any) => {
        completionItems.push(
          // interface CompletionItem
          {
            //  {name: "isNotNull", isaggr: 0, score: 101, comb: false, origin: "isNotNull"}
            label: func.name,
            insertText: `${func.name}(`,
            kind: monaco.languages.CompletionItemKind.Method,
            sortText: `fun ${func.name}`,
            detail: `function`,
            range,
          }
        );
      });
      // ----- push to completionItems: Dictionaries
      this.serverStructure.editorRules.dictionaries?.forEach((dic: any) => {
        completionItems.push({
          label: dic.title,
          insertText: `${dic.dic}`,
          kind: monaco.languages.CompletionItemKind.Snippet,
          detail: `dic ${dic.dic}`,
          range,
        });
      });
    } // <-editorRules
    // ---------------------------------------------------------------------------
    // push to completionItems: languageClickhouse
    //
    // const keywords = [...this.languageCH.keywordsGlobal, ...this.languageCH.keywords];
    // if (keywords.length) {
    //   keywords.forEach((word: string) => {
    //     completionItems.push({
    //       label: word,
    //       insertText: word,
    //       sortText: `000 ${word}`,
    //       kind: monaco.languages.CompletionItemKind.Keyword,
    //       range,
    //     });
    //   });
    // }

    if (!this.serverStructure) {
      console.warn('Not init serverStructure');
      return { suggestions: completionItems };
    }
    return { suggestions: completionItems };
  }
}