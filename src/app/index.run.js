/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

(() => {
    'use strict';

    /**
     * @ngdoc controller
     * @name smi2.controller:Run
     * @description Main APP controller
     */
    angular
        .module(smi2.app.name)
        .run([
            '$rootScope',
            '$state',
            ($rootScope, $state) => {

                $rootScope.breadcrumbs = [];
                $rootScope.currentDatabase = null;

                // Провеярю в чем ошибка перехода на state
                var stateChangeErrorUnbind = $rootScope.$on('$stateChangeError', (toState, toParams, fromState, fromParams, error, reason) => {
                    if (reason == 'notAuthorized') {
                        $state.go('login');
                    }
                });
                // Требование JSlinter'a (((
                $rootScope.$on('$destroy', () => stateChangeErrorUnbind);

            }
        ]);
})();
