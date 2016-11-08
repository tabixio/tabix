(() => {
    'use strict';

    var smi2 = window.smi2 = window.smi2 || {};
    smi2.app = {
        name: 'SMI2',
        version: window.clickhouseGuiVersion || ""
    };

    // External libs connection
    angular.module(smi2.app.name, [
        'ngAnimate',
        'ui.router',
        'LocalStorageModule',
        'angularScreenfull',
        'ui.ace',
        'ui.grid',
        'ui.grid.autoResize',
        'angularResizable',
        'ngSanitize',
        'ngMaterial',
        'funMetisMenu',
        'ngScrollbars'
    ]);
})();
