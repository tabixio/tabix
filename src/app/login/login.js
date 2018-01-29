

(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('LoginController', LoginController);
    LoginController.$inject = [
        '$scope',
        '$state',
        'localStorageService',
        'API',
        '$mdToast',
        'ThemeService',
        '$mdDialog'
    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:LoginController
     * @description Login page controller
     */
    function LoginController($scope, $state, localStorageService, API, $mdToast, ThemeService,$mdDialog) {

        const ALL_BASES_KEY = 'basesConfig';
        $scope.isChrome = /Chrome/.test(navigator.userAgent);

        $scope.vars = {
            bases: localStorageService.get(ALL_BASES_KEY) || [],
            db: {},
            loading: false,
            version: smi2.app.version,
            themes: ThemeService.list
        };


        $scope.loginCheckDone= ()=> {
            API.databaseStructure(
                (ds) => {
                    console.log('loginCheckDone ... DS ... done');
                    $state.go('sql');
                } , true);
        };

        /**
         * Login with saving connection settings
         */
        $scope.login = () => {
            $scope.vars.loading = true;

            // Saving to LocalStorage
            if ($scope.vars.db.id) {
                for (var i = 0; i < $scope.vars.bases.length; i++) {
                    if ($scope.vars.bases[i].id == $scope.vars.db.id) {
                        $scope.vars.bases[i] = $scope.vars.db;
                        break;
                    }
                }
            } else {
                $scope.vars.db.id = (new Date()).getTime();
                $scope.vars.bases.push($scope.vars.db);
            }
            localStorageService.set(ALL_BASES_KEY, $scope.vars.bases);

            API.setConnection($scope.vars.db);

            API.fetchQuery('SELECT \'login success\'').then( data => {

                    $mdToast.show(
                    $mdToast
                        .simple()
                        .content('Login OK! Loading ...')
                        .theme(ThemeService.theme)
                        .position('bottom right')
                    );
                    $scope.loginCheckDone();
                },(x) => {
                    $scope.vars.loading = false;
                    let msg='';
                    if (x && !angular.isUndefined(x.data))
                    {
                        if (x.data)
                            msg=x.data;
                    }
                    if (_.isString(x)) msg=x;
                    console.error('--------------- ^^^^^^ ERROR ^^^^^^^ ---------------------');
                    console.log('Error on login',x);
                    $mdToast.show(
                        $mdToast
                            .simple()
                            .content('Login or connect error, check host:port,login & password '+msg)
                            .theme(ThemeService.theme)
                            .position('bottom right')
                    );
                });//Login
        };

        /**
         * Help )
         */
        $scope.help = (ev) => {

            function DialogController($scope, $mdDialog) {
                $scope.vars = {
                    version: smi2.app.version,
                    buildDate: smi2.app.buildDate,
                };

                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/base/helpDialogLogin.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            });

        };

        /**
         * Remove connection item
         */
        $scope.add = () => {
            let x=angular.copy($scope.vars.db);
            x.id=(new Date()).getTime();

            if (!x.name) {
                x.name="new connection";
            }
            console.warn(x);
            $scope.vars.bases.push(x);
        };

        $scope.remove = () => {
            const index = $scope.vars.bases.findIndex((item) => (item.id == $scope.vars.db.id));
            console.warn($scope.vars.bases,index);
            $scope.vars.bases.splice(index);
            localStorageService.set(ALL_BASES_KEY, $scope.vars.bases);
            $scope.vars.db = {};
        };

        /**
         * Change UI theme
         * @param theme
         */
        $scope.setUiTheme = (theme) => ThemeService.set(theme.name);
    }
})(angular, smi2);
