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
			'LxNotificationService',
			smi2.app.services.api,
			function($scope, $rootScope, localStorageService, LxNotificationService, api) {
                $scope.vars = {
					sql: '',
					sqlHistory: localStorageService.get('sqlHistory') || [],
					sqlData: null
                };

				$rootScope.breadcrumbs = [{
					link: 'sql',
					text: 'SQL'
				}];

				$scope.run = function () {
					if ($scope.vars.sql === '' || $scope.vars.sql === null) {
						LxNotificationService.warning('Не введен SQL');
						return;
					}

					if ($scope.vars.sqlHistory.indexOf($scope.vars.sql) == -1) {
						$scope.vars.sqlHistory.push($scope.vars.sql);
						if ($scope.vars.sqlHistory.length > 15) {
							$scope.vars.sqlHistory.shift();
						}
						localStorageService.set('sqlHistory', $scope.vars.sqlHistory);
					}

					$scope.vars.sqlData = 'загрузка...';

					// RUN
					api.query($scope.vars.sql).then(function (data) {
						var html = '<table class="sql-table fs-body-1"><tr>';
						var keys = [];
						data.meta.forEach(function (cell) {
							html += '<th>' + cell.name + '<div class="fs-caption tc-grey-400">' + cell.type + '</div></th>';
							keys.push(cell.name);
						});
						data.data.forEach(function (row) {
							html += '<tr>';
							keys.forEach(function (key) {
								html += '<td>' + row[key] + '</td>';
							});
							html += '</tr>';
						});
						html += '</table>';
						$scope.vars.sqlData = html;
					}, function (response) {
						LxNotificationService.error('Ошибка ' + response);
					});
				};
			}
		]);
})(angular, smi2);
