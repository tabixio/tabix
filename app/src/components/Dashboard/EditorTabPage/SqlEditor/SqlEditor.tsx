import React from 'react';
import { observer } from 'mobx-react';
// import MonacoEditor from 'react-monaco-editor';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
// import monacoEditor, { IRange, Position, Selection } from 'monaco-editor';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import { Omit } from 'typelevel-ts';
import { Query, ServerStructure } from 'services';
import { TextInsertType } from './types';

//
import { configuration, languageDef } from './monaco/language/Clickhouse';
import Toolbar, { ActionType, ToolbarProps } from './Toolbar';
import { globalEditorsMap } from './completionItems';
import { themeCobalt } from './monaco/theme/Cobalt';
import css from './SqlEditor.css';
import {bindKeys} from "./utils/bindKeys";
//
// const monaco = useMonaco();
//

type tMonaco = typeof monaco;
type tCodeEditor = monaco.editor.IStandaloneCodeEditor;
type iCodeEditor = monaco.editor.ICodeEditor;

const monacoEditorOptions: monaco.editor.IEditorConstructionOptions = {
  //   // language: 'clickhouse', // @TODO : ADD
  //   // theme: 'cobalt', // @TODO : ADD
  minimap: { enabled: true, maxColumn: 60 },
  selectOnLineNumbers: true,
  automaticLayout: true, // Enable that the editor will install an interval to check if its container dom node size has changed. Enabling this might have a severe performance impact. Defaults to false.
  formatOnPaste: true,
  fontFamily: 'Monaco,Menlo,Ubuntu Mono,Consolas,"source-code-pro","monospace"',
  fontSize: 14,
  //
  fontWeight: 'lighter',
  emptySelectionClipboard: true,
  formatOnType: true,
  showFoldingControls: 'always',
  smoothScrolling: true,
  parameterHints: {
    enabled: true,
    cycle: false,
  },
  scrollBeyondLastLine: false,
  //
  quickSuggestionsDelay: 500,
  renderWhitespace: 'boundary',
  fontLigatures: true,
  autoIndent: 'full', // Enable auto indentation adjustment. Defaults to false. '"none" | "keep" | "brackets" | "advanced" | "full" | undefined'.
};

export interface SqlEditorProps extends Omit<ToolbarProps, 'databases'>, FlexProps {
  content: string;
  onContentChange: (content: string) => void;
  serverStructure?: ServerStructure.Server;
}

//  Глобальная ссылка на монако
const globalMonaco: tMonaco = window.monaco;

@observer
export default class SqlEditor extends React.Component<SqlEditorProps> {
  private editor?: tCodeEditor;

  componentWillUnmount() {
    this.setEditorRef(undefined);
    if (this.props.serverStructure) {
      // refactor: Why update monaco on editor unmount? Maybe update on mount and activate?
      this.updateGlobalEditorStructure(this.props.serverStructure);
    }
  }

  componentWillReceiveProps({ serverStructure }: SqlEditorProps) {
    if (serverStructure && serverStructure !== this.props.serverStructure) {
      this.updateGlobalEditorStructure(serverStructure);
    }
  }

  public insertColumn(coll: ServerStructure.Column) {
    // @todo : Если вставка до Where ,
    this.insertText(` ${coll.name} `, TextInsertType.Column);
  }

  /**
   * Вставка текста к курсору
   * @param textToInsert
   * @param mode
   */
  public insertText(textToInsert: string, mode: TextInsertType) {
    // https://stackoverflow.com/questions/46451965/append-not-insert-replace-text
    console.log('textToInsert', textToInsert, mode);

    // const line = this.editor.getPosition();

    // if (line) {
    //   const range = new globalMonaco.Range(
    //     line.lineNumber,
    //     line.column + 1,
    //     line.lineNumber,
    //     line.column + 1
    //   );
    //   const id = { major: 1, minor: 1 };
    //   const op = { identifier: id, range, text: textToInsert, forceMoveMarkers: true };
    //   this.editor.executeEdits('my-source', [op]);
    // }
    // this.editor.focus();
  }

  private setEditorRef = (editor?: tCodeEditor) => {
    this.editor = editor;
  };

