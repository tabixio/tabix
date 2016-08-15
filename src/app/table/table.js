(function(angular, smi2) {
	'use strict';

	angular.module(smi2.app.name).controller('TableController', TableController);
	TableController.$inject = ['$scope', '$rootScope', '$stateParams', 'API'];

	/**
	 * @ngdoc controller
	 * @name smi2.controller:TableController
	 * @description Контроллер страницы 1 таблицы БД
	 */
	function TableController($scope, $rootScope, $stateParams, API) {
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
})(angular, smi2);
