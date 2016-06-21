(function() {
	'use strict';

	angular
		.module(smi2.app.name)
		.config(function($stateProvider) {

			$stateProvider

			.state(smi2.app.states.base, {
				abstract: true,
				resolve: {
					session: [
						smi2.app.services.userManager,
						function (userManager) {
							return userManager.checkSession();
					}]
				},
				templateUrl: 'app/base/base.html'
			})

			.state(smi2.app.states.switch, {
				parent: smi2.app.states.base,
				url: '',
				controller: function () {
					console.log('!!!!!!');
				}
			})

			.state(smi2.app.states.dashboard, {
				parent: smi2.app.states.base,
				url: '/dashboard',
				templateUrl: 'app/dashboard/dashboard.html',
				controller: smi2.app.controllers.dashboard
			})

			// Логин
			.state(smi2.app.states.login, {
				url: '/login',
				templateUrl: 'app/login/login.html',
				controller: smi2.app.controllers.login,
				data:{
					noLogin:true
				}
			})

			// not found
			.state('404', {
				parent: smi2.app.states.base,
				templateUrl: 'app/root/404.html'
			});

		});
})();
