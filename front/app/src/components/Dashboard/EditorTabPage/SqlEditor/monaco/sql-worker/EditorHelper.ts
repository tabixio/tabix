import * as monaco from 'monaco-editor';
import monacoEditor, { IRange, Position, Selection } from 'monaco-editor';
import { Query, ServerStructure } from 'services';
import { LanguageWorker } from './LanguageWorker';
import { SupportLanguage } from './supportLanguage';
import { CommonSQL } from './grammar';
import { v4 as UUIDv4 } from 'uuid';
import { TextInsertType } from '../../types';

type tMonaco = typeof monaco;
type ExecCallback = (isAllQuery: boolean) => void;
type IReadOnlyModel = monaco.editor.IReadOnlyModel;
type iCodeEditor = monaco.editor.ICodeEditor;

interface tbxIDisposable {
  d: monaco.IDisposable;
  id: string;
}

export interface oneToken {
  line: number;
  offset: number;
  type: string;
  language: string;
  text: string;
  range: monaco.Range;
  inCursor: boolean;
  inSelected: boolean;
}

export class EditorHelper {
  private id: string;
  private serverStructure?: ServerStructure.Server;
  private isRegistred = false;
  private monaco?: tMonaco;
  private language: SupportLanguage | null = null;
  private ready = false;

  constructor() {
    this.id = this.makeQueryId();
    // console.info('EditorHelper->create');
  }
  public getLanguage(): SupportLanguage | null {
    return this.language;
  }
  private languageParser(): CommonSQL {
    if (!this.language) {
      throw 'Error can`t CommonSQL() not set language';
    }
    return LanguageWorker.getParser(this.language);
  }

  public static addDisposable(d: monaco.IDisposable, helperId: string) {
    // hack for HotReload monacoEditor  когда hotReload или обновление структуры нужно удалить через dispose() созданные элементы
    if (!window.monacoGlobalProvider || !window.monacoGlobalProvider.IDisposable) {
      // ./app/types/app/index.d.ts
      window.monacoGlobalProvider = {
        IDisposable: [] as Array<tbxIDisposable>,
      };
    }
    window.monacoGlobalProvider.IDisposable.push({ d: d, id: helperId });
    // console.info( `EditorHelper->addDisposable(${helperId})`, window.monacoGlobalProvider.IDisposable.length );
  }

  public static disposeAll() {
    // see addDisposable(x)
    // hack for HotReload monacoEditor
    if (window.monacoGlobalProvider && window.monacoGlobalProvider.IDisposable.length) {
      // console.info(`EditorHelper->disposeAll()`);
      // clean
      for (let i: number = window.monacoGlobalProvider.IDisposable.length - 1; i >= 0; i -= 1) {
        const d = window.monacoGlobalProvider.IDisposable[i];
        d.d.dispose();
        window.monacoGlobalProvider.IDisposable.splice(i, 1);
      }
    }
  }

  public static haveDispose(): boolean {
    if (!window.monacoGlobalProvider) return false;
    if (!window.monacoGlobalProvider.IDisposable) return false;
    return window.monacoGlobalProvider.IDisposable.length;
  }

  public applyLanguage(language: SupportLanguage): void {
    if (this.language && this.language !== language) {
      this.onLanguageChange();
    }
    this.language = language;
    // console.info('EditorHelper->applyLanguage');
  }

  public onLanguageChange(): void {
    // ------------------------
    console.warn('!!! EditorHelper -> onLanguageChange');
    // ------------------------
  }

  public applyServerStructure(serverStructure: ServerStructure.Server, thisMonaco: tMonaco): void {
    // console.info('EditorHelper->applyServerStructure() ');
    this.serverStructure = serverStructure;
    LanguageWorker.setServerStructure(serverStructure);
  }

