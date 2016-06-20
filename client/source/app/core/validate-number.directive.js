(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('aioValidateNumber', ValidateNumber);

    ValidateNumber.$inject = [];
    /* @ngInject */
    function ValidateNumber () {
        var directive = {
            require: 'ngModel',
            restrict: 'A',
            link: link
        };
        return directive;

        //////////

        function link (scope, element, attrs, ctrl) {
            var pattern = /^\d+(\.\d{1,2})?$/;
            ctrl.$validators.number = function (modelValue, viewModel) {
                if (pattern.test(viewModel)) {
                    return true;
                }
                return false;
            };
        }
    }
})();
