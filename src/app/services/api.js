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

        let CURRENT_BASE_KEY = 'currentBaseConfig';
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
            connection = db;
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

            if (format !== false) {
                format = (format || ' FoRmAt JSON');
                if (format == 'null') {
                    format = '';
                }
                query = sql + ' ' + format;
            } else {
                query = sql;
            }
            let url = 'http://' + connection.host +
                '/?query=' + encodeURIComponent(query);
            if (connection.login) {
                url += '&user=' + connection.login;
            }
            if (connection.password) {
                url += '&password=' + connection.password;
            }
            url += '&add_http_cors_header=1';
            if (withDatabase) {
                url += '&database=' + database;
            }
            if (extend_settings) {
                url += '&' + extend_settings;
            }
            // console.info(query);// Не удалять не только для DEBUG.
            // Бебебе удалил

            let req = {
                method: (format ? 'GET' : 'POST'), // if not set format use POST
                url: url,
                transformResponse: (data, header, status) => {
                    try {
                        return angular.fromJson(data);
                    } catch (err) {
                        return (data ? data : "\nStatus:" + status + "\nHeaders:" + angular.toJson(header()));
                    }
                }
            };

            $http(req).then((response) => {
                defer.resolve(response.data);
            }, (response) => {
                defer.reject(response.data);
            });

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


        this.dataToUIGrid = (data) => {

            let columnDefs = [];
            data.meta.forEach((cell) => {
                columnDefs.push(
                    //  pinnedLeft:true , width: 250, enablePinning:false ,pinnedRight:true
                    {field: cell.name, minWidth: 100, enableColumnResizing: true, headerTooltip: cell.type}
                );
            });

            return {
                enableSorting: true,
                enableFiltering: true,
                enableColumnResizing: true,
                columnDefs: columnDefs,
                enableGridMenu: true,
                enableSelectAll: true,
                showGridFooter: true,
                showColumnFooter: true,
                data: data.data
            };
        };
    }
})(angular, smi2);
