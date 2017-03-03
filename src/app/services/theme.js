((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).service('ThemeService', ThemeService);
    ThemeService.$inject = ['localStorageService', '$filter'];

    /**
     * @ngdoc service
     * @name smi2.service:ThemeService
     * @description Theme service
     */
    function ThemeService(localStorageService, $filter) {

        const themeName = localStorageService.get('themeName') || 'dark';
        const list = [{
            isDark: false,
            name: 'default',
            title: $filter('translate')('Светлая тема')
        }, {
            isDark: true,
            name: 'dark',
            title: $filter('translate')('Темная тема')
        }];
        let theme = list.find((item) => (item.name == themeName)) || list[0];
        if (theme.isDark) {
            angular.element('body').addClass('dark');
        }

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
