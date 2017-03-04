/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEchartsMap extends DrawEcharts
{
    create() {

        // массив состоящий
        let series=[
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',


                data: this.widget.data.data.map(function (itemOpt) {

                    return {
                        name: itemOpt.name_ru,
                        value: [
                            itemOpt.longitude,
                            itemOpt.latitude,
                            itemOpt.views_count
                        ],

                        // label: {
                        //     emphasis: {
                        //         position: 'right',
                        //         show: true
                        //     }
                        // },
                    };

                }),

                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                symbolSize: function (val) {
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


        let o={
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data:['data Top10', 'data Top10', 'data Top10'],
                textStyle: {
                    color: '#fff'
                },
                selectedMode: 'single'
            },
            //
            // visualMap: {
            //     min: 0,
            //     max: 1500,
            //     left: 'left',
            //     top: 'bottom',
            //     text: ['High','Low'],
            //     seriesIndex: [1],
            //     inRange: {
            //         color: ['#e0ffff', '#006edd']
            //     },
            //     calculable : true
            // },

            geo: {
                name: 'World Population (2010)',
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

        this.options=Object.assign(o,this.options);
        return true;
    }

}