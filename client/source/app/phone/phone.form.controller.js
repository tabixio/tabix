(function () {
    'use strict';

    angular
        .module('app.phone')
        .controller('PhoneFormController', PhoneFormController);

    PhoneFormController.$inject = ['phoneAPI'];
    /* @ngInject */
    function PhoneFormController (phoneAPI) {
        var vm = this;

        vm.selects = {
            src: [
                {'name': 'Android'},
                {'name': 'iOS'},
                {'name': 'Windows Phone'}
            ],
            toModel: _toModel,
            toSelection: _toSelection
        };

        vm.submitForm = submitForm;

        init();

        /////////////

        function init () {

        }

        function _toModel (selection, callback) {
            if (selection) {
                callback(selection.name);
            } else {
                callback();
            }
        }

        function _toSelection (model, callback) {
            var target;
            if (model) {
                target = vm.selects.src.filter(function (item) {
                    return item.name === model;
                });
                callback(target[0]);
            } else {
                callback();
            }
        }

        function submitForm (phone) {
            if (vm.phoneForm.$invalid || !vm.phone.releaseDate) {
                return;
            }
            vm.isRequest = true;
            // call submit method passed in from outer scope
            vm.submit(phone)
                .then(function () {
                    _endRequest();
                    vm.phoneForm.$setPristine();
                })
                .catch(_endRequest);
        }

        function _endRequest () {
            vm.isRequest = false;
        }

    }
})();