  public bindKeyExecCommand(
    editor: monaco.editor.IStandaloneCodeEditor,
    onExecCommand: ExecCallback
  ): void {
    const KM = monaco.KeyMod;
    const KC = monaco.KeyCode;
    // ======== Shift-Command-Enter ========
    editor.addAction({
      id: 'ExecAllCommand',
      label: 'Exec all query',
      keybindings: [KM.Shift | KM.CtrlCmd | KC.Enter], // eslint-disable-line no-bitwise
      precondition: undefined,
      keybindingContext: undefined,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run(editor) {
        onExecCommand(true);
      },
    });
    // ======== Command-Enter ========
    editor.addAction({
      id: 'ExecCurrentCode',
      label: 'Exec current query`s',
      keybindings: [KM.CtrlCmd | KC.Enter], // eslint-disable-line no-bitwise
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run(editor) {
        onExecCommand(false);
      },
    });
  }
  public bindBaseKeys(editor: monaco.editor.IStandaloneCodeEditor): void {
    // Keys
    const KM = monaco.KeyMod;
    const KC = monaco.KeyCode;
    // KeyMod.CtrlCmd | KeyCode.Tab for ctrl+tab on Win/Linux and cmd+tab on OSX,
    // KM.CtrlCmd | KC.KeyY -> macos: cmd+Y not work in chrome

    const actions = {
      'editor.action.deleteLines': {
        // Cmd-Y -> Drop line
        label: 'Delete line',
        keybindings: [KM.chord(KM.CtrlCmd | KC.KeyY, 0)],
      },
      'editor.foldAll': {
        // Command+Shift+-
        label: 'Fold All',
        keybindings: [KM.chord(KM.Shift | KM.CtrlCmd | KC.Minus, 0)],
      },
      'editor.unfoldAll': {
        // Command+Shift+=
        label: 'Unfold All',
        keybindings: [KM.chord(KM.Shift | KM.CtrlCmd | KC.Equal, 0)],
      },
      'editor.action.formatDocument': {
        label: 'Format Document',
        keybindings: [KM.chord(KM.Shift | KM.CtrlCmd | KC.KeyF, 0)],
      }, // Shift-CtrlCmd-F
    };
    for (const [cmd, key] of Object.entries(actions)) {
      editor.addAction({
        id: `key-${cmd}`,
        label: key.label,
        keybindings: key.keybindings,
        contextMenuGroupId: '1_modification',
        contextMenuOrder: 1.5,
        run(editor) {
          editor.getAction(cmd).run();
        },
      });
    }
  }

  public register(thisMonaco: tMonaco): void {
    // console.info('EditorHelper->Try Register()');
    if (!this.language) {
      console.error('Not set language', this.language);
      return;
    }
    if (this.isRegistred) {
      console.info('EditorHelper->Register() - skip, already done');
      return;
    }
    if (!this.serverStructure) {
      console.info('EditorHelper->Register() - skip, not set serverStructure');
      return;
    }
    // console.info('EditorHelper->Register()');
    // Link
    this.monaco = thisMonaco;
    // Register
    this.isRegistred = true;
    try {
      // language not register in global,create
      if (EditorHelper.haveDispose()) EditorHelper.disposeAll();
      this.registerLanguage(this.language, this.monaco);
      this.registerCompletion(this.language, this.monaco);
    } catch (e) {
      console.error('register error', e);
    }
    this.ready = true;
  }

  public isReady(): boolean {
    if (!this.language) {
      console.info('EditorHelper->WORKER not ready - language = false');
      return false;
    }
    if (!this.ready) {
      console.info('EditorHelper->WORKER not ready - ready = false');
      return false;
    }
    if (!this.monaco) {
      console.info('EditorHelper->WORKER not ready - monaco = false');
      return false;
    }
    return this.ready;
  }

  /**
   * LanguageWorker.Hover
   *
   * @param model
   * @param position
   * @param token
   */
  public getHover(
    model: IReadOnlyModel,
    position: monaco.Position,
    token: monaco.CancellationToken
  ): monaco.languages.ProviderResult<monaco.languages.Hover> {
    // GetHover
    return LanguageWorker.getHover(model, position, token);
  }

