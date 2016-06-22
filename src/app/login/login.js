(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:login
	 * @description Контроллер авторизации пользователей
	 */
	angular.module(smi2.app.name)
		.controller(smi2.app.controllers.login, [
			'$scope',
			'$state',
			'$timeout',
			smi2.app.services.userManager,
			function($scope, $state, $timeout, userManager) {

				// Переменные, доступные во view
				$scope.vars = {
					loading: false,
					loginError: false,
					user: {},
					year: (new Date()).getFullYear()
				};

				// Ставлю фокус сразу в поле логина
				$timeout(function () {
					angular.element('input[name="login"]').focus();
				}, 100);

				/**
				 * @ngdoc method
				 * @name login
				 * @description Отправка запроса авторизации
				 * @methodOf smi2.controller:login
				 */
				$scope.login = function () {
					$scope.vars.loading = true;
					$scope.vars.loginError = false;
					userManager.login($scope.vars.user).then(function () {
						$state.go(smi2.app.states.dashboard);
						//userManager.my().then(function (user) {
						//});
					}, function () {
						$scope.vars.loginError = true;
						$scope.vars.loading = false;
					});
				};

				/**
				 * Обработчик события нажатия клавиши
				 * в полях логина и пароля
				 * @param {object} event Данные события
				 */
				$scope.onKeypress = function (event) {
					$scope.vars.loginError = false;
					if (event.charCode == 13) {
						$scope.login();
					}
				};
			}
		]);
})(angular, smi2);
