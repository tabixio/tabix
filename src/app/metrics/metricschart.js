(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('MetricschartController', MetricschartController);
    MetricschartController.$inject = [
        '$scope',
        'API',
        'ThemeService',
        '$interval',
        'localStorageService',
        '$mdDialog',
        '$window'
    ];

    /**
     * @ngdoc controller
     * @description Login page controller
     */
    function MetricschartController($scope, API, ThemeService, $interval, localStorageService,$mdDialog,$window) {

        const LS_METRICA_INTERVAL_KEY = 'proc.metrica';
        const LS_METRICA_MAX_INTERVAL_KEY = 'proc.metrica_max';

        $scope.data=[];// основные данные

        $scope.metrcisChart=false;
        $scope.maxlength=localStorageService.get(LS_METRICA_MAX_INTERVAL_KEY) || 50;
        $scope.chartData={};
        $scope.orderKeys={};
        // настройки графики
        $scope.preState={};
        $scope.EChartOptions={
        };




        $scope.vars = {

            logEvents:false,
            initChart: false,
            isDark: ThemeService.isDark(),
            interval: localStorageService.get(LS_METRICA_INTERVAL_KEY) || -1,
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


        angular.element($window).bind('resize', function () {
            if ($scope.metrcisChart && $scope.vars.initChart)
                $scope.metrcisChart.resize();
        });
//x
        $scope.initChart = (d) => {


            // Если это первый запуск и данные есть в скоупе => инициализируемся
            // Если данных нет => выход
            // Есди уже проинициализированы => ?обновися?
            if ($scope.vars.initChart) {
                // console.log("initChart - eXISTS",$scope.vars.initChart);

                for(let key in d) {
                    if (key == 'time') continue;

                    if ($scope.chartData[key].length>$scope.maxlength) {
                        $scope.chartData[key].shift();
                        // $scope.chartData['bar_'+key].shift();
                    }

                    let v=parseInt(d[key]);
                    let diff=v-parseInt($scope.preState[key]);

                    $scope.chartData[key].push([    d.time,v  ]);
                    // $scope.chartData['bar_'+key].push([    d.time,diff]);
                    // console.log("diff",key,diff)
                }

                $scope.metrcisChart.setOption($scope.EChartOptions);

                $scope.preState=d;
                return;
            }

            // первая строка данных
            if (!d.time) return;
            $scope.preState=d;


            let grids = [];
            let xAxes = [];
            let yAxes = [];
            let series = [];
            let titles = [];
            let count = 0;

            let yAxesCount=0;


            for(let key in d) {
                if (key=='time') continue;




                // сохраним порядок осей
                $scope.orderKeys[key]=count;


                let val=parseInt(d[key]);


                $scope.chartData[key]=[];
                // $scope.chartData['bar_'+key]=[];
                $scope.chartData[key].push([d.time,val]);
                // $scope.chartData['bar_'+key].push([d.time,0]);

                // ------------------ Grids -------------
                grids.push({
                    show: true,
                    borderWidth: 0,
                    // backgroundColor: '#fff', // isDark?
                    // shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 2
                });
                // ------------------ Axes -------------
                xAxes.push({
                    // type: 'value',
                    show: false,
                    type: 'time',

                    splitLine: {
                        show: false
                    },

                    gridIndex: count
                });
                yAxes.push({
                    type: 'value',
                    show: false,
                    scale: true,
                    splitLine: {
                        show: false
                    },
                    name:'value',
                    // boundaryGap:true,
                    boundaryGap: [0, '100%'],
                    min: 'dataMin',
                    max: 'dataMax',
                    gridIndex: count
                });

                // -------------- TITLE --------------
                titles.push({
                    textAlign: 'center',
                    text: key,
                    textStyle: {
                        fontSize: 10,
                        fontWeight: 'normal'
                    }
                });
                // --------- series -----------------

                // пушим
                series.push({
                    name: key,
                    type: 'line',
                    data: $scope.chartData[key],
                    xAxisIndex: count,
                    yAxisIndex: yAxesCount,
                    showSymbol: false,
                    // animationEasing: key,
                    // animationDuration: 1000,
                    hoverAnimation: false,
                });
                // series.push(
                // {
                //     name: 'bar_'+key,
                //     type: 'bar',
                //     data: $scope.chartData['bar_'+key],
                //     xAxisIndex: count,
                //     yAxisIndex: yAxesCount+1,
                //     showSymbol: false,
                //     hoverAnimation: false,
                // }
                // );


                // ID оси
                count=count+1;
                // yAxesCount=yAxesCount+2;
                yAxesCount=yAxesCount+1;

            }

            let rowNumber = Math.ceil(Math.sqrt(count));
            // grids
            grids.forEach((grid,idx)=> {
                grid.left = ((idx % rowNumber) / rowNumber * 100 + 0.5) + '%';
                grid.top = (Math.floor(idx / rowNumber) / rowNumber * 100 + 0.5) + '%';
                grid.width = (1 / rowNumber * 100 - 2) + '%';
                grid.height = (1 / rowNumber * 100 - 2) + '%';

                titles[idx].left = parseFloat(grid.left) + parseFloat(grid.width) / 2 + '%';
                titles[idx].top = parseFloat(grid.top) + '%';
            });


            //titles
            let option = {
                version: 3,
                title: titles.concat([{
                    text: 'Metrics',
                    top: 'bottom',
                    left: 'center'
                }]),
                toolbox: {
                    show : true,
                    feature : {
                        saveAsImage : {show: true}
                    }
                },

                width:'100%',
                group:'group',
                grid: grids,
                xAxis: xAxes,
                yAxis: yAxes,
                series:series,

                tooltip: {
                    showDelay: 0,
                    backgroundColor: '#2c343c',
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        let date = new Date(params.value[0]);


                        let v=params.value[1];
                        let org=v;
                        if (params.seriesName.toLowerCase().includes('bytes'))
                        {
                            v=numbro(v).format('0.0000b');
                        }
                        else
                        {
                            if (v>10000)
                            {
                                v=numbro(v).format('0.0000a');
                            }

                        }
                        return params.seriesName+
                            "<br><br>"+
                            moment(date).format('h:mm:ss')+
                            ' <br><b>'+v+'</b><br>'+
                            (org!=v?'<br><b>'+org+"</b><br>":"");
                    },
                    axisPointer: {
                        animation: false
                    }
                },

            };

            $scope.vars.initChart=true;
            $scope.EChartOptions=Object.assign(option,$scope.EChartOptions);

            let theme='macarons';
            if (ThemeService.isDark()) theme='dark';

            // Draw Charts
            $scope.metrcisChart= echarts.init( document.querySelector( '#metrcisChart'  ), theme);
            $scope.metrcisChart.setOption($scope.EChartOptions);
            $scope.metrcisChart.resize();


        };


        let intervalHandle = null;

        $scope.$watch('vars.logEvents', function(){
            // изменился размер
            $scope.flushChart();
        }, true);


        /**
         *
         */
        $scope.flushChart = () => {
            // очистить полностью график

            if (!$scope.vars.initChart) return;

            // данные
            $scope.chartData={};
            // удалить echarts
            $scope.metrcisChart.dispose();
            // сбросить настройки
            $scope.EChartOptions={};
            // отправить на переинициализацию
            $scope.vars.initChart=false;

            $scope.load();
        };
        $scope.flush = () => {
            // очистить данные
            for(let key in $scope.chartData) {

                let len=$scope.chartData[key].length;
                for (let i = 0; i < len-2; i++) {
                    $scope.chartData[key].shift();
                    // $scope.chartData['bar_'+key].shift();
                }
            }

            $scope.metrcisChart.setOption($scope.EChartOptions);
            $scope.metrcisChart.resize();

            $scope.load();
        };


        /**
         *
         */
        $scope.load = () => {
            $scope.vars.loading=true;

            //

            let sql = ` SELECT metric,toInt64(value) as value,'metrics' as type FROM system.metrics ORDER BY metric `;
            sql+=` UNION ALL SELECT metric,toInt64(value) as value,'async' as type FROM system.asynchronous_metrics ORDER BY metric `;

            if ($scope.vars.logEvents) {
                sql=sql+` UNION ALL  SELECT event as metric, toInt64( value) as value,'events' as type FROM system.events ORDER BY metric`;
            }


            API.query(sql).then(function ( raw ) {
                $scope.vars.loading=false;
                // push data to scope
                let d={
                    time:Date.now()//Math.floor(Date.now() / 1000)
                };

                raw.data.forEach((cell) => {


                    let xx='';
                    if (cell.type=='events') {
                        xx=' ';
                    }

                    d[cell.metric+xx]=cell.value;
                });
                // инициализация графиков
                $scope.initChart(d);

            }, function ( response ) {
                $scope.vars.loading = false;
                console.error( 'Ошибка ' + response );
            });
        };

        $scope.setMaxlength = () => {
            localStorageService.set(LS_METRICA_MAX_INTERVAL_KEY, $scope.maxlength);
        };
        $scope.setInterval = () => {
            localStorageService.set(LS_METRICA_INTERVAL_KEY, $scope.vars.interval);
            if (intervalHandle) {
                $interval.cancel(intervalHandle);
                intervalHandle = null;
            }
            if ($scope.vars.interval > -1) {
                intervalHandle = $interval($scope.load, $scope.vars.interval * 1000);
            }
        };


        $scope.$on('$destroy', function() {
            $scope.vars.interval=-1;
            $interval.cancel(intervalHandle);
            $scope.setInterval();
        });

        // start
        $scope.load();


        if ($scope.vars.interval > -1) {
            $scope.setInterval();
        }

    }
})(angular, smi2);
