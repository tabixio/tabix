(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('ProcessesController', ProcessesController);
    ProcessesController.$inject = [
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
    function ProcessesController($scope, API, ThemeService, $interval, localStorageService,$mdDialog,hotRegisterer) {

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
            let sql = `SELECT  now() as dt, query,  1 as count,
                toUInt64(toUInt64(read_rows) + toUInt64(written_rows)) as rows,
                round(elapsed,1) as elapsed ,
                formatReadableSize(toUInt64(read_bytes)+toUInt64(written_bytes)) as bytes, 
                formatReadableSize(memory_usage) as memory_usage,
                formatReadableSize(read_bytes) as bytes_read,
                formatReadableSize(written_bytes) as bytes_written,  
                * ,     
                cityHash64(query) as hash,  
                hostName()`;


            if ($scope.vars.isClusterLoad && $scope.vars.clusterList && $scope.vars.clusterMode) {
                sql = sql + ` FROM remote('` + $scope.vars.clusterList.join(",") + `',system.processes, '` + API.getLogin() + `','` + API.getPassword() + `') `;
            }
            else {
                sql = sql + ` FROM system.processes `;
            }

            // исключить запрос
            sql=sql+" /* 12XQWE3X1X2XASDF */ WHERE query not like '%12XQWE3X1X2XASDF%'";
            if ($scope.vars.readOnlyRows)
            {
                sql=sql+' AND read_rows>0';
            }
            API.fetchQuery(sql).then(function ( queryResult ) {

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


        // ------- KILL QUERY --------
        //
        // 1	is_initial_query	UInt8
        // 2	user	String
        // 3	query_id	String
        // 4	address	String
        // 5	port	UInt16
        // 6	initial_user	String
        // 7	initial_query_id	String
        // 8	initial_address	String
        // 9	initial_port	UInt16
        // 10	interface	UInt8
        // 11	os_user	String
        // 12	client_hostname	String
        // 13	client_name	String
        // 14	client_version_major	UInt64
        // 15	client_version_minor	UInt64
        // 16	client_revision	UInt64
        // 17	http_method	UInt8
        // 18	http_user_agent	String
        // 19	quota_key	String
        // 20	elapsed	Float64
        // 21	read_rows	UInt64
        // 22	read_bytes	UInt64
        // 23	total_rows_approx	UInt64
        // 24	written_rows	UInt64
        // 25	written_bytes	UInt64
        // 26	memory_usage	Int64
        // 27	query	String
        $scope.dialogKill = function(ev) {
            let sql = `SELECT now() as dt,query,1 as count,
                
                formatReadableSize(read_bytes) as read_bytes, 
                formatReadableSize(written_bytes) as written_bytes, 
                formatReadableSize(memory_usage) as memory_usage,
                read_rows,written_rows,
                
                query_id as hash,
                round(elapsed,4) as elapsed 
            FROM system.processes /* 12XQWE3X1X2XASDF */ WHERE query not like '%12XQWE3X1X2XASDF%' ORDER BY elapsed DESC`;

            API.fetchQuery(sql).then(function ( data ) {

                $mdDialog.show({
                    controller: function($scope){
                        $scope.queryesToKill=data.data;
                        $scope.kill = function(q) {
                            // Appending dialog to document.body to cover sidenav in docs app
                            let sqlKill='KILL QUERY WHERE query_id=\''+q.hash+'\' SYNC';

                            let confirm = $mdDialog.confirm()
                                .title(sqlKill+' ?')
                                .textContent(q.query)
                                .ariaLabel('Lucky day')
                                .targetEvent(ev)
                                .ok('Please do it!')
                                .cancel('Sounds like a scam');

                            $mdDialog.show(confirm).then(function() {



                                //
                                API.fetchQuery(sqlKill,false).then(function ( killdata ) {

                                    $mdDialog.show(
                                        $mdDialog.alert()
                                            .clickOutsideToClose(true)
                                            .title('Result: '+sqlKill)
                                            .textContent(killdata)
                                            .ariaLabel('Alert')
                                            .ok('Ok!')
                                            .targetEvent(ev)
                                    );
                                }, (response) => {
                                    $mdDialog.show(
                                        $mdDialog.alert()
                                            .clickOutsideToClose(true)
                                            .title("Error: "+sqlKill)
                                            .textContent(response.data)
                                            .ariaLabel('Error on Kill')
                                            .ok('Ok!')
                                            .targetEvent(ev)
                                    );
                                });

                            }, function() {
                                // cancel
                            });
                        };
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };
                    },
                    templateUrl: 'app/metrics/dialog.kill.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });

            });

        };

    }

})(angular, smi2);
