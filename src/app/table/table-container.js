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
        'hotRegisterer'
    ];

    /**
    * @ngdoc controller
    * @name smi2.controller:TableContainerController
    * @description Контроллер страницы 1 таблицы БД
    */
    function TableController( $scope, $rootScope, API, ThemeService, $stateParams, $mdSidenav, $mdComponentRegistry,hotRegisterer ) {



        $scope.tablewidget={};
        $scope.vars = {
            columns: {},
            ugrid:{},
            sortColumn:false,
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
        $scope.updateHandTable = ( ) => {
            hotRegisterer.getInstance('hotTableContain').render();
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

            console.warn("LOAD DATA! IN TABLES");

            $scope.vars.data = -1;
            API.fetchQuery( `
            select * from ${ $scope.vars.currentDatabase }.${ $scope.vars.currentTable } limit ${ $scope.vars.offset }, ${ $scope.vars.limit }
                ` ).then( function ( data ) {


                // провайдер CH или API
                let provider='ch';
                // передаем в
                $scope.tablewidget=new WidgetTable(new DataProvider(data,provider));


                // $scope.vars.odata = data.data;
                // let handsontable = API.dataToHandsontable( data );
                // $scope.table.colHeaders=handsontable.colHeaders;
                // $scope.table.settings.columns=handsontable.columns;
                // $scope.table.settings.manualColumnResize=handsontable.columns;
                // $scope.table.data=handsontable.data;
                //
                // //
                // $scope.table.settings.width = '99.9' + Math.floor(100 * Math.random()) + '%';
                // $scope.table.settings.height = '99.9' + Math.floor(100 * Math.random()) + '%';
                //
                // // console.info($scope.table);
                //
                // $scope.updateHandTable();


                $scope.vars.loading = false;
            }, function ( response ) {
                $scope.vars.loading = false;
                console.error( 'Error ' + response );
            });
        };

        $scope.calcRawSize = ( ) => {
            // console.log('RAcalcRawSizeW');
            //SELECT any(ignore(*)) FROM merge.hits SAMPLE 1 / 10000

            // А размер данных без учета компрессии -- никак?
            // Можно узнать разжатый размер всей таблицы сделав в клиенте SELECT any(ignore(*)) FROM table и посмотреть финальный прогресс
            // Progress: 33.82 million rows, 39.82 GB
            // Только это может выполняться долго
            // Потом прогресс вручную домножить на 10000

            $scope.vars.isRawStatistics=true;
            API.fetchQuery( 'SELECT any(ignore(*)) FROM ' + $scope.vars.currentDatabase + '.' + $scope.vars.currentTable +' SAMPLE 1 / 10000 ' ).then( data => {
                //
                $scope.vars.rawstatistics=data.statistics;
                // console.log("RAcalcRawSizeWresult",data);
            } , function(reason) {
                $scope.vars.rawstatistics=reason.data;
            });


        };
        $scope.init = ( ) => {
            $scope.vars.loading = true;
            $scope.vars.createtable = "N/A";
            API.fetchQuery( 'SHOW CREATE TABLE ' + $scope.vars.currentDatabase + '.' + $scope.vars.currentTable ).then( data =>{
                $scope.vars.createtable = window.sqlFormatter.format(data.data[0].statement);
            } );


            /**
            * Запрос статистики по таблице
            */
            API.fetchQuery( 'SELECT ' +
                '	table, ' +
                '	formatReadableSize(sum(bytes)) as size, ' +
                '	sum(bytes) as sizeBytes, ' +
                '	min(min_date) as minDate, ' +
                '	max(max_date) as maxDate ' +
                'FROM  ' +
                '	system.parts ' +
                'WHERE ' +
                '	database = \'' + $scope.vars.currentDatabase + '\' AND ' + '	( ' + '		table = \'' + $scope.vars.currentTable + '\' OR ' + '		table = \'' + $scope.vars.currentTable + '_sharded\'' + '    ) ' + 'GROUP BY ' + '    table ' ).
            then(response => $scope.vars.statistics = (response && response.data.length && response.data[0]) || {});

            /**
             * Запрос полей таблицы
             */
            API.fetchQuery( 'SELECT * FROM system.columns WHERE database=\'' + $scope.vars.currentDatabase + '\' AND table=\'' + $scope.vars.currentTable+'\'' ).then( columnsData => {

                // columnsData

                API.fetchQuery( 'describe table ' + $scope.vars.currentDatabase + '.' + $scope.vars.currentTable ).then( data => {


                    _.map(data.data,function(o) {
                        let k=_.find(columnsData.data, {'name': o.name});
                        _.merge(o, k);

                        o.size='-';
                        o.ratio='-';


                        if (!angular.isUndefined(o.default_kind) && angular.isUndefined(o.default_type)) {
                            //Renamed column "default_type" to "default_kind" in system.columns tab… · yandex/ClickHouse@8d570e2
                            o.default_type = o.default_kind;
                        }


                        //появились data_compressed_bytes, data_uncompressed_bytes,
                        if (o.data_compressed_bytes)
                        {
                            o.size=numbro(o.data_compressed_bytes).format('0.0 b')+' / '+numbro(o.data_uncompressed_bytes).format('0.0 b');

                            o.ratio=numbro(parseInt(o.data_uncompressed_bytes)/parseInt(o.data_compressed_bytes)).format('0.0');
                        }
                        return o;
                    });

                    $scope.vars.columns = data;

                    // Загружаем данные

                    $scope.vars.sortColumn=false;
                    let c=0;
                    data.data.forEach((col) =>
                    {
                        if (c<3) {
                            if (col.type=='Date') {
                                $scope.vars.sortColumn=col.name;
                            }
                            if (col.type=='DateTime') {
                                $scope.vars.sortColumn=col.name;
                            }

                        }
                        c=c+1;
                    });

                    $scope.load( );
                } );
            } );


        };

        /**
            * Шаг вперед по данным
            */
        $scope.loadNext = ( ) => {
            $scope.vars.loading = true;
            $scope.vars.offset += $scope.vars.limit;
            $scope.load( );
        };

        /**
            * Шаг назад по данным
            */
        $scope.loadPrev = ( ) => {

            if ( $scope.vars.offset > 0 ) {
                $scope.vars.loading = true;
                $scope.vars.offset -= $scope.vars.limit;
                $scope.load( );
            }
        };
    }
})( angular, smi2 );
