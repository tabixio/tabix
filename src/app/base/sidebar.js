( function ( angular, smi2 ) {
	'use strict';

	angular.module( smi2.app.name ).controller( 'SidebarController', SidebarController );
	SidebarController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'API',
		'ThemeService',
		'$mdSidenav'
	];

	/**
	 * @ngdoc controller
	 * @name smi2.controller:SidebarController
	 * @description Контроллер бокового меню
	 */
	function SidebarController( $scope, $rootScope, $state, API, ThemeService, $mdSidenav ) {
		$scope.vars = {
			loaded: false,
			databases: [ ]
		};

		$scope.vars.scrollConfig = {
			autoHideScrollbar: false,
			theme: ThemeService.isDark( )
				? 'light'
				: 'dark',
			scrollButtons: {
				enable: false
			},
			scrollInertia: 400,
			advanced: {
				updateOnContentResize: true
			}
		};

		$scope.vars.metis = {
			config: {
				toggle: true,
				preventDefault: false
			}
		};

		$scope.clickAndSelect = ( database, event ) => {
			if ( database.name == $rootScope.currentDatabase ) {
				event.stopPropagation( );
				return false;
			}
			$scope.selectDatabase( database );
		};

		/**
		 * Select database
		 */
		$scope.selectDatabase = database => {
			$rootScope.currentDatabase = database.name;
			$mdSidenav( 'tableSiedenav' ).close( );
		};

		/**
		* Open table
		*/
		$scope.openTable = table => {
			$mdSidenav( 'tableSiedenav' ).close( );
			$rootScope.currentTable = table.name;
			$mdSidenav( 'tableSiedenav' ).open( );
		};

		API.query( 'SELECT ' +
			'	database, ' +
			'	name ' +
			'FROM  ' +
			'	system.tables' ).then(res => {
			let data = res.data || [ ];
			$scope.vars.databases = data.reduce(( prev, item ) => {
				for ( let a of prev ) {
					if ( a.name == item.database ) {
						a.tables.push({ name: item.name });
						return prev;
					}
				}
				return [
					...prev, {
						name: item.database,
						tables: [
							{
								name: item.name
							}
						]
					}
				];
			}, [ ]);

			$scope.selectDatabase($scope.vars.databases[0]);
			$scope.vars.loaded = true;
		});
	}
})( angular, smi2 );
