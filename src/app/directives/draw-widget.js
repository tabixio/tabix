/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).directive('drawWidget', ['$compile','$rootScope', function ($compile,$rootScope) {
        return {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                widget: '=widget',
                isdark: '=isdark'
            },
            link: buildLinkFunc($compile,$rootScope)
        };
    }]);


    function buildDrawChart(widget) {
        let html='';

        if (widget.draw.library=='echarts') {

            html = `<div style="width: 100%;height: 100%;border: 2px solid red"><echarts options="widget.draw.options" height="100px" ng-if="widget.draw.init" width="100px"></echarts></div>`

//            html = `<div style="width: 100%;height: 100%;border: 2px solid red" data-iu-chart="widget.draw.options"  ng-if="widget.draw.init"></div>`

        }
        if (widget.draw.library=='c3') {
            console.info('DW:c3');
        }
        if (widget.draw.library=='d3') {
            console.info('DW:d3');
        }
        if (widget.draw.library=='amchart') {
            html = `<am-chart options="widget.draw.options" height="100%"  width="100%"></am-chart>`;

        }
        if (!html) {
            console.warn('buildDrawChart , false in html code');

            return ;
        }

        console.warn('buildDrawChart',html);


        if (widget.preProcessor instanceof Function) {
            widget.preProcessor();
        }
        if (widget.draw.preProcessor instanceof Function) {
            widget.draw.preProcessor();
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




    function buildLinkFunc($compile,$rootScope) {

        return function (scope, element, attrs) {
            // console.warn('buildLinkFunc',scope.widget);
            // ---------------------------------------------------------------------------------------------
            // Text & Error RENDER

            scope.widget.isDark=scope.isdark;
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
            // $rootScope.$on('gridster-loaded', function(item) {
            //     console.info('> > >$rootScope gridster-loaded',item);
            //
            // });

            // $rootScope.$on('gridster-item-resized', function(item) {
            //     console.info('> > >$rootScope  gridster-item-resized < < < < <',item);
            // });


            scope.$watch('widget.sizeY', function(){
                // изменился размер
                scope.widget.onResize(element.parent().width(),element.parent().height());

            }, true);
            scope.$watch('widget.sizeX', function(){
                // изменился размер
                scope.widget.onResize(element.parent().width(),element.parent().height());

            }, true);

            if (scope.widget.type=='table' && !scope.widget.error)
            {
                scope.widget.element = angular.element(`<hot-table
                        settings="widget.table.settings"
                        datarows="widget.data.data"
                        ng-class="{'handsontable-dark': widget.isDark}"
                        width="widget.table.width"
                        col-headers="widget.table.colHeaders"
                        manual-column-resize="true"
                    ></hot-table>`);

                scope.widget.scheduledResize();

            }
//

            // ---------------------------------------------------------------------------------------------
            // RIVOT RENDER
            if (scope.widget.type=='draw' && !scope.widget.error )
            {
                scope.widget.element = angular.element(buildDrawChart(scope.widget));

            }
            if (scope.widget.type=='pivot' && !scope.widget.error)
            {
                scope.widget.element = angular.element(`<div><pivot data="widget.data.data" config="widget.pivot.config" edit-mode="true"></pivot></div>`);

            }

            element.append(scope.widget.element);
            $compile(scope.widget.element)(scope);


        };
    }

})(angular, smi2);