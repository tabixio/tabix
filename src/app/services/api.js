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
        let _DatabaseStructure=new DatabaseStructure();
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

        this.hashCode = function(s){
            return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        }
        this.DS_CacheKey = () => {
            return this.hashCode('_databaseStructure:'+JSON.stringify(connection));
        };
        this.DS_storeCache = (columns,tables,databases,dictionaries,functions) => {
            let d={
                columns:columns,
                tables:tables,
                databases:databases,
                dictionaries:dictionaries,
                functions:functions,
                ttl:Date.now()
            };
            return localStorageService.set(this.DS_CacheKey(),d);
        };

        this.DS_fetchFromCache = () => {
            let d=localStorageService.get(this.DS_CacheKey());
            if (!d || !d.ttl) return false;
            // Cache old ?
            let diff=((Date.now() -d.ttl)/(1000*3600));

            // Cache TTL DatabaseStructure
            if (diff>1.5) return false;
            if (d && d.functions && d.functions.length>1 )
            {
                _DatabaseStructure.init(d.columns,d.tables,d.databases,d.dictionaries,d.functions);
                return true;
            }
            return false;
        };
        this.memory = (title) =>{
            return;
            // if (window.performance && window.performance.memory)
            // {
            //     console.info(window.performance.memory);
            //     console.info( title+' | MEMORY, used:'+numbro(window.performance.memory.usedJSHeapSize).format('0.000 b'),'total:'+numbro(window.performance.memory.totalJSHeapSize).format('0.000 b'));
            // }
        };

        this.resetDatabaseStructure = () => {
            console.log('reset databaseStructure');
            localStorageService.set('_databaseStructure:'+this.getHost()+':'+this.getLogin(),[]);
        };
        /**
         *
         * @returns {DatabaseStructure}
         * @constructor
         */
        this.databaseStructure = (call,forceReload) =>{

            console.warn('Call databaseStructure');

            if (_DatabaseStructure.isInit()) {
                return call(_DatabaseStructure);
            }


            if (this.DS_fetchFromCache() && _DatabaseStructure.isInit())
            {
                console.info("restore from cache : database Structure!");
                return call(_DatabaseStructure);
            }
            console.time("Load Database Structure!");
            this.fetchQuery( "SELECT * FROM system.columns" ).then(columns => {
                this.fetchQuery( "SELECT database,name,engine FROM system.tables" ).then(tables => {
                    this.fetchQuery( "SELECT name FROM system.databases" ).then(databases => {
                        this.fetchQuery("SELECT name,key,attribute.names,attribute.types from system.dictionaries ARRAY JOIN attribute ORDER BY name,attribute.names", null).then((dictionaries) => {
                            this.fetchQuery("SELECT name,is_aggregate from system.functions", null).then((functions) => {
                                console.timeEnd("Load Database Structure!");
                                this.DS_storeCache(columns.data,tables.data,databases.data,dictionaries.data,functions.data);
                                _DatabaseStructure.init(columns.data,tables.data,databases.data,dictionaries.data,functions.data);
                                return call(_DatabaseStructure);
                            });//functions
                        });//dictionaries
                    });//databases
                });//system.tables
            });//system.columns

            return ;

        };

        this.getHost = () => {
            return  (connection.host);
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

        this.makeSqlQuery = (sql,format) => {
            let query = '';


            if (format !== false) {
                format = (format || ' FoRmAt JSON');
                if (format == 'null') {
                    format = '';
                }
                query = sql + "\n\n" + format;
            } else {
                query = sql;
            }
            return query;
        };

        this.makeUrlRequest = (withDatabase,extend_settings) => {
            let url = "";
            let httpProto = '';
            if (!(connection.host.indexOf('://') > 0 || connection.host.indexOf('/') == 0)) {
                httpProto = 'http://';
            }
            // ClickHouse/dbms/src/Interpreters/Settings.h : https://github.com/yandex/ClickHouse/blob/master/dbms/src/Interpreters/Settings.h



            url = httpProto + connection.host ;

            url = url + '/?';

            if (!connection.rouser)
            {
                url = url + 'add_http_cors_header=1&log_queries=1&output_format_json_quote_64bit_integers=0&output_format_json_quote_denormals=1';
            }


            //max_block_size=1&send_progress_in_http_headers=1&http_headers_progress_interval_ms=500
            let BasicAuthorization=false;

            if (connection.baseauth)
            {
                // skip add user + password
            }
            else {

                if (connection.password)
                {
                    url += '&user='+encodeURIComponent(connection.login)+'&password='+encodeURIComponent(connection.password);
                }
                else
                {
                    url += '&user='+encodeURIComponent(connection.login);
                }
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
            return url;

        };
        this.fetchQuery = (sql,withDatabase,format,extend_settings) =>
        {

            let query=this.makeSqlQuery(sql,format);
            let url=this.makeUrlRequest(withDatabase,extend_settings);
            let myInit={
                mode: 'cors',
                method: 'post',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body : query
            };

            let myRequest = new Request(url, myInit);


            return fetch(myRequest)

                .then(function(response) {

                    let contentType = response.headers.get("content-type");

                    if (contentType && contentType.includes("application/json") && response.status >= 200 && response.status < 300) {
                        return Promise.resolve(response)
                    } else {
                        return response.text().then(Promise.reject.bind(Promise));
                    }
                })
                .then(function(response) {
                        return response.json();
                    },
                    function (responseBody) {
                        return Promise.reject(responseBody);
                    }
                );
                // ).catch(function(error)
                //     {
                //             console.error("fetchQuery",error);
                //     });
        };


        // ------------------------------------------------------------------------------------------------------------------------------------------------
        // @todo for send_progress_in_http_headers try https://github.com/sockjs/sockjs-client
        // Access-Control-Expose-Headers : X-ClickHouse-Progress
        // https://stackoverflow.com/questions/15042439/cant-get-custom-http-header-response-from-ajax-getallresponseheaders
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress
        // ClickHouse/dbms/src/IO/WriteBufferFromHTTPServerResponse.cpp
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
        // uploadEventHandlers: {
        //     progress: function (e) {
        //         console.log('uploadEventHandlers',e);
        //         if (e.lengthComputable) {
        //             // $scope.progressBar = (e.loaded / e.total) * 100;
        //             // $scope.progressCounter = $scope.progressBar;
        //         }
        //     }
        // },
        // transformResponse: (data, header, status) => {
        //     try {
        //         return angular.fromJson(data);
        //         // return JSON.parse(data);
        //     } catch (err) {
        //         console.error(err);
        //         return (data ? data : "\nStatus:" + status + "\nHeaders:" + angular.toJson(header()));
        //     }
        // }
        // ------------------------------------------------------------------------------------------------------------------------------------------------



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

            let query=this.makeSqlQuery(sql,format);
            let url=this.makeUrlRequest(withDatabase,extend_settings);
            let req=false;

            // console.info("Query",query);
            // console.info("URL",url);


            if (this.isTabixServer()) {
                // tabix server
                 req = this._tabixRequest({query:query},'query');
            } else {
                 req = {
                    method: 'POST',
                    data :query,
                    headers: {  'Content-Type': 'application/x-www-form-urlencoded'},
                    url: url,
                    cache: false,
                };

                if (connection.baseauth)
                {
                    req.headers['Authorization']='Basic ' + window.btoa(connection.login+":"+connection.password);
                }

            }
            console.info("SQL>",url,query,req);

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
