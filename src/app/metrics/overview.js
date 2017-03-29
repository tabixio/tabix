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

        $scope.widgets=[];


        $scope.gridsterOpts = {
            columns: 6, // the width of the grid, in columns
            pushing: true, // whether to push other items out of the way on move or resize
            floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
            swapping: true, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
            width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
            colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
            rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
            margins: [4, 4], // the pixel distance between each widget
            outerMargin: true, // whether margins apply to outer edges of the grid
            sparse: false, // "true" can increase performance of dragging and resizing for big grid (e.g. 20x50)
            isMobile: false, // stacks the grid items if true
            mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
            mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
            minColumns: 1, // the minimum columns the grid must have
            minRows: 0, // the minimum height of the grid, in rows
            maxRows: 100,
            defaultSizeX: 1, // the default width of a gridster item, if not specifed
            defaultSizeY: 1, // the default height of a gridster item, if not specified
            minSizeX: 0, // minimum column width of an item
            maxSizeX: null, // maximum column width of an item
            minSizeY: 0, // minumum row height of an item
            maxSizeY: null, // maximum row height of an item,
            // static : true,
            resizable: {
                enabled: !$scope.vars.staticGrid,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                start: function(event, $element, widget) {

                }, // optional callback fired when resize is started,
                resize: function(event, $element, widget) {
                    widget.scheduledResize();
                }, // optional callback fired when item is resized,
                stop: function(event, $element, widget) {

                    $timeout(function(){
                        widget.scheduledResize();
                    },400);
                    //
                    // console.log($element);
                    // if ($element.originalSize.width != $element.size.width
                    //     || $element.originalSize.height != $element.size.height) {
                    //     var gridsterItemScope = angular.element($element).scope();
                    //     gridsterItemScope.$broadcast('resizestop', arguments);
                    // }
                    //
                    // // optional callback fired when item is finished resizing
                    // widget.onResize();
                }
            },
            draggable: {
                enabled: !$scope.vars.staticGrid, // whether dragging items is supported
                handle: '.widget-draggable', // optional selector for drag handle
                start: function(event, $element, widget) {}, // optional callback fired when drag is started,
                drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
                stop: function(event, $element, widget) {
                    // optional callback fired when item is finished dragging
                    // widget.onDrag();
                    // widget.scheduledResize();

                }
            }
        };



        $scope.vars = {
            uiTheme: ThemeService.themeObject,
            isDark:ThemeService.isDark(),
        };

        $scope.initTab = () => {
            console.info("initPivotTab");
        };


        $scope.init = () => {

            // graph : https://ecomfe.github.io/echarts-examples/public/editor.html?c=graph-webkit-dep
            // https://ecomfe.github.io/echarts-examples/public/data/asset/data/webkit-dep.json
            // https://ecomfe.github.io/echarts-examples/public/editor.html?c=graph-npm
            // https://ecomfe.github.io/echarts-examples/public/data/asset/data/npmdepgraph.min10.json

            console.info("Init OverviewController");
            //



            //
            API.query(`SELECT * FROM system.build_options`).then(function ( queryResult ) {
                // let drawCommand={drawtype:'TEXT',code:'<p>Version:{{data.0.v}}</p>'};
                $scope.widgets.push(new WidgetTable(new DataProvider(queryResult),1,3));
                // $scope.widgets.push(new WidgetDraw(new DataProvider(queryResult),drawCommand,2,2));

            });


            API.query(`SELECT database,table,name, data_compressed_bytes, data_uncompressed_bytes FROM system.columns`).then(function ( queryResult ) {

                let obj={
                    path:'database.table.name.data_compressed_bytes' ,
                    title:'columns data_compressed_bytes',
                    tooltip:'Size',
                    valueformat:'0.00 b'
                };

                let drawCommand={drawtype:'TREEMAP',code:obj};
                $scope.widgets.push(new WidgetDraw(new DataProvider(queryResult),drawCommand,3,3));

            });
            API.query(`select toStartOfFiveMinute(modification_time) as dt,
            sum(bytes) as bytes from system.parts group by dt order by dt LIMIT 30000`).then(function ( queryResult ) {
                let obj={
                    autoAxis:true,
                    markLine:true,
                    // stack:true,
                    title:'system.parts bytes'
                };

                let drawCommand={drawtype:'CHART',code:obj};
                $scope.widgets.push(new WidgetDraw(new DataProvider(queryResult),drawCommand,3,3));
            });
            API.query(`select concat(database,'.',table) as table,sum(bytes) as bytes from system.parts
            group by table order by bytes desc LIMIT 3000`).then(function ( queryResult ) {
                let obj={
                    // autoAxis:false,//true,
                    // markLine:true,
                    // stack:true,
                    title:'system.parts bytes'
                };

                let drawCommand={drawtype:'BAR',code:obj};
                // let drawCommand={drawtype:'GRIDCHART',code:obj};
                $scope.widgets.push(new WidgetDraw(new DataProvider(queryResult),drawCommand,3,1));
            });


            API.query(`SELECT * FROM system.clusters`).then(function ( queryResult ) {
                // let drawCommand={drawtype:'TEXT',code:'<p>Version:{{data.0.v}}</p>'};
                $scope.widgets.push(new WidgetTable(new DataProvider(queryResult),1,3));
                // $scope.widgets.push(new WidgetDraw(new DataProvider(queryResult),drawCommand,2,2));

            });




            };

        $scope.init();

    }
})(angular, smi2, window.$);
