(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).service('ThemeService', ThemeService);
    ThemeService.$inject = ['localStorageService', '$state', '$stateParams'];

    /**
     * @ngdoc service
     * @name smi2.service:ThemeService
     * @description Theme service
     */
    function ThemeService(localStorageService, $state, $stateParams) {

        const themeName = localStorageService.get('themeName') || 'dark';
        const list = [{
            isDark: false,
            name: 'default',
            title: 'Светлая тема'
        }, {
            isDark: true,
            name: 'dark',
            title: 'Темная тема'
        }];
        let theme = list.find((item) => (item.name == themeName)) || list[0];

        return {
            isDark: () => theme.isDark,
            theme: theme.name,
            themeObject: theme,
            set: (name) => {
                if (name != themeName) {
                    localStorageService.set('themeName', name);
                    location.href = location.href;
                }
            },
            list
        };
    }
})(angular, smi2);
