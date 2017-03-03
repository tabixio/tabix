/*
 * Copyright (c) 2017. Smi2
 */

angular.module(smi2.app.name)
    .directive('pivot', [function() {
        return {
            restrict: 'AE',
            scope: {
                data: '=',
                config: '=',
                editMode: '='
            },
            link: function(scope, elem, attr) {
                var renderers = $.extend($.pivotUtilities.renderers);

                if (scope.config == null) {
                    scope.config = {
                        rows: [],
                        cols: []
                    };
                }

                scope.renderPivotTable = function() {
                    $(elem).pivot(scope.data, {
                        renderers: renderers,
                        rendererName: "Table",
                        cols: scope.config.cols,
                        rows: scope.config.rows,
                        onRefresh: function(config) {
                            var config_copy = JSON.parse(JSON.stringify(config));
                            //delete some values which are functions
                            delete config_copy["aggregators"];
                            delete config_copy["renderers"];
                            delete config_copy["derivedAttributes"];
                            //delete some bulky default values
                            delete config_copy["rendererOptions"];
                            delete config_copy["localeStrings"];
                            scope.config = config_copy;
                            scope.$apply();
                        }
                    });
                };

                scope.renderPivotUITable = function() {
                    $(elem).pivotUI(scope.data);

                    // , {
                    //     renderers: renderers,
                    //     rendererName: "Table",
                    //     cols: scope.config.cols,
                    //     rows: scope.config.rows,
                    //     onRefresh: function(config) {
                    //         var config_copy = JSON.parse(JSON.stringify(config));
                    //         //delete some values which are functions
                    //         delete config_copy["aggregators"];
                    //         delete config_copy["renderers"];
                    //         delete config_copy["derivedAttributes"];
                    //         //delete some bulky default values
                    //         delete config_copy["rendererOptions"];
                    //         delete config_copy["localeStrings"];
                    //         scope.config = config_copy;
                    //         scope.$apply();
                    //     }
                    // });
                };

                scope.$watch('scope.editMode', function(newValue, oldValue) {
                    console.log("watch" + scope.editMode);
                    if (newValue) {
                        if (scope.editMode) {
                            scope.renderPivotUITable();
                        } else {
                            scope.renderPivotTable();
                        }
                    }
                }, true);
                scope.renderPivotUITable();

                // if (scope.editMode) {

                // } else {
                //     scope.renderPivotTable();
                // }
            }
        };
    }]);
