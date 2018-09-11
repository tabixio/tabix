import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import monacoEditor from 'monaco-editor';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import { languageDef, configuration } from './Clickhouse';
import css from './SqlEditor.css';

const monacoEditorOptions: monacoEditor.editor.IEditorConstructionOptions = {
  automaticLayout: true,
  selectOnLineNumbers: true,
  fontSize: 14,
  formatOnPaste: true,
  fontFamily: 'Menlo',
};

export default class SqlEditor extends React.Component<FlexProps> {
  state = {
    // data: [],
    // layout: {},
    // frames: [],
    // DatabaseStructure: false,
    code: `@@LANGID select * from  ABSOLUTE 1234 ALL COUNT COUNT() -- type your code...
    ;;
      SELECT
      use_news_ctp,
      round(use_news_ctp*1.9,2) as show_CTP
      FROM
      model.history_model_22_news
      WHERE
      event_date>=today()-1
      AND 
      news_id IN (4724145)
      ORDER BY event_time desc
      LIMIT 100
     `,
  };

  editorWillMount = (monaco: typeof monacoEditor) => {
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

  editorDidMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor,
    monaco: typeof monacoEditor
  ) => {
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

  executeCommand = (
    _typeCommand: string,
    editor: monacoEditor.editor.ICodeEditor,
    _monaco: typeof monacoEditor
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

  onChange = (value: string, event: monacoEditor.editor.IModelContentChangedEvent) => {
    console.log('onChange', value, event);
  };

  render() {
    const { className, ...rest } = this.props;
    const { code } = this.state;

    return (
      <Flex fill className={classNames(css.root, className)} {...rest}>
        <MonacoEditor
          language="clickhouse"
          theme="vs-dark"
          value={code}
          options={monacoEditorOptions}
          editorWillMount={this.editorWillMount}
          editorDidMount={this.editorDidMount}
          onChange={this.onChange}
        />
      </Flex>
    );
  }
}
