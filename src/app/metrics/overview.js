/*
 * Copyright (C) 2017 IgorStrykhar in SMI2
 * All rights reserved.
 */

((angular, smi2,  $) => {
    'use strict';
    angular.module(smi2.app.name).controller('OverviewController', OverviewController);
    OverviewController.$inject = [
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

    function OverviewController($scope,
                              $rootScope,
                              $window,
                              localStorageService,
                              API,
                              $mdSidenav,
                              $mdDialog,
                              $mdToast,
                              ThemeService,$timeout) {

        $scope.vars = {
            uiTheme: ThemeService.themeObject,
            isDark:ThemeService.isDark(),
        };

        $scope.initTab = () => {
            console.info("initPivotTab");
        };




    }
})(angular, smi2, window.$);
