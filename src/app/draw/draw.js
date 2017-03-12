/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawBasicChart {
    constructor(Widget) {
        this.widget = Widget;
        this.chart = false;// тут храниться обьект
        this.init = false;
        this.options = {};
        this.widget.height = 2;
        this.widget.width = 2;
        this.errorMessage = '';


        // тут обьект содержит код ф-ции или обьекта draw
        this.drawCodeObject = {
            type: false
        };
        try {
            this.drawCodeObject = this.initDrawCodeObject();
        }
        catch (E) {
            console.error('error eval ', E);
        }
        console.info('isExecutableCode()', this.isExecutableCode());

    }

    setError(msg) {
        this.errorMessage = msg;
    }

    isDark() {
        return this.widget.isDark;
    }

    getError() {
        return this.errorMessage;
    }

    isExecutableCode() {
        if (!this.drawCodeObject) return false;
        if (!this.drawCodeObject.type) return false;
        return this.drawCodeObject.exec;
    }

    executableCode() {
        let ret = {};
        if (this.isExecutableCode()) {
            console.log(this.drawCodeObject.code);
            ret = this.drawCodeObject.code.call(window, this.widget.data);

        }
        console.warn("ResultFunction", ret);
        return ret;
    }

    initChartByJsCode() {

        if (this.isExecutableCode()) {
            // тут вызываем jscode -> резульатт this.options
            let o = this.executableCode();
            // обьединяем обьекты
            this.options = Object.assign(this.options, o);
            return true;
        }

        // Если это не код инициализация как обычно
        return false;
    }


    data() {
        return this.widget.data.data;
    }

    meta() {
        return this.widget.data.meta;
    }

    isNumericColumn(col) {
        let position = this.getColumnPosition(col);

        if (_.isUndefined(position)) {
            return;
        }
        let type = this.meta()[position]['type'];
        if (!type) return false;
        type=type.toLowerCase();
        if (type.includes('int')
            || type.includes('float')
        ) {
            return true;
        }
        return false;
    }
    

    getColumnPosition(col) {
        return _.findKey(this.meta(), {'name': col});
    }

    haveColumn(col) {

        let position = this.getColumnPosition(col);
        if (_.isUndefined(position)) {
            // not undef
            return false;
        }
        return true;

    }

    getDateTimeColumn() {
        this.meta().forEach((i) => {
            if (i.type == 'DateTime') {
                return i.name;
            }
        });
        return false;
    }

    /**
     * Получить колонку с датой
     */
    getDateColumn() {
        this.meta().forEach((i) => {
            if (i.type == 'Date') {
                return i.name;
            }
        });
        return false;
    }

    getDrawCommandObject() {
        if (!this.drawCodeObject) return false;
        if (!this.drawCodeObject.type) return false;
        if (this.drawCodeObject.exec) return false;
        return this.drawCodeObject.code;
    }

    initDrawCodeObject() {
        let drawCommand = this.widget.drawCommnads;

        if (!drawCommand) {
            return [];
        }

        let codeDrawText = false;
        if (drawCommand && drawCommand.code) {
            codeDrawText = drawCommand.code;
        }
        if (!codeDrawText) {
            return [];
        }
        let draw = {
            code: false,
            type: false
        };

        try {
            let code = '(' + codeDrawText + ')';

            let obj = eval(code);

            let type = typeof obj;

            draw = {
                isok: true,
                code: obj,
                type: type,
                exec: !!(obj && obj.constructor && obj.call && obj.apply)
            };


            // // получаем настройки по осям
            // meta.forEach((i) => {
            //     // получаем ключь для каждой оси
            //     if (object[i.name])
            //     {
            //         chartSets[i.name]=object[i.name];
            //     }
            // });
        } catch (E) {
            console.error('error eval ', code);
        }

        return draw;

    };
}
