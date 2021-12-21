import React from 'react';
import { observer } from 'mobx-react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
//
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import { Omit } from 'typelevel-ts';
import { Query, ServerStructure } from 'services';
import { languages } from 'monaco-editor';
import { TextInsertType } from './types';
import { defaultOptions } from './monaco/config';
import Toolbar, { ActionType, ToolbarProps } from './Toolbar';
import { ClickhouseCompletion } from './monaco/language/completionItems';
import { themeCobalt } from './monaco/theme/Cobalt';
import css from './SqlEditor.css';
import { bindKeys } from './monaco/bindKeys';
import { SqlWorker } from './monaco/sql-worker/SqlWorker';
import { SupportLanguage } from './monaco/sql-worker/supportLanguage';
//
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

//  Глобальная ссылка на монако
const globalMonaco: tMonaco = window.monaco;

@observer
export default class SqlEditor extends React.Component<SqlEditorProps> {
  private editor?: tCodeEditor;

  private tMonaco?: tMonaco;

  private sqlWorker: SqlWorker;
  // const [ready: number, setReady: any] = useState(false);

  // const setCursorPosition = useState(new Position(0, 0))[1];
  // const [tempCursor] = useState(new Position(0, 0));

  private monacoEditorOptions: monaco.editor.IEditorConstructionOptions = {
    fontSize: 15,
  };

  constructor(props: any) {
    super(props);
    this.sqlWorker = new SqlWorker();
    this.monacoEditorOptions = Object.assign({}, defaultOptions, this.monacoEditorOptions);
  }

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

  private getTableCompletionSuggestions = (
    model: IReadOnlyModel,
    position: monaco.Position,
    context: monaco.languages.CompletionContext,
    token: monaco.CancellationToken
  ): monaco.languages.ProviderResult<monaco.languages.CompletionList> =>
    // See monaco/lang/compl
    ClickhouseCompletion.findCurrentTableFields(
      model,
      position,
      context,
      token,
      this.props.currentDatabase,
      this.props.serverStructure
    );

  /**
   * Init global editor
   */
  private onEditorBeforeMount = (thisMonaco: tMonaco): void => {
    this.tMonaco = thisMonaco;

    thisMonaco.editor.defineTheme('cobalt', themeCobalt); // if (this.props.theme !== theme) thisMonaco.editor.setTheme(theme)

    // @TODO: Move to sql-worker->registerLanguage(thisMonaco);

    if (!thisMonaco.languages.getLanguages().some(({ id }) => id === SupportLanguage.CLICKHOUSE)) {
      this.sqlWorker.registerLanguage(SupportLanguage.CLICKHOUSE, thisMonaco);

      if (this.props.serverStructure) {
        this.updateGlobalEditorStructure(this.props.serverStructure);
      }
      this.sqlWorker.registerCompletion(SupportLanguage.CLICKHOUSE, thisMonaco);
      // Done?
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
      ClickhouseCompletion.applyServerStructure(serverStructure, this.tMonaco);
    }
  };

  private onEditorMount = (editor: tCodeEditor, thisMonaco: tMonaco) => {
    this.setEditorRef(editor);
    this.tMonaco = thisMonaco;
    const self = this;
    // Bind keys to Editor
    bindKeys(editor, thisMonaco, self);
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
            language={SupportLanguage.CLICKHOUSE}
            onMount={this.onEditorMount}
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
