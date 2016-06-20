// Help configure the state-base ui.router
(function () {
    'use strict';

    angular
        .module('app.helper')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function routerHelperProvider ($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        var config = {
            mainTitle: undefined,
            resolveAlways: {}
        };

        $locationProvider.html5Mode(true);

        this.configure = function (cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger', 'resolve'];
        /* @ngInject */
        function RouterHelper ($location, $rootScope, $state, logger, resolve) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            ///////////////

            function configureStates (states, otherwisePath) {
                states.forEach(function (state) {
                    // add login check if requireLogin is true
                    var data = state.config.data;
                    if (data && data.requireLogin === true) {
                        state.config.resolve = angular.extend(
                            state.config.resolve || {},
                            {'loginResolve': resolve.login}
                        );
                    }
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleRoutingErrors () {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function (event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState]);
                        // handle requireLogin issue
                        if (error === 'requireLogin') {
                            $state.prev = {
                                state: toState.name,
                                params: toParams
                            };
                            $state.go('root.login');
                        } else {
                            console.log('!!!!!!!!!!!!!!');
                            $state.go('root.home');
                        }
                    }
                );
            }

            function init () {
                handleRoutingErrors();
                updateDocTitle();
            }

            function getStates () {
                return $state.get();
            }

            function updateDocTitle () {
                $rootScope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = (toState.data.title + ' - ' || '') + config.mainTitle;
                        $rootScope.title = title; // data bind to <title>
                        $rootScope._class = toState.data._class; // data bind to <body>
                    }
                );
            }
        }
    }
})();
