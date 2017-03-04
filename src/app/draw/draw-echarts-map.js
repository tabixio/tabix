/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEchartsMap extends DrawEcharts
{
    create() {

        if (this.initChartByJsCode()) {
            return true;
        }
        // Если это код не JS попробуем получить обьект
        let drw=this.getDrawCommandObject();

        let sets={
            longitude:'longitude',
            latitude :'latitude',
            count    :'count',
            name     :'name',
            title    :'Map'
        };

        let max_value=0;
        if (drw)
        {
            sets=Object.assign(sets,drw);
        }

        // массив состоящий
        let series=[
            {
                name: sets.title,
                type: 'effectScatter',
                coordinateSystem: 'geo',

                data: this.widget.data.data.map(function (itemOpt) {
                    let v=parseInt(itemOpt[sets.count]);
                    if (max_value<v) max_value=v;

                    return {
                        name: itemOpt[sets.name],
                        value: [
                            itemOpt[sets.longitude],
                            itemOpt[sets.latitude],
                            v
                        ],
                        label: {
                            emphasis: {
                                position: 'right',
                                show: true
                            }
                        },
                    };
                }),

                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                symbolSize: function (val) {
                    if (max_value) {
                        return (val[2] / max_value)*15;
                    }
                    return val[2] / 10000;
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1

            }
        ];

        console.log("MAX:VALIE:",max_value);

        let o={
            tooltip : {
                trigger: 'item'
            },
            // legend: {
            //     orient: 'vertical',
            //     top: 'bottom',
            //     left: 'right',
            //     data:['data Top10', 'data Top10', 'data Top10'],
            //     textStyle: {
            //         color: '#fff'
            //     },
            //     selectedMode: 'single'
            // },

            geo: {
                name:  sets.title,
                type: 'map',
                map: 'world',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                visualMap: {
                    show: true,
                    min: 0,
                    max: 100,// max,
                    inRange: {
                        symbolSize: [6, 60]
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: series
        };

        this.options=Object.assign(this.options,o);
        if (sets.raw)
        {
            this.options=Object.assign(this.options,sets.raw);
        }
        return true;
    }

}