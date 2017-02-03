/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class Widget {
    constructor(DataProvider,draw=false) {
        this.data = DataProvider;
        this.draw=draw;

        if (draw && this.draw.drawtype)
        {
            this.drawType=this.draw.drawtype.toUpperCase();

        }
        else{
            this.drawType=false;
        }


        // проверка результат с ошибкой или это текстовая строка
        this.error=this.data.error;
        this.text=this.data.text;

        //
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


class WidgetPivot extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.type="pivot";

        if (this.error || this.text) {
            return;
        }
        this.height=1;
        this.width=6;
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
        this.height=1;
        this.width=12;

        let init=this.initChart();


        this.init=init;

        // if (!(method instanceof Function) || method === Callbacks) continue;
        console.info('DRAW.this.Merge',this);
    }

    initChart() {

        console.info('INIT>DRAW>>',this.drawType,this.draw);
        if (!this.drawType) {
            console.error("Un support DrawType:null");
            return false;
        }

        let defaults ={

        };

        let list= {
            'SCATTERMAP': {
                'library':'echarts'
            },
            'HEATMAP': {
                'library':'echarts'
            },
            'CHART': {
                'library':'amchart'
            },
            'SANKEYS': {
                'library':'echarts'
            },
            'TREEMAP': {
                'library':'echarts'
            },
            'C3': {
                'library':'c3'
            },
            'D3': {
                'library':'d3'
            },


        };

        // if this.draw.code - exec/eval code and merge objects

        if (!list[this.drawType]) {
            console.error("Un support DrawType:"+this.drawType);
            return false;
        }


        // merging objects
        let ob = Object.assign(defaults,list[this.drawType]);
        for (let [k, v] of Object.entries(ob)) {
            this[k]=v;
        }


        return true;


    }
}


class WidgetTable extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);
        this.type='table';

        if (this.error) {
            this.height=1;
            this.width=6;
            this.init=true;
            return ;
        }
        if (this.text) {
            this.height=2;
            this.width=12;
            this.init=true;
            return ;
        }

        this.height=4;
        this.width=12;
        this.init=true;


        // if (this.data.rows)

        let handsontable=this.makeColumns();

        // make columns

        this.table= {
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
                preventOverflow: 'horizontal',
                persistentState:true,
                contextMenu: ['row_above', 'row_below', 'remove_row'],
                filters: true,
                //
                // // fixedRowsTop: 1,
                // // fixedColumnsLeft: 1,
                columnSorting: true,
                sortIndicator: true,
                manualRowResize: true,
                viewportColumnRenderingOffset:'auto',
                // // maxRows: 10,
                // // visibleRows:10,
                //
                wordWrap:false,
                autoColumnSize: {
                    samplingRatio: 23
                }

            },
            columns: handsontable.columns,
            colHeaders: handsontable.colHeaders
        }
        ;

        console.table(this.table);



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