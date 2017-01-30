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
        this.height=1;
        this.width=6;
        this.type=false;
    }

    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }
}

class WidgetDraw extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.height=1;
        this.width=12;
        this.type="amchart";
        this.init=true;

    }
}

class WidgetPivot extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.height=1;
        this.width=6;
        this.type="pivot";
        this.init=true;
    }
}
class WidgetTable extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.height=1;
        this.width=12;
        this.init=true;
        this.type='table';
    }
}


angular.module(smi2.app.name).service('Widget', Widget);
angular.module(smi2.app.name).service('WidgetDraw', WidgetDraw);
angular.module(smi2.app.name).service('WidgetTable', WidgetTable);
angular.module(smi2.app.name).service('WidgetPivot', WidgetPivot);
// Widget.$inject = ['$http', '$q', 'localStorageService', '$sanitize', 'ThemeService'];