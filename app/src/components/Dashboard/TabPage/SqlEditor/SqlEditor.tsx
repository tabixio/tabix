import React from 'react';
import { observer } from 'mobx-react';
import MonacoEditor from 'react-monaco-editor';
import monacoEditor, { IDisposable, IRange, Position, Selection } from 'monaco-editor';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import { Omit } from 'typelevel-ts';
import { ServerStructure } from 'services';
import { languageDef, configuration } from './Clickhouse';
import { theme_cobalt } from './Cobalt';
import { theme_vs_dark } from './Vsdark';
import Toolbar, { Props as ToolbarProps } from './Toolbar';
import css from './SqlEditor.css';

const monacoEditorOptions: monacoEditor.editor.IEditorConstructionOptions = {
    language: 'clickhouse',
    theme: 'cobalt',
    minimap: { enabled: false },
    selectOnLineNumbers: true,
    automaticLayout: true,
    formatOnPaste: true,
    fontFamily: 'Menlo',
    fontSize: 14,
};
/**
 * Global todo:
 * [-] Повесить эвент и переиминовывать кнопку -"Выполнить" : tab.buttonTitle = editor.getSelectedText() !== '' ? 'Run selected ⌘ + ⏎' : 'Run all ⇧ + ⌘ + ⏎';
 * [-] Выполнять updateEditorStructure после инициализации данных от сервера
 * [-] Подпиться на IModelTokensChangedEvent
 */
type Monaco = typeof monacoEditor;
export type CodeEditor = monacoEditor.editor.IStandaloneCodeEditor;
export interface TabixCommand {
    type: string;
    text: string;
}

export interface Variable {
    name: string;
    value: string;
}
export interface Query {
    id: string;
    tokens: any; //splitRange['tokens']
    sql: string;
    sqlOriginal: string;
    isExecutable: boolean;
    range: monacoEditor.IRange;
    inCursor: boolean;
    inSelected: boolean;
    numQuery: number;
    numCommand: number;
    commands: Array<TabixCommand>;
    showProgressQuery: string;
    isOperationCAD: boolean; // CreateAlterDrop
    format: string;
    isFormatSet: boolean;
    variables: Array<Variable> | null;
}
export interface ExecuteQuery {
    id: string;
    index: number;
    tokens: any;

