(function(angular, smi2) {
	'use strict';

	angular.module(smi2.app.name)

	/**
	 * Настройки системы
	 */
	.constant(smi2.app.config, {

		// URL API сервера, без слеша в конце
		apiUrl: location.hostname == 'localhost' ? 'http://clickhouse' : 'http://<input value>',

	})

	/**
	 * Начальная инициализация провайдеров SPA приложения
	 */
	.config([
		'$locationProvider',
		'$httpProvider',
		'$sceProvider',
		'$urlRouterProvider',
		smi2.app.config,
		function($locationProvider, $httpProvider, $sceProvider, $urlRouterProvider, config) {

			// Запуск HTML5 режима HISTORY API, без решетки
			$locationProvider.html5Mode(true).hashPrefix('!');

			// Добавление токена к HTTP сообщениям, проверка авторизации
			$httpProvider.interceptors.push(smi2.app.services.httpInterceptor);

			// разрешаю ng-bind-html
			$sceProvider.enabled(false);

			//default state
			$urlRouterProvider.otherwise(function($injector) {
				var $state = $injector.get("$state");
				$state.transitionTo('404');
			});
		}
	]);
})(angular, smi2);
