
// @todo : костылик , не получилось сделать http://stackoverflow.com/questions/22166784/dynamically-update-syntax-highlighting-mode-rules-for-the-ace-editor
global_keywords_fields='bazbaz|pipi';
global_keywords_tables="";

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
			button_run: 'Выполнить ⌘ + ⏎',
			sqlHistory: localStorageService.get('sqlHistory') || [],
			format: {},
			results: [],
			formats: [{
				name: 'Таблица',
				sql: ' format JSON'
			}, {
				name: 'Авто',
				sql: ' auto'
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
			db: null,
			editor: null,
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
		$scope.execute_query = function(sql,numquery,_format,_keyword){
			console.log('execute:'+numquery+' : '+_keyword+"\n"+sql);

			// содержит дополнительные GET параметры для выполнения запрос
			var extendSettings='';
			// если указан limitRows
			if ($scope.vars.limitRows)
			{
				extendSettings+='max_result_rows='+$scope.vars.limitRows+'&result_overflow_mode=throw';
			}

			var statistics=null;
			var sqlData=null;
			var format=' FORMAT JSON';

			if (_format) format='null';
			if (_keyword!=='select') format='null';

			API.query(sql, format ,true, extendSettings).then(function(data) {
				statistics = data.statistics;
				if ($scope.vars.format.name == $scope.vars.formats[0].name) {
					sqlData = API.dataToHtml(angular.fromJson(data));
				}
				else
				{
					sqlData = '<pre class="fs-caption">' + angular.toJson(data, true) + '</pre>';
				}
				$scope.vars.results[numquery]={statistics:statistics,sqlData:sqlData};
			}, function(response) {
				LxNotificationService.error('Ошибка');
				statistics = null;
				if (response.data){
					sqlData = '<pre class="fs-caption tc-red-700">' + angular.toJson(response.data).replace(/\\n/gi, '<br/>').replace(/^"/, '').replace(/"$/, '') + '</pre>';
				}
				else
				{
					sqlData = '<pre class="fs-caption tc-red-700">'+response+ '</pre>';
				}
				$scope.vars.results[numquery]={statistics:statistics,sqlData:sqlData};
			});
		};

		/**
		 * @ngdoc method
		 * @methodOf smi2.controller:SqlController
		 * @name run
		 * @description Выполнение запроса
		 */
		$scope.run = function(){


			var sql=$scope.vars.sql;

			// получаем выделенный текст, и если выделено - ранаем выделение
			var selectsql=$scope.vars.editor.getSelectedText();
			if (!(selectsql === '' || selectsql === null)) {
				sql = selectsql;
			}

			if (sql === '' || sql === null) {
				LxNotificationService.warning('Не введен SQL');
				return;
			}


			var sql_list=$scope.vars.editor.session.$mode.splitByTokens(sql,'constant.character.escape',';;');

			$scope.vars.results=[];
			var numquery=0;
			sql_list.forEach(function(q)
			{

				var _format=null;
				var _keyword=null;
				var set_format=$scope.vars.editor.session.$mode.findTokens(sql,"storage",true);
				var keyword=$scope.vars.editor.session.$mode.findTokens(sql,"keyword",true);

				if (set_format.hasOwnProperty('value'))
				{
					_format=set_format.value;
				}
				if (keyword.hasOwnProperty('value'))
				{
					_keyword=keyword.value;
				}
				$scope.vars.results.push({statistics:null,sqlData:null,query:q});
				$scope.execute_query(q,numquery,_format,_keyword);
				numquery++;
			});//forEach

			// В историю только успешные запросы, ошибки будут засорять
			if ($scope.vars.sqlHistory.indexOf($scope.vars.sql) == -1) {
				$scope.vars.sqlHistory.push(sql);
				if ($scope.vars.sqlHistory.length > 25) {
					$scope.vars.sqlHistory.shift();
				}
				localStorageService.set('sqlHistory', $scope.vars.sqlHistory);
			}
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


		$scope.selectDatabase = function(db) {
			$scope.vars.db=db;

			API.query("SELECT table,name,type FROM system.columns WHERE database=\'"+db+"\'", $scope.vars.format.sql, true).then(function(data) {

				var fields=[],ufields = {};
				var tables=[],utables = {};
				var keys = [];
				data.meta.forEach(function(cell) {
					keys.push(cell.name);
				});
				data.data.forEach(function(row) {
					keys.forEach(function(key) {

						if (key=='table')
						{
							if(!utables.hasOwnProperty(row[key])) { utables[row[key]] = 1; tables.push(row[key]); }
						}
						if (key=='name')
						{
							if(!ufields.hasOwnProperty(row[key])) { ufields[row[key]] = 1; fields.push(row[key]); }
						}
					});
				});

				global_keywords_fields=fields.join('|')+'|';
				global_keywords_tables=tables.join('|')+'|'+db;
					// reload highlights
				$scope.vars.editor.session.setMode({
					path: "ace/mode/clickhouse",
					v: Date.now()
				});
				$scope.vars.editor.session.bgTokenizer.start(0); // force rehighlight whole document

			});

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
					$scope.run();
				}
			});

			$scope.vars.editor.clearSelection();
			$scope.vars.sql=$scope.vars.sqlHistory[0]; // последний удачный запрос
			// $scope.vars.sql="SELECT 'ABC' as a where a=';;'\n;;\nselect 'll' as ping\n;;\nselect 3 as ping;;select ';;' as ping where ping=';;'";
			// $scope.vars.sql="SELECT 'ABC' as a where a='xx' FORMAT JSON\n;;";

			// @todo : Повесить эвент и переиминовывать кнопку -"Выполнить"
			// если выделенно To listen for an selection change:
			editor.on('changeSelection', function () {

				if (editor.getSelectedText())
				{
					$scope.vars.button_run='Выполнить выделенное ⌘ + ⏎';
				}
				else
				{
					$scope.vars.button_run= 'Выполнить ⌘ + ⏎';
				}
				document.getElementById('sql_button').innerHTML = $scope.vars.button_run;
			});
			editor.focus();
			editor.selection.moveTo(0, 0);
			// наблюдаем за изменением в выбор базы данных
			var scope = angular.element($("[ng-app=sidebar]")).scope();
			if (scope) {
				scope.$watch('vars.selectedDatabase.name', function(curr) {
					if (!angular.isUndefined(curr)) {
						$scope.selectDatabase(curr);
					}
				});
			}
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
