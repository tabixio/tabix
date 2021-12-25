import * as monaco from 'monaco-editor';
import { Query, ServerStructure } from 'services';
import monacoEditor, {IRange, Position, Selection} from 'monaco-editor';
import { SuggestionsMaker } from './SuggestionsMaker';
import { SupportLanguage } from './supportLanguage';
import { configurationClickhouse, languageClickhouse } from './editorConfig';
import { ClickhouseSQL, CommonSQL } from './grammar';
// import {VocabularyPack} from './lib/vocabularyPack';
type tMonaco = typeof monaco;

type IReadOnlyModel = monaco.editor.IReadOnlyModel;
type iCodeEditor = monaco.editor.ICodeEditor;

export interface oneToken {
  line: number,
  offset: number;
  type: string;
  language: string;
  text:string,
  range: monaco.Range,
  inCursor: boolean,
  inSelected: boolean,
}

export class SqlWorker {
  private serverStructure?: ServerStructure.Server;

  private monaco?: tMonaco;

  private languageWords: any;

  private parserMap: Map<string, CommonSQL>;

  constructor() {
    this.parserMap = new Map<string, CommonSQL>();
    // console.info("SqlWorker->create");
    //
  }

  //
  // private getTableCompletionSuggestions = (
  //   model: IReadOnlyModel,
  //   position: monaco.Position,
  //   context: monaco.languages.CompletionContext,
  //   token: monaco.CancellationToken
  // ): monaco.languages.ProviderResult<monaco.languages.CompletionList> =>
  //   // See monaco/lang/compl
  //   this.sqlWorker.getSuggestions(
  //     model,
  //     position,
  //     context,
  //     token,
  //     this.props.currentDatabase,
  //     this.props.serverStructure
  //   );
  public applyServerStructure(serverStructure: ServerStructure.Server, thisMonaco: tMonaco): void {
    this.serverStructure = serverStructure;
    SuggestionsMaker.setServerStructure(serverStructure, thisMonaco);
  }

  private getParserANTLR(language: SupportLanguage): CommonSQL | undefined {
    if (!this.parserMap.has(language)) {
      // @TODO: Support other lang
      this.parserMap.set(language, new ClickhouseSQL());
    }
    return this.parserMap.get(language);
  }

  public register(language: SupportLanguage, thisMonaco: tMonaco): void {
    console.info('register1');
    // thisMonaco.editor.getModel().id;
    this.monaco = thisMonaco;
    this.registerLanguage(language, thisMonaco);
    this.registerCompletion(language, thisMonaco);
  }

