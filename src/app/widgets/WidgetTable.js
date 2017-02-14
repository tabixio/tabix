(() => {
    'use strict';
})();

import { Widget } from 'Widgets/Widget';
class WidgetTable extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);
        this.type='table';
        this.hotId='hotIdTable'+Math.floor(Math.random() * 10000000);
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

        this.hotRegisterer=false;
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
                viewportColumnRenderingOffset:'auto',
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

        if (this.data.countAll==1) {
            // результат толкьо одна отпра
            this.sizeX=6;
            this.sizeY=3;

        }

        console.log("SSSS:",this.data.position,this.data.countAll);
        //    data.position = query.index;
        // data.countAll = queue.length;

    }
    onDrag() {
        this.onResize();
    }
    getInstanceHandsontable(){
        if (this.hotRegisterer && this.init && this.element && this.hotId) {
            return this.hotRegisterer.getInstance(this.hotId);
        }
    }
    onResize() {
        console.info("onResize HotTable");
        if (!this.table) return;
        let i=this.getInstanceHandsontable();
        if (i) {
            console.info("INSTA!",i);
            i.render();
        }
        // -----------------------------------------------------------------
        // Для hot-table изменим парамер ширины, финт/костыль - хз
        // this.table.width='99.9'+Math.floor(100*Math.random())+'%';
        // this.table.height='99.9'+Math.floor(100*Math.random())+'%';
        // ngHandsontable содержит Watch на поля width + height который вызывает updateSettings()
        // hotInstance.updateSettings({
        //     width: $('hotWrapperDiv').width()
        // });
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

angular.module(smi2.app.name).service('WidgetTable', WidgetTable);