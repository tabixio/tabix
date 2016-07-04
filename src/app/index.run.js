(function() {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:run
	 * @description Первый контроллер приложения
	 */
	angular
		.module(smi2.app.name)
		.run([
			'$rootScope',
			'$state',
			function($rootScope, $state) {

				$rootScope.breadcrumbs = [];

				// Провеярю в чем ошибка перехода на state
				var stateChangeErrorUnbind = $rootScope.$on('$stateChangeError', function(toState, toParams, fromState, fromParams, error, reason) {
					if (reason == smi2.app.messages.notAuthorized) {
						$state.go(smi2.app.states.login);
					}
				});

				// Требование JSlinter'a (((
				$rootScope.$on('$destroy', function() {
					stateChangeErrorUnbind();
				});

			}
		]);
})();
