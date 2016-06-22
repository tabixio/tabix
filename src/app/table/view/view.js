(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:view
	 * @description Контроллер просмотра данных 1 таблицы БД
	 */
	angular.module(smi2.app.name)
		.controller(smi2.app.controllers.view, [
			'$scope',
			'$rootScope',
            '$stateParams',
            'LxNotificationService',
			smi2.app.services.api,
			function($scope, $rootScope, $stateParams, LxNotificationService, api) {

				$rootScope.breadcrumbs = [{
					text: 'База ' + $stateParams.dbName,
					link: smi2.app.states.database
				}, {
					text: 'Таблица ' + $stateParams.tableName,
					link: smi2.app.states.table
				}, {
					text: 'Просмотр',
					link: smi2.app.states.view
				}];

                // $scope.$on('$destroy', function () {
                //     $rootScope.breadcrumbs = [{
				// 		text: 'База ' + $stateParams.dbName,
    			// 		link: smi2.app.states.database
    			// 	}, {
				// 		text: 'Таблица ' + $stateParams.tableName,
				// 		link: smi2.app.states.table
				// 	}];
                // });

				$scope.vars = {
                    data: null,
                    limit: 100,
                    offset: 0
				};

                $scope.load = function () {
                    $scope.vars.data = -1;
                    api.query('select * from ' + $stateParams.dbName + '.' + $stateParams.tableName + ' limit ' + $scope.vars.offset + ', ' + $scope.vars.limit).then(function (data) {
                        $scope.vars.data = api.dataToHtml(data);
                    }, function (response) {
                        LxNotificationService.error('Ошибка ' + response);
                    });
                };

                $scope.loadNext = function () {
                    $scope.vars.offset += $scope.vars.limit;
                    $scope.load();
                };

                $scope.loadPrev = function () {
                    if ($scope.vars.offset > 0) {
                        $scope.vars.offset -= $scope.vars.limit;
                        $scope.load();
                    }
                };

                $scope.load();
			}
		]);
})(angular, smi2);
