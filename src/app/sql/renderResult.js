/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,SMI2 LLC and other contributors
 */



((angular, smi2,  $) => {
    'use strict';

    angular.module(smi2.app.name).controller('RenderCtrl', RenderController);
    RenderController.$inject = [
        '$scope',
        '$rootScope',
        '$window',
        'localStorageService',
        'API',
        '$mdSidenav',
        '$mdDialog',
        '$mdToast',
        'ThemeService',
        '$timeout','$mdPanel'
    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:RenderCtrl
     * @description SQL controller data
     */
    function RenderController($scope,
                           $rootScope,
                           $window,
                           localStorageService,
                           API,
                           $mdSidenav,
                           $mdDialog,
                           $mdToast,
                              ThemeService,$timeout,$mdPanel) {



        $scope.tabsRender=true;

        $scope.vars = {
            rsw: 0,
            uiTheme: ThemeService.themeObject,
            isChartReady:false,
            staticGrid:true,
            stackType:'false',
            isDark:ThemeService.isDark(),
            active:{
                table:false,
                pivot:false,
                draw:false
            }

        };
        $scope.staticGrid=true;

        $scope.gridStackOptions = {
            cellHeight: 200,
            verticalMargin: 3,
            disableDrag:true,
            // disableResize:true,
            // staticGrid:true
        };

        function PlotlyEditorController($scope, $mdDialog)
        {
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

        /**
         * Привязка сетки
         */
        $scope.switchStaticGrid = function() {

            $scope.vars.staticGrid=!$scope.vars.staticGrid;
            $scope.staticGrid=$scope.vars.staticGrid;
            console.info("staticGrid",$scope.staticGrid);

        };

        $scope.SendToDashboard = (w,type) => {
            // ---------------------------------------------
            let position = $mdPanel.newPanelPosition() .absolute() .right()  .top();
            $mdPanel.open({
                controller: PlotlyEditorController,
                templateUrl: 'app/panels/sendtodashboard.html',
                attachTo: angular.element(document.body),
                position: position,
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

        $scope.initNoTabs = () => {
            $scope.vars.active.table=true;
            $scope.vars.active.draw=true;
            $scope.vars.active.pivot=true;
        };
        $scope.initTableTab = () => {

            console.warn("initTableTab!!!!");
            $scope.vars.active.table=true;
        };

        $scope.initDrawTab = () => {
            $scope.vars.active.draw=true;
        };

        $scope.onResizeStop = () => {

        };

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

        $scope.openEditorPlotLy = (w) => {
            console.log('openEditorPlotLy',w);
            $scope.openEditor(w);

        };
        $scope.initPivotTab = () => {
            $scope.vars.active.pivot=true;
        };




    }
})(angular, smi2, window.$);
