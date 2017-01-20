(( angular, smi2 ) => {
    'use strict';

    angular.module( smi2.app.name ).controller( 'SidebarController', SidebarController );
    SidebarController.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        'API',
        'ThemeService',
        '$mdSidenav'
    ];

    /**
	 * @ngdoc controller
	 * @name smi2.controller:SidebarController
	 * @description Контроллер бокового меню
	 */
    function SidebarController( $scope, $rootScope, $state, API, ThemeService, $mdSidenav ) {
        $scope.vars = {
            loaded: false,
            error: false,
            databases: [ ]
        };

        $scope.vars.scrollConfig = {
            autoHideScrollbar: false,
            theme: ThemeService.isDark( )
                ? 'light'
                : 'dark',
            scrollButtons: {
                enable: false
            },
            scrollInertia: 400,
            advanced: {
                updateOnContentResize: true
            }
        };

        $scope.vars.metis = {
            config: {
                toggle: true,
                preventDefault: false
            }
        };

        $scope.clickInsertField = field => {
            $rootScope.$emit('handleBroadcastInsertInActive', {value:field.name});
        };

        $scope.clickAndSelect = ( database, event ) => {
            if ( database.name == $rootScope.currentDatabase ) {
                event.stopPropagation( );
                return false;
            }
            $scope.selectDatabase( database );
        };

        /**
		 * Select database
		 */
        $scope.selectDatabase = database => {
            $rootScope.currentDatabase = database.name;
            $mdSidenav( 'tableSiedenav' ).close( );
        };

        /**
		* Open table in right sidebar
		*/
        $scope.openTable = ( table ) => {
            $mdSidenav( 'tableSiedenav' ).close( );
            $rootScope.currentTable = table.name;
            $mdSidenav( 'tableSiedenav' ).open( );
        };

        $rootScope.$on('handleBroadcastDatabases', function() {
            $scope.reLoad();
        });

        $scope.reLoad = () =>   {
            let list_all_fields=[];

            API.query( "SELECT * FROM system.columns" ).then(res => {
                let data = res.data || [ ];
                data.forEach((item) => {
                    if (!list_all_fields[item.database+'.'+item.table]) list_all_fields[item.database+'.'+item.table]=[];
                    list_all_fields[item.database+'.'+item.table].push({ name:item.name,type: item.type });
                });
                //database.table
                API.query( "SELECT database,name,engine FROM system.tables" ).then(res => {
                    let data = res.data || [ ];
                    $scope.vars.databases = data.reduce(( prev, item ) => {


                        let classEngine='';
                        if (item.engine.match(/Distributed.*/))  classEngine='soundcloud';
                        if (item.engine.match(/AggregatingMergeTree.*/))  classEngine='cube';
                        if (item.engine.match(/MaterializedView.*/))  classEngine='border-bottom';
                        if (item.engine.match(/SummingMergeTree.*/))  classEngine='table-row-plus-after';
                        if (item.engine.match(/CollapsingMergeTree.*/))  classEngine='table-row-height';
                        if (item.engine.match(/$Merge^/))  classEngine='source-fork';

                        item.classEngine=classEngine;

                        for ( let a of prev ) {
                            if ( item.name !=='-' && a.name == item.database ) {
                                a.tables.push({ name: item.name,engine : item.engine,classEngine:item.classEngine,fields:list_all_fields[item.database+'.'+item.name] });
                                return prev;
                            }
                        }

                        return [
                            ...prev, {
                                name: item.database,
                                tables: [
                                    {
                                        name: item.name,
                                        engine : item.engine,
                                        classEngine : item.classEngine,
                                        fields:list_all_fields[item.database+'.'+item.name]
                                    }
                                ]
                            }
                        ];

                    }, [ ]);


                    $scope.selectDatabase($scope.vars.databases[0]);

                    // отдельно получаем список баз данных - если база пустая
                    API.query( "SELECT name FROM system.databases" ).then(res => {
                        let data = res.data || [];
                        data.forEach((item) => {
                            let find=false;
                            $scope.vars.databases.forEach((dbitem) => {
                                if (dbitem.name==item.name)
                                {
                                    find=true;
                                }
                            });
                            if (!find)
                            {
                                $scope.vars.databases.push({name:item.name,tables:[]});
                            }

                        });

                        $scope.vars.loaded = true;
                        $scope.vars.error = false;
                    }, () => {
                        $scope.vars.loaded = true;
                        $scope.vars.error = true;
                    });

                }, () => {
                    $scope.vars.loaded = true;
                    $scope.vars.error = true;
                });
            }, () => {
                $scope.vars.loaded = true;
                $scope.vars.error = true;
            });
        };

        $scope.reLoad();
    }
})( angular, smi2 );
