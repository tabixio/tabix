/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DrawEchartsGridChart extends DrawEchartsChart {

    preCreate(drw) {
        this.preference.gridchart=true;
        return {
        };
    }

    postCreate(drw) {
        // applyGrid
        let grids=[];
        let yAx=[];
        let xAx=[];
        let titles=[];
        // Идем в цикле по каждой Series и проставляем им
        let yAxesCount=0;
        console.info("postCreate!!!!!!",this.options);
        let dataZoomxAxisIndex=[];
        let baseSet_xAxes=this.options.xAxis[0];
        let baseSet_yAxes=this.options.yAxis[0];
        let count_series=0;
        for ( let count in this.options.series) {
            count=parseInt(count);
            let key=this.options.series[count].name;


            this.options.series[count].xAxisIndex=count;
            this.options.series[count].yAxisIndex=yAxesCount;


            console.log(key,this.options.series[count]);

            baseSet_xAxes.show=false;
            baseSet_xAxes.gridIndex=count;
            baseSet_yAxes.gridIndex=count;
            baseSet_yAxes.show=false;
            baseSet_yAxes.name=key;

            grids.push({ show: true, borderWidth: 0, shadowBlur: 2 });

            xAx.push(_.clone(baseSet_xAxes));
            yAx.push(_.clone(baseSet_yAxes));


            titles.push({
                textAlign: 'center',
                text: key,
                textStyle: {
                    fontSize: 11,
                    fontWeight: 'normal'
                }
            });
            dataZoomxAxisIndex.push(count);
            yAxesCount=yAxesCount+1;
        }


        let rowNumber = Math.ceil(Math.sqrt(yAxesCount));
        grids.forEach((grid,idx)=> {
            grid.left = ((idx % rowNumber) / rowNumber * 100 + 0.5) + '%';
            grid.top = (Math.floor(idx / rowNumber) / rowNumber * 100 + 0.5) + '%';
            grid.width = (1 / rowNumber * 100 - 1) + '%';
            grid.height = (1 / rowNumber * 100 - 1) + '%';

            titles[idx].left = parseFloat(grid.left) + parseFloat(grid.width) / 2 + '%';
            titles[idx].top = parseFloat(grid.top) + '%';
        });

        if (this.options.dataZoom && this.options.dataZoom[0]) {
            this.options.dataZoom[0].xAxisIndex=dataZoomxAxisIndex;
        }
        this.options.titles=titles;
        this.options.grid=grids;
        this.options.xAxis=xAx;
        this.options.yAxis=yAx;


    }
}