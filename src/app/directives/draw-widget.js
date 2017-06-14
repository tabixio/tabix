/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).directive('drawWidget', ['$compile','$timeout','hotRegisterer', function ($compile,$timeout,hotRegisterer) {
        return {
            restrict: 'EA',
            template: '<div style="width: 100%;height: 100%"></div>',
            scope: {
                widget: '=widget',
                isdark: '=isdark'
            },
            replace:true,
            link: buildLinkFunc($compile,$timeout,hotRegisterer)
        };
    }]);


    function buildDrawChart(widget,element,$timeout) {
        let html='';
        // ------------------------------------------------------------------------------------------------------------------
        if (widget.draw.library=='echarts') {
            let theme='macarons';
            if (widget.isDark) theme='dark';
            // результат работы сам компонент, а не HTML код
            widget.draw.chart = echarts.init(element[0], theme);
            html=false;
        }

        // ------------------------------------------------------------------------------------------------------------------
        if (widget.draw.library=='c3') {

            let elemDiv= document.createElement('div');
            widget.draw.bindto=elemDiv;
            element[0].appendChild(elemDiv);
            html=false;
        }
        // ------------------------------------------------------------------------------------------------------------------
        if (widget.draw.library=='text') {
            widget.element = angular.element(`<div style="width: 100%;height: 100%">&nbsp;</div>`);
            html=false;
        }
        // ------------------------------------------------------------------------------------------------------------------
        if (widget.draw.library=='d3') {
            console.info('DW:d3');
            // <!--<nvd3 options="widget.chart.options"-->
            // <!--data="widget.chart.data"-->
            // <!--api="widget.chart.api"-->
            // <!--config="config"-->
        }
        // ------------------------------------------------------------------------------------------------------------------
        // Google MAPs
        if (widget.draw.library == 'gmaps') {
            widget.element = angular.element(`<div style="width: 100%;height: 100%">&nbsp;</div>`);
            html = false;
        }
        // ------------------------------------------------------------------------------------------------------------------
        console.group("widget.draw.preProcessor");
        console.time("widget.draw.preProcessor time took");
        if (widget.draw.preProcessor instanceof Function) {
            widget.draw.preProcessor();
        }
        console.timeEnd("widget.draw.preProcessor time took");
        console.groupEnd();
        return html;
    }




    function buildLinkFunc($compile,$timeout,hotRegisterer) {

        return function (scope, element, attrs) {
            // задаем виджету стиль темный / светлый
            scope.widget.isDark=scope.isdark;


            // Запускаем пре процессоры, преобразуют данные для виджета
            if (scope.widget.preProcessor instanceof Function) {
                scope.widget.preProcessor();
            }

            // -------------------------------- Text & Error RENDER ----------------------------------------------
            // Если widget содержит ошибку или в поле textformat не false => результат это текс, отрисует сам WidgetsList.html
            if (scope.widget.error || scope.widget.textformat)
            {
                return ;
            }
            // ------------------------------------ TABLE ---------------------------------------------------------
            // TABLE RENDER
            if (scope.widget.type=='table' && !scope.widget.error)
            {
                scope.widget.element = angular.element(`<hot-table
                        hot-id="`+scope.widget.hotId+`"
                        settings="widget.table.settings"
                        datarows="widget.data.data"
                        ng-class="{'handsontable-dark': widget.isDark}"
                        col-headers="widget.table.colHeaders"
                        manual-column-resize="true"
                        hot-auto-destroy
                    ></hot-table>`);
                // пробрасываем внутрь widget hotRegisterer + указываем hotId -> изнутри виджета имеем доступ к самому handsontable
                scope.widget.hotRegisterer=hotRegisterer;
            }
            // ------------------------------------- DRAW --------------------------------------------------------
            //
            // Если тип виджета DRAW ( график ) получаем html, котороый рисует другую дерективу
            // Или можем получить уже готовый scope.widget.element, тогда в HTML будет FALSE
            if (scope.widget.type=='draw' && !scope.widget.error )
            {
                scope.widget.element = false;
                let html=buildDrawChart(scope.widget,element,$timeout);
                if (html)
                {
                    scope.widget.element = angular.element(html);
                }
            }
            // --------------------------------------- PIVOT ------------------------------------------------------
            //
            // Если нужно отрисовать PivotJS
            if (scope.widget.type=='pivot' && !scope.widget.error)
            {
                scope.widget.element = angular.element(`<pivot style=" transition: none !important;" data="widget.data.data" config="widget.pivot.config" edit-mode="true"></pivot>`);
            }
            // Отрисуем элемент
            if (scope.widget.element)
            {
                element.append(scope.widget.element);
                $compile(scope.widget.element)(scope);
            }
            // после того как виджет подготовлен и отрисован, запланируем widget ресайз
            scope.widget.scheduledResize();
            // подписываемся на изменение размера, и запланируем widget ресайз
            scope.$watch('widget.sizeY', function(){
                // изменился размер
                scope.widget.scheduledResize();
            }, true);
            scope.$watch('widget.sizeX', function(){
                // изменился размер
                scope.widget.scheduledResize();
            }, true);

            // ------------------------------------------------------------------------------------------------------------------
            // Доп ресайзеры
            // We want to manually handle `window.resize` event in each directive.
            // So that we emulate `resize` event using $broadcast method and internally subscribe to this event in each directive
            // Define event handler
            angular.element(window).on('resize', function(e){ scope.$broadcast('resize'); });
            scope.events = {
               resize: function(e, scope){
                   $timeout(function(){
                       console.log("scope.events.resize");
                       scope.widget.scheduledResize();
                       // scope.api.update()
                   },200)
               }
            };

        };
    }

})(angular, smi2);