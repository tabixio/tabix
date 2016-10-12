(function(angular, smi2) {
	'use strict';

	angular.module(smi2.app.name).service('API', API);
	API.$inject = ['$http', '$q', 'localStorageService'];

	/**
	 * @ngdoc service
	 * @name smi2.service:API
	 * @description Менеджер API. Нужен для обмена данными с backend.
	 */
	function API($http, $q, localStorageService) {

		var CURRENT_BASE_KEY = 'currentBaseConfig';
		var database = null;
		var connection = {};

		// Первичная загрузка данных из LS
		var data = localStorageService.get(CURRENT_BASE_KEY);
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
		this.setConnection = function(db) {
			localStorageService.set(CURRENT_BASE_KEY, db);
			connection = db;
		};

		/**
		 * @ngdoc method
		 * @methodOf smi2.service:API
		 * @name clear
		 * @description Сброс авторизации
		 */
		this.clear = function() {
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
		this.query = function(sql, format, withDatabase,extend_settings) {
			var defer = $q.defer();
			var query = '';

			if (format !== false) {
				format = (format || ' FoRmAt JSON');
				if (format == 'null') {
					format = '';
				}
				query = sql + ' ' + format;
			} else {
				query = sql;
			}
			var url = 'http://' + connection.host +
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
				url += '&'+extend_settings;
			}

			var req = {
				method: (format?'GET':'POST'), // if not set format use POST
				url: url,
				transformResponse: function(data, header,status) {
					try {
						return angular.fromJson(data);
					} catch (err) {
						return (data?data:"\nStatus:"+status+"\nHeaders:"+angular.toJson(header()));
					}
				}
			};

			$http(req).then(function (response) {
				defer.resolve(response.data);
			}, function (response) {
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
		this.getConnectionInfo = function() {
			return connection;
		};

		/**
		 * @ngdoc method
		 * @methodOf smi2.service:API
		 * @name setDatabase
		 * @description Установка дефолтной БД
		 * @param {mixed} db Данные БД
		 */
		this.setDatabase = function(db) {
			database = db;
		};

		this.getDatabase = function () {
			return database;
		};

		/**
		 * @ngdoc method
		 * @methodOf smi2.service:API
		 * @name dataToHtml
		 * @description Преобразование JSON данных запроса в таблицу
		 * @param {mixed} data Объект, который содержит ответ БД
		 * @return {string} Строка HTML
		 */
		this.dataToHtml = function(data) {

			var html = '<table class="sql-table fs-body-1"><tr>';
			var keys = [];
			data.meta.forEach(function(cell) {
				html += '<th>' + cell.name + '<div class="fs-caption tc-grey-400">' + cell.type + '</div></th>';
				keys.push(cell.name);
			});
			data.data.forEach(function(row) {
				html += '<tr>';
				keys.forEach(function(key) {
					html += '<td>' + row[key] + '</td>';
				});
				html += '</tr>';
			});
			html += '</table>';
			return html;
		};


		this.dataToUIGrid = function (data) {

			var columnDefs=[];
			data.meta.forEach(function(cell) {
				columnDefs.push(
					//  pinnedLeft:true , width: 250, enablePinning:false ,pinnedRight:true
					{ field: cell.name, minWidth: 100, enableColumnResizing: true , headerTooltip: cell.type }
				);
			});

			return {
				enableSorting: true,
				enableFiltering: true,
				enableColumnResizing : true,
				columnDefs:columnDefs,
				enableGridMenu: true,
				enableSelectAll: true,
				showGridFooter: true,
				showColumnFooter: true,
				data:data.data,
			};
		};
	}
})(angular, smi2);
