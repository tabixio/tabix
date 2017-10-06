/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
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
            '$mdThemingProvider',
            'ThemeServiceProvider',
            function ($locationProvider,
                      $httpProvider,
                      $sceProvider,
                      $urlRouterProvider,
                      $mdThemingProvider,
                      ThemeService,
                      ) {

                // Запуск HTML5 режима HISTORY API, без решетки
                // $locationProvider.html5Mode(true).hashPrefix('!');

                // Проверка авторизации в httpInterceptor
                $httpProvider.interceptors.push('HttpInterceptor');

                // Разрешаю ng-bind-html
                $sceProvider.enabled(false);

                // Если state не найден - шлю 404
                $urlRouterProvider.otherwise(function ($injector) {
                    var $state = $injector.get("$state");
                    $state.transitionTo('404');
                });

                if (ThemeService.$get().isDark()) {
                    $mdThemingProvider
                        .theme('default')
                        .dark()
                        .primaryPalette('blue')
                        .accentPalette('blue', {
                            'default': '500'
                        });
                }

            }
        ])

})(angular, smi2);
