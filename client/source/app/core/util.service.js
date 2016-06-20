(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('util', utilSerivce);

    utilSerivce.$inject = [];
    /* @ngInject */
    function utilSerivce () {
        var service = {
            preloadImage: preloadImage
        };

        return service;

        /////////////

        function preloadImage (url) {
            var img = new Image();
            img.src = url;
        }
    }
})();
