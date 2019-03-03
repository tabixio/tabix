(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('MergesController', MergesController);
    MergesController.$inject = [
        '$scope',
        'API',
        'ThemeService',
        '$interval',
        'localStorageService',
        '$mdDialog',
        'hotRegisterer'
    ];

    /**
     * @ngdoc controller
     */
    function MergesController($scope, API, ThemeService, $interval, localStorageService,$mdDialog,hotRegisterer) {

        const LS_INTERVAL_KEY = 'proc.interval';
        const LS_SORT_KEY = 'proc.key';


        $scope.widgets=[];

        $scope.staticGrid=true;
        $scope.gridStackOptions = {
            cellHeight: 200,
            verticalMargin: 0,
            disableDrag:true,
            disableResize:true,
            staticGrid:true
        };
        $scope.logData={};

        $scope.vars = {
            readOnlyRows : true,
            canShowTable : false,
            WidgetTable : false,
            queryesToKill:{},
            clusterMode: true,
            logMode : true,
            loading: false,

            isClusterLoad: false,
            clusterList: false,
            isDark: ThemeService.isDark(),
            sort: /^[a-z0-9_]+$/.test(localStorageService.get(LS_SORT_KEY)) ? localStorageService.get(LS_SORT_KEY) : null,
            interval: localStorageService.get(LS_INTERVAL_KEY) || -1,

        };





        let intervalHandle = null;

        // ------------------------------------------------------------------------------
        $scope.initClusterConfig = () => {
            //

            let sql = 'SELECT host_address,port FROM system.clusters GROUP BY host_address,port LIMIT 10';
            $scope.vars.clusterList = [];
            API.fetchQuery(sql).then(function (data) {
                data.data.forEach((cell) => {
                    $scope.vars.clusterList.push(cell.host_address + ':' + cell.port);

                });
                $scope.vars.isClusterLoad = true;
                console.log("Cluster nodes list", $scope.vars.clusterList.join(","));
                // then cluster load config
                $scope.load();
            }, function (response) {
                $scope.vars.isClusterLoad = true;
                console.error('Error ' + response);
            });
        };
        // ------------------------------------------------------------------------------
        $scope.flush = () => {
            $scope.logData={};
        };

        // ------------------------------------------------------------------------------
        $scope.megreProcessData = ($new) => {

            // @todo : logData ???? need merge and update `++count`
            $new.forEach((cell) => {
                if ($scope.logData[cell.hash])
                    {

                        let c=$scope.logData[cell.hash].count;

                        if ($scope.logData[cell.hash].initial_query_id!=cell.initial_query_id)
                        {
                            c=c+1;
                        }
                        cell.count=c;
                        $scope.logData[cell.hash]=cell;
                    } else
                    {
                        cell.count=1;
                        $scope.logData[cell.hash]=cell;

                    }



            });
            // let array = $.map($scope.logData, function(value, index) {
            //     return [value];
            // });

            return _.values($scope.logData);

        } ;

        // ------------------------------------------------------------------------------
        $scope.load = () => {
            console.info("Call load  processes");
            let sql = `SELECT *,cityHash64(result_part_name) as hash,hostName()`;


            if ($scope.vars.isClusterLoad && $scope.vars.clusterList ) {
                sql = sql + ` FROM remote('` + $scope.vars.clusterList.join(",") + `',system.merges, '` + API.getLogin() + `','` + API.getPassword() + `') `;
            }
            else {
                sql = sql + ` FROM system.merges `;
            }

            API.fetchQuery(sql).then(function ( queryResult ) {

                console.log('queryResult',queryResult);
                let $_dataProvider=new DataProvider(queryResult);
                if (!$scope.widgets[0])
                {
                    // make new WidgetTable

                    $_dataProvider.setColumnsHumanSort(['bytes','memory_usage','bytes_read','bytes_written']);
                    $_dataProvider.setSort('rows',-1);

                    $scope.widgets[0]=new WidgetTable($_dataProvider,false,12,9);
                    $_dataProvider.data.forEach((cell) => {
                        $scope.logData[cell.hash]=cell;
                    });
                }
                else {
                    // on update exists


                    if ($scope.vars.logMode) {
                        // if need merge data
                        $scope.widgets[0].updateData($scope.megreProcessData($_dataProvider.data));
                    } else {
                        // force reset data, no merge
                        $scope.widgets[0].updateData($_dataProvider.data);
                    }



                }


                $scope.vars.canShowTable=true;
                $scope.vars.data = true;
                $scope.vars.loading = false;

                $scope.$applyAsync();

            }, function ( response ) {
                $scope.vars.loading = false;
                console.error( 'Error ' + response );
            });
        };

        // ------------------------------------------------------------------------------
        $scope.setInterval = () => {

            localStorageService.set(LS_INTERVAL_KEY, $scope.vars.interval);

            if (intervalHandle) {
                $interval.cancel(intervalHandle);
                intervalHandle = null;
            }
            if ($scope.vars.interval > -1) {
                intervalHandle = $interval($scope.load, $scope.vars.interval * 1000);
            }
        };

        // ------------------------------------------------------------------------------
        $scope.$on('$destroy', function() {
            $scope.vars.interval=-1;
            $interval.cancel(intervalHandle);
            $scope.setInterval();
        });


        // ------------------------------------------------------------------------------
        // start
        $scope.initClusterConfig();



        if ($scope.vars.interval > -1) {
            $scope.setInterval();
        }


    }

})(angular, smi2);
