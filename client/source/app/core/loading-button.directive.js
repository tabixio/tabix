(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('aioLoadingButton', LoadingButton);

    LoadingButton.$inject = [];
    /* @ngInject */
    function LoadingButton () {
        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;

        //////////

        function link (scope, element, attrs) {
            var spinner = '<i class="mdi mdi-sync icon-rotate-animation"></i>';
            scope.$watch(attrs.aioLoadingButton, function (val) {
                if (val) {
                    element.prepend(spinner);
                } else {
                    element.find('.icon-rotate-animation').remove();
                }
            });
        }
    }
})();
