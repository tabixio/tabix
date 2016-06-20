(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.dashboard',
                config: {
                    url: '/dashboard',
                    views: {
                        'main@': {
                            templateUrl: 'static/dashboard/dashboard.html',
                            controller: 'DashboardController as vm'
                        }
                    },
                    data: {
                        title: 'Dashboard',
                        _class: 'dashboard',
                        requireLogin: true
                    },
                    sidebar: {
                        icon: 'mdi-view-dashboard',
                        text: 'Dashboard'
                    },
                    breadcrumb: 'Dashboard'
                }
            }
        ];
    }
})();
