(function(angular, smi2) {
	'use strict';

	angular.module(smi2.app.name).controller('HeaderController', HeaderController);
	HeaderController.$inject = ['$scope', '$state', 'API'];

	/**
	 * @ngdoc controller
	 * @name smi2.controller:HeaderController
	 * @description Контроллер заголовка layout страницы
	 */
	function HeaderController($scope, $state, API) {
		$scope.user = API.getConnectionInfo().name;

		/**
		 * Сброс настроек подключения БД
		 */
		$scope.logout = function() {
			API.clear();
			$state.go('login');
		};
	}
})(angular, smi2);
