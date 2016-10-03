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

			format = (format || ' format JSON');
			if (format=='null')  format='';


			var url = 'http://' + connection.host +
				'/?query=' + encodeURIComponent(sql + ' ' + format ) +
				'&user=' + connection.login +
				'&password=' + connection.password +
				'&add_http_cors_header=1';
			if (withDatabase) {
				url += '&database=' + database;
			}
			if (extend_settings)
			{
				url += '&'+extend_settings;

			}
			function appendTransform(defaults, transform) {

				// We can't guarantee that the default transformation is an array
				defaults = angular.isArray(defaults) ? defaults : [defaults];

				// Append the new transformation to the defaults
				return defaults.concat(transform);
			}

			var req = {
				method: 'GET',
				url: url,
				headers: {
					'Content-Type': undefined
				},
				transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
					return (value);
				})
			};

			if (format) {
				$http(req).then(function (response) {
					defer.resolve(response.data);
				}, function (response) {
					console.log("RPTT");
					console.log(response.data);
					defer.reject(response.data);
				});

			}
			else {
				$http.post(url).then(function (response) {
					defer.resolve(response.data);
				}, function (response) {
					defer.reject(response);
				});
			}
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

		/**
		 * @ngdoc method
		 * @methodOf smi2.service:API
		 * @name dataToHtml
		 * @description Преобразование JSON данных запроса в таблицу
		 * @param {mixed} data Объект, который содержит ответ БД
		 * @return {string} Строка HTML
		 */
		this.dataToHtml = function(data) {
			console.log(data);
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
	}
})(angular, smi2);
