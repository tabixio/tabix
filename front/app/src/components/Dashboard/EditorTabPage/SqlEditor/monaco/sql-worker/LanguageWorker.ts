import monacoEditor from 'monaco-editor';
import { ServerStructure } from 'services';
import * as monaco from 'monaco-editor';
import { CommonSQL, ParsedQuery } from './grammar';
import { SupportLanguage } from './supportLanguage';
import { ModelOfEditor } from './ModelOfEditor';

type IReadOnlyModel = monaco.editor.IReadOnlyModel;

interface keywordLanguage {
  word: string;
  type: monaco.languages.CompletionItemKind;
  sort: number;
}

export abstract class LanguageWorker {
  static completionItems: Array<monacoEditor.languages.CompletionItem> = [];

  static serverStructure: ServerStructure.Server;

  static keywordsLanguage: Array<keywordLanguage>;
  // Static Map to SQL parsers
  static parserMap: Map<string, CommonSQL> = new Map<string, CommonSQL>();
  static modelMap: Map<string, ModelOfEditor> = new Map<string, ModelOfEditor>();

  static getModel(modelUri: string) {
    if (!LanguageWorker.modelMap.has(modelUri)) {
      LanguageWorker.modelMap.set(modelUri, new ModelOfEditor(modelUri));
    }
    const m = LanguageWorker.modelMap.get(modelUri);
    if (!m) throw 'Error can`t LanguageWorker->getModel';
    return m;
  }

  static getParser(language: SupportLanguage): CommonSQL {
    if (!LanguageWorker.parserMap.has(language)) {
      LanguageWorker.parserMap.set(language, new CommonSQL(language));
    }
    const d = LanguageWorker.parserMap.get(language);
    if (!d) throw 'Error can`t LanguageWorker->getParser->CommonSQL()';
    return d;
  }

  public static setServerStructure(serverStructure: ServerStructure.Server) {
    // console.info('SuggestionsMaker->setServerStructure()');
    this.serverStructure = serverStructure;
  }

  public static parseAndApplyModel(
    language: SupportLanguage,
    modelUri: string,
    query: string,
    offset: number
  ): void {
    const parser = LanguageWorker.getParser(language);
    if (!parser) {
      console.warn('No parser for ', language);
      return;
    }
    // Get position cursor
    // position: monaco.Position,

    // Fetch exists model by uri
    LanguageWorker.getModel(modelUri).process(parser.parse(query, offset));
  }

  public static tokinize(query: string): void {
    // Use ANTL4?
    /**
     * Тут делаем токенизацию
     * 1. Определяем наличие ошибок
     * 2. Разбиваем запросы
     * 3. В текущем запросе находим таблицу(базу) - автокомлиту добавим все фильды таблицы
     * 4. Если есть `AS` - ассоциации -> добавим их автокомлиту
     * 5. Если есть `WITH AS` - ассоциации -> добавим их автокомлиту
     * 6. Если секция находится в WHERE ... тут можно добавить ассоциации из 4,5
     *
     *
     */
  }

