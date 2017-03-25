/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */


'use strict';

class DrawEchartsCalendar extends DrawEcharts {
/*  https://ecomfe.github.io/echarts-examples/public/editor.html?c=calendar-horizontal */



    create() {


        // Если это код не JS попробуем получить обьект
        let drw = this.getDrawCommandObject();

        let sets = {
            date: '',
            title:'Calendar',
            value:''
        };

        if (drw) {
            sets = Object.assign(sets, drw);
        }



        if (!sets.date || !sets.value ||  !this.haveColumn(sets.date) ||  !this.haveColumn(sets.value)) {

            // auto search columns
            let cols=this.getColumns().length;
            let dt_column=this.getDateColumn();
            let val_column=false;

            if (dt_column) {
                let dt_pos=this.getColumnPosition(dt_column);

                for (let i = dt_pos+1; i < cols; i = i + 1) {
                    let col=this.getColumns(i);
                    if (!val_column && this.isNumericColumn(col)) {
                        val_column=col;
                        break;
                    }
                }
            }
            sets.date=dt_column;
            sets.value=val_column;

        }


        if (!this.haveColumn(sets.date) ||  !this.haveColumn(sets.value)) {
            this.setError("Not set date | value cols");
            return false;
        }
        // find min / max by sets.value
        let max=0;
        let min=Number.MAX_VALUE;


        let data=_.map(this.data(),function (n) {
            let val=parseFloat(n[sets.value]);

            if (val && max<val) max=val;

            if (val && min>val) min=val;

            return [n[sets.date],val]
        });


        data=_.groupBy(data,function (n) {
            //yyyy-mm-dd
            let y=(""+n[0]).substring(0,4);
            return y;
        });


        let o= {
            tooltip: {
                position: 'top'
            },
            calendar:[],
            series:[],
            visualMap: {
                min: min,
                max: max,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                top: 'top'
            }
        };

        let top=60;
        let calendarIndex=0;

        _.forEach(data, function(value, key) {

            o.calendar.push(
                {
                    top:top,//position
                    range: key,
                    right: 0,
                    cellSize: ['auto', 20]
                }
            );

            o.series.push({
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data: value,
                    calendarIndex:calendarIndex
                }
            );
            calendarIndex=calendarIndex+1;
            top=top+200;
        });//for


        this.options = Object.assign(o, this.options);
        return true;


    }
}