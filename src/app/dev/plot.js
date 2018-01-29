(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('devplotController', devplotController);
    devplotController.$inject = [
        '$scope',
        'API',
        'ThemeService',
        '$interval',
        'localStorageService',
        '$mdPanel',
        '$window',
        'hotRegisterer'
    ];


    function devplotController($scope, API, ThemeService, $interval, localStorageService,$mdPanel,$window,hotRegisterer) {

        $scope.w=false;
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
//
//         $scope.code=`{
// trace:{x:data.number,y:data.s,type:'scatter',name:'sin()'},
// trace1:{x:data.number,y:data.c,type:'scatter',name:'cos()'}
// }
// `;
//
//
//
//
        $scope.code=' {  } ';
        function PlotlyEditorController(mdPanelRef,$widget)
        {


            this.close=function() {
                if (mdPanelRef) mdPanelRef.close();
            };
            this.getInitCode=()=>{
                return $widget.getCode();
            };
            this.applyCode=(code)=>{
                $widget.updateCode(code);
            };
            this.aceChange=(session)=>{
                this.code=session.getValue();
                this.applyCode(this.code);
            };
            this.code='';
            this.editor=false;
            this.aceLoadedEditor=(editor)=>{
                this.editor=editor;
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

                this.code=this.getInitCode();

                editor.setValue(this.code);
                editor.clearSelection();
                editor.focus();
                editor.selection.moveTo(0, 0);
                editor.session.setMode({
                    path: "ace/mode/javascript",
                });
            };
        }

        $scope.openEditor = (w) =>{
            let position = $mdPanel.newPanelPosition() .absolute() .right()  .top();
            $mdPanel.open({
                controller: PlotlyEditorController,
                templateUrl: 'app/sql/PlotlyEditor.tmpl.html',
                attachTo: angular.element(document.body),
                position:position,
                panelClass: 'demo-dialog-example',
                trapFocus: true,
                zIndex: 150,
                clickOutsideToClose: true,
                clickEscapeToClose: true,
                hasBackdrop: true,
                controllerAs: 'ctrl',
                locals:{
                    '$widget':w
                },
            });

        };

        $scope.openEditorWidget = () => {
            $scope.openEditor($scope.w.draw);
        };





        $scope.loads = function() {
            $scope.vars.show=false;

            let lx=230;

            API.fetchQuery("SELECT number,sin(number) as s,cos(number) as c from system.numbers limit "+lx)
                .then(data => {
                    // // провайдер CH или API
                    let provider='ch';
                    // передаем в
                    let dp= new DataProvider(data,provider);
                    dp.progressQuery = "SQL";

                    let drawObject=
                        {
                            code:$scope.code,
                            drawtype:'plotly'
                        };

                    $scope.w=new WidgetDraw(dp,drawObject);
                    $scope.vars.show=true;


                    $scope.openEditorWidget();
                });

        };

        $scope.loads();





    }
})(angular, smi2);
