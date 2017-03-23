/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DrawEchartsRiver extends DrawEcharts {
    create() {

        if (this.initChartByJsCode()) {
            return true;
        }
        // Если это код не JS попробуем получить обьект
        let drw = this.getDrawCommandObject();

        let sets = {
            x: 'dt',
            y: 'views',
            name: 'name',
            title: 'title'
        };
        if (drw) {
            sets = Object.assign(sets, drw);
        }
        // ---------------------------------------------------------------------------
        let kv = {};
        let k1 = {};
        let k2 = {};

        let ddl = [];

        // собираем обьекты
        this.widget.data.data.forEach(function (item) {
            let val = parseInt(item[sets.y]);

            _.set(kv, item[sets.name] + '.' + item[sets.x], val);
            k1[item[sets.name]] = 1;
            k2[item[sets.x]] = 1;
        });
        //
        _.forEach(k1, (kk1, name) => {
            _.forEach(k2, (kk2, x) => {
                let value = _.get(kv, name + '.' + x, 0);
                ddl.push([x, value, name]);

            });
        });
        // ---------------------------------------------------------------------------
        let series = [
            {
                // name: sets.title,
                type: 'themeRiver',
                data: ddl,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.8)'
                    }
                },

                // showEffectOn: 'render',
                // rippleEffect: {
                //     brushType: 'stroke'
                // },

                // hoverAnimation: true,
            }
        ];

        // ---------------------------------------------------------------------------
        let o = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: 'rgba(0,0,0,0.2)',
                        width: 2,
                        type: 'solid'
                    }
                }
            },
            singleAxis: {
                // top: '8%',
                axisTick: {},
                axisLabel: {},
                type: 'time',
                position: 'top',
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        opacity: 0.2
                    }
                }
            },
            series: series
        };

        this.options = Object.assign(this.options, o);
        return true;
    }

}