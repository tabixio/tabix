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
					try {
						userManager.validate($scope.vars.user);
						$scope.vars.loading = true;
						userManager.login($scope.vars.user).then(function () {
							userManager.my().then(function (user) {
								$scope.test.user = user;
								if(!$scope.isUnitTest){
									$scope.$parent.root.loadUser();
								}
								$state.go(smi2.app.states.dashboard);
							});
						}, function () {
							$scope.vars.loading = false;
						});
					} catch (errors) {
						errorNotice.showValidateError(errors, $scope.loginForm, $scope.vars.user);
					}
				};

				/**
				 * Обработчик события нажатия клавиши
				 * в полях логина и пароля
				 * @param {object} event Данные события
				 */
				$scope.onKeypress = function (event) {
					if (event.charCode == 13) {
						$scope.login();
					}
				};
			}
		]);
})(angular, smi2);
