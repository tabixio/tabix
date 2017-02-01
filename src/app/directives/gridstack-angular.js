/*
 * Copyright (c) 2017. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

/**
 * gridstack-angular - Angular Gridstack.js directive
 * @version v0.5.0
 * @author Kevin Dietrich
 * @link https://github.com/kdietrich/gridstack-angular#readme
 * @license MIT
 */
(function() {
'use strict';

angular.module('gridstack-angular', []);

var app = angular.module('gridstack-angular');

app.controller('GridstackController', ['$scope', function($scope) {

  var gridstack = null;

  this.init = function(element, options) {
    gridstack = element.gridstack(options).data('gridstack');
    return gridstack;
  };

  this.removeItem = function(element) {
    if(gridstack) {
      return gridstack.removeWidget(element, false);
    }
    return null;
  };



  this.addItem = function(element) {
    if(gridstack) {
      gridstack.makeWidget(element);
      return element;
    }
    return null;
  };

}]);
})();
(function() {
'use strict';

var app = angular.module('gridstack-angular');

app.directive('gridstack', ['$timeout', function($timeout) {

  return {
    restrict: 'A',
    controller: 'GridstackController',
    scope: {
      onChange: '&',
      onDragStart: '&',
      onDragStop: '&',
      onResizeStart: '&',
      onResizeStop: '&',
      gridstackHandler: '=?',
      gridStatic: '=',
      options: '='
    },
    link: function(scope, element, attrs, controller, ngModel) {

      var gridstack = controller.init(element, scope.options);
      scope.gridstackHandler = gridstack;

      scope.$watch('gridStatic', function(val) {
            if (!gridstack) return;
            gridstack.setStatic(val);
      });

      element.on('change', function(e, items) {
        $timeout(function() {
          console.log("enable",scope.enable);

          scope.$apply();
          scope.onChange({event: e, items: items});
        });
      });

      element.on('dragstart', function(e, ui) {
        scope.onDragStart({event: e, ui: ui});
      });

      element.on('dragstop', function(e, ui) {
        $timeout(function() {
          scope.$apply();
          scope.onDragStop({event: e, ui: ui});
        });
      });

      element.on('resizestart', function(e, ui) {
        scope.onResizeStart({event: e, ui: ui});
      });

      element.on('resizestop', function(e, ui) {
        $timeout(function() {
          scope.$apply();
          scope.onResizeStop({event: e, ui: ui});
        });
      });

    }
  };

}]);
})();

(function() {
'use strict';

var app = angular.module('gridstack-angular');

app.directive('gridstackItem', ['$timeout', function($timeout) {

  return {
    restrict: 'A',
    controller: 'GridstackController',
    require: '^gridstack',
    scope: {
      gridstackItem: '=',
      onItemAdded: '&',
      onItemRemoved: '&',
      gsItemId: '=?',
      gsItemX: '=',
      gsItemY: '=',
      gsItemWidth: '=',
      gsItemHeight: '=',
      gsItemAutopos: '='
    },
    link: function(scope, element, attrs, controller) {
      if (scope.gsItemId) {
        $(element).attr('data-gs-id', scope.gsItemId);
      }
      $(element).attr('data-gs-x', scope.gsItemX);
      $(element).attr('data-gs-y', scope.gsItemY);
      $(element).attr('data-gs-width', scope.gsItemWidth);
      $(element).attr('data-gs-height', scope.gsItemHeight);
      $(element).attr('data-gs-auto-position', scope.gsItemAutopos);
      var widget = controller.addItem(element);
      var item = element.data('_gridstack_node');
      $timeout(function() {
        scope.onItemAdded({item: item});
      });

      scope.$watch(function() { return $(element).attr('data-gs-id'); }, function(val) {
        scope.gsItemId = val;
      });

      scope.$watch(function() { return $(element).attr('data-gs-x'); }, function(val) {
        scope.gsItemX = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-y'); }, function(val) {
        scope.gsItemY = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-width'); }, function(val) {
        scope.gsItemWidth = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-height'); }, function(val) {
        scope.gsItemHeight = Number(val);
      });

      element.bind('$destroy', function() {
        var item = element.data('_gridstack_node');
        scope.onItemRemoved({item: item});
        controller.removeItem(element);
      });

    }

  };

}]);
})();
