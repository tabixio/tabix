/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEchartsBar extends DrawEchartsChart {

    preCreate(drw) {
        this.preference.bar=true;
        return {
        };
    }
}