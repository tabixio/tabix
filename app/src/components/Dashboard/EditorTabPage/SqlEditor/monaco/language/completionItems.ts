// import monacoEditor, { Position, Uri } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import { ServerStructure } from 'services';
import {
  language as languageClickhouse,
} from './Clickhouse';
import monacoEditor, {languages} from "monaco-editor";

type tMonaco = typeof monaco;
type IReadOnlyModel = monaco.editor.IReadOnlyModel;
// type IPosition = monacoEditor.Position;
// type CompletionList = typeof monacoEditor.languages.CompletionList;
// type CompletionItem = typeof monacoEditor.languages.CompletionItem;
// type ProviderResult = monacoEditor.languages.ProviderResult;

// ------------------------------------------------------------------------------------------------------------
// Examples:
// https://github.com/microsoft/azuredatastudio/tree/main/extensions/sql/syntaxes
// https://github.com/microsoft/vscode/tree/main/extensions/sql
// https://github.com/microsoft/vscode-mssql/blob/main/syntaxes/SQL.plist
// https://github.com/ultram4rine/sqltools-clickhouse-driver/blob/master/src/ls/driver.ts
// https://github.com/ultram4rine/sqltools-clickhouse-driver/blob/master/src/ls/keywords.ts
// https://github.com/mtxr/vscode-sqltools/tree/dev/packages
// https://github.com/joe-re/sql-language-server
// https://mono.software/2017/04/11/custom-intellisense-with-monaco-editor/
// https://github.com/DTStack/monaco-sql-languages
// https://github.com/DTStack/dt-sql-parser#readme
// https://github.com/raycursive/monaco-sql-parser
// https://github.com/DiscoverForever/monaco-sqlpad/blob/master/src/core/snippets.js
// https://github.com/DTStack/molecule

// ------------------------------------------------------------------------------------------------------------
// const globalMonaco: Monaco = window.monaco;

