/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */

((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).service('Preference', Preference);
    Preference.$inject = ['localStorageService', 'ThemeService'];

    /**
     * @ngdoc service
     * @name smi2.service:Preference
     * @description Preference manager
     */
    function Preference(localStorageService, ThemeService) {

        const DEFAULT = {
            limitRows:5000,
            limitTimes:5,
            fontSize:14,
            editorTheme:'cobalt',
            theme:'dark',
            saveTabs:true,
            liveAutocompletion:true,
            disableAutohelp:false,
            disableHotKeyCmdLeft:true,
            delimiter:';;',
            liveAutocompletionDelay:500,
            liveAutocompletionThreshold:1,
            useWrapMode:true,
            showInvisibles:false,

        };
        const Themes=['ligth','dark'];

        const EditorTheme=[
            'ambiance',
            'eclipse', 'mono_industrial', 'tomorrow_night_blue',
            'chaos', 'github', 'monokai', 'tomorrow_night_bright',
            'chrome', 'idle_fingers', 'pastel_on_dark', 'tomorrow_night_eighties',
            'clouds', 'iplastic', 'solarized_dark', 'tomorrow_night',
            'clouds_midnight', 'katzenmilch', 'solarized_light', 'twilight',
            'cobalt', 'kr_theme', 'sqlserver', 'vibrant_ink',
            'crimson_editor', 'kuroir', 'terminal', 'xcode',
            'dawn', 'merbivore', 'textmate',
            'dreamweaver', 'merbivore_soft', 'tomorrow','dracula'
        ];

        this.current={};


        this.constructor = () =>
        {
            let ls=localStorageService.get('UserPreference');

            this.current=_.merge(DEFAULT,ls);
            // console.log(ls,this.current);
            // merge current + ls



        };

        this.constructor();



        this.getThemes = () =>
        {
          return Themes;
        };

        this.getEditorThemes = () =>
        {
          return EditorTheme;
        };


        this.apply = (state) =>{
            _.forEach(state,(item,key) => {
                // console.log("Apply ",key,item);
                this.set(key,item);
            });
            this.save();
        };
        this.save = () =>{
            console.log("localStorageService,set",this.current);
            localStorageService.set('UserPreference', this.current);
        };

        this.getCurrentState = () =>
        {
          return this.current;
        };

        this.get = (key) =>{
            return DEFAULT[key];
        };

        this.set = (key,value)=> {

            if (key=='theme')
            {
                // check
            }
            if (key=='editorTheme')
            {
                // check
            }
            if (
                    key=='limitRows' ||
                    key=='limitTimes' ||
                    key=='fontSize' ||
                    key=='liveAutocompletionDelay' ||
                    key=='liveAutocompletionThreshold'
            )
            {
                value=parseInt(value);
            }
            this.current[key]=value;


        };


        // $scope.$watch('vars.cacheDatabaseStructure', (curr) => localStorageService.set('cacheDatabaseStructure', curr));
        // $scope.$watch('vars.limitRows', (curr) => localStorageService.set('editorLimitRows', curr));
        // $scope.$watch('vars.limitTimes', (curr) => localStorageService.set('editorLimitTimes', curr));

    }
})(angular, smi2);
