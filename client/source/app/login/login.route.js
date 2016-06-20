(function () {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.login',
                config: {
                    url: '/login?action',
                    views: {
                        'main@': {
                            templateUrl: 'static/login/login.html',
                            controller: 'LoginController as vm'
                        },
                        'breadcrumb@': {},
                        'sidebar@': {}
                    },
                    data: {
                        title: 'Login',
                        _class: 'login'
                    }
                }
            }
        ];
    }
})();
