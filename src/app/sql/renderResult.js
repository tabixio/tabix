/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */



((angular, smi2,  $) => {
    'use strict';

    angular.module(smi2.app.name).controller('RenderCtrl', RenderController);
    RenderController.$inject = [
        '$scope',
        '$rootScope',
        '$window',
        'localStorageService',
        'API',
        '$mdSidenav',
        '$mdDialog',
        '$mdToast',
        'ThemeService',
        '$timeout'
    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:RenderCtrl
     * @description SQL controller data
     */
    function RenderController($scope,
                           $rootScope,
                           $window,
                           localStorageService,
                           API,
                           $mdSidenav,
                           $mdDialog,
                           $mdToast,
                              ThemeService,$timeout) {



        $scope.tabsRender=true;

        $scope.vars = {
            rsw: 0,
            uiTheme: ThemeService.themeObject,
            isChartReady:false,
            staticGrid:true,
            stackType:'false',
            isDark:ThemeService.isDark(),
            active:{
                table:false,
                pivot:false,
                draw:false
            }

        };
        $scope.staticGrid=true;

        $scope.gridStackOptions = {
            cellHeight: 200,
            verticalMargin: 3,
            disableDrag:true,
            // disableResize:true,
            // staticGrid:true
        };



        /**
         * Привязка сетки
         */
        $scope.switchStaticGrid = function() {

            $scope.vars.staticGrid=!$scope.vars.staticGrid;
            $scope.staticGrid=$scope.vars.staticGrid;
            console.info("staticGrid",$scope.staticGrid);

        };

        $scope.initNoTabs = () => {
            $scope.vars.active.table=true;
            $scope.vars.active.draw=true;
            $scope.vars.active.pivot=true;
        };
        $scope.initTableTab = () => {

            console.warn("initTableTab!!!!");
            $scope.vars.active.table=true;
        };

        $scope.initDrawTab = () => {
            $scope.vars.active.draw=true;
        };

        $scope.onResizeStop = () => {

        };
        $scope.openEditorPlotLy = (w) => {
            console.log('openEditorPlotLy',w);
        };
        $scope.initPivotTab = () => {
            $scope.vars.active.pivot=true;
        };




    }
})(angular, smi2, window.$);
