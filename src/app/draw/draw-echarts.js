/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEcharts extends DrawBasicChart {
    constructor(Widget, drawType) {
        super(Widget);

        this.type = drawType.toUpperCase();
        this.library = 'echarts';

        // базовые опиции
        this.options = {
            version: 3,
            // backgroundColor: '#404a59',
            // title : {
            // text: 'EChart',
            // subtext: 'subtext',
            // left: 'center',
            // textStyle : {
            //     color: '#fff'
            // }
            // },
        };// opthios


    }

    onResize() {
        // отправденна комманда resize
        if (this.chart && this.init) {
            this.chart.setOption(this.options);
            this.chart.resize();
        }
    }


    preProcessor() {

        // init chart & call before render


        if (this.initChartByJsCode()) {
            this.init = true;
        }
        else {
            this.init = this.create();
        }

        if (this.getError()) {
            console.error(this.getError());

            this.chart.before("<p>" + this.getError() + "</p>");

            return false;
        }

        let drw = this.getDrawCommandObject();
        if (drw.raw) {
            this.options = _.merge(this.options, drw.raw);
        }


        if (this.isDark()) {
            this.options.backgroundColor = '#404a59';
            this.options.color = ['#dd4444', '#fec42c', '#80F1BE'];
        }
        // log
        console.info('preProcessor', this.init, this.options);
    }



    applyDataZoom()
    {
        this.options.dataZoom=[{
            type: 'inside',
            start: 0,
            end: 10
        }, {

            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }];
    }

    applyGrid() {
        let $grid=[];


        this.options.grid=$grid;
        //foreach(xAxis)  {gridIndex: 0, min: 0, max: 20},
        //foreach(yAxis)  {gridIndex: 0, min: 0, max: 15},

    }

}

