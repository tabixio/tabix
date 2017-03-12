/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEchartsSunkeys extends DrawEcharts {

    create() {

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

        if (!this.haveColumn(sets['value'])) {
            this.setError("Not set column value");
            return false;
        }
        console.log("sets['path']:", sets['path']);
        if (sets['path']) {
            path = sets['path'];
        } else {
            if (!this.haveColumn(sets['source']) || !this.haveColumn(sets['target'])) {
                this.setError("Not set column path or source & target");
                return false;
            }
            path = sets['source'] + '.' + sets['target'];
        }

        let patharr = _.split(path, '.'); //  'a.b.c.d.e'=>[a,b,c,d,e]

        // a - node1
        // b - count 1-2
        // c - node2
        // d - count 2-3
        // e - node3


        if (!( patharr.length & 1)) {
            //
            this.setError("Path четно");
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


        console.log("PATH", path, "links", links, "nodes", nodes);


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


        this.options = Object.assign(option, this.options);
        return true;

    }

}