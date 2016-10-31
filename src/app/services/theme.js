(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).service('ThemeService', ThemeService);
    ThemeService.$inject = ['localStorageService'];

    /**
     * @ngdoc service
     * @name smi2.service:ThemeService
     * @description Theme service
     */
    function ThemeService(localStorageService) {

        const isDarkTheme = localStorageService.get('isDarkTheme') || false;

        return {
            isDark: () => isDarkTheme,
            theme: isDarkTheme ? 'dark' : 'default'
        }
    }
})(angular, smi2);
