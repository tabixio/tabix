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
            loading:false,
            show:false,
            counter:0,
            uiTheme: ThemeService.themeObject,
            isDark:ThemeService.isDark(),
            table:{
                settings:{},
                data:[]
            },
            dashInits:{},

        };
        $scope.code='{code:1}';
        $scope.size=100;
        $scope.w=false;
        $scope.preDashId=0;

        function PlotlyEditorController($scope, $mdDialog)
        {
            $scope.code='{zzZ:2}';
            $scope.editor=false;
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };


            $scope.applyCode=()=>{

                console.log('applyCODE');

            };
            $scope.aceLoadedEditor=(editor)=>{
                $scope.editor=editor;
                console.warn('aceLoadedEditor');
                editor.$blockScrolling = Infinity;
                editor.session.setUseWrapMode(true);
                editor.setOptions({
                    fontSize: '14px',
                    enableBasicAutocompletion : true,
                    behavioursEnabled:true ,
                    wrapBehavioursEnabled:true ,
                    highlightSelectedWord:true ,
                    showGutter:true ,
                    enableLiveAutocompletion:true,
                    liveAutocompletionDelay: 500,
                    liveAutocompletionThreshold: 1
                });
                editor.commands.addCommand({
                    name: 'runCurrentCommand',
                    bindKey: {
                        win: 'Ctrl-Enter',
                        mac: 'Command-Enter'
                    },
                    exec: () => {
                        $scope.applyCode();
                    }
                });

                editor.setTheme('ace/theme/cobalt');
                editor.setValue('{}');
                editor.clearSelection();
                editor.focus();
                editor.selection.moveTo(0, 0);
                editor.session.setMode({
                    path: "ace/mode/javascript",
                });
            };
        }

        $scope.openEditor = (w) =>{
            $mdDialog.show({
                controller: PlotlyEditorController,
                templateUrl: 'app/sql/PlotlyEditor.tmpl.html',
                parent: angular.element(document.body),
                locals: {w:w}
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });


        };

        $scope.openEditor({});

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
