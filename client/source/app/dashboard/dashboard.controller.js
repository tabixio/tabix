(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['userAPI'];
    /* @ngInject */
    function DashboardController (userAPI) {
        var vm = this;

        vm.colors = [
            'bgc-indigo-500',
            'bgc-red-500',
            'bgc-pink-500'
        ];

        init();

        //////////////

        function init () {
            vm.userInfo = userAPI.getUserInfo();
            _getProductsSummary();
        }

        function _getProductsSummary () {
            userAPI.getProductSummary()
                .then(function (data) {
                    vm.products = data;
                    vm.products.forEach(function (product) {
                        product.link = 'root.' + product.name;
                    });
                });
        }
    }
})();
