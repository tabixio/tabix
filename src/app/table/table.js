(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:table
	 * @description Контроллер страницы 1 таблицы БД
	 */
	angular.module(smi2.app.name)
		.controller(smi2.app.controllers.table, [
			'$scope',
			'$rootScope',
            '$stateParams',
			smi2.app.services.api,
			function($scope, $rootScope, $stateParams, api) {
				$rootScope.breadcrumbs = [{
					text: 'База ' + $stateParams.dbName,
					link: smi2.app.states.database
				},{
					text: 'Таблица ' + $stateParams.tableName,
					link: smi2.app.states.table
				}];

                // $scope.$on('$destroy', function () {
                //     $rootScope.breadcrumbs = [{
    			// 		text: 'База ' + $stateParams.dbName,
    			// 		link: smi2.app.states.database
    			// 	}];
                // });

				$scope.vars = {
					data: {},
                    name: $stateParams.tableName
				};

				api.query('describe table ' + $stateParams.dbName + '.' +  $stateParams.tableName).then(function (data) {
                    $scope.vars.data = data;
				});
			}
		]);
})(angular, smi2);
