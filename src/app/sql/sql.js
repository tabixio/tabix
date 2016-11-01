// @todo : костылик , не получилось сделать http://stackoverflow.com/questions/22166784/dynamically-update-syntax-highlighting-mode-rules-for-the-ace-editor
global_keywords_fields = "";
global_keywords_tables = "";

(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('SqlController', SqlController);
    SqlController.$inject = [
        '$scope',
        '$rootScope',
        '$window',
        'localStorageService',
        'API',
        '$mdSidenav'
    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:SqlController
     * @description Контроллер выполнения SQL запросов к БД
     */
    function SqlController($scope, $rootScope, $window, localStorageService, API, $mdSidenav) {

        $scope.vars = {
            sqlHistory: localStorageService.get('sqlHistory') || [],
            dictionaries: [],
            finishQuery: true,
            resultsQuery: [],
            tabs: [],
            currentTab: {},
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
        $rootScope.breadcrumbs = false;
        $scope.isFullscreen = false;

        /**
         * Предотвращаю потерю SQL данных при закрытии окна
         */
        $window.onbeforeunload = function (event) {
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
        let clearRouterListener = $scope.$on('$stateChangeStart', function (event) {
            let message = 'Хотите покинуть страницу?';
            if (!event.defaultPrevented && $scope.vars.currentTab !== '' && !confirm(message)) {
                event.preventDefault();
            }
        });

        /**
         * Toggle fullscreen mode
         */
        $scope.toggleFullScreen = function () {
            $scope.isFullscreen = !$scope.isFullscreen;
        };

        /**
         * @ngdoc method
         * @methodOf smi2.controller:SqlController
         * @name executeQuery
         * @description Выполненеие одного SQL запроса
         * @param {} query
         */
        $scope.executeQuery = function (query, queue, callback) {

            // содержит дополнительные GET параметры для выполнения запрос
            let extendSettings = '';

            // если указан limitRows
            if ($scope.vars.limitRows) {
                extendSettings += 'max_result_rows=' + $scope.vars.limitRows + '&result_overflow_mode=throw';
            }

            API.query(query.sql, query.format, true, extendSettings).then(function (data) {

                let r = data;

                if (typeof data !== 'object') {
                    data = {};
                    data.data = r;
                    data.meta = null;
                    data.rows = null;
                    data.statistics = null;
                }
                data.error = false;
                data.query = query;
                $scope.vars.resultsQuery.push($scope.renderResult(data));

                // Рекурсивный вызов executeQuery если в очереди
                // еще остались элементы
                if ((query.index + 1) < queue.length) {
                    $scope.executeQuery(queue[query.index + 1], queue);
                }
                else {
                    // В историю только успешные запросы, ошибки будут засорять
                    if ($scope.vars.sqlHistory.indexOf($scope.vars.sql) == -1) {
                        $scope.vars.sqlHistory.push($scope.vars.sql);
                        if ($scope.vars.sqlHistory.length > 25) {
                            $scope.vars.sqlHistory.shift();
                        }
                        localStorageService.set('sqlHistory', $scope.vars.sqlHistory);
                    }
                    // отрисовка
                    $scope.renderFinalResult();
                }

            }, function (response) {
                //LxNotificationService.error('Ошибка');
                let result = {};
                result.meta = null;
                result.rows = null;
                result.query = query;
                result.statistics = null;

                if (response.data) {
                    result.error = angular.toJson(response.data).replace(/\\n/gi, '<br/>').replace(/^"/, '').replace(/"$/, '');
                } else {
                    result.error = response;
                }
                $scope.vars.resultsQuery.push($scope.renderResult(result));

                $scope.renderFinalResult();
            });
        };

        /**
         * Show results
         * @param data
         * @returns {*}
         */
        $scope.renderResult = function (data) {
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
                data.createtable=API.dataToCreateTable(data);
            }
            data.data = false;
            return data;
        };

        $scope.renderFinalResult = function () {
            let keywords = '';
            $scope.vars.resultsQuery.forEach(function (q) {
                keywords += q.query.keyword + "|";
            });//for
            $scope.vars.finishQuery = true;

            if (keywords.toUpperCase().match(/(DROP|CREATE|ALTER)/g)) {
                // reload
                $scope.selectDatabase($scope.vars.db);
            }

        };

        /**
         * Execute SQL statement
         * @param type
         */
        $scope.execute = function (type) {

            let sql = $scope.vars.sql;
            let numquery = 0;

            // получаем выделенный текст, и если выделено - ранаем выделение
            let selectsql = $scope.vars.editor.getSelectedText();
            if (!(selectsql === '' || selectsql === null)) {
                sql = selectsql;
            }

            // Выход если пустой sql
            if (sql === '' || sql === null) {
                //LxNotificationService.warning('Не введен SQL');
                return;
            }

            $scope.vars.resultsQuery = [];
            let queue = [];

            // Разбивка SQL на подзапросы по ;;
            let sqlList = $scope.vars.editor.session.$mode.splitByTokens(sql, 'constant.character.escape', ';;');

            // Цикл по подзапросам
            sqlList.forEach(function (SQLQuery) {
                let subSQL = SQLQuery.sql;

                if (subSQL.length<5) return;

                // Если комманда исполнить текущий и НЕ выделен текст -> пропускаем все пока не найдем подходящий
                if (type == 'current' && !selectsql) {
                    let cursor = $scope.vars.editor.selection.getCursor();

                    if (angular.isDefined(cursor)) {
                    // if (cursor.row && cursor.column) {
                        let inRange = SQLQuery.range.compare(cursor.row, cursor.column);
                        if (inRange !== 0) return;
                    }
                    else
                    {
                        return;
                    }
                }

                let _format = null;
                let _format_seted = false;
                let storage = false;
                let _keyword = null;
                let set_format = $scope.vars.editor.session.$mode.findTokens(subSQL, "storage", true);
                let keyword = $scope.vars.editor.session.$mode.findTokens(subSQL, "keyword", true);


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


                // Создание очереди
                queue.push({
                    sql: subSQL,
                    index: numquery,
                    format: _format,
                    setedformat: _format_seted,
                    keyword: _keyword,
                    storage: storage
                });
                numquery++;
            });

            if (queue.length) {
                $scope.vars.finishQuery = false;
                $scope.executeQuery(queue[0], queue);
            }

        };

        /**
         * Set theme for all editors
         * @param theme
         */
        $scope.setTheme = function (theme) {
            $scope.vars.theme = theme;
            $scope.vars.tabs.forEach((tab) => tab.editor.setTheme('ace/theme/' + theme));
            localStorageService.set('editorTheme', theme);
        };

        $scope.selectDatabase = function (db) {
            $scope.vars.db = db;

            API.query("SELECT table,name,type FROM system.columns WHERE database=\'" + db + "\'", null).then(function (data) {

                let fields = [],
                    ufields = {};
                let tables = [],
                    utables = {};
                let keys = [];
                data.meta.forEach(function (cell) {
                    keys.push(cell.name);
                });
                data.data.forEach(function (row) {
                    keys.forEach(function (key) {

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

                global_keywords_fields = fields.join('|') + '|';
                global_keywords_tables = tables.join('|') + '|' + db;
                // reload highlights
                $scope.vars.editor.session.setMode({
                    path: "ace/mode/clickhouse",
                    v: Date.now()
                });
                $scope.vars.editor.session.bgTokenizer.start(0); // force rehighlight whole document
            });

        };

        /**
         * Add word from dict to SQL etitor
         */
        $scope.addDictionariesWord = function (word) {
            const editor = $scope.vars.currentTab.editor;
            editor.clearSelection();
            editor.insert(word);
            $scope.vars.currentTab.sql = editor.getValue();
        };

        /**
         * Load dicts for ACE autocomplete
         */
        $scope.loadDictionaries = function () {
            $scope.vars.dictionaries = [];
            API.query("select name,key,attribute.names,attribute.types from system.dictionaries ARRAY JOIN attribute ORDER BY name,attribute.names", null).then(function (data) {
                data.data.forEach(function (item) {
                    // dictGetUInt64('ads.x', 'site_id', toUInt64(xxxx)) AS site_id,
                    let dic = 'dictGet' + item["attribute.types"] + '(\'' + item.name + '\',\'' + item["attribute.names"] + '\',to' + item.key + '( ID ) ) AS ' + item.name.replace(/\./, '_') + '_' + item["attribute.names"] + ',';

                    $scope.vars.dictionaries.push({dic:dic,title:item.name+'.'+item["attribute.names"]+' as '+item["attribute.types"] });
                });
            });
        };

        /**
         * ACE editor init on creation
         * @param editor
         */
        $scope.aceLoaded = function (editor) {
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
                exec: function () {
                    $scope.execute('current');
                }
            });

            editor.commands.addCommand({
                name: 'runAllCommand',
                bindKey: {
                    win: 'Shift-Ctrl-Enter',
                    mac: 'Shift-Command-Enter'
                },
                exec: function () {
                    $scope.execute('all');
                }
            });

            editor.clearSelection();
            editor.focus();
            editor.selection.moveTo(0, 0);

            // Повесить эвент и переиминовывать кнопку -"Выполнить"
            editor.on('changeSelection', function () {
                tab.buttonTitle = editor.getSelectedText() !== '' ? 'Выполнить выделенное ⌘ + ⏎' : 'Выполнить все ⇧ + ⌘ + ⏎';
                $scope.$apply();
            });

            // наблюдаем за изменением в выбор базы данных
            let scope = angular.element($("[ng-app=sidebar]")).scope();
            if (scope) {
                scope.$watch('vars.selectedDatabase.name', function (curr) {
                    if (!angular.isUndefined(curr)) {
                        $scope.selectDatabase(curr);
                    }
                });
            }

            /*
            if (location.hostname != 'localhost') {
                $scope.vars.sql = $scope.vars.sqlHistory[0]; // последний удачный запрос
            }
            else {
                $scope.vars.sql = ";;select 0 as ping;;\nselect 1 as ping;;select 2 as ping\n;;select 3+sleep(0.1) as ping;;select 4+sleep(0.1) as ping;;\nSELECT 5 As PING format JSON;;select 6 as ping\n;;select 7 as ping FORMAT CSVWithNames";
            }
            */

            $scope.loadDictionaries();
        };

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
         * Inserting new SQL tab
         */
        $scope.addTab = () => {
            $scope.vars.currentTab = {
                name: 'new SQL',
                sql: '',
                buttonTitle: 'Выполнить ⌘ + ⏎',
                format: {},
                editor: null
            };
            $scope.vars.tabs.push($scope.vars.currentTab);
        }

        /**
         * Toggle settings panel
         */
        $scope.toggleSidenav = (id) => {
            $mdSidenav(id).toggle();
        }

        // angular.element('#resizable').resizable({
        //     handles: 's'
        // });

        /**
         * Init :)
         */
        $scope.addTab();

        /**
         * Controller destructor
         */
        $scope.$on('$destroy', function () {
            clearRouterListener();
            $window.onbeforeunload = null;
        });

    }
})(angular, smi2);
