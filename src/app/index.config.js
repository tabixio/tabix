/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */

((angular, smi2) => {
    'use strict';


    /**
     * Providers configuration
     */
    angular
        .module(smi2.app.name)
        .config([
            '$locationProvider',
            '$httpProvider',
            '$sceProvider',
            '$urlRouterProvider',
            'ThemeServiceProvider','$mdThemingProvider',
            function ($locationProvider,
                      $httpProvider,
                      $sceProvider,
                      $urlRouterProvider,
                      ThemeService,$mdThemingProvider
                      ) {

                // Запуск HTML5 режима HISTORY API, без решетки
                // $locationProvider.html5Mode(true).hashPrefix('!');
                // $compileProvider.debugInfoEnabled(true);
                // Проверка авторизации в httpInterceptor
                $httpProvider.interceptors.push('HttpInterceptor');

                // Разрешаю ng-bind-html
                $sceProvider.enabled(false);
                let isDark=false;
                if (_.isFunction(ThemeService.$get[0]))
                {
                   isDark=ThemeService.$get[0]().isDark();
                }
                else {
                    isDark=ThemeService.$get().isDark();
                }
                console.log("isDark",isDark);

                if (isDark) {
                    $mdThemingProvider
                        .theme('default')
                        .dark()
                        .primaryPalette('blue')
                        .accentPalette('blue', {
                            'default': '500'
                        });
                }

                window.disableNgInspectWatchers=false;
                // Если state не найден - шлю 404
                $urlRouterProvider.otherwise(function ($injector) {
                    var $state = $injector.get("$state");
                    $state.transitionTo('404');
                });

            }
        ])

})(angular, smi2);
