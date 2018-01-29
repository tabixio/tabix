/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */

'use strict';

class DrawEchartsChart extends DrawEcharts {


    create() {
        console.log("DrawEchartsChart");
        let drw = this.getDrawCommandObject();

        let optionsPreCreate = this.preCreate(drw);
        let options = this.createChart(drw);
        let GlobalOption = {


            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'shadow'}
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },

        };

        if (drw['title']) {
            this.applyTitle(drw['title']);
        }
        this.applyDataZoom();
        this.applyLegend();

        this.options = Object.assign(options, this.options, GlobalOption, optionsPreCreate);

        this.postCreate(drw);

        // console.info(this.options);

        return true;


        // BAR отличается от Line указанием серии + можно повернуть на 90гр.


    }


    postCreate(drw) {
        return {};
    }

    preCreate(drw) {
        return {};
    }


    createChart(drw) {

        let sets = {
            autoAxis: false,
            markLine: true,
            stack: false,
            path: false,
            sort: true,
            xAxis: false,
            yAxis: false
        };
        if (drw) {
            sets = Object.assign(sets, drw);
        }
        // @todo : support xAxis + yAxis ( array )

        let enableColumns = {};
        let columns = this.getColumns();
        let firstCol = this.getFirstColumn();
        let xAxisCol = firstCol;
        let dtCol = this.findDateTimeAxis();

        let options = {};
        let yAxis = [];
        let xAxis = [];
        let series = [];
        let $series = {};
        // ------------------------------------------------------------------------------------------------------------------------------------
        let $data = this.data();

        if (dtCol) {
            firstCol = dtCol;
        }
        // Если указана ось X
        if (sets.xAxis) {
            if (!this.haveColumn(sets.xAxis)) {
                throw "xAxis column not exists";
            }
            xAxisCol = sets.xAxis;
        }
        else {
            // Отсортируем данные
            if (sets.sort) {
                $data = _.sortBy($data, firstCol);
            }
            // Берем первую колонку
            xAxisCol = firstCol;

        }
        // Добавляем ось X
        xAxis = [{
            name: xAxisCol,
            type: 'category',
            // boundaryGap : false,
            // axisLine: {onZero: true},
            data: []
        }];
        // ------------------------------------------------------------------------------------------------------------------------------------

        // Если указана ось Y может быть строка или массив
        if (sets.yAxis) {
            if (_.isString(sets.yAxis)) {

                if (!this.haveColumn(sets.yAxis)) {
                    throw "yAxis column not exists";
                }
                enableColumns[sets.yAxis] = 1;
            } else if (_.isArray(sets.yAxis)) {
                let index;
                for (index = 0; index < sets.yAxis.length; ++index) {
                    let x = sets.yAxis[index];
                    if (!this.haveColumn(x)) {
                        throw "yAxis column not exists:" + x;
                    }
                    enableColumns[x] = 1;
                }
            } else {
                throw "yAxis column must string or array";
            }

        }

        console.log("enableColumns,", enableColumns);

        // ------------------------------------------------------------------------------------------------------------------------------------
        let colsMedianAxis = []; // содержит mediana для каждой колонки

        let lastColumn = ''; // нужно чтобы задать название оси
        let index = 0;

        // если указана группировка по колонкам
        let path = this.getParameterPath();

        let groupPath = false;
        if (path) {
            groupPath = true;
            // указан путь данных - т/е группировка
            // разбиваем данные по этим группировочным полям
        }
        // ------------------------------------------------------------------------------------------------------------------------------------
        let cntStrAdd = 0;
        let colValues = [];
        for (let colPos in columns) {
            // Идем по каждой колонке, если она не нужна для постореняи оси, или она числовая - доавляем ее в series
            let col = columns[colPos];

            let skip = false;

            if (_.size(enableColumns)) {
                skip = _.isUndefined(enableColumns[col]);
            }


            if (col != xAxisCol && !skip) {
                if (this.isStringColumn(col) && cntStrAdd < 2 && !groupPath) {
                    // Автопуть - автоматические создание групп если вторая и/или третья колонка строки
                    if (!_.isArray(path)) {
                        path = [];
                    }

                    path.push(col);
                    cntStrAdd++;
                }
                else {
                    if (this.isNumericColumn(col)) {
                        colValues.push(col);
                    }
                }
            }
        }

        // ------------------------------------------------------------------------------------------------------------------------------------
        let len = $data.length;
        console.log("DATA LEN", len, $data);

        // выбираем только уникальные значения для оси }{
        for (index = 0; index < len; ++index) {
            let item = $data[index];
            xAxis[0].data.push(item[xAxis[0].name]);
        }
        xAxis[0].data = _.uniq(xAxis[0].data);
        console.log("xAxis[0].data.", xAxis[0].data);


        for (index = 0; index < len; ++index) {
            let item = $data[index];
            // xAxis[0].data.push(item[xAxis[0].name]);

            for (let colPos in columns) {
                // Идем по каждой колонке, если она не нужна для постореняи оси, или она числовая - доавляем ее в series
                let col = columns[colPos];
                let series_path = [xAxisCol];
                let skip = false;

                if (_.size(enableColumns)) {
                    skip = _.isUndefined(enableColumns[col]);
                }


                if (col !== xAxisCol && !skip && this.isNumericColumn(col) && _.findIndex(path, col) < 0) {
                    if (path) {

                        for (let pi = 0; pi < path.length; ++pi) {
                            let cc = path[pi];
                            series_path.push(item[cc]);
                        }
                    }
                    series_path.push(col);
                    series_path = series_path.join(':___:');

                    if (!$series[series_path]) {
                        $series[series_path] = new Map();

                        xAxis[0].data.forEach(function (x) {
                            $series[series_path].set(x, null);
                        });

                    }
                    let __val = item[col];
                    if (this.isNumericColumn(col)) {
                        __val = parseFloat(__val);
                    }

                    // console.log('item[firstCol]=',item[firstCol],__val);
                    $series[series_path].set(item[xAxisCol], __val);
                }
            }// for columns
        } // for $data

        console.log('xAxisCol', xAxisCol);
        console.log('xAxis', xAxis);
        console.log('PATH', path);
        console.log('colValues', colValues);
        // ---------------------------------------------------------------
        console.log("firstCol", firstCol);
        // console.log("colValues",colValues);
        console.log("path", path);
        console.log("$series", $series);
        // ---------------------------------------------------------------
        $data = null;
        colValues = null;
        // ------------------------------------------------------------------------------------------------------------------------------------
        index = 0;

        for (let seriaName in $series) {
            let yAxisIndex = 0;
            let showSeriaName = '';
            showSeriaName = seriaName.replace(/:___:/g, ':');
            // Fetch data from Map()
            let dataThisColumn = Array.from($series[seriaName].values());

            let mediana = _.median(dataThisColumn);

            let seria = {
                name: showSeriaName,
                type: 'line',
                symbolSize: 8,
                hoverAnimation: false,
                smooth: true,
                //yAxisIndex:yAxisIndex
                data: dataThisColumn
            };
            // ----- BAR ---------------
            if (this.preference.bar) {
                seria.type = 'bar';
                seria.barGap = '-100%';
                seria.barCategoryGap = '40%';
            }

            if (sets.markLine && parseFloat(mediana)) {
                seria.markLine = {
                    data: [
                        {
                            name: 'mediana',
                            yAxis: parseFloat(mediana),
                        },
                    ]
                };
            }
            // median for series
            colsMedianAxis.push({
                column: showSeriaName,
                median: mediana,
                index: index
            });

            lastColumn = showSeriaName;

            // добавляем в серию
            series.push(seria);
            // index series
            index = index + 1;
        }
        // ------------------------------------------------------------------------------------------------------------------------------------
        if (sets.autoAxis && colsMedianAxis.length > 1) {

            // Разбиваем на группы значение median по делению на 1000
            let groups = _.groupBy(colsMedianAxis, function (o) {
                return Math.floor(o.median / 1000);
            });
            // Если груп больше одной
            if (_.size(groups) > 1) {
                for (let pos in groups) {
                    let group = groups[pos];
                    // Имя оси как состовной из колонок
                    let axis_name = _.map(group, 'column').join(",");

                    // Для каждой серии мы определяем привязанную ось
                    _.forEach(group, function (c) {
                        series[c.index]['yAxisIndex'] = yAxis.length;

                        if (sets.stack) {
                            series[c.index]['stack'] = axis_name;
                            series[c.index]['areaStyle'] = {normal: {}};
                        }
                    });

                    // добавляем новую ось
                    yAxis.push({
                        name: axis_name,
                        type: 'value',
                    });
                }
            }
        }
        // ------------------------------------------------------------------------------------------------------------------------------------
        if (!yAxis.length) {
            // default axis
            yAxis = [{
                name: lastColumn,
                type: 'value',
            }];
        }

        options.series = series;
        options.yAxis = yAxis;
        options.xAxis = xAxis;


        console.info('Make Chart Done : Options', options);

        return options;

    }
}
