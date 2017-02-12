/*
 * Copyright (C) 2017 IgorStrykhar in SMI2
 * All rights reserved.
 */



((angular, smi2, AmCharts, $) => {
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
        'ThemeService'
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
                              ThemeService) {


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
            minColumns: 2, // the minimum columns the grid must have
            minRows: 1, // the minimum height of the grid, in rows
            maxRows: 100,
            defaultSizeX: 2, // the default width of a gridster item, if not specifed
            defaultSizeY: 1, // the default height of a gridster item, if not specified
            minSizeX: 1, // minimum column width of an item
            maxSizeX: null, // maximum column width of an item
            minSizeY: 1, // minumum row height of an item
            maxSizeY: null, // maximum row height of an item,
            // static : true,
            resizable: {
                enabled: !$scope.vars.staticGrid,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                start: function(event, $element, widget) {

                }, // optional callback fired when resize is started,
                resize: function(event, $element, widget) {

                }, // optional callback fired when item is resized,
                stop: function(event, $element, widget) {

                    //
                    console.log("[resizable.STOP]");
                    widget.scheduledResize();
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
                    widget.scheduledResize();

                }
            }
        };

        $scope.gridstackHandler = false;
        $scope.amChartOptions = false;


        $scope.ready = {
            pivot:false,
            amchart:false,
            echarts:false

        };
        $scope.echarts = {
            sankeys:false
        };


        /**
         * Привязка сетки
         */
        $scope.switchStaticGrid = function() {
            $scope.vars.staticGrid=!$scope.vars.staticGrid;
            $scope.gridsterOpts.draggable.enabled = !$scope.vars.staticGrid;
            $scope.gridsterOpts.resizable.enabled = !$scope.vars.staticGrid;

        };

        $scope.initTableTab = () => {
            console.info("initTableTab");
            $scope.vars.active.table=true;
        };

        $scope.initDrawTab = () => {
            console.info("initDrawTab");
            $scope.vars.active.draw=true;
        };

        $scope.initPivotTab = () => {
            console.info("initPivotTab");
            $scope.vars.active.pivot=true;
        };

        $scope.initTable = (meta,data,query) => {
            console.warn("INIT TABLE!");
        };

        $scope.initControll = (meta,data,query) => {
            console.warn("INIT TABLE!");
        };






        $scope.initSankeys = (meta,data,query) => {

            let drawCommand=[];
            if ('drawCommand' in query)
            {
                drawCommand=query.drawCommand;
            }
            let levels=[];
            drawCommand.forEach(i => {
                try {
                    if (i && !i.code) return;
                    let object=eval('('+i.code+')');
                    console.warn(object);
                    levels=object['levels'];

                    // получаем настройки по осям
                } catch (E) {
                    console.error('error eval ', i.code);
                }
            });


            // подготовка данных
            let nodes=[];
            let links=[];
            console.warn('levels',levels);
            levels.forEach(level=>{
                if (level.source && level.target && level.value) {

                    data.forEach(row=>{
                        nodes[row[level.source]]=1;
                        nodes[row[level.target]]=1;

                        links.push({
                            source:row[level.source],
                            target:row[level.target],
                            value:row[level.value]
                        })

                    });
                }
            });
            let result_nodes=[];
            for (let key in nodes) {
                   result_nodes.push({name:key});
            }
            let option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'

                },
                series: [
                    {
                        type: 'sankey',
                        layout:'none',
                        data: result_nodes,
                        links: links,
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                borderColor: '#aaa'
                            }
                        },
                        lineStyle: {
                            normal: {
                                curveness: 0.5
                            }
                        }
                    }
                ]
            };

            //
            //
            console.info(option);
            // let dom = document.getElementById('sunkeyDiv');
            // let myChart = echarts.init(dom);

            $scope.echarts.sankeys=option;
            // myChart.setOption(option);
            //
            // $.get('./product.json', function (data) {
            //
            //
            //
            // });
            $scope.ready.echarts=true;

        };



    }
})(angular, smi2, window.AmCharts, window.$);
