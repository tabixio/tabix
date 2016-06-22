(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:sql
	 * @description Контроллер выполнения SQL запросов к БД
	 */
	angular.module(smi2.app.name)
		.controller(smi2.app.controllers.sql, [
			'$scope',
			'$rootScope',
			'localStorageService',
			'LxNotificationService',
			smi2.app.services.api,
			function($scope, $rootScope, localStorageService, LxNotificationService, api) {
                $scope.vars = {
					sql: '',
					sqlHistory: localStorageService.get('sqlHistory') || [],
					sqlData: null
                };

				$rootScope.breadcrumbs = [{
					link: 'sql',
					text: 'SQL'
				}];

				$scope.run = function () {
					if ($scope.vars.sql === '' || $scope.vars.sql === null) {
						LxNotificationService.warning('Не введен SQL');
						return;
					}

					if ($scope.vars.sqlHistory.indexOf($scope.vars.sql) == -1) {
						$scope.vars.sqlHistory.push($scope.vars.sql);
						if ($scope.vars.sqlHistory.length > 15) {
							$scope.vars.sqlHistory.shift();
						}
						localStorageService.set('sqlHistory', $scope.vars.sqlHistory);
					}

					$scope.vars.sqlData = 'загрузка...';

					// RUN
					api.query($scope.vars.sql).then(function (data) {
						$scope.vars.sqlData = api.dataToHtml(data);
					}, function (response) {
						LxNotificationService.error('Ошибка ' + response);
						$scope.vars.sqlData = 'ошибка запроса';
					});
				};
			}
		]);
})(angular, smi2);
