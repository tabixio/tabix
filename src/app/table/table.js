(( angular, smi2 ) => {
    'use strict';

    angular.module( smi2.app.name ).controller( 'TableController', TableController );
    TableController.$inject = [ '$scope', '$stateParams' ];

    /**
	 * @ngdoc controller
	 * @name smi2.controller:TableController
	 * @description Контроллер страницы 1 таблицы БД
	 */
    function TableController( $scope, $stateParams ) {
        let { dbName, tableName } = $stateParams;
        $scope.vars = {
            dbName,
            tableName
        };

    }
})( angular, smi2 );
