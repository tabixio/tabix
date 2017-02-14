/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 * GPLv3
 */

'use strict';

class WidgetPivot extends Widget
{
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.type="pivot";

        if (this.error || this.text) {
            return;
        }
        // this.height=1;
        // this.sizeX=6;
        this.init=true;
        this.pivot={
            config:{
                dataClass: $.pivotUtilities.SubtotalPivotData,
                renderer: $.extend($.pivotUtilities.renderers,$.pivotUtilities.subtotal_renderers["Table With Subtotal"], $.pivotUtilities.c3_renderers),
                rendererOptions: {
                    collapseRowsAt: 1,
                    collapseColsAt: 0
                }
            }
        };


        if (this.data.countAll==1) {
            // результат толкьо одна отпра
            this.sizeX=6;
            this.sizeY=3;

        }

    }
}

angular.module(smi2.app.name).service('WidgetPivot', WidgetPivot);