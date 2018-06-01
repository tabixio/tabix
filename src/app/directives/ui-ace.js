'use strict';
/**
 * Binds a ACE Editor widget
 */
angular.module('ui.ace', [])
  .constant('uiAceConfig', {})
  .directive('uiAce', ['uiAceConfig', function (uiAceConfig) {
    if (angular.isUndefined(window.ace)) {
      throw new Error('ui-ace need ace to work... (o rly?)');
    }
    return {
      restrict: 'EA',
      scope:{
            onChange:'=?',
            load:'=?'
      },
      link: function (scope, elm, attrs) {

        /**
         * ACE editor
         * @type object
         */
        let acee = window.ace.edit(elm[0]);

        scope.load(acee);

        if (scope.onChange) {
            console.warn("Ace+bind:scope.onChange");
            acee.session.on('change', function (e) {
                scope.onChange(acee.session);
            });
        }

        elm.on('$destroy', function () {
          acee.session.$stopWorker();
          acee.destroy();
        });
        // low speed watch
        scope.$watch(function() {
          return [elm[0].offsetWidth, elm[0].offsetHeight];
        }, function() {
          acee.resize();
          acee.renderer.updateFull();
        }, true);

      }
    };
  }]);
