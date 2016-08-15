(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:database
	 * @description Контроллер страницы с 1 бд
	 */
	angular.module(smi2.app.name)
		.controller('DatabaseController', [
			'$scope',
			'$rootScope',
            '$stateParams',
			'API',
			function($scope, $rootScope, $stateParams, API) {
				$rootScope.breadcrumbs = [{
					text: 'База ' + $stateParams.dbName,
					link: 'database',
                    params: $stateParams
				}];

				$scope.vars = {
					tables: []
				};

				API.query('show tables from ' + $stateParams.dbName).then(function (data) {
                    $scope.vars.tables = data.data;
				});
			}
		]);
})(angular, smi2);
