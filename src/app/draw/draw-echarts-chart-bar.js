/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DrawEchartsBar extends DrawEchartsChart {

    preCreate(drw) {
        this.preference.bar=true;
        return {
        };
    }
}