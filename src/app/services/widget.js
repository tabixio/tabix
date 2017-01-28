'use strict';

class Widget {
    constructor(DataProvider,draw=false) {
        this._dataProvider = DataProvider;
        this._draw=draw;
    }

    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }

}

class WidgetDraw extends Widget
{

}

class WidgetPivot extends Widget
{

}
class WidgetTable extends Widget
{

}


angular.module(smi2.app.name).service('Widget', Widget);
angular.module(smi2.app.name).service('WidgetDraw', WidgetDraw);
angular.module(smi2.app.name).service('WidgetTable', WidgetTable);
angular.module(smi2.app.name).service('WidgetPivot', WidgetPivot);
// Widget.$inject = ['$http', '$q', 'localStorageService', '$sanitize', 'ThemeService'];