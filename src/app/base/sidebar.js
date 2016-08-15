(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:sidebar
	 * @description Контроллер бокового меню
	 */
	angular.module(smi2.app.name)
		.controller('SidebarController', [
			'$scope',
			'API',
			function($scope, API) {
				$scope.vars = {
					databases: [],
					selectedDatabase: null,
					tables: []
				};

				$scope.changeDatabase = function(database) {
					$scope.vars.selectedDatabase = database;
					API.setDatabase(database.name);
					API.query('show tables from ' + database.name).then(function(data) {
						$scope.vars.tables = data.data;
					});
				};

				API.query('show databases').then(function(data) {
					$scope.vars.databases = data.data;
					$scope.changeDatabase(data.data[0]);
				});
			}
		]);
})(angular, smi2);
