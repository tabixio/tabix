((angular, smi2) => {
	'use strict';

	angular.module(smi2.app.name).controller('HeaderController', HeaderController);
	HeaderController.$inject = ['$scope', '$state', 'API', 'ThemeService','$mdDialog'];

	/**
	 * @ngdoc controller
	 * @name smi2.controller:HeaderController
	 * @description Controller for layout header
	 */
	function HeaderController($scope, $state, API, ThemeService,$mdDialog) {
		$scope.user = API.getConnectionInfo().name;
        $scope.themes = ThemeService.list;
        $scope.vars = {
            disable_exit: window.global_tabix_disable_exit,
        };


		/**
		 * Logout )
		 */
		$scope.help = (ev) => {

            function DialogController($scope, $mdDialog) {
                $scope.vars = {
                    version: smi2.app.version,
                    buildDate: smi2.app.buildDate,
                };

                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/base/helpDialogRu.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            });

        };
		$scope.logout = () => {
			API.clear();
			$state.go('login');
		};

        /**
         * Change UI theme
         * @param theme
         */
        $scope.setUiTheme = (theme) => {
            ThemeService.set(theme.name);
            window.location.reload();
        }
	}
})(angular, smi2);
