/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';
class DrawBasicChart {
    constructor(Widget) {
        this.widget = Widget;
        this.chart = false;// тут храниться обьект
        this.init = false;
        this.options={};
        this.widget.height=2;
        this.widget.width=2;

    }


    getDrawCodeObject() {
        let drawCommand=this.widget.drawCommnads;

        if (!drawCommand) {
            return [];
        }

        let codeDrawText=false;
        if (drawCommand && drawCommand.code ){
            codeDrawText=drawCommand.code;
        }
        if (!codeDrawText)
        {
            return [];
        }


        let result=[];

        try {
            let code='('+codeDrawText+')';

            console.warn("drawCommand:CODE:",code);
            let object=eval(code);
            console.warn("drawCommand:Result:",object);
            result.push(object);

            // // получаем настройки по осям
            // meta.forEach((i) => {
            //     // получаем ключь для каждой оси
            //     if (object[i.name])
            //     {
            //         chartSets[i.name]=object[i.name];
            //     }
            // });
        } catch (E) {
            console.error('error eval ',code);
        }
        return result;

    };
}



class DrawEcharts extends DrawBasicChart {
    constructor(Widget,drawType) {
        super(Widget);

        this.type=drawType.toUpperCase();
        this.library = 'echarts';
        this.options={
                version: 3,
                backgroundColor: '#404a59',
                title : {
                    text: 'EChart',
                    subtext: 'subtext',
                    left: 'center',
                    textStyle : {
                        color: '#fff'
                    }
                },
        };// opthios
    }


    preProcessor() {


        if (this.type=='SANKEYS') {
            this.init=this.createSANKEYS();
        }

        if (this.type=='TREEMAP') {
            this.init=this.createTREEMAP();
        }
        if (this.type=='HEATMAP') {
            this.init=this.createHEATMAP();
        }
        if (this.type=='SCATTERMAP') {
            this.init=this.createSCATTERMAP();
        }

        if (this.type=='MAP') {
            this.init=this.createMAP();
        }

        console.info('preProcessor',this.init,this.options);
    }


    onResize() {
        // отправденна комманда resize
        if (this.chart) {
            this.chart.setOption(this.options);
            this.chart.resize();
        }
    }

    createMAP() {

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


    createSANKEYS() {


        let drawCommand=[];
        if ('drawCommand' in query)
        {
            drawCommand=query.drawCommand;
        }
        let levels=[];
        drawCommand.forEach(i => {
            try {
                if (i && !i.code) return;
                let object=eval('('+i.code+')');
                console.warn(object);
                levels=object['levels'];

                // получаем настройки по осям
            } catch (E) {
                console.error('error eval ', i.code);
            }
        });


        // подготовка данных
        let nodes=[];
        let links=[];
        console.warn('levels',levels);
        levels.forEach(level=>{
            if (level.source && level.target && level.value) {

                data.forEach(row=>{
                    nodes[row[level.source]]=1;
                    nodes[row[level.target]]=1;

                    links.push({
                        source:row[level.source],
                        target:row[level.target],
                        value:row[level.value]
                    })

                });
            }
        });
        let result_nodes=[];
        for (let key in nodes) {
            result_nodes.push({name:key});
        }
        let option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'

            },
            series: [
                {
                    type: 'sankey',
                    layout:'none',
                    data: result_nodes,
                    links: links,
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            borderColor: '#aaa'
                        }
                    },
                    lineStyle: {
                        normal: {
                            curveness: 0.5
                        }
                    }
                }
            ]
        };



        this.options=Object.assign(option,this.options);
        return true;

    }


    createTREEMAP() {

        let o= {
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    type:'treemap',
                    visibleMin: 300,
                    label: {
                        show: true,
                        formatter: '{b}'
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#fff'
                        }
                    },
                    levels: getLevelOption(),
                    data: diskData
                }
            ]
        };


        this.options=Object.assign(o,this.options);
        return true;

    }
}


class DrawAMcharts extends DrawBasicChart{
    constructor(Widget) {
        console.warn("DrawAMcharts constructor");

        super(Widget)
        this.library='amchart';

        // _.set("CODE");

    }
    onResize () {
        this.makeLegend();
    }
    preProcessor () {

        if (this.createChart()) {
            this.init=true;
        }


        console.log("!preProcessor,done",this.init,this.options);



    }




