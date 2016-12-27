(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('ProcessesController', ProcessesController);
    ProcessesController.$inject = [
        '$scope',
        'API',
        'ThemeService',
        '$interval',
        'localStorageService'
    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:LoginController
     * @description Login page controller
     */
    function ProcessesController($scope, API, ThemeService, $interval, localStorageService) {

        const LS_INTERVAL_KEY = 'proc.interval';
        const LS_SORT_KEY = 'proc.key';

        $scope.vars = {
            loading: false,
            data: null,
            cols: [],
            sort: /^[a-z0-9_]+$/.test(localStorageService.get(LS_SORT_KEY)) ? localStorageService.get(LS_SORT_KEY) : null,
            interval: localStorageService.get(LS_INTERVAL_KEY) || -1,
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
        let intervalHandle = null;

        $scope.load = () => {
            let sql = 'SELECT * FROM system.processes';
            if ($scope.vars.sort) {
                sql += ' ORDER BY ' + $scope.vars.sort;
            }
            API.query(sql).then(function ( data ) {
                $scope.vars.data = API.dataToHtml( data );
                $scope.vars.cols = data.meta.map(col => col.name);
                $scope.vars.loading = false;
            }, function ( response ) {
                $scope.vars.loading = false;
                console.error( 'Ошибка ' + response );
            });
        };

        $scope.setInterval = () => {
            localStorageService.set(LS_INTERVAL_KEY, $scope.vars.interval);
            if (intervalHandle) {
                $interval.cancel(intervalHandle);
                intervalHandle = null;
            }
            if ($scope.vars.interval > -1) {
                intervalHandle = $interval($scope.load, $scope.vars.interval * 1000);
            }
        };

        $scope.setSort = () => {
            localStorageService.set(LS_SORT_KEY, $scope.vars.sort);
            $scope.load();
        };

        $scope.load();
        if ($scope.vars.interval > -1) {
            $scope.setInterval();
        }
    }
})(angular, smi2);
