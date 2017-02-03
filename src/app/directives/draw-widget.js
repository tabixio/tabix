/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

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


    function buildDrawChart(widget) {
        let html='';

        let x=widget.draw;
        if (widget.library=='echart') {
            console.info('DW:echart');
        }
        if (widget.library=='c3') {
            console.info('DW:c3');
        }
        if (widget.library=='d3') {
            console.info('DW:d3');
        }
        if (widget.library=='amchart') {
            console.info('DW:amchart');
        }

        if (widget.preProcessor instanceof Function) {
            widget.preProcessor();
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

        return html;
    }




    function buildLinkFunc($compile) {

        return function (scope, element, attrs) {
            console.warn('buildLinkFunc',scope.widget);
            // ---------------------------------------------------------------------------------------------
            // Text & Error RENDER

            if (scope.widget.type=='table' && scope.widget.text)
            {
                let x = angular.element( '<pre class="fs-caption">'+scope.widget.text+'</pre>');
                element.append(x);
                $compile(x)(scope);
                return ;
            }
            if (scope.widget.type=='table' && scope.widget.error)
            {
                console.warn("Error",scope.widget.error);
                let x = angular.element( '<pre class="fs-caption tc-red-700">'+scope.widget.error+'</pre>');
                element.append(x);
                $compile(x)(scope);
                return ;
            }

            if (scope.widget.error || scope.widget.textformat)
            {
                return ;
            }

            // ---------------------------------------------------------------------------------------------
            // TABLE RENDER


            if (scope.widget.type=='table' && !scope.widget.error)
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

            // ---------------------------------------------------------------------------------------------
            // RIVOT RENDER
            if (scope.widget.type=='draw' && !scope.widget.error )
            {
                let x=angular.element(buildDrawChart(scope.widget));
                element.append(x);
                $compile(x)(scope);
            }
            if (scope.widget.type=='pivot' && !scope.widget.error)
            {
                //
                let x = angular.element(`<pivot data="widget.data.data" config="widget.pivot.config" edit-mode="true" style="width: 100%;height: 100%;border: 1px solid red"></pivot>`);
                element.append(x);
                $compile(x)(scope);

            }



        };
    }

})(angular, smi2);