/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEcharts extends DrawBasicChart {
    constructor(Widget,drawType) {
        super(Widget);

        this.type=drawType.toUpperCase();
        this.library = 'echarts';

        // базовые опиции
        this.options={
            version: 3,
            backgroundColor: '#404a59',
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
        this.init=this.create();


        let drw=this.getDrawCommandObject();
        if (drw.raw)
        {
            this.options=_.merge(this.options,drw.raw);
        }


        // log
        console.info('preProcessor',this.init,this.options);
    }




}