  /**
   * LanguageWorker.Suggestions
   *
   * @param model
   * @param position
   * @param context
   * @param token
   */
  public getSuggestions(
    model: IReadOnlyModel,
    position: monaco.Position,
    context: monaco.languages.CompletionContext,
    token: monaco.CancellationToken
  ): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
    return LanguageWorker.getSuggestions(model, position, context, token);
  }

  /**
   * Add&register Completion
   * @param language
   * @param thisMonaco
   */
  private registerCompletion(language: SupportLanguage, thisMonaco: tMonaco): void {
    // todo : drop use self
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    EditorHelper.addDisposable(
      thisMonaco.languages.registerCompletionItemProvider(language, {
        provideCompletionItems: self.getSuggestions,
      }),
      this.id
    );
    // thisMonaco.languages.reg();
    EditorHelper.addDisposable(
      thisMonaco.languages.registerHoverProvider(language, {
        provideHover: self.getHover,
      }),
      this.id
    );
  }

  public async OnChange(modelUri: string, content: string, offset : number) {
    
    if (this.language && modelUri) {
      LanguageWorker.parseAndApplyModel(this.language, modelUri, content , offset);
    }
  }

  /**
   * Set the editing configuration for the language
   *
   * @param language
   */
  private getIMonarchLanguage(): monaco.languages.IMonarchLanguage {
    //   lexer?.ruleNames -> ['INDEX', 'INF', 'INJECTIVE', 'INNER', 'INSERT', 'INTERVAL', 'INTO', 'IS', ]
    //   lexer?.literalNames -> [null,....,"'+'","'?'"]
    //   lexer?.symbolicNames -> ['ADD', 'AFTER', 'ALIAS', 'ALL', 'ALTER', 'AND', 'ANTI', 'ANY']
    // languageWords
    // languageSettings.builtinFunctions = [];
    // .typeKeywords
    // .keywordsGlobal
    // .keywords
    // .
    // Test method`s
    // ---
    let lang: monaco.languages.IMonarchLanguage;
    // Merge with server structure,  and support many lang`s
    lang = this.languageParser().getIMonarchLanguage() as monaco.languages.IMonarchLanguage;
    lang = LanguageWorker.getMonarchLanguage(lang);
    return lang;
  }

  /**
   * Register a new language and addDisposable list
   * @param language
   * @param thisMonaco
   * @private
   */
  private registerLanguage(language: SupportLanguage, thisMonaco: tMonaco): void {
    if (!thisMonaco.languages.getLanguages().some(({ id }) => id === this.language)) {
      thisMonaco.languages.register({ id: language, extensions: ['.sql'], aliases: ['chsql'] });
    }

    /**
     * Set the editing configuration for the language
     */
    EditorHelper.addDisposable(
      thisMonaco.languages.setMonarchTokensProvider(language, this.getIMonarchLanguage()),
      this.id
    );
    /**
     * Register a tokens provider for the language
     */
    EditorHelper.addDisposable(
      thisMonaco.languages.setLanguageConfiguration(
        language,
        this.languageParser().getLanguageConfiguration()
      ),
      this.id
    );
  }
  public insert(editor: iCodeEditor, textToInsert: string, mode: TextInsertType) {
    const line = editor.getPosition();
    // const line = this.monaco?.editor.getModel().get
    console.log('INSERTT', line);

    // const line = this.editor.getPosition();

    if (line && this.monaco) {
      const range = new this.monaco.Range(
        line.lineNumber,
        line.column + 1,
        line.lineNumber,
        line.column + 1
      );
      const id = { major: 1, minor: 1 };
      const op = { identifier: id, range, text: textToInsert, forceMoveMarkers: true };
      editor.executeEdits('my-source', [op]);
      editor.focus();
    }
  }

  private getVariables(q: string): any {
    return [];
  }

  private getSymbolicName(): any {
    //
    return [];
  }

  private makeQueryId(): string {
    return UUIDv4();
  }

  /**
   * Разбираем запрос[ы] на токены, ищем пересечение с курсором/выделенным
   *
   *
   * @param editor
   * @param isExecAll
   */
  public createExecCurrentQuery(editor: iCodeEditor, isExecAll: boolean): Array<Query> | null {
    console.info(`%c------------>>> executeCommand >>>--------------`, 'color: red');

    const queryExecList: Array<Query> = [];
    const model: monacoEditor.editor.ITextModel | null = editor.getModel();

    if (!this.monaco?.editor || !model) return null;
    let typeCommand = isExecAll ? 'all' : 'current'; // Тип комманды
    const cursorPosition: Position | null = editor.getPosition(); // Позиция курсора
    const userSelection: Selection | null = editor.getSelection(); // Выбранная область
    if (userSelection) {
      const selectedText = model.getValueInRange(userSelection);
      if (selectedText && selectedText.trim()) {
        if (typeCommand === 'current') {
          typeCommand = 'select';
        }
      }
    }
    // Токинизация
    const queryParseList = this.tokenizeQueryEditor(model, cursorPosition, userSelection);

    queryParseList.forEach((_query: Query) => {
      // skip empty
      const query: Query = _query;
      if (!query.settings.isExecutable) return;
      // if need only current
      // Если комманда исполнить текущий и выделен текст -> пропускаем все пока не найдем подходящий
      if (typeCommand === 'current') {
        if (!query.settings.inCursor) return;
      }
      if (typeCommand === 'select') {
        if (!query.settings.inSelected) return;
      }

      if (typeCommand === 'select' && userSelection) {
        // Переписываем область / Достаем выделенную область
        const intersect: IRange | null | undefined =
          query.settings.range?.intersectRanges(userSelection);
        if (intersect) {
          const sqlSelect = model.getValueInRange(intersect);
          query.sql = sqlSelect;
          query.setJsonFormat();
        }
      }

      if (!query.settings.isFormatSet) {
        // Если у запроса НЕ указан формат
        // query.sql = `${query.sql}\n${query.settings.format}`;
      }

      // query.currentDatabase = '';

      queryExecList.push(query);
    });

    return queryExecList;
  }

  /**
   * Токинизация через MonacoEditor
   *
   * @param model
   * @param cursorPos
   * @param selection
   */
  public tokenizeQueryEditor(
    model: monacoEditor.editor.ITextModel,
    cursorPos?: Position | null,
    selection?: Selection | null
  ): Array<Query> {
    // Прошлись по токенам 1 раз
    // Режем
    const listQuery: Array<Query> = [];
    if (!this.monaco?.editor) return listQuery;
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
    let countTabixCommandsInQuery = 0; // Кол-во tabix комманд запросе

    let tokensList: oneToken[] = [];

    // @TODO: Support multi langs
    const tokens = this.monaco?.editor.tokenize(model.getValue(), SupportLanguage.CLICKHOUSE); // ВЕСЬ текст редактора
    console.warn('tokens', tokens);
    let countQuery = 0; // Кол-во запросов в тексте
    const splits: any[] = [];
    const splitToken = {
      line: 1,
      offset: 1,
      type: '',
    };
    let previousToken = {
      line: 1,
      offset: 1,
      type: '',
      language: '',
    };

    // Идем по токенам
    tokens.forEach((lineTokens: monaco.Token[], i) => {
      const line = i + 1;
      lineTokens.forEach((token) => {
        const typeToken = token.type;

        // Если указан преведущий токен, вырезаем значение между текущим и преведущим
        if (previousToken.type) {
          const tokenRange = new monaco.Range(
            previousToken.line,
            previousToken.offset,
            line,
            token.offset + 1 // ? + 1
          );

          const tokenText = model.getValueInRange(tokenRange); // Тут нужно выбирать из запроса
          const fetchToken: oneToken = {
            ...previousToken,
            text: tokenText,
            range: tokenRange,
            inCursor: cursorPosition && tokenRange.containsPosition(cursorPosition),
            inSelected: !!(selection && tokenRange.containsRange(selection)),
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
          // Если это токен разделения запросов
          // Значит все что было до него это общий запрос
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

          splitToken.type = token.type;
          splitToken.line = line;
          splitToken.offset = 1 + token.offset + trimCharTokens;
        } // if split token
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

    // Идем по разбитым запросам
    splits.forEach((splitRange) => {
      const numQuery: number = parseInt(splitRange.numQuery, 0);
      const range = new monaco.Range(
        splitRange.startLineNumber,
        splitRange.startColumn,
        splitRange.endLineNumber,
        splitRange.endColumn
      );
      const text = model.getValueInRange(range);
      const inCursor = cursorPosition && range.containsPosition(cursorPosition);
      let inSelected = !!(selection && selection.containsRange(range));
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
        let isFormatSet = false;
        let isOperationCAD = false;
        let findSelectQuery = false;
        let format = 'JSON';

        //
        if (splitRange.tokens) {
          splitRange.tokens.forEach((oToken: oneToken) => {
            if (oToken.type === 'storage.sql') {
              isFormatSet = true;
              // format = oToken.text.trim().replace('FORMAT ', '');
              // console.log('formatformatformatformatformat', format);
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
        listQuery[numQuery] = new Query(text, this.makeQueryId());
        listQuery[numQuery].settings = {
          isExecutable: !(text.trim().length < 1),
          range,
          inCursor,
          tokens: splitRange.tokens,
          numCommand: splitRange.numCommand,
          numQuery,
          inSelected,
          isOperationCAD,
          variables: null,
          extendSettings: '',
          currentDatabase: '',
          commands: [],
          format,
          isFormatSet,
        };
      } else {
        // это комманда
        if (!listQuery[numQuery].settings.commands) {
          listQuery[numQuery].settings.commands = [];
        }
        // Находим typeOfCommand через поиск токена 'tabix.sql', его содержимое есть type
        let typeOfCommand = '';
        if (splitRange.tokens) {
          splitRange.tokens.forEach((oToken: oneToken) => {
            if (oToken.type === splitterTabixToken) {
              typeOfCommand = oToken.text;
            }
          });
        }
        // collect tokens
        listQuery[numQuery].settings.commands = [];
        // if (listQuery[numQuery].settings.commands)
        //   listQuery[numQuery].settings.commands.push({
        //     ...splitRange,
        //     type: typeOfCommand,
        //     code: text,
        //     inCursor,
        //     range,
        //     tokens: splitRange.tokens,
        //     numCommand: splitRange.numCommand,
        //     numQuery,
        //     inSelected,
        //   });
        // Если курсор на draw -> вся комманда на cursor
        if (inCursor && listQuery[numQuery] && !listQuery[numQuery].settings.inCursor) {
          listQuery[numQuery].settings.inCursor = true;
        }
      }
    });
    return listQuery;
  }
}
