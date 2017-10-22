(( angular, smi2 ) => {
    'use strict';

    angular.module( smi2.app.name ).controller( 'SidebarHelperCtrl', SidebarHelperCtrl );
    SidebarHelperCtrl.$inject = [
        '$scope',
        '$rootScope',
        'API',
        'ThemeService',
        'localStorageService',
        'Variables',
        'Snippets',
        '$mdDialog'
    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:SidebarController
     * @description Контроллер бокового меню
     */
    function SidebarHelperCtrl($scope, $rootScope, API, ThemeService,localStorageService,Variables,Snippets,$mdDialog) {
        $scope.vars = {
            isDark: ThemeService.isDark(),
            historysql:[],
            charthelp:[],
            active:{
                chart:true,
                history:true,
                snippet:true,
                vars:true
            },

            snippets:Snippets.snippets,
            variables:Variables.vars
        };


        $scope.showAddVarsDialog = function(ev) {
            $mdDialog.show({
                controller: function ($scope, $mdDialog) {
                    $scope.v = {
                        name:'Var1',
                        type:'text',
                        value:'',
                    };
                    $scope.close = function() {
                        $mdDialog.cancel();
                    };

                    $scope.add = function(answer) {
                        $mdDialog.hide(answer);
                    };
                },
                templateUrl: '/app/base/addVarsDialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {

                    if (answer.name && answer.value && answer.type)
                    {
                        Variables.addVar(answer.type,answer.name,answer.value);
                    }

                }, function() {

                });
        };

        $scope.changed=(varid) =>{
            Variables.update(varid);
        };
        $scope.showState=() =>{
            console.warn($scope.vars.variables);
        };
        $scope.addVar=() =>{
            Variables.addVar("int",'limit',1000);
        };
        $scope.dropSnippet=(sid)=>{
            Snippets.drop(sid);
        };
        $scope.dropVar=(varid)=>{
            Variables.drop(varid);
        };

        $scope.init=()=>{
            if (!_.isObject($scope.vars) ||_.isUndefined($scope.vars.variables['limit'])) {
                Variables.addVar("int",'limit',1000);
            }
        };
        //
        // $scope.$watch('vars.variables',() => {
        //     Variables.update();
        // });

        $scope.init();
    }

})( angular , smi2 );
