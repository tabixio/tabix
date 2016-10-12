// @todo : костылик , не получилось сделать http://stackoverflow.com/questions/22166784/dynamically-update-syntax-highlighting-mode-rules-for-the-ace-editor
global_keywords_fields = "";
global_keywords_tables = "";

(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('SqlController', SqlController);
    SqlController.$inject = ['$scope', '$rootScope', '$window', 'localStorageService', 'LxNotificationService', 'API'];

    /**
     * @ngdoc controller
     * @name smi2.controller:SqlController
     * @description Контроллер выполнения SQL запросов к БД
     */
    function SqlController($scope, $rootScope, $window, localStorageService, LxNotificationService, API) {

        $scope.vars = {
            sql: '',
            button_run: 'Выполнить ⌘ + ⏎',
            sqlHistory: localStorageService.get('sqlHistory') || [],
            format: {},
            dictionaries: [],
            finishQuery: true,
            resultsQuery: [],
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
            editor: null,
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
            if ($scope.vars.sql !== '' && location.hostname != 'localhost') {
                var message = 'Хотите покинуть страницу?';
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
        var clearRouterListener = $scope.$on('$stateChangeStart', function (event) {
            var message = 'Хотите покинуть страницу?';
            if (!event.defaultPrevented && $scope.vars.sql !== '' && !confirm(message)) {
                event.preventDefault();
            }
        });

        /**
         * Деструктор контроллера
         */
        $scope.$on('$destroy', function () {
            clearRouterListener();
            $window.onbeforeunload = null;
        });

        /**
         * @ngdoc method
         * @methodOf smi2.controller:SqlController
         * @name toggleFullScreen
         * @description Переключение полноэкранного режима
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
            var extendSettings = '';

            // если указан limitRows
            if ($scope.vars.limitRows) {
                extendSettings += 'max_result_rows=' + $scope.vars.limitRows + '&result_overflow_mode=throw';
            }

            API.query(query.sql, query.format, true, extendSettings).then(function (data) {

                var r = data;

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
                LxNotificationService.error('Ошибка');
                var result = {};
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
            var keywords = '';
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
         * @ngdoc method
         * @methodOf smi2.controller:SqlController
         * @name run
         * @description Выполнение запроса
         */
        $scope.run = function (type) {

            var sql = $scope.vars.sql;
            var numquery = 0;

            // получаем выделенный текст, и если выделено - ранаем выделение
            var selectsql = $scope.vars.editor.getSelectedText();
            if (!(selectsql === '' || selectsql === null)) {
                sql = selectsql;
            }

            // Выход если пустой sql
            if (sql === '' || sql === null) {
                LxNotificationService.warning('Не введен SQL');
                return;
            }

            $scope.vars.resultsQuery = [];
            var queue = [];

            // Разбивка SQL на подзапросы по ;;
            var sqlList = $scope.vars.editor.session.$mode.splitByTokens(sql, 'constant.character.escape', ';;');



            // Цикл по подзапросам
            sqlList.forEach(function (SQLQuery) {
                var subSQL = SQLQuery.sql;

                if (subSQL.length<5) return;

                // Если комманда исполнить текущий и НЕ выделен текст -> пропускаем все пока не найдем подходящий
                if (type == 'current' && !selectsql) {
                    var cursor = $scope.vars.editor.selection.getCursor();

                    if (angular.isDefined(cursor)) {
                    // if (cursor.row && cursor.column) {
                        var inRange = SQLQuery.range.compare(cursor.row, cursor.column);
                        if (inRange !== 0) return;
                    }
                    else
                    {
                        console.log('sckip'+subSQL);
                        return;
                    }
                }

                var _format = null;
                var _format_seted = false;
                var storage = false;
                var _keyword = null;
                var set_format = $scope.vars.editor.session.$mode.findTokens(subSQL, "storage", true);
                var keyword = $scope.vars.editor.session.$mode.findTokens(subSQL, "keyword", true);


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


            console.log(queue.length);
            if (queue.length)
            {
                $scope.vars.finishQuery = false;
                $scope.executeQuery(queue[0], queue);
            }

        };

        /**
         * @ngdoc method
         * @methodOf smi2.controller:SqlController
         * @name setTheme
         * @description Изменениие темы ACE
         * @param theme {string} Название темы
         */
        $scope.setTheme = function (theme) {
            $scope.vars.theme = theme;
            $scope.vars.editor.setTheme('ace/theme/' + theme);
            localStorageService.set('editorTheme', theme);
        };

        /**
         * @ngdoc method
         * @methodOf smi2.controller:SqlController
         * @name aceSettings
         * @description Показ настроек ACE
         */
        $scope.aceSettings = function () {
            $scope.vars.editor.execCommand("showSettingsMenu");
        };


        $scope.selectDatabase = function (db) {
            $scope.vars.db = db;

            API.query("SELECT table,name,type FROM system.columns WHERE database=\'" + db + "\'", null).then(function (data) {

                var fields = [],
                    ufields = {};
                var tables = [],
                    utables = {};
                var keys = [];
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

        $scope.addDictionariesWord = function (word) {
            $scope.vars.editor.clearSelection();
            $scope.vars.editor.insert(word);
            $scope.vars.sql=$scope.vars.editor.getValue()
        };

        $scope.loadDictionaries = function () {
            $scope.vars.dictionaries = [];
            API.query("select name,key,attribute.names,attribute.types from system.dictionaries ARRAY JOIN attribute ORDER BY name,attribute.names", null).then(function (data) {
                data.data.forEach(function (item) {
                    // dictGetUInt64('ads.x', 'site_id', toUInt64(xxxx)) AS site_id,
                    var dic = 'dictGet' + item["attribute.types"] + '(\'' + item.name + '\',\'' + item["attribute.names"] + '\',to' + item.key + '( ID ) ) AS ' + item.name.replace(/\./, '_') + '_' + item["attribute.names"] + ',';

                    $scope.vars.dictionaries.push({dic:dic,title:item.name+'.'+item["attribute.names"]+' as '+item["attribute.types"] });
                });
            });
        };
        $scope.aceLoaded = function (editor) {
            $scope.vars.editor = editor;
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
                    $scope.run('current');
                }
            });

            editor.commands.addCommand({
                name: 'runAllCommand',
                bindKey: {
                    win: 'Shift-Ctrl-Enter',
                    mac: 'Shift-Command-Enter'
                },
                exec: function () {
                    $scope.run('all');
                }
            });


            $scope.vars.editor.clearSelection();

            // Повесить эвент и переиминовывать кнопку -"Выполнить"
            editor.on('changeSelection', function () {

                if (editor.getSelectedText()) {
                    $scope.vars.button_run = 'Выполнить выделенное ⌘ + ⏎';
                } else {
                    $scope.vars.button_run = 'Выполнить все ⇧ + ⌘ + ⏎';
                }
                document.getElementById('sql_button').innerHTML = $scope.vars.button_run;
            });
            editor.focus();
            editor.selection.moveTo(0, 0);

            // наблюдаем за изменением в выбор базы данных
            var scope = angular.element($("[ng-app=sidebar]")).scope();
            if (scope) {
                scope.$watch('vars.selectedDatabase.name', function (curr) {
                    if (!angular.isUndefined(curr)) {
                        $scope.selectDatabase(curr);
                    }
                });
            }

            if (location.hostname != 'localhost') {
                $scope.vars.sql = $scope.vars.sqlHistory[0]; // последний удачный запрос
            }
            else {
                $scope.vars.sql = ";;select 0 as ping;;\nselect 1 as ping;;select 2 as ping\n;;select 3+sleep(0.1) as ping;;select 4+sleep(0.1) as ping;;\nSELECT 5 As PING format JSON;;select 6 as ping\n;;select 7 as ping FORMAT CSVWithNames";
            }
            $scope.loadDictionaries();

        };

        $scope.$watch('vars.limitRows', function (curr) {
            localStorageService.set('editorLimitRows', curr);
        });

        $scope.$watch('vars.fontSize', function (curr) {
            if (curr && $scope.vars.editor) {
                $scope.vars.editor.setOptions({
                    fontSize: curr + 'px'
                });
                localStorageService.set('editorFontSize', curr);
            }
        });

        angular.element('#resizable').resizable({
            handles: 's'
        });
    }
})(angular, smi2);
