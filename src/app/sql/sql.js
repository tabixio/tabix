/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */


// @todo : Hack -  http://stackoverflow.com/questions/22166784/dynamically-update-syntax-highlighting-mode-rules-for-the-ace-editor
window.global_delimiter             = ";;";


window.aceJSRules = {
    builtinFunctions:[],
    lang:'en',
    dictionaries:[],
    fieldsList:[],
    tables:[]
};

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
        'hotkeys',
        'Preference',
        'Snippets',
        'Variables'
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
                           hotkeys,
                           Preference,
                           Snippets,
                           Variables  ) {

        const SQL_HISTORY_KEY = 'sqlHistory2';
        const SQL_SAVE_TABS_KEY = 'saveTabs';
        const SQL_SAVE_DISABLE_HOTKEY_LEFTRIGHT = 'DISABLE_HOTKEY_LEFTRIGHT_v1';
        const SQL_SAVE_DISABLE_AUTOHELP_KEY = 'DISABLE_AUTOHELP_v1';
        const SQL_SAVE_LIVEAUTO_KEY = 'liveAutocompletion_v1';
        const SQL_SESSION_KEY = 'sessionData';
        const SQL_LOG_LENGTH = 255;


        $scope.AceEditorInLoad=false;
        $scope.vars = {
            EditorIsInit:false,
            sqlHistory: localStorageService.get(SQL_HISTORY_KEY) || [],
            dictionaries: [],
            isDictionariesLoad:false,
            tabs: [],

            enableLiveAutocompletion: Preference.get('liveAutocompletion'),
            disableAutohelp: Preference.get('disableAutohelp'),
            disableHotKeyCmdLeft: Preference.get('disableHotKeyCmdLeft'),


            saveTabs: localStorageService.get(SQL_SAVE_TABS_KEY) || true,
            LastStatistics: false,
            delimiters : [
                {
                    name: ';; Double',
                    delimiter : ';;'
                },
                {
                    name: '; Single',
                    delimiter : ';'
                }
            ],
            databasesList:[],
            searchQueryOnServer:'',
            currentTab: {},
            selectedTab: 0,
            formats: [{
                name: 'Table',
                sql: ' format JSON',
                render: 'html'
            }, {
                name: 'JSON compact',
                sql: ' format JSONCompact'
            }
            ],
            db: null,
            limitTimes: Preference.get('limitTimes'),
            limitRows: Preference.get('limitRows'),
            fontSize: Preference.get('fontSize'),
            theme: Preference.get('editorTheme'),




        };

        $scope.vars.delimiter = localStorageService.get('delimiter') || ';;';
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
        /**
         * Prevent data loss on close page
         */
        $window.onbeforeunload = (event) => {
            if ($scope.vars.currentTab.sql !== '' && location.hostname != 'localhost') {
                let message = 'Do you want to leave this page?';
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
            let message = 'Do you want to leave this page?';
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
                    if (!tab.editor)
                    {
                        tab.sql="";
                    }
                    else
                    {
                        tab.sql=tab.editor.getValue();
                    }
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
                console.info("Save session , localStorageService.set(SQL_SESSION_KEY)");
            }
        };

        $scope.$watch('$root.isInitDatabaseStructure', function() {
            $scope.vars.EditorIsInit=$rootScope.isInitDatabaseStructure
        });


        $scope.InitDatabaseStructure = () =>
        {
            console.warn(">>>>>>>>>>>>>>>InitDatabaseStructure<<<<<<<",$rootScope.isInitDatabaseStructure);

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
            let extendSettings = 'result_overflow_mode=throw';

            $scope.vars.currentTab.loading = true;

            // если указан limitRows
            if ($scope.vars.limitRows) {
                extendSettings += '&max_result_rows=' + $scope.vars.limitRows ;
            }
            if ($scope.vars.limitTimes) {
                extendSettings += '&timeout_overflow_mode=throw&max_execution_time=' + $scope.vars.limitTimes;
            }
            let progressQuery=query.sql.replace(/(\r\n|\n|\r)$/gm, "").substr(0,130);
            $scope.vars.currentTab.progress.query=progressQuery;



            let Q_ID='';

            if (query.qid) {
                Q_ID = ' /*TABIX_QUERY_ID_' + query.qid + '*/ ';
            }

            // API.fetchQuery(Q_ID + query.sql, query.format, true, extendSettings).then((data) => {
            API.fetchQuery(Q_ID + query.sql, true,query.format,  extendSettings).then((data) => {

                try {

                    let r = data;

                    if (!angular.isObject(data)) {
                        data = {
                            data: r,
                            meta: null,
                            rows: null,
                            statistics: null
                        };
                    }
                    data.error = false;
                    data.query = query;
                    data.countAllQuery = queue.length;


                    // Для текущего currentTab, сохраняем statistics массив
                    let st={
                        time:moment().format('HH:mm:ss')
                    };
                    if (angular.isObject(data.statistics)) {
                        Object.assign(st,data.statistics);
                    }


                    st.query=progressQuery;
                    // st.query_order=query.index;
                    if (_.isArray($scope.vars.currentTab.statistics))
                    {
                        $scope.vars.currentTab.statistics.push(st);
                    }

                    $scope.vars.LastStatistics = st;



                    // make DataProvider
                    let dp= new DataProvider(data,'ch');
                    dp.progressQuery = progressQuery;


                    // Получаем список виджетов в каждый передаем DP
                    // На каждый запрос как минимум 3и виджета Table & Draw & Pivot - т/е три основных вкладки
                    // Запрос может содержать несколько DRAW комманд, тогда в разделе Draw должно быть указанное кол-во комманд

                    // resultContainer - Стек отправленных запросов и результатов - доступен в view через tab.results

                    resultContainer.widgets.tables.push(new WidgetTable(dp));

                    // resultContainer.widgets.pivot.push(new WidgetPivot(dp));


                    if ('drawCommand' in query && query.drawCommand.length)
                    {
                        dp.countAll=(query.drawCommand.length>data.countAllQuery ? query.drawCommand.length : data.countAllQuery);

                        console.info("query.drawCommand",query.drawCommand);
                        // У запроса есть список DRAW комманд каждая идет в стек
                        query.drawCommand.forEach((item) => {
                            resultContainer.widgets.draw.push(new WidgetDraw(dp,item));
                        });
                    }
                    else {
                        // Если у запроса не указана коммпанда Draw попробовать использовать автомат
                        resultContainer.widgets.draw.push(new WidgetDraw(dp,false));
                    }

                    resultContainer.data.push(query);

                    //
                    $scope.$applyAsync();

                    // Рекурсивный вызов executeQuery если в очереди
                    // еще остались элементы
                    if ((query.index + 1) < queue.length) {
                        $scope.executeQuery(queue[query.index + 1], queue, resultContainer);
                    }
                    else {
                        // Финал запросов
                        $scope.finalizeResult(resultContainer);
                    }

                } catch (e) {
                    alert('System Tabix error, see console log.'+"\n"+e.name + ":" + e.message );
                    console.error("Error in tabix",e);
                }


            }, (response) => {

                // @todo fix
                console.log("ERROR : response :",response);
                // Ошибка
                $mdToast.show(
                    $mdToast
                        .simple()
                        .content('ERROR:'+response.substr(0,90))
                        .theme(ThemeService.theme)
                        .position('bottom right')
                );

                $scope.vars.currentTab.loading = false;
                $scope.vars.currentTab.progress = false;


                let result = {
                    meta: null,
                    rows: null,
                    error:'Some error - N/A',
                    query: query,
                    statistics: null
                };
                result.error=response;

                // if (response && response.data) {
                //     result.error = angular.toJson(response.data).replace(/^"/, '').replace(/"$/, '');
                // } else {
                //     result.error = "Status:"+response.status+"\nText:"+response.statusText;
                //
                //
                // }
                console.log("ERROR:",result.error);
                // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                // Поиск ошибки в тексте ответа и тут нужна проверка что вообще ошибка содержит текст
                let moveCol=-1;
                let moveRow=-1;
                if (result && result.error && _.isString(result.error))
                {
                    let match= result.error.match(/position\s(\d+)\s\(line\s(\d+).\s+col\s+(\d+)\)/);
                    if (match && match[1] && match[2] && match[3]) {

                        console.log("Error in POS"+match[1]+' in '+match[2]+','+match[3],query.itemRange.start);
                        if (query.itemRange && query.itemRange.start) {
                            moveCol=parseInt(match[3])+query.itemRange.start.column;
                            moveRow=parseInt(match[2])+query.itemRange.start.row;
                        }
                    }
                    else
                    {
                        if (query.itemRange && query.itemRange.start) {
                            moveCol=query.itemRange.start.column;
                            moveRow=query.itemRange.start.row;
                        }
                    }

                    if (moveRow>-1 && moveCol>-1 ){
                        $scope.vars.currentTab.editor.gotoLine(moveRow, moveCol);
                    }
                    console.log("move cursor to",moveRow,moveCol);
                }

                // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                // провайдер CH или API
                let provider='ch';
                // передаем в
                console.warn('ERROR',result);
                let dp= new DataProvider(result,provider);
                resultContainer.data.push(query);
                resultContainer.widgets.tables.push(new WidgetTable(dp));
                $scope.finalizeResult(resultContainer);

            });
        };

        /**
         * Show results
         * @param data
         * @returns {*}
         */
        $scope.renderResult = (data) => {
            //
            // // ставим активной закладку 0
            //
            // data.echarts=false;
            // data.pivot=false;
            // data.charts=false;
            //
            // data.selectedTabIndex=0;
            // //
            // if (typeof data.error == 'string') {
            //     data.result = '<pre class="fs-caption tc-red-700">' + data.error + '</pre>';
            // }
            // else if (!angular.isObject(data.data)) {
            //     if (!angular.isString(data.data)) {
            //         data.result = '<pre class="fs-caption">' + angular.toJson(data.data, true) + '</pre>';
            //     }
            //     else {
            //         data.result = '<pre class="fs-caption">' + data.data + '</pre>';
            //     }
            // }
            // else {
            //
            //     // рендер таблицы в HTML
            //     data.result = API.dataToHtml(data);
            //     // запрос на createtable из select
            //     data.createtable = API.dataToCreateTable(data);
            //
            //     data.pivot=true;
            //     data.charts=true;
            // }
            // return data;
        };

        /**
         * Operations after render
         * @param resultContainer
         */
        $scope.finalizeResult = (resultContainer) => {
            $scope.vars.currentTab.loading = false;
            $scope.vars.currentTab.progress = false;


            // -------------------------------------------------------
            if (resultContainer.data.find((item) => (
                    item.keyword &&
                    ['DROP', 'CREATE', 'ALTER'].indexOf(
                        item.keyword.toUpperCase()
                    ) != -1
                ))) {



                $mdToast.show(
                    $mdToast
                        .simple()
                        .content('Press `Reload Structure` for reload')
                        .theme(ThemeService.theme)
                        .position('bottom right')
                );

                // $scope.selectDatabase($scope.vars.db);
                // если в списке был запрос на CREATE / DROP нужно перерисовать
                // $rootScope.$emit('handleBroadcastDatabases',{});
            }
            $scope.$applyAsync();
            // -------------------------------------------------------
            if ($scope.vars.currentTab.statistics[0]) {
                let d=DataProvider.convertArrayToDataProvider($scope.vars.currentTab.statistics,"statistics");
                d.sort="time";
                d.sortOrder="desc";
                resultContainer.widgets.stats.push(new WidgetTable(d, false));
            }
        };

        /**
         * Execute SQL statement
         * @param type
         * @param tab
         */
        $scope.execute = (type, tab) => {
            $scope.$applyAsync();
            console.groupCollapsed("Execute query");
            $scope.vars.LastStatistics = false;
            tab.sql=tab.editor.getValue();

            let sql = tab.sql;

            let numquery = 0;
            const editor = tab.editor;
            let queue = [];
            let selectSql = editor.getSelectedText();

            if (angular.isUndefined(tab.selectedTabResultIndex))
            {
                tab.selectedTabResultIndex=0;
            }

            // RESULT для вкладки в TAB
            let result = {
                data: [],
                time: $filter('date')(new Date(), 'HH:mm:ss'),
                pinned: false,
                widgets:{
                    tables:[],
                    pivot:[],
                    draw: [],
                    stats: []
                }
            };

            // получаем выделенный текст, и если выделено - ранаем выделение
            if (!(selectSql === '' || selectSql === null)) {
                sql = selectSql;
            }
            console.info('[EDITOR TEXT]> ',sql);

            // Выход если пустой sql
            if (sql === '' || sql === null) {
                $mdToast.show(
                    $mdToast
                        .simple()
                        .content('SQL query is empty')
                        .theme(ThemeService.theme)
                        .position('bottom right')
                );

                return;
            }

            // ------------------------------------------------------------------------------------------------
            //
            // console.info( 'Cache:',$.cache);

            // Clear not-pinned tabs
            // tab.results = tab.results.reduce((arr, item) => {
            //     if (item.pinned) {
            //         arr.push(item);
            //     }
            //     return arr;
            // }, []);
            //
            // tab.results.unshift(result);
            // if (_.isUndefined(event) && _.isObject(event)) {
            //     event.stopPropagation();
            // }
            tab.results=[result];



            // Save tabs session
            saveSession();

            let count_all=0;
            // BadCode : window.global_delimiter
            let use_delimiter=window.global_delimiter;
            if (!use_delimiter) use_delimiter=';;';

            // Split SQL into subqueries by delimiter
            editor
                .session
                .$mode
                .splitByTokens(sql, 'constant.character.escape', use_delimiter)
                .forEach((item) => {


                    // Если исполнить текущий - то дальше не парсим если уже есть один в списке
                    if (type == 'current' && numquery>0) return;



                    let drawCommand=[];
                    let subSql = item.sql;
                    //


                    // Ignore short queries
                    if (subSql.length < 5) {
                        return;
                    }
                    // Если комманда исполнить текущий и НЕ выделен текст -> пропускаем все пока не найдем подходящий
                    if (type == 'current' && !selectSql) {
                        let cursor = editor.selection.getCursor();

                        // console.log("--------------------------forEach ITEM-------------------------------------");
                        // console.info(item.sql);
                        // console.log("Exec current position :",cursor);
                        // console.log("Item range :",item.range.start,item.range.end);
                        // console.log("Item  :",item);
                        if (!cursor || angular.isUndefined(cursor)) {
                            return;
                        }
                        else
                        {
                            let rg=item.range.compare(cursor.row, cursor.column);
                            // console.log("Range compare = ",rg);
                            if (rg !== 0) return ;
                        }
                    }
                    // ------------------------------------------------------------------------------------------------
                    // Save to SQL log
                    let SaveSql=subSql.trim();

                    if ($rootScope.sqlLog.indexOf(SaveSql) == -1) {
                        $rootScope.sqlLog.unshift(SaveSql);
                        if ($rootScope.sqlLog.length > SQL_LOG_LENGTH) {
                            $rootScope.sqlLog.splice(0, SQL_LOG_LENGTH);
                        }

                        localStorageService.set('sqlLog',$rootScope.sqlLog);
                    }

                    let rV = editor.session.$mode.replaceVars(subSql,Variables.get());

                    subSql=rV.sql;

                    let replacedVars=rV.vars;

                    console.log("replacedVars",rV);


                    // определяем есть ли комманда DRAW .* - все что после нее есть JavaScript
                    // вырезаем если комманда есть

                    if (editor.session.$mode.findTokens(subSql, "invalid.illegal", true))
                    {

                        let draw=editor.session.$mode.splitByTokens(subSql,'invalid.illegal',true);
                        // console.log("Find DRAW COMMAND", draw);
                        subSql=draw[0]['sql'];
                        draw.forEach((i)=>{

                            if (angular.isDefined(i.keyword) && i.keyword)
                            {
                                let d=/DRAW_(\w+)/img;
                                let found=d.exec(i.keyword);
                                if (found && found[1])
                                {
                                    drawCommand.push({
                                        drawtype:found[1].toLowerCase(),
                                        code:i.sql
                                    });
                                }
                            }
                        });
                    }


                    console.info('[SQL]>',subSql);
                    if (drawCommand)
                    {
                        console.info('[DRAW]>',drawCommand);
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
                    if (!(_keyword == 'select' || _keyword == 'with')) {
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
                        storage: storage,
                        drawCommand: drawCommand,
                        itemRange:item.range,
                        qid:API.makeQueryId()
                    });

                    numquery++;
                });

            console.groupEnd("Execute query");

            if (queue.length) {
                $scope.vars.currentTab.progress = {};
                if (!$scope.vars.currentTab.statistics)
                {
                    $scope.vars.currentTab.statistics= [];
                }
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




        $scope.reloadCache = () => {
            console.log("reloadCache");
            API.resetDatabaseStructure();
            $mdToast.show(
                $mdToast
                    .simple()
                    .content('Reload page - for reset cache')
                    .theme(ThemeService.theme)
                    .position('bottom right')
            );
        };

        /**
         * Set database name
         * @param db
         */
        $scope.selectDatabase = (db,type) => {

            if (!db) {
                return;
            }


            API.setDatabase(db);
            if ($scope.vars.db==db) {
                return;
            }

            // console.groupCollapsed("selectDatabase");
            // console.warn("selectDatabase type:["+type+"] ; current="+$scope.vars.db+' => '+db);








            $scope.vars.db = db;
            // console.info("selectDatabase > ",db);

            if (!$scope.AceEditorInLoad) {
                // console.info("selectDatabase reApply ACE");
                $scope.aceLoadDatabaseFields();
                $scope.aceApply(false);
            }
            // console.groupEnd("selectDatabase");



            return;
        };

        /**
         * Add word from dict to SQL etitor вставка текста в активное окно редактора там где курсор
         */
        $scope.insertWordInEditor = (word) => {
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

        $scope.aceLoadDatabaseFields = () => {
            let db=$scope.vars.db;
            // console.info("aceLoadDatabase 'Fields' > ",db);
            window.aceJSRules.fieldsList=[];

            API.databaseStructure(
                function (ds) {
                    window.aceJSRules.fieldsList=ds.getAllFieldsInDatabase(db);
                    // console.info("aceLoadDatabaseFields - done");
                    return;


                }
            );

        };

        $scope.aceLoadDatabaseStructure = () => {
            let db=$scope.vars.db;
            // console.info("aceLoadDatabase 'Structure' > ",db);

            // reset global object
            window.aceJSRules.tables=[];

            API.databaseStructure(
                function (ds) {

                    // ------------------------------------------------------------------------------------
                    $scope.vars.databasesList=ds.getDatabases();
                    // ------------------------------- tables -----------------------------------
                    Object.keys(ds.getUniqueDatabaseTables()).forEach((tab) => {
                        window.aceJSRules.tables.push(tab);
                    });
                    // ------------------------------- fieldsList -----------------------------------
                    window.aceJSRules.fieldsList=ds.getAllFieldsInDatabase(db);

                    // console.info("aceLoadDatabaseStructure - done");
                    return;


                }
            );
        };
        $scope.loadInAce = (editor) => {
            // динамическая загрузка в ACE
            editor.session.setMode({
                path: "ace/mode/clickhouse",
            });

            // @todo : 1 - переписать и отказаться полностью от Window!!
            // @todo : 2 - Может вкладки будут переключать сессии - а не полностью редакотор
            // @todo : 3 - вынести этот код в ui-ace-directive
            // грузим
            for (let func in window.aceJSRules.builtinFunctions)
            {
                let f=window.aceJSRules.builtinFunctions[func];
                editor.session.$mode.$highlightRules.addCompletionsFunctions(f);
            }
            // ---------- LOAD TABLES ----------
            editor.session.$mode.$highlightRules.addArrayCompletions(window.aceJSRules.tables, '[table]','table');

            // ---------- LOAD dictionaries ----------
            for (let dic in window.aceJSRules.dictionaries )
            {
                let d=window.aceJSRules.dictionaries[dic];
                editor.session.$mode.$highlightRules.addCompletionsDictionaries(d);
            }
            // ---------- LOAD fieldsList ----------
            for (let field in window.aceJSRules.fieldsList )
            {
                let v=window.aceJSRules.fieldsList[field];
                editor.session.$mode.$highlightRules.addCompletionsTableFiled(v);
            }

            // ---------- LOAD vars ----------
            let vars=Variables.getCompletions();
            let snip=Snippets.getCompletions();
            editor.session.$mode.$highlightRules.addArrayCompletions(vars, '[var]','var');
            editor.session.$mode.$highlightRules.addArrayCompletions(snip, '[snippet]','snippet');


            editor.session.bgTokenizer.start(0);
        };


        $scope.aceApply= (editor) =>
        {
            // ------------------------------------------------------------------------------------
            // reload highlights

            if (!editor)
            {

                $scope.vars.tabs.forEach((tab) => {
                    if (tab.editor) {
                        console.log("<!aceApply in TAB!>");
                        $scope.loadInAce(tab.editor);
                    }
                });
            }
            else {
                console.log("<!aceApply in current TAB!>");
                $scope.loadInAce(editor);
            }

            $rootScope.$watch('currentDatabase', $scope.selectDatabase);


        };


        $scope.changeRootSelectDatabase = (db) =>
        {
            if ($rootScope.currentDatabase!=db)
            {
                $rootScope.currentDatabase=db;
            }
        };
        /**
         * Load dicts for ACE autocomplete
         */
        $scope.aceLoadDictionaries = () => {
            if ($scope.vars.isDictionariesLoad) {
                return;
            }

            // console.time("sql.loadDictionaries");

            window.aceJSRules.dictionaries=[];
            $scope.vars.dictionaries = [];
            window.aceJSRules.builtinFunctions=[];
            // console.log("loadDictionaries");
            $scope.vars.isDictionariesLoad=true;
            API.databaseStructure(
                function (ds) {
                   // ------------------------------- builtinFunctions -----------------------------------
                    ds.getFunctions().forEach((item) => {
                        window.aceJSRules.builtinFunctions.push({name:item.name,isaggr:item.is_aggregate,score:101,comb:false,origin:item.name});
                        if (item.is_aggregate)
                        {
                            // Комбинатор -If. Условные агрегатные функции
                            let p={name:item.name+'If',isaggr:item.is_aggregate,score:3,comb:'If',origin:item.name};
                            window.aceJSRules.builtinFunctions.push(p);

                            // Комбинатор -Array. Агрегатные функции для аргументов-массивов
                            p={name:item.name+'Array',isaggr:item.is_aggregate,score:2,comb:'Array',origin:item.name};
                            window.aceJSRules.builtinFunctions.push(p);

                            // Комбинатор -State. агрегатная функция возвращает промежуточное состояние агрегации
                            p={name:item.name+'State',isaggr:item.is_aggregate,score:1,comb:'State',origin:item.name};
                            window.aceJSRules.builtinFunctions.push(p);

                        }

                    });
                    // -------------------------------- dictionaries ---------------------------------------------------
                    // dictionaries
                    ds.getDictionaries().forEach((item) => {

                        let id_field=item.name;

                        // Определяем id_field из item.name
                        // Если id_field содержит точку вырезать все что до точки
                        // Если в конце `s` вырезать
                        // подставить _id и все в нижний регистр

                        id_field = id_field.replace(/^.*\./gm, "");

                        if (id_field!='news') {
                            id_field = id_field.replace(/s$/gm, "");
                        }

                        if (!id_field) {
                            id_field='ID';
                        }else {
                            id_field=id_field.toLowerCase()+'_id';
                        }


                        let dic = 'dictGet' + item["attribute.types"] + '(\'' + item.name + '\',\'' + item["attribute.names"] + '\',to' + item.key + '( '+id_field+' ) ) AS ' + item["attribute.names"] + ',';
                        window.aceJSRules.dictionaries.push({
                            dic:dic,
                            title: 'dic_'+item.name + '.' + item["attribute.names"]
                        });
                        $scope.vars.dictionaries.push({
                            dic: dic,
                            title: item.name + '.' + item["attribute.names"] + ' as ' + item["attribute.types"]
                        });
                    });
                    // ------------------------------------------------------------------------------------
                    // console.timeEnd("sql.loadDictionaries");
                    return;


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

        /**
         * Автоформатирование
         */

        const formatCode = () => {
            if (angular.isObject(window.sqlFormatter)) {
                $timeout(() => {
                    //$scope.vars.currentTab.sql = window.sqlFormatter.format($scope.vars.currentTab.sql);
                    $scope.vars.currentTab.editor.setValue(
                        window.sqlFormatter.format($scope.vars.currentTab.sql)
                    );
                });
            }
        };


        /**
         * Хоткеи для переключения вкладок
         */
        for (let i = 0; i < 9; i++) {
            hotkeys.add({
                combo: 'ctrl+shift+' + (i + 1),
                callback: () => selectTab(i)
            });
        }


        hotkeys.add({
            combo: ($scope.vars.disableHotKeyCmdLeft ? 'ctrl+shift+alt+right' : 'ctrl+right'),
            callback: selectNextTab
        });


        hotkeys.add({
            combo: ($scope.vars.disableHotKeyCmdLeft ? 'ctrl+shift+alt+left' : 'ctrl+left'),
            callback: selectPrevTab
        });
        hotkeys.add({
            combo: 'ctrl+shift+f',
            callback: formatCode
        });

        /**
         * ACE editor init on creation
         * @param editor
         */
        $scope.aceLoaded = (editor) => {

            $scope.editorVisiable = false;

            $timeout(()=>{

                $scope.editorVisiable = true;

                // console.log("aceLoaded : ACE editor init on creation");
                $scope.AceEditorInLoad=true;


                if ($rootScope.currentDatabase) {
                    $scope.selectDatabase($rootScope.currentDatabase);
                }



                $scope.aceLoadDictionaries();
                $scope.aceLoadDatabaseStructure();
                $scope.aceLoadDatabaseFields();

                let tab = $scope.vars.tabs.find(tab => !tab.editor) || $scope.vars.currentTab;

                tab.editor = editor;
                editor.$blockScrolling = Infinity;
                //
                // useWrapMode : true,=> session.setUseWrapMode(true/false)
                //     mode: 'clickhouse',
                //     onLoad: aceLoaded,

                // Load settings from LocalStorage
                editor.setOptions({
                    fontSize: $scope.vars.fontSize + 'px',
                    enableBasicAutocompletion : true,
                    behavioursEnabled:true ,
                    wrapBehavioursEnabled:true ,
                    highlightSelectedWord:true ,
                    //showInvisibles:true ,
                    showGutter:true ,
                    enableLiveAutocompletion:$scope.vars.enableLiveAutocompletion,
                    liveAutocompletionDelay: 500,
                    liveAutocompletionThreshold: 1
                });

                editor.setTheme('ace/theme/' + $scope.vars.theme);

                // reload keywords & highlights
                // editor.session.setMode({
                //     path: "ace/mode/clickhouse",
                //     v: Date.now()
                // });
                editor.session.setUseWrapMode(    Preference.get('useWrapMode'));

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
                // removeLines
                editor.commands.addCommand({
                    name: 'collapseAll',
                    bindKey: {
                        win: 'Ctrl-Shift--',
                        mac: 'Command+Shift+-'
                    },
                    exec: (editor) => {
                        editor.session.$mode.collapseAll(editor.session);
                    }
                });
                editor.commands.addCommand({
                    name: 'unfold',
                    bindKey: {
                        win: 'Ctrl-Shift-+',
                        mac: 'Command+Shift+='
                    },
                    exec: (editor) => {
                        editor.session.unfold();

                    }
                });
                // https://github.com/ajaxorg/ace/blob/master/lib/ace/lib/keys.js

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

                for (let i = 0; i < 9; i++) {
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
                        win: ($scope.vars.disableHotKeyCmdLeft ? 'Shift-Alt-Ctrl-Right' : 'Ctrl-Right'),
                        mac: ($scope.vars.disableHotKeyCmdLeft ? 'Shift-Alt-Command-Right' : 'Command-Right')
                    },
                    exec: selectNextTab
                });
                editor.commands.addCommand({
                    name: 'selectprevtab',
                    bindKey: {
                        win: ($scope.vars.disableHotKeyCmdLeft ? 'Shift-Alt-Ctrl-Left' : 'Ctrl-Left'),
                        mac: ($scope.vars.disableHotKeyCmdLeft ? 'Shift-Alt-Command-Left' : 'Command-Left')
                    },
                    exec: selectPrevTab
                });
                editor.commands.addCommand({
                    name: 'formatcode',
                    bindKey: {
                        win: 'Ctrl-Shift-F',
                        mac: 'Command-Shift-F'
                    },
                    exec: formatCode
                });

                editor.setValue(tab.sql);
                editor.clearSelection();
                editor.focus();
                editor.selection.moveTo(0, 0);

                // Повесить эвент и переиминовывать кнопку -"Выполнить"
                editor.on('changeSelection', () => {
                    $timeout(() => {
                        tab.buttonTitle = editor.getSelectedText() !== '' ? 'Run selected ⌘ + ⏎' : 'Run all ⇧ + ⌘ + ⏎';
                        if (tab.originalSql) {
                            tab.changed = (tab.originalSql != tab.sql);
                        }
                    });
                });
                $scope.AceEditorInLoad=false;
                $scope.aceApply(editor);

            }, 100);

        };



        /**
         * Watch and save delimiter in LocalStorage
         */
        //
        // $scope.$watch('vars.delimiter', (d) => {
        //
        //     if (d.name && d.delimiter)
        //     {
        //         d=d.delimiter;
        //     }
        //
        //
        //     localStorageService.set('delimiter', d);
        //     window.global_delimiter=d;
        //
        //
        //     $scope.vars.tabs.forEach((tab) =>
        //     {
        //         if (tab.editor)
        //         {
        //             console.log(">>>vars.delimiter->ACE");
        //             tab.editor.session.setMode({
        //                 path: "ace/mode/clickhouse",
        //                 v: Date.now()
        //             });
        //             tab.editor.session.bgTokenizer.start(0);
        //         }
        //     });
        // });


        /**
         * Save SQL to history
         * @param tab
         * @param ev
         */
        $scope.save = (tab, ev) => $mdDialog.show(
            $mdDialog.prompt()
                .title('Save SQL as?')
                .placeholder('Title')
                .initialValue(tab.name)
                .targetEvent(ev)
                .ok('Save')
                .cancel('')
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
            $scope.vars.currentTab.editor.setValue(history.sql);
            $scope.aceApply($scope.vars.currentTab.editor);
        };

        /**
         * Create export data
         * @param result
         * @returns {number[]}
         */
        $scope.getExportData = (tableData) => {

            return tableData.data.data.map(item => Object.keys(item).map(key => (
                angular.isArray(item[key]) ? item[key].join(', ') : item[key]
            )));

        };

        $scope.getExportHeaders = result => result.data.meta.map(item => item.name);

        /**
         * Inserting new SQL tab
         */
        $scope.addTab = () => {
            $scope.vars.currentTab = {
                name: 'new SQL',
                sql: '',
                buttonTitle: 'Run ⌘ + ⏎',
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

        $scope.changeTab = (newTab) => {

            saveSession();
            $scope.vars.currentTab = newTab;

        };
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
                        .title('SQL was changed. Save it before exit?')
                        .targetEvent(event)
                        .ok('Yes')
                        .cancel('No')
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

            // tab.results.splice(tab.results.indexOf(result), 1);
        };


        // обновлеяем VARS + Snippets
        // Динамически удаляем все VARS+SNIPS во всех AceJS -> добавляем новые
        $rootScope.$on('handleBroadcastUpdateVarsAndSnippets', function(event,args) {
                $scope.aceApply();
        });
        $rootScope.$on('handleBroadcastCalcSumCells', function(event,args) {
            if (_.isObject($scope.vars.currentTab.results[0]))
            {
                $scope.vars.currentTab.results[0].cellsCalc=args;
                $scope.$applyAsync();
            }

        });
        // вставка текста в активное окно редактора там где курсор
        $rootScope.$on('handleBroadcastInsertInActive', function(event,args) {
            if (args.value) {
                $scope.insertWordInEditor(" "+args.value+" ");
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
                        .title(`Delete ${item.name}?`)
                        .targetEvent(event)
                        .ok('Yes')
                        .cancel('No')
                ).then(()=> {
                    $scope.vars.sqlHistory.splice(index, 1);
                    localStorageService.set(SQL_HISTORY_KEY, $scope.vars.sqlHistory);
                });
            }
        };
//
//         $scope.searchSqlLogServer = () => {
//             $scope.vars.sqlLogServer=[];
//             let like=$scope.vars.searchQueryOnServer;
//
//
//             let sql=`
//             SELECT query FROM ( SELECT query FROM system.query_log
// WHERE query like '%TABIX_QUERY_ID%' AND query not like '%system.query_log%' and exception=''  AND query LIKE '%` + like + `%'
// ORDER BY event_time desc  ) GROUP BY query`;
//
//             if (like){
//
//                 console.info("Search on server query like : "+sql);
//                 API.fetchQuery(sql).then(function ( queryResult ) {
//                     $scope.vars.sqlLogServer=_.map(queryResult.data,'query');
//                 });
//
//             }
//
//             };


        // $scope.setDisableAutoHelp = () => {
        //     let value=$scope.vars.disableAutohelp
        //     localStorageService.set(SQL_SAVE_DISABLE_AUTOHELP_KEY, value);
        //     console.info("SET>window.global_chFunctionsHelp = {};",value);
        //     if (value) {
        //         // window.global_chFunctionsHelp = {};
        //     }
        //     else {
        //
        //     }
        // };


        /**
         * Set SQL in editor
         * @param sql
         */
        $scope.setSql = (sql) => {
            $scope.vars.currentTab.sql = sql;
            $scope.toggleSidenav('log');
            $scope.vars.currentTab.editor.setValue(sql);

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
                    .title('Title tab')
                    .placeholder('title')
                    .initialValue(tab.name)
                    .targetEvent(event)
                    .ok('Apply')
                    .cancel('Cancel')
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

            if (!_.isArray($scope.vars.tabs)) $scope.vars.tabs=[];
            if ($scope.vars.tabs.length > 0) {
                $timeout(() => ($scope.vars.currentTab = $scope.vars.tabs[0]), 500);
            } else {
                $scope.addTab();
            }
        } else {
            localStorageService.set(SQL_SESSION_KEY, []);
            $scope.addTab();
        }





        /**
         * Controller destructor
         */
        $scope.$on('$destroy', () => {
            API.setDatabase($rootScope.currentDatabase);
            clearRouterListener();
            $window.onbeforeunload = null;
        });


        //context menu array
        $scope.rightAceMenuList = [

        ];


        $scope.showDialogUpload = function (resultContainer_widgets, ev) {

            function DialogController($scope, $mdDialog) {
                $scope.vars={
                    UploadCsv : {
                        content: null,
                        header: true,
                        headerVisible: true,
                        separator: ',',
                        separatorVisible: true,
                        result: null,
                        encoding: 'ISO-8859-1',
                        encodingVisible: true,
                        uploadButtonLabel:'Upload',
                        callback:function (c) {
                            $mdDialog.hide();
                        }
                    }
                };
                $scope.$watch('vars.UploadCsv.result',(value) => {
                    if (value)
                    {

                        $mdDialog.hide(value);
                    }
                });
                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

            };
            // --
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/sql/showDialogUpload.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            })
                .then(function(csvObject) {
                    if (csvObject && resultContainer_widgets && resultContainer_widgets.tables) {
                        let dp = DataProvider.convertArrayToDataProvider(csvObject, "csv");
                        // push Data
                        resultContainer_widgets.tables.push(new WidgetTable(dp));
                    }

                }, function() {
                    // $scope.status = 'You cancelled the dialog.';
                });
        };

        //gets triggered when an item in the context menu is selected
        $scope.rightMenuProcess = function(item){
            $scope.vars.currentTab.sql = $scope.vars.currentTab.editor.getValue();
            let session=$scope.vars.currentTab.editor.session;

            $scope.vars.currentTab.editor.resize();
            if(item == "Snippet"){
                // Editor get selected
                let selectSql =  $scope.vars.currentTab.editor.getSelectedText();
                if (selectSql) {
                    Snippets.add(selectSql);
                    $scope.aceApply();
                }

            } else if(item == "AutoFormat"){
                formatCode();
            } else if(item == "Expand"){
                session.unfold();
            } else if(item == "Collapse All"){
                session.$mode.collapseAll(session);
            } else if(item == "Collapse"){
                session.foldAll();
            } else {

            }
            $scope.vars.currentTab.editor.focus();

        };

    }
})(angular, smi2);
