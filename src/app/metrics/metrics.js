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

        $scope.data=[];// основные данные
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

        $scope.pushChartSeries = (data) => {


            // достаем
            let series=$scope.EChartOptions.series;

            for(let key in data) {
                if (key=='time') continue;

                let axixID=$scope.orderKeys[key];

            }
            // пушим
            series.push({
                name: name,
                type: 'line',
                xAxisIndex: count,
                yAxisIndex: count,
                data: data,
                showSymbol: false,
                animationEasing: name,
                animationDuration: 1000
            });

            // пишем
            $scope.EChartOptions.series=series;
        };



        $scope.initChart = () => {

console.log("initChart");
            // Если это первый запуск и данные есть в скоупе => инициализируемся
            // Если данных нет => выход
            // Есди уже проинициализированы => ?обновися?
            if ($scope.vars.initChart) {
                console.log("initChart - eXISTS",$scope.vars.initChart);
                return;
            }

            // первая строка данных
            let row=$scope.data[0];


            console.info(row);


            if (!row.time) return;

            let grids = [];
            let xAxes = [];
            let yAxes = [];
            let series = [];
            let titles = [];
            let count = 0;



            for(let key in row) {
                if (key=='time') continue;

                // ID оси
                count=count+1;
                // сохраним порядок осей
                $scope.orderKeys[key]=count;


                let val=row[key];
                // ------------------ Grids -------------
                grids.push({
                    show: true,
                    borderWidth: 0,
                    backgroundColor: '#fff', // isDark?
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 2
                });
                // ------------------ Axes -------------
                xAxes.push({
                    type: 'value',
                    show: false,
                    // min: 0,
                    // max: 1,
                    gridIndex: count
                });
                yAxes.push({
                    type: 'value',
                    show: false,
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
                    xAxisIndex: count,
                    yAxisIndex: count,
                    showSymbol: false,
                    animationEasing: key,
                    animationDuration: 1000
                });




            }

            //titles
            let option = {
                title: titles.concat([{
                    text: 'Metrics',
                    top: 'bottom',
                    left: 'center'
                }]),
                grid: grids,
                xAxis: xAxes,
                yAxis: yAxes,
                series:series
            };

            console.log("initChart-DONE");
            $scope.vars.initChart=true;
            $scope.EChartOptions=Object.assign(option,$scope.EChartOptions);

        };


        let intervalHandle = null;

        $scope.flush = () => {
            $scope.data=[];
        };
        $scope.load = () => {
            $scope.vars.loading=true;


            let sql = `SELECT * FROM system.metrics `;



            API.query(sql).then(function ( raw ) {
                $scope.vars.loading=false;
                // push data to scope
                let d={
                    time:Math.floor(Date.now() / 1000)
                };

                raw.data.forEach((cell) => {
                     // metric + value
                    d[cell.metric]=cell.value;
                });
                $scope.data.push(d); // ? А нужно ли ?
                // init chart
                console.log("$scope.data",$scope.data);

                // инициализация графиков
                $scope.initChart();

                // пихаем данные
                $scope.pushChartSeries(d);


            }, function ( response ) {
                $scope.vars.loading = false;
                console.error( 'Ошибка ' + response );
            });
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
