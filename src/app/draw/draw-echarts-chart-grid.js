/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
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

        let baseSet_xAxes=this.options.xAxis[0];
        let baseSet_yAxes=this.options.yAxis[0];
        let count_series=0;
        for ( let count in this.options.series) {
            let key=this.options.series[count].name;


            this.options.series[count].xAxisIndex=count;
            this.options.series[count].yAxesCount=yAxesCount;


            console.log(key,this.options.series[count]);
            baseSet_xAxes.gridIndex=count;
            baseSet_yAxes.gridIndex=count;

            grids.push({ show: true, borderWidth: 0, shadowBlur: 2 });

            xAx.push(baseSet_xAxes);
            yAx.push(baseSet_yAxes);


            titles.push({
                textAlign: 'center',
                text: key,
                textStyle: {
                    fontSize: 11,
                    fontWeight: 'normal'
                }
            });
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

        this.options.titles=titles;
        this.options.grid=grids;
        this.options.xAxis=xAx;
        this.options.yAxis=yAx;


    }
}