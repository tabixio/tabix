/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

class WidgetTable extends Widget {
    constructor(DataProvider, draw,sizeX,sizeY) {
        super(DataProvider, draw,sizeX,sizeY);
        this.type = 'table';
        this.table = {};
        this.sort = false;
        this.hotId = 'hotIdTable' + Math.floor(Math.random() * 10000000);

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
        this.hotRegisterer = false;

        let ht = new HandsTable(this);

        // основной рендер конфиг таблицы
        this.table = {
            settings: ht.makeSettings(),
        };


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
            this.sizeY = 2;
        }
        if (this.data.rows > 250) {
            this.sizeY = 3;
        }
        if (this.data.rows > 500) {
            this.sizeY = 4;
        }

        if (this.data.countAll == 1) {

            // результат толкьо один был запрос
            this.sizeX = 6;
            this.sizeY = 4;
        }


        this.sizeY = this.sizeY*2;
        this.sizeX = this.sizeX*2;
    }
    preProcessor() {

    }

    onDrag() {
        this.onResize();
    }

    getInstanceHandsontable() {
        if (this.hotRegisterer && this.init && this.element && this.hotId) {
            return this.hotRegisterer.getInstance(this.hotId);
        }
    }

    onResize(size) {
        if (!this.table) return;

        // console.log("onResize HotTable,this.table.width",this.table.width,this.table.height);
        let i = this.getInstanceHandsontable();
        if (i) {
            // this.table.width='99.9'+Math.floor(100*Math.random())+'%';
            // this.table.height='99.9'+Math.floor(100*Math.random())+'%';
            console.info("Table onResize pixelSize:",this.pixelSize);
            if (this.pixelSize && this.pixelSize[0] && this.pixelSize[1])
            {

                i.updateSettings(
                    {
                        height: this.pixelSize[1]-4 ,//this.table.height, // тут нужно получить размер контейнера gridster и передать его в HotTable
                        width:this.pixelSize[0]-4,//this.table.width

                    }
                );
            }
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
}

angular.module(smi2.app.name).service('WidgetTable', WidgetTable);
