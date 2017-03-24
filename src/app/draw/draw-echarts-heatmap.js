/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DrawEchartsHeatmap extends DrawEcharts {


    create(){

        let path=this.getParameterPath();

        if (!path) {
            this.setError("Not set path");
            return false;
        }
        let x={};
        let y={};

        let treeData={};

        // create tree
        this.data().forEach((row) => {

            _.set(x,row[path[0]],1);
            _.set(y,row[path[1]],1);
            _.set(
                    treeData,
                    row[path[0]]+'.'+row[path[1]],
                    parseFloat(row[path[2]])
            );
        });


        // нужно получить ключи
        let data=[];
        let dd_xAxis=_.keys(x);
        let dd_yAxis=_.keys(y);
        let min=0;
        let max=0;


        _.mapKeys(x, function(value, x_key) {
            _.mapKeys(y, function(value, y_key) {

                let val=_.get(treeData,x_key+'.'+y_key,'-');

                if (min>val) {
                    min=val;
                }
                if (max<val) {
                    max=val;
                }

                data.push(
                    [x_key,y_key,val]
                )
            });
        });

        // console.info(dd_xAxis);
        // console.info(dd_yAxis);
        // console.info(data);
        let o = {
            tooltip: {
                position: 'top'
            },
            animation: false,
            grid: {
                height: '50%',
                y: '10%'
            },
            xAxis: {
                type: 'category',
                data: dd_xAxis,
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                type: 'category',
                data: dd_yAxis,
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: min,
                max: max,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%'
            },
            series: [{
                name: 'Punch Card',
                type: 'heatmap',
                data: data,
                label: {
                    normal: {
                        show: true
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };


        this.options = Object.assign(o, this.options);
        return true;
    }
}