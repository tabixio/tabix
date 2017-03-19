
'use strict';

class DrawEchartsChart extends DrawEcharts {


    create(){
        console.log("DrawEchartsChart");
        let drw = this.getDrawCommandObject();

        let options = this.createChart(drw);







        let GlobalOption = {
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            title: {

            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            dataZoom: [
                {
                    type: 'inside',
                    show: true,
                    realtime: true,
                },
                {
                    show: true,
                    realtime: true,
                }
            ]
        };


        this.options = Object.assign(options, this.options,GlobalOption);


        console.info(this.options);

        return true;
        // цикл по series для создания legend.data[]
        // stack - если указан общий то группируется по полю

        // Включение подсветки min/max/avg - линий или точками
        // series.0.markPoint.data=[{type: 'max' }, {type: 'min' }, {type: 'average' }]
        // series.0.markLine.data=[{type: 'max' }, {type: 'min' }, {type: 'average' }]


        // BAR отличается от Line указанием серии + можно повернуть на 90гр.



    }

    findDateTimeAxis() {
        // Автоматическое определение
        let dt=this.getDateTimeColumn();
        if ( dt ) { return dt; }

        let d=this.getDateColumn();
        if ( d ) { return d; }
        return false;
    }

    createChart(drw) {


        let sets = {
            autoAxis: true,
        };
        if (drw) {
            sets = Object.assign(sets, drw);
        }


        let columns=this.getColumns();
        let options={};
        let yAxis=[];
        let xAxis=[];
        let firstCol=this.getFirstColumn();
        let dtCol=this.findDateTimeAxis();
        let series=[];
        if (dtCol) {
            firstCol=dtCol;
            xAxis={
                name : dtCol,
                type : 'time',
                // boundaryGap : false,
                // axisLine: {onZero: true},
                data: _.map(this.data(),dtCol)
            };
        }
        else {
            // Берем первую колонку
            xAxis={
                name : firstCol,
                type : 'category',
                boundaryGap : false,
                // axisLine: {onZero: true},
                data: _.map(this.data(),firstCol)
            };
        }



        let colsMedianAxis=[]; // содержит mediana для каждой колонки
        let lastColumn=''; // нужно чтобы задать название оси
        let index=0;

        for ( let colPos in columns) {
            // Идем по каждой колонке, если она не нужна для постореняи оси, или она числовая - доавляем ее в series
            let yAxisIndex=0;
            let col=columns[colPos];
            if (col!=firstCol && this.isNumericColumn(col)) {

                let dataThisColumn=_.map(this.data(),col);
                let mediana=_.median(dataThisColumn);

                lastColumn=col;
                let seria={
                    name:col,
                    type:'line',
                    symbolSize: 8,
                    hoverAnimation: false,
                    //yAxisIndex:yAxisIndex

                    data:dataThisColumn
                };
                // добавляем в серию
                series.push(seria);

                // median for series
                colsMedianAxis.push({
                    column:col,
                    median:mediana,
                    index:index
                });
                // index series
                index=index+1;
            }
        }// for columns

        if (sets.autoAxis  && colsMedianAxis.length>1) {

            // Разбиваем на группы значение median по делению на 1000
            let groups=_.groupBy(colsMedianAxis,  function (o) {  return Math.floor(o.median/1000);  }  );
            // Если груп больше одной
            if (_.size(groups)>1) {
                for ( let pos in groups) {
                    let group=groups[pos];
                    // Имя оси как состовной из колонок
                    let axis_name=_.map(group,'column').join(",");

                    // Для каждой серии мы определяем привязанную ось
                    _.forEach(group,function (c) {
                            series[c.index]['yAxisIndex']=yAxis.length;
                    });

                    // добавляем новую ось
                    yAxis.push({
                        name : axis_name,
                        type : 'value',
                    });
                }
            }
        }


        if (!yAxis.length) {
            // default axis
            yAxis=[{
                name : lastColumn,
                type : 'value',
            }];
        }

        options.series=series;
        options.yAxis=yAxis;
        options.xAxis=xAxis;
        return options;

    }
}