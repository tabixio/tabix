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
					console.log(reason);
					if (reason == smi2.app.messages.notAuthorized) {
						$state.go(smi2.app.states.login);
					}
				});

				var stateChangeSuccessUnbind = $rootScope.$on('$stateChangeSuccess',
					function (event, toState, toParams, fromState, fromParams) {
						//$rootScope.breadcrumbs = [];
					}
				);

				// Требование JSlinter'a (((
				$rootScope.$on('$destroy', function() {
					stateChangeErrorUnbind();
					stateChangeSuccessUnbind();
				});

			}
		]);
})();
