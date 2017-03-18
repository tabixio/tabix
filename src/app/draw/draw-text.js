/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawText extends DrawBasicChart {
    constructor(Widget, drawType) {
        super(Widget);
        this.type = drawType.toUpperCase();
        this.library='text';
        this.widget.sizeX = 0;
        this.widget.sizeY = 0;
    }


    preProcessor() {

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
    applyText()
    {
        this.widget.element[0].style.background='silver';
        this.widget.element[0].innerHTML='<pre>HH!!!!</pre>';
        console.log(this.widget.element);
    }
    onResize() {

    }

    create() {

        this.applyText();

    }
}