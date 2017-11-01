((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).service('ThemeService', ThemeService);
    ThemeService.$inject = ['localStorageService','$state'];

    /**
     * @ngdoc service
     * @name smi2.service:ThemeService
     * @description Theme service
     */
    function ThemeService(localStorageService,$state) {

        const themeName = localStorageService.get('themeName') || 'dark';
        const list = [{
            isDark: false,
            name: 'light',
            title: 'Light theme'
        }, {
            isDark: true,
            name: 'dark',
            title: 'Dark theme'
        }];
        let theme = list.find((item) => (item.name == themeName)) || list[1];
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
            list,
            set: (name) => {
                console.warn(name,themeName);
                        if (name != themeName) {
                            console.log("localStorageService.set('themeName', ",name);
                            localStorageService.set('themeName', name);
                            // location.href = location.href;
                            $state.reload();
                            window.location.reload();
                        }
                    },
                    get : () => {

                    },
            theme: theme.name,themeObject: theme,

        };
        //
        //
        //
        // };
    }
})(angular, smi2);
