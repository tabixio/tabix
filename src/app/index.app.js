/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */

(() => {
    'use strict';

    var smi2 = window.smi2 = window.smi2 || {};
    smi2.app = {
        name: 'SMI2',
        version: window.TabixVersion || "",
        buildDate: window.TabixBuildDate || ""
    };

    // External libs connection
    angular.module(smi2.app.name, [

        // bower install ng-scrollbars --save
        // bower install fun-metis-menu --save
        // bower uninstall ngAnimate --save

        'ui.router',
        'LocalStorageModule',
        'angularScreenfull',
        'ui.ace',
        'ngScrollbars',
        'angularResizable',
        'ngSanitize',
        'ngMaterial',
        'funMetisMenu',
        'ngCsv',
        'cfp.hotkeys',
        'ngHandsontable',
        'ngCsvImport',
        'gridstack-angular'
    ]);
})();
