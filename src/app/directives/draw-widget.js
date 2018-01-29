/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */

((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).directive('drawWidget', ['$compile','$timeout', function ($compile,$timeout) {
        return {
            restrict: 'EA',
            template: '<div style="width: 100%;height: 100%"></div>',
            scope: {
                widget: '=widget',
                isdark: '=isdark'
            },
            replace:true,
            link: buildLinkFunc($compile,$timeout)
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
        if (widget.draw.library=='plotly') {

            widget.element = angular.element(`<div style="width: 100%;height: 100%" class="plotlyDark">&nbsp;</div>`);
            html=false;

        }
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




    function buildLinkFunc($compile,$timeout) {
        return function (scope, element, attrs) {
            let type=scope.widget.type;
            // console.group("drawWidget.buildLinkFunc:"+type);
            console.time("drawWidget.buildLinkFunc");
            // задаем виджету стиль темный / светлый
            scope.widget.isDark=scope.isdark;


            // Запускаем пре процессоры, преобразуют данные для виджета
            if (scope.widget.preProcessor instanceof Function) {
                scope.widget.preProcessor();
            }


            // <div ng-bind-html="w.error" class="" ng-if="w.error"></div>
            //     <div ng-bind-html="w.text"  ng-if="w.text"></div>
            //     <span ng-if="w.empty">No data</span>
            // -------------------------------- Text & Error RENDER ----------------------------------------------
            // Если widget содержит ошибку или в поле textformat не false => результат это текс, отрисует сам WidgetsList.html
            if (scope.widget.error || scope.widget.textformat || scope.widget.text || scope.widget.empty )
            {
                console.log("widget Have Error",scope.widget.error);
                if (scope.widget.error) element.html("<pre>"+scope.widget.error+"</pre>");
                if (scope.widget.text ) element.html("<pre>"+scope.widget.text+"</pre>");
                if (scope.widget.empty ) element.html("NO DATA");
                element.addClass("grid-monospace");
                return ;
            }
            // ------------------------------------ TABLE ---------------------------------------------------------
            // TABLE RENDER
            if (scope.widget.type=='table')
            {
                // создаем пустой div
                scope.widget.element = angular.element('<DIV class="widget-handsontable '+(scope.widget.isDark?'handsontable-dark':'')+'"></DIV>');
                // Далее postProcessor в классе WidgetTable управляет таблицой - создает new Handsontable
            }

            // ------------------------------------- DRAW --------------------------------------------------------
            // Если тип виджета DRAW ( график ) получаем html, котороый рисует другую дерективу
            // Или можем получить уже готовый scope.widget.element, тогда в HTML будет FALSE
            if (scope.widget.type=='draw' )
            {
                scope.widget.element = false;
                let html=buildDrawChart(scope.widget,element,$timeout);
                if (html)
                {
                    scope.widget.element = angular.element(html);
                }
            }
            // --------------------------------------- PIVOT ------------------------------------------------------
            // Если нужно отрисовать PivotJS
            if (scope.widget.type=='pivot')
            {
                scope.widget.element = angular.element(`<pivot style=" transition: none !important;" data="widget.data.data" config="widget.pivot.config" edit-mode="true"></pivot>`);
            }

            // ------------------------------------------------------------------------------------------------------------------------------------------------------------
            // Отрисуем элемент
            if (scope.widget.element)
            {
                element.append(scope.widget.element);
                $compile(scope.widget.element)(scope);

                scope.widget.element.on("$destroy", scope.widget.destroy(scope.widget));
            }
            else {
                element.on("$destroy", scope.widget.destroy(scope.widget));
            }

            // Запускаем пре процессоры, преобразуют данные для виджета
            if (scope.widget.postProcessor instanceof Function) {
                scope.widget.postProcessor();
            }

            // после того как виджет подготовлен и отрисован, запланируем widget ресайз
            // scope.widget.scheduledResize();
            // подписываемся на изменение размера, и запланируем widget ресайз
            // scope.$watch('widget.sizeY', function(){
            //     // изменился размер
            //     scope.widget.scheduledResize();
            // }, true);
            //
            // scope.$watch('widget.sizeX', function(){
            //     // изменился размер
            //     scope.widget.scheduledResize();
            // }, true);

            // ------------------------------------------------------------------------------------------------------------------
            // Доп ресайзеры
            // We want to manually handle `window.resize` event in each directive.
            // So that we emulate `resize` event using $broadcast method and internally subscribe to this event in each directive
            // Define event handler
            // angular.element(window).on('resize', function(e)
            //     { scope.$broadcast('resize'); });




            //
            scope.$watch(
                function () {
                    return [element[0].offsetWidth, element[0].offsetHeight].join('x');
                },
                function (value) {
                    scope.widget.scheduledResize();
                }
            );

            //
            scope.events = {
               resize: function(e, scope){
                   $timeout(function(){
                       // console.log("scope.events.resize");
                       scope.widget.scheduledResize();
                       // scope.api.update()
                   },300)
               }
            };
            $timeout(function(){
                scope.widget.scheduledResize();
            },300);



            // console.groupEnd("drawWidget.buildLinkFunc:"+type);
            console.timeEnd("drawWidget.buildLinkFunc");
        };
    }

})(angular, smi2);
