(() => {
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
			'$http',
			($rootScope, $state,$http) => {

				$rootScope.breadcrumbs = [];
				$rootScope.currentDatabase = null;

				// Провеярю в чем ошибка перехода на state
				var stateChangeErrorUnbind = $rootScope.$on('$stateChangeError', (toState, toParams, fromState, fromParams, error, reason) => {
					if (reason == 'notAuthorized') {
						$state.go('login');
					}
				});

				// Требование JSlinter'a (((
				$rootScope.$on('$destroy', () => stateChangeErrorUnbind);

				$http.get('ch_completions_help.json')
					.then(function(res){
						window.global_chFunctionsHelp = res.data;
					});
			}
		]);
})();
