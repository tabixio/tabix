(function() {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:Run
	 * @description Main APP controller
	 */
	angular
		.module(smi2.app.name)
		.run([
			'$rootScope',
			'$state',
			function($rootScope, $state) {

				$rootScope.breadcrumbs = [];
				$rootScope.currentDatabase = null;

				// Провеярю в чем ошибка перехода на state
				var stateChangeErrorUnbind = $rootScope.$on('$stateChangeError', function(toState, toParams, fromState, fromParams, error, reason) {
					if (reason == 'notAuthorized') {
						$state.go('login');
					}
				});

				// Требование JSlinter'a (((
				$rootScope.$on('$destroy', function() {
					stateChangeErrorUnbind();
				});

			}
		]);
})();
