/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEcharts {
    constructor(Widget) {
        this.library='echarts';
        this.widget = Widget;
        this.init=false;
    }
}

class DrawAMcharts {
    constructor(Widget) {
        console.warn("DrawAMcharts constructor");
        this.library='amchart';
        this.options={};
        this.widget = Widget;
        this.widget.height=2;
        this.widget.width=2;

        let theme='light';
        if (Widget.isDark) {
            theme='dark';
        }

        let x={
            data: [{
                year: 2005,
                income: 23.5,
                expenses: 18.1
            }, {
                year: 2006,
                income: 26.2,
                expenses: 22.8
            }, {
                year: 2007,
                income: 30.1,
                expenses: 23.9
            }, {
                year: 2008,
                income: 29.5,
                expenses: 25.1
            }, {
                year: 2009,
                income: 24.6,
                expenses: 25
            }],
            type: "serial",
            "theme": theme,
            "color": Widget.isDark ? '#eee' : '#333',
            categoryField: "year",
            rotate: true,
            // pathToImages: 'https://cdnjs.cloudflare.com/ajax/libs/amcharts/3.13.0/images/',
            legend: {
            enabled: true
        },
            chartScrollbar: {
                enabled: true,
            },
            categoryAxis: {
                gridPosition: "start",
                    parseDates: false
            },
            valueAxes: [{
                position: "top",
                title: "Million USD"
            }],
                graphs: [{
            type: "column",
            title: "Income",
            valueField: "income",
            fillAlphas: 1,
        }]
        };

        this.options=x;
        this.init=true;
    }
}

class DrawD3 {
    constructor(Widget) {

        this.library='d3';
        this.widget = Widget;
        this.init=false;
    }
}

class DrawC3 {
    constructor(Widget) {
        this.library='c3';
        this.widget = Widget;
        this.init=false;
    }

}