import React from 'react';
import { observer } from 'mobx-react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import { Omit } from 'typelevel-ts';
import { Query, ServerStructure } from 'services';
import { TextInsertType } from './types';
import Toolbar, { ActionType, ToolbarProps } from './Toolbar';
import css from './SqlEditor.css';
// monaco
import { defaultOptions } from './monaco/config';
import { themeCobalt } from './monaco/theme/Cobalt';
import { bindKeys } from './monaco/bindKeys';
import { SqlWorker } from './monaco/sql-worker/SqlWorker';
import { SupportLanguage } from './monaco/sql-worker/supportLanguage';
import { delayFunctionWrap } from './monaco/utils';
//
type tMonaco = typeof monaco;
type tCodeEditor = monaco.editor.IStandaloneCodeEditor;
type iCodeEditor = monaco.editor.ICodeEditor;

type tMonacoEditor = typeof monaco.editor;
type IReadOnlyModel = monaco.editor.IReadOnlyModel;

export interface SqlEditorProps extends Omit<ToolbarProps, 'databases'>, FlexProps {
  content: string;
  onContentChange: (content: string) => void;
  serverStructure?: ServerStructure.Server;
}

@observer
export default class SqlEditor extends React.Component<SqlEditorProps> {
  private editor?: tCodeEditor;

  private tMonaco?: tMonaco;

  private sqlWorker: SqlWorker;

  // const setCursorPosition = useState(new Position(0, 0))[1];
  // const [tempCursor] = useState(new Position(0, 0));

  private monacoEditorOptions: monaco.editor.IEditorConstructionOptions = {
    fontSize: 15,
  };

  constructor(props: any) {
    super(props);
    console.info('SqlEditor->create');
    this.sqlWorker = new SqlWorker();
    this.monacoEditorOptions = Object.assign({}, defaultOptions, this.monacoEditorOptions);
  }

  componentWillUnmount() {
    this.setEditorRef(undefined);
    if (this.props.serverStructure) {
      console.info('SqlEditor->componentWillUnmount');
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
    console.info('SqlEditor->setEditorRef');
    this.editor = editor;
  };

  /**
   * Init global editor
   */
  private onEditorBeforeMount = (thisMonaco: tMonaco): void => {
    console.info('SqlEditor->onEditorBeforeMount');
    this.tMonaco = thisMonaco;
    thisMonaco.editor.defineTheme('cobalt', themeCobalt); // if (this.props.theme !== theme) thisMonaco.editor.setTheme(theme)
    if (!thisMonaco.languages.getLanguages().some(({ id }) => id === SupportLanguage.CLICKHOUSE)) {
      if (this.props.serverStructure) {
        this.sqlWorker.applyServerStructure(this.props.serverStructure, thisMonaco);
      }
      this.sqlWorker.register(SupportLanguage.CLICKHOUSE, thisMonaco);
    }
  };

  public execQueries = (editor: iCodeEditor, isExecAll: boolean): void => {
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
  };

  public updateGlobalEditorStructure = (serverStructure: ServerStructure.Server): void => {
    console.info('SqlEditor->updateGlobalEditorStructure');
    if (!serverStructure) return;
    if (!this.editor) {
      console.warn('Error in updateGlobalEditorStructure, empty this.editor!');
    }
    if (!this.tMonaco) {
      console.warn('Error in updateGlobalEditorStructure, empty this.tMonaco!');
    }
    if (this.tMonaco && serverStructure) {
      // Base create completion,functions,tables,fields...
      // Register first CompletionItemProvider & MonarchTokensProvider
      // Attach to tMonaco - MonarchTokensProvider
      this.sqlWorker.applyServerStructure(serverStructure, this.tMonaco);
    }
  };

  // ICodeEditor.onDidChangeModelContent - An event emitted when the content of the current model has changed.
  // ICodeEditor.onDidChangeCursorPosition

  public languageValueOnChange(callback?: any) {
    console.info('SqlEditor->languageValueOnChange');
    // if (this.props.disabledSyntaxCheck) {
    //  return;
    // }
    // const newValue = this.monacoInstance.getValue();
    // const languageId = this.monacoInstance.getModel().getModeId();
    // if (provideCompletionItemsMap[languageId] && provideCompletionItemsMap[languageId].onChange) {
    //  provideCompletionItemsMap[languageId].onChange(newValue, this.monacoInstance, callback);
    // }
  }

  delayLanguageValueOnChange: any = delayFunctionWrap(this.languageValueOnChange.bind(this));

  private onChange = (value: string | undefined, ev: monaco.editor.IModelContentChangedEvent) => {
    // console.info('Change',value,ev);
    if (value !== undefined) {
      const { onContentChange } = this.props;
      // this.props.onContentChange(value);
      // Тут регистрируем timer на 500мс -> parse & validate
      this.delayLanguageValueOnChange(onContentChange);
    }

    // setCursorPosition(e.position)
  };

  private onValidate = (markers: monaco.editor.IMarker[]) => {
    // work on have markers only!

    console.log('onValidate');
    // current editor sql=getValue();
    // const syntaxErrors = validate({ lexer, parser, initialRule })(editor.getValue());
    // const monacoErrors = [];
    // for (const e of syntaxErrors) {
    //   monacoErrors.push({
    //     startLineNumber: e.startLine,
    //     startColumn: e.startCol,
    //     endLineNumber: e.endLine,
    //     endColumn: e.endCol,
    //     message: e.message,
    //     severity: monaco.MarkerSeverity.Error,
    //   });
    // }
    // const errorsString = monacoErrors.map(e => e.message).reduce((e1, e2) => e1 + ", " + e2, "");
    // if (editor.getValue()) {
    //   setErrors([]);
    //   errors = { value: "" };
    // } else if (errorsString !== errors.value) {
    //   setErrors(monacoErrors);
    //   errors = { value: errorsString };
    // }
    // window.syntaxErrors = syntaxErrors;
    // const model = monaco.editor.getModels()[0];
    // monaco.editor.setModelMarkers(model, "owner", monacoErrors);
    // editor.onDidChangeModelContent(() => {
    //             if (to) clearTimeout(to);
    //             return onDidChangeTimout();
    //         });
    //         editor.onDidChangeCursorPosition((e: monaco.editor.ICursorPositionChangedEvent) =>
    //             setCursorPosition(e.position),
    //         );
  };

  private onEditorMount = (editor: tCodeEditor, thisMonaco: tMonaco) => {
    this.setEditorRef(editor);
    this.tMonaco = thisMonaco;
    const self = this;
    // Bind keys to Editor
    bindKeys(editor, thisMonaco, self);
    this.languageValueOnChange();
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
      onContentChange,
      content,
      onAction,
      stats,
      className,
      ...rest
    } = this.props;
    return (
      <Flex column className={classNames(css.root, className)} {...rest}>
        <Flex grow fill className={css.editor}>
          <Editor
            language={SupportLanguage.CLICKHOUSE}
            onMount={this.onEditorMount}
            onValidate={this.onValidate}
            onChange={this.onChange}
            beforeMount={this.onEditorBeforeMount}
            options={this.monacoEditorOptions}
            theme="cobalt"
            value={content}
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
