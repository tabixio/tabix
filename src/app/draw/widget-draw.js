/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */

class WidgetDraw extends Widget {
    constructor(DataProvider, draw,sizeX,sizeY) {
        super(DataProvider, draw,sizeX,sizeY);

        this.type = "draw";
        if (this.error || this.text) {
            return;
        }
        this.library = false;

        this._list = {
            // 'SCATTERMAP': DrawEcharts,
            'GRAPH': DrawEchartsGraph,
            'PLOTLY': DrawPlotly,
            'HEATMAP': DrawEchartsHeatmap,
            'CALENDAR': DrawEchartsCalendar,
            'RAW': DrawEchartsMap,
            'BAR': DrawEchartsBar,
            'RIVER': DrawEchartsRiver,
            'MAP': DrawEchartsMap,
            'GMAPS': DrawGoogleMap,
            'TREEMAP': DrawEchartsTreemap,
            'FLATTREE': DrawEchartsFlatTree,
            'SANKEYS': DrawEchartsSunkeys,
            'CHART': DrawEchartsChart,
            'GRIDCHART': DrawEchartsGridChart,
            'TEXT': DrawText,
            'D3': DrawD3,
            'C3': DrawC3
        };
        // if class exists -> init ok
        this.init = this.getChartClass();


        if (!this.sizeX && !this.sizeY)
        {

            this.sizeX = 6;// ширина
            this.sizeY = 3;// высота


            if (this.drawType=='TEXT') {
                this.sizeX = 1;
                this.sizeY = 2;
            }

// console.info("this.data.countAll",this.data.countAll);
            if (this.data.countAll == 1) {
                // результат толкьо одна отпра
                this.sizeX = 12;
                this.sizeY = 3;
            }
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
