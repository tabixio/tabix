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
			function($scope, $rootScope, localStorageService) {
                $scope.vars = {
					sql: '',
					sqlHistory: localStorageService.get('sqlHistory') || []
                };

				$rootScope.breadcrumbs = [{
					link: 'sql',
					text: 'SQL'
				}];

				$scope.run = function () {
					if ($scope.vars.sqlHistory.indexOf($scope.vars.sql) != -1) {
						return;
					}
					$scope.vars.sqlHistory.push($scope.vars.sql);
					if ($scope.vars.sqlHistory.length > 15) {
						$scope.vars.sqlHistory.shift();
					}
					localStorageService.set('sqlHistory', $scope.vars.sqlHistory);

					// RUN
				};
			}
		]);
})(angular, smi2);
