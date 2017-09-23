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
        '$window'
    ];


    function DashController($scope, API, ThemeService, $interval, localStorageService,$mdDialog,$window) {


        //
        $scope.vars = {
            uiTheme: ThemeService.themeObject,
            isDark:ThemeService.isDark(),
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

        $scope.options = {
            cellHeight: 200,
            cellWidth: 200,
            verticalMargin: 1
        };

        $scope.dashInits={};


        $scope.initDash = function(dashid) {

            if ($scope.dashInits[dashid]) return;

            $scope.dashInits[dashid]=1;

            console.info("initDash : "+dashid);
        };
        $scope.isInitDash = function (dashid) {

            return $scope.dashInits[dashid];
        };
        $scope.getWidgets = function(dashid) {
            console.info("getWidgets : "+dashid);
            let w= $scope.listDashboards[dashid].widgets;
            console.log(w);
            return w
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

            $scope.listDashboards[dashid].widgets.push(new WidgetTable(d, false));
        };

        $scope.inits = function() {

            $scope.listDashboards={};
            $scope.listDashboards[123]={   title:"Dash 123",   id : 123,  };
            $scope.listDashboards[22]={   title:"Dash 22",   id : 22,  };

            $scope.listDashboards[123].widgets=[];
            $scope.listDashboards[22].widgets=[];
            $scope.initWidgets(123);
            $scope.initWidgets(22);
            $scope.initWidgets(22);
            $scope.initWidgets(22);


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
