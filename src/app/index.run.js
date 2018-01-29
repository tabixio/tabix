/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
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
            '$mdTheming',
            'ThemeService',
            'localStorageService',
            ($rootScope, $state,$mdTheming,ThemeService,localStorageService) => {

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
                window.document.title="Tabix.IO ["+window.TabixBuildDate+"]";



                $rootScope.sqlLog = localStorageService.get('sqlLog') || [];
                $rootScope.$watch('sqlLog',(d) => {
                    localStorageService.set('sqlLog',d);
                });
                $rootScope.isInitDatabaseStructure = false;

                $rootScope.sidebar={

                    letf_resizable_width:200,
                    clickLetfResizable:function () {
                        if ($rootScope.sidebar.letf_resizable_width<10)
                        {
                            $rootScope.sidebar.letf_resizable_width=200;
                        }
                        else {
                            $rootScope.sidebar.letf_resizable_width=0;
                        }
                    }
                };


            }
        ]);
})();
