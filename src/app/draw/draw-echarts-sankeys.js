/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DrawEchartsSunkeys extends DrawEcharts {

    create() {

        this.helpLink = 'https://tabix.io/doc/draw/Draw_Sankeys/';
        this.help = "Default config : {path:''} or {value:'',source:'',target:''}, if empty path or not set, try auto create path, then find columns [String] : [Integer|Float] : [String] ";
        // Если это код не JS попробуем получить обьект
        let drw = this.getDrawCommandObject();

        let sets = {
            path: '',
            value: 'value',
            source: 'source',
            target: 'target'
        };

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

        // установлен path ,
        //        Format :  [ _source_ . _count_ . _target_ . _count2_ . _target2_
        //         DRAWSANKEY
        //         {
        //             "region.count_in_city.city.count_in_street.street"
        //         }
        //         DRAWSANKEY
        //         {
        //             path : "region.count_in_city.city.count_in_street.street",
        //         }
        //
        //          DRAWSANKEY  "region.count_in_city.city.count_in_street.street"

        this.data().forEach((row) => {

            for (let i = 0; i < patharr.length; i = i + 2) {
                let l_source = patharr[i];
                let l_value = patharr[i + 1];
                let l_target = patharr[i + 2];
                if (_.isUndefined(l_value) || _.isUndefined(l_target)) break;
                nodes[row[l_source]] = 1;
                nodes[row[l_target]] = 1;
                links.push({
                    source: row[l_source],
                    target: row[l_target],
                    value: row[l_value]
                })
            }
        });



        let result_nodes = [];
        for (let key in nodes) {
            result_nodes.push({name: key});
        }
        let option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'

            },
            series: [
                {
                    type: 'sankey',
                    // layout:'none',
                    data: result_nodes,
                    animationThreshold:300,
                    animationDuration:300,
                    links: links,

                    itemStyle: {
                        normal: {

                            borderWidth: 1,
                            borderColor: '#aaa'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'source',
                            curveness: 0.5
                        }
                    }
                }
            ]
        };


        if (this.isDark()) {
            _.set(option.series[0],'label.normal.textStyle.color','white');
        }

        this.options = Object.assign(option, this.options);

        console.log(option);

        return true;

    }

}