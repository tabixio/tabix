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
        'amChartsDirective'
    ]).directive('ngRightClick', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
            });
        };
    })
        .directive('mousepointMenu', [function(){
            return {
                restrict: 'A',
                require: 'mdMenu',
                link: function($scope, $element, $attrs, RightClickContextMenu){
                    // var prev = { x: 0, y: 0 };
                    $scope.$mdOpenMousepointMenu = function($event){
                        RightClickContextMenu.offsets = function(){
                            return {
                                left: $event.offsetX,
                                top: $event.offsetY
                            };
                            //var mouse = {  x: $event.clientX, y: $event.clientY }
                            //var offsets = { left: mouse.x  - prev.x, top: mouse.y  - prev.y  }
                            //prev = mouse;
                            //return offsets;
                        };
                        RightClickContextMenu.open($event);
                    };
                }

            };
        }]);
})();
