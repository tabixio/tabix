/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

class WidgetDraw extends Widget {
    constructor(DataProvider, draw,sizeX,sizeY) {
        super(DataProvider, draw);

        this.type = "draw";
        if (this.error || this.text) {
            return;
        }
        this.library = false;
        this.sizeY = 2;

        this._list = {
            // 'SCATTERMAP': DrawEcharts,
            'HEATMAP': DrawEchartsHeatmap,
            'CALENDAR': DrawEchartsCalendar,
            'RAW': DrawEchartsMap,
            'BAR': DrawEchartsBar,
            'RIVER': DrawEchartsRiver,
            'MAP': DrawEchartsMap,
            'GMAPS': DrawGoogleMap,
            'TREEMAP': DrawEchartsTreemap,
            'SANKEYS': DrawEchartsSunkeys,
            'CHART': DrawEchartsChart,
            'GRIDCHART': DrawEchartsGridChart,
            'TEXT': DrawText,
            'D3': DrawD3,
            'C3': DrawC3
        };
        // if class exists -> init ok
        this.init = this.getChartClass();

        if (this.drawType=='TEXT') {
            this.sizeX = 0;
            this.sizeY = 0;
        }

        if (_.isNumber(sizeX)) {
            this.sizeX = sizeX;
        }
        if (_.isNumber(sizeY)) {
            this.sizeY = sizeY;
        }

        if (this.data.countAll == 1) {
            // результат толкьо одна отпра
            this.sizeX = 6;
            this.sizeY = 2;
        }
    }

    get draw() {
        if (this.drawType && !this._draw) {
            this._draw = new this._list[this.drawType](this, this.drawType);
        }
        return this._draw;
    }

    onResize() {
        if (this._draw) {
            this._draw.onResize();
        }
    }

    getChartClass() {
        if (!this.drawType) {
            this.drawType = 'CHART';
            console.error("Un support DrawType:null");
            // return false;
        }
        if (!this._list[this.drawType]) {
            console.error("Un support DrawType:" + this.drawType);
            return false;
        }
        return true;

    }
}

angular.module(smi2.app.name).service('WidgetDraw', WidgetDraw);
