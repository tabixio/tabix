(( angular, smi2 ) => {
    'use strict';

    angular.module( smi2.app.name ).controller( 'TableContainerController', TableController );
    TableController.$inject = [
        '$scope',
        '$rootScope',
        'API',
        'ThemeService',
        '$stateParams',
        '$mdSidenav',
        '$mdComponentRegistry'
    ];

    /**
    * @ngdoc controller
    * @name smi2.controller:TableContainerController
    * @description Контроллер страницы 1 таблицы БД
    */
    function TableController( $scope, $rootScope, API, ThemeService, $stateParams, $mdSidenav, $mdComponentRegistry ) {

        $scope.table = {
            //
            //
            //
            //
            data:{

            },
            settings : {
                // manualColumnMove: true,
                manualColumnResize: true,
                autoWrapRow: true,
                rowHeaders: true,
                colHeaders: true,
                dropdownMenu: true,
                stretchH: 'all',
                preventOverflow: 'horizontal',
                persistentState:true,
                contextMenu: ['row_above', 'row_below', 'remove_row'],
                filters: true,
                // fixedRowsTop: 1,
                // fixedColumnsLeft: 2,

                columnSorting: true,
                sortIndicator: true,
                // manualRowResize: true,
                maxRows: 10,
                autoColumnSize: {
                    samplingRatio: 23
                }
            }
            // colHeaders: ['A', 'B', 'C', 'D'],
            // colWidths: [200, 200, 200, 200, 200],
            // columns: [
            //     { data: 'a' },
            //     { data: 'b' },
            //     { data: 'c' },
            //     { data: 'd' }
            // ],
            // data: data,
        };


        $scope.vars = {
            columns: {},
            ugrid:{},
            createtable: {},
            data: null,
            grid: null,
            limit: 100,
            offset: 0,
            statistics: {},
            loading: false,
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
        $scope.initContainer = ( ) => {
            $rootScope.$watch('currentTable', ( val ) => {
                if ( val ) {
                    $scope.vars.currentTable = $rootScope.currentTable;
                    $scope.vars.currentDatabase = $rootScope.currentDatabase;
                    $scope.init( );
                }
            });
        };

        $scope.initUIGrid = ( ) => {
            $scope.gridApi.core.on.filterChanged( $scope, function() {
                let grid = this.grid;

                grid.columns.forEach((col) => {

                    console.info('col',col);
                });
                    // .forEach((cell) => {


            });
        };
        $scope.initOnGo = ( ) => {
            if ( $scope.$parent.vars ) {
                if ($mdComponentRegistry.get( 'tableSiedenav' )) {
                    $mdSidenav( 'tableSiedenav' ).close( );
                }
                $scope.vars.currentTable = $scope.$parent.vars.tableName;
                $scope.vars.currentDatabase = $scope.$parent.vars.dbName;
                $scope.init( );

            }
        };

        /**
        * Загрузка данных
        */
        $scope.load = ( ) => {
            $scope.vars.data = -1;
            API.query( `
                select *
                from ${ $scope.vars.currentDatabase }.${ $scope.vars.currentTable }
                limit ${ $scope.vars.offset }, ${ $scope.vars.limit }
                ` ).then( function ( data ) {
                // $scope.vars.odata = data.data;
                let handsontable = API.dataToHandsontable( data );
                $scope.table.colHeaders=handsontable.colHeaders;
                $scope.table.settings.columns=handsontable.columns;
                // $scope.table.settings.colWidths=handsontable.colWidths;
                $scope.table.data=handsontable.data;
                //
                // $scope.ugrid.onRegisterApi = function(gridApi){
                //     $scope.gridApi = gridApi;
                // };























                $scope.vars.loading = false;
            }, function ( response ) {
                $scope.vars.loading = false;
                console.error( 'Ошибка ' + response );
            });
        };

        $scope.init = ( ) => {
            $scope.vars.loading = true;

            /**
                * Запрос полей таблицы
                */
            API.query( 'describe table ' + $scope.vars.currentDatabase + '.' + $scope.vars.currentTable ).then( data => $scope.vars.columns = data );

            API.query( 'SHOW CREATE TABLE ' + $scope.vars.currentDatabase + '.' + $scope.vars.currentTable ).then( data => $scope.vars.createtable = data );

            console.warn("createtable");
            console.warn($scope.vars.createtable);
            /**
                * Запрос статистики по таблице
                */
            API.query( 'SELECT ' +
                '	table, ' +
                '	formatReadableSize(sum(bytes)) as size, ' +
                '	sum(bytes) as sizeBytes, ' +
                '	min(min_date) as minDate, ' +
                '	max(max_date) as maxDate ' +
                'FROM  ' +
                '	system.parts ' +
                'WHERE ' +
                '	database = \'' + $scope.vars.currentDatabase + '\' AND ' + '	( ' + '		table = \'' + $scope.vars.currentTable + '\' OR ' + '		table = \'' + $scope.vars.currentTable + '_sharded\'' + '    ) ' + 'GROUP BY ' + '    table ' ).then(response => $scope.vars.statistics = (response && response.data.length && response.data[0]) || {});

            $scope.load( );
        };

        /**
            * Шаг вперед по данным
            */
        $scope.loadNext = ( ) => {
            $scope.vars.offset += $scope.vars.limit;
            $scope.load( );
        };

        /**
            * Шаг назад по данным
            */
        $scope.loadPrev = ( ) => {
            if ( $scope.vars.offset > 0 ) {
                $scope.vars.offset -= $scope.vars.limit;
                $scope.load( );
            }
        };
    }
})( angular, smi2 );
