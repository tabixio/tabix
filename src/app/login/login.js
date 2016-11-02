(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('LoginController', LoginController);
    LoginController.$inject = [
        '$scope',
        '$state',
        'localStorageService',
        'API',
        '$mdToast',
        'ThemeService'
    ];

    /**
     * @ngdoc controller
     * @name smi2.controller:LoginController
     * @description Login page controller
     */
    function LoginController($scope, $state, localStorageService, API, $mdToast, ThemeService) {

        var ALL_BASES_KEY = 'basesConfig';

        $scope.vars = {
            bases: localStorageService.get(ALL_BASES_KEY) || [],
            db: {},
            loading: false,
            build: smi2.app.build,
            themes: ThemeService.list
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
            API.query('SELECT \'login success\'').then(
                () => $state.go('sql'),
                () => {
                    $scope.vars.loading = false;
                    $mdToast.show(
                        $mdToast
                            .simple()
                            .content('Ошибка доступа')
                            .theme(ThemeService.theme)
                            .position('bottom right')
                    );
                }
            );
        };

        /**
         * Remove connection item
         */
        $scope.remove = () => {
            const index = $scope.vars.bases.findIndex((item) => (item.id == $scope.vars.db.id));
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
