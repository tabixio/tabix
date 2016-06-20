(function () {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.home',
                config: {
                    url: '/',
                    views: {
                        'main@': {
                            templateUrl: 'static/home/home.html'
                        },
                        'sidebar@': {},
                        'breadcrumb@': {}
                    },
                    data: {
                        title: 'Home',
                        _class: 'home'
                    }
                }
            }
        ];
    }
})();
