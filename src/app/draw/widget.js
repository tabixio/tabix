'use strict';
/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,SMI2 LLC and other contributors
 */
class Widget {
    constructor(DataProvider, draw = false,sizeX=false,sizeY=false) {
        this._scheduledResize = false;
        this.data = DataProvider;
        this.drawCommnads = draw;
        this.title=false;

        this._draw = false;
        if (draw && this.drawCommnads.drawtype) {
            this.drawType = this.drawCommnads.drawtype.toUpperCase();
        } else {
            this.drawType = false;
        }
        // проверка результат с ошибкой или это текстовая строка
        this.error = this.data.error;
        this.text = this.data.text;
        this.name = "Widget";

        this.element = false;
        this.init = false;


        if (_.isNumber(sizeX)) {
            this.sizeX = sizeX;
        }
        if (_.isNumber(sizeY)) {
            this.sizeY = sizeY;
        }
        this.type = false;

        // Адовый костылище, поскольку в конструктор должны передаваться
        // dependency injecton, а не данные для работы класса. Поэтому я не могу
        // передать в конструктор сервис и дергаю его по рабоче - крестьянски.
        let isDark=angular.element('*[ng-app]').injector().get("ThemeService").isDark();
        this.isDark = isDark;
        window.isDarkTheme=isDark;
    }
    applySettings(o)
    {
        console.log('applySettings',o);

        if (!_.isObject(o)) return;
        if (o.title) this.title=o.title;
    }
    onDrag() {
        // console.info("On widget Draw",this);
    }



    getSizeElementHeight()
    {
        // console.log("Height : clientHeight:",this.element[0].clientHeight);
        // console.log("offsetHeight : element:",this.element[0].offsetHeight);
        let $h=this.element[0].offsetHeight;
        if ($h<100) $h=100;
        return $h;
    }
    getSizeElementWidth()
    {
        // console.log("Width : element:",this.element[0].Width);
        // console.log("offsetWidth : element:",this.element[0].offsetWidth);
        return this.element[0].offsetWidth;
    }


    destroy(widget) {
        console.info("Destroy widget is empty");
        return false;
    }

    onResize() {
        // console.info("On widget Resize",this);
    }

    scheduledResize() {
        if (this._scheduledResize) {
            return;
        }
        // отложенный ресайз , если много изменений
        this._scheduledResize = true;
        let th = this;
        setTimeout(function () {
            th._scheduledResize = false;
            th.onResize();
        }, 200);
    }

    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }
}
// export { Widget };
