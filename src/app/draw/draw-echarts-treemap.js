/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
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

    buildTreeData(treeData,sumTree) {
        let out = [];
        let self=this;
        _.forEach(treeData,function(node,key) {
            let sumNode=sumTree[key];
            let x={};
            x.value=sumNode.__value;
            if (_.isObject(node))
            {
                // console.log('! forEach',node,key);
                let children=self.buildTreeData(node,sumNode);

                if (_.isArray(children) && children.length){
                    x.children=children;
                }
            }

            x.name=key;
            out.push(x);

        });
        return out;
    };


    create() {


        // Если это код не JS попробуем получить обьект
        let drw = this.getDrawCommandObject();

        let sets = {
            path: '',
            title:'TreeMap',
            tooltip:'Usage',
            valueformat:false
        };

        if (drw) {
            sets = Object.assign(sets, drw);
        }

        let path = '';
        if (sets['path']) {
            path = sets['path'];
        }
        // если короткий вариант это строка с путем
        if (_.isString(drw)) {
            path=drw;
        }

        let patharr = _.split(path, '.'); //  'a.b.c.d.e'=>[a,b,c,d,e]
        let len=patharr.length;

        if (!len) {
            this.setError("Not set path");
            return false;
        }
        // last column must be integer/float
        for (let i = 0; i < len; i = i + 1) {
            if (!this.haveColumn(patharr[i])) {
                this.setError("bad path, no column:" + patharr[i]);
                return false;
            }
        }
        if (!this.isNumericColumn(patharr[len - 1])) {
            this.setError("bad column:" + patharr[len - 1] + ' must be number');
            return false;
        }
        // ------------------------------------------------------------------------------
        // data: [
        //     {
        //         name: 'nodeA',
        //         children: [
        //             {name: 'nodeAA'},
        //             {name: 'nodeAB'},
        //         ]
        //     },
        //     {
        //         name: 'nodeB',
        //         children: [
        //             {name: 'nodeBA'}
        //         ]
        //     }
        // ],
        // ------------------------------------------------------------------------------
        let sumTree = {};
        let treeData = {};
        this.data().forEach((row) => {

            let value=row[patharr[len-1]];
            let p=[];
            for (let i = 0; i < len-1; i = i + 1) {
                p.push(row[patharr[i]]);
                let sum=_.get(sumTree,p.join('_'),0);
                _.set(sumTree,p.join('.')+'.__value',parseFloat(sum)+parseFloat(value));
            }
            _.set(treeData,p.join('.'),value);
        });
        // console.log("treeData",treeData);
        // console.log("sumTree",sumTree);

        let bTree=this.buildTreeData(treeData,sumTree);
        // ------------------------------------------------------------------------------

        let o = {
            tooltip: {
                trigger: 'item'
            }

        };

        let  formatUtil = echarts.format;

        o.series = [
            {
                type: 'treemap',
                name: sets['title'],
                // visibleMin: 300,
                label: {
                    show: true,
                    formatter: '{b}'
                },

                tooltip: {
                    formatter: function (info) {
                        let value = info.value;
                        let treePath = [];
                        let treePathInfo = info.treePathInfo;
                        for (let i = 1; i < treePathInfo.length; i++) {
                            treePath.push(treePathInfo[i].name);
                        }

                        let valueformat=sets['valueformat'];

                        if (!valueformat) valueformat='0,0.0';
                        //value


                        return [
                            '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('.')) + '</div>',
                            sets['tooltip']+' : ' + numbro(value).format(valueformat),
                        ].join('');
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff'
                    }
                },
                levels: this.getLevelOption(),
                data: bTree
            }
        ];

        this.options = Object.assign(o, this.options);
        return true;

    }
}