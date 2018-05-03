/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */

'use strict';

class DrawEchartsGraph extends DrawEcharts {

    create() {

        this.helpLink = 'https://tabix.io/doc/draw/Draw_Graph/';
        this.help = "Default config : {path:''} or {value:'',source:'',target:''}, if empty path or not set, try auto create path, then find columns [String] : [Integer|Float] : [String] ";
        // Если это код не JS попробуем получить обьект
        let drw = this.getDrawCommandObject();

        let sets = {
            path: '',//categories.name.value.
            categories: 'categories',
            name: 'name',
            value: 'value',
            target:'target',
            targetValue:'',
            sourceValue:'',
            layout:'',
            edgeSymbol:''
            // target+source
        };

        // layout : circular or force

        if (drw) {
            sets = Object.assign(sets, drw);
        }
        // ---------------------------------------------------------------------------
        let path = '';

        // console.log("sets['path']:", sets['path']);



        if (_.isString(drw)) {
            // если короткий вариант это строка с путем
            path=drw;
        }
        else {
            // ишем path
            if (sets['path']) {
                path = sets['path'];
            } else {
                // ищем source+target
                if (this.haveColumn(sets['source']) && this.haveColumn(sets['value']) && this.haveColumn(sets['target'])) {
                    path = sets['source'] + '.' + sets['value'] + '.' + sets['target'];
                }

            }

        }
        let patharr = [];

        let _isTargetValue = this.haveColumn(sets['targetValue']);
        let _isSourceValue = this.haveColumn(sets['sourceValue']);
        let _isCategories = this.haveColumn(sets['categories']);

        if (!path) {

            let setstr = false;
            let columns = this.getColumns();
            for (let colPos in columns) {
                // Идем по каждой колонке, если она не нужна для постореняи оси, или она числовая - доавляем ее в series
                let col = columns[colPos];
                if (this.isNumericColumn(col) && setstr) {
                    patharr.push(col);
                    setstr = false;
                }
                if (this.isStringColumn(col) && !setstr) {
                    patharr.push(col);
                    setstr = true;
                }
            }
        }
        else {
            patharr = _.split(path, '.'); //  'a.b.c.d.e'=>[a,b,c,d,e]
        }






        // a - node1
        // b - count 1-2
        // c - node2
        // d - count 2-3
        // e - node3
        //
        console.log("patharr>", patharr);

        if (!patharr.length) {
            this.setError("The value of the variable 'path' - empty");
            return false;
        }

        if (!( patharr.length & 1)) {
            this.setError("The value of the variable 'path' must be odd");
            return false;
        }
        let links = [];
        let nodes = [];




        this.data().forEach((row) => {

            for (let i = 0; i < patharr.length; i = i + 2) {
                let l_source = patharr[i];
                let l_value = patharr[i + 1];
                let l_target = patharr[i + 2];
                if ( _.isUndefined(l_target)) break;



                if (_isSourceValue){
                    let $size = row[sets['sourceValue']] / 1.5;
                    nodes[row[l_source]] = {
                        symbolSize: $size,
                        label : {
                            normal: {
                                show: $size > 10
                            }
                        }
                    };
                } else {

                    nodes[row[l_source]] = {
                        symbolSize: 1
                    };
                }

                if (_isTargetValue)
                {
                    let $size = row[sets['targetValue']] / 1.5;
                    nodes[row[l_target]] = {
                        symbolSize: $size,
                        label : {
                            normal: {
                                show: $size > 10
                            }
                        }
                    };

                }
                else
                {
                    nodes[row[l_target]] = {
                        symbolSize: 1
                    };

                }


                links.push({
                    source: row[l_source],
                    target: row[l_target],
                    value: row[l_value],

                });
            }
        });



        let result_nodes = [];
        for (let key in nodes) {
            result_nodes.push(_.merge({name: key},nodes[key]));
        }

        console.log("result_nodes",result_nodes);

        let option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'

            },
            series: [
                {
                    type: 'graph',
                    layout: 'circular',
                    data: result_nodes,
                    circular: {
                        rotateLabel: true
                    },
                    // categories: categories,
                    animationThreshold:300,
                    animationDuration:300,
                    links: links,

                    itemStyle: {
                        normal: {

                            borderWidth: 1,
                            borderColor: '#aaa'
                        }
                    },
                    roam: true,
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                }
            ]
        };


        option = Object.assign(option, this.options);



        this.options=option;
        return true;

    }

}