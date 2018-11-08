import monacoEditor, { Position, Uri } from 'monaco-editor';
import { ServerStructure, Query } from 'services';
import SqlEditor from 'components/Dashboard/TabPage/SqlEditor';
// import { DatabaseTables } from 'components/Dashboard/TabPage/SqlEditor/SqlEditor';

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
  let currentListTables: Array<Array<string>> = [];
  // ------------------------------------------------------------------------------------------------
  // Try tokenize Text
  const queryes: Array<Query> = sqlEditor.tokenizeModel(model, position);
  if (queryes && queryes.length) {
    // if tokenize = true
    // find inCursor=true, fetch all tokens - find  type: "keyword.dbtable.sql" => push to currentListTables
    currentListTables = [];
    queryes.forEach((query: Query) => {
      // if query under cursor find databases & tables
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
          // if find only table name -> use selectDB as DB
          if (!table && db) {
            table = db;
            db = selectDB;
          }
          // push
          if (!currentListTables[db]) currentListTables[db] = [];
          currentListTables[db].push(table);
        }
      });
    });
  }
  // console.log('queryes', queryes);console.log(query.tokens);
  // if (currentListTables) console.log('Find database & tables', currentListTables);
  // ------------------------------------------------------------------------------------------------
  // add items to Completion:Tables
  sqlEditor.props.serverStructure.databases.forEach((db: ServerStructure.Database) => {
    if (!currentListTables && db.name !== selectDB) return;
    if (!currentListTables[db.name.toUpperCase()]) return;
    db.tables.forEach((table: ServerStructure.Table) => {
      if (
        currentListTables &&
        currentListTables[db.name.toUpperCase()] &&
        currentListTables[db.name.toUpperCase()].indexOf(table.name.toUpperCase()) === -1
      ) {
        // skip tables & databases if not in `query`
        return;
      }
      // console.log('Load items:', db.name, table.name);
      table.columns.forEach((column: ServerStructure.Column) => {
        completionItems.push({
          label: column.name,
          insertText: `${column.name}`,
          kind: globalMonaco.languages.CompletionItemKind.Reference,
          detail: `${column.type} in ${column.table}`,
        });
      });
    });
  });
  return completionItems;
}
