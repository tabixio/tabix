/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class HandsTable {

    constructor(WidgetTable) {
        this.WidgetTable=WidgetTable;
        this.isDark=WidgetTable.isDark;
        this.meta=WidgetTable.data.meta;
    }

    _handsRenderer (instance, td, row, col, prop, value, cellProperties) {


        // if (cellProperties.type)
        if (cellProperties.type=='numeric'){
            Handsontable.renderers.NumericRenderer.apply(this, arguments);
        }
        else {
            if (cellProperties.type=='date'|| cellProperties.type=='time')
            {
                // кастомный рендер на поле даты/вреря/датавремя
                if (moment(new Date(value)).isValid()) {
                    if (cellProperties.renderDateFormat) {
                        value=moment(value).format(cellProperties.renderDateFormat);
                    }
                }

                arguments[5]=value;// так работает ;)


                Handsontable.renderers.TextRenderer.apply(this, arguments);
            }
            else {

                Handsontable.renderers.TextRenderer.apply(this, arguments);
            }
        }

        // backgroundColor для ячейки
        if (cellProperties.backgroundColor) {
            td.style.backgroundColor = cellProperties.backgroundColor;
        }
    };
    static isDark() {
        // @todo придумать как достать из isDark из глобального обьекта темы
        return true;
    }

    countColumns() {
        return this.meta.length;
    }
    makeColumns() {

        let colHeaders = [];
        let columns = [];
        this.meta.forEach((cell) => {

            colHeaders.push(cell.name);
            let c={};
            c.type='text';
            c.width=100;
            c.typeOriginal=cell.type;
            c.isDark=this.isDark;




            //UInt8, UInt16, UInt32, UInt64, Int8, Int16, Int32, Int64
            if (cell.type.includes('Int'))
            {
                c.width=80;
                c.type='numeric';
            }
            // other type
            switch (cell.type) {
                case 'Date':        c.width=90; c.type='date'; c.dateFormat='YYYY-MM-DD';break;
                case 'DateTime':    c.width=150; c.type='time'; c.timeFormat='YYYY-MM-DD HH:mm:ss'; break;
                case 'Float32':     c.width=80; c.type='numeric';break;
                case 'Float64':     c.width=80; c.type='numeric';break;
                case 'String':      c.width=180; break;
            }


            c.renderer=this._handsRenderer;
            c.data=cell.name;
            columns.push(c);
        });

        return {
            colHeaders: colHeaders,
            columns: columns
        };
    };

    static makeHeatmaps(ht,format) {

        // Heatmap для выбранных колонок,
        // @todo Подобрать цвета для Dark темы , как передать это дарк ?
        console.info('isDark',ht.getSettings().isDark);

        console.warn(ht.getCellMeta(0,0,'isDark'));

        let selection = ht.getSelectedRange();
        let fromCol = Math.min(selection.from.col, selection.to.col);
        let toCol = Math.max(selection.from.col, selection.to.col);
        let heatmapScale  = chroma.scale(['red', '008ae5']);

        for (let col = fromCol; col <= toCol; col++) {

            let allRows=ht.countRows();
            let values = ht.getDataAtCol(col);
            let min=Math.min.apply(null, values);
            let max=Math.max.apply(null, values);

            if (min !== null && max !==null)
            {
                for (let row = 0; row <= allRows; row++) {
                    let value=parseFloat(ht.getDataAtCell(row,col));
                    let point=(value - min) / (max - min);
                    let color=heatmapScale(point).hex();
                    let meta=ht.getCellMeta(row,col);
                    if (meta)
                    {
                        // пробрасыавем в ренден _handsRenderer параметр backgroundColor
                        ht.setCellMeta(row, col, 'backgroundColor', color);
                    }
                }
            }
            else
            {
                console.warn("Can`t find Min&Max in column",col);
            }
        }
        ht.render();
    }
    static makeFormat(ht,makeFormat) {

        console.log("makeFormat",makeFormat);

        let selection = ht.getSelectedRange();
        let fromCol = Math.min(selection.from.col, selection.to.col);
        let toCol = Math.max(selection.from.col, selection.to.col);

        // let headers = ht.getColHeader();
        //
        // console.log(col,ht.colToProp(col));
        // console.warn(headers);
        // console.warn('head',ht.getSettings().colHeaders);
        // console.warn('columns',ht.getSettings().columns);


        let columns = ht.getSettings().columns;
        for (let col = fromCol; col <= toCol; col++) {

            switch (makeFormat) {
                case 'Reset':           columns[col].format=false;  columns[col].renderDateFormat=false;break;
                case 'Money':           columns[col].format='$0,0.00'; break;
                case 'Human':           columns[col].format='5a'; break;
                case 'Bytes':           columns[col].format='0.0b';      break;
                case 'Percentages':     columns[col].format='(0.00 %)';     break;
                case 'Time':            columns[col].renderDateFormat='HH:mm:ss';     break;
                case 'Date':            columns[col].renderDateFormat='YYYY-MM-DD';break;
                case 'DateTime':        columns[col].renderDateFormat='YYYY-MM-DD HH:mm:ss';break;
                case 'DateLoc':         columns[col].renderDateFormat='LLLL';break;
                case 'Float':           columns[col].format='0,0.0000';break;
            }
        }
        ht.updateSettings({
            columns:columns
        });
        // ht.render();
    }
    static isFormatColl(ht,needFormat) {

        needFormat=needFormat.toLowerCase();
        let selection = ht.getSelectedRange();
        let fromCol = Math.min(selection.from.col, selection.to.col);
        let toCol = Math.max(selection.from.col, selection.to.col);
        let columns = ht.getSettings().columns;
        for (let col = fromCol; col <= toCol; col++) {
            if (!columns[col].type.toLowerCase().includes(needFormat)) return false;
        }
        return true;
    }
    static copyToClipboard(val){

        document.getElementById("dummy_id").value=val;
        dummy.select();
        document.execCommand("copy");

    }

    static copyToClipboard(ht,styleMarkdown) {
        let selection = ht.getSelectedRange();
        let fromRow = Math.min(selection.from.row, selection.to.row);
        let toRow = Math.max(selection.from.row, selection.to.row);
        let fromCol = Math.min(selection.from.col, selection.to.col);
        let toCol = Math.max(selection.from.col, selection.to.col);


        let outText="";
        let cols=[];
        for (let col = fromCol; col <= toCol; col++) {
            cols.push(ht.colToProp(col));
        }
        outText=outText+" | "+cols.join(" | ")+" |\n";
        cols=[];



        for (let row = fromRow; row <= toRow; row++) {
            for (let col = fromCol; col <= toCol; col++) {
                cols.push(ht.getDataAtCell(row,col));
            }
            outText=outText+" | "+cols.join(" | ")+" |\n";
            cols=[];
        }
        // х-й знает почему Clipboard вообще не пещает
        // <textarea class="clipboardTextArea" id="clipboardTextArea">COPY TEXT</textarea>
        // остнется prompt - привет WinXP (facepalm)
        // var btn = document.getElementById('clipboardTextArea');
        // var clipboard = new Clipboard(btn);
        //
        // clipboard.on('success', function(e) {
        //     console.info('Action:', e.action);
        //     console.info('Text:', e.text);
        //     console.info('Trigger:', e.trigger);
        //
        //     e.clearSelection();
        // });
        //
        // clipboard.on('error', function(e) {
        //     console.error('Action:', e.action);
        //     console.error('Trigger:', e.trigger);
        // });

        window.prompt("Copy to clipboard: Ctrl+C, Enter", outText);

        //
        //
        // var copyEvent = new ClipboardEvent('copy', { dataType: 'text/plain', data: 'Data to be copied' } );
        // document.dispatchEvent(copyEvent);
        //
        // document.execCommand('copy', false, outText);

        }
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
                    // добавление класса лучше использовать
                    ht.setCellMeta(row, col, 'className', cl);
                }
            }
        }
        ht.render();
    }
    makeSettings()
    {
        // make columns
        let makeColumns=this.makeColumns();




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
            isDark:this.isDark,
            // fixedRowsTop: 1,
            // fixedColumnsLeft: 1,
            // maxRows: 10,
            // visibleRows:20000,
            filters: true,
            columnSorting: true,
            sortIndicator: true,
            manualRowResize: true,
            viewportColumnRenderingOffset:'auto',
            wordWrap:false,
            autoColumnSize: { samplingRatio: 23 },
            preventOverflow: 'horizontal',

            columns: makeColumns.columns,
            colHeaders: makeColumns.colHeaders,
            contextMenu: {
                items: {
                    "columnformat": {
                        name: 'Column format',
                        submenu: {
                            items: [
                                {
                                    name: "Reset",key:"columnformat:1",  callback: function (key, options,pf) {  HandsTable.makeFormat(this,'Reset'); },
                                },
                                {
                                    name: "Money",key:"columnformat:2",  callback: function (key, options,pf) {  HandsTable.makeFormat(this,'Money'); },
                                    disabled: function () { return !HandsTable.isFormatColl(this,'numeric'); }
                                },
                                {
                                    name: "Human",key:"columnformat:3",  callback: function (key, options,pf) {  HandsTable.makeFormat(this,'Human'); },
                                    disabled: function () { return !HandsTable.isFormatColl(this,'numeric'); }
                                },
                                {
                                    name: "Bytes",key:"columnformat:4",  callback: function (key, options,pf) {  HandsTable.makeFormat(this,'Bytes'); },
                                    disabled: function () { return !HandsTable.isFormatColl(this,'numeric'); }
                                },
                                {
                                    name: "Percentages",key:"columnformat:5",  callback: function (key, options,pf) {  HandsTable.makeFormat(this,'Percentages'); },
                                    disabled: function () { return !HandsTable.isFormatColl(this,'numeric'); }
                                },
                                {
                                    name: "Time only",key:"columnformat:6",
                                        callback: function (key, options,pf) {  HandsTable.makeFormat(this,'Time'); },
                                        disabled: function () { return !HandsTable.isFormatColl(this,'Time'); }
                                },
                                {
                                    name: "Date only",key:"columnformat:7",  callback: function (key, options,pf) {  HandsTable.makeFormat(this,'Date'); },
                                    disabled: function () { return !HandsTable.isFormatColl(this,'Date'); }
                                },
                                {
                                    name: "Date loc.",key:"columnformat:8",  callback: function (key, options,pf) {  HandsTable.makeFormat(this,'DateLoc'); },
                                    disabled: function () { return !HandsTable.isFormatColl(this,'Date'); }
                                },
                                {
                                    name: "Float",key:"columnformat:9",  callback: function (key, options,pf) {  HandsTable.makeFormat(this,'Float'); },
                                    disabled: function () { return !HandsTable.isFormatColl(this,'numeric'); }
                                },
                                {
                                    name: "Heatmaps",key:"columnformat:10",  callback: function (key, options,pf) {  HandsTable.makeHeatmaps(this,'Heatmaps'); },
                                    disabled: function () { return !HandsTable.isFormatColl(this,'numeric'); }
                                },


                            ]//items
                        }//submenu
                    },
                    // -------------------- column Show Hide --------------------------------------------------------------------
                    //
                    // "columnshowhide": {
                    //     name: 'ShowHide Columns',
                    //     submenu: {
                    //         items: [
                    //             {
                    //                 name: "Hide this column",
                    //                 callback: function (key, options,pf) {
                    //                     // HandsTable.makeStyle(this,'Normal');;
                    //                     console.log("Hide this column");
                    //                 },
                    //                 key:"columnshowhide:1"
                    //             }//Money
                    //         ]//items
                    //     },//submenu
                    // },
                    //


                    // -------------------- Style CELL --------------------------------------------------------------------
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
                                        callback: function(key, options) {
                                                HandsTable.makeStyle(this,'Bold');
                                        },
                                        key:"style:makebold"

                                    },
                                    {
                                        name: 'Red color',
                                        callback: function(key, options) {
                                            HandsTable.makeStyle(this,'Red');
                                        },
                                        key:"style:red"
                                    },
                                    {
                                        name: 'Green color',
                                        callback: function(key, options) {
                                            HandsTable.makeStyle(this,'Green');
                                        },
                                        key:"style:green"
                                    }
                            ]
                        },
                    },//style
                    "hsep1": "---------",

                    // -------------------- Copy to  --------------------------------------------------------------------

                    "copyTo": {
                        name: 'Copy To',
                        submenu: {
                            items: [
                                {
                                    name: "Redmine Markdown",
                                    callback: function (key, options,pf) {
                                        HandsTable.copyToClipboard(this,'Redmine');;

                                    },
                                    key:"copyTo:1"
                                }//Money
                            ]//items
                        },//submenu
                    },

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
            //

            //
            contextMenuCopyPaste: {
                swfPath: '/bower_components/zeroclipboard/dist/ZeroClipboard.swf'
            },
            // observeDOMVisibility:true,
            // observeChanges:true,



            // Highlighting selection подсветка строк
            currentRowClassName: 'currentRow',
            currentColClassName: 'currentCol',

        };
    }

}

angular.module(smi2.app.name).service('HandsTable', HandsTable);