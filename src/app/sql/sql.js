// @todo : костылик , не получилось сделать http://stackoverflow.com/questions/22166784/dynamically-update-syntax-highlighting-mode-rules-for-the-ace-editor
window.global_keywords_fields = "";
window.global_keywords_tables = "";

(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('SqlController', SqlController);
    SqlController.$inject = [
        '$scope',
        '$rootScope',
        '$window',
        'localStorageService',
        'API',
        '$mdSidenav',
        '$mdDialog',
        '$mdToast',
        'ThemeService',
        '$timeout',
        '$filter'
    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:SqlController
     * @description Контроллер выполнения SQL запросов к БД
     */
    function SqlController($scope, $rootScope, $window, localStorageService, API, $mdSidenav, $mdDialog, $mdToast, ThemeService, $timeout, $filter) {

        const SQL_HISTORY_KEY = 'sqlHistory2';

        $scope.vars = {
            sqlHistory: localStorageService.get(SQL_HISTORY_KEY) || [],
            dictionaries: [],
            tabs: [],
            uiTheme: ThemeService.themeObject,
            uiThemes: ThemeService.list,
            currentTab: {},
            selectedTab: 0,
            formats: [{
                name: 'Таблица',
                sql: ' format JSON',
                render: 'html'
            }, {
                name: 'JSON compact',
                sql: ' format JSONCompact'
            }
            ],
            db: null,
            limitRows: localStorageService.get('editorLimitRows') || 500,
            fontSize: localStorageService.get('editorFontSize') || 16,
            theme: localStorageService.get('editorTheme') || 'cobalt'
        };
        $scope.vars.format = $scope.vars.formats[0];
        $scope.vars.themes = [
            'ambiance',
            'eclipse', 'mono_industrial', 'tomorrow_night_blue',
            'chaos', 'github', 'monokai', 'tomorrow_night_bright',
            'chrome', 'idle_fingers', 'pastel_on_dark', 'tomorrow_night_eighties',
            'clouds', 'iplastic', 'solarized_dark', 'tomorrow_night',
            'clouds_midnight', 'katzenmilch', 'solarized_light', 'twilight',
            'cobalt', 'kr_theme', 'sqlserver', 'vibrant_ink',
            'crimson_editor', 'kuroir', 'terminal', 'xcode',
            'dawn', 'merbivore', 'textmate',
            'dreamweaver', 'merbivore_soft', 'tomorrow'
        ];
        $rootScope.breadcrumbs = [{
            text: 'SQL',
            link: 'sql'
        }];

        /**
         * Предотвращаю потерю SQL данных при закрытии окна
         */
        $window.onbeforeunload = (event) => {
            if ($scope.vars.currentTab.sql !== '' && location.hostname != 'localhost') {
                let message = 'Хотите покинуть страницу?';
                if (typeof event == 'undefined') {
                    event = window.event;
                }
                if (event) {
                    event.returnValue = message;
                }
                return message;
            }
        };

        /**
         * Предотвращаю потерю SQL данных при смене стейта
         */
        let clearRouterListener = $scope.$on('$stateChangeStart', (event) => {
            let message = 'Хотите покинуть страницу?';
            if (!event.defaultPrevented && $scope.vars.currentTab !== '' && !confirm(message)) {
                event.preventDefault();
            }
        });

        /**
         * @ngdoc method
         * @methodOf smi2.controller:SqlController
         * @name executeQuery
         * @description Выполненеие одного SQL запроса
         * @param {} query
         */
        $scope.executeQuery = (query, queue, resultContainer) => {

            // содержит дополнительные GET параметры для выполнения запрос
            let extendSettings = '';

            $scope.vars.currentTab.loading = true;

            // если указан limitRows
            if ($scope.vars.limitRows) {
                extendSettings += 'max_result_rows=' + $scope.vars.limitRows + '&result_overflow_mode=throw';
            }

            API.query(query.sql, query.format, true, extendSettings).then((data) => {

                let r = data;

                if (typeof data !== 'object') {
                    data = {
                        data: r,
                        meta: null,
                        rows: null,
                        statistics: null
                    };
                }
                data.error = false;
                data.query = query;
                let resultData = $scope.renderResult(data);
                resultContainer.data.push(resultData);

                // Рекурсивный вызов executeQuery если в очереди
                // еще остались элементы
                if ((query.index + 1) < queue.length) {
                    $scope.executeQuery(queue[query.index + 1], queue, resultContainer);
                }
                else {
                    // отрисовка
                    $scope.renderFinalResult(resultContainer);
                }

            }, (response) => {
                $mdToast.show(
                    $mdToast
                        .simple()
                        .content('Ошибка')
                        .theme(ThemeService.theme)
                        .position('bottom right')
                );

                let result = {
                    meta: null,
                    rows: null,
                    query: query,
                    statistics: null
                };
                if (response && response.data) {
                    result.error = angular.toJson(response.data).replace(/\\n/gi, '<br/>').replace(/^"/, '').replace(/"$/, '');
                } else {
                    result.error = response;
                }
                resultContainer.data.push($scope.renderResult(result));

                $scope.renderFinalResult(resultContainer);
            });
        };

        /**
         * Show results
         * @param data
         * @returns {*}
         */
        $scope.renderResult = (data) => {
            if (typeof data.error == 'string') {
                data.result = '<pre class="fs-caption tc-red-700">' + data.error + '</pre>';
            }
            else if (typeof data.data !== 'object') {
                if (typeof data.data !== 'string') {
                    data.result = '<pre class="fs-caption">' + angular.toJson(data.data, true) + '</pre>';
                }
                else {
                    data.result = '<pre class="fs-caption">' + data.data + '</pre>';
                }
            }
            else {
                data.result = API.dataToHtml(data);
                data.createtable = API.dataToCreateTable(data);
            }
            data.data = false;
            return data;
        };

        /**
         * Operations after render
         * @param result
         */
        $scope.renderFinalResult = (result) => {
            $scope.vars.currentTab.loading = false;
            if(result.data.find((item) => (
                ['DROP','CREATE','ALTER'].indexOf(
                    item.query.keyword.toUpperCase()
                ) != -1
            ))) {
                $scope.selectDatabase($scope.vars.db);
            }
        };

        /**
         * Execute SQL statement
         * @param type
         */
        $scope.execute = (type, tab) => {

            let sql = tab.sql;
            let numquery = 0;
            const editor = tab.editor;
            let queue = [];
            let selectSql = editor.getSelectedText();
            let result = {
                data: [],
                time: $filter('date')(new Date(), 'HH:mm:ss'),
                pinned: false
            };

            // получаем выделенный текст, и если выделено - ранаем выделение
            if (!(selectSql === '' || selectSql === null)) {
                sql = selectSql;
            }

            // Выход если пустой sql
            if (sql === '' || sql === null) {
                $mdToast.show(
                    $mdToast
                        .simple()
                        .content('Не введен SQL')
                        .theme(ThemeService.theme)
                        .position('bottom right')
                );

                return;
            }

            // Clear not-pinned tabs
            tab.results = tab.results.reduce((arr, item) => {
                if(item.pinned) {
                   arr.push(item);
                }
                return arr;
            }, []);
            tab.results.unshift(result);

            // Split SQL into subqueries
            editor
                .session
                .$mode
                .splitByTokens(sql, 'constant.character.escape', ';;')
                .forEach((item) => {

                const subSql = item.sql;

                // Ignore short queries
                if (subSql.length < 5) {
                    return;
                }

                // Если комманда исполнить текущий и НЕ выделен текст -> пропускаем все пока не найдем подходящий
                if (type == 'current' && !selectSql) {
                    let cursor = editor.selection.getCursor();

                    if (!cursor ||
                        !angular.isDefined(cursor) ||
                        item.range.compare(cursor.row, cursor.column) !== 0) {
                        return;
                    }
                }

                let _format = null;
                let _format_seted = false;
                let storage = false;
                let _keyword = null;
                let set_format = editor.session.$mode.findTokens(subSql, "storage", true);
                let keyword = editor.session.$mode.findTokens(subSql, "keyword", true);

                if (set_format.hasOwnProperty('value')) {
                    _format = false;
                    storage = set_format.value;
                }
                else {
                    _format = ' FORMAT JSON ';
                    _format_seted = true;
                }
                if (keyword.hasOwnProperty('value')) {
                    _keyword = keyword.value;
                }
                if (_keyword !== 'select') {
                    _format = false;
                    _format_seted = false;
                }

                // Queue creation
                queue.push({
                    sql: subSql,
                    index: numquery,
                    format: _format,
                    setedformat: _format_seted,
                    keyword: _keyword,
                    storage: storage
                });

                numquery++;
            });

            if (queue.length) {
                $scope.executeQuery(queue[0], queue, result);
            }

        };

        /**
         * Set theme for all editors
         * @param theme
         */
        $scope.setTheme = (theme) => {
            $scope.vars.theme = theme;
            $scope.vars.tabs.forEach((tab) => tab.editor.setTheme('ace/theme/' + theme));
            localStorageService.set('editorTheme', theme);
        };

        /**
         * Установка названия БД
         * @param db
         */
        $scope.selectDatabase = (db) => {

            if (!db) {
                return;
            }

            $scope.vars.db = db;
            API.setDatabase(db);

            API.query("SELECT table,name,type FROM system.columns WHERE database=\'" + db + "\'", null)
                .then((data) => {

                let fields = [],
                    ufields = {};
                let tables = [],
                    utables = {};
                let keys = [];
                data.meta.forEach((cell) => {
                    keys.push(cell.name);
                });
                data.data.forEach((row) => {
                    keys.forEach((key) => {

                        if (key == 'table') {
                            if (!utables.hasOwnProperty(row[key])) {
                                utables[row[key]] = 1;
                                tables.push(row[key]);
                            }
                        }
                        if (key == 'name') {
                            if (!ufields.hasOwnProperty(row[key])) {
                                ufields[row[key]] = 1;
                                fields.push(row[key]);
                            }
                        }
                    });
                });

                window.global_keywords_fields = fields.join('|') + '|';
                window.global_keywords_tables = tables.join('|') + '|' + db;

                // reload highlights
                $scope.vars.tabs.forEach((tab) => {
                    tab.editor.session.setMode({
                        path: "ace/mode/clickhouse",
                        v: Date.now()
                    });
                    tab.editor.session.bgTokenizer.start(0);
                });
            });

        };

        /**
         * Add word from dict to SQL etitor
         */
        $scope.addDictionariesWord = (word) => {
            const editor = $scope.vars.currentTab.editor;
            editor.clearSelection();
            editor.insert(word);
            $scope.vars.currentTab.sql = editor.getValue();
        };

        /**
         * Load dicts for ACE autocomplete
         */
        $scope.loadDictionaries = () => {
            $scope.vars.dictionaries = [];
            API.query("select name,key,attribute.names,attribute.types from system.dictionaries ARRAY JOIN attribute ORDER BY name,attribute.names", null).then((data) => {
                data.data.forEach((item) => {
                    // dictGetUInt64('ads.x', 'site_id', toUInt64(xxxx)) AS site_id,
                    let dic = 'dictGet' + item["attribute.types"] + '(\'' + item.name + '\',\'' + item["attribute.names"] + '\',to' + item.key + '( ID ) ) AS ' + item.name.replace(/\./, '_') + '_' + item["attribute.names"] + ',';

                    $scope.vars.dictionaries.push({
                        dic: dic,
                        title: item.name + '.' + item["attribute.names"] + ' as ' + item["attribute.types"]
                    });
                });
            });
        };

        /**
         * ACE editor init on creation
         * @param editor
         */
        $scope.aceLoaded = (editor) => {
            let tab = $scope.vars.currentTab;
            tab.editor = editor;

            editor.setOptions({
                fontSize: $scope.vars.fontSize + 'px'
            });

            editor.setTheme('ace/theme/' + $scope.vars.theme);

            // @todo:Кастомный cmd+enter чтобы ранать Все/или выделенное
            editor.commands.addCommand({
                name: 'runCurrentCommand',
                bindKey: {
                    win: 'Ctrl-Enter',
                    mac: 'Command-Enter'
                },
                exec: () => {
                    $scope.execute('current', tab);
                }
            });

            editor.commands.addCommand({
                name: 'runAllCommand',
                bindKey: {
                    win: 'Shift-Ctrl-Enter',
                    mac: 'Shift-Command-Enter'
                },
                exec: () => {
                    $scope.execute('all', tab);
                }
            });

            editor.clearSelection();
            editor.focus();
            editor.selection.moveTo(0, 0);

            // Повесить эвент и переиминовывать кнопку -"Выполнить"
            editor.on('changeSelection', () => {
                $timeout(() => {
                    tab.buttonTitle = editor.getSelectedText() !== '' ? 'Выполнить выделенное ⌘ + ⏎' : 'Выполнить все ⇧ + ⌘ + ⏎';
                    if (tab.originalSql) {
                        tab.changed = (tab.originalSql != tab.sql);
                    }
                });
            });

            $scope.loadDictionaries();
        };

        /**
         * Watch for menu database changes
         */
        $rootScope.$watch('currentDatabase', $scope.selectDatabase);

        /**
         * Watch and save settings in LocalStorage
         */
        $scope.$watch('vars.limitRows', (curr) => localStorageService.set('editorLimitRows', curr));

        /**
         * Watch and save settings in LocalStorage
         */
        $scope.$watch('vars.fontSize', (fontSize) => {
            if (fontSize) {
                $scope.vars.tabs.forEach((tab) => tab.editor && tab.editor.setOptions({
                    fontSize: fontSize + 'px'
                }));
                localStorageService.set('editorFontSize', fontSize);
            }
        });

        /**
         * Save SQL to history
         * @param tab
         * @param ev
         */
        $scope.save = (tab, ev) => $mdDialog.show(
            $mdDialog.prompt()
                .title('Сохранить SQL как')
                .placeholder('название')
                .initialValue(tab.name)
                .targetEvent(ev)
                .ok('Сохранить')
                .cancel('Отмена')
        ).then((name)=> {
            const index = $scope.vars.sqlHistory.findIndex((item) => (item.name == tab.name));
            if (index != -1) {
                $scope.vars.sqlHistory[index].sql = tab.sql;
                $scope.vars.sqlHistory[index].name = name;
            } else {
                $scope.vars.sqlHistory.push({
                    sql: tab.sql,
                    name
                });
            }
            tab.originalSql = tab.sql;
            tab.name = name;
            localStorageService.set(SQL_HISTORY_KEY, $scope.vars.sqlHistory);
        });

        /**
         * Load SQL from history
         * @param history
         */
        $scope.load = (history) => {
            $scope.vars.currentTab.sql = history.sql;
            $scope.vars.currentTab.originalSql = history.sql;
            $scope.vars.currentTab.name = history.name;
        }

        /**
         * Inserting new SQL tab
         */
        $scope.addTab = () => {
            $scope.vars.currentTab = {
                name: 'new SQL',
                sql: '',
                buttonTitle: 'Выполнить ⌘ + ⏎',
                format: {},
                editor: null,
                results: [],
                selectedResultTab: 0
            };
            $scope.vars.tabs.push($scope.vars.currentTab);
        };

        /**
         * Remove SQL tab
         * @param tab
         * @param event
         */
        $scope.removeTab = (tab, event) => {
            event.stopPropagation();

            const clear = () => {
                $scope.vars.tabs.splice($scope.vars.tabs.indexOf(tab), 1);
                if ($scope.vars.tabs.length == $scope.vars.selectedTab) {
                    $scope.vars.selectedTab--;
                }
            };

            if (tab.changed) {
                $mdDialog.show(
                    $mdDialog.confirm()
                        .title('SQL изменен. Сохранить перед закрытием?')
                        .targetEvent(event)
                        .ok('Да')
                        .cancel('Нет')
                ).then(()=> {
                    const index = $scope.vars.sqlHistory.findIndex((item) => (item.name == tab.name));
                    if (index != -1) {
                        $scope.vars.sqlHistory[index].sql = tab.sql;
                        $scope.vars.sqlHistory[index].name = tab.name;
                    }
                    localStorageService.set(SQL_HISTORY_KEY, $scope.vars.sqlHistory);
                    clear();
                }, clear);
            } else {
                clear();
            }
        };

        /**
         * Remove result Tab
         * @param tab
         * @param result
         * @param $event
         */
        $scope.removeResult = (tab, result, event) => {
            event.stopPropagation();
            tab.results.splice(tab.results.indexOf(result), 1);
        };

        /**
         * Toggle settings panel
         */
        $scope.toggleSidenav = (id) => {
            $mdSidenav(id).toggle();
        };

        // angular.element('#resizable').resizable({
        //     handles: 's'
        // });

        /**
         * Init :)
         */
        $scope.addTab();
        if ($rootScope.currentDatabase) {
            $scope.selectDatabase($rootScope.currentDatabase);
        };

        /**
         * Controller destructor
         */
        $scope.$on('$destroy', () => {
            API.setDatabase($rootScope.currentDatabase);
            clearRouterListener();
            $window.onbeforeunload = null;
        });

        $scope.setUiTheme = (theme) => ThemeService.set(theme.name);

    }
})(angular, smi2);
