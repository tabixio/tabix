(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:table
	 * @description Контроллер страницы 1 таблицы БД
	 */
	angular.module(smi2.app.name)
		.controller('TableController', [
			'$scope',
			'$rootScope',
			'$stateParams',
			'API',
			function($scope, $rootScope, $stateParams, API) {
				$rootScope.breadcrumbs = [{
					text: 'База ' + $stateParams.dbName,
					link: 'database'
				}, {
					text: 'Таблица ' + $stateParams.tableName,
					link: 'table'
				}];

				$scope.vars = {
					data: {},
					name: $stateParams.tableName
				};

				API.query('describe table ' + $stateParams.dbName + '.' + $stateParams.tableName).then(function(data) {
					$scope.vars.data = data;
				});
			}
		]);
})(angular, smi2);
