((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).directive('drawWidget', ['$window', function ($window) {
        return {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                widget: '=widget'
            },
            link: buildLinkFunc($window)
        };
    }]);

console.log("<<<<widgetDraw>>>>>");
    function buildLinkFunc($window) {

        return function (scope, ele, attrs) {
            console.warn('buildLinkFunc',scope);

            var chart, options;
            chart = echarts.init(ele[0], 'macarons');

            //
            createChart(scope.widget);

            //
            function createChart(options) {
                if (!options) return;

                chart.setOption(options);
                // scope.$emit('create', chart);

                angular.element($window).bind('resize', function(){
                    chart.resize();
                });

            }

            // при изменении в виджете
            scope.$watch('widget', function (newVal, oldVal) {
                if (angular.equals(newVal, oldVal)) return;
                createChart(widget);
            })


        };
    }

});
