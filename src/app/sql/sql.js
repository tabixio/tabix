(function(angular, smi2) {
	'use strict';

	angular.module(smi2.app.name).controller('SqlController', SqlController);
	SqlController.$inject = ['$scope', '$rootScope', '$window', 'localStorageService', 'LxNotificationService', 'API'];

	/**
	 * @ngdoc controller
	 * @name smi2.controller:SqlController
	 * @description Контроллер выполнения SQL запросов к БД
	 */
	function SqlController($scope, $rootScope, $window, localStorageService, LxNotificationService, API) {

		$scope.vars = {
			sql: '',
			sqlHistory: localStorageService.get('sqlHistory') || [],
			sqlData: null,
			format: {},
			formats: [{
				name: 'Таблица',
				sql: 'format JSON'
			}, {
				name: 'JSON',
				sql: 'format JSON'
			}, {
				name: 'JSON compact',
				sql: 'format JSONCompact'
			}]
		};
		$scope.vars.format = $scope.vars.formats[0];

		$rootScope.breadcrumbs = [{
			link: 'sql',
			text: 'SQL'
		}];

		// Предотвращаю потерю SQL данных при закрытии окна
		$window.onbeforeunload = function(event) {
			if ($scope.vars.sql !== '') {
				var message = 'Хотите покинуть страницу?';
				if (typeof event == 'undefined') {
					event = window.event;
				}
				if (event) {
					event.returnValue = message;
				}
				return message;
			}
		};

		// Предотвращаю потерю SQL данных при смене стейта
		$scope.$on('$locationChangeStart', function(event) {
			var message = 'Хотите покинуть страницу?';
			if (!event.defaultPrevented && $scope.vars.sql !== '' && !confirm(message)) {
				event.preventDefault();
			}
		});

		/**
		 * @ngdoc method
		 * @methodOf smi2.controller:SqlController
		 * @name run
		 * @description Выполнение запроса
		 */
		$scope.run = function() {
			if ($scope.vars.sql === '' || $scope.vars.sql === null) {
				LxNotificationService.warning('Не введен SQL');
				return;
			}

			if ($scope.vars.sqlHistory.indexOf($scope.vars.sql) == -1) {
				$scope.vars.sqlHistory.push($scope.vars.sql);
				if ($scope.vars.sqlHistory.length > 15) {
					$scope.vars.sqlHistory.shift();
				}
				localStorageService.set('sqlHistory', $scope.vars.sqlHistory);
			}

			$scope.vars.sqlData = 'загрузка...';

			API.queryRaw($scope.vars.sql, $scope.vars.format.sql).then(function(data) {
				if ($scope.vars.format.name == $scope.vars.formats[0].name) {
					$scope.vars.sqlData = API.dataToHtml(angular.fromJson(data.message));
				} else {
					$scope.vars.sqlData = '<pre class="fs-body-2">' + data.message + '</pre>';
				}
			}, function(response) {
				LxNotificationService.error('Ошибка ' + response);
				$scope.vars.sqlData = 'ошибка запроса';
			});
		};

		angular.element('#resizable').resizable({
			handles: 's'
		});
	}
})(angular, smi2);
