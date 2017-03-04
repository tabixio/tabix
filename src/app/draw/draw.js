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
        this.options={};
        this.widget.height=2;
        this.widget.width=2;



        this.drawCodeObject={};
        try {
            this.drawCodeObject=this.getDrawCodeObject();
        }
        catch (E) {
            console.error('error eval ', E);
        }
        console.log('drawCodeObject',this.drawCodeObject);
        console.info('isExecutableCode()',this.isExecutableCode());

    }
    isExecutableCode() {

        if (!this.drawCodeObject) return false;
        if (!this.drawCodeObject.code) return false;


        console.warn(typeof this.drawCodeObject);
        return angular.isFunction(this.drawCodeObject);
    }

    getDrawCodeObject() {
        let drawCommand=this.widget.drawCommnads;

        if (!drawCommand) {
            return [];
        }

        let codeDrawText=false;
        if (drawCommand && drawCommand.code ){
            codeDrawText=drawCommand.code;
        }
        if (!codeDrawText)
        {
            return [];
        }
        let draw={

        };

        try {
            let code='('+codeDrawText+')';

            let obj=eval(code);

            let type=typeof obj;

            draw={
                code:obj,
                type:type,
                exec:!!(obj && obj.constructor && obj.call && obj.apply)
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
            console.error('error eval ',code);
        }

        return draw;

    };
}
