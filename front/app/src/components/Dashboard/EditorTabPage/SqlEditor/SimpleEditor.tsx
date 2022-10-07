import React from 'react';
import { observer } from 'mobx-react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { Query, ServerStructure } from 'services';
// monaco
import { defaultOptions } from './monaco/config';
import { themeCobalt } from './monaco/theme/Cobalt';
import { EditorHelper } from './monaco/sql-worker/EditorHelper';
import { SupportLanguage } from './monaco/sql-worker/supportLanguage';
import { delayFunctionWrap } from './monaco/utils';
import { TextInsertType } from './types';
//
type tMonaco = typeof monaco;
type tCodeEditor = monaco.editor.IStandaloneCodeEditor;
type iCodeEditor = monaco.editor.ICodeEditor;

// ------------------------------------------------------------------------------------
export interface SimpleEditorProps {
  content: string;
  onContentChange?: (content: string) => void;
  serverStructure?: ServerStructure.Server;
  readonly?: boolean;
  processSql?: boolean;
  onMount?: () => void;
  onExecCommand?: (queryList: Array<Query>, isExecAll: boolean) => void;
}

// ------------------------------------------------------------------------------------
@observer
export default class SimpleEditor extends React.Component<SimpleEditorProps> {
  private currentEditor?: tCodeEditor;

  private tMonaco?: tMonaco;

  private readonly editorHelper: EditorHelper;

  private readonly monacoEditorOptions: monaco.editor.IEditorConstructionOptions = {
    fontSize: 13,
  };

  constructor(props: any) {
    super(props);
    this.editorHelper = new EditorHelper();
    this.monacoEditorOptions = Object.assign({}, defaultOptions, this.monacoEditorOptions);
  }

  componentWillUnmount() {
    this.setEditorRef(undefined);
    // WARN!:!No disposeAll HERE!
  }

  UNSAFE_componentWillReceiveProps({ serverStructure }: SimpleEditorProps) {
    // Todo_drop use UNSAFE
    if (serverStructure && serverStructure !== this.props.serverStructure) {
      this.updateGlobalEditorStructure(serverStructure);
    }
  }

  private setEditorRef = (editor?: tCodeEditor) => {
    this.currentEditor = editor;
  };

  /**
   * Init global editor
   */
  private onEditorBeforeMount = (thisMonaco: tMonaco): void => {
    // console.info('SqlEditor->onEditorBeforeMount');
    this.tMonaco = thisMonaco;
    thisMonaco.editor.defineTheme('cobalt', themeCobalt);
    // if (this.props.theme !== theme) thisMonaco.editor.setTheme(theme)
    if (this.props.serverStructure) {
      this.updateGlobalEditorStructure(this.props.serverStructure);
      // this.editorHelper.applyServerStructure(this.props.serverStructure, thisMonaco);
    }
  };

  /**
   * Update completion,functions,tables on server update
   * - dispose all
   * - Recall all registered
   *
   * @param serverStructure
   */
  public updateGlobalEditorStructure = (serverStructure: ServerStructure.Server): void => {
    if (!serverStructure) {
      //console.warn('Error in updateGlobalEditorStructure, empty serverStructure!');
      return;
    }
    if (!this.tMonaco) {
      // console.warn('Error in updateGlobalEditorStructure, empty this.tMonaco!');
      return;
    }
    // Регистрируем язык
    if (this.tMonaco && serverStructure) {
      // Base create completion,functions,tables,fields...
      // Register first CompletionItemProvider & MonarchTokensProvider
      // Attach to tMonaco - MonarchTokensProvider
      this.helper().applyLanguage(SupportLanguage.CLICKHOUSE);
      this.helper().applyServerStructure(serverStructure, this.tMonaco);
      this.helper().register(this.tMonaco);
    }

    // Обрабатываем текущий запрос в активном таб/окне
    this.processCurrent();
  };

  /**
   * Parse current text in current monaco tab/window
   *
   * @private
   */
  private processCurrent = (): void => {
    const q = this.editor()?.getValue();
    const uriModel = this.editor()?.getModel()?.uri.toString();
    if (q && uriModel && this.helper().getLanguage()) {
      this.processSQL(uriModel, q).catch();
    } else {
      // console.info('Can`t processCurrent, not set q or uri', q, uriModel);
    }
  };

