/*
 * Copyright (C) 2017 IgorStrykhar in Tabix LLC
 * All rights reserved.
 */

((angular, smi2,  $) => {
    'use strict';
    angular.module(smi2.app.name).controller('OverviewController', OverviewController);
    OverviewController.$inject = [
        '$scope',
        'API',
        'ThemeService'
    ];

    function OverviewController($scope,
                              API,
                              ThemeService) {

        $scope.widgets=[];

        $scope.staticGrid=true;
        $scope.gridStackOptions = {
            cellHeight: 200,
            verticalMargin: 0,
            disableDrag:true,
            disableResize:true,
            staticGrid:true
        };
        $scope.vars = {
            uiTheme: ThemeService.themeObject,
            isDark:ThemeService.isDark(),
        };

        $scope.dumpStaticGridSizes = () => {

            console.info('dumpStaticGridSizes');
            let x=[];
            $scope.widgets.map(function (t) {

                let oo={
                    id:t.id,
                    x:t.x,
                    y:t.y,
                    sizeX:t.sizeX,
                    sizeY:t.sizeY
                };
                x.push(oo);
                console.log(oo);
            });
            console.log(x);
        };
        $scope.initTab = () => {
            console.info("initPivotTab");
        };
        $scope.setWidgets = (numberWidget,w) => {

            w.id=numberWidget;
            w.x=$scope.widgets[numberWidget].x;
            w.y=$scope.widgets[numberWidget].y;
            w.sizeX=$scope.widgets[numberWidget].sizeX;
            w.sizeY=$scope.widgets[numberWidget].sizeY;



            $scope.widgets[numberWidget]=w;



            $scope.$applyAsync();
        }


        $scope.init = () => {


            $scope.widgets=[
                {id: 0, x: 0, y: 0, sizeX: 4, sizeY: 2},
                {id: 1, x: 8, y: 0, sizeX: 4, sizeY: 2},

                {id: 2, x: 4, y: 0, sizeX: 4, sizeY: 2},

                {id: 3, x: 0, y: 4, sizeX: 8, sizeY: 3},
                {id: 4, x: 8, y: 2, sizeX: 4, sizeY: 4},
                {id: 5, x: 0, y: 2, sizeX: 8, sizeY: 2}
                // {x: 0, y: 0, sizeX: 2, sizeY: 2}, // 0
                // {x: 4, y: 0, sizeX: 2, sizeY: 2}, // 1
                // {x: 4, y: 4, sizeX: 4, sizeY: 4}, // 2
                // {x: 0, y: 4, sizeX: 4, sizeY: 4}, // 3
                // {x: 0, y: 8, sizeX: 4, sizeY: 4}, // 4
                // {x: 0, y: 8, sizeX: 4, sizeY: 4}, // 5
            ];


            // graph : https://ecomfe.github.io/echarts-examples/public/editor.html?c=graph-webkit-dep
            // https://ecomfe.github.io/echarts-examples/public/data/asset/data/webkit-dep.json
            // https://ecomfe.github.io/echarts-examples/public/editor.html?c=graph-npm
            // https://ecomfe.github.io/echarts-examples/public/data/asset/data/npmdepgraph.min10.json

            console.info("Init OverviewController");
            //



            //
            API.fetchQuery(`SELECT * FROM system.build_options`).then(function ( queryResult ) {
                // let drawCommand={drawtype:'TEXT',code:'<p>Version:{{data.0.v}}</p>'};
                $scope.setWidgets(0, new WidgetTable(new DataProvider(queryResult)) );
                // $scope.addWidgets(new WidgetDraw(new DataProvider(queryResult),drawCommand,2,2));

            });


            API.fetchQuery(`SELECT database,table,name, data_compressed_bytes, data_uncompressed_bytes FROM system.columns`).then(function ( queryResult ) {

                let obj={
                    path:'database.table.name.data_compressed_bytes' ,
                    title:'columns data_compressed_bytes',
                    tooltip:'Size',
                    valueformat:'0.00 b'
                };

                let drawCommand={drawtype:'TREEMAP',code:obj};
                $scope.setWidgets(1,new WidgetDraw(new DataProvider(queryResult),drawCommand ));

            });
            API.fetchQuery(`SELECT database,table,sum(data_compressed_bytes) as data_compressed_bytes FROM system.columns GROUP BY database,table`).then(function ( queryResult ) {

                let obj={
                    path:'database.table.data_compressed_bytes' ,
                    title:'columns data_compressed_bytes',
                    tooltip:'Size',
                    valueformat:'0.00 b'
                };

                let drawCommand={drawtype:'TREEMAP',code:obj};
                $scope.setWidgets(2,new WidgetDraw(new DataProvider(queryResult),drawCommand ));

            });
            API.fetchQuery(`select toStartOfDay(modification_time) as dt,
            sum(bytes) as bytes FROM system.parts group by dt order by dt LIMIT 30000`).then(function ( queryResult ) {
                let obj={
                    autoAxis:true,
                    markLine:true,
                    // stack:true,
                    title:'system.parts bytes'
                };

                let drawCommand={drawtype:'CHART',code:obj};
                $scope.setWidgets(3,new WidgetDraw(new DataProvider(queryResult),drawCommand ));

            });
            API.fetchQuery(`select concat(database,'.',table) as table,sum(bytes) as bytes from system.parts
            group by table order by bytes desc LIMIT 3000`).then(function ( queryResult ) {
                let obj={
                    // autoAxis:false,//true,
                    // markLine:true,
                    // stack:true,
                    title:'table bytes'
                };

                let drawCommand={drawtype:'BAR',code:obj};
                $scope.setWidgets(4,new WidgetDraw(new DataProvider(queryResult),drawCommand));

            });


            API.fetchQuery(`SELECT * FROM system.clusters`).then(function ( queryResult ) {
                $scope.setWidgets(5,new WidgetTable(new DataProvider(queryResult)));
            });




            };

        $scope.init();

    }
})(angular, smi2, window.$);