  public getSuggestions(
    model: IReadOnlyModel,
    position: monaco.Position,
    context: monaco.languages.CompletionContext,
    token: monaco.CancellationToken
  ): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
    return SuggestionsMaker.getSuggestions(model, position, context, token);
  }

  /**
   * Add CompletionItemProvider
   * @param language
   * @param thisMonaco
   */
  private registerCompletion(language: SupportLanguage, thisMonaco: tMonaco): void {
    //
    const self = this;
    // this.addProvider(language,Completion) =
    thisMonaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: self.getSuggestions,
    });
  }

  /**
   * Register a tokens provider for the language
   *
   * @param language
   */
  private getLanguageConfiguration(
    language: SupportLanguage
  ): monaco.languages.LanguageConfiguration {
    return configurationClickhouse as monaco.languages.LanguageConfiguration;
  }

  /**
   * Set the editing configuration for the language
   *
   * @param language
   */
  private getIMonarchLanguage(language: SupportLanguage): monaco.languages.IMonarchLanguage {
    //   lexer?.ruleNames -> ['INDEX', 'INF', 'INJECTIVE', 'INNER', 'INSERT', 'INTERVAL', 'INTO', 'IS', ]
    //   lexer?.literalNames -> [null,....,"'+'","'?'"]
    //   lexer?.symbolicNames -> ['ADD', 'AFTER', 'ALIAS', 'ALL', 'ALTER', 'AND', 'ANTI', 'ANY']
    // languageWords
    // languageSettings.builtinFunctions = [];
    // .typeKeywords
    // .keywordsGlobal
    // .keywords
    // .

    const p = this.getParserANTLR(language);
    console.warn(' p p p p', language, p);

    if (p) {
      console.warn('parseDefault', p.parseDefault());
      console.warn('getLexer', p.getLexer());
      console.warn('getParser', p.getParser());
      console.warn('getSymbolicNames', p.getSymbolicNames());

      // const voc = new VocabularyPack(p.getLexer(),p.getParser());
      // console.info('VOC',voc);
      //
    }
    //  serverStructure.editorRules.builtinFunctions.forEach((func: any) => {
    //         languageSettings.builtinFunctions.push(func.name);

    // highlight tables and databases
    // languageSettings.dbtables.push(`${table.database}.${table.insertName}`);
    // languageSettings.dbtables.push(`${table.database}.${table.insertName.replace(/"/g, '`')}`);
    // languageSettings.tables.push(`${table.insertName}`);
    // languageSettings.tables.push(`${db.name}`);
    //
    // table.columns.forEach((column: ServerStructure.Column) => {
    //   // col highlingts
    //   languageSettings.fields.push(`${table.insertName}.${column.name}`);
    //   languageSettings.fields.push(`${column.name}`);
    // });
    let lang: monaco.languages.IMonarchLanguage;

    // if (language === SupportLanguage.CLICKHOUSE) {  // @TODO: Support other language

    lang = languageClickhouse as monaco.languages.IMonarchLanguage;

    // Merge

    //
    return lang;
  }

  private registerLanguage(language: SupportLanguage, thisMonaco: tMonaco): void {
    // Register a new language - add clickhouse
    thisMonaco.languages.register({ id: language, extensions: ['.sql'], aliases: ['chsql'] });
    // this.addProvider(language,Monarc) =
    thisMonaco.languages.setMonarchTokensProvider(language, this.getIMonarchLanguage(language));
    thisMonaco.languages.setLanguageConfiguration(
      language,
      this.getLanguageConfiguration(language)
    );
  }

  private getVariables(q: string): any {
    return [];
  }

  private getSymbolicName(): any {
    //
    return [];
  }

  private makeQueryId(): string {
    let text: string = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 9; i += 1)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text.toLocaleLowerCase();
  }

  /**
   * Разбираем запрос[ы] на токены, ищем пересечение с курсором/выделенным
   *
   *
   * @param editor
   * @param isExecAll
   */
  public createExecCurrentQuery(editor: iCodeEditor, isExecAll: boolean): Array<Query>|null
  {
    console.info(`%c------------>>> executeCommand >>>--------------`, 'color: red');

    const queryExecList: Array<Query> = [];
    const model: monacoEditor.editor.ITextModel | null = editor.getModel();

    if (!this.monaco?.editor || !model) return null;
    let typeCommand=(isExecAll ? 'all' : 'current');  // Тип комманды
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
      if (!query.isExecutable) return;
      // if need only current
      // Если комманда исполнить текущий и выделен текст -> пропускаем все пока не найдем подходящий
      if (typeCommand === 'current') {
        if (!query.inCursor) return;
      }
      if (typeCommand === 'select') {
        if (!query.inSelected) return;
      }

      if (typeCommand === 'select' && userSelection) {
        // Переписываем область / Достаем выделенную область
        const intersect: IRange | null = query.range.intersectRanges(userSelection);
        if (intersect) {
          const sqlSelect = model.getValueInRange(intersect);
          query.sql = sqlSelect;
          query.isFormatSet = false;
          query.format = 'FORMAT JSON';
        }
      }

      // insert TABIX_QUERY_ID
      query.sql = `/*TABIX_QUERY_ID_${query.id}*/ ${query.sql}`;

      if (!query.isFormatSet) {
        // Если у запроса НЕ указан формат
        query.sql = `${query.sql}\n${query.format}`;
      }

      query.currentDatabase = '';

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
    let countTabixCommandsInQuery: number = 0; // Кол-во tabix комманд запросе

    let tokensList: oneToken[] = [];

    // @TODO: Support multi langs
    const tokens = this.monaco?.editor.tokenize(model.getValue(), SupportLanguage.CLICKHOUSE); // ВЕСЬ текст редактора
    console.warn('tokens', tokens);
    let countQuery: number = 0; // Кол-во запросов в тексте
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
      lineTokens.forEach(token => {
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
          const fetchToken : oneToken = {
            ...previousToken,
            text: tokenText,
            range: tokenRange,
            inCursor: cursorPosition && tokenRange.containsPosition(cursorPosition),
            inSelected: ( !!(selection && tokenRange.containsRange(selection))) ,
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
    splits.forEach(splitRange => {
      const numQuery: number = parseInt(splitRange.numQuery, 0);
      const range = new monaco.Range(
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
          splitRange.tokens.forEach((oToken:oneToken) => {
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

          splitRange.tokens.forEach((oToken:oneToken) => {
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
  }
}