  public static getMonarchLanguage(
    language: monaco.languages.IMonarchLanguage
  ): monaco.languages.IMonarchLanguage {
    language.builtinFunctions = [];
    // highlight-s
    this.serverStructure?.databases.forEach((db: ServerStructure.Database) => {
      db.tables.forEach((table: ServerStructure.Table) => {
        // highlight tables and databases
        language.dbtables.push(`${table.database}.${table.insertName}`);
        language.dbtables.push(`${table.database}.${table.insertName.replace(/"/g, '`')}`);
        language.tables.push(`${table.insertName}`);
        language.tables.push(`${db.name}`); // uniq???

        table.columns.forEach((column: ServerStructure.Column) => {
          // column
          language.fields.push(`${table.insertName}.${column.name}`);
          language.fields.push(`${column.name}`);
        });
      });
    });
    // Add Functions
    if (this.serverStructure?.editorRules) {
      this.serverStructure.editorRules.builtinFunctions.forEach((func: any) => {
        language.builtinFunctions.push(func.name);
      });
    }
    this.keywordsLanguage = [] as Array<keywordLanguage>;

    // keywordsLang

    // push to completionItems: languageClickhouse
    if (language.keywordsGlobal?.length) {
      language.keywordsGlobal.forEach((word: string) => {
        this.keywordsLanguage.push({
          type: monaco.languages.CompletionItemKind.Keyword,
          sort: 0,
          word,
        });
      });
    }
    if (language.builtinVariables?.length) {
      language.builtinVariables.forEach((word: string) => {
        this.keywordsLanguage.push({
          type: monaco.languages.CompletionItemKind.Variable,
          sort: 1110,
          word,
        });
      });
    }
    if (language.typeKeywords?.length) {
      language.typeKeywords.forEach((word: string) => {
        this.keywordsLanguage.push({
          type: monaco.languages.CompletionItemKind.Property,
          sort: 110,
          word,
        });
      });
    }
    // Todo : FORMAT JSON,FORMAT CSV...
    // SYSTEM RELOAD,SYSTEM DROP DNS CACHE...
    return language;
  }

  public static getHover(
    model: IReadOnlyModel,
    position: monaco.Position,
    token: monaco.CancellationToken
  ): monaco.languages.ProviderResult<monaco.languages.Hover> {
    const modelUri: string = model.uri.toString();
    // Make hover
    const offset: number = model.getOffsetAt(position);

    // this.getCommonSQL(language).parse(content).haveStatement();

    const hovers: monaco.IMarkdownString[] = [];
    // model.getWordAtPosition(position).word;
    const currentWord = model.getWordAtPosition(position)?.word;

    // model.getText()
    // hovers.push({ value: '\n`[' + currentWord + ':' + offset + '`]\n' });
    hovers.push({ value: LanguageWorker.getModel(modelUri).getHover(offset) });
    // hovers.push({
    //   // isTrusted: true,
    //   // supportHtml: true,
    //   value: '| foo | bar |\n   | --- | --- |\n| baz |  `bim` |\n| b2z   |  bHm |\n',
    //   // value: '```sql\n' + ' SELECT * FRA```\n',
    // });
    return { contents: hovers };
    // Range&IMarkdownString
  }

  public static getSuggestions(
    model: IReadOnlyModel,
    position: monaco.Position,
    context: monaco.languages.CompletionContext,
    token: monaco.CancellationToken
  ): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
    const modelUri: string = model.uri.toString();

    // console.warn(
    //   'LanguageWorker.getSuggestions',
    //   LanguageWorker.getModel(modelUri).getSuggestions()
    // );

    const completionItems: Array<monaco.languages.CompletionItem> = [];
    const offset: number = model.getOffsetAt(position);
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
    let sort = 0;
    // --------- keywords
    if (this.keywordsLanguage.length) {
      this.keywordsLanguage.forEach((key) => {
        sort++;
        completionItems.push({
          label: key.word,
          insertText: key.word,
          kind: key.type,
          sortText: 'A' + sort,
          detail: `Keyword`,
          range,
        });
      });
    }
    if (this.serverStructure?.databases) {
      this.serverStructure?.databases.forEach((db: ServerStructure.Database) => {
        // Completion:dbName
        sort++;
        completionItems.push({
          label: db.name,
          insertText: db.name,
          kind: monaco.languages.CompletionItemKind.Reference,
          detail: `Database`,
          sortText: 'B' + sort,
          range,
        });
        // Completion:Tables
        db.tables.forEach((table: ServerStructure.Table) => {
          // table
          // completionItems.push({
          //   label: table.name,
          //   insertText: `${table.insertName}`,
          //   kind: monaco.languages.CompletionItemKind.Interface,
          //   detail: `table:${table.engine}`,
          //   documentation: table.id,
          //   range,
          // });
          sort++;
          completionItems.push({
            label: `${table.database}.${table.insertName}`,
            insertText: `${table.database}.${table.insertName}`,
            kind: monaco.languages.CompletionItemKind.Interface,
            detail: `${table.engine}`,
            documentation: table.id,
            sortText: 'C' + sort,
            range,
          });
        });
      });
    } // <-databases
    // push to completionItems: builtinFunctions & Dictionaries
    const c = 0;
    if (this.serverStructure?.editorRules) {
      this.serverStructure.editorRules.builtinFunctions?.forEach((func: any) => {
        // if (c > 5) return;
        sort++;
        completionItems.push(
          // interface CompletionItem
          {
            //  {name: "isNotNull", isaggr: 0, score: 101, comb: false, origin: "isNotNull"}
            label: func.name,
            insertText: `${func.name}(`,
            kind: monaco.languages.CompletionItemKind.Function,
            sortText: 'D' + sort,
            detail: `Function`,
            range,
          }
        );
      });

      // @TODO: add insertTextRules,

      // ----- push to completionItems: Dictionaries
      this.serverStructure.editorRules.dictionaries?.forEach((dic: any) => {
        sort++;
        completionItems.push({
          label: dic.title,
          insertText: `${dic.dic}`,
          kind: monaco.languages.CompletionItemKind.Snippet,
          sortText: 'F' + sort,
          detail: `dic ${dic.dic}`,
          range,
        });
      });
    } // <-editorRules
    // ---------------------------------------------------------------------------
    if (!this.serverStructure) {
      console.warn('Not init serverStructure');
      return { suggestions: completionItems };
    } else {
      const sug = LanguageWorker.getModel(modelUri).getSuggestions(offset, this.serverStructure);
      sort++;
      sug.forEach((i) => {
        completionItems.push({
          label: i.label,
          insertText: i.label,
          kind: monaco.languages.CompletionItemKind.Field,
          sortText: '0' + sort,
          detail: i.detail,
          range,
        });
      });
    }
    return { suggestions: completionItems };
  }
}

// return { suggestions: completionItems };
