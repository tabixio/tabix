import React from 'react';
import { observer } from 'mobx-react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { ServerStructure } from 'services';
// monaco
import { defaultOptions } from './monaco/config';
import { themeCobalt } from './monaco/theme/Cobalt';
import { EditorHelper } from './monaco/sql-worker/EditorHelper';
import { SupportLanguage } from './monaco/sql-worker/supportLanguage';
import { delayFunctionWrap } from './monaco/utils';
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
}

// ------------------------------------------------------------------------------------
@observer
export default class SimpleEditor extends React.Component<SimpleEditorProps> {
  private editor?: tCodeEditor;

  private tMonaco?: tMonaco;

  private EditorHelper: EditorHelper;

  private monacoEditorOptions: monaco.editor.IEditorConstructionOptions = {
    fontSize: 12,
  };

  constructor(props: any) {
    super(props);
    this.EditorHelper = new EditorHelper();
    this.monacoEditorOptions = Object.assign({}, defaultOptions, this.monacoEditorOptions);
  }

  componentWillUnmount() {
    this.setEditorRef(undefined);
    // !No disposeAll HERE!
  }

  UNSAFE_componentWillReceiveProps({ serverStructure }: SimpleEditorProps) {
    // console.log('SqlEditor->UNSAFE_componentWillReceiveProps');
    if (serverStructure && serverStructure !== this.props.serverStructure) {
      this.updateGlobalEditorStructure(serverStructure);
    }
  }

  private setEditorRef = (editor?: tCodeEditor) => {
    this.editor = editor;
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
      // this.EditorHelper.applyServerStructure(this.props.serverStructure, thisMonaco);
    }
  };

  /**
   * Выполнение запросов, если получена command
   *
   * @param sqlEditor
   * @param editor
   * @param isExecAll
   */
  public execQueries = (sqlEditor: SimpleEditor, editor: iCodeEditor, isExecAll: boolean): void => {
    // const execQueries = this.EditorHelper.createExecCurrentQuery(editor, isExecAll);
    //
    // if (execQueries?.length) {
    //   // Запросы которые необходимо отправть
    //   console.info('execQueries', execQueries);
    //   execQueries.forEach((query: Query) => {
    //     // console.log(query);
    //     console.info(`%c${query.sql}`, 'color: #bada55');
    //   });
    //   console.info('execQueries', execQueries);
    //   sqlEditor.props.onAction(isExecAll ? ActionType.RunAll : ActionType.RunCurrent, execQueries);
    // } else {
    //   console.warn('Empty execQueries after createExecCurrentQuery');
    // }
  };

  /**
   * Update completion,functions,tables on server update
   * - dispose all
   * - Recall all registered
   *
   * @param serverStructure
   */
  public updateGlobalEditorStructure = (serverStructure: ServerStructure.Server): void => {
    // console.info('SqlEditor->updateGlobalEditorStructure');
    if (!serverStructure) {
      console.warn('Error in updateGlobalEditorStructure, empty serverStructure!');
      return;
    }
    //
    //
    if (!this.tMonaco) {
      console.warn('Error in updateGlobalEditorStructure, empty this.tMonaco!');
      return;
    }
    // Регистрируем язык
    if (this.tMonaco && serverStructure) {
      // Base create completion,functions,tables,fields...
      // Register first CompletionItemProvider & MonarchTokensProvider
      // Attach to tMonaco - MonarchTokensProvider
      this.EditorHelper.applyLanguage(SupportLanguage.CLICKHOUSE);
      this.EditorHelper.applyServerStructure(serverStructure, this.tMonaco);
      this.EditorHelper.register(this.tMonaco);
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
    const q = this.editor?.getValue();
    const uriModel = this.editor?.getModel()?.uri.toString();
    if (q && uriModel && this.EditorHelper.getLanguage()) {
      this.processSQL(uriModel, q).catch();
    } else {
      // console.info('Can`t processCurrent, not set q or uri', q, uriModel);
    }
  };

  /**
   * Call EditorHelper->LanguageWorker.parseAndApplyModel()
   *
   * @param modelUri
   * @param value
   */
  public async processSQL(modelUri: string, value: string) {
    if (this.EditorHelper.isReady()) {
      // console.warn('processSQL');
      await this.EditorHelper.OnChange(modelUri, value);
    } else {
      console.info('In processSQL, error on languageValueOnChange, EditorHelper.isReady = false');
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
    const uriModel = this.editor?.getModel()?.uri.toString();
    if (value !== undefined && uriModel) {
      // Update model
      const { onContentChange } = this.props;
      onContentChange && onContentChange(value);
      // Registration delay timer 2000мс -> parse & validate
      this.delayLanguageValueOnChange(uriModel, value);
    }
  };

  private onEditorMount = (editor: tCodeEditor, thisMonaco: tMonaco) => {
    this.setEditorRef(editor);
    this.tMonaco = thisMonaco;
    // todo disable use `self-this`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    // Bind keys to Editor
    // bindKeys(editor, thisMonaco, self);
    // console.info('SqlEditor->onEditorMount()');
    this.processCurrent();
  };

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
