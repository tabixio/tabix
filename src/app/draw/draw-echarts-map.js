/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DrawEchartsMap extends DrawEcharts {


    loadWorldMapJS() {

        if (window.loadWorldMapJSEcharts) return false;
        let sc = document.createElement('script');
        sc.type = 'text/javascript';
        sc.async = false; // SYNCHRONOUSLY
        sc.src = 'http://loader.tabix.io/extend/echarts_world_map.js';
        sc.charset = 'utf-8';
        let s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(sc, s);

        window.loadWorldMapJSEcharts=true;
    }

    create() {
        this.loadWorldMapJS();

        // Если это код не JS попробуем получить обьект
        let drw = this.getDrawCommandObject();

        let sets = {
            longitude: 'longitude',
            latitude: 'latitude',
            count: 'count',
            name: 'name',
            title: 'Map',
            destination: {
                longitude: 'destination_longitude',
                latitude: 'destination_latitude',
                speed: 'destination_speed',
                name: 'destination_name',
                count: 'destination_count'
            }
        };

        let max_value = 0;
        if (drw) {
            sets = Object.assign(sets, drw);
        }
        // ---------------------------------------------------------------------------
        let seriesScatter = [];
        let flySeries = [];

        this.data().forEach(function (itemOpt, i) {

            let v = parseInt(itemOpt[sets.count]);
            if (max_value < v) max_value = v;


            if (itemOpt[sets.destination.longitude] && itemOpt[sets.destination.latitude]) {
                let toName = '';
                if (itemOpt[sets.destination.name]) {
                    toName = itemOpt[sets.destination.name];
                }
                flySeries.push({
                    fromName: itemOpt[sets.name],
                    toName: toName,
                    coords: [
                        [
                            itemOpt[sets.longitude],
                            itemOpt[sets.latitude],
                        ],
                        [
                            itemOpt[sets.destination.longitude],
                            itemOpt[sets.destination.latitude]
                        ]]
                });
            }


            seriesScatter.push(
                {
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
                }
            );
        });

        // ---------------------------------------------------------------------------
        let series = [
            {
                name: sets.title,
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: seriesScatter,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },

                symbolSize: function (val) {
                    if (max_value) {
                        return (val[2] / max_value) * 15;
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
        // ---------------------------------------------------------------------------
        // Fly

        // ---------------------------------------------------------------------------
        if (flySeries.length > 0) {

            let planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

            series.push(
                {
                    name: sets.title,
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: '#fff',
                        symbolSize: 3
                    },
                    lineStyle: {
                        normal: {
                            // color: color[i],
                            width: 0,
                            curveness: 0.2
                        }
                    },
                    data: flySeries
                }
            );
            //
            series.push(
                {
                    name: sets.title,
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'arrow'],
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: planePath,
                        symbolSize: 15
                    },
                    lineStyle: {
                        normal: {
                            // color: color[i],
                            width: 1,
                            opacity: 0.6,
                            curveness: 0.2
                        }
                    },
                    data: flySeries
                }
            );//push
        }
        ;//if
        // ---------------------------------------------------------------------------
        let o = {
            tooltip: {
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
                name: sets.title,
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

        this.options = Object.assign(this.options, o);
        return true;
    }

}