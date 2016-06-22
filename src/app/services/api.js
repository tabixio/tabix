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

                this.query = function (sql) {
                    var defer = $q.defer();
                    $http({
						method: 'POST',
						withCredentials: true,
						url: config.apiUrl + "/api/query",
						data: 'sql=' + encodeURIComponent(sql + ' format JSON'),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function (response) {
                        if (response.data.status == 'ok' && response.data.message) {
                            defer.resolve(angular.fromJson(response.data.message));
                        } else {
                            defer.reject('некорректный ответ backend');
                        }
					}, function (response) {
					    defer.reject(response.statusText);
					});

                    return defer.promise;
                };
			}
		]);
})(angular, smi2);
