'use strict';
/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,SMI2 LLC and other contributors
 */
class Widget {
    constructor(DataProvider, draw = false,sizeX=false,sizeY=false) {
        this._scheduledResize = false;
        this.data = DataProvider;
        this.drawCommnads = draw;

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

    onDrag() {
        // console.info("On widget Draw",this);
    }

    destroy(widget) {
        console.info("Destroy widget is empty");
        return false;
    }

    onResize() {
        // console.info("On widget Resize",this);
    }

    scheduledResize(size) {

        if (this._scheduledResize) {
            return;
        }

        // console.info("Add scheduledResize :",this.sizeX,this.sizeY);
        // отложенный ресайз , если много изменений
        this._scheduledResize = true;
        let th = this;
        setTimeout(function () {
            console.info("scheduledResize(size)",size);

            th._scheduledResize = false;
            th.onResize(size);
        }, 800);
    }

    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }
}
// export { Widget };
