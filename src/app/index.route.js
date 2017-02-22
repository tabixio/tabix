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
                            var defer = $q.defer();
                            if (angular.isDefined(API.getConnectionInfo().host)) {
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

                // Dashboard state. Now it's only redir to sql state
                .state('dashboard', {
                    parent: 'layout',
                    url: '/',
                    controller: ['$state', function ($state) {
                        $state.go('sql');
                    }]
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
                .state('processes', {
                    parent: 'layout',
                    url: '/processes',
                    templateUrl: 'app/processes/processes.html',
                    controller: 'ProcessesController'
                })
                // Processes list
                .state('metrics', {
                    parent: 'layout',
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
