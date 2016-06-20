// Provide a unify handler to handle $http request failure
(function () {
    'use strict';

    angular
        .module('app.helper')
        .factory('ajaxErrorHandler', ajaxErrorHandlerService);

    ajaxErrorHandlerService.$inject = ['ErrorMessage', '$q'];

    /* @ngInject */
    function ajaxErrorHandlerService (Error, $q) {
        var service = {
            catcher: catcher
        };
        return service;

        // directly reject the human readable error message
        function catcher (reason) {
            // reason is:
            // 1. either an error $http response
            // 2. or an error message returned by _success
            var _type = typeof reason;
            var message = '$SERVER';
            if (reason && _type === 'object') {
                message = reason.message;
            } else if (reason && _type === 'string') {
                message = reason;
            }
            return $q.reject(Error[message]);
        }
    }
})();
