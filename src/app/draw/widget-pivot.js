class WidgetPivot extends Widget {
    constructor(DataProvider, draw) {
        super(DataProvider, draw);

        this.type = "pivot";

        if (this.error || this.text) {
            return;
        }
        // this.height=1;
        // this.sizeX=6;
        // $.pivotUtilities.subtotal_renderers["Table With Subtotal"],
        this.init = true;
        this.renderers = $.extend(
                $.pivotUtilities.renderers,
                $.pivotUtilities.c3_renderers,
                $.pivotUtilities.d3_renderers,
                $.pivotUtilities.export_renderers
        );
        this.pivot = {
            config: {
                // cols:['sin'],
                // rows:['cos'],
                // dataClass: $.pivotUtilities.SubtotalPivotData,
                // renderers: $.pivotUtilities.d3_renderers,

                renderer: this.renderers
                // rendererOptions: {
                //     collapseRowsAt: 1,
                //     collapseColsAt: 0
                // }
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
