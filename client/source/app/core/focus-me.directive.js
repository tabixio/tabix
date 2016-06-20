(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('aioFocusMe', FocusMe);

    FocusMe.$inject = [];
    /* @ngInject */
    function FocusMe () {
        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;

        //////////

        function link (scope, element, attrs) {
            scope.$watch(attrs.aioFocusMe, function (val) {
                if (val) {
                    scope.$evalAsync(function () {
                        element[0].focus();
                    });
                }
            });
        }
    }
})();
