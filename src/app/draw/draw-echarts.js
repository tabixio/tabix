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

    initChartByJsCode() {

        if (this.isExecutableCode())
        {
            // тут вызываем jscode -> резульатт this.options
            let o = this.executableCode();
            // обьединяем обьекты
            this.options=Object.assign(this.options,o);
            return true;
        }

        // Если это не код инициализация как обычно
        return false;
    }


    preProcessor() {

        // init chart & call before render
        this.init=this.create();

        // log
        console.info('preProcessor',this.init,this.options);
    }




}