    sql: string;
    originalSql: string;

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
        monaco.editor.defineTheme('cobalt', theme_cobalt);
        monaco.editor.defineTheme('vs-dark', theme_vs_dark);
        monaco.editor.setTheme('cobalt');
        // import('monaco/Сobalt.json')
        //     .then(data => {
        //         monaco.editor.defineTheme('cobalt', data);
        //     });

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
            this.updateEditorStructure(
                this.props.serverStructure,
                this.props.currentDatabase,
                monaco
            );
        } else {
            console.warn('serverStructure is not Init');
        }
    };
    private makeQueryId = (): string => {
        let text: string = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 9; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text.toLocaleLowerCase();
    };

    private tokenizeEditor = (
        monaco: Monaco,
        editor: monacoEditor.editor.ICodeEditor
    ): Array<Query> => {
        //

        /**
         *
         * Получаем ВЕСЬ текст (editor),
         * 1) Токинизируем, с разбивкой на ключевые составляющие которые нужны: KeyWords[SELECT,DELETE], TabixCommands
         * 2) Определяем выделенную область после токинизации
         * 3) Определяем какой текст выполнять
         *
         *
         */
        const splitterQueryToken = 'warn-token.sql'; // Токен разбития на запросы
        const splitterTabixToken = 'tabix.sql'; // Токен разбития на запросы
        let countTabixCommandsInQuery: number = 0; // Кол-во tabix комманд запросе

        const cursorPosition: Position = editor.getPosition(); // Позиция курсора
        const selection: Selection = editor.getSelection(); // Выбранная область
        let tokensList: any[] = [];
        const tokens = monaco.editor.tokenize(editor.getValue(), 'clickhouse'); // ВЕСЬ текст редактора
        let countQuery: number = 0; // Кол-во запросов в тексте
        let splits: any[] = [];
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
                    const ll_range = new monaco.Range(
                        previousToken.line,
                        previousToken.offset,
                        line,
                        token.offset + 1 // ? + 1
                    );

                    let tokenText = editor.getModel().getValueInRange(ll_range); // Тут нужно выбирать из запроса
                    const fetchToken = {
                        ...previousToken,
                        text: tokenText,
                        range: ll_range,
                        inCursor: ll_range.containsPosition(cursorPosition),
                        inSelected: ll_range.containsRange(selection),
                    };

                    tokensList.push(fetchToken);
                }

                previousToken = {
                    ...token,
                    line: line,
                    offset: token.offset + 1,
                };
                // Для разрезки, первый токен всегда начало
                if (!splitToken.type) {
                    splitToken.line = line;
                    splitToken = previousToken;
                }

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
                        countTabixCommandsInQuery++;
                    } else {
                        countQuery++;
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
            let numQuery = splitRange.numQuery;
            const range = new monaco.Range(
                splitRange.startLineNumber,
                splitRange.startColumn,
                splitRange.endLineNumber,
                splitRange.endColumn
            );

            const text = editor.getModel().getValueInRange(range);
            const inCursor = range.containsPosition(cursorPosition);
            let inSelected = selection.containsRange(range);
            if (range.containsPosition(selection.getEndPosition())) {
                inSelected = true;
            }
            if (range.containsPosition(selection.getStartPosition())) {
                inSelected = true;
            }
            if (range.containsPosition(selection.getPosition())) {
                inSelected = true;
            }

            if (splitRange.numCommand == 0) {
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
                        if (oToken.type === 'keyword.sql') {
                            if (['SELECT'].indexOf(oToken.text.toUpperCase()) != -1) {
                                findSelectQuery = true;
                            }
                            if (
                                ['DROP', 'CREATE', 'ALTER'].indexOf(oToken.text.toUpperCase()) != -1
                            ) {
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
                    inCursor: inCursor,
                    sql: text,
                    sqlOriginal: text,
                    range: range,
                    tokens: splitRange.tokens,
                    numCommand: splitRange.numCommand,
                    numQuery: numQuery,
                    inSelected: inSelected,
                    showProgressQuery: text.replace(/(\r\n|\n|\r)$/gm, '').substr(0, 130),
                    isOperationCAD: isOperationCAD,
                    variables: null,
                    format: format,
                    isFormatSet: isFormatSet,
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
                        if (oToken.type === 'tabix.sql') {
                            typeOfCommand = oToken.text;
                        }
                    });
                }
                listQuery[numQuery].commands.push({
                    ...splitRange,
                    type: typeOfCommand,
                    code: text,
                    inCursor: inCursor,
                    range: range,
                    tokens: splitRange.tokens,
                    numCommand: splitRange.numCommand,
                    numQuery: numQuery,
                    inSelected: inSelected,
                });
                // Если курсор на draw -> вся комманда на cursor
                if (inCursor && listQuery[numQuery] && !listQuery[numQuery].inCursor) {
                    listQuery[numQuery].inCursor = true;
                }
            }
        });

        return listQuery;
    };
    private executeCommand = (
        typeCommand: string,
        editor: monacoEditor.editor.ICodeEditor,
        _monaco: Monaco
    ) => {
        console.info(`%c------------>>> executeCommand >>>--------------`, 'color: red');
        // is user select text? yes - overwrite typeCommand
        const userSelection: IRange = editor.getSelection();
        const selectedText = editor.getModel().getValueInRange(userSelection);
        if (selectedText && selectedText.trim()) {
            if (typeCommand == 'current') {
                typeCommand = 'select';
            }
        }

        // Split all editor text to sql query, by tokens, result is queryParseList:Array<Query>
        let queryParseList = this.tokenizeEditor(_monaco, editor);

        // console.info('Result tokenizeEditor');
        // console.table(queryParseList);

        let queryExecList: Array<Query> = [];

        queryParseList.forEach((query: Query) => {
            // skip empty
            if (!query.isExecutable) return;
            // if need only current
            // Если комманда исполнить текущий и выделен текст -> пропускаем все пока не найдем подходящий
            if (typeCommand == 'current') {
                if (!query.inCursor) return;
            }
            if (typeCommand == 'select') {
                if (!query.inSelected) return;
            }

            if (typeCommand == 'select') {
                // Переписываем область / Достаем выделенную область
                const intersect = query.range.intersectRanges(userSelection);
                let sqlSelect=editor.getModel().getValueInRange(intersect);
                query.sql=sqlSelect;
                query.isFormatSet=false;
                query.format="FORMAT JSON";
            }

            // insert TABIX_QUERY_ID
            query.sql = `/*TABIX_QUERY_ID_${query.id}*/ ${query.sql}`;

            if (!query.isFormatSet) {
                // Если у запроса НЕ указан формат
                query.sql = `${query.sql} ${query.format}`;
            }
            queryExecList.push(query);
        });

        // Запросы которые необходимо отправть
        queryExecList.forEach((query: Query) => {
            console.info(`%c${query.sql}`, 'color: #bada55');
        });
        return;

        // const position = editor.getPosition();
        // const allValue = editor.getValue();
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
