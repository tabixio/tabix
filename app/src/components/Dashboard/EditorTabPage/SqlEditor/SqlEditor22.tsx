import React from 'react';
import { observer } from 'mobx-react';
import MonacoEditor from 'react-monaco-editor';
import monacoEditor, { IRange, Position, Selection } from 'monaco-editor';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import { Omit } from 'typelevel-ts';
import { Query, ServerStructure } from 'services';
import { TextInsertType } from './types';
import { configuration, languageDef } from './monaco/sql-worker/editorConfig/ClickhouseEditor';
import { themeCobalt } from './monaco/theme/Cobalt';
import { themeDarcula } from './monaco/theme/Darcula';
import { themeVsDark } from './monaco/theme/Vsdark';
import Toolbar, { ActionType, ToolbarProps } from './Toolbar';
import { getCompletionItems, globalEditorsMap } from './monaco/language/completionItems';
import css from './SqlEditor.css';

const monacoEditorOptions: monacoEditor.editor.IEditorConstructionOptions = {
  language: 'clickhouse',
  theme: 'cobalt',
  minimap: { enabled: true, maxColumn: 60 },
  selectOnLineNumbers: true,
  automaticLayout: true, // Enable that the editor will install an interval to check if its container dom node size has changed. Enabling this might have a severe performance impact. Defaults to false.
  formatOnPaste: true,
  fontFamily: 'Monaco,Menlo,Ubuntu Mono,Consolas,"source-code-pro","monospace"',
  fontSize: 14,
  // fontLigatures: true,
  // autoIndent: false,// Enable auto indentation adjustment. Defaults to false.
  fontWeight: 'lighter',
  emptySelectionClipboard: true,
  formatOnType: true,
  showFoldingControls: 'always',
  smoothScrolling: true,
  parameterHints: true,
  // quickSuggestionsDelay: 500,
  // renderWhitespace: 'boundary',
  scrollBeyondLastLine: false,
};

type Monaco = typeof monacoEditor;
type CodeEditor = monacoEditor.editor.IStandaloneCodeEditor;

export interface SqlEditorProps extends Omit<ToolbarProps, 'databases'>, FlexProps {
  content: string;
  onContentChange: (content: string) => void;
  serverStructure?: ServerStructure.Server;
}

//  Глобальная ссылка на монако
const globalMonaco: Monaco = window.monaco;

@observer
export default class SqlEditor extends React.Component<SqlEditorProps> {
  // get parseEditorText(): (
  //   typeCommand: 'select' | 'current' | 'all',
  //   editor: monacoEditor.editor.ICodeEditor
  // ) => Array<Query> {
  //   return this._parseEditorText;
  // }

  // set parseEditorText(
  //   value: (
  //     typeCommand: 'select' | 'current' | 'all',
  //     editor: monacoEditor.editor.ICodeEditor
  //   ) => Array<Query>
  // ) {
  //   this._parseEditorText = value;
  // }

  private editor?: CodeEditor;

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
    if (!this.editor) return;
    // method 1:
    // const position: Position = this.editor.getPosition(); // Get current mouse position
    // const text = this.editor.getValue();
    // const splitedText = text.split('\n');
    // const lineContent = splitedText[position.lineNumber - 1]; // Get selected line content
    //
    // splitedText[position.lineNumber - 1] = [
    //   lineContent.slice(0, position.column - 1),
    //   textToInsert,
    //   lineContent.slice(position.column - 1),
    // ].join(''); // Append the text exactly at the selected position (position.column -1)
    //
    // this.editor.setValue(splitedText.join('\n')); // Save the value back to the Editor

    // method 2
    // // this.editor.trigger('keyboard', 'type', { text });

