/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class HandsTable {

    constructor(meta) {
        this.meta=meta;
    }


     makeColumns() {
        let colHeaders = [];
        let columns = [];
        this.meta.forEach((cell) => {

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
        console.log("makeColumns",columns);
        return {
            colHeaders: colHeaders,
            columns: columns
        };
    };


    static makeStyle(ht,style) {
        console.log("makeStyle",style);
        let selection = ht.getSelectedRange();
        let fromRow = Math.min(selection.from.row, selection.to.row);
        let toRow = Math.max(selection.from.row, selection.to.row);
        let fromCol = Math.min(selection.from.col, selection.to.col);
        let toCol = Math.max(selection.from.col, selection.to.col);

        for (let row = fromRow; row <= toRow; row++) {
            for (let col = fromCol; col <= toCol; col++) {
                let cellMeta = ht.getCellMeta(row, col);

                let cl='htCell'+style;
                if (!cellMeta.className || (cellMeta.className && cellMeta.className.indexOf(cl) < 0)) {
                    ht.setCellMeta(row, col, 'className', cl);
                }
            }
        }
        ht.render();
    }
    makeSettings()
    {
        return {
            dropdownMenu: true,
            manualColumnMove: true,
            manualColumnResize: true,
            rowHeaders: true,
            colWidths: 100,
            fillHandle: false,
            stretchH: 'all',
            // persistentState:true,
            // customBorders:true,
            // fixedRowsTop: 1,
            // fixedColumnsLeft: 1,
            // maxRows: 10,
            visibleRows:10,
            // filters: true,
            columnSorting: true,
            sortIndicator: true,
            manualRowResize: true,
            viewportColumnRenderingOffset:'auto',
            wordWrap:false,
            autoColumnSize: { samplingRatio: 23 },
            preventOverflow: 'horizontal',
            // contextMenu: true,

            contextMenu: {
                // callback: function (key, options) {
                //     if (key === 'kill') {
                //         console.warn(this);
                //         console.warn(this.getSelectedRange());
                //     }
                // },
                items: {

                    "column": {
                        name: 'Column',
                        submenu: {
                            items: [
                                {
                                    name: "Hide",
                                    callback: function (key, options,pf) {
                                        // HandsTable.makeStyle(this,'Normal');;
                                    },
                                    key: "column:Hide"
                                },
                                {
                                    name: 'Show all cols',
                                    code: this,
                                    callback: function(key, options) {
                                        // HandsTable.makeStyle(this,'Bold');
                                    },
                                    key:"column:makebold"

                                },
                                {
                                    name: 'Red color',
                                    code: this,
                                    callback: function(key, options) {
                                        // HandsTable.makeStyle(this,'Red');
                                    },
                                    key:"column:red"
                                },
                                {
                                    name: 'Green color',
                                    code: this,
                                    callback: function(key, options) {
                                        // HandsTable.makeStyle(this,'Green');
                                    },
                                    key:"column:green"
                                }
                            ]
                        },
                    },


                    "style": {
                            name: 'Style',
                            submenu: {
                                items: [
                                    {
                                        name: "Normal",
                                        callback: function (key, options,pf) {
                                            HandsTable.makeStyle(this,'Normal');;
                                        },
                                        key: "style:normal"
                                    },
                                    {
                                        name: 'Bold',
                                        code: this,
                                        callback: function(key, options) {
                                                HandsTable.makeStyle(this,'Bold');
                                        },
                                        key:"style:makebold"

                                    },
                                    {
                                        name: 'Red color',
                                        code: this,
                                        callback: function(key, options) {
                                            HandsTable.makeStyle(this,'Red');
                                        },
                                        key:"style:red"
                                    },
                                    {
                                        name: 'Green color',
                                        code: this,
                                        callback: function(key, options) {
                                            HandsTable.makeStyle(this,'Green');
                                        },
                                        key:"style:green"
                                    }
                            ]
                        },
                    },//style
                    "hsep1": "---------",
                    "remove_row":{},
                    "col_left":{},
                    "col_right":{},
                    "remove_col":{},
                    "hsep2": "---------",
                    "undo":{},
                    "make_read_only":{},
                    "alignment":{},
                    "hsep3": "---------",


                }
            },
            //
            //
            // manualColumnResize: handsontable.columns,
            // colWidths:handsontable.colWidths;
            // autoWrapRow: true,
            // // rowHeaders: true,
            // // colHeaders: _(headers).map(function(header, i) {
            // //     return "<report-header display-name='" + header.colName + "' index='" + i + "' > </report-header>";
            // // }),
            // rowHeights: [50, 40, 100],
            // renderer: 'html',
            // contextMenu: ['row_above', 'row_below', 'remove_row'],
            //

            //
            contextMenuCopyPaste: {
                swfPath: '/bower_components/zeroclipboard/dist/ZeroClipboard.swf'
            },
            // observeDOMVisibility:true,
            // observeChanges:true,
            width:'99%',
            height:'99%'
            // Highlighting selection

            // currentRowClassName: 'currentRow',
            // currentColClassName: 'currentCol',

        };
    }

}

angular.module(smi2.app.name).service('HandsTable', HandsTable);