((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).directive('ngRightClick', NgRightClick);
    NgRightClick.$inject = ['$parse'];

    function NgRightClick ($parse) {
        return function(scope, element, attrs) {
            let fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
            });
        };
    }
})(angular, smi2);
