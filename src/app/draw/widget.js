/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class Widget {
    constructor(DataProvider,draw=false) {
        this._scheduledResize=false;
        this.data = DataProvider;
        this.drawCommnads=draw;
        this._draw=false;
        if (draw && this.drawCommnads.drawtype)
        {
            this.drawType=this.drawCommnads.drawtype.toUpperCase();

        }
        else{
            this.drawType=false;
        }


        // проверка результат с ошибкой или это текстовая строка
        this.error=this.data.error;
        this.text=this.data.text;


        this.sizeX=3;// ширина
        this.sizeY=1;// высота
        //
        this.element=false;
        this.init=false;

        this.type=false;
        this.isDark=false;
    }
    isDark() {
        return this.isDark;
    }

    onDrag() {
        // console.info("On widget Draw",this);
    }
    onResize() {
        // console.info("On widget Resize",this);
    }
    scheduledResize() {
        if (this._scheduledResize)
        {
            return;
        }
        // отложенный ресайз , если много изменений
        console.info("Add scheduledResize");
        this._scheduledResize=true;
        let th=this;

        setTimeout(function() {
            console.info("this exec scheduledResize");
            th._scheduledResize=false;
            th.onResize();
        }, 1500);


    }
    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }

}


class WidgetPivot extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.type="pivot";

        if (this.error || this.text) {
            return;
        }
        // this.height=1;
        // this.sizeX=6;
        this.init=true;
        this.pivot={
            config:{
                dataClass: $.pivotUtilities.SubtotalPivotData,
                renderer: $.extend($.pivotUtilities.renderers,$.pivotUtilities.subtotal_renderers["Table With Subtotal"], $.pivotUtilities.c3_renderers),
                rendererOptions: {
                    collapseRowsAt: 1,
                    collapseColsAt: 0
                }
            }
        };
    }
}


class WidgetDraw extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.type="draw";
        if (this.error || this.text) {
            return;
        }
        this.library=false;
        this.sizeY=2;

        this._list= {
            'SCATTERMAP': DrawEcharts,
            'HEATMAP': DrawEcharts,
            'TREEMAP': DrawEcharts,
            'SANKEYS': DrawEcharts,
            'CHART': DrawAMcharts,
            'D3': DrawD3,
            'C3': DrawC3
        };
        // if class exists -> init ok
        this.init=this.getChartClass();
    }

    get draw(){


        if (this.drawType && !this._draw)
        {
            this._draw=new this._list[this.drawType](this);
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
            this.drawType='CHART';
            console.error("Un support DrawType:null");
            // return false;
        }
        if (!this._list[this.drawType]) {
            console.error("Un support DrawType:"+this.drawType);
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


class WidgetTable extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);
        this.type='table';

        if (this.error) {
            this.sizeY=1;
            this.sizeX=6;
            this.init=false;
            return ;
        }
        if (this.text) {
            this.sizeY=2;
            this.sizeX=6;
            this.init=false;
            return ;
        }

        // this.height=4;
        // this.sizeX=12;
        this.init=true;


        // if (this.data.rows)

        let handsontable=this.makeColumns();

        // make columns

        this.table= {
            width:'100%',
            height:'100%',
            settings: {
                dropdownMenu: true,
                // manualColumnResize: handsontable.columns,
                // colWidths:handsontable.colWidths;
                manualColumnMove: true,
                manualColumnResize: true,
                //
                // autoWrapRow: true,
                // // rowHeaders: true,
                // // colHeaders: _(headers).map(function(header, i) {
                // //     return "<report-header display-name='" + header.colName + "' index='" + i + "' > </report-header>";
                // // }),
                // //colWidths: 100,
                // rowHeights: [50, 40, 100],
                // renderer: 'html',
                fillHandle: false,
                stretchH: 'all',
                // preventOverflow: 'horizontal',
                persistentState:true,
                contextMenu: ['row_above', 'row_below', 'remove_row'],
                filters: true,
                //
                // // fixedRowsTop: 1,
                // // fixedColumnsLeft: 1,
                columnSorting: true,
                sortIndicator: true,
                manualRowResize: true,
                // viewportColumnRenderingOffset:'auto',
                // // maxRows: 10,
                // // visibleRows:10,
                //
                wordWrap:false,
                autoColumnSize: {
                    samplingRatio: 23
                },
                observeDOMVisibility:true,
                observeChanges:true,
                width:'100%'

            },
            columns: handsontable.columns,

            colHeaders: handsontable.colHeaders
        }
        ;

        // init table size тут как бы отрефа
        let x = 0;
        if (handsontable.columns.length>5) {
            x=1;
        }
        if (handsontable.columns.length>10) {
            x=3;
        }
        if (handsontable.columns.length>15) {
            x=6;
        }
        this.sizeX=x;

        this.sizeY=0;//1...2...3...4...5..

        if (this.data.rows>100) {
            this.sizeY=1;
        }
        if (this.data.rows>250) {
            this.sizeY=2;
        }
        if (this.data.rows>500) {
            this.sizeY=3;
        }


    }
    onDrag() {
        this.onResize();
    }
    onResize(w,h) {
        if (!this.table) return;

        if (w && h)
        {
            // console.log("> > > hot-table - resize > >",w,h);
            // this.table.width=w*0.9;
            // this.table.height=h*0.9;
            // return;
        }

        // Для hot-table изменим парамер ширины, финт/костыль - хз

        this.table.width='99.9'+Math.floor(100*Math.random())+'%';
        this.table.height='99.9'+Math.floor(100*Math.random())+'%';

        console.log("> resize > ",this.table.width,this.table.height);


        // ngHandsontable содержит Watch на поля width + height который вызывает updateSettings()
        // hotInstance.updateSettings({
        //     width: $('hotWrapperDiv').width()
        // });
        // -----------------------------------------------------------------
        // Или попробовать вариант hotInstance.redraw()
        // -----------------------------------------------------------------
        // Или таймер на X00 мс который отложет ресайз
        // ----------------------------------------------------------------
        // Или передавать точный размер width области после ресайза
        // ----------------------------------------------------------------
    }
    makeColumns() {
        let colHeaders = [];
        let columns = [];
        this.data.meta.forEach((cell) => {

            colHeaders.push(cell.name);
            let c={};
            c.type='text';
            c.width=100;


            switch (cell.type) {
                case 'Date':        c.width=90; c.type='date'; c.dateFormat='MM/DD/YYYY';break;
                case 'DateTime':    c.width=150; c.type='time'; c.timeFormat='HH:mm:ss'; break;
                case 'Int32':       c.width=80;c.type='numeric'; break;
                case 'Float64':     c.width=80; c.type='numeric';c.format='0,0.0000';break;
                case 'UInt32':      c.width=80; c.type='numeric';break;
                case 'String':      c.width=180; break;
            }

            c.data=cell.name;
            columns.push(c);
        });

        return {
            colHeaders: colHeaders,
            columns: columns
        };
    };

}

angular.module(smi2.app.name).service('Widget', Widget);
angular.module(smi2.app.name).service('WidgetPivot', WidgetPivot);
angular.module(smi2.app.name).service('WidgetTable', WidgetTable);
angular.module(smi2.app.name).service('WidgetDraw', WidgetDraw);

// Widget.$inject = ['$http', '$q', 'localStorageService', '$sanitize', 'ThemeService'];