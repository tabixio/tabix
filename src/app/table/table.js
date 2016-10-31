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
			text: $stateParams.dbName,
			link: 'database'
		}, {
			text: $stateParams.tableName,
			link: 'table'
		}];

		$scope.vars = {
			columns: {},
			name: $stateParams.tableName,
			data: null,
            grid: null,
            limit: 100,
            offset: 0,
			statistics: {}
		};

		/**
		 * Запрос полей таблицы
		 */
		API.query('describe table ' + $stateParams.dbName + '.' + $stateParams.tableName).then(function(data) {
			$scope.vars.columns = data;
		});

		/**
		 * Запрос статистики по таблице
		 */
		API.query(
			'SELECT ' +
			'	table, ' +
			'	formatReadableSize(sum(bytes)) as size, ' +
			'	sum(bytes) as sizeBytes, ' +
			'	min(min_date) as minDate, ' +
			'	max(max_date) as maxDate ' +
			'FROM  ' +
			'	system.parts ' +
			'WHERE ' +
			'	database = \'' + $stateParams.dbName  + '\' AND ' +
			'	( ' +
			'		table = \'' + $stateParams.tableName  + '\' OR ' +
			'		table = \'' + $stateParams.tableName  + '_sharded\'' +
			'    ) ' +
			'GROUP BY ' +
			'    table '
		).then(function (response) {
			$scope.vars.statistics = (response && response.data.length && response.data[0]) || {};
		});

		/**
		 * Загрузка данных
		 */
		$scope.load = function () {
            $scope.vars.data = -1;
            API.query('select * from ' + $stateParams.dbName + '.' + $stateParams.tableName + ' limit ' + $scope.vars.offset + ', ' + $scope.vars.limit).then(function (data) {
                $scope.vars.data = API.dataToHtml(data);
            }, function (response) {
                LxNotificationService.error('Ошибка ' + response);
            });
        };

		/**
		 * Шаг вперед по данным
		 */
        $scope.loadNext = function () {
            $scope.vars.offset += $scope.vars.limit;
            $scope.load();
        };

		/**
		 * Шаг назад по данным
		 */
        $scope.loadPrev = function () {
            if ($scope.vars.offset > 0) {
                $scope.vars.offset -= $scope.vars.limit;
                $scope.load();
            }
        };

        $scope.load();
	}
})(angular, smi2);
