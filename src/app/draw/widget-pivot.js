/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

class WidgetPivot extends Widget {
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.type = "pivot";

        if (this.error || this.text) {
            return;
        }

        this.init = true;
        this.renderers = $.extend(
                $.pivotUtilities.renderers,
                $.pivotUtilities.c3_renderers,
                $.pivotUtilities.d3_renderers,
                $.pivotUtilities.export_renderers,
                $.pivotUtilities.subtotal_renderers
        );
        this.pivot = {
            config: {
                dataClass: $.pivotUtilities.SubtotalPivotData,
                // renderers: $.pivotUtilities.d3_renderers,

                renderer: this.renderers
            }
        };

        if (this.data.countAll == 1) {
            // результат толкьо одна отпра
            this.sizeX = 6;
            this.sizeY = 3;
        }
    }
}

angular.module(smi2.app.name).service('WidgetPivot', WidgetPivot);
