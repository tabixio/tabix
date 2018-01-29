(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('EditController', EditController);
    EditController.$inject = [
        '$scope',
        'API',
        'ThemeService',
        '$interval',
        'localStorageService',
        '$mdDialog',
        '$window',
        'hotRegisterer'
    ];


    function EditController($scope, API, ThemeService, $interval, localStorageService,$mdDialog,$window,hotRegisterer) {

        $scope.vars = {
            loading:false,
            show:false,
            counter:10,
        };
        $scope.aceLoaded = (editor) => {
            console.log("aceLoaded : ACE editor init on creation");
            editor.$blockScrolling = Infinity;
            editor.setOptions({
                fontSize: '14px',
                enableBasicAutocompletion : true,
                behavioursEnabled:true ,
                wrapBehavioursEnabled:true ,
                highlightSelectedWord:true ,
                showInvisibles:true ,
                showGutter:true ,
                useWrapMode : true,
                enableLiveAutocompletion:true,
                liveAutocompletionDelay: 500,
                liveAutocompletionThreshold: 1
            });
            editor.setTheme('ace/theme/cobalt');

            editor.clearSelection();
            editor.focus();
            editor.selection.moveTo(0, 0);


            editor.session.setMode({
                path: "ace/mode/clickhouse",
                v: Date.now()
            });
            editor.session.bgTokenizer.start(0);

            editor.session.setValue("SELECT * FROM sin(),cos()");

        }

    }
})(angular, smi2);