    const line = this.editor.getPosition();
    const range = new globalMonaco.Range(
      line.lineNumber,
      line.column + 1,
      line.lineNumber,
      line.column + 1
    );
    const id = { major: 1, minor: 1 };
    const op = { identifier: id, range, text: textToInsert, forceMoveMarkers: true };
    this.editor.executeEdits('my-source', [op]);
    this.editor.focus();
  }

  private setEditorRef = (editor?: CodeEditor) => {
    this.editor = editor;
  };

  /**
   * Init global editor
   *
   * @param monaco
   */
  private onEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('darcula', themeDarcula);
    monaco.editor.defineTheme('cobalt', themeCobalt);
    monaco.editor.defineTheme('vs-dark', themeVsDark);
    monaco.editor.setTheme('cobalt');

    if (!monaco.languages.getLanguages().some(({ id }) => id === 'clickhouse')) {
      // Register a new language
      monaco.languages.register({
        id: 'clickhouse',
        extensions: ['.sql'],
        aliases: ['chsql'],
      });
      // Register a tokens provider for the language
      monaco.languages.setMonarchTokensProvider('clickhouse', languageDef as any);
      // Set the editing configuration for the language
      monaco.languages.setLanguageConfiguration('clickhouse', configuration);
      // registerCompletionItemProvider
      // this.completionItemsDisposable =
      monaco.languages.registerCompletionItemProvider('clickhouse', {
        provideCompletionItems: getCompletionItems,
      });
      // console.log('monaco - register ClickHouseLanguage');
    }
    if (this.props.serverStructure) {
      this.updateGlobalEditorStructure(this.props.serverStructure);
    }
  };

  public updateGlobalEditorStructure = (serverStructure: ServerStructure.Server): void => {
    // if (!serverStructure) return;
    const languageSettings: any = languageDef;
    languageSettings.builtinFunctions = [];

    const completionItems: Array<monacoEditor.languages.CompletionItem> = [];

    // ----- push to completionItems: databases and tables
    serverStructure.databases.forEach((db: ServerStructure.Database) => {
      // Completion:dbName
      completionItems.push({
        label: db.name,
        insertText: db.name,
        kind: globalMonaco.languages.CompletionItemKind.Reference,
        detail: `database`,
      });
      // Completion:Tables
      db.tables.forEach((table: ServerStructure.Table) => {
        // table
        completionItems.push({
          label: table.name,
          insertText: `${table.database}.${table.insertName}`,
          kind: globalMonaco.languages.CompletionItemKind.Interface,
          detail: `table:${table.engine}`,
          documentation: table.id,
        });

        completionItems.push({
          label: `${table.database}.${table.insertName}`,
          insertText: `${table.database}.${table.insertName}`,
          kind: globalMonaco.languages.CompletionItemKind.Interface,
          detail: `table:${table.engine}`,
          documentation: table.id,
        });

        // highlight tables and databases
        languageSettings.dbtables.push(`${table.database}.${table.insertName}`);
        languageSettings.dbtables.push(`${table.database}.${table.insertName.replace(/"/g, '`')}`);
        languageSettings.tables.push(`${table.insertName}`);
        languageSettings.tables.push(`${db.name}`);

        table.columns.forEach((column: ServerStructure.Column) => {
          // col highlingts
          languageSettings.fields.push(`${table.insertName}.${column.name}`);
          languageSettings.fields.push(`${column.name}`);
        });
      });
    });
    console.info('languageSettings', languageSettings);
    // ----- push to completionItems:Functions
    if (serverStructure.editorRules) {
      serverStructure.editorRules.builtinFunctions.forEach((func: any) => {
        languageSettings.builtinFunctions.push(func.name);
        completionItems.push(
          // interface CompletionItem
          {
            //  {name: "isNotNull", isaggr: 0, score: 101, comb: false, origin: "isNotNull"}
            label: func.name,
            insertText: `${func.name}(`,
            kind: globalMonaco.languages.CompletionItemKind.Method,
            sortText: `function:${func.name}`,
            detail: `function`,
          }
        );
      });
      // ----- push to completionItems: Dictionaries
      serverStructure.editorRules.dictionaries.forEach((dic: any) => {
        completionItems.push({
          label: dic.title,
          insertText: `${dic.dic}`,
          kind: globalMonaco.languages.CompletionItemKind.Snippet,
          detail: `${dic.dic}`,
        });
      });
    }
    // когда hotReload или обновление структуры нужно удалить через dispose() созданные элементы
    if (!window.monacoGlobalProvider) {
      window.monacoGlobalProvider = {
        completionProvider: null,
        tokensProvider: null,
      };
    } else {
      // Если
      if (window.monacoGlobalProvider.tokensProvider) {
        window.monacoGlobalProvider.tokensProvider.dispose();
      }
      if (window.monacoGlobalProvider.completionProvider) {
        window.monacoGlobalProvider.completionProvider.dispose();
      }
    }
    // Load to completionItems default languageSettings

    const keywords = [...languageSettings.keywordsGlobal, ...languageSettings.keywords];
    keywords.forEach((word: string) => {
      completionItems.push({
        label: word.toLowerCase(),
        sortText: `a ${word}`,
        kind: globalMonaco.languages.CompletionItemKind.Keyword,
      });
    });
    languageSettings.drawCommands.forEach((word: string) => {
      completionItems.push({
        label: word,
        kind: globalMonaco.languages.CompletionItemKind.Color,
      });
    });
    languageSettings.typeKeywords.forEach((word: string) => {
      completionItems.push({
        label: word,
        kind: globalMonaco.languages.CompletionItemKind.Property,
      });
    });
    languageSettings.builtinVariables.forEach((word: string) => {
      completionItems.push({
        label: word,
        kind: globalMonaco.languages.CompletionItemKind.Variable,
      });
    });

    // Запоминаем путь к IDispose() интерфейсу
    // update MonarchTokens

    window.monacoGlobalProvider.tokensProvider = globalMonaco.languages.setMonarchTokensProvider(
      'clickhouse',
      languageSettings as any
    );
    // update Completion
    window.monacoGlobalProvider.completionProvider = globalMonaco.languages.registerCompletionItemProvider(
      'clickhouse',
      {
        provideCompletionItems() {
          return completionItems;
        },
      }
    );
  };

  private bindKeys = (codeEditor: CodeEditor) => {
    const self = this;

    const KM = globalMonaco.KeyMod;
    const KC = globalMonaco.KeyCode;

    // ======== Command-Enter ========
    codeEditor.addAction({
      id: 'my-exec-code',
      label: 'Exec current query`s',
      keybindings: [KM.CtrlCmd | KC.Enter], // eslint-disable-line no-bitwise
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run(editor) {
        // self.parseEditorText('current', editor, monaco);
        // self.onAction(ActionType.RunCurrent);
        const queries = self.parseEditorText('current', editor);
        self.props.onAction(ActionType.RunCurrent, queries);
      },
    });
    // ======== Shift-Command-Enter ========
    codeEditor.addAction({
      id: 'my-exec-all',
      label: 'Exec All query',
      keybindings: [KM.Shift | KM.CtrlCmd | KC.Enter], // eslint-disable-line no-bitwise
      precondition: undefined,
      keybindingContext: undefined,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run(editor) {
        // self.parseEditorText('all', editor, monaco);
        // self.onAction(ActionType.RunAll);
        const queries = self.parseEditorText('all', editor);
        self.props.onAction(ActionType.RunAll, queries);
      },
    });
    // ======== Command+Shift+- / Command+Shift+= ========
    codeEditor.addCommand(
      KM.chord(KM.Shift | KM.CtrlCmd | KC.US_MINUS, 0), // eslint-disable-line no-bitwise
      () => {
        codeEditor.getAction('editor.foldAll').run();
      },
      ''
    );
    codeEditor.addCommand(
      KM.chord(KM.Shift | KM.CtrlCmd | KC.US_EQUAL, 0), // eslint-disable-line no-bitwise
      () => {
        codeEditor.getAction('editor.unfoldAll').run();
      },
      ''
    );
    // ======== Shift-CtrlCmd-F ========
    codeEditor.addCommand(
      KM.chord(KM.Shift | KM.CtrlCmd | KC.KEY_F, 0), // eslint-disable-line no-bitwise
      () => {
        codeEditor.getAction('editor.action.formatDocument').run();
      },
      ''
    );
    // ======== Cmd-Y ========
    codeEditor.addCommand(
      KM.chord(KM.CtrlCmd | KC.KEY_Y, 0), // eslint-disable-line no-bitwise
      () => {
        codeEditor.getAction('editor.action.deleteLines').run();
      },
      ''
    );

    // @todo: Command-Shift-[NUM]
    // for (let i = 0; i < 9; i++) {
    //     editor.addCommand(globalMonaco.KeyMod.chord( globalMonaco.KeyMod.Shift | globalMonaco.KeyMod.CtrlCmd | globalMonaco.KeyCode['KEY_'+i]), function() {
    //         console.warn('actionChangeTab',i);
    //         self.actionChangeTab(i);
    //     });
    // }

    // @todo:  Command-Left | Command-Right | Shift-Alt-Command-Right | Shift-Alt-Command-Right

    codeEditor.focus();
  };

  private onEditorDidMount = (editor: CodeEditor) => {
    this.setEditorRef(editor);

    // Save current component instance to map
    const modelUri = editor.getModel().uri;
    globalEditorsMap.set(modelUri, this);
    // Replace model uri when changed
    editor.onDidChangeModel(({ newModelUrl, oldModelUrl }) => {
      globalEditorsMap.delete(oldModelUrl);
      globalEditorsMap.set(newModelUrl, this);
    });
    // Clear current component instance from map
    editor.onDidDispose(() => {
      globalEditorsMap.delete(modelUri);
    });
    // Bind keys to Editor
    this.bindKeys(editor);
  };

  private makeQueryId = (): string => {
    let text: string = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 9; i += 1)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text.toLocaleLowerCase();
  };

  /**
   * tokenize all text in editor
   */
  public tokenizeModel = (
    model: monacoEditor.editor.ITextModel,
    cursorPos?: Position | undefined,
    selection?: Selection | undefined
  ): Array<Query> => {
    //

    /**
     *
     * Получаем ВЕСЬ текст (editor),
     * 1) Токинизируем, с разбивкой на ключевые составляющие которые нужны: KeyWords[SELECT,DELETE], TabixCommands
     * 2) Определяем выделенную область после токинизации
     * 3) Определяем какой текст выполнять
     */

    const cursorPosition = cursorPos || new Position(0, 0);

    const splitterQueryToken = 'warn-token.sql'; // Токен разбития на запросы
    const splitterTabixToken = 'tabix.sql'; // Токен разбития на запросы
    let countTabixCommandsInQuery: number = 0; // Кол-во tabix комманд запросе

    let tokensList: any[] = [];
    const tokens = globalMonaco.editor.tokenize(model.getValue(), 'clickhouse'); // ВЕСЬ текст редактора
    let countQuery: number = 0; // Кол-во запросов в тексте
    const splits: any[] = [];
    let splitToken = {
      line: 1,
      offset: 1,
      type: '',
      language: '',
    };
    let previousToken = {
      line: 1,
      offset: 1,
      type: '',
      language: '',
    };

    // Идем по токенам
    tokens.forEach((lineTokens, i) => {
      const line = i + 1;
      lineTokens.forEach(token => {
        const typeToken = token.type;
        // Если указан преведущий токен, вырезаем значение между текущим и преведущим
        if (previousToken.type) {
          const tokenRange = new globalMonaco.Range(
            previousToken.line,
            previousToken.offset,
            line,
            token.offset + 1 // ? + 1
          );

          const tokenText = model.getValueInRange(tokenRange); // Тут нужно выбирать из запроса
          const fetchToken = {
            ...previousToken,
            text: tokenText,
            range: tokenRange,
            inCursor: cursorPosition && tokenRange.containsPosition(cursorPosition),
            inSelected: selection && tokenRange.containsRange(selection),
          };

          tokensList.push(fetchToken);
        }

        previousToken = {
          ...token,
          line,
          offset: token.offset + 1,
        };
        // Для разрезки, первый токен всегда начало
        // if (!splitToken.type) {
        //   splitToken.line = line;
        //   splitToken = previousToken;
        //
        //   console.log('splitToken',splitToken);
        // }

        if (typeToken === splitterQueryToken || typeToken === splitterTabixToken) {
          // Если это токен раздиления запросов
          // Значит все что было до него это оединый запрос
          let trimCharTokens = 0;
          splits.push({
            numQuery: countQuery,
            numCommand: countTabixCommandsInQuery,
            startLineNumber: splitToken.line,
            startColumn: splitToken.offset,
            endLineNumber: line,
            endColumn: token.offset + 1,
            tokens: tokensList,
          });
          if (typeToken === splitterTabixToken) {
            countTabixCommandsInQuery += 1;
          } else {
            countQuery += 1;
            trimCharTokens = 2;
            countTabixCommandsInQuery = 0;
          }
          tokensList = [];
          // @ts-ignore
          splitToken = token;
          splitToken.type = token.type;
          splitToken.line = line;
          splitToken.offset = 1 + token.offset + trimCharTokens;
        }
      });
    });

    // push last or all
    splits.push({
      numQuery: countQuery,
      numCommand: countTabixCommandsInQuery,
      startLineNumber: splitToken.line,
      startColumn: splitToken.offset,
      endLineNumber: Number.MAX_VALUE,
      endColumn: Number.MAX_VALUE,
      tokens: tokensList,
    });

    // Прошлись по токенам 1 раз
    // Режем
    const listQuery: Array<Query> = [];

    splits.forEach(splitRange => {
      const numQuery: number = parseInt(splitRange.numQuery, 0);
      const range = new globalMonaco.Range(
        splitRange.startLineNumber,
        splitRange.startColumn,
        splitRange.endLineNumber,
        splitRange.endColumn
      );

      const text = model.getValueInRange(range);

      const inCursor = cursorPosition && range.containsPosition(cursorPosition);
      let inSelected = selection && selection.containsRange(range);
      if (selection) {
        if (range.containsPosition(selection.getEndPosition())) {
          inSelected = true;
        }
        if (range.containsPosition(selection.getStartPosition())) {
          inSelected = true;
        }
        if (range.containsPosition(selection.getPosition())) {
          inSelected = true;
        }
      }

      if (splitRange.numCommand === 0) {
        // это запрос

        // Проходим по всем Tokens одного запроса
        let isFormatSet: boolean = false;
        let isOperationCAD: boolean = false;
        let findSelectQuery: boolean = false;
        let format: string = 'FORMAT JSON';

        //
        if (splitRange.tokens) {
          // @ts-ignore
          splitRange.tokens.forEach(oToken => {
            if (oToken.type === 'storage.sql') {
              isFormatSet = true;
              format = oToken.text.trim();
            }
            if (oToken.type === 'keyword.other.DML.sql') {
              if (['SELECT'].indexOf(oToken.text.toUpperCase().trim()) !== -1) {
                findSelectQuery = true;
              }
            }
            if (oToken.type === 'keyword.sql') {
              if (['DROP', 'CREATE', 'ALTER'].indexOf(oToken.text.toUpperCase().trim()) !== -1) {
                isOperationCAD = true;
                findSelectQuery = false;
              }
            }
          });
        }

        if (!findSelectQuery) {
          format = '';
          isFormatSet = false;
        }

        listQuery[numQuery] = {
          ...splitRange,
          id: this.makeQueryId(),
          isExecutable: !(text.trim().length < 1),
          inCursor,
          sql: text,
          sqlOriginal: text,
          range,
          tokens: splitRange.tokens,
          numCommand: splitRange.numCommand,
          numQuery,
          inSelected,
          showProgressQuery: text.replace(/(\r\n|\n|\r)$/gm, '').substr(0, 130),
          isOperationCAD,
          variables: null,
          format,
          isFormatSet,
          extendSettings: '',
          currentDatabase: '',
          commands: [],
        };
      } else {
        // это комманда
        if (!listQuery[numQuery].commands) {
          listQuery[numQuery].commands = [];
        }
        // Находим typeOfCommand через поиск токена 'tabix.sql', его содержимое есть type
        let typeOfCommand = '';
        if (splitRange.tokens) {
          // @ts-ignore
          splitRange.tokens.forEach(oToken => {
            if (oToken.type === splitterTabixToken) {
              typeOfCommand = oToken.text;
            }
          });
        }
        // collect tokens
        listQuery[numQuery].commands.push({
          ...splitRange,
          type: typeOfCommand,
          code: text,
          inCursor,
          range,
          tokens: splitRange.tokens,
          numCommand: splitRange.numCommand,
          numQuery,
          inSelected,
        });
        // Если курсор на draw -> вся комманда на cursor
        if (inCursor && listQuery[numQuery] && !listQuery[numQuery].inCursor) {
          listQuery[numQuery].inCursor = true;
        }
      }
    });

    return listQuery;
  };

  /**
   * execute command
   *
   *
   * @param {string} _typeCommand
   * @param {monacoEditor.editor.ICodeEditor} editor
   * @return Array<Query>
   */
  protected parseEditorText = (
    _typeCommand: 'select' | 'current' | 'all',
    editor: monacoEditor.editor.ICodeEditor
  ): Array<Query> => {
    console.info(`%c------------>>> executeCommand >>>--------------`, 'color: red');
    // is user select text? yes - overwrite typeCommand
    let typeCommand = _typeCommand;
    // Fetch positions & selections
    const cursorPosition: Position = editor.getPosition(); // Позиция курсора
    const userSelection: Selection = editor.getSelection(); // Выбранная область
    const selectedText = editor.getModel().getValueInRange(userSelection);
    if (selectedText && selectedText.trim()) {
      if (typeCommand === 'current') {
        typeCommand = 'select';
      }
    }

    // Split all editor text to sql query, by tokens, result is queryParseList:Array<Query>

    const queryParseList = this.tokenizeModel(editor.getModel(), cursorPosition, userSelection);

    // console.log('queryParseList',queryParseList);
    const queryExecList: Array<Query> = [];

    queryParseList.forEach((_query: Query) => {
      // skip empty
      const query: Query = _query;
      if (!query.isExecutable) return;
      // if need only current
      // Если комманда исполнить текущий и выделен текст -> пропускаем все пока не найдем подходящий
      if (typeCommand === 'current') {
        if (!query.inCursor) return;
      }
      if (typeCommand === 'select') {
        if (!query.inSelected) return;
      }

      if (typeCommand === 'select') {
        // Переписываем область / Достаем выделенную область
        const intersect: IRange = query.range.intersectRanges(userSelection);
        const sqlSelect = editor.getModel().getValueInRange(intersect);
        query.sql = sqlSelect;
        query.isFormatSet = false;
        query.format = 'FORMAT JSON';
      }

      // insert TABIX_QUERY_ID
      query.sql = `/*TABIX_QUERY_ID_${query.id}*/ ${query.sql}`;

      if (!query.isFormatSet) {
        // Если у запроса НЕ указан формат
        query.sql = `${query.sql}\n${query.format}`;
      }

      query.currentDatabase = this.props.currentDatabase;

      queryExecList.push(query);
    });

    // Запросы которые необходимо отправть
    queryExecList.forEach((query: Query) => {
      console.log(query);
      console.info(`%c${query.sql}`, 'color: #bada55');
    });

    return queryExecList;
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
