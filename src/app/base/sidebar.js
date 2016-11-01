( function ( angular, smi2 ) {
	'use strict';

	angular.module( smi2.app.name ).controller( 'SidebarController', SidebarController );
	SidebarController.$inject = [ '$scope', 'API' ];

	/**
	 * @ngdoc controller
	 * @name smi2.controller:SidebarController
	 * @description Контроллер бокового меню
	 */
	function SidebarController( $scope, API ) {
		$scope.vars = {
			loaded: false,
			databases: [ ]
		};

		$scope.vars.scrollConfig = {
			autoHideScrollbar: false,
			theme: 'light',
			scrollButtons: {
				enable: false
			},
			scrollInertia: 400,
			advanced: {
				updateOnContentResize: true
			}
		};

		API.query( 'SELECT ' +
			'	database, ' +
			'	name ' +
			'FROM  ' +
			'	system.tables' ).then(res => {
			let data = res.data || [ ];
			$scope.vars.databases = data.reduce(( prev, item ) => {
				for ( let a of prev ) {
					if ( a.text == item.database ) {
						a.tables.push({ text: item.name });
						return prev;
					}
				}
				return [
					...prev, {
						text: item.database,
						tables: [
							{
								text: item.name
							}
						]
					}
				];
			}, [ ]);
			$scope.vars.loaded = true;
		});
		// 	$scope.changeDatabase(data.data[0]);
	}
})( angular, smi2 );
