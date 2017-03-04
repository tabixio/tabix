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


        this.drawCodeObject=[];
        try {
            this.drawCodeObject=this.getDrawCodeObject();
        }
        catch (E) {
            console.error('error eval ', E);
        }
        console.log('drawCodeObject',this.drawCodeObject);

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


        let result=[];

        try {
            let code='('+codeDrawText+')';

//             console.warn("drawCommand:CODE:",code);
            let object=eval(code);
//             console.warn("drawCommand:Result:",object);
            result.push(object);

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
        return result;

    };
}
