/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEchartsBar extends DrawEchartsChart {



    createChart(drw) {



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




        return true;

    }
}