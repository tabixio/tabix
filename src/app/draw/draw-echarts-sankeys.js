/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEchartsSunkeys extends DrawEcharts {

    create() {
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

}