(function () {
    'use strict';

    angular
        .module('app.phone')
        .directive('aioPhoneForm', PhoneForm);

    PhoneForm.$inject = [];
    /* @ngInject */
    function PhoneForm () {
        var directive = {
            restrict: 'AE',
            transclude: true,
            scope: {
                phone: '=',
                state: '=',
                submit: '=',
                cancel: '='
            },
            controller: 'PhoneFormController',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'static/phone/phone.form.html'
        };
        return directive;
    }
})();
