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
        bindCode: '@?',
      link: function (scope, elm, attrs) {

        console.log(scope, elm, attrs);
        /**
         * Corresponds the uiAceConfig ACE configuration.
         * @type object
         */
        var options = uiAceConfig.ace || {};

        /**
         * uiAceConfig merged with user options via json in attribute or data binding
         * @type object
         */
        var opts = angular.extend({}, options, scope.$eval(attrs.uiAce));

        /**
         * ACE editor
         * @type object
         */
        var acee = window.ace.edit(elm[0]);
        var listenerFactory = {
            onChange: function (callback) {
                return function (e) {
                    var newValue = session.getValue();

                    if (ngModel && newValue !== ngModel.$viewValue &&
                        // HACK make sure to only trigger the apply outside of the
                        // digest loop 'cause ACE is actually using this callback
                        // for any text transformation !
                        !scope.$$phase && !scope.$root.$$phase) {
                        scope.$evalAsync(function () {
                            ngModel.$setViewValue(newValue);
                        });
                    }

                    // executeUserCallback(callback, e, acee);
                };
            }

        };


        console.time("Ace Load");
        // console.groupCollapsed("Ace Load");

        opts.onLoad(acee);
        // if (ngModel) {
        //     console.warn("Ace+NG_Model");
        //     acee.session.on('change', onChangeListener);
        // }

        // console.groupEnd("Ace Load");
        console.timeEnd("Ace Load");

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
