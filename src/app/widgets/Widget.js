/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

//'use strict';

class Widget {
    constructor(DataProvider,draw=false) {
        this._scheduledResize=false;
        this.data = DataProvider;
        this.drawCommnads=draw;
        this._draw=false;
        if (draw && this.drawCommnads.drawtype)
        {
            this.drawType=this.drawCommnads.drawtype.toUpperCase();
        }
        else{
            this.drawType=false;
        }
        // проверка результат с ошибкой или это текстовая строка
        this.error=this.data.error;
        this.text=this.data.text;


        this.sizeX=3;// ширина
        this.sizeY=1;// высота
        //
        this.element=false;
        this.init=false;

        this.type=false;
        this.isDark=false;
    }
    isDark() {
        return this.isDark;
    }

    onDrag() {
        // console.info("On widget Draw",this);
    }
    onResize() {
        // console.info("On widget Resize",this);
    }
    scheduledResize() {
        if (this._scheduledResize)
        {
            return;
        }
        // отложенный ресайз , если много изменений
        this._scheduledResize=true;
        let th=this;
        setTimeout(function() {
            th._scheduledResize=false;
            th.onResize();
        }, 400);
    }
    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }
}
export default Widget;

angular.module(smi2.app.name).service('Widget', Widget);