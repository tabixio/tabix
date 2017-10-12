/*
 * Copyright (C) 2017 IgorStrykhar in SMI2
 * All rights reserved.
 */

((angular, smi2,  $) => {
    'use strict';
    angular.module(smi2.app.name).controller('PreferenceController', PreferenceController);
    PreferenceController.$inject = [
        '$scope',
        'Preference'
    ];

    function PreferenceController($scope, Preference) {

        $scope.vars={
            AceThemes:Preference.getEditorThemes(),
            Themes:Preference.getThemes()
        };

        $scope.state=Preference.getCurrentState();


        // ------- functions -------



    }
})(angular, smi2, window.$);
