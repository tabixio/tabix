((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).directive('mousepointMenu', MousepointMenu);

    function MousepointMenu() {
        return {
            restrict: 'A',
            require: 'mdMenu',
            link: function($scope, $element, $attrs, RightClickContextMenu){
                $scope.$mdOpenMousepointMenu = function($event){
                    const offset = angular.element($event.currentTarget).offset();
                    RightClickContextMenu.offsets = function(){
                        return {
                            left: $event.pageX - offset.left,
                            top: $event.pageY - offset.top + 8
                        };
                    };
                    RightClickContextMenu.open($event);
                };
            }
        };
    }
})(angular, smi2);
