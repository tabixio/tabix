(function () {
    'use strict';

    /**
     * Конфигурация приложения
     */
    // angular
    //     .module('app.config')
    //     .constant({
    //         host: 'clickhouse'
    //     });

    angular
        .module('app.core')
        .config(appConfig);

    var config = {
        appErrorPrefix: '[Clickhouse Frontend Error] ',
        appTitle: 'SMI2 frontend for Yandex Clickhouse'
    };

    appConfig.$inject = ['routerHelperProvider'];

    /* @ngInject */
    function appConfig (routerHelperProvider) {
        routerHelperProvider.configure({mainTitle: config.appTitle});
    }

})();
