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
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                start: function(event, $element, widget) {

                }, // optional callback fired when resize is started,
                resize: function(event, $element, widget) {

                }, // optional callback fired when item is resized,
                stop: function(event, $element, widget) {

                    console.log("[resizable.STOP]");
                    // console.dir($element[0].offsetWidth);
                    // console.dir($element[0].offsetHeight);
                    // console.dir(widget);


                    setTimeout(function() {
                        widget.onResize();

                        //  console.log($element);
                        // resizeBlock(1);
                    }, 300);

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
                enabled: true, // whether dragging items is supported
                handle: '.widget-draggable', // optional selector for drag handle
                start: function(event, $element, widget) {}, // optional callback fired when drag is started,
                drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
                stop: function(event, $element, widget) {
                    // optional callback fired when item is finished dragging
                    widget.onDrag();

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



        $scope.switchStaticGrid = function() {

            //$scope.gridstack.static=!$scope.gridstack.static;
            //$scope.gridsterOpts.static=!$scope.gridsterOpts.static;

            //gridsterOpts.floating = !gridsterOpts.floating
            //gridsterOpts.pushing = !gridsterOpts.pushing
            //gridsterOpts.swapping = !gridsterOpts.swapping

            $scope.gridsterOpts.draggable.enabled = !$scope.gridsterOpts.draggable.enabled;
            $scope.gridsterOpts.resizable.enabled = !$scope.gridsterOpts.resizable.enabled;



        };
        $scope.removeWidget = function(w) {
            var index = $scope.widgets.indexOf(w);
            $scope.widgets.splice(index, 1);
        };
        $scope.onChange = function(event, items) {
            // console.log("onChange event: "+event+" items:"+items);
        };
        $scope.onDragStart = function(event, ui) {
            // console.log("onDragStart event: "+event+" ui:"+ui);
        };
        $scope.onDragStop = function(event, ui) {
            // console.log("onDragStop event: "+event+" ui:"+ui);
        };
        $scope.onResizeStart = function(event, ui) {
            // console.log("onResizeStart event: "+event+" ui:"+ui);
        };
        $scope.onResizeStop = function(event, ui) {
            console.log("onResizeStop event: ",event," ui:",ui);
            let widget=ui.element[0].attributes.getNamedItem("widget");
            console.log('wid',widget);
            console.log('wid',$scope.widgets);
            if (widget){
                widget.onResize()
            }
        };
        $scope.onItemAdded = function(item) {
            // console.log("onItemAdded item: "+item);
        };
        $scope.onItemRemoved = function(item) {
            // console.log("onItemRemoved item: "+item);
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



        $scope.initPivot = (meta,data) => {
            console.info('pivot');
            console.table(meta);

            let rows=[];
            let cols=[];
            angular.element("#pivotDiv").pivotUI(data, {
                dataClass: $.pivotUtilities.SubtotalPivotData,
                rows: rows,
                cols: cols,
                renderer: $.pivotUtilities.subtotal_renderers["Table With Subtotal"],
                rendererOptions: {
                    collapseRowsAt: 1,
                    collapseColsAt: 0
                }
            });
            $scope.ready.pivot=true;
        };

        $scope.initChart = (meta,data,query) => {

            let drawCommand=[];
            if ('drawCommand' in query)
            {
                drawCommand=query.drawCommand;
            }
            $scope.createChart(meta,data,drawCommand);
            $scope.ready.amchart=true;

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

        $scope.getChartGraph = (meta,chartSets) => {

            // SELECT number,sin(number),cos(number),number as `Title [asix=g2:column:blue]`  from system.numbers limit 40
                let showname=meta.name;
                let name=meta.name;
                let useaxis="v1";

                showname=showname.replace(/_axis\d+/gm,'');
                // showname=showname.replace(/_column\d+/gm,'');

                var re=/.*_axis(\d+).*/i;
                var axis = name.match(re);


                if (axis && axis[1])
                {
                    useaxis='v'+axis[1];
                }
                let f= {
                    "id": "g1",
                    "valueAxis": useaxis,
                    "fillAlphas": 0.2,
                    "bullet": "round",
                    "bulletSize": 8,
                    "hideBulletsCount": 50,
                    "lineThickness": 1,
                    "title": showname,
                    "useLineColorForBulletBorder": true,
                    "valueField": name,
                    "type": "smoothedLine",
                    "balloonText": "[[title]] [[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>"
                };

                if (!chartSets) chartSets={};

                return Object.assign(f,chartSets);
        };


        $scope.createChart= (meta,data,drawCommand)=> {

            // ['DROP', 'CREATE', 'ALTER'].indexOf(  item.query.keyword.toUpperCase()  ) != -1

            let chartSets={};
            drawCommand.forEach(i => {
                try {
                    if (i && !i.code) return;
                    let object=eval('('+i.code+')');
                    console.warn(object);

                    // получаем настройки по осям
                    meta.forEach((i) => {
                        // получаем ключь для каждой оси
                        if (object[i.name])
                        {
                            chartSets[i.name]=object[i.name];
                        }
                    });
                } catch (E) {
                    console.error('error eval ', i.code);
                }
            });





            let dataDateFormat=false;
            let categoryField="";
            let minPeriod='mm';//minute
            let graphs=[];
            let counter=0;
            let axes=[];
            meta.forEach((i) => {

                if (i.type=='DateTime') {
                    dataDateFormat="YYYY-MM-DD JJ:NN:SS";
                    categoryField=i.name;
                }else {
                    if (i.type=='Date') {
                        dataDateFormat="YYYY-MM-DD";
                        minPeriod='DD';
                        categoryField=i.name;
                    }
                    else {
                        if (!categoryField)
                        {
                            categoryField=i.name;
                            return;
                        }
                        counter=counter+1;
                        let g=$scope.getChartGraph(i,chartSets[i.name]);
                        g.id='g'+counter;


                        if (g.valueAxis!=='v1')
                        {
                            axes.push(g.valueAxis);
                        }
                        graphs.push(g);

                    }

                }


            });



            let theme='light';
            if (ThemeService.isDark()) {
                theme='dark';
            }
            //this all works:
            let obl={
                "color": ThemeService.isDark() ? '#eee' : '#333',
                "type": "serial",
                "theme": theme,
                "marginRight": 50,
                "marginLeft": 50,
                "startDuration": 0.4,
                // "handDrawn":true,
                "autoMarginOffset": 50,
                "autoResize":true,
                "marginBottom": 30,
                "marginsUpdated": true,
                "marginTop": 10,

                "categoryField": categoryField,

                "valueAxes": [ {
                    "id": "v1",
                    "axisAlpha": 1,
                    // "stackType": "100%",// "stackType": "regular",
                    "gridAlpha": 0.07,
                    "axisColor": ThemeService.isDark() ? '#eee' : '#333',
                    "gridColor": ThemeService.isDark() ? '#eee' : '#333',
                    // "axisThickness": 2,
                    // "position": "left",
                    "ignoreAxisWidth": true
                } ],

                "balloon": {  "borderThickness": 1,  "shadowAlpha": 0
                },

                "graphs": graphs ,
                "chartCursor": {
                    "valueLineEnabled": true,
                    "valueLineBalloonEnabled": true,
                    "cursorAlpha": 0,
                    "zoomable": false,
                    "valueZoomable": true,
                    "valueLineAlpha": 0.5
                },

                // "valueScrollbar": {
                    // "autoGridCount": true,
                    // "color": "#000000",
                    // "scrollbarHeight": 1
                // },

                "chartScrollbar": {
                    "graph":"g1",
                    "gridAlpha":0,
                    "color":"#888888",
                    "scrollbarHeight":25,
                    "backgroundAlpha":0,
                    "selectedBackgroundAlpha":0.1,
                    "selectedBackgroundColor":"#888888",
                    "graphFillAlpha":0,
                    "autoGridCount":true,
                    "selectedGraphFillAlpha":0,
                    "graphLineAlpha":0.2,
                    "graphLineColor":"#c2c2c2",
                    "selectedGraphLineColor":"#888888",
                    "selectedGraphLineAlpha":1
                },
                "categoryAxis": {
                    "dashLength": 1,
                    "minorGridEnabled": true,
                    "axisColor": ThemeService.isDark() ? '#eee' : '#333',
                    "gridColor": ThemeService.isDark() ? '#eee' : '#333'
                },
                "dataProvider": data,
                "legend": {
                    "align": "center",
                    "equalWidths": false,
                    "periodValueText": "total: [[value.sum]]",
                    "valueAlign": "left",
                    "valueText": "[[value]] ([[percents]]%)",
                    "valueWidth": 100
                }
            };


            if (dataDateFormat)
            {
                obl.dataDateFormat=dataDateFormat;
                obl.categoryAxis.parseDates=true;
                obl.categoryAxis.minPeriod=minPeriod;
            }

            if (axes)
            {
                let a_offset=0;
                axes.forEach((a) => {
                    a_offset++;
                    let ax=
                    {
                        "id": a,
                        "axisAlpha": 1,
                        "axisThickness": 1,
                        "position": "right",
                        "ignoreAxisWidth": true,
                        "offset": 1 * a_offset
                    };
                    obl.valueAxes.push(ax);
                });
            }




            console.info('valueAxes',obl.valueAxes);

            AmCharts.makeChart("myFirstChart", obl);
        };

    }
})(angular, smi2, window.AmCharts, window.$);
