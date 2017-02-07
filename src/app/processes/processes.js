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
            isDark: ThemeService.isDark(),
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


        $scope.table = {
            wordWrap:false,

            data:{

            },
            settings : {
                manualColumnMove: true,
                manualColumnResize: true,
                //
                autoWrapRow: true,
                // // rowHeaders: true,
                // // colHeaders: _(headers).map(function(header, i) {
                // //     return "<report-header display-name='" + header.colName + "' index='" + i + "' > </report-header>";
                // // }),
                colWidths: 70,
                // rowHeights: [50, 40, 100],
                // renderer: 'html',
                // fillHandle: false,
                dropdownMenu: true,
                stretchH: 'all',
                preventOverflow: 'horizontal',
                persistentState:true,
                // contextMenu: ['row_above', 'row_below', 'remove_row'],
                // filters: true,
                //
                // fixedRowsTop: 1,
                // fixedColumnsLeft: 1,
                columnSorting: true,
                sortIndicator: true,
                manualRowResize: true,
                viewportColumnRenderingOffset:'auto',
                // // maxRows: 10,
                // // visibleRows:10,
                autoColumnSize: {
                    samplingRatio: 23
                }
            }
        };


        let intervalHandle = null;

        $scope.load = () => {
            let sql = `SELECT query,formatReadableSize(bytes_read) as bytes_read, 
                formatReadableSize(memory_usage) as memory_usage,
                rows_read,
                round(elapsed,4) as elapsed , *
                
            FROM system.processes`;// /* 12XQWE3X1X2XASDF */ WHERE query not like '%12XQWE3X1X2XASDF%'`;


            API.query(sql).then(function ( data ) {

                let handsontable = API.dataToHandsontable( data );
                $scope.table.colHeaders=handsontable.colHeaders;
                // $scope.table.settings.columns=handsontable.columns;
                $scope.table.settings.manualColumnResize=handsontable.columns;
                $scope.table.settings.colWidths=handsontable.colWidths;
                $scope.table.data=handsontable.data;

                $scope.vars.data = true;
                // $scope.vars.cols = data.meta.map(col => col.name);
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




        // start
        $scope.load();


        if ($scope.vars.interval > -1) {
            $scope.setInterval();
        }
    }
})(angular, smi2);
