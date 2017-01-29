/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 */

'use strict';

class Widget {
    constructor(DataProvider,draw=false) {
        this._dataProvider = DataProvider;
        this._draw=draw;
        this.init=false;
        this.x=0;
        this.y=0;
        this.height=2;
        this.width=6;
    }

    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }
}

class WidgetDraw extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.height=2;
        this.width=12;

    }
}

class WidgetPivot extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.height=6;
        this.width=12;
    }
}
class WidgetTable extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.height=6;
        this.width=12;
    }
}


angular.module(smi2.app.name).service('Widget', Widget);
angular.module(smi2.app.name).service('WidgetDraw', WidgetDraw);
angular.module(smi2.app.name).service('WidgetTable', WidgetTable);
angular.module(smi2.app.name).service('WidgetPivot', WidgetPivot);
// Widget.$inject = ['$http', '$q', 'localStorageService', '$sanitize', 'ThemeService'];