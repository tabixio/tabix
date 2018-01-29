/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */

'use strict';

class DrawEchartsBar extends DrawEchartsChart {

    preCreate(drw) {
        this.preference.bar=true;
        return {
        };
    }
}