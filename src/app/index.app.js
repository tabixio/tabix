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
        'ui.grid.resizeColumns', 'ui.grid.moveColumns','ui.grid.exporter', 'ui.grid.selection',
        'angularResizable',
        'ngSanitize',
        'ngMaterial',
        'funMetisMenu',
        'ngScrollbars',
        'ngCsv',
        'pascalprecht.translate',
        'cfp.hotkeys',
        'ngHandsontable',
        'amChartsDirective',
        'ui.bootstrap.contextMenu'
    ]);
})();
