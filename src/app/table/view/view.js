(function (angular, smi2) {
    'use strict';

    angular.module(smi2.app.name).controller('ViewController', ViewController);
    ViewController.$inject = ['$scope', '$rootScope', '$stateParams', 'LxNotificationService', 'API'];

    /**
     * @ngdoc controller
     * @name smi2.controller:ViewController
     * @description Контроллер просмотра данных таблицы БД
     */
    function ViewController($scope, $rootScope, $stateParams, LxNotificationService, API) {

        $rootScope.breadcrumbs = [{
            text: 'База ' + $stateParams.dbName,
            link: 'database'
        }, {
            text: 'Таблица ' + $stateParams.tableName,
            link: 'table'
        }, {
            text: 'Просмотр',
            link: 'view'
        }];


        $scope.vars = {
            data: null,
            grid: null,
            limit: 100,
            offset: 0
        };

        $scope.load = function () {
            $scope.vars.data = -1;
            API.query('select * from ' + $stateParams.dbName + '.' + $stateParams.tableName + ' limit ' + $scope.vars.offset + ', ' + $scope.vars.limit).then(function (data) {
                $scope.vars.data = API.dataToHtml(data);
                $scope.vars.grid = API.dataToUIGrid(data);
console.warn($scope.vars.grid);

            }, function (response) {
                LxNotificationService.error('Ошибка ' + response);
            });
        };

        $scope.loadNext = function () {
            $scope.vars.offset += $scope.vars.limit;
            $scope.load();
        };

        $scope.loadPrev = function () {
            if ($scope.vars.offset > 0) {
                $scope.vars.offset -= $scope.vars.limit;
                $scope.load();
            }
        };

        $scope.load();
    }
})(angular, smi2);
