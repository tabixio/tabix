((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).controller('FooterCtrl', FooterController);
    FooterController.$inject = [
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
     * @name smi2.controller:FooterCtrl
     * @description SQL controller data
     */
    function FooterController($scope,
                           $rootScope,
                           $window,
                           localStorageService,
                           API,
                           $mdSidenav,
                           $mdDialog,
                           $mdToast,
                              ThemeService) {


        $scope.amChartOptions = false;
        $scope.vars = {
            rsw: 0,
            uiTheme: ThemeService.themeObject,
            isChartReady:false,
            stackType:'false'

        };

        $scope.initPivot = (meta,data) => {
            console.info('pivot');
            console.table(meta);
        };

        $scope.initChart = (meta,data) => {
            console.info('chart');
            console.table(meta);

            $scope.createChart(meta,data);



        };
        $scope.getChartGraph = (meta) => {

                let showname=meta.name;
                let name=meta.name;
                let useaxis="v1";

                showname=showname.replace(/_axis\d+/gm,'');
                var re=/.*_axis(\d+).*/i;
                var axis = name.match(re);


                if (axis && axis[1])
                {
                    useaxis='v'+axis[1];
                }
                return {
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
                    "balloonText": "[[title]] [[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                }
        }
        $scope.createChart= (meta,data)=> {

            // ['DROP', 'CREATE', 'ALTER'].indexOf(  item.query.keyword.toUpperCase()  ) != -1

            let dataDateFormat="YYYY-MM-DD JJ:NN:SS";
            let categoryField="event_time";
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
                        counter=counter+1;
                        let g=$scope.getChartGraph(i);
                        g.id='g'+counter;


                        if (g.valueAxis!=='v1')
                        {
                            axes.push(g.valueAxis);
                        }
console.warn(g);
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
                "type": "serial",
                "theme": theme,
                // "marginRight": 40,
                // "marginLeft": 40,
                // "startDuration": 0.4,
                // "handDrawn":true,
                "autoMarginOffset": 30,
                "autoResize":true,
                // "marginBottom": 30,
                "marginsUpdated": true,
                // "marginTop": 10,

                "dataDateFormat": dataDateFormat,
                "categoryField": categoryField,

                "valueAxes": [ {
                    "id": "v1",
                    "axisAlpha": 1,
                    // "stackType": "100%",// "stackType": "regular",
                    "gridAlpha": 0.07,

                    // "axisColor": "#FF6600",
                    // "axisThickness": 2,

                    "position": "left",
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

                "valueScrollbar": {
                    "autoGridCount": true,
                    "color": "#000000",
                    "scrollbarHeight": 1
                },

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
                    "parseDates": true,
                    'minPeriod':minPeriod,
                    "dashLength": 1,
                    "minorGridEnabled": true
                },
                "dataProvider": data,
                "legend": {
                    "align": "center",
                    "equalWidths": false,
                    "periodValueText": "total: [[value.sum]]",
                    "valueAlign": "left",
                    "valueText": "[[value]] ([[percents]]%)",
                    "valueWidth": 100
                },
            };
            if (axes)
            {
                axes.forEach((a) => {
                    let ax=
                    {
                        "id": a,
                        "axisAlpha": 1,
                        "axisThickness": 1,
                        "position": "rigth",
                        "ignoreAxisWidth": true
                    };
                    obl.valueAxes.push(ax);
                });
            }

            obl={};
            console.info(obl);

            var chart = AmCharts.makeChart("myFirstChart", obl);
        }

    }
})(angular, smi2);
