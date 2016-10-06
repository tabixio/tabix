(function(angular, smi2) {
	'use strict';

	angular.module(smi2.app.name).controller('SqlController', SqlController);
	SqlController.$inject = ['$scope', '$rootScope', '$window', 'localStorageService', 'LxNotificationService','API'];

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
				sql: ' format JSON'
			}, {
				name: 'JSON',
				sql: ' format JSON'
			}, {
				name: 'JSON compact',
				sql: ' format JSONCompact'
			}, {
				name: 'CREATE/INSERT',
				sql: 'null'
			}],
			editor: null,
			statistics: null,
			limitRows: localStorageService.get('editorLimitRows') || 500,
			fontSize: localStorageService.get('editorFontSize') || 16,
			theme: localStorageService.get('editorTheme') || 'cobalt'
		};
		$scope.vars.format = $scope.vars.formats[0];
		$scope.vars.themes = [
			'ambiance',
			'eclipse', 'mono_industrial', 'tomorrow_night_blue',
			'chaos', 'github', 'monokai', 'tomorrow_night_bright',
			'chrome', 'idle_fingers', 'pastel_on_dark', 'tomorrow_night_eighties',
			'clouds', 'iplastic', 'solarized_dark', 'tomorrow_night',
			'clouds_midnight', 'katzenmilch', 'solarized_light', 'twilight',
			'cobalt', 'kr_theme', 'sqlserver', 'vibrant_ink',
			'crimson_editor', 'kuroir', 'terminal', 'xcode',
			'dawn', 'merbivore', 'textmate',
			'dreamweaver', 'merbivore_soft', 'tomorrow'
		];

		$rootScope.breadcrumbs = [{
			link: 'sql',
			text: 'SQL'
		}];
        //
		// // Предотвращаю потерю SQL данных при закрытии окна
		// $window.onbeforeunload = function(event) {
		// 	if ($scope.vars.sql !== '') {
		// 		var message = 'Хотите покинуть страницу?';
		// 		if (typeof event == 'undefined') {
		// 			event = window.event;
		// 		}
		// 		if (event) {
		// 			event.returnValue = message;
		// 		}
		// 		return message;
		// 	}
		// };
        //
        //
		// Предотвращаю потерю SQL данных при смене стейта
		var clearRouterListener = $scope.$on('$stateChangeStart', function(event) {
			var message = 'Хотите покинуть страницу?';
			if (!event.defaultPrevented && $scope.vars.sql !== '' && !confirm(message)) {
				event.preventDefault();
			}
		});

		// Деструктор контроллера
		$scope.$on('$destroy', function() {
			console.log('$destroy');
			clearRouterListener();
			$window.onbeforeunload = null;
		});

		/**
		 * @ngdoc method
		 * @methodOf smi2.controller:SqlController
		 * @name run
		 * @description Выполнение запроса
		 */
		$scope.run = function(typerun) {



			var sql=$scope.vars.sql;
			if (typerun=='select' || typerun=='auto')
			{
				// typerun=auto if Кастомный cmd+enter чтобы ранать Все/или выделенное


				// @todo : Повесить эвент и енайблить кнопку если выделенно To listen for an selection change: editor.getSession().selection.on('changeSelection', callback);
				var selectsql=$scope.vars.editor.getSelectedText();
				if (typerun==='auto' && !(selectsql === '' || selectsql === null)) {
					sql = selectsql;
				}
				if (!(selectsql === '' || selectsql === null)) {
					sql ='';
				}
			}

			console.log('SQL:'+sql);

			if (sql === '' || sql === null) {
				LxNotificationService.warning('Не введен SQL');
				return;
			}

			// много запросовый запрос
			// Если editor содержит TokenIteratorgetFunctions(editor,"name.tag") , т/е несколько строк разделенных черех ;;
			// TokenIteratorgetFunctions(editor,"name.tag")  - split ;;
			//

			console.log($scope.vars.editor.session.$mode.TokenIteratorgetFunctions($scope.vars.editor,"storage"));

			// Определяем через , указан ли формат запроса
			// $scope.vars.editor.TokenIteratorgetFunctions();// - FORMAT JSON ...


			// А можно забить и сделать через split (';;') , str_in_pos('FORMAT\s+')

			$scope.vars.sqlData = 'загрузка...';
			$scope.vars.statistics = null;

			var extendSettings='';
			if ($scope.vars.limitRows)
			{
				extendSettings+='max_result_rows='+$scope.vars.limitRows+'&result_overflow_mode=throw';
			}



			API.query(sql, $scope.vars.format.sql, true, extendSettings).then(function(data) {
				if ($scope.vars.format.name == $scope.vars.formats[0].name) {
					$scope.vars.sqlData = API.dataToHtml(angular.fromJson(data));
				} else {
					$scope.vars.sqlData = '<pre class="fs-caption">' + angular.toJson(data, true) + '</pre>';
				}
				$scope.vars.statistics = data.statistics;





				// В историю только успешные запросы, ошибки будут звсорять
				if ($scope.vars.sqlHistory.indexOf($scope.vars.sql) == -1) {
					$scope.vars.sqlHistory.push(sql);
					if ($scope.vars.sqlHistory.length > 25) {
						$scope.vars.sqlHistory.shift();
					}
					localStorageService.set('sqlHistory', $scope.vars.sqlHistory);
				}

			}, function(response) {
				LxNotificationService.error('Ошибка');

				$scope.vars.statistics = null;
				if (response.data){
					$scope.vars.sqlData = '<pre class="fs-caption tc-red-700">' + angular.toJson(response.data).replace(/\\n/gi, '<br/>').replace(/^"/, '').replace(/"$/, '') + '</pre>';
				}
				else
				{
					$scope.vars.sqlData = '<pre class="fs-caption tc-red-700">'+response+ '</pre>';
				}
			});
		};

		$scope.setTheme = function (theme) {
			$scope.vars.theme = theme;
			$scope.vars.editor.setTheme('ace/theme/' + theme);
			localStorageService.set('editorTheme', theme);
		};

		/**
		 * @ngdoc method
		 * @methodOf smi2.controller:SqlController
		 * @name aceSettings
		 * @description Показ настроек ACE
		 */
		$scope.aceSettings = function() {
			$scope.vars.editor.execCommand("showSettingsMenu");
		};

		$scope.aceLoaded = function(editor) {
			$scope.vars.editor = editor;
			editor.setOptions({
				fontSize: $scope.vars.fontSize + 'px'
			});
			editor.setTheme('ace/theme/' + $scope.vars.theme);

			// @todo:Кастомный cmd+enter чтобы ранать Все/или выделенное
			editor.commands.addCommand({
				name: 'myCommand',
				bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
				exec: function() {
					$scope.run('auto');
				}
			});
		};

		$scope.$watch('vars.limitRows', function(curr) {
			localStorageService.set('editorLimitRows', curr);
		});

		$scope.$watch('vars.fontSize', function(curr) {
			if (curr && $scope.vars.editor) {
				$scope.vars.editor.setOptions({
					fontSize: curr + 'px'
				});
				localStorageService.set('editorFontSize', curr);
			}
		});


		angular.element('#resizable').resizable({
			handles: 's'
		});
	}
})(angular, smi2);
