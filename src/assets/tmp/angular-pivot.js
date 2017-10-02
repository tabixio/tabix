(function(){
    var module = angular.module('angular-pivottable', []);

    module.directive('ngPivot', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                // Build Pivot
                var render = function(data, config){
                    if(data !== undefined){
                        element.pivotUI(data);
                    }else{
                        throw "Invalid data input on angular-pivot directive :) -"
                    }
                }

                //Attempt to load google charts
                if(typeof google != 'undefined') {
                    google.load('visualization', '1.0', {
                        packages: ['corechart','charteditor'],
                        callback: function() {

                            var derivers = $.pivotUtilities.derivers;
                            var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers);
                            var config = {
                                renderers : renderers
                            };
                            // First render
                            render(scope.$eval(attrs.ngPivot), config);
                        }
                    });
                }else{
                    // First render
                    render(scope.$eval(attrs.ngPivot), config);
                    var config = {};
                }

                // Data binding
                scope.$watch(attrs.ngPivot, function(value){
                    // Reload pivot
                    render(value, config);
                })

            }
        }
    })
})();