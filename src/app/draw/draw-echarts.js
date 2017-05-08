/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DrawEcharts extends DrawBasicChart {
    constructor(Widget, drawType) {
        super(Widget);

        this.help = "";
        this.type = drawType.toUpperCase();
        this.library = 'echarts';

        this.preference={
            gridchart:false,
            bar:false
        };

        // базовые опиции
        this.options = {
            version: 3,
            textStyle:{fontFamily:'Menlo'},
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none',title:'data Zoom'
                    },
                    dataView: {readOnly: false,title:'data View'},
                    magicType: {type: ['line', 'bar', 'stack', 'tiled'],

                        title: {
                            line: 'line',
                            bar: 'bar',
                            stack: 'stack',
                            tiled: 'tiled'
                        },
                    },
                    restore: {title:'Restore'},
                    saveAsImage: {title:'Save as Image'}
                }
            },
            // backgroundColor: '#404a59',
            // title : {
            // text: 'EChart',
            // subtext: 'subtext',
            // left: 'center',
            // textStyle : {
            //     color: '#fff'
            // }
            // },
        };// opthios


    }

    onResize() {
        // отправденна комманда resize
        if (this.chart && this.init) {
            this.chart.setOption(this.options);
            this.chart.resize();
        }
    }


    preProcessor() {

        // init chart & call before render


        if (this.initChartByJsCode()) {
            this.init = true;
        }
        else {

            try {
                this.init = this.create();
            }
            catch (e) {
                this.setError(this.getError() + "\n\n\n" + e.name + ":" + e.message + "\n" + e.stack);
            }

        }

        if (this.getError()) {
            console.error(this.getError());
            return false;
        }

        let drw = this.getDrawCommandObject();
        if (drw.raw) {
            this.options = _.merge(this.options, drw.raw);
        }


        if (this.isDark()) {
            this.options.backgroundColor = '#404a59';
            // this.options.color = ['#1a4882','#dd4444', '#fec42c', '#80F1BE'];
        }
        // log
        console.info('preProcessor', this.init, this.options);
    }


    getParameterPath()
    {
        let drw = this.getDrawCommandObject();

        let sets = {
            path: '',
        };
        if (drw) {
            sets = Object.assign(sets, drw);
        }
        // -----------------------------------
        let path = '';

        if (_.isString(drw)) {
            // если короткий вариант это строка с путем
            path=drw;
        }
        else {
            // ишем path
            if (sets['path']) {
                path = sets['path'];
            }
        }
        // -----------------------------------
        if (!path) return false;
        // -----------------------------------
        let patharr = _.split(path, '.'); //  'a.b.c.d.e'=>[a,b,c,d,e]


        // проверка что колонки установленны
        for (let i = 0; i < patharr.length;i++)
        {
            if (!this.haveColumn(patharr[i])) {
                this.setError("Not set column in path :"+patharr[i]);
                return false;
            }
        }

        return patharr;
    }

    applyDataZoom()
    {
        this.options.dataZoom=[{ type: 'inside', show: true,  realtime: true},
            {
                show: true,
                realtime: true,

            // handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            // handleSize: '80%',
            // handleStyle: {
            //     color: '#fff',
            //     shadowBlur: 3,
            //     shadowColor: 'rgba(0, 0, 0, 0.6)',
            //     shadowOffsetX: 2,
            //     shadowOffsetY: 2 }
            }
        ];
    }

    applyLegend() {
        // достаем из series все Name для создания legend.data[]
        this.options.legend={

            data:_.map(this.options.series,'name'),
            x: 'left'
        };
    }
    applyTitle(text) {
        this.options.title={
            orient:'vertical',
            padding: 25,
            left: 'center',
            text:text
        };

    }
    applyGrid() {
        let $grid=[];

        this.options.grid=$grid;
        //foreach(xAxis)  {gridIndex: 0, min: 0, max: 20},
        //foreach(yAxis)  {gridIndex: 0, min: 0, max: 15},

    }

}

