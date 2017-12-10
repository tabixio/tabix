(( angular, smi2 ) => {
    'use strict';

    angular.module( smi2.app.name ).controller( 'DashSidebarController', DashSidebarController );
    DashSidebarController.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        'API',
        'ThemeService',
        '$mdSidenav', '$mdToast','$mdDialog', '$timeout','localStorageService'

    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:DashSidebarController
     * @description Контроллер бокового меню
     */
    function DashSidebarController($scope, $rootScope, $state, API, ThemeService, $mdSidenav, $mdToast,$mdDialog, $timeout,localStorageService) {
        $scope.vars = {
            searchline:'',
            counter: 0,
            loaded: false,
            error: false,
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
                toggle: false,
                preventDefault: false
            }
        };
        //



        $scope.reLoad = (forceReload) =>   {
            $scope.vars.loaded = false;
            $scope.vars.error = false;
            $scope.vars.databases = [];
            $rootScope.isInitDatabaseStructure = false;
            API.getDashboardsTree().then(
            (data)=> {

                console.info("tree",data);


            },(respond)=>{
                $scope.showAlertDatabaseStructure(respond);
            });



        };

        $scope.reLoad();
    }
})( angular, smi2 );
