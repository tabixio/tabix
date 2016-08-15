(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc service
	 * @name smi2.service:httpInterceptor
	 * @description
	 * Сервис первичной обработки HTTP запросов.
	 * Задачами сервиса являются:
	 * * переброс неавторизованного пользователя на логин;
	 * * добавление токена авторизации (Bearer) ко всем запросам
	 *
	 * Сервис является частью массива с $httpProvider.interceptors
	 * ```javascript
	 * // В angular.config
	 * $httpProvider.interceptors.push(smi2.app.services.HttpInterceptor);
	 * ```
	 */
	angular
		.module(smi2.app.name)
		.service('HttpInterceptor', [
			'$q',
            '$injector',
			function($q, $injector) {
				return {
                    /**
    				 * @ngdoc
    				 * @name responseError
    				 * @description
    				 * Метод-обертка, срабатыват перед передачей
    				 * HTTP ошибки в приложение
    				 * @param {mixed} rejection Данные HTTP ответа
                     * @methodOf smi2.service:httpInterceptor
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
		]);

})(angular, smi2);
