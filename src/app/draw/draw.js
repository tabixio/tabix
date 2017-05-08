/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DrawBasicChart {
    constructor(Widget) {
        this.widget = Widget;
        this.chart = false;// тут храниться обьект
        this.init = false;
        this.options = {};
        this.widget.height = 1;
        this.widget.width = 1;
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
        let help = '';
        let helpLink = '';

        if (!_.isUndefined(this.help)) help = this.help;
        if (!_.isUndefined(this.helpLink)) helpLink = this.helpLink;

        this.widget.error = "Draw error message:" + msg + "\n\n" + help + "\n\n" + (helpLink ? '<a target="_blank" href="' + helpLink + '">' + helpLink + '</a>' : "");
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

    isStringColumn(col) {
        let position = this.getColumnPosition(col);

        if (_.isUndefined(position)) {
            return;
        }
        let type = this.meta()[position]['type'];
        if (!type) return false;
        type=type.toLowerCase();
        if (type.includes('string')
            || type.includes('enum')
        ) {
            return true;
        }
        return false;
    }


    getColumnPosition(col) {
        return parseInt(_.findKey(this.meta(), {'name': col}));
    }

    haveColumn(col) {

        if (_.isNaN(col) || _.isNull(col) || _.isUndefined(col)) return false;

        let position = this.getColumnPosition(col);

        if (_.isNaN(position) || _.isNull(position) || _.isUndefined(position)) {
            // not undef
            // console.log("haveColumn(col)",col,position,false);
            return false;
        }
        // console.log("haveColumn(col)",col,position,true);
        return true;

    }

    getColumnByType(type) {
        let v=_.findIndex(this.meta(),{type:type});
        if (v<0) return false;
        return this.getColumns(v);

    }

    getDateTimeColumn() {
        return this.getColumnByType('DateTime');
    }

    /**
     * Получить колонку с датой
     */
    getDateColumn() {
        return this.getColumnByType('Date');

    }

    getColumns(position) {
        let list=_.map(this.meta(),'name');
        if (!_.isUndefined(position)) {
            return list[position];
        }
        return list;

    }

    getFirstColumn() {
        return this.getColumns(0);
    }



    getDrawCommandObject() {
        if (!this.drawCodeObject) return false;
        if (!this.drawCodeObject.type) return false;
        // if (this.drawCodeObject.exec) return false;
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

        if (_.isObject(codeDrawText)) {
            draw = {
                isok: true,
                code: codeDrawText,
                type: typeof codeDrawText,
                exec: false
            };
            return draw;
        }


        if (drawCommand.drawtype.toLowerCase()=='text') {
            let obj=codeDrawText.trim();
            draw = {
                isok: true,
                code: obj,
                type: typeof obj,
                exec: false
            };
            return draw;
        }


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
        } catch (E) {
            console.error('error eval ',codeDrawText, E);
        }

        return draw;

    };
}
