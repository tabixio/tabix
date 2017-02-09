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
        '$mdComponentRegistry',
        'HandTable'
    ];

    /**
    * @ngdoc controller
    * @name smi2.controller:TableContainerController
    * @description Контроллер страницы 1 таблицы БД
    */
    function TableController( $scope, $rootScope, API, ThemeService, $stateParams, $mdSidenav, $mdComponentRegistry,HandTable ) {

        $scope.table = {
            //
            //
            //
            //
            data:{

            },
            settings : {
                // manualColumnMove: true,
                // manualColumnResize: true,
                //
                // autoWrapRow: true,
                // // rowHeaders: true,
                // // colHeaders: _(headers).map(function(header, i) {
                // //     return "<report-header display-name='" + header.colName + "' index='" + i + "' > </report-header>";
                // // }),
                // //colWidths: 100,
                // rowHeights: [50, 40, 100],
                // renderer: 'html',
                // fillHandle: false,
                dropdownMenu: true,
                // stretchH: 'all',
                // preventOverflow: 'horizontal',
                // persistentState:true,
                // contextMenu: ['row_above', 'row_below', 'remove_row'],
                // filters: true,
                //
                // // fixedRowsTop: 1,
                // // fixedColumnsLeft: 1,
                // columnSorting: true,
                // sortIndicator: true,
                // manualRowResize: true,
                // viewportColumnRenderingOffset:'auto',
                // // maxRows: 10,
                // // visibleRows:10,
                //
                // wordWrap:false,
                // // autoColumnSize: {
                // //     samplingRatio: 23
                // // }
            }
            // colHeaders: ['A', 'B', 'C', 'D'],
            // colWidths: [200, 200, 200, 200, 200],

        };


        $scope.vars = {
            columns: {},
            ugrid:{},
            isDark: ThemeService.isDark(),
            createtable: {},
            data: null,
            grid: null,
            limit: 100,
            offset: 0,
            statistics: {},
            loading: true,
            isRawStatistics:false,
            rawstatistics:"",
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

        $scope.onAfterInit = ( ) => {
            // this.validateCells();
        };
        $scope.initHandTable = ( ) => {


                // init
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
                // $scope.table.settings.columns=handsontable.columns;
                $scope.table.settings.manualColumnResize=handsontable.columns;
                $scope.table.settings.colWidths=handsontable.colWidths;
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

        $scope.calcRawSize = ( ) => {
            console.log('RAcalcRawSizeW');
            //SELECT any(ignore(*)) FROM merge.hits SAMPLE 1 / 10000

            // А размер данных без учета компрессии -- никак?
            // Можно узнать разжатый размер всей таблицы сделав в клиенте SELECT any(ignore(*)) FROM table и посмотреть финальный прогресс
            // Progress: 33.82 million rows, 39.82 GB
            // Только это может выполняться долго
            // Потом прогресс вручную домножить на 10000

            $scope.vars.isRawStatistics=true;
            API.query( 'SELECT any(ignore(*)) FROM ' + $scope.vars.currentDatabase + '.' + $scope.vars.currentTable +' SAMPLE 1 / 10000 ' ).then( data => {
                //
                $scope.vars.rawstatistics=data.statistics;
                console.log("RAcalcRawSizeWresult",data);
            } , function(reason) {
                $scope.vars.rawstatistics=reason.data;
            });


        };
        $scope.init = ( ) => {
            $scope.vars.loading = true;

            /**
                * Запрос полей таблицы
                */
            API.query( 'describe table ' + $scope.vars.currentDatabase + '.' + $scope.vars.currentTable ).then( data => $scope.vars.columns = data );

            API.query( 'SHOW CREATE TABLE ' + $scope.vars.currentDatabase + '.' + $scope.vars.currentTable ).then( data =>{
                $scope.vars.createtable = window.sqlFormatter.format(data.data[0].statement);
                console.log($scope.vars.createtable)
            } );


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

            $scope.initHandTable( );
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