  public helper(): EditorHelper {
    return this.editorHelper;
  }

  public editor(): tCodeEditor | undefined {
    return this.currentEditor;
  }
  /**
   * Call editorHelper->LanguageWorker.parseAndApplyModel()
   *
   * @param modelUri
   * @param value
   */
  public async processSQL(modelUri: string, value: string) {
    const { processSql } = this.props;
    if (!processSql) return;
    if (this.helper().isReady()) {
      const position = this.editor()?.getPosition();
      let offset: number = -1;
      if (position) {
        const d = this.editor()?.getModel()?.getOffsetAt(position);
        if (d !== undefined) offset=d;
      }
      await this.helper().OnChange(modelUri, value, offset);
    } else {
      console.info('In processSQL, error on languageValueOnChange, editorHelper.isReady = false');
    }
  }

  //
  // public languageValueOnChange(modelUri: string, value: string) {
  //   // On user typing
  //   this.processSQL(modelUri, value).catch();
  // }

  delayLanguageValueOnChange: any = delayFunctionWrap(this.processSQL.bind(this));

  /**
   * On typing
   *
   * @param value
   * @param ev
   */
  private onChange = (value: string | undefined, ev: monaco.editor.IModelContentChangedEvent) => {
    const uriModel = this.editor()?.getModel()?.uri.toString();
    if (value !== undefined && uriModel) {
      // Update model
      const { onContentChange } = this.props;
      
      onContentChange && onContentChange(value);
      // Registration delay timer 2000мс -> parse & validate
      this.delayLanguageValueOnChange(uriModel, value);
    }
  };

  /**
   * Выполнение запросов, если получена command
   *
   * @param isAllQuery
   */
  public onExecCommand = (isAllQuery: boolean) => {
    // Запросы которые необходимо отправить
    const execQueries =
      this.currentEditor && this.helper()?.createExecCurrentQuery(this.currentEditor, isAllQuery);
    if (execQueries?.length) {
      // Если запросы найдены и разобраны в обьекты Query
      const { onExecCommand } = this.props;
      if (onExecCommand) {
        onExecCommand(execQueries, isAllQuery);
      }
    } else {
      console.warn('Empty onExecCommand, after createExecCurrentQuery');
    }
  };

  /**
   * Event
   *
   *
   * @param editor
   * @param thisMonaco
   */

  private onEditorMount = (editor: tCodeEditor, thisMonaco: tMonaco) => {
    this.setEditorRef(editor);
    this.tMonaco = thisMonaco;
    this.processCurrent();

    // @todo: Command-Left | Command-Right | Shift-Alt-Command-Right | Shift-Alt-Command-Right
    // @todo: Command-Shift-[NUM]
    // for (let i = 0; i < 9; i++) {
    // [ globalMonaco.KeyMod.Shift | globalMonaco.KeyMod.CtrlCmd | globalMonaco.KeyCode['KEY_'+i])] => self.actionChangeTab(i);

    // Bind keys
    this.helper().bindBaseKeys(editor);
    // Attach Cmd+Enter key
    this.helper().bindKeyExecCommand(editor, this.onExecCommand);
    //
    editor.focus();
    // Call on mount
    const { onMount } = this.props;
    onMount && onMount();
  };

  /**
   * Вставка текста к курсору
   * @param textToInsert
   * @param mode
   */
  public insert(textToInsert: string, mode: TextInsertType) {
    this.currentEditor && this.helper().insert(this.currentEditor, textToInsert, mode);
  }
  render() {
    const { serverStructure, onContentChange, content, ...rest } = this.props;
    return (
      <Editor
        language={SupportLanguage.CLICKHOUSE}
        onMount={this.onEditorMount}
        onChange={this.onChange}
        beforeMount={this.onEditorBeforeMount}
        options={this.monacoEditorOptions}
        theme="cobalt"
        value={content}
      />
    );
  }
}
