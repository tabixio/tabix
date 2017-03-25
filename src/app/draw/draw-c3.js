/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';


class DrawC3 extends DrawBasicChart {
    constructor(Widget) {

        super(Widget);

        this.library = 'c3';
        this.bindto = false;//buildDrawChart запишет сюда элемент в котором рисовать
    }


    onResize() {
        // отправденна комманда resize
        if (this.chart && this.init) {
            // this.chart.setOption(this.options);
            // this.chart.resize();
        }
    }

    preProcessor() {
        //
        console.log('preProcessor>c3.generate');
        ;
        if (!this.initChartByJsCode()) {
            console.error("C3.Init by code");
            return false;
        }

        console.log("c3.options>", this.options);

        this.bindto.className += " c3";
        console.log('this.bindto.className',this.bindto.className);
        this.options.bindto = this.bindto;

        console.log("c3.options>", this.options);

        this.chart = c3.generate(this.options);
    }

}