/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEchartsTreemap extends DrawEcharts {



    create() {

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