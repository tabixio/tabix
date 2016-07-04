(function() {
	'use strict';

	var smi2 = window.smi2 = window.smi2 || {};

	/**
	 * @ngdoc object
	 * @name smi2.object:app
	 * @description Справочник всех элементов приложения
	 *
	 * Все названия вынесены в справочники, чтобы в любых местах приложения
	 * можно было писать в DI, например *smi2.app.controllers.help*
	 *
	 * * *controllers* - названия контроллеров
	 * * *services* - названия сервисов (в т.ч. менеджеров моделей)
	 * * *directives* - названия директив
	 * * *messages* - справочник сообщений
	 * * *states* - названия состояний ui-router
	 */
	smi2.app = {
		name: 'SMI2',
		config: 'config',
		controllers: {
			root: 'rootController',
			login: 'loginController',
			dashboard: 'dashboardController',
			database: 'databaseController',
			table: 'tableController',
			header: 'headerController',
			view: 'viewController',
			sql: 'sqlController',
			sidebar: 'sidebarController'
		},
		services: {
			errorNotice: 'errorNotice',
			httpInterceptor: 'httpInterceptor',
			toolbar: 'toolbar',
			api: 'api'
		},
		messages: {
			notAuthorized: 'notAuthorized'
		},
		states: {
			base: 'base',
			layout: 'layout',
			switch: 'switch',
			login: 'login',
			logout: 'logout',
			dashboard: 'dashboard',
			database: 'database',
			table: 'table',
			view: 'view',
			sql: 'sql'
		}
	};

	// Подключение сторонних библиотек
	angular.module(smi2.app.name, [
		'ngAnimate',
		'ui.router',
		'LocalStorageModule',
		'lumx',
		'ui.ace'
	]);

})();
