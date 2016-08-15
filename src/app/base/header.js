(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:header
	 * @description
	 */
	angular.module(smi2.app.name)
		.controller('HeaderController', [
			'$scope',
			'$state',
			'API',
			function($scope, $state, API) {
                $scope.user = API.getConnectionInfo().name;

				/**
				 * Сброс настроек подключения БД
				 */
				$scope.logout = function () {
					API.clear();
					$state.go('login');
				};
			}
		]);
})(angular, smi2);
