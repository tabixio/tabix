(( angular, smi2 ) => {
    'use strict';

    angular.module( smi2.app.name ).controller( 'SidebarController', SidebarController );
    SidebarController.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        'API',
        'ThemeService',
        '$mdSidenav', '$mdToast', '$timeout'

    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:SidebarController
     * @description Контроллер бокового меню
     */
    function SidebarController($scope, $rootScope, $state, API, ThemeService, $mdSidenav, $mdToast, $timeout) {
        $scope.vars = {
            searchline:'',
            counter: 0,
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
                toggle: false,
                preventDefault: false
            }
        };

        $scope.$watch('vars.searchline', curr => {
            if (curr.length < 2) {
                // reset
                // console.warn("reset, search box");
                $scope.vars.databases.forEach((dbase,i_db) => {
                    $scope.vars.databases[i_db].active=true;

                    dbase.tables.forEach((table, i_tab) => {
                        $scope.vars.databases[i_db].tables[i_tab].active=true;

                        table.fields.forEach((field, i_fld) => {
                            $scope.vars.databases[i_db].tables[i_tab].fields[i_fld].active=true;
                        });
                    });
                });
            } else {
                $scope.filterCompletions(curr);
            }


            $timeout(function () {
                $('#sideBarMetismenu').metisMenu();
            }, 250)

        });

        $scope.clickInsertField = field => {
            $rootScope.$emit('handleBroadcastInsertInActive', {value:" "+field.name+",\n"});
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

            $mdToast.show(
                $mdToast
                    .simple()
                    .content('USE '+database.name+' database')
                    .theme(ThemeService.theme)
                    .position('bottom right')
            );

            $mdSidenav( 'tableSiedenav' ).close( );
        };

        /**
        * Open table in right sidebar
        */
        $scope.openTable = ( table ) => {
            $mdSidenav( 'tableSiedenav' ).close( );

            if ($rootScope.currentDatabase != table.database)
            {

                $mdToast.show(
                    $mdToast
                        .simple()
                        .content('USE '+table.database+' database')
                        .theme(ThemeService.theme)
                        .position('bottom right')
                );


                $rootScope.currentDatabase = table.database;

            }

            $rootScope.currentTable = table.name;
            $mdSidenav( 'tableSiedenav' ).open( );
        };

        $rootScope.$on('handleBroadcastDatabases', function() {
            $scope.reLoad();
        });

        $scope.filterCompletions = function( needle) {
            console.log(">>>filterCompletions",needle);

            // Базовый алгоритм поиска в дереве обьектов
            let results = {};
            let upper = needle.toUpperCase();
            let lower = needle.toLowerCase();

            loop: $scope.vars.databases.forEach((dbase,i_db) => {
                dbase.tables.forEach((table,i_tab) =>{
                    table.fields.forEach((field,i_fld) =>{

                        let item={};
                        let caption=table.name+'.'+field.name;

                        if (!caption) return;
                        let lastIndex = -1;
                        let matchMask = 0;
                        let penalty = 0;
                        let index, distance;


                        // caption char iteration is faster in Chrome but slower in Firefox, so lets use indexOf
                        for (let j = 0; j < needle.length; j++) {
                            // TODO add penalty on case mismatch
                            let i1 = caption.indexOf(lower[j], lastIndex + 1);
                            let i2 = caption.indexOf(upper[j], lastIndex + 1);
                            index = (i1 >= 0) ? ((i2 < 0 || i1 < i2) ? i1 : i2) : i2;
                            if (index < 0) {
                                return;
                            }
                            distance = index - lastIndex - 1;
                            if (distance > 0) {
                                // first char mismatch should be more sensitive
                                if (lastIndex === -1)
                                    penalty += 10;
                                penalty += distance;
                            }
                            matchMask = matchMask | (1 << index);
                            lastIndex = index;
                        }
                        item.matchMask = matchMask;
                        item.exactMatch = penalty ? 0 : 1;
                        item.score = (item.score || 0) - penalty;
                        item.dbase=dbase.name;
                        item.table=table.name;
                        item.field=field.name;

                        if (!results[i_db]) results[i_db]={};
                        if (!results[i_db][i_tab]) results[i_db][i_tab]={};
                        results[i_db][i_tab][i_fld]=item;
                    });
                });
            });//forEach

            $scope.vars.databases.forEach((dbase,i_db) => {
                if (results[i_db]) {
                    $scope.vars.databases[i_db].active=true;
                } else {
                    $scope.vars.databases[i_db].active=false;
                }

                dbase.tables.forEach((table, i_tab) => {

                    if (results[i_db] && results[i_db][i_tab]) {
                        $scope.vars.databases[i_db].tables[i_tab].active=true;
                    } else {
                        $scope.vars.databases[i_db].tables[i_tab].active=false;
                    }

                    table.fields.forEach((field, i_fld) => {
                        if (results[i_db] && results[i_db][i_tab] && results[i_db][i_tab][i_fld]) {
                            $scope.vars.databases[i_db].tables[i_tab].fields[i_fld].active=true;
                        } else {
                            $scope.vars.databases[i_db].tables[i_tab].fields[i_fld].active=false;
                        }
                    });
                });
            });
        };

        //gets triggered when an item in the context menu is selected
        $scope.rightMenuProcessTable = function(obj){

            let table=obj.item.name;
            let db=obj.item.database;
            if(obj.key == "OpenTables"){
                // тут можно что то  получше чем location
                window.location = '/#/database/' + db + '/table/' + table;

            } else if(obj.key == "InsertDescribe"){
               API.query( 'SELECT * FROM system.columns WHERE database=\'' + db + '\' AND table=\'' + table+'\'' ).then( data =>{

                   let fields=[];
                   let where=[];

                   data.data.forEach(item => {
                       fields.push(item.name);
                       if (item.type=='Date') {
                           where.push(item.name+'=today()');
                       }
                   });

                   if (table.indexOf('.') !== -1) table='"'+table+'"';


                   let sql="\nSELECT\n\t"+fields.join(",\n\t")+"\nFROM\n\t"+db+'.'+table+"\n";

                   if (where.length) {
                       sql=sql+"\nWHERE\n\t"+where.join("\n AND \n");
                   }
                   sql=sql+"\nLIMIT 100\n\n";

                   console.log(sql);
                   // вставка текста в активное окно редактора там где курсор, см SQL.JS
                    $rootScope.$emit('handleBroadcastInsertInActive', {value:sql});
                });
            }
        };

        $scope.reLoad = () =>   {
            let list_all_fields=[];

            $scope.vars.loaded = false;
            $scope.vars.error = false;

            $scope.vars.databases = [];

            API.query( "SELECT * FROM system.columns" ).then(res => {
                let data = res.data || [ ];
                data.forEach((item) => {




                    if (!list_all_fields[item.database+'.'+item.table]) list_all_fields[item.database+'.'+item.table]=[];
                    list_all_fields[item.database+'.'+item.table].push({ name:item.name,type: item.type,active:true });
                });
                //database.table
                API.query( "SELECT database,name,engine FROM system.tables" ).then(res => {
                    let data = res.data || [ ];
                    $scope.vars.databases = data.reduce(( prev, item ) => {

                        let  rightMenuListTable = [
                            {active: true, value: 'Open table',key:'OpenTables',icon:'arrow-expand',item:item},
                            {active: true, value: 'Code Select from',key:'InsertDescribe',icon:'format-size',item:item}
                        ];

                        let classEngine='';
                        if (item.engine.match(/Dictionary.*/))  classEngine='library';
                        if (item.engine.match(/Distributed.*/))  classEngine='soundcloud';
                        if (item.engine.match(/AggregatingMergeTree.*/))  classEngine='cube';
                        if (item.engine.match(/MaterializedView.*/))  classEngine='border-bottom';
                        if (item.engine.match(/SummingMergeTree.*/))  classEngine='table-row-plus-after';
                        if (item.engine.match(/CollapsingMergeTree.*/))  classEngine='table-row-height';
                        if (item.engine.match(/$Merge^/))  classEngine='source-fork';
                        item.active=true;
                        item.classEngine=classEngine;
                        item.rightMenuListTable=rightMenuListTable;

                        for ( let a of prev ) {
                            if ( item.name !=='-' && a.name == item.database ) {
                                a.tables.push(
                                        {
                                                active:true,
                                                database:item.database,
                                                name: item.name,
                                                engine : item.engine,
                                                classEngine:item.classEngine,
                                                fields:list_all_fields[item.database+'.'+item.name],
                                                rightMenuList:item.rightMenuListTable
                                        }
                                );
                                return prev;
                            }
                        }

                        return [
                            ...prev, {
                                name: item.database,
                                tables: [
                                    {
                                        active:true,
                                        database:item.database,
                                        name: item.name,
                                        engine : item.engine,
                                        classEngine : item.classEngine,
                                        rightMenuList:item.rightMenuListTable,
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
                                if (dbitem.name==item.name) {
                                    find=true;
                                }

                            });
                            if (!find) {
                                $scope.vars.databases.push({
                                    name:item.name,
                                    // rightMenuList:rightMenuListDatabases,
                                    tables:[],
                                    active:true
                                });
                            }
                        });
                        $scope.vars.loaded = true;
                        $scope.vars.error = false;
                    }, () => {
                        $scope.vars.loaded = true;
                        $scope.vars.error = true;
                    });

                    // ----- done - reRender metisMenu

                    $timeout(function () {
                        $('#sideBarMetismenu').metisMenu();
                    }, 250)


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