  /**
   * Init global editor
   */
  private onEditorBeforeMount = (thisMonaco: tMonaco) => {
    console.log('Init onEditorBeforeMount - tmonaco: tMonaco');
    thisMonaco.editor.defineTheme('cobalt', themeCobalt);
    if (!thisMonaco.languages.getLanguages().some(({ id }) => id === 'clickhouse')) {
        // Register a new language - add clickhouse
        console.log('Register a new language - add clickhouse');
      // Register a tokens provider for the language
      thisMonaco.languages.setMonarchTokensProvider('clickhouse', languageDef as any);
        // Set the editing configuration for the language
      //   monaco.languages.setLanguageConfiguration('clickhouse', configuration);
      if (this.props.serverStructure) {
      //   this.updateGlobalEditorStructure(this.props.serverStructure);
      }
    }
    // monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    //
    //
    //
    // if (!monaco.languages.getLanguages().some(({ id }) => id === 'clickhouse')) {
    //   // Register a new language
    //   monaco.languages.register({
    //     id: 'clickhouse',
    //     extensions: ['.sql'],
    //     aliases: ['chsql'],
    //   });
    //   // Register a tokens provider for the language
    //   monaco.languages.setMonarchTokensProvider('clickhouse', languageDef as any);
    //   // Set the editing configuration for the language
    //   monaco.languages.setLanguageConfiguration('clickhouse', configuration);
    // if (this.props.serverStructure) {
    //   this.updateGlobalEditorStructure(this.props.serverStructure);
    // }
    //
  };

  public execQueries = (editor: iCodeEditor,isExecAll:boolean): void => {
    console.warn('execQueries');
    // self.parseEditorText('current', editor, monaco);
    // self.onAction(ActionType.RunCurrent);
    // const queries = self.parseEditorText('current', editor);
    // self.props.onAction(ActionType.RunCurrent, queries);


    // if ALL

    // self.parseEditorText('all', editor, monaco);
    // self.onAction(ActionType.RunAll);
    // const queries = self.parseEditorText('all', editor);
    // self.props.onAction(ActionType.RunAll, queries);
  }

  public updateGlobalEditorStructure = (serverStructure: ServerStructure.Server): void => {
    if (!serverStructure) return;
    // const languageSettings: any = languageDef;
    // languageSettings.builtinFunctions = [];
    //
  };

  private onEditorMount = (editor: tCodeEditor, thisMonaco: tMonaco) => {
    this.setEditorRef(editor);
    // Save current component instance to map
    //
      const modelUri = editor?.getModel()?.uri;
      if (modelUri) {
        globalEditorsMap.set(modelUri, this);
        // Replace model uri when changed
        editor.onDidChangeModel(({ newModelUrl, oldModelUrl }) => {
          if (oldModelUrl && newModelUrl) {
            globalEditorsMap.delete(oldModelUrl);
            globalEditorsMap.set(newModelUrl, this);
          } else {
            console.warn("globalEditorsMap not set old/new URI");
          }
        });

      // Clear current component instance from map
      editor.onDidDispose(() => {
        globalEditorsMap.delete(modelUri);
      });
    }
    // Bind keys to Editor
    const self=this;
    bindKeys(editor,thisMonaco,self);
  };

  private makeQueryId = (): string => {
    let text: string = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 9; i += 1)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text.toLocaleLowerCase();
  };

  private onAction = (action: ActionType, eventData?: any) => {
    const { onAction } = this.props;
    switch (action) {
      case ActionType.RunCurrent: {
        this.editor && this.editor.getAction('my-exec-code').run();
        break;
      }
      case ActionType.RunAll: {
        this.editor && this.editor.getAction('my-exec-all').run();
        break;
      }
      default:
        onAction(action, eventData);
        break;
    }
  };

  render() {
    const {
      serverStructure,
      currentDatabase,
      onDatabaseChange,
      content,
      onContentChange,
      onAction,
      stats,
      className,
      ...rest
    } = this.props;

    return (
      <Flex column className={classNames(css.root, className)} {...rest}>
        <Flex grow fill className={css.editor}>
          <Editor
            onMount={this.onEditorMount}
            beforeMount={this.onEditorBeforeMount}
            options={monacoEditorOptions}
            theme="cobalt"
          />
        </Flex>

        <Toolbar
          className={css.toolbar}
          databases={serverStructure ? serverStructure.databases : []}
          currentDatabase={currentDatabase}
          onDatabaseChange={onDatabaseChange}
          onAction={this.onAction}
          stats={stats}
        />
      </Flex>
    );
  }
}
