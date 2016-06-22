(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:dashboard
	 * @description Контроллер dashboard страницы
	 */
	angular.module(smi2.app.name)
		.controller(smi2.app.controllers.dashboard, [
			'$scope',
			'$rootScope',
			smi2.app.services.api,
			function($scope, $rootScope, api) {
				$rootScope.breadcrumbs = [{
					text: 'Рабочий стол',
					link: 'dashboard'
				}];

				$scope.vars = {
					databases: []
				};

				api.query('show databases').then(function (data) {
					$scope.vars.databases = data.data;
				});
			}
		]);
})(angular, smi2);
