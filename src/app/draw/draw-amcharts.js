/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DrawAMcharts extends DrawBasicChart {
    constructor(Widget) {
        console.warn("DrawAMcharts constructor");

        super(Widget)
        this.library = 'amchart';

        // _.set("CODE");

    }

    onResize() {
        this.makeLegend();
    }

    preProcessor() {

        if (this.createChart()) {
            this.init = true;
        }


        console.log("!preProcessor,done", this.init, this.options);


    }


    createChart() {


        let chartSets = {};

        let meta = this.widget.data.meta;

        // ------------- Create Axes
        //
        //

        let dataDateFormat = false;
        let categoryField = "";
        let minPeriod = 'mm';//minute
        let graphs = [];
        let counter = 0;
        let axes = [];
        meta.forEach((i) => {

            if (i.type == 'DateTime') {
                dataDateFormat = "YYYY-MM-DD JJ:NN:SS";
                categoryField = i.name;
            } else {
                if (i.type == 'Date') {
                    dataDateFormat = "YYYY-MM-DD";
                    minPeriod = 'DD';
                    categoryField = i.name;
                }
                else {
                    if (!categoryField) {
                        categoryField = i.name;
                        return;
                    }
                    counter = counter + 1;
                    let g = this.getChartGraph(i, chartSets[i.name]);
                    g.id = 'g' + counter;


                    if (g.valueAxis !== 'v1') {
                        axes.push(g.valueAxis);
                    }
                    graphs.push(g);
                }
            }
        });

        let obl = {

            theme: Widget.isDark ? 'dark' : 'light',
            color: Widget.isDark ? '#eee' : '#333',
            // marginRight: 50,
            // marginLeft: 50,
            // "handDrawn":true,
            // "autoMarginOffset": 50,
            // "autoResize":true,
            // "marginBottom": 30,
            // "marginsUpdated": true,
            // "marginTop": 10,
            // pathToImages: 'https://cdnjs.cloudflare.com/ajax/libs/amcharts/3.13.0/images/',
            // "handDrawn":true,
            // "autoMarginOffset": 50,
            // "autoResize":true,
            // "marginBottom": 30,
            // "marginsUpdated": true,
            // "marginTop": 10,


            "type": "serial",
            // "startDuration": 0.1,

            "categoryField": categoryField,

            "valueAxes": [{
                "id": "v1",
                "axisAlpha": 1,
                // "stackType": "100%",// "stackType": "regular",
                "gridAlpha": 0.07,
                "axisColor": Widget.isDark ? '#eee' : '#333',
                "gridColor": Widget.isDark ? '#eee' : '#333',
                // "axisThickness": 2,
                // "position": "left",
                "ignoreAxisWidth": true
            }],

            "balloon": {
                "borderThickness": 1, "shadowAlpha": 0
            },

            "graphs": graphs,
            "chartCursor": {
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "cursorAlpha": 0,
                "zoomable": false,
                "valueZoomable": true,
                "valueLineAlpha": 0.5
            },

            // "valueScrollbar": {
            // "autoGridCount": true,
            // "color": "#000000",
            // "scrollbarHeight": 1
            // },

            "chartScrollbar": {
                "graph": "g1",
                "gridAlpha": 0,
                "color": "#888888",
                "scrollbarHeight": 25,
                "backgroundAlpha": 0,
                "selectedBackgroundAlpha": 0.1,
                "selectedBackgroundColor": "#888888",
                "graphFillAlpha": 0,
                "autoGridCount": true,
                "selectedGraphFillAlpha": 0,
                "graphLineAlpha": 0.2,
                "graphLineColor": "#c2c2c2",
                "selectedGraphLineColor": "#888888",
                "selectedGraphLineAlpha": 1
            },
            "categoryAxis": {
                "dashLength": 1,
                "minorGridEnabled": true,
                "axisColor": Widget.isDark ? '#eee' : '#333',
                "gridColor": Widget.isDark ? '#eee' : '#333'
            },
            "data": this.widget.data.data,

        };


        // dateforamt
        obl.categoryAxis.parseDates = false;

        if (dataDateFormat) {
            obl.dataDateFormat = dataDateFormat;
            obl.categoryAxis.parseDates = true;
            obl.categoryAxis.minPeriod = minPeriod;
        }

        if (axes) {
            let a_offset = 0;
            axes.forEach((a) => {
                a_offset++;
                let ax =
                    {
                        "id": a,
                        "axisAlpha": 1,
                        "axisThickness": 1,
                        "position": "right",
                        "ignoreAxisWidth": true,
                        "offset": 1 * a_offset
                    };
                obl.valueAxes.push(ax);
            });
        }


        //
        this.options = obl;
        this.init = true;
        this.makeLegend();


        return true;


    };// create chart


    makeLegend() {


        console.log("this.widget.sizeY", this.widget.sizeY);
        if (this.widget.sizeY < 2) {
            delete this.options.legend;
        }
        else {
            this.options.legend = {
                "align": "center",
                "equalWidths": false,
                "periodValueText": "total: [[value.sum]]",
                "valueAlign": "left",
                "valueText": "[[value]] ([[percents]]%)",
                "valueWidth": 100
            };
        }
        console.warn(this.options);
    };


    getChartGraph(meta, chartSets) {

        // SELECT number,sin(number),cos(number),number as `Title [asix=g2:column:blue]`  from system.numbers limit 40
        let showname = meta.name;
        let name = meta.name;
        let useaxis = "v1";

        showname = showname.replace(/_axis\d+/gm, '');
        // showname=showname.replace(/_column\d+/gm,'');

        var re = /.*_axis(\d+).*/i;
        var axis = name.match(re);


        if (axis && axis[1]) {
            useaxis = 'v' + axis[1];
        }
        let f = {
            "id": "g1",
            "valueAxis": useaxis,
            "fillAlphas": 0.2,
            "bullet": "round",
            "bulletSize": 8,
            "hideBulletsCount": 50,
            "lineThickness": 1,
            "title": showname,
            "useLineColorForBulletBorder": true,
            "valueField": name,
            "type": "smoothedLine",
            "balloonText": "[[title]] [[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>"
        };

        if (!chartSets) chartSets = {};

        return Object.assign(f, chartSets);
    }; // getChartGraph


}