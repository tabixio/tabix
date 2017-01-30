((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).directive('drawWidget', ['$compile', function ($compile) {
        return {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                widget: '=widget'
            },
            link: buildLinkFunc($compile)
        };
    }]);


    function buildLinkFunc($compile) {

        return function (scope, element, attrs) {
            console.warn('buildLinkFunc',scope.widget);

            // var x = angular.element('<child-directive></child-directive><child-directive></child-directive>');
            //
            //
            if (scope.widget.type=='table')
            {

                // ng-class="{'handsontable-dark': vars.isDark}"
                let x= angular.element(`<hot-table

                        settings="widget.table.settings"
                        datarows="widget.data.data"
                        style="width: 100%;height: 100%;border: 1px solid red"
                        col-headers="widget.table.colHeaders"
                        manual-column-resize="true"
                    ></hot-table>`);



                element.append(x);
                $compile(x)(scope);

            }
            if (scope.widget.type=='pivot')
            {
                //
                let x = angular.element(`<pivot data="widget.data.data" config="widget.pivot.config" edit-mode="true" style="width: 100%;height: 100%;border: 1px solid red"></pivot>`);
                element.append(x);
                $compile(x)(scope);

            }
            //
            // var chart, options;
            // chart = echarts.init(ele[0], 'macarons');
            //
            // //
            // createChart(scope.widget);
            //
            // //
            // function createChart(options) {
            //     if (!options) return;
            //
            //     chart.setOption(options);
            //     // scope.$emit('create', chart);
            //
            //     angular.element($window).bind('resize', function(){
            //         chart.resize();
            //     });
            //
            // }
            //
            // // при изменении в виджете
            // scope.$watch('widget', function (newVal, oldVal) {
            //     if (angular.equals(newVal, oldVal)) return;
            //     createChart(widget);
            // })


        };
    }

})(angular, smi2);