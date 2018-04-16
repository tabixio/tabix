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
            loaded: false,
            error: false,
            tree: [ ]
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

        $scope.openDash = (id) =>   {
                console.log("openDash",id);
                $state.go('dashId',{dashId:id});
        };

        $scope.reLoad = () =>   {


            $scope.vars.loaded = false;
            $scope.vars.error = false;
            $scope.vars.tree = [];

            return false;

            // API.getDashboardsTree().then(
            // (data)=> {
            //     $scope.vars.tree=data.tree;
            //     $scope.vars.items=data.list;
            //     $scope.vars.loaded=true;
            //     $scope.vars.error=false;
            //     console.info("tree",data);
            //     $timeout(function () {
            //         // console.info("SideBar - loaded,run metisMenu - apply");
            //         $scope.vars.loaded = true;
            //         $scope.vars.error = false;
            //         // console.time("metisMenu");
            //         $('#sideBarMetismenu').metisMenu();
            //
            //         // console.timeEnd("metisMenu");
            //     }, 100);
            //
            // },(respond)=>{
            //     $scope.showAlertDatabaseStructure(respond);
            // });
        };

        $scope.reLoad();
    }
})( angular, smi2 );
