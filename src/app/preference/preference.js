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
        $scope.apply=()=>{

            console.log($scope.state);
            Preference.apply($scope.state);
            $scope.state=Preference.getCurrentState();
        };
        $scope.reloadCache=()=>{

        };


    }
})(angular, smi2, window.$);
