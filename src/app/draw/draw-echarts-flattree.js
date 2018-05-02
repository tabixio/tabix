/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */


'use strict';

class DrawEchartsFlatTree extends DrawEchartsTreemap {



    getSerieSettings()
    {
        return {
            symbolSize: 7,
            type:'tree',
            label: {
                normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',

                }
            },

            leaves: {
                label: {
                    color:(this.isDark()?'white':'auto'),
                    normal: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                }
            },

            expandAndCollapse: true,
        };
    }

}