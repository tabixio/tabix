'use strict';
/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar, SMI2 LLC and other contributors
 */

class WidgetTable extends Widget {
    constructor(DataProvider, draw,sizeX,sizeY) {
        super(DataProvider, draw,sizeX,sizeY);
        this.type = 'table';
        this.table = {};
        this.sort = false;

        this.hotId = 'hotIdTable' + Math.floor(Math.random() * 10000000); // some ID for Table

        // Object init in `postProcessor`
        this.handsonTable={};

        // if Error or Text box -> use static size
        if (this.error) {
            this.sizeY = 2;
            this.sizeX = 12;
            this.init = false;
            return;
        }
        if (this.text) {
            this.sizeY = 4;
            this.sizeX = 12;
            this.init = false;
            return;
        }

        // init HandsTable helper
        let ht = new HandsTable(this.isDark,this.data.meta,
            {
                // @todo : use for statistic table
                sort:false,
                sortOrder:false
            }
        );

        // store settings table
        this.table = {
            settings: ht.makeSettings(),

        };
        // apply hotId
        this.table.settings.hotId=this.hotId;

        // if not set size
        if (!this.sizeX && !this.sizeY)
        {
            let countColumns = ht.countColumns();
            this.initTableWSize(countColumns);
        }
        this.init = true;
    }
    initTableWSize(countColumns)
    {

        // ширина
        // init table size тут как бы отрефа
        let x = 1;
        if (countColumns > 2) {
            x = 2;
        }
        if (countColumns > 5) {
            x = 3;
        }
        if (countColumns > 10) {
            x = 4;
        }
        if (countColumns > 15) {
            x = 6;
        }


        // Для таблицы со статистикой выполнения запросов ширина всегда макс
        if (this.data.sourceType == 'statistics') {
            x = 6;
        }


        this.sizeX = x;
        //  высота
        this.sizeY = 1;//1...2...3...4...5..

        if (this.data.rows > 60) {
            this.sizeY = 1;
        }
        if (this.data.rows > 250) {
            this.sizeY = 2;
        }
        if (this.data.rows > 500) {
            this.sizeY = 3;
        }

        if (this.data.countAll == 1) {

            // результат толкьо один был запрос
            this.sizeX = 6;
            this.sizeY = 3;
        }


        this.sizeY = this.sizeY*2;
        this.sizeX = this.sizeX*2;
    }

    destroy(widget) {

        // destroy
        return function() {
        console.log("WidgetTable.destroy()");
           widget.handsonTable.destroy();
           widget.handsonTable = null;
           widget.data.data = null;
           widget.settings = null;
           widget.table = null;
           widget.init = false;
           widget.element.html();
           console.log("WidgetTable.destroy() done");
        }
    }



    preProcessor() {
        // console.log("WidgetTable.preProcessor()");
    }

    postProcessor() {
        console.log("WidgetTable.postProcessor()");
        // init settings Handsontable
        let ll=this.table.settings;
        ll.data=this.data.data;
        // create Handsontable
        this.handsonTable = new Handsontable(this.element[0], ll);
        // this.handsonTable.updateSettings(l);
        // this.handsonTable.loadData(this.data.data);
        // this.handsonTable.render();
        console.log("WidgetTable.postProcessor.handsonTable - done");
    }


    onDrag() {
        this.onResize();
    }

    onResize(size) {
        if (!this.init) return;
        if (!this.handsonTable) return;
        // if handsonTable exists - call handsonTable.render()
        if (size && size[0]>0 && size[1]>0)
        {
            console.log("Call this.handsonTable.render()",size);
            this.handsonTable.updateSettings(
                {
                    width:size[0]-10,
                    height:size[1]-10
                }
            );
        }

        this.handsonTable.render();

        return true;
    }
}

angular.module(smi2.app.name).service('WidgetTable', WidgetTable);
