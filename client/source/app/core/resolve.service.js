(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('resolve', resolve);

    resolve.$inject = ['userAPI', '$q'];
    /* @ngInject */
    function resolve (userAPI, $q) {
        return {
            login: login
        };

        ///////////

        function login () {
            return userAPI.checkLoggedInStatus()
                .catch(_error);

            function _error () {
                return $q.reject('requireLogin');
            }
        }
    }
})();
