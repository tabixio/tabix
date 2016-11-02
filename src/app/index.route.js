(function() {
	'use strict';

	angular
		.module(smi2.app.name)
		.config(function($stateProvider) {

			$stateProvider

			// Базовый роут для проверки авторизации
			.state('base', {
				abstract: true,
				resolve: {
					session: ['$q', 'API', function ($q, API) {
						var defer = $q.defer();
						if (angular.isDefined(API.getConnectionInfo().host)) {
							defer.resolve();
						} else {
							defer.reject('notAuthorized');
						}
						return defer.promise;
					}]
				},
				templateUrl: 'app/base/base.html'
			})

			// Роут для отрисовки дизайна
			.state('layout', {
				parent: 'base',
				abstract: true,
				views: {
					header: {
						templateUrl: 'app/base/header.html',
						controller: 'HeaderController'
					},
					sidebar: {
						templateUrl: 'app/base/sidebar.html',
						controller: 'SidebarController'
					},
					main: {
						template: '<ui-view/>'
					}
				}
			})

			// Главная страничка
			.state('dashboard', {
				parent: 'layout',
				url: '/',
				controller: ['$state', ($state) => ($state.go('sql'))]
			})

			// Логин
			.state('login', {
				url: '/login',
				templateUrl: 'app/login/login.html',
				controller: 'LoginController'
			})

			// SQL
			.state('sql', {
				parent: 'layout',
				url: '/sql',
				templateUrl: 'app/sql/sql.html',
				controller: 'SqlController'
			})

			// Одна база
			.state('database', {
				parent: 'layout',
				url: '/database/{dbName}',
				templateUrl: 'app/database/database.html',
				controller: 'DatabaseController'
			})

			// Одна таблица
			.state('table', {
				parent: 'database',
				url: '/table/{tableName}',
				templateUrl: 'app/table/table.html',
				controller: 'TableController'
			})

			// Просмотр данных
			.state('view', {
				parent: 'table',
				url: '/view',
				templateUrl: 'app/table/view/view.html',
				controller: 'ViewController'
			})

			// Потеряшки
			.state('404', {
				parent: 'layout',
				templateUrl: 'app/base/404.html'
			});
		});
})();
