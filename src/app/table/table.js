( function ( angular, smi2 ) {
	'use strict';

	angular.module( smi2.app.name ).controller( 'TableController', TableController );
	TableController.$inject = [ '$scope', '$rootScope', 'API', 'ThemeService' ];

	/**
	 * @ngdoc controller
	 * @name smi2.controller:TableController
	 * @description Контроллер страницы 1 таблицы БД
	 */
	function TableController( $scope, $rootScope, API, ThemeService ) {

		$scope.vars = {
			columns: {},
			data: null,
			grid: null,
			limit: 100,
			offset: 0,
			statistics: {},
			scrollConfig: {
				autoHideScrollbar: false,
				theme: ThemeService.isDark( )
					? 'light'
					: 'dark',
				scrollButtons: {
					enable: false
				},
				scrollInertia: 100,
				advanced: {
					updateOnContentResize: true
				}
			}
		};

		$rootScope.$watch('currentTable', ( val, prev ) => {
			if ( val && val !== prev ) {
				$scope.init( );
			}
		});

		/**
		 * Загрузка данных
		 */
		$scope.load = ( ) => {
			$scope.vars.data = -1;
			API.query( 'select * from ' + $scope.vars.currentDatabase + '.' + $scope.vars.currentTable + ' limit ' + $scope.vars.offset + ', ' + $scope.vars.limit ).then( function ( data ) {
				$scope.vars.data = API.dataToHtml( data );
			}, function ( response ) {
				console.error( 'Ошибка ' + response );
			});
		};

		$scope.init = ( ) => {
			$scope.vars.currentTable = $rootScope.currentTable;
			$scope.vars.currentDatabase = $rootScope.currentDatabase;

			/**
			* Запрос полей таблицы
			*/
			API.query( 'describe table ' + $scope.vars.currentDatabase + '.' + $scope.vars.currentTable ).then( data => $scope.vars.columns = data );

			/**
			* Запрос статистики по таблице
			*/
			API.query( 'SELECT ' +
				'	table, ' +
				'	formatReadableSize(sum(bytes)) as size, ' +
				'	sum(bytes) as sizeBytes, ' +
				'	min(min_date) as minDate, ' +
				'	max(max_date) as maxDate ' +
				'FROM  ' +
				'	system.parts ' +
				'WHERE ' +
				'	database = \'' + $scope.vars.currentDatabase + '\' AND ' + '	( ' + '		table = \'' + $scope.vars.currentTable + '\' OR ' + '		table = \'' + $scope.vars.currentTable + '_sharded\'' + '    ) ' + 'GROUP BY ' + '    table ' ).then(response => $scope.vars.statistics = (response && response.data.length && response.data[0]) || {});

			$scope.load( );
		};

		/**
		 * Шаг вперед по данным
		 */
		$scope.loadNext = ( ) => {
			$scope.vars.offset += $scope.vars.limit;
			$scope.load( );
		};

		/**
		 * Шаг назад по данным
		 */
		$scope.loadPrev = ( ) => {
			if ( $scope.vars.offset > 0 ) {
				$scope.vars.offset -= $scope.vars.limit;
				$scope.load( );
			}
		};
		$scope.init( );
	}
})( angular, smi2 );
