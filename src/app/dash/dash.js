(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('DashController', DashController);
    DashController.$inject = [
        '$scope',
        'API',
        'ThemeService',
        '$stateParams',
        'localStorageService',
        '$mdDialog',
        '$window',
        '$mdToast'

    ];


    function DashController($scope, API, ThemeService, $stateParams, localStorageService,$mdDialog,$window,$mdToast) {
        let { dashId} = $stateParams;

        $scope.dashId=dashId;
        $scope.widgets=[];
        //
        $scope.staticGrid=true;
        $scope.gridStackOptions={     cellHeight: 200,
            verticalMargin: 0,
            disableDrag:true,
            disableResize:true,
            staticGrid:true  };

        $scope.vars = {
            loaded:false,
            dash:{},
            show:false,
            uiTheme: ThemeService.themeObject,
            isDark:ThemeService.isDark(),
            dashInits:{},

        };
        /**
         * Привязка сетки
         */
        $scope.switchStaticGrid = function() {

            $scope.staticGrid=!$scope.staticGrid;
            console.info("staticGrid",$scope.staticGrid);

        };
        $scope.addFavorite=()=>{
            $mdToast.show(
                $mdToast
                    .simple()
                    .content('Favorite done')
                    .theme(ThemeService.theme)
                    .position('bottom right')
            );
        };
        $scope.saveState=()=>{
            $mdToast.show(
                $mdToast
                    .simple()
                    .content('Save done')
                    .theme(ThemeService.theme)
                    .position('bottom right')
            );
        };





        $scope.addWidget = (DataProvider) => {

        };


        $scope.loadWidget = (w,position_id,use_vars) => {
            // init Widget
            console.log('init Widget',position_id,w.id,w);
            API.getWidget(w.id,{vars:use_vars}).then(tsw=>{
                //
                console.log('Result',tsw);




                // grid {x:w.x,y:w.y,w:w.w,h:w.h}


                let dp= new DataProvider(tsw.data,'api');
                dp.progressQuery = tsw.sql;


                if (!tsw.draw) {

                    let ww=new WidgetTable(dp);
                    if (tsw.widget) ww.applySettings(tsw.widget);
                    $scope.widgets.push(ww);
                } else
                {
                    _.forEach(tsw.draw,function (drawObject,id) {
                        let ww=new WidgetDraw(dp,drawObject);
                        if (tsw.widget) ww.applySettings(tsw.widget);
                        $scope.widgets.push(ww);
                    });
                }
                $scope.$applyAsync();
            });



        };



        $scope.loadWidgets = ($widgets,use_vars) => {
            // init dash grid
            $scope.widgets=[];

            _.forEach($widgets,function (w,id) {
                $scope.loadWidget(w,id,use_vars);


                //
                //
                $scope.$applyAsync();
                //
                //

            });
        };


        $scope.init = () => {
            if (!$scope.dashId) return;

            let vars={};

            if ($scope.vars.dash && $scope.vars.dash.vars)
            {
                _.forEach($scope.vars.dash.vars,function (o,id) {

                    vars[id]=o.default;
                });
            }

            console.info("--------------------------- VARS -------------------------");
            console.table(vars);
            console.info("----------------------------------------------------------");

            API.getDashboard($scope.dashId,{vars:vars})  .then(data => {
                $scope.vars.loaded=true;
                console.info("initDash",data.dash);

                $scope.vars.dash=data.dash;
                $scope.loadWidgets(data.dash.widgets,vars);


            });

        };

        // base load
        $scope.init();






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

            if ($scope.preDashId)
            {
                delete $scope.listDashboards[$scope.preDashId];
                $scope.preDashId=0;
            }
        };
        $scope.loads = function() {
            $scope.vars.show=false;

            let dashID=Date.now();
            // $scope.listDashboards[dashID]={  widgets:[], title:"Dash "+dashID,   id : dashID ,GridStackOptions: { disableDrag:true, disableResize:true, verticalMargin: 1,  staticGrid:true    }  };
            // $scope.listDashboards[dashID].widgets=[];
            // $scope.dashInits[dashID]=false;

            //
            // if ($scope.preDashId)
            // {
            //     delete $scope.listDashboards[$scope.preDashId]
            //     $scope.preDashId=0;
            // }

            console.info("Before done",$scope.vars.counter,$scope.vars.show);
            let lx=$scope.size;
            if (lx>30000) lx=30000;
            API.fetchQuery("SELECT now(),number,sin(number),sin(number),SHA1(toString(number)),SHA1(toString(number)) as xx from system.numbers limit "+lx)
                .then(data => {
                    // // провайдер CH или API
                    let provider='ch';
                    // передаем в
                    let dp= new DataProvider(data,provider);
                    dp.progressQuery = "SQL";
                    let table=new WidgetTable(dp);


                    //
                    // // let ht = new HandsTable(this);

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
                    // $scope.hotTable.loadData(dp.data);
                    // console.info( 'MEMORY, used:'+numbro(window.performance.memory.usedJSHeapSize).format('0.000 b'),'total:'+numbro(window.performance.memory.totalJSHeapSize).format('0.000 b'));
                    //
                    // // console.info("Done",$scope.listDashboards);
                    // // hotInstance.htSettings.data
                    //

                    // $scope.vars.table.settings=table.table.settings;
                    // $scope.vars.table.data=table.data.data;
                    // $scope.hotTable.updateSettings(settings);
                    // $scope.w=table;
                    // $scope.wx=1;

                    $scope.w=table;
                    $scope.vars.show=true;
                    $scope.vars.counter++;
                    //
                    // $scope.listDashboards[dashID].widgets.push(table);
                    // $scope.preDashId=dashID;
                    // $scope.dashInits[dashID]=true;
                    // $scope.initDash(123);
                    // $scope.listDashboards[123].widgets=[];
                    // $scope.listDashboards[123].widgets.push(table);
                    console.info("Load done",$scope.vars.counter,$scope.vars.show);
                });

        };
        $scope._widgetsx=[];
        $scope.removeResult = (tab, dashid, event) => {
            event.stopPropagation();

            delete $scope.listDashboards[dashid];
        };


        $scope.inits = function() {
            $scope.listDashboards={};
            // $scope.listDashboards.push({  widgets:[], title:"Dash 123",   id : 123,GridStackOptions: { disableDrag:true, disableResize:true, verticalMargin: 1,  staticGrid:true    }  };);


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
