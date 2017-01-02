'use strict';
// 1.0.4

angular.module('amChartsDirective', []).directive('amChart', ['$q', function ($q) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      options: '=',
      chart: '=?',
      height: '@',
      width: '@',
      id: '@'
    },
    template: '<div class="amchart"></div>',
    link: function ($scope, $el) {


      var id = getIdForUseInAmCharts();
      $el.attr('id', id);
      var chart;
      $scope.chart = chart;

      // allow $scope.options to be a promise
      $q.when($scope.options).then(function(options){
        // we can't render a chart without any data
        if (options.data) {
          var renderChart = function (amChartOptions) {
            var o = amChartOptions || options;

            // set height and width
            var height = $scope.height || '100%';
            var width = $scope.width || '100%';

            $el.css({
              'height': height,
              'width': width
            });

            // instantiate new chart object
            if (o.type === 'xy') {
              chart = o.theme ? new AmCharts.AmXYChart(AmCharts.themes[o.theme]) : new AmCharts.AmXYChart();
            } else if (o.type === 'pie') {
              chart = o.theme ? new AmCharts.AmPieChart(AmCharts.themes[o.theme]) : new AmCharts.AmPieChart();
            } else if (o.type === 'funnel') {
              chart = o.theme ? new AmCharts.AmFunnelChart(AmCharts.themes[o.theme]) : new AmCharts.AmFunnelChart();
            } else if (o.type === 'radar') {
              chart = o.theme ? new AmCharts.AmRadarChart(AmCharts.themes[o.theme]) : new AmCharts.AmRadarChart();
            } else {
              chart = o.theme ? new AmCharts.AmSerialChart(AmCharts.themes[o.theme]) : new AmCharts.AmSerialChart();
            }

            /** set some default values that amCharts doesnt provide **/
            $q.when(o.data)
              .then(function (data) {

                chart.dataProvider = data;
                // if a category field is not specified, attempt to use the first field from an object in the array
                chart.categoryField = o.categoryField || Object.keys(o.data[0])[0];
                chart.startDuration = 0.5; // default animation length, because everyone loves a little pizazz

                // AutoMargin is on by default, but the default 20px all around seems to create unnecessary white space around the control
                chart.autoMargins = true;
                chart.marginTop = 0;
                chart.marginLeft = 0;
                chart.marginBottom = 0;
                chart.marginRight = 0;

                // modify default creditsPosition
                chart.creditsPosition = 'top-right';

                function generateGraphProperties(data) {
                  // Assign Category Axis Properties
                  if (o.categoryAxis) {
                    var categoryAxis = chart.categoryAxis;

                    if (categoryAxis) {
                      /* if we need to create any default values, we should assign them here */
                      categoryAxis.parseDates = true;

                      var keys = Object.keys(o.categoryAxis);
                      for (var i = 0; i < keys.length; i++) {
                        if (!angular.isObject(o.categoryAxis[keys[i]]) || angular.isArray(o.categoryAxis[keys[i]])) {
                          categoryAxis[keys[i]] = o.categoryAxis[keys[i]];
                        } else {
                          console.log('Stripped categoryAxis obj ' + keys[i]);
                        }
                      }
                      chart.categoryAxis = categoryAxis;
                    }
                  }

                  // Create value axis

                  /* if we need to create any default values, we should assign them here */

                  var addValueAxis = function (a) {
                    var valueAxis = new AmCharts.ValueAxis();

                    var keys = Object.keys(a);
                    for (var i = 0; i < keys.length; i++) {
                      valueAxis[keys[i]] = a[keys[i]];
                    }
                    chart.addValueAxis(valueAxis);
                  };

                  if (o.valueAxes && o.valueAxes.length > 0) {
                    for (var i = 0; i < o.valueAxes.length; i++) {
                      addValueAxis(o.valueAxes[i]);
                    }
                  }

                  //reusable function to create graph
                  var addGraph = function (g) {
                    var graph = new AmCharts.AmGraph();
                    /** set some default values that amCharts doesnt provide **/
                    // if a category field is not specified, attempt to use the second field from an object in the array as a default value
                    if(g && o.data && o.data.length > 0) {
                      graph.valueField = g.valueField || Object.keys(o.data[0])[1];
                    }
                    graph.balloonText = '<span style="font-size:14px">[[category]]: <b>[[value]]</b></span>';
                    if (g) {
                      var keys = Object.keys(g);
                      // iterate over all of the properties in the graph object and apply them to the new AmGraph
                      for (var i = 0; i < keys.length; i++) {
                        graph[keys[i]] = g[keys[i]];
                      }
                    }
                    chart.addGraph(graph);
                  };

                  // create the graphs
                  if (o.graphs && o.graphs.length > 0) {
                    for (var i = 0; i < o.graphs.length; i++) {
                      addGraph(o.graphs[i]);
                    }
                  } else {
                    addGraph();
                  }

                  if (o.type === 'gantt' || o.type === 'serial' || o.type === 'xy') {
                    var chartCursor = new AmCharts.ChartCursor();
                    if (o.chartCursor) {
                      var keys = Object.keys(o.chartCursor);
                      for (var i = 0; i < keys.length; i++) {
                        if (typeof o.chartCursor[keys[i]] !== 'object') {
                          chartCursor[keys[i]] = o.chartCursor[keys[i]];
                        }
                      }
                    }
                    chart.addChartCursor(chartCursor);
                  }

                  if (o.chartScrollbar) {
                    var scrollbar = new AmCharts.ChartScrollbar();
                    var keys = Object.keys(o.chartScrollbar);
                    for (var i = 0; i < keys.length; i++) {
                      scrollbar[keys[i]] = o.chartScrollbar[keys[i]];
                    }
                    chart.chartScrollbar = scrollbar;
                  }

                  if (o.balloon) {
                    chart.balloon = o.balloon;
                  }
                }

                function generatePieProperties() {
                  if (o.balloon) {
                    chart.balloon = o.balloon;
                  }
                  if (o.balloonFunction) {
                    chart.balloonFunction = o.balloonFunction;
                  }
                }

                if (o.legend) {
                  var legend = new AmCharts.AmLegend();
                  var keys = Object.keys(o.legend);
                  for (var i = 0; i < keys.length; i++) {
                    legend[keys[i]] = o.legend[keys[i]];
                  }
                  chart.legend = legend;
                }

                if (o.type === 'pie') {
                  generatePieProperties();
                } else {
                  generateGraphProperties();
                }

                if (o.titles) {
                  for (var i = 0;i < o.titles.length;i++) {
                    var title = o.titles[i];
                    chart.addTitle(title.text, title.size, title.color, title.alpha, title.bold);
                  };
                }

                if(o.export) {
                  chart.amExport = o.export;
                  chart.export = o.export;
                }

                if(o.responsive) {
                  chart.responsive = o.responsive;
                }

                if(o.colors) {
                  chart.colors = o.colors;
                }

                if(o.defs) {
                  chart.defs = o.defs;
                }

                if(o.listeners) {
                  for (var i = 0; i < o.listeners.length; i++) {
                    chart.addListener(o.listeners[i].event, o.listeners[i].method);
                  }
                }

                var addEventListeners = function(obj, chartObj) {
                  for(var i = 0; i < obj.length; i++) {
                    if (obj[i].listeners) {
                      var listeners = obj[i].listeners;
                      for (var l = 0; l < listeners.length; l++) {
                        chartObj[i].addListener(listeners[l].event, listeners[l].method);
                      }
                    }
                  }
                };

                var chartKeys = Object.keys(o);
                for (var i = 0; i < chartKeys.length; i++) {
                  if (typeof o[chartKeys[i]] !== 'object' && typeof o[chartKeys[i]] !== 'function') {
                    chart[chartKeys[i]] = o[chartKeys[i]];
                  } else if (typeof o[chartKeys[i]] === 'object') {
                    addEventListeners(o[chartKeys[i]], chart[chartKeys[i]]);
                  }
                }

                // WRITE
                chart.write(id);
                $scope.chart = chart;

              });
          }; //renderchart


          // Render the chart
          renderChart();


          // EVENTS =========================================================================

          var onAmChartsTriggerChartAnimate = $scope.$on('amCharts.triggerChartAnimate', function (event, id) {
            if (id === $el[0].id || !id) {
              chart.animateAgain();
            }
          });

          var onAmChartsUpdateData = $scope.$on('amCharts.updateData', function (event, data, id) {
            if (id === $el[0].id || !id) {
              chart.dataProvider = data;
              chart.validateData();
            }

          });

          var onAmChartsValidateNow = $scope.$on('amCharts.validateNow', function (event, validateData, skipEvents, id) {
            if (id === $el[0].id || !id) {
              chart.validateNow(validateData === undefined ? true : validateData,
                skipEvents === undefined ? false : skipEvents);
            }
          });

          var onAmChartsRenderChart = $scope.$on('amCharts.renderChart', function (event, amChartOptions, id) {
            if (id === $el[0].id || !id) {
              chart.clear();
              renderChart(amChartOptions);
            }
          });

          $scope.$on('$destroy', function () {
            chart.clear();
            //Unregistering event to prevent slow down;
            onAmChartsTriggerChartAnimate();
            onAmChartsUpdateData();
            onAmChartsValidateNow();
            onAmChartsRenderChart();
          });
        }
      });

      function getIdForUseInAmCharts(){
        var id = $scope.id;// try to use existing outer id to create new id

        if (!id){//generate a UUID
          var guid = function guid() {
            function s4() {
              return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
          };
          id = guid();
        }
        return id;
      }
    }
  };
}]);
