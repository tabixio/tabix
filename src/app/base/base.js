(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:root
	 * @description
	 * Контроллер приложения, находящийся в корневом state.
	 */
	angular.module(smi2.app.name)
		.controller(smi2.app.controllers.root, [
			'$scope',
			'$window',
			'$state',
			smi2.app.services.userManager,
			function($scope, $window, $state, userManager) {
				var self = this;

				/**
				 * @ngdoc method
				 * @name loadUser
				 * @description Загрузка пользователя
				 * @methodOf smi2.controller:root
				 */
				this.loadUser = function() {
					userManager.my().then(function(user) {
						self.user = user;
					});
				};

				if (!($state.current.data && $state.current.data.noLogin)) {
					self.loadUser();
				}


				/**
				 * @ngdoc method
				 * @name toggleMenu
				 * @description Сворачивание и разворачивание меню
				 * @methodOf smi2.controller:root
				 */
				this.toggleMenu = function(flag) {
					if ($window.innerWidth >= 768 && angular.isDefined(flag)) {
						return;
					}
					angular.element('body').toggleClass('mini-navbar', flag);
				};

				/**
				 * @ngdoc method
				 * @name logout
				 * @description Выход из системы
				 * @methodOf smi2.controller:root
				 */
				$scope.logout = function() {
					userManager.logout();
					$state.go(smi2.app.states.landing);
				};

				this.userName = "Соркин Борис";
			}
		]);
})(angular, smi2);
