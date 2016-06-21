(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc service
	 * @name smi2.service:userManager
	 * @description Менеджер модели User
	 *
	 * Формат оформления сервисов {@link smi2.factory:baseManager `smi2.factories.baseManager`}
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
				 * @param {object} model Модель {@link smi2.factory:user 'User'}, в которой установлены логин/пароль
				 */
				this.login = function(model) {

					var defer = $q.defer();

					// Послыка на сервер
					var data = {
						grant_type: 'password',
						username: model.username,
						password: model.password,
						client_id: config.clientId
					};

					// Приведение object->string "key=val&..."
					data = Object.keys(data).map(function(key) {
						return key + '=' + encodeURIComponent(data[key]);
					}).join('&');

					// Отправка запроса авторизации на сервер
					$http({
						method: 'POST',
						url: config.apiUrl + config.authUrl.login,
						data: data,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(response) {
						if (response.data.access_token) {
							//manager.setToken(response.data.access_token);
						} else {
							//console.error('No access token in ', response.data);
						}
						defer.resolve(response.data);
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

					// Приходится добавлять токен тут,
					// поскольку в interceptor уже будет пусто
					$http({
						method: 'DELETE',
						url: config.apiUrl + config.authUrl.logout,
						headers: {
							Authorization: 'Bearer ' + token
						}
					});

					// Сбрасываю юзера
					//manager.setToken(null);
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
						method: 'GET',
						url: config.apiUrl
					}).then(function(response) {
						currentUser = new user(response.data);
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
						manager.my().then(function() {
							defer.resolve();
						}, function() {
							defer.reject(smi2.app.messages.notAuthorized);
						});
					} else {
						defer.reject(smi2.app.messages.notAuthorized);
					}

					return defer.promise;
				};
			}
		]);
})(angular, smi2);
