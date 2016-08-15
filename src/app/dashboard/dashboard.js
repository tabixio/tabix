(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:dashboard
	 * @description Контроллер dashboard страницы
	 */
	angular.module(smi2.app.name)
		.controller('DashboardController', [
			'$scope',
			'$rootScope',
			'API',
			function($scope, $rootScope, API) {
				$rootScope.breadcrumbs = [{
					text: 'Рабочий стол',
					link: 'dashboard'
				}];

				$scope.vars = {
					databases: []
				};

				API.query('show databases').then(function (data) {
					$scope.vars.databases = data.data;
				});
			}
		]);
})(angular, smi2);
