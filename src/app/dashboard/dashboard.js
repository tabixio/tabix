(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:dashboard
	 * @description Контроллер dashboard страницы.
	 *
	 * Контроллер строит сетку dashboard либо показывает
	 * что у юзера нет ни одной площадки / кампании.
	 */
	angular.module(smi2.app.name)
		.controller(smi2.app.controllers.dashboard, [
			'$scope',
			'$rootScope',
			function($scope, $rootScope) {
				$rootScope.breadcrumbs = [{
					text: 'Рабочий стол',
					link: 'dashboard'
				}];

			}
		]);
})(angular, smi2);
