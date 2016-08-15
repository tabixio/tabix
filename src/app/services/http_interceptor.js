(function(angular, smi2) {
	'use strict';

	angular.module(smi2.app.name).service('HttpInterceptor', HttpInterceptor);
	HttpInterceptor.$inject = ['$q', '$injector'];

	/**
	 * @ngdoc service
	 * @name smi2.service:HttpInterceptor
	 * @description
	 * Сервис первичной обработки HTTP запросов.
	 * Задачами сервиса являются:
	 * * переброс неавторизованного пользователя на логин;
	 * * добавление токена авторизации (Bearer) ко всем запросам
	 *
	 * Сервис является частью массива с $httpProvider.interceptors
	 * ```javascript
	 * // В angular.config()
	 * $httpProvider.interceptors.push('HttpInterceptor');
	 * ```
	 */
	function HttpInterceptor($q, $injector) {
		return {
			/**
			 * @ngdoc
			 * @name responseError
			 * @description
			 * Метод-обертка, срабатывает перед передачей
			 * HTTP ошибки в приложение
			 * @param {mixed} rejection Данные HTTP ответа
			 * @methodOf smi2.service:HttpInterceptor
			 * @return {promise} $q promise
			 */
			responseError: function(rejection) {

				// Не авторизован? - веду пользователя на страницу авторизации
				if (rejection.status == 401) {
					$injector.get('$state').go('login');
				}
				return $q.reject(rejection);
			}
		};
	}
})(angular, smi2);
