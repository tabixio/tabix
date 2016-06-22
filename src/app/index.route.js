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
				url: ''
			})

			.state(smi2.app.states.layout, {
				parent: smi2.app.states.base,
				abstract: true,
				views: {
					header: {
						templateUrl: 'app/base/header.html',
						controller: smi2.app.controllers.header
					},
					sidebar: {
						templateUrl: 'app/base/sidebar.html',
					},
					breadcrumb: {
						templateUrl: 'app/base/breadcrumbs.html'
					},
					main: {
						template: '<ui-view/>'
					}
				}
			})

			.state(smi2.app.states.dashboard, {
				parent: smi2.app.states.layout,
				url: '/dashboard',
				templateUrl: 'app/dashboard/dashboard.html',
				controller: smi2.app.controllers.dashboard
			})

			// Логин
			.state(smi2.app.states.login, {
				url: '/login',
				templateUrl: 'app/login/login.html',
				controller: smi2.app.controllers.login
			})

			// Логин
			.state(smi2.app.states.logout, {
				url: '/logout',
				controller: ['$state', smi2.app.services.userManager, function ($state, userManager) {
					userManager.logout();
					$state.go(smi2.app.states.login);
				}]
			})

			// SQL
			.state(smi2.app.states.sql, {
				parent: smi2.app.states.layout,
				url: '/sql',
				templateUrl: 'app/sql/sql.html',
				controller: smi2.app.controllers.sql
			})

			// одна база
			.state(smi2.app.states.database, {
				parent: smi2.app.states.layout,
				url: '/database/{name}',
				templateUrl: 'app/database/database.html',
				controller: smi2.app.controllers.database
			})

			// not found
			.state('404', {
				parent: smi2.app.states.base,
				templateUrl: 'app/base/404.html'
			});
		});
})();
