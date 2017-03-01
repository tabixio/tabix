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

        if (cellProperties.color) {
            td.style.color = cellProperties.color;
        }
    };
    static isDark() {
        // @todo придумать как достать из isDark из глобального обьекта темы
        // ??? window.isDarkThemeGlobal
        return true;
    }

    countColumns() {
        return this.meta.length;
    }
    makeColumns() {

        let colHeaders = [];
        let columns = [];
        let positions={};
        let cnt=0;
        this.meta.forEach((cell) => {


            positions[cell.name]=cnt;
            cnt++;

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
                case 'Float32':     c.width=80; c.type='numeric';c.format="0.[0000000]";break;
                case 'Float64':     c.width=80; c.type='numeric';c.format="0.[0000000]";break;
                case 'String':      c.width=180; break;
            }
            c.renderer=this._handsRenderer;
            c.data=cell.name;
            columns.push(c);
        });

        return {
            colHeaders: colHeaders,
            columns: columns,
            colPositions: positions
        };
    };

    static makeHeatmaps(ht,format) {

        // format = Heatmaps | NegaPosi
        // Heatmap для выбранных колонок,
        // @todo Подобрать цвета для Dark темы , как передать это дарк ?
        console.info('isDark',ht.getSettings().isDark);

        console.warn(ht.getCellMeta(0,0,'isDark'));

        let selection = ht.getSelectedRange();
        let fromCol = Math.min(selection.from.col, selection.to.col);
        let toCol = Math.max(selection.from.col, selection.to.col);

        let h1="#a900e5";
        let h2="#3668ff";

        let heatmapScale  = chroma.scale([h1, h2]);

        for (let col = fromCol; col <= toCol; col++) {

            let allRows=ht.countRows();
            let values = ht.getDataAtCol(col);
            let min=Math.min.apply(null, values);
            let max=Math.max.apply(null, values);

            if (min !== null && max !==null)
            {
                for (let row = 0; row <= allRows; row++) {
                    let value=parseFloat(ht.getDataAtCell(row,col));


                    if (format == 'Heatmaps') {
                        let point=(value - min) / (max - min);
                        let color=heatmapScale(point).hex();
                        let meta=ht.getCellMeta(row,col);
                        if (meta)
                        {
                            // пробрасыавем в ренден _handsRenderer параметр backgroundColor
                            ht.setCellMeta(row, col, 'backgroundColor', color);
                        }
                    }

                    if (format == 'NegaPosi') {

                        let color=false;
                        if (value<0) {
                            color="#e27137";
                        }
                        if (value>0) {
                            color="#31b3e5";
                        }

                        let meta=ht.getCellMeta(row,col);
                        if (meta && color)
                        {
                            // пробрасыавем в ренден _handsRenderer параметр color
                            ht.setCellMeta(row, col, 'color', color);
                        }
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
            console.log("makeFormat for coll ="+col,makeFormat);


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
                case 'Float':           columns[col].format='0.[0000000]';break;
            }
        }
        ht.updateSettings({
            columns:columns
        });
        ht.render();
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
    static pushToClipboardText(outText){
        //
        // // Create a temporary element off screen.
        // var tmpElem = $('<div>');
        // tmpElem.css({
        //     position: "absolute",
        //     left:     "-1000px",
        //     top:      "-1000px",
        // });
        // // Add the input value to the temp element.
        // <textarea class="clipboardTextArea" id="clipboardTextArea">COPY TEXT</textarea>

        // $("#clipboardTextArea").text(outText);
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
        //

        // $("body").append(tmpElem);
        // // Select temp element.
        // range.selectNodeContents(tmpElem.get(0));
        // let selection = window.getSelection ();
        // selection.removeAllRanges ();
        // selection.addRange (range);
        // // Lets copy.
        // try {
        //     success = document.execCommand ("copy", false, null);
        // }
        // catch (e) {
        //     // copyToClipboardFF(input.val());
        // }
        // if (success) {
        //     alert ("The text is on the clipboard, try to paste it!");
        //
        // }
        // // remove temp element.
        // tmpElem.remove();

        // х-й знает почему Clipboard вообще не пещает
        //
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
        //
        // var copyEvent = new ClipboardEvent('copy', { dataType: 'text/plain', data: 'Data to be copied' } );
        // document.dispatchEvent(copyEvent);
        //
        // document.execCommand('copy', false, outText);
        // this.copyToClipboard();




        window.prompt("Copy to clipboard: Ctrl+C, Enter", outText);

    }

    static makeWhereIn(ht) {
        let selection = ht.getSelectedRange();
        let fromRow = Math.min(selection.from.row, selection.to.row);
        let toRow = Math.max(selection.from.row, selection.to.row);
        let fromCol = Math.min(selection.from.col, selection.to.col);
        let toCol = Math.max(selection.from.col, selection.to.col);


        let outText=[];

        //
        // for (let col = fromCol; col <= toCol; col++) {
        //     cols.push(ht.colToProp(col));
        // }

        let columns = ht.getSettings().columns;

        for (let col = fromCol; col <= toCol; col++) {
            let rr=[];
            for (let row = fromRow; row <= toRow; row++) {
                rr.push(ht.getDataAtCell(row,col));
            }

            let unique = rr.filter((v, i, a) => a.indexOf(v) === i);

            // get Type of column

            let typeColumn=columns[col].type.toLowerCase();
            if (typeColumn.includes('numeric')) {
                // Если числовая колонка

                outText.push(ht.colToProp(col)+" IN ( "+unique.join(" , ")+') ');

            } else {
                outText.push(ht.colToProp(col)+" IN ( \""+unique.join("\" , \"")+'") ');
            }



        }
        outText="\n"+outText.join("\n\tAND\n")+"\n\n";

        console.log(outText);
        HandsTable.pushToClipboardText(outText);
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

        HandsTable.pushToClipboardText(outText);


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




        let o=  {
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
                                {
                                    name: "Negative & Positive",key:"columnformat:11",  callback: function (key, options,pf) {  HandsTable.makeHeatmaps(this,'NegaPosi'); },
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
                    "whereIN": {
                        name: 'where IN',
                        submenu: {
                            items: [
                                {
                                    name: "col1 (val,val),col2 ...",
                                    callback: function (key, options,pf) {
                                        HandsTable.makeWhereIn(this);

                                    },
                                    key:"whereIN:1"
                                }//Money
                            ]//items
                        },//submenu
                    },

                    // "remove_row":{},
                    // "col_left":{},
                    // "col_right":{},
                    // "remove_col":{},
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


        if (this.WidgetTable.data.sort && this.WidgetTable.data.sortOrder)
        {
            o.columnSorting={
                column: makeColumns.colPositions[this.WidgetTable.data.sort],
                sortOrder:(this.WidgetTable.data.sortOrder.toLowerCase()=='desc'?false:true)
            };
        }

        return o;


    }

}

angular.module(smi2.app.name).service('HandsTable', HandsTable);