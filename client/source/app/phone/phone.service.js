(function () {
    'use strict';

    angular
        .module('app.phone')
        .factory('phoneAPI', phoneSerivce);

    phoneSerivce.$inject = ['$http', '$q', 'ajaxErrorHandler'];
    /* @ngInject */
    function phoneSerivce ($http, $q, ajaxError) {
        var service = {
            getPhones: getPhones,
            getPhoneDetail: getPhoneDetail,
            addNewPhone: addNewPhone,
            updatePhone: updatePhone,
            removePhone: removePhone
        };

        return service;

        /////////////

        function getPhones () {
            return $http.get('api/phones')
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data;
                if (response.status === 200 && data.code === 0) {
                    return data.result.phones;
                } else {
                    return $q.reject(data.message);
                }
            }
        }

        function getPhoneDetail (id) {
            return $http.get('api/phones/' + id)
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data;
                if (response.status === 200 && data.code === 0) {
                    return data.result.phone;
                } else {
                    return $q.reject(data.message);
                }
            }
        }

        function addNewPhone (phone) {
            var req = {
                'phone': phone
            };
            return $http.post('api/phones', req)
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data;
                if (response.status === 200 && data.code === 0) {
                    return data.result.phone;
                } else {
                    return $q.reject(data.message);
                }
            }
        }

        function updatePhone (id, phone) {
            var req = {
                'phone': phone
            };
            return $http.put('api/phones/' + id, req)
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data;
                if (response.status === 200 && data.code === 0) {
                    return data.result.phone;
                } else {
                    return $q.reject(data.message);
                }
            }
        }

        function removePhone (id) {
            return $http.delete('api/phones/' + id)
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data;
                if (response.status === 200 && data.code === 0) {
                    return data.result.phone;
                } else {
                    return $q.reject(data.message);
                }
            }
        }

    }
})();
