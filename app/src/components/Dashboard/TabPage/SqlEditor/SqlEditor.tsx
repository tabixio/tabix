import React from 'react';
import { observer } from 'mobx-react';
import MonacoEditor from 'react-monaco-editor';
import monacoEditor, { IDisposable, Position } from 'monaco-editor';
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
export interface Query {
  id: string;
  tokens: any; //splitRange['tokens']
  sql: string;
  range: monacoEditor.IRange;
  inCursor: boolean;
}

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
    // monaco.editor.defineTheme('cobalt', theme_cobalt);
    // monaco.editor.setTheme('cobalt');
    console.warn('onEditorWillMount');

    if (!monaco.languages.getLanguages().some(({ id }) => id === 'clickhouse')) {
      // Register a new language
      monaco.languages.register({ id: 'clickhouse' });
      // Register a tokens provider for the language
      monaco.languages.setMonarchTokensProvider('clickhouse', languageDef as any);
      // Set the editing configuration for the language
      monaco.languages.setLanguageConfiguration('clickhouse', configuration);
      // registerCompletionItemProvider
      console.log('monaco - register ClickHouseLanguage');
    }
  };

  private updateEditorStructure = (
    serverStructure: ServerStructure.Server,
    currentDataBaseName: string | undefined,
    monaco: Monaco
  ): IDisposable => {
    let languageSettings: any = languageDef;
    languageSettings.builtinFunctions = [];

    let completionItems: Array<monacoEditor.languages.CompletionItem> = [];
    // Completion:Dictionaries
    serverStructure.databases.forEach((db: ServerStructure.Database) => {
      // Completion:dbName
      completionItems.push(
        // interface CompletionItem
        {
          label: db.name,
          insertText: db.name,
          kind: monaco.languages.CompletionItemKind.Reference,
          detail: `database`,
        }
      );

      if (currentDataBaseName !== db.name) return;
      // Completion:Tables
      db.tables.forEach((table: ServerStructure.Table) => {
        table.columns.forEach((col: ServerStructure.Column) => {
          // column
          completionItems.push({
            label: col.name,
            insertText: col.name,
            kind: monaco.languages.CompletionItemKind.Unit,
            detail: `${col.database}.${col.table}:${col.type}`,
            documentation: `${col.id} , ${col.type} , `,
          });
        });
        // table
        completionItems.push(
          // interface CompletionItem
          {
            label: table.name,
            insertText: `${table.database}.${table.insertName}`,
            kind: monaco.languages.CompletionItemKind.Interface,
            detail: `table:${table.engine}`,
            documentation: table.id,
          }
        );
      });
    });
    // Completion:Functions
    serverStructure.editorRules.builtinFunctions.forEach((func: any) => {
      languageSettings.builtinFunctions.push(func.name);
      completionItems.push(
        // interface CompletionItem
        {
          //  {name: "isNotNull", isaggr: 0, score: 101, comb: false, origin: "isNotNull"}
          label: func.name,
          insertText: `${func.name}()`,
          kind: monaco.languages.CompletionItemKind.Function,
          detail: `function`,
        }
      );
    });
    // update languageDef
    monaco.languages.setMonarchTokensProvider('clickhouse', languageSettings as any);

    // Completion:register
    return monaco.languages.registerCompletionItemProvider('clickhouse', {
      provideCompletionItems() {
        return completionItems;
      },
    });
  };
  private bindKeys = (editor: CodeEditor, monaco: Monaco) => {
    const self = this;

    const KM = monaco.KeyMod;
    const KC = monaco.KeyCode;

    // ======== Command-Enter ========
    editor.addAction({
      id: 'my-exec-code',
      label: 'Exec current code',
      keybindings: [KM.CtrlCmd | KC.Enter],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run(editor) {
        self.executeCommand('current', editor, monaco);
      },
    });
    // ======== Shift-Command-Enter ========
    editor.addAction({
      id: 'my-exec-all',
      label: 'Exec All',
      keybindings: [KM.Shift | KM.CtrlCmd | KC.Enter],
      precondition: undefined,
      keybindingContext: undefined,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run(editor) {
        self.executeCommand('all', editor, monaco);
      },
    });
    // ======== Command+Shift+- / Command+Shift+= ========
    editor.addCommand(
      KM.chord(KM.Shift | KM.CtrlCmd | KC.US_MINUS, 0),
      () => {
        editor.getAction('editor.foldAll').run();
      },
      ''
    );
    editor.addCommand(
      KM.chord(KM.Shift | KM.CtrlCmd | KC.US_EQUAL, 0),
      () => {
        editor.getAction('editor.unfoldAll').run();
      },
      ''
    );
    // ======== Shift-CtrlCmd-F ========
    editor.addCommand(
      KM.chord(KM.Shift | KM.CtrlCmd | KC.KEY_F, 0),
      () => {
        editor.getAction('editor.action.formatDocument').run();
      },
      ''
    );
    // ======== Cmd-Y ========
    editor.addCommand(
      KM.chord(KM.CtrlCmd | KC.KEY_Y, 0),
      () => {
        editor.getAction('editor.action.deleteLines').run();
      },
      ''
    );

    // @todo: Command-Shift-[NUM]
    // for (let i = 0; i < 9; i++) {
    //     editor.addCommand(monaco.KeyMod.chord( monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode['KEY_'+i]), function() {
    //         console.warn('actionChangeTab',i);
    //         self.actionChangeTab(i);
    //     });
    // }

    // @todo:  Command-Left | Command-Right | Shift-Alt-Command-Right | Shift-Alt-Command-Right

    editor.focus();
  };

  private onEditorDidMount = (editor: CodeEditor, monaco: Monaco) => {
    console.warn('onEditorDidMount');
    const { editorRef } = this.props;
    editorRef && editorRef(editor);

    // Bind keys to Editor
    this.bindKeys(editor, monaco);

    // @todo: need refactor & rewrite
    // 1) Нужно наблюдать для каждой вкладки за обновлением serverStructure and currentDatabase -> если изменились для этого редактора нужно обновить Lang
    // 2)
    if (this.props.serverStructure && this.props.serverStructure.editorRules.builtinFunctions) {
      //   console.info('self._mCompletionDisposable', self._mCompletionDisposable);
      //   if (self._mCompletionDisposable) {
      //     self._mCompletionDisposable.dispose();
      //   }
      //   // need hack !!! need rewrite / registerCompletionItemProvider returns an IDisposable with the dispose method which I can call on unmount
      //   this._mCompletionDisposable = null; //:monaco.languages.IDisposable;
      //
      //     this._mCompletionDisposable =
      this.updateEditorStructure(this.props.serverStructure, this.props.currentDatabase, monaco);
    } else {
      console.warn('serverStructure is not Init');
    }
  };

  private splitByTokens = (
    _monaco: Monaco,
    editor: monacoEditor.editor.ICodeEditor,
    text: string,
    cursorPosition: Position,
    spitToken: string
  ) => {
    const lenVV = 2;
    const splits: any[] = [];

    let firstToken = {
      line: 1,
      offset: 1,
      type: '',
    };
    let prewToken = {
      line: 1,
      offset: 1,
      type: '',
      typeT: false,
    };
    let tokensList: any[] = [];

    const tokens = _monaco.editor.tokenize(text, 'clickhouse');

    tokens.forEach((lineTokens, i) => {
      const line = i + 1;
      lineTokens.forEach(token => {
        if (prewToken.type) {
          if (!Array.isArray(tokensList[prewToken.type])) tokensList[prewToken.type] = [];
          const ll_range = new _monaco.Range(
            prewToken.line,
            prewToken.offset,
            line,
            token.offset + 1
          );

          let tokenText = editor.getModel().getValueInRange(ll_range);
          tokenText = tokenText.trim();
          if (tokenText.length) {
            tokensList[prewToken.type].push(tokenText);
          }
        }

        if (!firstToken) {
          // @ts-ignore
          token.line = line; // ???
          // @ts-ignore
          firstToken = token;
        }
        if (token.type === spitToken) {
          splits.push({
            startLineNumber: firstToken.line,
            startColumn: firstToken.offset,
            endLineNumber: line,
            endColumn: 1 + token.offset,
            tokens: tokensList,
          });
          tokensList = [];
          firstToken.line = line;
          firstToken.offset = 1 + token.offset + lenVV;
        }
        // @ts-ignore
        prewToken = {
          type: token.type,
          line,
          offset: 1 + token.offset,
        };
      });
    });

    // push last or all
    splits.push({
      startLineNumber: firstToken.line,
      startColumn: firstToken.offset,
      endLineNumber: Number.MAX_VALUE,
      endColumn: Number.MAX_VALUE,
      tokens: tokensList,
    });

    const listQuery: Array<Query> = [];

    splits.forEach(splitRange => {
      const range = new _monaco.Range(
        splitRange.startLineNumber,
        splitRange.startColumn,
        splitRange.endLineNumber,
        splitRange.endColumn
      );
      const text = editor.getModel().getValueInRange(range);
      const inCursor = range.containsPosition(cursorPosition);
      if (text.trim().length < 1) return;
      listQuery.push({
        id: '123',
        sql: text,
        range: range,
        inCursor: inCursor,
        tokens: splitRange.tokens,
      });
    });

    return listQuery;
  };

  private executeCommand = (
    typeCommand: string,
    editor: monacoEditor.editor.ICodeEditor,
    _monaco: Monaco
  ) => {
    const spliterToken = 'warn-token.sql'; // can change in future
    const position = editor.getPosition();
    const selectedText = editor.getModel().getValueInRange(editor.getSelection());
    const allValue = editor.getValue();

    let sql = allValue;
    if (!(selectedText === '' || selectedText === null)) {
      sql = selectedText;
    }
    // We split text to sql query by lang tokens
    let listQuery = this.splitByTokens(_monaco, editor, sql, position, spliterToken);

    console.info('splits', typeCommand, listQuery);

    console.info(`%c ${sql}`, 'color: #bada55');

    // Получили listQuery:Array<Query>
    // В нем есть признак inCursor=[true/false]
    // Если комманда исполнить текущий и НЕ выделен текст -> пропускаем все пока не найдем подходящий

    // if (typeCommand == 'current' && splits.length>0) - находим запрос с inCursor=true ранаем
    // if (typeCommand == 'all'     && splits.length>0) - выполняем все запросы последовательно

    // let SaveSql=subSql.trim();
    //   let drawCommand=[];
    //  let subSql = item.sql;
    //  Если комманда исполнить текущий и НЕ выделен текст -> пропускаем все пока не найдем подходящий
    //   if (type == 'current' && !selectSql) {
    //       let cursor = editor.selection.getCursor();
    //       let rg=item.range.compare(cursor.row, cursor.column);
    //       if (rg !== 0) return ;

    // определяем есть ли комманда DRAW .* - все что после нее есть JavaScript
    // вырезаем если комманда есть
    // let set_format = editor.session.$mode.findTokens(subSql, "storage", true);
    // let keyword = editor.session.$mode.findTokens(subSql, "keyword", true);
    // for  ['DROP', 'CREATE', 'ALTER'].indexOf(keyword.toUpperCase())

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
