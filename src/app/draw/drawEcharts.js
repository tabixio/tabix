/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEcharts {
    constructor(Widget) {
        this.widget = Widget;
    }
}

class DrawAMcharts {
    constructor(Widget) {
        this.widget = Widget;
        this.widget.height=2;
        this.widget.width=2;

    }
}

class DrawD3 {
    constructor(Widget) {
        this.widget = Widget;
    }
}

class DrawC3 {
    constructor(Widget) {
        this.widget = Widget;
    }

}