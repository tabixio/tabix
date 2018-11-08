import monacoEditor, { Position, Uri } from 'monaco-editor';
import { ServerStructure, Query } from 'services';
import SqlEditor from 'components/Dashboard/TabPage/SqlEditor';
import { DatabaseTables } from 'components/Dashboard/TabPage/SqlEditor/SqlEditor';

type IReadOnlyModel = monacoEditor.editor.IReadOnlyModel;
type Monaco = typeof monacoEditor;

const globalMonaco: Monaco = window.monaco;

export const globalEditorsMap = new WeakMap<Uri, SqlEditor>();

export function getCompletionItems(
  model: IReadOnlyModel,
  position: Position
): Array<monacoEditor.languages.CompletionItem> {
  const completionItems: Array<monacoEditor.languages.CompletionItem> = [];
  const sqlEditor = globalEditorsMap.get(model.uri);
  if (
    !(
      sqlEditor &&
      sqlEditor.props &&
      sqlEditor.props.currentDatabase &&
      sqlEditor.props.serverStructure
    )
  ) {
    console.error('sqlEditor.props.currentDatabase is empty');
    console.warn('sqlEditor', sqlEditor);
    return completionItems;
  }
  const selectDB: string = sqlEditor.props.currentDatabase;
  let currentListTables: Array<DatabaseTables> = [];
  const queryes: Array<Query> = sqlEditor.tokenizeModel(model, position);

  if (queryes && queryes.length) {
    // find inCursor=true, fetch all tokens - find  type: "keyword.dbtable.sql" => push to currentListTables
    currentListTables = [];
    queryes.forEach((query: Query) => {
      if (!query.inCursor) return;
      // @ts-ignore
      query.tokens.forEach(oToken => {
        if (['keyword.dbtable.sql', 'keyword.table.sql'].indexOf(oToken.type) !== -1) {
          let [db, table] = oToken.text
            .toUpperCase()
            .trim()
            .split('.') // @todo : need regexp
            // @ts-ignore
            .map(x => x.trim().replace('`', ''));

          if (!table && db) {
            table = db;
            db = '';
          }

          currentListTables.push({ db, table });
        }
      });
    });
  }
  // console.log('queryes', queryes);console.log(query.tokens);
  if (currentListTables.length) console.log('Find database & tables', currentListTables);
  // add items
  sqlEditor.props.serverStructure.databases.forEach((db: ServerStructure.Database) => {
    // Completion:Tables
    if (!currentListTables.length && db.name !== selectDB) return;

    // for (currentListTables in o ) { if not find return};

    db.tables.forEach((table: ServerStructure.Table) => {
      table.columns.forEach((column: ServerStructure.Column) => {
        // console.log('call.providerCompletionItems', selectDB, column);
        completionItems.push({
          label: column.name,
          insertText: `${column.name}`,
          kind: globalMonaco.languages.CompletionItemKind.Reference,
          detail: `${column.type} in ${column.table}`,
          // documentation: table.id,
        });
      });
    });
  });

  // const textUntilPosition = model.getValueInRange({
  //     startLineNumber: position.lineNumber,
  //     startColumn: 1,
  //     endLineNumber: position.lineNumber,
  //     endColumn: position.column
  // });
  // const [keyword, value] = textUntilPosition.split(':').map(x => x.trim());
  // const suggestions = keywords.get(keyword);
  //
  // if (suggestions) {
  //     return suggestions.values.map(x => ({
  //         label: x.name,
  //         kind: monaco.languages.CompletionItemKind.Enum,
  //         insertText: ` ${x.name}`,
  //         documentation: x.description,
  //         range: {
  //             startLineNumber: position.lineNumber,
  //             startColumn: keyword.length + 2,
  //             endLineNumber: position.lineNumber,
  //             endColumn: position.column
  //         }
  //     }));
  // }
  //
  // return Array.from(keywords.values()).map(property => ({
  //     label: property.name,
  //     kind: monaco.languages.CompletionItemKind.Property,
  //     documentation: property.description,
  //     insertText: `${property.name}: `
  // }));
  return completionItems;
}
