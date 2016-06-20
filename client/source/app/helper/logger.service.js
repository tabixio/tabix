// A wrapper service for original $log
(function () {
    'use strict';

    angular
        .module('app.helper')
        .factory('logger', loggerService);

    loggerService.$inject = ['$log'];

    /* @ngInject */
    function loggerService ($log) {
        var service = {
            error: error,
            info: info,
            success: success,
            warning: warning
        };

        return service;

        /////////////////////

        function error (message, data, title) {
            $log.error('Error: ' + message, data);
        }

        function info (message, data, title) {
            $log.info('Info: ' + message, data);
        }

        function success (message, data, title) {
            $log.info('Success: ' + message, data);
        }

        function warning (message, data, title) {
            $log.warn('Warning: ' + message, data);
        }
    }
}());
