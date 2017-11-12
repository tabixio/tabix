(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('devplotController', devplotController);
    devplotController.$inject = [
        '$scope',
        'API',
        'ThemeService',
        '$interval',
        'localStorageService',
        '$mdDialog',
        '$window',
        'hotRegisterer'
    ];


    function devplotController($scope, API, ThemeService, $interval, localStorageService,$mdDialog,$window,hotRegisterer) {

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
        $scope.code='{   }';
        //
        //
        // $scope.codeupdate=(code) => {
        //     console.log(code);
        //     $scope.code=code;
        //     $scope.$applyAsync();
        // };

        function PlotlyEditorController($scope, $mdDialog,$widget)
        {
            $scope.code='';

            $scope.editor=false;
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };



            $scope.getInitCode=()=>{
                return $widget.getCode();
            };
            $scope.applyCode=()=>{
                $widget.updateCode($scope.code);
            };


            $scope.aceChange=(session)=>{
                $scope.code=session.getValue();
                $scope.applyCode();
                // $codeupdate();
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

                $scope.code=$scope.getInitCode();

                editor.setValue($scope.code);
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
                locals:{
                    '$widget':w
                    // ,
                    // '$codeupdate':$scope.codeupdate
                },
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });


        };

        $scope.openEditorWidget = () => {
            $scope.openEditor($scope.w.draw);
        };





        $scope.loads = function() {
            $scope.vars.show=false;

            let lx=30;

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
