/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEchartsTreemap extends DrawEcharts {


    getLevelOption() {
        return [
            {
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        gapWidth: 5
                    }
                }
            },
            {
                itemStyle: {
                    normal: {
                        gapWidth: 1
                    }
                }
            },
            {
                colorSaturation: [0.35, 0.5],
                itemStyle: {
                    normal: {
                        gapWidth: 1,
                        borderColorSaturation: 0.6
                    }
                }
            }
        ];
    };

    create() {


        // Если это код не JS попробуем получить обьект
        let drw=this.getDrawCommandObject();

        let sets={
            path        :'',
            value       :'value',
            source      :'source',
            target      :'target'
        };

        if (drw)
        {
            sets=Object.assign(sets,drw);
        }

        let treeData=[];


        let o= {
            tooltip: {
                trigger: 'item'
            }

        };

        o.series=[
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
                levels: this.getLevelOption(),
                data: treeData
            }
        ];

        this.options=Object.assign(o,this.options);
        return true;

    }
}