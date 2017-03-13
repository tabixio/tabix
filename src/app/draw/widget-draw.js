class WidgetDraw extends Widget {
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.type = "draw";
        if (this.error || this.text) {
            return;
        }
        this.library = false;
        this.sizeY = 2;

        this._list = {
            // 'SCATTERMAP': DrawEcharts,
            // 'HEATMAP': DrawEcharts,
            'ECHARTS': DrawEchartsMap,
            'BAR': DrawEchartsBar,
            'RIVER': DrawEchartsRiver,
            'MAP': DrawEchartsMap,
            'TREEMAP': DrawEchartsTreemap,
            'SANKEYS': DrawEchartsSunkeys,

            'CHART': DrawAMcharts,
            'GRIDCHART': DrawEchartsGridChart,

            'D3': DrawD3,
            'C3': DrawC3
        };
        // if class exists -> init ok
        this.init = this.getChartClass();


        if (this.data.countAll == 1) {
            // результат толкьо одна отпра
            this.sizeX = 6;
            this.sizeY = 3;
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

        // if this.draw.code - exec/eval code and merge objects

        // merging objects
        // let ob = Object.assign(defaults,list[this.drawType]);
        // for (let [k, v] of Object.entries(ob)) {
        //     this[k]=v;
        // }
    }
}

angular.module(smi2.app.name).service('WidgetDraw', WidgetDraw);
