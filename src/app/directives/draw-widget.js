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
            template: '<div style="background: wheat;border: 1px solid sienna;height:100%;width:100%"></div>',
            scope: {
                widget: '=widget',
                isdark: '=isdark'
            },
            link: buildLinkFunc($compile,$rootScope)
        };
    }]);


    function buildDrawChart(widget,element) {
        let html='';

        if (widget.draw.library=='echarts') {
            widget.draw.chart = echarts.init(element[0], 'macarons');
            console.log(element[0]);
            html=false;
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


        // ------------------------------------------------------------------------------------------------------------------
        console.warn('buildDrawChart',html);


        if (widget.preProcessor instanceof Function) {
            widget.preProcessor();
        }

        if (widget.draw.preProcessor instanceof Function) {
            widget.draw.preProcessor();
        }


        // ------------------------------------------------------------------------------------------------------------------
        if (widget.draw.library=='echarts') {
            widget.draw.chart.setOption(widget.draw.options);
            widget.draw.chart.resize();
            // angular.element($window).bind('resize', function(){
            //         widget.chart.resize();
            // });
            // при изменении в виджете
            // scope.$watch('widget.draw', function (newVal, oldVal) {
            //     if (angular.equals(newVal, oldVal)) return;
            //     createChart(widget);
            // })


            // if(scope.config && scope.config.event){
            //     if(angular.isArray(scope.config.event)){
            //         angular.forEach(scope.config.event,function(value,key){
            //             for(var e in value){
            //                 chart.on(e,value[e]);
            //             }
            //         });
            //     }
            // }


            // scope.$watch(
            //     function () { return scope.config; },
            //     function (value) {if (value) {refreshChart();}},
            //     true
            // );
            //
            // //图表原生option
            // scope.$watch(
            //     function () { return scope.option; },
            //     function (value) {if (value) {refreshChart();}},
            //     true
            // );
        }

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
                scope.widget.element = false;
                let html=buildDrawChart(scope.widget,element);
                if (html)
                {
                    scope.widget.element = angular.element(html);
                }



            }
            if (scope.widget.type=='pivot' && !scope.widget.error)
            {
                scope.widget.element = angular.element(`<div><pivot data="widget.data.data" config="widget.pivot.config" edit-mode="true"></pivot></div>`);
            }

            if (scope.widget.element)
            {
                element.append(scope.widget.element);
                $compile(scope.widget.element)(scope);
            }


        };
    }

})(angular, smi2);