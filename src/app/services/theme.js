((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).service('ThemeService', ThemeService);
    ThemeService.$inject = ['localStorageService'];

    /**
     * @ngdoc service
     * @name smi2.service:ThemeService
     * @description Theme service
     */
    function ThemeService(localStorageService) {

        const themeName = localStorageService.get('themeName') || 'dark';
        const list = [{
            isDark: false,
            name: 'default',
            title: 'Light theme'
        }, {
            isDark: true,
            name: 'dark',
            title: 'Dark theme'
        }];
        let theme = list.find((item) => (item.name == themeName)) || list[0];
        if (theme.isDark) {
            angular.element('body').addClass('dark');
        }
        this.isDark = () => {
            return theme.isDark;
        };
        this.get = () => {
            return theme;
        };
        return {
            isDark: () => theme.isDark,
        }
        //     theme: theme.name,
        //     themeObject: theme,
        //     set: (name) => {
        //         if (name != themeName) {
        //             localStorageService.set('themeName', name);
        //             location.href = location.href;
        //         }
        //     },
        //     get : () => {
        //
        //     },
        //     list
        // };
    }
})(angular, smi2);
