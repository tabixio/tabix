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

        return {
            colHeaders: colHeaders,
            columns: columns
        };
    };


    makeBold(ht) {

        var selection = ht.getSelectedRange();
        console.log("selection",selection);
        var fromRow = Math.min(selection.from.row, selection.to.row);
        var toRow = Math.max(selection.from.row, selection.to.row);
        var fromCol = Math.min(selection.from.col, selection.to.col);
        var toCol = Math.max(selection.from.col, selection.to.col);
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
            persistentState:true,
            customBorders:true,

            filters: true,
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
                    "style": {
                            name: 'Style',
                            submenu: {
                                items: [
                                    {
                                        name: "Term1",
                                        callback: function (key, options,pf) {
                                            var selection = this.getSelectedRange();
                                            console.log(key,options,selection);
                                        },
                                        key: "insert_term:1"
                                    },
                                    {
                                        name: 'Bold',
                                        code: this,
                                        callback: function (key,code) {
                                            console.log("BOLD!",key,code);
                                            // key.makeBold(this);
                                        },
                                        key:"style:makebold"

                                    }
                            ]
                        }
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
            // // fixedRowsTop: 1,
            // // fixedColumnsLeft: 1,
            // // maxRows: 10,
            // // visibleRows:10,
            //
            contextMenuCopyPaste: {
                swfPath: '/bower_components/zeroclipboard/dist/ZeroClipboard.swf'
            },
            observeDOMVisibility:true,
            observeChanges:true,
            width:'100%',
            // Highlighting selection

            currentRowClassName: 'currentRow',
            currentColClassName: 'currentCol',

        };
    }

}

angular.module(smi2.app.name).service('HandsTable', HandsTable);