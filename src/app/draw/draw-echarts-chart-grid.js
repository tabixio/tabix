/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class DrawEchartsGridChart extends DrawEchartsChart {



    create() {


        // Если это код не JS попробуем получить обьект
        let drw = this.getDrawCommandObject();

        let sets = {
            path: '',
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



        // --------------------------------------------------------------------------------
        o.series = [
            {
                type: 'treemap',
                name: 'treemap',
                // visibleMin: 300,
                label: {
                    show: true,
                    formatter: '{b}'
                },

                tooltip: {
                    formatter: function (info) {
                        var value = info.value;
                        var treePath = [];
                        var treePathInfo = info.treePathInfo;

                        for (var i = 1; i < treePathInfo.length; i++) {
                            treePath.push(treePathInfo[i].name);
                        }

                        return [
                            '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
                            'Disk Usage: ' + formatUtil.addCommas(value) + ' KB',
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