/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEchartsBar extends DrawEchartsChart {



    create() {


        // Если это код не JS попробуем получить обьект
        let drw = this.getDrawCommandObject();

        let sets = {
            path: '',
        };

        if (drw) {
            sets = Object.assign(sets, drw);
        }

        let path = '';
        if (sets['path']) {
            path = sets['path'];
        }
        // если короткий вариант это строка с путем
        if (_.isString(drw)) {
            path=drw;
        }

        let patharr = _.split(path, '.'); //  'a.b.c.d.e'=>[a,b,c,d,e]
        let len=patharr.length;



        this.options = Object.assign(o, this.options);
        return true;

    }
}