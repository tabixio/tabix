(function () {
    'use strict';

    angular
        .module('app.phone')
        .controller('PhoneDetailController', PhoneDetailController);

    PhoneDetailController.$inject = ['phoneAPI', '$stateParams',
        'LxNotificationService', '$q'];
    /* @ngInject */
    function PhoneDetailController (phoneAPI, $stateParams,
        LxNotificationService, $q) {
        var vm = this;

        vm.state = 'view';
        vm.beginEdit = beginEdit;
        vm.cancelUpdate = cancelUpdate;
        vm.updatePhone = updatePhone;

        var _originalPhone;

        init();

        /////////////

        function init () {
            var id = $stateParams.id;
            if (id) {
                _getPhoneDetail(id);
            }
        }

        function _getPhoneDetail (id) {
            phoneAPI.getPhoneDetail(id)
                .then(function (data) {
                    vm.phone = data;
                });
        }

        function beginEdit () {
            _originalPhone = angular.copy(vm.phone);
            vm.state = 'edit';
        }

        function cancelUpdate () {
            vm.phone = angular.copy(_originalPhone);
            vm.state = 'view';
        }

        function updatePhone (phone) {
            // return promise here to let the phone form controller know the response status
            return phoneAPI.updatePhone(phone.id, phone)
                .then(_success)
                .catch(_error);

            function _success (data) {
                vm.state = 'view';
                vm.phone = data;
            }

            function _error (message) {
                LxNotificationService.alert('Update phone error', message, 'OK', function () {
                    cancelUpdate();
                });
                return $q.reject();
            }
        }

    }
})();
