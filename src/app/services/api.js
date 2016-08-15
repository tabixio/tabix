(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc service
	 * @name smi2.service:api
	 * @description Менеджер API
	 */
	angular
		.module(smi2.app.name)
		.service('API', [
			'$http',
			'$q',
			'localStorageService',
			function($http, $q, localStorageService) {

				var CURRENT_BASE_KEY = 'currentBaseConfig';
				var database = null;
				var connection = {};
				var auth = '';

				// Первичная загрузка данных из LS
				var data = localStorageService.get(CURRENT_BASE_KEY);
				if (data && data.host) {
					connection = data;
					if (data.login) {
						auth = base64(data.login + ':' + data.password);
					}
				}

				/**
				 * Преобразование строки в base64
				 */
				function base64(data) {
					var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
					var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, enc = '';

					do {
						o1 = data.charCodeAt(i++);
						o2 = data.charCodeAt(i++);
						o3 = data.charCodeAt(i++);

						bits = o1 << 16 | o2 << 8 | o3;

						h1 = bits >> 18 & 0x3f;
						h2 = bits >> 12 & 0x3f;
						h3 = bits >> 6 & 0x3f;
						h4 = bits & 0x3f;

						enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
					} while (i < data.length);

					switch (data.length % 3) {
						case 1:
							enc = enc.slice(0, -2) + '==';
							break;
						case 2:
							enc = enc.slice(0, -1) + '=';
							break;
					}

					return enc;
				}

				/**
				 * Сохранение данных подключения в БД
				 */
				this.setDb = function(db) {
					localStorageService.set(CURRENT_BASE_KEY, db);
					connection = db;
					if (db.login) {
						auth = base64(db.login + ':' + db.password);
					}
				};

				/**
				 * Сброс данных
				 */
				this.clear = function () {
					database = null;
					connection = {};
					auth = '';
					localStorageService.set(CURRENT_BASE_KEY, {});
				};

				/**
				 * Запрос на выборку данных
				 */
				this.query = function(sql) {
					var defer = $q.defer();
					var data = 'sql=' + encodeURIComponent(sql + ' format JSON') +
						(auth === '' ? '' : '&auth=' + auth) +
						'&host=' + connection.host;
					if (database !== null) {
						data += '&database=' + database;
					}
					$http({
						method: 'POST',
						withCredentials: true,
						url: "/api/query",
						data: data,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(response) {
						if (response.data.status == 'ok' && response.data.message) {
							defer.resolve(angular.fromJson(response.data.message));
						} else {
							defer.reject('некорректный ответ backend');
						}
					}, function(response) {
						defer.reject((response.data && response.data.message || response.statusText).substr(0, 300));
					});

					return defer.promise;
				};

				/**
				 * Запрос данных без обработки
				 */
				this.queryRaw = function(sql, format) {
					var defer = $q.defer();
					var data = 'sql=' + encodeURIComponent(sql + ' ' + (format || 'format JSON')) +
						(auth === '' ? '' : '&auth=' + auth) +
						'&host=' + connection.host;
					if (database !== null) {
						data += '&database=' + database;
					}
					$http({
						method: 'POST',
						withCredentials: true,
						url: "/api/query",
						data: data,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(response) {
						if (response.data.status == 'ok' && response.data.message) {
							defer.resolve(response.data);
						} else {
							defer.reject('некорректный ответ backend');
						}
					}, function(response) {
						defer.reject((response.data && response.data.message || response.statusText).substr(0, 300));
					});

					return defer.promise;
				};

				/**
				 * Получение данных подключения
				 */
				this.getConnectionInfo = function () {
					return connection;
				};

				/**
				 * Установка дефолтной БД
				 */
				this.setDatabase = function(db) {
					database = db;
				};

				/**
				 * Прообразование JSON данных запроса в таблицу
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
			}
		]);
})(angular, smi2);
