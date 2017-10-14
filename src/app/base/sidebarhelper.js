(( angular, smi2 ) => {
    'use strict';

    angular.module( smi2.app.name ).controller( 'SidebarHelperCtrl', SidebarHelperCtrl );
    SidebarHelperCtrl.$inject = [
        '$scope',
        '$rootScope',
        'API',
        'localStorageService'
    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:SidebarController
     * @description Контроллер бокового меню
     */
    function SidebarHelperCtrl($scope, $rootScope, API, localStorageService) {
        $scope.vars = {

            variablesList:[],

            historysql:[],

            charthelp:[],

            active:{
                chart:false,
                history:false,
                vars:false
            }
        };
    }

})( angular , smi2 );
