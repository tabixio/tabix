/*
 * Copyright (C) 2017 IgorStrykhar in SMI2
 * All rights reserved.
 */

((angular, smi2,  $) => {
    'use strict';
    angular.module(smi2.app.name).controller('PreferenceController', PreferenceController);
    PreferenceController.$inject = [
        '$scope',
        'Preference', '$state'
    ];

    function PreferenceController($scope, Preference,$state) {

        $scope.vars={
            AceThemes:Preference.getEditorThemes(),
            Themes:Preference.getThemes()
        };

        $scope.state=Preference.getCurrentState();


        // ------- functions -------
        $scope.apply=()=>{
            Preference.apply($scope.state);
            $scope.state=Preference.getCurrentState();
            $state.go('sql');
        };
        $scope.reloadCache=()=>{

        };


    }
})(angular, smi2, window.$);
