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

        // find template in DrawCommand
        let template = this.getDrawCommandObject();
        this.init = this.applyText(template);
    }
    applyText(template)
    {
        if (this.isDark()) {
            this.widget.element[0].style.background = '#404a59';
        }
        if (!template) {
            this.widget.element[0].innerHTML='<pre>'+JSON.stringify(this.widget.data, null, '\t')+'</pre>';
        }
        else {
            this.widget.element[0].innerHTML= Mustache.render(template, this.widget.data);
        }
        return true;
    }
    onResize() {

    }

}