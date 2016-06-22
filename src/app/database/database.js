(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:database
	 * @description Контроллер страницы с 1 бд
	 */
	angular.module(smi2.app.name)
		.controller(smi2.app.controllers.database, [
			'$scope',
			'$rootScope',
            '$stateParams',
			smi2.app.services.api,
			function($scope, $rootScope, $stateParams, api) {
				$rootScope.breadcrumbs = [{
					text: 'База ' + $stateParams.dbName,
					link: smi2.app.states.database,
                    params: $stateParams
				}];

				$scope.vars = {
					tables: []
				};

				api.query('show tables from ' + $stateParams.dbName).then(function (data) {
                    $scope.vars.tables = data.data;
				});
			}
		]);
})(angular, smi2);
