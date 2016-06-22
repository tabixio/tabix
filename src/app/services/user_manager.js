(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc service
	 * @name smi2.service:userManager
	 * @description Менеджер управления авторизацией
	 */
	angular
		.module(smi2.app.name)
		.service(smi2.app.services.userManager, [
			'$http',
			'$q',
			smi2.app.config,
			function($http, $q, config) {

				// Локальные параметры
				var currentUser = null;

				/**
				 * @ngdoc method
				 * @name login
				 * @description Авторизация на сервере
				 * @methodOf smi2.service:userManager
				 * @param {object} user Объект логин/пароль
				 */
				this.login = function(user) {

					var defer = $q.defer();

					// Отправка запроса авторизации на сервер
					$http({
						method: 'POST',
						withCredentials: true,
						url: config.apiUrl + "/api/login",
						data: 'login=' + user.login + '&password=' + user.password,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(response) {
						if (response.data.status == 'ok') {
							defer.resolve(response.data);
						} else {
							defer.reject(response.data);
						}
					}, function(reason) {
						defer.reject(reason);
					});

					return defer.promise;
				};


				/**
				 * @ngdoc method
				 * @name logout
				 * @description Выход пользователя из системы
				 * @methodOf smi2.service:userManager
				 */
				this.logout = function() {

					// Сбрасываю юзера
					currentUser = null;

					// Говорю серверу что выхожу
					return $http({
						method: 'POST',
						withCredentials: true,
						url: config.apiUrl + '/api/logout'
					});
				};

				/**
				 * @ngdoc method
				 * @name my
				 * @description
				 * Получение информации об текущем авторизованном пользователе
				 * @methodOf smi2.service:userManager
				 * @return {promise} Q/HTTP promise
				 */
				this.my = function() {

					// Если юзер уже есть - отдаю его
					if (currentUser) {
						var defer = $q.defer();
						defer.resolve(currentUser);
						return defer.promise;
					}

					// Отправка запроса авторизации на сервер
					return $http({
						method: 'POST',
						withCredentials: true,
						url: config.apiUrl + '/api/user'
					}).then(function(response) {
						currentUser = response.data;
						return currentUser;
					});
				};

				/**
				 * @ngdoc method
				 * @name checkSession
				 * @description
				 * Проверка сессии
				 * @methodOf smi2.service:userManager
				 * @return {promise} Q promise
				 */
				this.checkSession = function() {
					var defer = $q.defer();
					if (currentUser) {
						defer.resolve();
					} else {
						this.my().then(function() {
							defer.resolve();
						}, function() {
							defer.reject(smi2.app.messages.notAuthorized);
						});
					}

					return defer.promise;
				};
			}
		]);
})(angular, smi2);
