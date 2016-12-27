// @todo : костылик , не получилось сделать http://stackoverflow.com/questions/22166784/dynamically-update-syntax-highlighting-mode-rules-for-the-ace-editor
window.global_keywords_fields       = "";
window.global_keywords_tables       = "";
window.global_keywords_fieldsList   = "";
window.global_keywords_dictList     = "";
window.global_builtinFunctions      = [];


((angular, smi2) => {
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
        '$filter',
        'hotkeys'
    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:SqlController
     * @description SQL controller data
     */
    function SqlController($scope,
                           $rootScope,
                           $window,
                           localStorageService,
                           API,
                           $mdSidenav,
                           $mdDialog,
                           $mdToast,
                           ThemeService,
                           $timeout,
                           $filter,
                           hotkeys) {

        const SQL_HISTORY_KEY = 'sqlHistory2';
        const SQL_LOG_KEY = 'sqlLog';
        const SQL_SAVE_TABS_KEY = 'saveTabs';
        const SQL_SAVE_LIVEAUTO_KEY = 'liveAutocompletion';
        const SQL_SESSION_KEY = 'sessionData';
        const SQL_LOG_LENGTH = 30;

        $scope.vars = {
            sqlHistory: localStorageService.get(SQL_HISTORY_KEY) || [],
            dictionaries: [],
            tabs: [],
            enableLiveAutocompletion: localStorageService.get(SQL_SAVE_LIVEAUTO_KEY) || false,
            saveTabs: localStorageService.get(SQL_SAVE_TABS_KEY) || false,
            uiTheme: ThemeService.themeObject,
            uiThemes: ThemeService.list,
            delimiters : [
                {
                    name: $filter('translate')(';; Двойной'),
                    delimiter : ';;'
                },
                {
                    name: $filter('translate')('; Одинарный'),
                    delimiter : ';'
                }
            ],
            currentTab: {},
            selectedTab: 0,
            sqlLog: localStorageService.get(SQL_LOG_KEY) || [],
            formats: [{
                name: $filter('translate')('Таблица'),
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

        $scope.vars.delimiter = $scope.vars.delimiters[0];
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
         * Prevent data loss on close page
         */
        $window.onbeforeunload = (event) => {
            if ($scope.vars.currentTab.sql !== '' && location.hostname != 'localhost') {
                let message = $filter('translate')('Хотите покинуть страницу?');
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
         * Prevent data loss on state change
         */
        const clearRouterListener = $scope.$on('$stateChangeStart', (event) => {
            let message = $filter('translate')('Хотите покинуть страницу?');
            if (!event.defaultPrevented && $scope.vars.currentTab !== '' && !confirm(message)) {
                event.preventDefault();
            }
        });

        /**
         * Save tabs session
         */
        const saveSession = () => {
            if ($scope.vars.saveTabs) {
                const tabs = $scope.vars.tabs.map((tab) => {
                    return {
                        name: tab.name,
                        sql: tab.sql,
                        buttonTitle: tab.buttonTitle,
                        format: tab.format,
                        delimiter:tab.delimiter,
                        results: [],
                        editor: null,
                        selectedResultTab: 0
                    };
                });
                localStorageService.set(SQL_SESSION_KEY, tabs);
            }
        };

        /**
         * @ngdoc method
         * @methodOf smi2.controller:SqlController
         * @name executeQuery
         * @description Execute single SQL query
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

                    let _need_reload=false;
                    // если в списке был запрос на CREATE / DROP нужно перерисовать
                    queue.forEach((item) => {
                        if (item.keyword=='create' || item.keyword=='drop')
                        {
                            _need_reload=true;
                        }
                    });
                    if (_need_reload){
                        $rootScope.$emit('handleBroadcastDatabases',{});
                    }

                }

            }, (response) => {
                $mdToast.show(
                    $mdToast
                        .simple()
                        .content($filter('translate')('Ошибка'))
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
            return data;
        };

        /**
         * Operations after render
         * @param result
         */
        $scope.renderFinalResult = (result) => {
            $scope.vars.currentTab.loading = false;
            if (result.data.find((item) => (
                    item.query &&
                    item.query.keyword &&
                    ['DROP', 'CREATE', 'ALTER'].indexOf(
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
                        .content($filter('translate')('Не введен SQL'))
                        .theme(ThemeService.theme)
                        .position('bottom right')
                );

                return;
            }

            // Clear not-pinned tabs
            tab.results = tab.results.reduce((arr, item) => {
                if (item.pinned) {
                    arr.push(item);
                }
                return arr;
            }, []);
            tab.results.unshift(result);

            // Save to SQL log
            if ($scope.vars.sqlLog.indexOf(sql) == -1) {
                $scope.vars.sqlLog.unshift(sql);
                if ($scope.vars.sqlLog.length > SQL_LOG_LENGTH) {
                    $scope.vars.sqlLog.splice(0, SQL_LOG_LENGTH);
                }
                localStorageService.set(SQL_LOG_KEY, $scope.vars.sqlLog);
            }

            // Save tabs session
            saveSession();

            var use_delimiter=$scope.vars.delimiter.delimiter;

            // Split SQL into subqueries
            editor
                .session
                .$mode
                .splitByTokens(sql, 'constant.character.escape', use_delimiter)
                .forEach((item) => {

                    const subSql = item.sql;
                    // Ignore short queries
                    if (subSql.length < 5) {
                        return;
                    }

                    // Если комманда исполнить текущий и НЕ выделен текст -> пропускаем все пока не найдем подходящий
                    if (type == 'current' && !selectSql) {
                        let cursor = editor.selection.getCursor();

                        if (!cursor || angular.isUndefined(cursor) ||
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


                    console.info('[:] '+subSql);
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
         * Set database name
         * @param db
         */
        $scope.selectDatabase = (db) => {

            if (!db) {
                return;
            }

            $scope.vars.db = db;
            API.setDatabase(db);

            API.query("SELECT table,name,type,default_type,default_expression FROM system.columns WHERE database=\'" + db + "\'", null)
                .then((data) => {

                    let fields = [],
                        ufields = {};
                    let tables = [],
                        utables = {};
                    let keys = [];

                    window.global_keywords_fieldsList = [];



                    data.meta.forEach((cell) => {
                        keys.push(cell.name);
                    });

                    data.data.forEach((row) => {

                        window.global_keywords_fieldsList.push(row);
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
                        if (tab.editor) {
                            tab.editor.session.setMode({
                                path: "ace/mode/clickhouse",
                                v: Date.now()
                            });
                            tab.editor.session.bgTokenizer.start(0);
                        }
                    });
                });
        };

        /**
         * Add word from dict to SQL etitor
         */
        $scope.addDictionariesWord = (word) => {
            const editor = $scope.vars.currentTab.editor;
            const position = editor.getCursorPosition();
            position.column += word.length;
            editor.clearSelection();
            editor.insert(word);
            $scope.vars.currentTab.sql = editor.getValue();
            $timeout(() => {
                editor.focus();
                editor.moveCursorToPosition(position);
            });
        };

        /**
         * Load dicts for ACE autocomplete
         */
        $scope.loadDictionaries = () => {
            $scope.vars.dictionaries = [];
            window.global_keywords_dictList=[];
            API.query("select name,key,attribute.names,attribute.types from system.dictionaries ARRAY JOIN attribute ORDER BY name,attribute.names", null).then((data) => {
                data.data.forEach((item) => {
                    // dictGetUInt64('ads.x', 'site_id', toUInt64(xxxx)) AS site_id,
                    let dic = 'dictGet' + item["attribute.types"] + '(\'' + item.name + '\',\'' + item["attribute.names"] + '\',to' + item.key + '( ID ) ) AS ' + item["attribute.names"] + ',';
                    window.global_keywords_dictList.push({
                        dic:dic,
                        title: 'dic_'+item.name + '.' + item["attribute.names"]
                    });
                    $scope.vars.dictionaries.push({
                        dic: dic,
                        title: item.name + '.' + item["attribute.names"] + ' as ' + item["attribute.types"]
                    });
                });
            });
        };

        const selectTab = index => {
            if ($scope.vars.tabs.length >= index) {
                $scope.vars.currentTab = $scope.vars.tabs[index];
                $scope.vars.selectedTab = index;
                $timeout(() => {
                    $scope.vars.currentTab.editor.focus();
                });
            }
        };

        const selectPrevTab = () => {
            if ($scope.vars.selectedTab > 0) {
                selectTab($scope.vars.selectedTab - 1);
            }
        };

        const selectNextTab = () => {
            if ($scope.vars.selectedTab < ($scope.vars.tabs.length - 1)) {
                selectTab($scope.vars.selectedTab + 1);
            }
        };

        for (let i = 0; i < 12; i++) {
            hotkeys.add({
                combo: 'ctrl+shift+' + (i + 1),
                callback: () => selectTab(i)
            });
        }
        hotkeys.add({
            combo: 'ctrl+right',
            callback: selectNextTab
        });
        hotkeys.add({
            combo: 'ctrl+left',
            callback: selectPrevTab
        });

        /**
         * ACE editor init on creation
         * @param editor
         */
        $scope.aceLoaded = (editor) => {
            let tab = $scope.vars.tabs.find(tab => !tab.editor) || $scope.vars.currentTab;
            tab.editor = editor;
            editor.$blockScrolling = Infinity;

            // Load settings from LocalStorage
            editor.setOptions({
                fontSize: $scope.vars.fontSize + 'px',
                enableBasicAutocompletion : true,
                behavioursEnabled:true ,
                wrapBehavioursEnabled:true ,
                highlightSelectedWord:true ,
                //showInvisibles:true ,
                showGutter:true ,
                enableLiveAutocompletion:$scope.vars.enableLiveAutocompletion
            });
            editor.setTheme('ace/theme/' + $scope.vars.theme);

            // reload keywords & highlights
            editor.session.setMode({
                path: "ace/mode/clickhouse",
                v: Date.now()
            });
            editor.session.bgTokenizer.start(0);

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
            // removeLines
            editor.commands.addCommand({
                    name: 'removeLiness',
                    bindKey: {
                        win: 'Ctrl-Y',
                        mac: 'Cmd-Y'
                    },
                    exec: (editor) => {
                        editor.removeLines();
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

            for (let i = 0; i < 12; i++) {
                editor.commands.addCommand({
                    name: 'selecttab' + i,
                    bindKey: {
                        win: 'Ctrl-Shift-' + (i + 1),
                        mac: 'Command-Shift-' + (i + 1)
                    },
                    exec: () => selectTab(i)
                });
            }
            editor.commands.addCommand({
                name: 'selectnexttab',
                bindKey: {
                    win: 'Ctrl-Right',
                    mac: 'Command-Right'
                },
                exec: selectNextTab
            });
            editor.commands.addCommand({
                name: 'selectprevtab',
                bindKey: {
                    win: 'Ctrl-Left',
                    mac: 'Command-Left'
                },
                exec: selectPrevTab
            });

            editor.clearSelection();
            editor.focus();
            editor.selection.moveTo(0, 0);

            // Повесить эвент и переиминовывать кнопку -"Выполнить"
            editor.on('changeSelection', () => {
                $timeout(() => {
                    tab.buttonTitle = editor.getSelectedText() !== '' ? $filter('translate')('Выполнить выделенное ⌘ + ⏎') : $filter('translate')('Выполнить все ⇧ + ⌘ + ⏎');
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
         * Watch and save delimiter in LocalStorage
         */

        $scope.$watch('vars.delimiter', (curr) => localStorageService.set('delimiter', curr));

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
                .title($filter('translate')('Сохранить SQL как'))
                .placeholder($filter('translate')('название'))
                .initialValue(tab.name)
                .targetEvent(ev)
                .ok($filter('translate')('Сохранить'))
                .cancel($filter('translate')('Отмена'))
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
            saveSession();
        });

        /**
         * Load SQL from history
         * @param history
         */
        $scope.load = (history) => {
            $scope.vars.currentTab.sql = history.sql;
            $scope.vars.currentTab.originalSql = history.sql;
            $scope.vars.currentTab.name = history.name;
        };

        /**
         * Create export data
         * @param result
         * @returns {number[]}
         */
        $scope.getExportData = result => (
            result.map(item => Object.keys(item).map(key => (
                angular.isArray(item[key]) ? item[key].join(', ') : item[key]
            )))
        );

        $scope.getExportHeaders = result => result.map(item => item.name);

        /**
         * Inserting new SQL tab
         */
        $scope.addTab = () => {
            $scope.vars.currentTab = {
                name: 'new SQL',
                sql: '',
                buttonTitle: $filter('translate')('Выполнить ⌘ + ⏎'),
                format: {},
                editor: null,
                results: [],
                selectedResultTab: 0
            };
            $scope.vars.tabs.push($scope.vars.currentTab);
            saveSession();
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
                        .title($filter('translate')('SQL изменен. Сохранить перед закрытием?'))
                        .targetEvent(event)
                        .ok($filter('translate')('Да'))
                        .cancel($filter('translate')('Нет'))
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

        // вставка текста в активное окно редактора там где курсор
        $rootScope.$on('handleBroadcastInsertInActive', function(event,args) {
            if (args.value) {
                $scope.addDictionariesWord(" "+args.value+', ');
            }
        });


        /**
         * Toggle settings panel
         */
        $scope.toggleSidenav = (id) => {
            $mdSidenav(id).toggle();
        };

        /**
         * Remove history item
         * @param item
         * @param event
         */
        $scope.removeHistory = (item, event) => {
            event.preventDefault();
            const index = $scope.vars.sqlHistory.indexOf(item);
            if (index != -1) {
                $mdDialog.show(
                    $mdDialog.confirm()
                        .title(`Удалить ${item.name}?`)
                        .targetEvent(event)
                        .ok('Да')
                        .cancel('Нет')
                ).then(()=> {
                    $scope.vars.sqlHistory.splice(index, 1);
                    localStorageService.set(SQL_HISTORY_KEY, $scope.vars.sqlHistory);
                });
            }
        };

        /**
         * Save session checkbox state in LS
         */
        $scope.$watch('vars.saveTabs', (value, old) => {
            localStorageService.set(SQL_SAVE_TABS_KEY, value);
            if (old === false && value === true) {
                saveSession();
            }
        });

        $scope.$watch('vars.enableLiveAutocompletion', (value, old) => {
            localStorageService.set(SQL_SAVE_LIVEAUTO_KEY, value);
            // loop
            $scope.vars.tabs.forEach((tab) => tab.editor && tab.editor.setOptions({
                enableLiveAutocompletion: value
            }));




        });

        /**
         * Change UI themetam_tam641
         * @param theme
         */
        $scope.setUiTheme = (theme) => ThemeService.set(theme.name);

        /**
         * Set SQL in editor
         * @param sql
         */
        $scope.setSql = (sql) => {
            $scope.vars.currentTab.sql = sql;
            $scope.toggleSidenav('log');
            $timeout(() => $scope.vars.currentTab.editor.focus(), 500);
        };

        /**
         * Rename tab
         * @param tab
         * @param event
         */
        $scope.changeTabName = (tab, event) => {
            event.stopPropagation();
            $mdDialog.show(
                $mdDialog.prompt()
                    .title($filter('translate')('Название вкладки'))
                    .placeholder($filter('translate')('название'))
                    .initialValue(tab.name)
                    .targetEvent(event)
                    .ok($filter('translate')('Применить'))
                    .cancel($filter('translate')('Отмена'))
            ).then((name)=> {
                const index = $scope.vars.sqlHistory.findIndex((item) => (item.name == tab.name));
                if (index != -1) {
                    tab.originalSql = tab.sql;
                    $scope.vars.sqlHistory[index].name = name;
                    localStorageService.set(SQL_HISTORY_KEY, $scope.vars.sqlHistory);
                }
                tab.name = name;
                saveSession();
            });
        };

        /**
         * Init :)
         */
        if ($scope.vars.saveTabs) {
            $scope.vars.tabs = localStorageService.get(SQL_SESSION_KEY);
            if ($scope.vars.tabs.length > 0) {
                $timeout(() => ($scope.vars.currentTab = $scope.vars.tabs[0]), 500);
            } else {
                $scope.addTab();
            }
        } else {
            localStorageService.set(SQL_SESSION_KEY, []);
            $scope.addTab();
        }
        if ($rootScope.currentDatabase) {
            $scope.selectDatabase($rootScope.currentDatabase);
        }

        API.query("select name,is_aggregate from system.functions", null).then((data) => {
            data.data.forEach((item) => {
                window.global_builtinFunctions.push({name:item.name,isaggr:item.is_aggregate,score:101,comb:false,origin:item.name});
                if (item.is_aggregate)
                {
                    // Комбинатор -If. Условные агрегатные функции
                    let p={name:item.name+'If',isaggr:item.is_aggregate,score:3,comb:'If',origin:item.name};
                    window.global_builtinFunctions.push(p);

                    // Комбинатор -Array. Агрегатные функции для аргументов-массивов
                    p={name:item.name+'Array',isaggr:item.is_aggregate,score:2,comb:'Array',origin:item.name};
                    window.global_builtinFunctions.push(p);

                    // Комбинатор -State. агрегатная функция возвращает промежуточное состояние агрегации
                    p={name:item.name+'State',isaggr:item.is_aggregate,score:1,comb:'State',origin:item.name};
                    window.global_builtinFunctions.push(p);

                }

            });
        });




        /**
         * Controller destructor
         */
        $scope.$on('$destroy', () => {
            API.setDatabase($rootScope.currentDatabase);
            clearRouterListener();
            $window.onbeforeunload = null;
        });





    }
})(angular, smi2);
