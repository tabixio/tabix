(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('MetricsController', MetricsController);
    MetricsController.$inject = [
        '$scope',
        'API',
        'ThemeService',
        '$interval',
        'localStorageService',
        '$mdDialog',
        '$window'
    ];


    function MetricsController($scope, API, ThemeService, $interval, localStorageService,$mdDialog,$window) {


        //
        $scope.vars = {
            uiTheme: ThemeService.themeObject,
            isDark:ThemeService.isDark(),
            selectedTabResultIndex:0,//
            active:{
                Overview:false,
                Chart:false,
                Processes:false
            }
        };

        $scope.initProcessesTab = (d) => {
            $scope.vars.active.Processes=true;
        };

        $scope.initChartTab = (d) => {
            $scope.vars.active.Chart=true;
        };

        $scope.initOverviewTab = (d) => {
            $scope.vars.active.Overview=true;
        };



    }
})(angular, smi2);
