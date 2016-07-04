(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:header
	 * @description
	 */
	angular.module(smi2.app.name)
		.controller(smi2.app.controllers.header, [
			'$scope',
			'$state',
			smi2.app.services.api,
			function($scope, $state, api) {
                $scope.user = api.getConnectionInfo().name;

				/**
				 * Сброс настроек подключения БД
				 */
				$scope.logout = function () {
					api.clear();
					$state.go(smi2.app.states.login);
				};
			}
		]);
})(angular, smi2);
