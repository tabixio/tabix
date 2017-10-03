(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('DashController', DashController);
    DashController.$inject = [
        '$scope',
        'API',
        'ThemeService',
        '$interval',
        'localStorageService',
        '$mdDialog',
        '$window',
        'hotRegisterer'
    ];


    function DashController($scope, API, ThemeService, $interval, localStorageService,$mdDialog,$window,hotRegisterer) {


        //
        $scope.vars = {
            uiTheme: ThemeService.themeObject,
            isDark:ThemeService.isDark(),
            table:{
                settings:{},
                data:[]
            }
        };

        $scope.initProcessesTab = (d) => {
            $scope.vars.active.Processes=true;
        };

        $scope.initChartTab = (d) => {
            $scope.vars.active.Chart=true;
        };

        $scope.initOverviewTab = (d) => {
            $scope.vars.active.Overview=true;
        };

        $scope.listDashboards =
                [
                    {
                        title:"Dash1",
                        id : 123,
                        widgets:[
                            {x: 0, y: 0, width: 1, height: 1},
                            { x:0, y:0, width:3, height:1 }
                        ]
                    },
                    {
                        title:"Dash2",
                        id : 432,
                        widgets:[
                            {x: 0, y: 0, width: 1, height: 1},
                            { x:0, y:0, width:3, height:1 }
                        ]
                    },

                ];
        $scope.size=10000;
        $scope.dashInits={};
        $scope.staticGrid=true;

        $scope.initDash = function(dashid) {

            if ($scope.dashInits[dashid]) return;

            $scope.dashInits[dashid]=1;

            console.info("initDash : "+dashid);
        };
        $scope.isInitDash = function (dashid) {

            return $scope.dashInits[dashid];
        };
        $scope.getGridStackOptions = function(dashid) {
            return $scope.listDashboards[dashid].GridStackOptions;
        };
        $scope.getWidgets = function(dashid) {
            console.info("getWidgets : "+dashid);
            return $scope.listDashboards[dashid].widgets;
        };
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }


        $scope.initWidgets = function(dashid) {

            let w={x: 0, y: 0, sizeX: 6, sizeY: 6};

            let dd=[];
            for (let i = 0; i < getRandomInt(30,4000); i++) {
                dd.push({'id':i,'sin':Math.sin(i),"cos":Math.cos(i)});

            }
            let d=DataProvider.convertArrayToDataProvider(dd,"statistics");
            d.sort="time";
            d.sortOrder="desc";

            $scope.listDashboards[dashid].widgets.push(new WidgetTable(d, false,12,2));
            let item={drawtype:'BAR'};
            $scope.listDashboards[dashid].widgets.push(new WidgetDraw(d,item,12,2));
        };

        $scope.killht = function() {
            if ($scope.hotTable)
            {
                $scope.hotTable.destroy();
            }
            $scope.hotTable=null;
        };
        $scope.hotTable = new Handsontable(document.getElementById('hotTable12341234'));
        $scope.loads = function() {
            API.fetchQuery("SELECT now(),number,sin(number),sin(number),SHA1(toString(number)),SHA1(toString(number)) as xx from system.numbers limit "+$scope.size)
                .then(data => {
                    console.info( 'MEMORY, used:'+numbro(window.performance.memory.usedJSHeapSize).format('0.000 b'),'total:'+numbro(window.performance.memory.totalJSHeapSize).format('0.000 b'));
                    let dashID=Date.now();
                    $scope.listDashboards[dashID]={  widgets:[], title:"Dash "+dashID,   id : dashID ,GridStackOptions: { disableDrag:true, disableResize:true, verticalMargin: 1,  staticGrid:true    }  };
                    // // провайдер CH или API
                    let provider='ch';
                    // передаем в
                    let dp= new DataProvider(data,provider);
                    dp.progressQuery = "SQL";
                    let table=new WidgetTable(dp);

                    //
                    // // let ht = new HandsTable(this);
                    // // $scope.listDashboards[dashID].widgets.push();

                    // let hotInstance = hotRegisterer.getInstance( 'hotTable12341234');
                    // settings.data=data.data;
                    //
                    // if ($scope.hotTable)
                    // {
                    //     $scope.hotTable.destroy();
                    //     $scope.hotTable=null;
                    // }
                    // // console.log($scope.vars.table);
                    // $scope.hotTable.updateSettings(table.table.settings);
                    $scope.hotTable.loadData(dp.data);
                    console.info( 'MEMORY, used:'+numbro(window.performance.memory.usedJSHeapSize).format('0.000 b'),'total:'+numbro(window.performance.memory.totalJSHeapSize).format('0.000 b'));
                    //
                    // // console.info("Done",$scope.listDashboards);
                    // // hotInstance.htSettings.data
                    //
                    // $scope.hotTable.updateSettings(settings);

                    console.info("Load done");
                });

        };
        $scope.removeResult = (tab, dashid, event) => {
            event.stopPropagation();

            delete $scope.listDashboards[dashid];
        };
        $scope.loads();
        $scope.inits = function() {
            $scope.listDashboards={};
            $scope.listDashboards[123]={  widgets:[], title:"Dash 123",   id : 123,GridStackOptions: { disableDrag:true, disableResize:true, verticalMargin: 1,  staticGrid:true    }  };

            //
            // $scope.listDashboards[22]={   title:"Dash 22",   id : 22,GridStackOptions: {  disableDrag:true, disableResize:true,verticalMargin: 1,  staticGrid:true    }  };

            // $scope.listDashboards[123].widgets=[];
            // $scope.listDashboards[22].widgets=[];
            // $scope.initWidgets(123);
            // $scope.initWidgets(22);
            // $scope.initWidgets(22);
            // $scope.initWidgets(22);
            //

            // add random dashboars
            // add random widgets

            // 1) Виджет будет содержать механимз update() по URL
            //    - widget.requestParams();
            //    - widget.update();
            // 2) Глобавльные входные настройки у дашборда

        };

        $scope.inits();


        $scope.moveWidget = function() {
            $scope.widgets[0].x = 1;
            $scope.widgets[0].width = 2;
            $scope.widgets[0].height = 2;
        };

        $scope.removeWidget = function(w) {
            var index = $scope.widgets.indexOf(w);
            $scope.widgets.splice(index, 1);
        };

        $scope.onChange = function(event, items) {
            console.log("onChange event: "+event+" items:"+items);
        };

        $scope.onDragStart = function(event, ui) {
            console.log("onDragStart event: "+event+" ui:"+ui);
        };

        $scope.onDragStop = function(event, ui) {
            console.log("onDragStop event: "+event+" ui:"+ui);
        };

        $scope.onResizeStart = function(event, ui) {
            console.log("onResizeStart event: "+event+" ui:"+ui);
        };

        $scope.onResizeStop = function(event, ui) {
            // console.log("onResizeStop ",event);
            // console.log("onResizeStop ",ui);
            // let el=ui.element.find( ".widget-selector" );
            // console.log("onResizeStop > EL  :",el);
            // console.log("onResizeStop > EL E:",el.events);
            // console.log("onResizeStop > EL W:",el.widget);
            // console.log("---------------- ");
            // console.log("---------------- ");
            // console.log("onResizeStop ",ui.element.getElementsByClassName("widget-selector")[0]);
            console.log("onResizeStop ",ui.size);

        };

        $scope.onItemAdded = function(item) {
            console.log("onItemAdded item: "+item);
        };

        $scope.onItemRemoved = function(item) {
            console.log("onItemRemoved item: "+item);
        };
    }
})(angular, smi2);
