"use strict";
angular.module('iu',[])
/**
 * iuChart指令，基于echarts构建
 * @author huk/2015.01.07
 * @description
 * 属性version表示版本号，对需要动态更新option的场景，更新其值时表示刷新图表。
 * 属性onRegisterApi用于注册API接口，其中api对象的registeEvents用于注册事件。
 */
.directive('iuChart',function(){
    return {
      restrict: 'EA',
      template: '<div></div>',
      replace: true,
      scope: {
        iuChart: '='
      },
      link: function (scope, elem, attrs, controller) {
        var dom,api,chart,eventId,watch, option = scope.iuChart;

        initializeChart();

        /**
         * initialize Chart
         */
        function initializeChart(){
          dom = elem.find('div')[0] || elem[0];
          if(option.height){
              dom.height(option.height);
          } else if (!dom.clientHeight){
            dom.height(elem.height() || elem.parent().height() || 220);
          }
          chart = option.theme ? echarts.init(dom,option.theme) : echarts.init(dom);
          chart.setOption(option);

          if (angular.isFunction(option.onRegisterApi)) {
            initializeApi();
            option.onRegisterApi(api);
          }

          if(angular.isDefined(scope.iuChart.version)){
            watch = scope.$watch('iuChart.version',function(newValue,oldValue){
              if(newValue !== oldValue) {
                  chart.setOption(option,true);
              }
            });
          }

          scope.$on('$destroy', function () {
            if (watch) {
              watch();
            }
            chart.dispose();
            chart = null;
          });

          $(window).resize(function () {
            chart.resize();
          });
        }
        /**
         * create api interface
         */
        function initializeApi() {
          api = {
            set:function(newOption){
              chart.setOption(newOption,true);
            },
            /**
             * get eCharts instance
             * @returns {object} echart
             */
            getInstance : function(){
              return chart;
            },
            /**
             * dynamic add data
             * @param data
             */
            addData: function (data) {
              chart.addData(data);
            },

            /**
             * connect to other chart
             * @param oApi
             * @param nApi 可选
             */
            connect : function(oApi,nApi){
              if(oApi && nApi) {
                chart.connect([oApi.getInstance(), nApi.getInstance()]);
              }else{
                chart.connect([oApi.getInstance()]);
              }
            },
            /**
             * remove chart connect
             * @param oAPi
             */
            disConnect : function(oAPi){
              chart.disConnect(oAPi.getInstance());
            },

            /**
             * set chart theme
             * @param name
             */
            setTheme: function (name) {
              //todo
            },
            /**
             * show loading
             * @param loading
             */
            showLoading: function (loading) {
              //todo
            },
            /**
             * hide loading
             */
            hideLoading: function () {
                //todo
            },

            /**
             * get chart's image
             * @param imgType
             */
            getImage : function(imgType){
              return chart.getImage(imgType||'png');
            },
            /**
             * resize chart
             */
            resize : function(){
              chart.resize();
            },
            /**
             * refresh chart
             */
            refresh : function(){
              chart.refresh();
            },
            /**
             * restore to initial state
             */
            restore : function(){
              chart.restore();
            },
            /**
             * clear customer element
             */
            clear : function(){
              chart.clear();
            },
            /**
             * registe Events
             * @param oScope
             * @param events  事件数组:int数值集合
             * @param handler
             */
            registeEvents: function (oScope, events,handler) {
              this.events = {
                CLICK : events.indexOf(1) !== -1,
                DBLCLICK : events.indexOf(2) !== -1,
                DATA_ZOOM : events.indexOf(3) !== -1,
                LEGEND_SELECTED : events.indexOf(4) !== -1,
                LEGEND_HOVERLINK : events.indexOf(5) !== -1,
                HOVER : events.indexOf(6) !== -1,
                MAP_SELECTED : events.indexOf(7) !== -1,
                PIE_SELECTED : events.indexOf(8) !== -1
              };

              registerAngularEvent(oScope, handler);
            },

            unRegisteEvents : function(oScope,events){

            }
          };
        }

        /**
         * register angular event
         * @param oScope
         * @param handler
         * @returns {*}
         */
        function registerAngularEvent(oScope, handler) {
          eventId =  uuid();
          return oScope.$on(eventId, function (event) {
            var args = Array.prototype.slice.call(arguments);
            args.splice(0, 1);
            handler.apply(oScope, args);
          });
        }

        function uuid(){
          return 'xxxxxxxx-xxxx-8xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 3 | 8);
            return v.toString(16);
          });
        }

        /**
         * register chart event
         */
        function registerChartEvent(){
          if (api.events) {
            if(api.events.CLICK) {
              chart.on(echarts.config.EVENT.CLICK, raiseCallBack);
            }
            if(api.events.DBLCLICK) {
              chart.on(echarts.config.EVENT.DBLCLICK, raiseCallBack);
            }
            if(api.events.HOVER) {
              chart.on(echarts.config.EVENT.HOVER, raiseCallBack);
            }
            if(api.events.DATA_ZOOM) {
              chart.on(echarts.config.EVENT.DATA_ZOOM, raiseCallBack);
            }
            if(api.events.LEGEND_SELECTED) {
              chart.on(echarts.config.EVENT.LEGEND_SELECTED, raiseCallBack);
            }
            if(api.events.LEGEND_HOVERLINK) {
              chart.on(echarts.config.EVENT.LEGEND_HOVERLINK, raiseCallBack);
            }
            if(api.events.MAP_SELECTED) {
              chart.on(echarts.config.EVENT.MAP_SELECTED, raiseCallBack);
            }
            if(api.events.PIE_SELECTED) {
              chart.on(echarts.config.EVENT.PIE_SELECTED, raiseCallBack);
            }
          }
        }

        /**
         * raise CallBack
         * @param e
         */
        function raiseCallBack(e) {
          if (api.callbackRised) {
            scope.$emit(eventId, e);
          }
        }
      }
    };
  });
