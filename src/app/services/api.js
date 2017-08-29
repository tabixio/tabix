/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).service('API', API);
    API.$inject = ['$http', '$q', 'localStorageService', '$sanitize', 'ThemeService'];

    /**
     * @ngdoc service
     * @name smi2.service:API
     * @description API manager
     */
    function API($http, $q, localStorageService, $sanitize, ThemeService) {

        const CURRENT_BASE_KEY = 'currentBaseConfig';
        const DEFAULT_PORT = 8123;

        let database = null;
        let connection = {};

        // Первичная загрузка данных из LS
        let data = localStorageService.get(CURRENT_BASE_KEY);
        if (data && data.host) {
            connection = data;
        }

        /**
         * @ngdoc method
         * @methodOf smi2.service:API
         * @name setConnection
         * @description Сохранение данных подключения в БД
         * @param {mixed} db Данные подключения
         */
        this.setConnection = (db) => {
            localStorageService.set(CURRENT_BASE_KEY, db);
            connection = angular.copy(db);

            // Check port
            // if (!/.*\:\d+$/.test(connection.host)) {
            //     connection.host += ':' + DEFAULT_PORT;
            // }
        };

        /**
         * @ngdoc method
         * @methodOf smi2.service:API
         * @name clear
         * @description Сброс авторизации
         */
        this.clear = () => {
            database = null;
            connection = {};
            localStorageService.set(CURRENT_BASE_KEY, {});
        };


        this.getPassword = () => {
            return  (connection.password);
        };

        this.getLogin = () => {
            return (connection.login);
        };


        this.makeQueryId = () => {
                let text = "";
                let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (let i = 0; i < 8; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
        };

        this.isTabixServer = () => {

            if (!connection.tabix) return false;

            if (connection.tabix.server) return true;

            return false;
        };

        this.tabixQuery = ( request ) => {


            console.info("[request]>",request);
            $http(req).then(
                response => defer.resolve(response.data),
                reason => defer.reject(reason)
            );

            return defer.promise;
        };


        this._tabixRequest = (request,action) => {


            let o = {
                version:1,
                auth: {
                    login: connection.tabix.login,
                    password: connection.tabix.password,
                    confid:connection.tabix.confid
                }
            };

            request = Object.assign(o,request);

            // let parameter = JSON.stringify(Object.assign(o,request));

            let url=connection.tabix.server+'/'+action;


            return {
                method: 'POST',
                data  : request,
                // headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                // },
                url: url,
                transformResponse: (data, header, status) => {
                    try {
                        return JSON.parse(data);
                        // return angular.fromJson(data);
                    } catch (err) {
                        return (data ? data : "\nStatus:" + status + "\nHeaders:" + angular.toJson(header()));
                    }
                }
            };
        };
        /**
         * @ngdoc method
         * @methodOf smi2.service:API
         * @name query
         * @description Выполнение запроса к БД
         * @param {string} sql Текст запроса
         * @return {promise} Promise
         */
        this.query = (sql, format, withDatabase, extend_settings) => {
            let defer = $q.defer();
            let query = '';
            let url = "http://localhost/";
            let req = false;
            if (format !== false) {
                format = (format || ' FoRmAt JSON');
                if (format == 'null') {
                    format = '';
                }
                query = sql + "\n\n" + format;
            } else {
                query = sql;
            }

            if (this.isTabixServer()) {
                // tabix server
                 req = this._tabixRequest({query:query},'query');

            } else {
                //direct connect

                let httpProto = '';
                if (!(connection.host.indexOf('://') > 0 || connection.host.indexOf('/') == 0)) {
                    httpProto = 'http://';
                }

                url = httpProto + connection.host + '/?add_http_cors_header=1&log_queries=1';
                //max_block_size=1&send_progress_in_http_headers=1&http_headers_progress_interval_ms=500

                if (connection.login) {
                    url += '&user=' + encodeURIComponent(connection.login);
                }
                if (connection.password) {
                    url += '&password=' + encodeURIComponent(connection.password);
                }
                if (withDatabase) {
                    url += '&database=' + encodeURIComponent(database);
                }
                if (extend_settings) {
                    url += '&' + extend_settings;
                }
                if (connection.params){
                    url += '&'+connection.params;
                }
                // @todo for send_progress_in_http_headers try https://github.com/sockjs/sockjs-client

// Access-Control-Expose-Headers : X-ClickHouse-Progress
                // https://stackoverflow.com/questions/15042439/cant-get-custom-http-header-response-from-ajax-getallresponseheaders
                // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress
                //
                // ClickHouse/dbms/src/IO/WriteBufferFromHTTPServerResponse.cpp
                //

                 req = {
                    method: 'POST',
                     // responseType:'text',
                    data :query,

                     // $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
                     // $httpProvider.defaults.headers.common.Pragma = "no-cache";
                     // $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        // "Cache-Control": "no-cache",
                        // "Pragma" : "no-cache",
                        // "If-Modified-Since":0
                    },
                     url: url,
                     cache: false,
                     eventHandlers:{
                         // readystatechange: function(event) {
                         //     console.log("readystatechange");
                         //     console.log(event);
                         // },
                         //  "progress":function(event){
                         //      console.log("progress");
                         //     console.log(event);
                         //  },
                         //  onreadystatechange:function(event){
                         //     console.log("change");
                         //     console.log(event);
                         //  },
                         //  onprogress:function(event){
                         //      console.log("onprogress");
                         //      console.log(event);
                         // }

                    },
                     // uploadEventHandlers: {
                     //     progress: function (e) {
                     //         console.log('uploadEventHandlers',e);
                     //         if (e.lengthComputable) {
                     //             // $scope.progressBar = (e.loaded / e.total) * 100;
                     //             // $scope.progressCounter = $scope.progressBar;
                     //         }
                     //     }
                     // },
                    transformResponse: (data, header, status) => {
                        try {
                            // return angular.fromJson(data);
                            return JSON.parse(data);
                        } catch (err) {
                            return (data ? data : "\nStatus:" + status + "\nHeaders:" + angular.toJson(header()));
                        }
                    }
                };

            }



            // console.info("SQL>",query);
            $http(req).then(
                response => defer.resolve(response.data),
                reason => defer.reject(reason)
            );

            return defer.promise;
        };

        /**
         * @ngdoc method
         * @methodOf smi2.service:API
         * @name getConnectionInfo
         * @description Получение данных подключения
         * @return {mixed} Объект с данными подключения
         */
        this.getConnectionInfo = () => connection;

        /**
         * @ngdoc method
         * @methodOf smi2.service:API
         * @name setDatabase
         * @description Установка дефолтной БД
         * @param {mixed} db Данные БД
         */
        this.setDatabase = (db) => (database = db);

        /**
         * @ngdoc method
         * @methodOf smi2.service:API
         * @name getDatabase
         * @description Get database info
         */
        this.getDatabase = () => database;

        /**
         *
         * @param data
         * @returns {string}
         */
        this.dataToCreateTable = (data) => {
            let q = "\n" + 'CREATE TABLE x (' + "\n";
            let keys = [];
            data.meta.forEach((cell) => keys.push("\t" + cell.name + " " + cell.type));

            return q + keys.join(",\n") + "\n ) ENGINE = Log \n;;\n";
        };

        /**
         * @ngdoc method
         * @methodOf smi2.service:API
         * @name dataToHtml
         * @description Преобразование JSON данных запроса в таблицу
         * @param {mixed} data Объект, который содержит ответ БД
         * @return {string} Строка HTML
         */
        this.dataToHtml = (data) => {

            let html = `<table class="sql-table ${ThemeService.theme}"><tr>`;
            let keys = [];
            data.meta.forEach((cell) => {
                html += `<th>${$sanitize(cell.name)}
                            <div class="sql-table__subheader">${$sanitize(cell.type)}</div>
                        </th>`;
                keys.push(cell.name);
            });
            data.data.forEach((row) => {
                html += '<tr>';
                keys.forEach((key) => {
                    html += '<td>' + $sanitize(row[key]) + '</td>';
                });
                html += '</tr>';
            });
            html += '</table>';
            return html;
        };


        this.dataToHandsontable = (data) => {
            // colHeaders: ['A', 'B', 'C', 'D'],
            // colWidths: [200, 200, 200, 200, 200],
            // columns: [
            //     { data: 'a' },
            //     { data: 'b' },
            //     { data: 'c' },
            //     { data: 'd' }
            // ],
            // data: data,

            let colWidths = [];
            let colHeaders = [];
            let columns = [];
            data.meta.forEach((cell) => {

                colHeaders.push(cell.name);
                let c={};
                c.type='text';
                c.width=100;


                switch (cell.type) {
                    case 'Date':        c.width=90; c.type='date'; c.dateFormat='MM/DD/YYYY';break;
                    case 'DateTime':    c.width=150; c.type='time'; c.timeFormat='HH:mm:ss'; break;
                    case 'Int32':       c.width=80;c.type='numeric'; break;
                    case 'Float64':     c.width=80; c.type='numeric';c.format='0,0.0000';break;
                    case 'UInt32':      c.width=80; c.type='numeric';break;
                    case 'String':      c.width=180; break;
                }

                c.data=cell.name;
                columns.push(c);
            });

            return {

                colHeaders: colHeaders,
                columns: columns,
                data: data.data,
                currentRowClassName: 'currentRow',
                currentColClassName: 'currentCol'
            };
        };

    }
})(angular, smi2);
