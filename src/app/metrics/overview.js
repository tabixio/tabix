/*
 * Copyright (C) 2017 IgorStrykhar in SMI2
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
            // disableResize:true,
            // staticGrid:true
        };
        $scope.vars = {
            uiTheme: ThemeService.themeObject,
            isDark:ThemeService.isDark(),
        };

        $scope.initTab = () => {
            console.info("initPivotTab");
        };
        $scope.addWidgets = (w) => {
            $scope.widgets.push(w);
            $scope.$applyAsync();
        }


        $scope.init = () => {

            // graph : https://ecomfe.github.io/echarts-examples/public/editor.html?c=graph-webkit-dep
            // https://ecomfe.github.io/echarts-examples/public/data/asset/data/webkit-dep.json
            // https://ecomfe.github.io/echarts-examples/public/editor.html?c=graph-npm
            // https://ecomfe.github.io/echarts-examples/public/data/asset/data/npmdepgraph.min10.json

            console.info("Init OverviewController");
            //



            //
            API.fetchQuery(`SELECT * FROM system.build_options`).then(function ( queryResult ) {
                // let drawCommand={drawtype:'TEXT',code:'<p>Version:{{data.0.v}}</p>'};
                $scope.addWidgets(new WidgetTable(new DataProvider(queryResult)));
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
                $scope.addWidgets(new WidgetDraw(new DataProvider(queryResult),drawCommand,6,6));

            });
            API.fetchQuery(`select toStartOfFiveMinute(modification_time) as dt,
            sum(bytes) as bytes from system.parts group by dt order by dt LIMIT 30000`).then(function ( queryResult ) {
                let obj={
                    autoAxis:true,
                    markLine:true,
                    // stack:true,
                    title:'system.parts bytes'
                };

                let drawCommand={drawtype:'CHART',code:obj};
                $scope.addWidgets(new WidgetDraw(new DataProvider(queryResult),drawCommand,6,6));

            });
            API.fetchQuery(`select concat(database,'.',table) as table,sum(bytes) as bytes from system.parts
            group by table order by bytes desc LIMIT 3000`).then(function ( queryResult ) {
                let obj={
                    // autoAxis:false,//true,
                    // markLine:true,
                    // stack:true,
                    title:'system.parts bytes'
                };

                let drawCommand={drawtype:'BAR',code:obj};
                $scope.addWidgets(new WidgetDraw(new DataProvider(queryResult),drawCommand,6,2));
            });


            API.fetchQuery(`SELECT * FROM system.clusters`).then(function ( queryResult ) {
                $scope.addWidgets(new WidgetTable(new DataProvider(queryResult),2,6));
            });




            };

        $scope.init();

    }
})(angular, smi2, window.$);
