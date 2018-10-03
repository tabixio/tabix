import React from 'react';
import { observer } from 'mobx-react';
import MonacoEditor from 'react-monaco-editor';
import monacoEditor from 'monaco-editor';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import { Omit } from 'typelevel-ts';
import { ServerStructure } from 'services';
import { languageDef, configuration } from './Clickhouse';
import Toolbar, { Props as ToolbarProps } from './Toolbar';
import css from './SqlEditor.css';

const monacoEditorOptions: monacoEditor.editor.IEditorConstructionOptions = {
  language: 'clickhouse',
  theme: 'vs-dark',
  minimap: { enabled: false },
  selectOnLineNumbers: true,
  automaticLayout: true,
  formatOnPaste: true,
  // fontFamily: 'Menlo',
  // fontSize: 14,
};

type Monaco = typeof monacoEditor;
export type CodeEditor = monacoEditor.editor.IStandaloneCodeEditor;

export interface SqlEditorProps extends Omit<ToolbarProps, 'databases'> {
  content: string;
  onContentChange: (content: string) => void;
  editorRef?: (editor?: CodeEditor) => void;
  serverStructure: ServerStructure.Server;
}

@observer
export default class SqlEditor extends React.Component<SqlEditorProps & FlexProps> {
  componentWillUnmount() {
    const { editorRef } = this.props;
    editorRef && editorRef(undefined);
  }

  private onEditorWillMount = (monaco: Monaco) => {
    if (!monaco.languages.getLanguages().some(({ id }) => id === 'clickhouse')) {
      // Register a new language
      monaco.languages.register({ id: 'clickhouse' });
      // Register a tokens provider for the language
      monaco.languages.setMonarchTokensProvider('clickhouse', languageDef as any);
      // Set the editing configuration for the language
      monaco.languages.setLanguageConfiguration('clickhouse', configuration);
      monaco.languages.registerCompletionItemProvider('clickhouse', {
        provideCompletionItems() {
          return [
            { label: 'Server', kind: monaco.languages.CompletionItemKind.Text },
            { label: 'Request', kind: monaco.languages.CompletionItemKind.Text },
            { label: 'Response', kind: monaco.languages.CompletionItemKind.Text },
            { label: 'Session', kind: monaco.languages.CompletionItemKind.Text },
          ];
        },
      });
      // registerCompletionItemProvider
      console.log('monaco - register ClickHouse', languageDef);
    }
  };

  private onEditorDidMount = (editor: CodeEditor, monaco: Monaco) => {
    const { editorRef } = this.props;
    editorRef && editorRef(editor);

    const self = this;
    // editor._standaloneKeybindingService.addDynamicKeybinding("-actions.find")
    // editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_F, function() {});
    editor.addAction({
      id: 'my-exec-code',
      label: 'Exec current code',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      // A precondition for this action.
      // precondition: undefined,
      // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
      // keybindingContext: null,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      // run:this.executeCommand
      run(editor) {
        self.executeCommand('current', editor, monaco);
        // return null;
      },
    });

    editor.focus();
  };

  private executeCommand = (
    _typeCommand: string,
    editor: monacoEditor.editor.ICodeEditor,
    _monaco: Monaco
  ) => {
    // window.edit = editor; // debug
    // window.monaco = monaco; // debug

    const position = editor.getPosition();
    const selectedText = editor.getModel().getValueInRange(editor.getSelection());
    const allValue = editor.getValue();
    console.log(`executeCommand running => ${position}`);

    // console.info('!!!Text in selected!!!',selectedText);
    // console.info('!!!allValue!!!',allValue);
    let sql = allValue;
    if (!(selectedText === '' || selectedText === null)) {
      sql = selectedText;
    }
    console.info(`%c ${sql}`, 'color: #bada55');

    // let range=monaco.editor.Range()
    // const tokens = monaco.editor.tokenize('select * from ;; select', 'clickhouse');
    // console.log(editor,tokens);

    // Получить список всех -- WARN-Tokens
    // let selectSql = editor.getSelectedText();
    // let sql=tab.editor.getValue();
    // if (!(selectSql === '' || selectSql === null)) { sql = selectSql;}
    // .splitByTokens(sql, 'constant.character.escape', use_delimiter).forEach((item) => { })
    // Если исполнить текущий - то дальше не парсим если уже есть один в списке
    // if (type == 'current' && numquery>0) return;
    //   let drawCommand=[];
    //  let subSql = item.sql;
    //  Если комманда исполнить текущий и НЕ выделен текст -> пропускаем все пока не найдем подходящий
    //   if (type == 'current' && !selectSql) {
    //       let cursor = editor.selection.getCursor();
    //       let rg=item.range.compare(cursor.row, cursor.column);
    //       if (rg !== 0) return ;
    // let SaveSql=subSql.trim();
    // определяем есть ли комманда DRAW .* - все что после нее есть JavaScript
    // вырезаем если комманда есть
    // let set_format = editor.session.$mode.findTokens(subSql, "storage", true);
    // let keyword = editor.session.$mode.findTokens(subSql, "keyword", true);
    // for  ['DROP', 'CREATE', 'ALTER'].indexOf(keyword.toUpperCase())

    // console.log(' running => ' + editor.getPosition(),editor);
    // console.log(this.monaco);
    // let tokens=this.monaco.editor.tokenize('select * from ;; select','clickhouse');
    // console.log(editor,tokens);
    return null;
  };

  render() {
    const {
      serverStructure,
      currentDatabase,
      onDatabaseChange,
      content,
      onContentChange,
      editorRef,
      onAction,
      className,
      ...rest
    } = this.props;

    return (
      <Flex column className={classNames(css.root, className)} {...rest}>
        <Flex grow fill className={css.editor}>
          <MonacoEditor
            options={monacoEditorOptions}
            editorWillMount={this.onEditorWillMount}
            editorDidMount={this.onEditorDidMount}
            value={content}
            onChange={onContentChange}
          />
        </Flex>

        <Toolbar
          className={css.toolbar}
          databases={serverStructure.databases}
          currentDatabase={currentDatabase}
          onDatabaseChange={onDatabaseChange}
          onAction={onAction}
        />
      </Flex>
    );
  }
}
