(function(angular, smi2) {
	'use strict';

	angular.module(smi2.app.name).controller('HeaderController', HeaderController);
	HeaderController.$inject = ['$scope', '$state', 'API', 'ThemeService'];

	/**
	 * @ngdoc controller
	 * @name smi2.controller:HeaderController
	 * @description Controller for layout header
	 */
	function HeaderController($scope, $state, API, ThemeService) {
		$scope.user = API.getConnectionInfo().name;
        $scope.themes = ThemeService.list;

		/**
		 * Logout )
		 */
		$scope.logout = function() {
			API.clear();
			$state.go('login');
		};

        /**
         * Change UI theme
         * @param theme
         */
		$scope.setUiTheme = (theme) => ThemeService.set(theme.name);
	}
})(angular, smi2);
