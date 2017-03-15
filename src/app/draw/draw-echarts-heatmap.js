
'use strict';

class DrawEchartsHeatmap extends DrawEcharts {


    create(){

        let path=this.getParameterPath();
        console.info("Path:",path);
        if (!path) {
            this.setError("Not set path");
            return false;
        }

        let dd_xAxis={};
        let dd_yAxis={};
        let dd={};

        this.data().forEach((row) => {
            dd_xAxis[row[path[0]]]=1;
            dd_yAxis[row[path[1]]]=1;
            if (!dd[row[path[0]]]) {
                dd[row[path[0]]]={};
            }
            dd[row[path[0]]][row[path[1]]]=row[path[3]];

            //
            // for (let i = 0; i < len-1; i = i + 1) {
            //     p.push(row[patharr[i]]);
            //     let sum=_.get(sumTree,p.join('_'),0);
            //     _.set(sumTree,p.join('.')+'.__value',sum+value);
            // }
            // _.set(treeData,p.join('.'),value);
        });


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
                min: 0,
                max: 10,
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