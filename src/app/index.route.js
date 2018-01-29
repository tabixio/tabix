/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */

((angular, smi2) => {
    'use strict';

    angular
        .module(smi2.app.name)
        .config(($stateProvider) => {

            $stateProvider

                // Base routing with auth detection
                .state('base', {
                    abstract: true,
                    resolve: {
                        session: ['$q', 'API', ($q, API) => {

                            window.global_tabix_disable_exit = false;

                            if (_.isObject(window.global_tabix_default_settings)) {
                                if (!_.isUndefined(window.global_tabix_default_settings.host) && !_.isUndefined(window.global_tabix_default_settings.login)) {
                                    window.global_tabix_disable_exit = true;
                                    API.setConnection(window.global_tabix_default_settings);
                                }
                            }

                            var defer = $q.defer();

                            if (API.isAuthorized())
                            {
                                defer.resolve();
                            } else {
                                defer.reject('notAuthorized');
                            }



                            return defer.promise;
                        }]
                    },
                    templateUrl: 'app/base/base.html'
                })

                // Design route
                .state('layout', {
                    parent: 'base',
                    abstract: true,
                    views: {
                        header: {
                            templateUrl: 'app/base/header.html',
                            controller: 'HeaderController'
                        },
                        sidebar: {
                            templateUrl: 'app/base/sidebar.html',
                            controller: 'SidebarController'
                        },
                        main: {
                            template: '<ui-view/>'
                        }
                    }
                })
                .state('layoutDash', {
                    parent: 'base',
                    abstract: true,
                    views: {
                        header: {
                            templateUrl: 'app/base/header.html',
                            controller: 'HeaderController'
                        },

                        sidebar: {
                            templateUrl: 'app/dash/dashsidebar.html',
                            controller: 'DashSidebarController'
                        },
                        main: {
                            template: '<ui-view/>'
                        }
                    }
                })
                // Dashboard state. Now it's only redir to sql state
                .state('dashboard', {
                    parent: 'layout',
                    url: '',
                    controller: ['$state', function ($state) {
                        $state.go('sql');
                    }]
                })
                // Show 1 table
                .state('dashId', {
                    parent: 'layoutDash',
                    url: '/dash/{dashId}',
                    templateUrl: 'app/dash/dash.html',
                    controller: 'DashController'
                })

                .state('dash', {
                    parent: 'layoutDash',
                    url: '/dash',
                    templateUrl: 'app/dash/dash.html',
                    controller: 'DashController'
                })
                .state('devplot', {
                    parent: 'layoutDash',
                    url: '/devplot',
                    templateUrl: 'app/dev/plot.html',
                    controller: 'devplotController'
                })
                .state('devedit', {
                    parent: 'layoutDash',
                    url: '/devedit',
                    templateUrl: 'app/dev/edit.html',
                    controller: 'EditController'
                })
                .state('preference', {
                    parent: 'layout',
                    url: '/Preference',
                    templateUrl: 'app/preference/preference.html',
                    controller: 'PreferenceController'
                })
                // Login state
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
                    controller: 'LoginController'
                })

                // SQL state
                .state('sql', {
                    parent: 'layout',
                    url: '/sql',
                    templateUrl: 'app/sql/sql.html',
                    controller: 'SqlController'
                })

                // Show 1 table
                .state('table', {
                    parent: 'layout',
                    url: '/database/{dbName}/table/{tableName}',
                    templateUrl: 'app/table/table.html',
                    controller: 'TableController'
                })



                // Processes list
                .state('metrics', {
                    parent: 'layoutDash',
                    url: '/metrics',
                    templateUrl: 'app/metrics/metrics.html',
                    controller: 'MetricsController'
                })

                // 404 not found handle
                .state('404', {
                    parent: 'layout',
                    templateUrl: 'app/base/404.html'
                });
        });
})(angular, smi2);
