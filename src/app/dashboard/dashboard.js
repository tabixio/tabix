(function(angular, smi2) {
	'use strict';

	angular.module(smi2.app.name).controller('DashboardController', DashboardController);
	DashboardController.$inject = ['$scope', '$rootScope', 'API', '$filter'];

	/**
	 * @ngdoc controller
	 * @name smi2.controller:DashboardController
	 * @description Контроллер dashboard страницы
	 */
	function DashboardController($scope, $rootScope, API, $filter) {
		$rootScope.breadcrumbs = [{
			text: $filter('translate')('Рабочий стол'),
			link: 'dashboard'
		}];

		$scope.vars = {
			databases: []
		};

		API.query('show databases').then(function(data) {
			$scope.vars.databases = data.data;
		});
	}
})(angular, smi2);
