(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc service
	 * @name smi2.service:api
	 * @description Менеджер API
	 */
	angular
		.module(smi2.app.name)
		.service(smi2.app.services.api, [
			'$http',
			'$q',
			smi2.app.config,
			function($http, $q, config) {

				/**
				 * Запрос на выборку данных
				 */
				this.query = function(sql) {
					var defer = $q.defer();
					$http({
						method: 'POST',
						withCredentials: true,
						url: config.apiUrl + "/api/query",
						data: 'sql=' + encodeURIComponent(sql + ' format JSON'),
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
						defer.reject((response.data.message || response.statusText).substr(0, 300));
					});

					return defer.promise;
				};

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
