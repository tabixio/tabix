(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:sidebar
	 * @description Контроллер бокового меню
	 */
	angular.module(smi2.app.name)
		.controller(smi2.app.controllers.sidebar, [
			'$scope',
			smi2.app.services.api,
			function($scope, api) {
				$scope.vars = {
					databases: [],
					selectedDatabase: null,
					tables: []
				};

				$scope.changeDatabase = function(database) {
					$scope.vars.selectedDatabase = database;
					api.setDatabase(database.name);
					api.query('show tables from ' + database.name).then(function(data) {
						$scope.vars.tables = data.data;
					});
				};

				api.query('show databases').then(function(data) {
					console.log(data);
					$scope.vars.databases = data.data;
					$scope.changeDatabase(data.data[0]);
				});
			}
		]);
})(angular, smi2);