    createChart() {


        let chartSets={};

        let meta=this.widget.data.meta;
        let drawCodeObject=[];
        try {
            drawCodeObject=this.getDrawCodeObject();
        }
        catch (E) {
            console.error('error eval ', E);
        }
        console.log('drawCodeObject',drawCodeObject);
        // ------------- Create Axes
        //
        //

        let dataDateFormat=false;
        let categoryField="";
        let minPeriod='mm';//minute
        let graphs=[];
        let counter=0;
        let axes=[];
        meta.forEach((i) => {

            if (i.type=='DateTime') {
                dataDateFormat="YYYY-MM-DD JJ:NN:SS";
                categoryField=i.name;
            }else {
                if (i.type=='Date') {
                    dataDateFormat="YYYY-MM-DD";
                    minPeriod='DD';
                    categoryField=i.name;
                }
                else {
                    if (!categoryField)
                    {
                        categoryField=i.name;
                        return;
                    }
                    counter=counter+1;
                    let g=this.getChartGraph(i,chartSets[i.name]);
                    g.id='g'+counter;


                    if (g.valueAxis!=='v1')
                    {
                        axes.push(g.valueAxis);
                    }
                    graphs.push(g);
                }
            }
        });

        let obl={

            theme: Widget.isDark ? 'dark' : 'light',
            color: Widget.isDark ? '#eee' : '#333',
            // marginRight: 50,
            // marginLeft: 50,
            // "handDrawn":true,
            // "autoMarginOffset": 50,
            // "autoResize":true,
            // "marginBottom": 30,
            // "marginsUpdated": true,
            // "marginTop": 10,
            // pathToImages: 'https://cdnjs.cloudflare.com/ajax/libs/amcharts/3.13.0/images/',
            // "handDrawn":true,
            // "autoMarginOffset": 50,
            // "autoResize":true,
            // "marginBottom": 30,
            // "marginsUpdated": true,
            // "marginTop": 10,


            "type": "serial",
            // "startDuration": 0.1,

            "categoryField": categoryField,

            "valueAxes": [ {
                "id": "v1",
                "axisAlpha": 1,
                // "stackType": "100%",// "stackType": "regular",
                "gridAlpha": 0.07,
                "axisColor": Widget.isDark ? '#eee' : '#333',
                "gridColor": Widget.isDark ? '#eee' : '#333',
                // "axisThickness": 2,
                // "position": "left",
                "ignoreAxisWidth": true
            } ],

            "balloon": {  "borderThickness": 1,  "shadowAlpha": 0
            },

            "graphs": graphs ,
            "chartCursor": {
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "cursorAlpha": 0,
                "zoomable": false,
                "valueZoomable": true,
                "valueLineAlpha": 0.5
            },

            // "valueScrollbar": {
            // "autoGridCount": true,
            // "color": "#000000",
            // "scrollbarHeight": 1
            // },

            "chartScrollbar": {
                "graph":"g1",
                "gridAlpha":0,
                "color":"#888888",
                "scrollbarHeight":25,
                "backgroundAlpha":0,
                "selectedBackgroundAlpha":0.1,
                "selectedBackgroundColor":"#888888",
                "graphFillAlpha":0,
                "autoGridCount":true,
                "selectedGraphFillAlpha":0,
                "graphLineAlpha":0.2,
                "graphLineColor":"#c2c2c2",
                "selectedGraphLineColor":"#888888",
                "selectedGraphLineAlpha":1
            },
            "categoryAxis": {
                "dashLength": 1,
                "minorGridEnabled": true,
                "axisColor": Widget.isDark  ? '#eee' : '#333',
                "gridColor": Widget.isDark  ? '#eee' : '#333'
            },
            "data": this.widget.data.data,

        };



        // dateforamt
        obl.categoryAxis.parseDates=false;

        if (dataDateFormat)
        {
            obl.dataDateFormat=dataDateFormat;
            obl.categoryAxis.parseDates=true;
            obl.categoryAxis.minPeriod=minPeriod;
        }

        if (axes)
        {
            let a_offset=0;
            axes.forEach((a) => {
                a_offset++;
                let ax=
                    {
                        "id": a,
                        "axisAlpha": 1,
                        "axisThickness": 1,
                        "position": "right",
                        "ignoreAxisWidth": true,
                        "offset": 1 * a_offset
                    };
                obl.valueAxes.push(ax);
            });
        }


        //
        this.options=obl;
        this.init=true;
        this.makeLegend();


        return true;



    };// create chart


    makeLegend(){


console.log("this.widget.sizeY",this.widget.sizeY);
        if (this.widget.sizeY<2) {
            delete this.options.legend;
        }
        else
        {
            this.options.legend= {
                "align": "center",
                "equalWidths": false,
                "periodValueText": "total: [[value.sum]]",
                "valueAlign": "left",
                "valueText": "[[value]] ([[percents]]%)",
                "valueWidth": 100
            };
        }
        console.warn(this.options);
    };


    getChartGraph (meta,chartSets){

        // SELECT number,sin(number),cos(number),number as `Title [asix=g2:column:blue]`  from system.numbers limit 40
        let showname=meta.name;
        let name=meta.name;
        let useaxis="v1";

        showname=showname.replace(/_axis\d+/gm,'');
        // showname=showname.replace(/_column\d+/gm,'');

        var re=/.*_axis(\d+).*/i;
        var axis = name.match(re);


        if (axis && axis[1])
        {
            useaxis='v'+axis[1];
        }
        let f= {
            "id": "g1",
            "valueAxis": useaxis,
            "fillAlphas": 0.2,
            "bullet": "round",
            "bulletSize": 8,
            "hideBulletsCount": 50,
            "lineThickness": 1,
            "title": showname,
            "useLineColorForBulletBorder": true,
            "valueField": name,
            "type": "smoothedLine",
            "balloonText": "[[title]] [[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>"
        };

        if (!chartSets) chartSets={};

        return Object.assign(f,chartSets);
    }; // getChartGraph



}

class DrawD3 extends DrawBasicChart {
    constructor(Widget) {

        super(Widget);
        this.library='d3';

    }
}

class DrawC3 extends DrawBasicChart{
    constructor(Widget) {

        super(Widget);

        this.library='c3';
    }

}