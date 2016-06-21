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
	 * * *factories* - названия фабрик (в т.ч. моделей)
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
			dashboard: 'dashboardController'
		},
		services: {
			errorNotice: 'errorNotice',
			httpInterceptor: 'httpInterceptor',
			toolbar: 'toolbar',
			userManager: 'userManager'
		},
		factories: {
		},
		directives: {
			validator: 'drValidator'
		},
		messages: {
			notAuthorized: 'notAuthorized',
			errorNoticeFocusInput: 'errorNoticeFocusInput'
		},
		states: {
			base: 'base',
			switch: 'switch',
			login: 'login',
			dashboard: 'dashboard'
		}
	};

	// Подключение сторонних библиотек
	angular.module(smi2.app.name, [
		'ngAnimate',
		'ui.router',
//		'ngMessages',
		'lumx'
	]);

})();
