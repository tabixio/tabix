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
        if (draw && this.drawCommnads.drawtype) {
            this.drawType=this.drawCommnads.drawtype.toUpperCase();
        } else {
            this.drawType=false;
        }
        // проверка результат с ошибкой или это текстовая строка
        this.error=this.data.error;
        this.text=this.data.text;
        this.name="Widget";

        this.sizeX=3;// ширина
        this.sizeY=1;// высота
        //
        this.element=false;
        this.init=false;

        this.type=false;

        // Адовый костылище, поскольку в конструктор должны передаваться
        // dependency injecton, а не данные для работы класса. Поэтому я не могу
        // передать в конструктор сервис и дергаю его по рабоче - крестьянски.
        this.isDark=angular.element('*[ng-app]').injector().get("ThemeService").isDark();
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
        if (this._scheduledResize) {
            return;
        }
        // отложенный ресайз , если много изменений
        this._scheduledResize=true;
        let th=this;
        setTimeout(function() {
            th._scheduledResize=false;
            th.onResize();
        }, 400);
    }
    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }
}
// export { Widget };

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
            'MAP': DrawEcharts,
            'HEATMAP': DrawEcharts,
            'TREEMAP': DrawEcharts,
            'SANKEYS': DrawEcharts,
            'CHART': DrawAMcharts,
            'D3': DrawD3,
            'C3': DrawC3
        };
        // if class exists -> init ok
        this.init=this.getChartClass();


        if (this.data.countAll==1) {
            // результат толкьо одна отпра
            this.sizeX=6;
            this.sizeY=3;
        }
    }

    get draw(){
        if (this.drawType && !this._draw) {
            this._draw=new this._list[this.drawType](this,this.drawType);
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

class WidgetPivot extends Widget {
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
                // cols:['sin'],
                // rows:['cos'],
                // dataClass: $.pivotUtilities.SubtotalPivotData,
                // renderer: $.extend($.pivotUtilities.renderers,$.pivotUtilities.subtotal_renderers["Table With Subtotal"], $.pivotUtilities.c3_renderers),
                // rendererOptions: {
                //     collapseRowsAt: 1,
                //     collapseColsAt: 0
                // }
            }
        };

        if (this.data.countAll==1) {
            // результат толкьо одна отпра
            this.sizeX=6;
            this.sizeY=3;
        }
    }
}
class WidgetTable extends Widget {
    constructor(DataProvider, draw) {
        super(DataProvider, draw);
        this.type='table';
        this.table= {};
        this.sort=false;
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

        let ht = new HandsTable(this);

        // основной рендер конфиг таблицы
        this.table= {
            settings: ht.makeSettings(),
        };
        let countColumns=ht.countColumns();
        // ширина
        // init table size тут как бы отрефа
        let x = 1;
        if (countColumns>2) {
            x=2;
        }
        if (countColumns>5) {
            x=3;
        }
        if (countColumns>10) {
            x=4;
        }
        if (countColumns>15) {
            x=6;
        }


        // Для таблицы со статистикой выполнения запросов ширина всегда макс
        if (this.data.sourceType=='statistics') {
            x=6;
        }


        this.sizeX=x;
        //  высота
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
            // результат толкьо один был запрос
            this.sizeX=6;
        }
        this.init=true;
    }

    preProcessor() {

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
        this.table.width='99.9'+Math.floor(100*Math.random())+'%';
        this.table.height='99.9'+Math.floor(100*Math.random())+'%';
        let i=this.getInstanceHandsontable();
        if (i) {
            i.updateSettings({
                height:this.table.height, // тут нужно получить размер контейнера gridster и передать его в HotTable
                width:this.table.width

            });
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
angular.module(smi2.app.name).service('WidgetPivot', WidgetPivot);
angular.module(smi2.app.name).service('WidgetDraw', WidgetDraw);