// export const globalEditorsMap = new WeakMap<monaco.Uri, SqlEditor>();
export abstract class ClickhouseCompletion {
  static completionItems: Array<monacoEditor.languages.CompletionItem> = [];
  static serverStructure: ServerStructure.Server;
  static languageCH:any;
  public static updateGlobalProviderLink()
  {
    console.info('updateGlobalProviderLink Dispose');
    // Dispose
    // hack: link to window, need for react-hotload,or reload
    // когда hotReload или обновление структуры нужно удалить через dispose() созданные элементы
    if (!window.monacoGlobalProvider) {
      window.monacoGlobalProvider = {
        completionProvider: null,
        tokensProvider: null,
      };
    } else {
      // Если
      if (window.monacoGlobalProvider.tokensProvider) {
        window.monacoGlobalProvider.tokensProvider.dispose();
      }
      if (window.monacoGlobalProvider.completionProvider) {
        window.monacoGlobalProvider.completionProvider.dispose();
      }
    }
  }
  public static applyServerStructure(
    serverStructure: ServerStructure.Server,
    thisMonaco:tMonaco
  )
  {
    this.serverStructure = serverStructure;
    this.updateGlobalProviderLink();
    let language: any = languageClickhouse;
    language.builtinFunctions = [];

    // ----- push databases and tables
    serverStructure.databases.forEach((db: ServerStructure.Database) => {
      // Completion:Tables
      db.tables.forEach((table: ServerStructure.Table) => {
        // highlight tables and databases
        language.dbtables.push(`${table.database}.${table.insertName}`);
        language.dbtables.push(`${table.database}.${table.insertName.replace(/"/g, '`')}`);
        language.tables.push(`${table.insertName}`);
        language.tables.push(`${db.name}`);

        table.columns.forEach((column: ServerStructure.Column) => {
          // col highlingts
          language.fields.push(`${table.insertName}.${column.name}`);
          // language.fields.push(`${column.name}`);
        });
      });
    });
    // Add Functions
    if (serverStructure.editorRules) {
      serverStructure.editorRules.builtinFunctions.forEach((func: any) => {
        language.builtinFunctions.push(func.name);
      });
    }
    this.languageCH=language;
    // todo: add Dispose interface
    window.monacoGlobalProvider.tokensProvider = thisMonaco.languages.setMonarchTokensProvider(
      'clickhouse',
      language as any
    );



return;
    // serverStructure.databases.forEach((db: ServerStructure.Database) => {
    //   // Completion:dbName
    //   completionItems.push({
    //     label: db.name,
    //     insertText: db.name,
    //     kind: globalMonaco.languages.CompletionItemKind.Reference,
    //     detail: `database`,
    //     range:null
    //
    //   });
    //   // Completion:Tables
    //   db.tables.forEach((table: ServerStructure.Table) => {
    //     // table
    //     completionItems.push({
    //       label: table.name,
    //       insertText: `${table.database}.${table.insertName}`,
    //       kind: globalMonaco.languages.CompletionItemKind.Interface,
    //       detail: `table:${table.engine}`,
    //       documentation: table.id,
    //     });
    //
    //     completionItems.push({
    //       label: `${table.database}.${table.insertName}`,
    //       insertText: `${table.database}.${table.insertName}`,
    //       kind: globalMonaco.languages.CompletionItemKind.Interface,
    //       detail: `table:${table.engine}`,
    //       documentation: table.id,
    //     });
    //
    //     // highlight tables and databases
    //     languageSettings.dbtables.push(`${table.database}.${table.insertName}`);
    //     languageSettings.dbtables.push(`${table.database}.${table.insertName.replace(/"/g, '`')}`);
    //     languageSettings.tables.push(`${table.insertName}`);
    //     languageSettings.tables.push(`${db.name}`);
    //
    //     table.columns.forEach((column: ServerStructure.Column) => {
    //       // col highlingts
    //       languageSettings.fields.push(`${table.insertName}.${column.name}`);
    //       languageSettings.fields.push(`${column.name}`);
    //     });
    //   });
    // });

    console.info("Update Editor Structure");
    const languageSettings = languageClickhouse;
    languageSettings.builtinFunctions = [];




    thisMonaco.languages.setMonarchTokensProvider( 'clickhouse', languageSettings );

    console.warn("updateGlobalEditorStructure!",thisMonaco);
  }


  public static findCurrentTableFields(
    model: IReadOnlyModel,
    position: monaco.Position,
    context: monaco.languages.CompletionContext,
    token: monaco.CancellationToken,
    currentDatabase: string,
    serverStructure?: ServerStructure.Server
  ): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
    const completionItems: Array<monaco.languages.CompletionItem> = [];
    // const sqlEditor = globalEditorsMap.get(model.uri);
    // if (
    //   !(
    //     sqlEditor &&
    //     sqlEditor.props &&
    //     sqlEditor.props.currentDatabase &&
    //     sqlEditor.props.serverStructure
    //   )
    // ) {
    // console.error('sqlEditor.props.currentDatabase is empty');
    console.log('completionItemscompletionItems');


    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    completionItems.push({
      label: 'column-name',
      insertText: `{column.name}`,
      kind: monaco.languages.CompletionItemKind.Reference,
      detail: `{column.type} in {column.table}`,
      range,
    });
    // ---------------------------------------------------------------------------
    // push to completionItems: databases and tables
    if (this.serverStructure.databases)
    {
      this.serverStructure.databases.forEach((db: ServerStructure.Database) => {
        // Completion:dbName
        completionItems.push({
          label: db.name,
          insertText: db.name,
          kind: monaco.languages.CompletionItemKind.Reference,
          detail: `database`,
          range
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
            range
          });

          completionItems.push({
            label: `${table.database}.${table.insertName}`,
            insertText: `${table.database}.${table.insertName}`,
            kind: monaco.languages.CompletionItemKind.Interface,
            detail: `table:${table.engine}`,
            documentation: table.id,
            range
          });
        });
      });
    }
    // ---------------------------------------------------------------------------
    // push to completionItems: builtinFunctions & Dictionaries
    if (this.serverStructure.editorRules) {
      this.serverStructure.editorRules.builtinFunctions.forEach((func: any) => {
        completionItems.push(
          // interface CompletionItem
          {
            //  {name: "isNotNull", isaggr: 0, score: 101, comb: false, origin: "isNotNull"}
            label: func.name,
            insertText: `${func.name}(`,
            kind: monaco.languages.CompletionItemKind.Method,
            sortText: `fun ${func.name}`,
            detail: `function`,
            range
          }
        );
      });
      // ----- push to completionItems: Dictionaries
      this.serverStructure.editorRules.dictionaries.forEach((dic: any) => {
        completionItems.push({
          label: dic.title,
          insertText: `${dic.dic}`,
          kind: monaco.languages.CompletionItemKind.Snippet,
          detail: `dic ${dic.dic}`,
          range
        });
      });
    }
    // ---------------------------------------------------------------------------
    // push to completionItems: languageClickhouse

    const keywords = [...this.languageCH.keywordsGlobal, ...this.languageCH.keywords];
    if (keywords.length) {
      keywords.forEach((word: string) => {
        completionItems.push({
          label: word,
          insertText: word,
          sortText: `000 ${word}`,
          kind: monaco.languages.CompletionItemKind.Keyword,
          range
        });
      });
    }

    if (this.languageCH.drawCommands) {
      this.languageCH.drawCommands.forEach((word: string) => {
        completionItems.push({
          label: word,
          insertText: word,
          kind: monaco.languages.CompletionItemKind.Color,
          sortText: `zzz ${word}`,
          range
        });
      });
    }
    if (this.languageCH.typeKeywords) {
      this.languageCH.typeKeywords.forEach((word: string) => {
        completionItems.push({
          label: word,
          insertText: word,
          kind: monaco.languages.CompletionItemKind.Property,
          sortText: `zzz ${word}`,
          range
        });
      });
    }
    if (this.languageCH.builtinVariables) {
      this.languageCH.builtinVariables.forEach((word: string) => {
        completionItems.push({
          label: word,
          insertText: word,
          kind: monaco.languages.CompletionItemKind.Variable,
          sortText: `var ${word}`,
          range
        });
      });
    }

    // ---------------------------------------------------------------------------


    return { suggestions: completionItems };
    // console.warn('sqlEditor', sqlEditor);
    // return { suggestions: completionItems };
    // }
    //   const selectDB: string = sqlEditor.props.currentDatabase;
    //   let currentListTables: Array<Array<string>> = [];
    //   // ------------------------------------------------------------------------------------------------
    //   // Try tokenize Text
    //   const queryes: Array<Query> = sqlEditor.tokenizeModel(model, position);
    //   if (queryes && queryes.length) {
    //     // if tokenize = true
    //     // find inCursor=true, fetch all tokens - find  type: "keyword.dbtable.sql" => push to currentListTables
    //     currentListTables = [];
    //     queryes.forEach((query: Query) => {
    //       // if query under cursor find databases & tables
    //       if (!query.inCursor) return;
    //       // @ts-ignore
    //       query.tokens.forEach(oToken => {
    //         console.info('token', oToken);
    //         if (['keyword.dbtable.sql', 'keyword.table.sql'].indexOf(oToken.type) !== -1) {
    //           let [db, table] = oToken.text
    //             .toUpperCase()
    //             .trim()
    //             .split('.') // @todo : need regexp
    //             // @ts-ignore
    //             .map(x => x.trim().replace('`', ''));
    //           // if find only table name -> use selectDB as DB
    //           if (!table && db) {
    //             table = db;
    //             db = selectDB;
    //           }
    //           // push
    //           if (!currentListTables[db]) currentListTables[db] = [];
    //           currentListTables[db].push(table);
    //         }
    //       });
    //     });
    //   }
    //   console.log('queryes', queryes);
    //   if (currentListTables) console.log('Find database & tables', currentListTables);
    //   // ------------------------------------------------------------------------------------------------
    //   // add items to Completion:Tables
    //   sqlEditor.props.serverStructure.databases.forEach((db: ServerStructure.Database) => {
    //     if (!currentListTables && db.name !== selectDB) return;
    //     if (!currentListTables[db.name.toUpperCase()]) return;
    //     db.tables.forEach((table: ServerStructure.Table) => {
    //       if (
    //         currentListTables &&
    //         currentListTables[db.name.toUpperCase()] &&
    //         currentListTables[db.name.toUpperCase()].indexOf(table.name.toUpperCase()) === -1
    //       ) {
    //         // skip tables & databases if not in `query`
    //         return;
    //       }
    //       console.log('Load items:', db.name, table.name);
    //       table.columns.forEach((column: ServerStructure.Column) => {
    //         completionItems.push({
    //           label: column.name,
    //           insertText: `${column.name}`,
    //           kind: globalMonaco.languages.CompletionItemKind.Reference,
    //           detail: `${column.type} in ${column.table}`,
    //         });
    //       });
    //     });
    //   });
    // return { suggestions: completionItems };
  }





}

// 0: "Method"
// 1: "Function"
// 2: "Constructor"
// 3: "Field"
// 4: "Variable"
// 5: "Class"
// 6: "Struct"
// 7: "Interface"
// 8: "Module"
// 9: "Property"
// 10: "Event"
// 11: "Operator"
// 12: "Unit"
// 13: "Value"
// 14: "Constant"
// 15: "Enum"
// 16: "EnumMember"
// 17: "Keyword"
// 18: "Text"
// 19: "Color"
// 20: "File"
// 21: "Reference"
// 22: "Customcolor"
// 23: "Folder"
// 24: "TypeParameter"
// 25: "User"
// 26: "Issue"
// 27: "Snippet"