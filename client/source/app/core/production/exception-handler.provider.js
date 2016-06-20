// Handle app level exception
(function () {
    'use strict';

    angular
        .module('app.core')
        .provider('exceptionHandler', exceptionHandlerProvider)
        .config(config);

    // Configure log prefix for error handling
    function exceptionHandlerProvider () {
        /* jshint validthis:true */
        this.config = {
            appErrorPrefix: undefined
        };

        this.configure = function (appErrorPrefix) {
            this.config.appErrorPrefix = appErrorPrefix;
        };

        this.$get = function () {
            return {config: this.config};
        };
    }

    config.$inject = ['$provide'];

    // Use decorator to extend the original $exceptionHandler:
    function config ($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger'];

    // Extend the original $exceptionHandler service.
    // * add error log prefix using exceptionHandlerProvider
    // * do other thing with error log
    function extendExceptionHandler ($delegate, exceptionHandler, logger) {
        $delegate = function (exception, cause) {
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
            var errorData = {exception: exception, cause: cause};
            exception.message = appErrorPrefix + exception.message;
            // $delegate(exception, cause);
            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             */
            logger.error(exception.message, errorData);
        };
        return $delegate;
    }
})();
