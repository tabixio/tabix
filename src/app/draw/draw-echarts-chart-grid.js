/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEchartsGridChart extends DrawEchartsChart {

    preCreate(drw) {
        this.preference.gridchart=true;
        return {
        };
    }
}