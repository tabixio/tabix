(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('FooterController', FooterController);

    FooterController.$inject = [];
    /* @ngInject */
    function FooterController () {
        var vm = this;

        vm.year = (new Date()).getFullYear();
    }
})();
