(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('BreadcrumbController', BreadcrumbController);

    BreadcrumbController.$inject = ['routerHelper', '$state', '$rootScope'];
    /* @ngInject */
    function BreadcrumbController (routerHelper, $state, $rootScope) {
        var vm = this;

        init();

        ////////////

        function init () {
            _applyNewBreadcrumb($state.current, $state.params);
            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    _applyNewBreadcrumb(toState, toParams);
                });
        }

        function _applyNewBreadcrumb (state, params) {
            vm.breadcrumbs = [];
            var name = state.name;
            var stateNames = _getAncestorStates(name);
            stateNames.forEach(function (name) {
                var stateConfig = $state.get(name);
                var breadcrumb = {
                    link: name,
                    text: stateConfig.breadcrumb
                };
                if (params) {
                    breadcrumb.link = name + '(' + JSON.stringify(params) + ')';
                }
                vm.breadcrumbs.push(breadcrumb);
            });
        }

        function _getAncestorStates (stateName) {
            var ancestors = [];
            var pieces = stateName.split('.');
            if (pieces.length > 1) {
                for (var i = 1; i < pieces.length; i++) {
                    var name = pieces.slice(0, i + 1);
                    ancestors.push(name.join('.'));
                }
            }
            return ancestors;
        }
    }
})();
