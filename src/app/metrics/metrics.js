(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('MetricsController', MetricsController);
    MetricsController.$inject = [
        '$scope',
        'API',
        'ThemeService',
        '$interval',
        'localStorageService',
        '$mdDialog'
    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:LoginController
     * @description Login page controller
     */
    function MetricsController($scope, API, ThemeService, $interval, localStorageService,$mdDialog) {

        const LS_METRICA_INTERVAL_KEY = 'proc.metrica';
        const LS_METRICA_MAX_INTERVAL_KEY = 'proc.metrica_max';

        $scope.data=[];// основные данные

        $scope.metrcisChart=false;
        $scope.maxlength=localStorageService.get(LS_METRICA_MAX_INTERVAL_KEY) || 600;
        $scope.chartData={};
        $scope.orderKeys={};
        // настройки графики
        $scope.EChartOptions={





        };




        $scope.vars = {


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
                    }
                    $scope.chartData[key].push([    d.time,parseInt(d[key])  ]);
                }

                $scope.metrcisChart.setOption($scope.EChartOptions);
                $scope.metrcisChart.resize();

                return;
            }

            // первая строка данных
            // console.log("initChart",d);


            if (!d.time) return;

            let grids = [];
            let xAxes = [];
            let yAxes = [];
            let series = [];
            let titles = [];
            let count = 0;
            let xAxisIndex=[];


            for(let key in d) {
                if (key=='time') continue;




                // сохраним порядок осей
                $scope.orderKeys[key]=count;


                let val=parseInt(d[key]);


                $scope.chartData[key]=[];
                $scope.chartData[key].push([d.time,val]);

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
                    // min: 0,
                    // max: 1,
                    gridIndex: count
                });
                yAxes.push({
                    type: 'value',
                    show: false,
                    splitLine: {
                        show: false
                    },
                    boundaryGap: [0, '100%'],
                    // min: -0.4,
                    // max: 1.4,
                    gridIndex: count
                });
                // -------------- TITLE --------------
                titles.push({
                    textAlign: 'center',
                    text: key,
                    textStyle: {
                        fontSize: 12,
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
                    yAxisIndex: count,
                    showSymbol: false,
                    // animationEasing: key,
                    // animationDuration: 1000,
                    hoverAnimation: false,
                });


                xAxisIndex.push(count);
                // ID оси
                count=count+1;

            }


            let rowNumber = Math.ceil(Math.sqrt(count));



            grids.forEach((grid,idx)=> {
                grid.left = ((idx % rowNumber) / rowNumber * 100 + 0.5) + '%';
                grid.top = (Math.floor(idx / rowNumber) / rowNumber * 100 + 0.5) + '%';
                grid.width = (1 / rowNumber * 100 - 1) + '%';
                grid.height = (1 / rowNumber * 100 - 1) + '%';

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
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        xAxisIndex: xAxisIndex
                    }
                ],
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


                        return params.seriesName+"<br>"+moment(date).format('h:mm:ss')+' = <b>' + params.value[1]+'</b>';
                    },
                    axisPointer: {
                        animation: false
                    }
                },

            };


            $scope.vars.initChart=true;
            $scope.EChartOptions=Object.assign(option,$scope.EChartOptions);

            // console.log("initChart-DONE",$scope.EChartOptions);


            let theme='macarons';
            if (ThemeService.isDark()) theme='dark';




            $scope.metrcisChart= echarts.init( document.querySelector( '#metrcisChart'  ), theme);
            $scope.metrcisChart.setOption($scope.EChartOptions);
            $scope.metrcisChart.resize();


        };


        let intervalHandle = null;

        $scope.flush = () => {
            $scope.data=[];
        };
        $scope.load = () => {
            $scope.vars.loading=true;


            let sql = `SELECT * FROM system.metrics ORDER BY metric `;



            API.query(sql).then(function ( raw ) {
                $scope.vars.loading=false;
                // push data to scope
                let d={
                    time:Date.now()//Math.floor(Date.now() / 1000)
                };

                raw.data.forEach((cell) => {
                     // metric + value
                    d[cell.metric]=cell.value;
                });
                // $scope.data.push(d); // ? А нужно ли ?
                // init chart
                //console.log("$scope.data",$scope.data);

                // инициализация графиков
                $scope.initChart(d);

                // пихаем данные
                // $scope.pushChartSeries(d);
                //console.log($scope.EChartOptions);


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
