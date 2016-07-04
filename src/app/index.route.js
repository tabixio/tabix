(function() {
	'use strict';

	angular
		.module(smi2.app.name)
		.config(function($stateProvider) {

			$stateProvider

			.state(smi2.app.states.base, {
				abstract: true,
				resolve: {
					session: ['$q', smi2.app.services.api, function ($q, api) {
						var defer = $q.defer();
						if (angular.isDefined(api.getConnectionInfo().login)) {
							defer.resolve();
						} else {
							defer.reject(smi2.app.messages.notAuthorized);
						}
						return defer.promise;
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
						controller: smi2.app.controllers.sidebar
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
				url: '/database/{dbName}',
				templateUrl: 'app/database/database.html',
				controller: smi2.app.controllers.database
			})

			// Одна таблица
			.state(smi2.app.states.table, {
				parent: smi2.app.states.database,
				url: '/table/{tableName}',
				templateUrl: 'app/table/table.html',
				controller: smi2.app.controllers.table
			})

			// Просмотр данных
			.state(smi2.app.states.view, {
				parent: smi2.app.states.table,
				url: '/view',
				templateUrl: 'app/table/view/view.html',
				controller: smi2.app.controllers.view
			})

			// not found
			.state('404', {
				parent: smi2.app.states.base,
				templateUrl: 'app/base/404.html'
			});
		});
})();
