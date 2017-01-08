((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).service('HandTable', HandTable);
    HandTable.$inject = ['localStorageService', 'ThemeService','$q', '$injector'];

    /**
     * @ngdoc service
     * @name smi2.service:HttpInterceptor
     * @description
     * Service from handle HTTP requests
     */
    function HandTable(localStorageService, ThemeService, $q, $injector) {
        return {

            //

        };
    }
})(angular, smi2);
