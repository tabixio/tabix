(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['routerHelper', '$scope', '$rootScope'];
    /* @ngInject */
    function SidebarController (routerHelper, $scope, $rootScope) {
        var vm = this;

        vm.hideSidebar = hideSidebar;

        init();

        ///////////////

        function init () {
            // generate sidebar nav menus
            vm.navs = _getNavMenus();
            // tell others we have sidebar
            $rootScope.hasSidebar = true;
            $scope.$on('$destroy', function () {
                $rootScope.hasSidebar = false;
            });
        }

        function hideSidebar () {
            $rootScope.showSidebar = false;
        }

        function _getNavMenus () {
            var navs = [];
            var allStates = routerHelper.getStates();
            allStates.forEach(function (state) {
                if (state.sidebar) {
                    var nav = state.sidebar;
                    nav.link = state.name;
                    navs.push(nav);
                }
            });
            return navs;
        }
    }
})();
