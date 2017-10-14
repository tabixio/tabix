/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DrawPlotly extends DrawBasicChart {

    constructor(Widget, drawType) {
        super(Widget);
        this.type = drawType.toUpperCase();
        this.library = 'plotly';
        this.chart=null;
        this.setWidgetSize(6,3);
    }

    onResize() {
        if (this.plotly)
        {
            let h=this.widget.getSizeElementHeight();
            let w=this.widget.getSizeElementWidth();
            if (this.layout.height!=h || this.layout.width!=w)
            {
                this.layout.height=h;
                this.layout.width=w;
                this.relayout();
            }
        }
    }


    preProcessor() {

        // <script src=""></script>
        if (this.initChartByJsCode()) {
        }
        else {

        }

        if (this.getError()) {
            console.error(this.getError());

            this.chart.before("<p>" + this.getError() + "</p>");

            return false;
        }


        if (this.isDark()) {
            // this.options.backgroundColor = '#404a59';
            // drw.color = ['#1a4882','#dd4444', '#fec42c', '#80F1BE'];
        }
        // log
        this.init = this.create();

        console.info('preProcessor', this.init);
    }


    getElement(){
        return this.widget.element[0];
    }
    relayout() {

        Plotly.relayout(this.getElement(),this.layout);
    }
    create() {
        let drw = this.getDrawCommandObject();

        console.warn("CREATE DrawPlotly",drw);

        let ll={
            data:[],
            layout:{}
        };
        if (_.isObject(drw))
        {

            if( _.isObject(drw.trace))  { ll.data.push(drw.trace);}
            if( _.isObject(drw.trace1)) { ll.data.push(drw.trace1);}
            if( _.isObject(drw.trace2)) { ll.data.push(drw.trace2);}
            if( _.isObject(drw.trace3)) { ll.data.push(drw.trace3);}
            if( _.isObject(drw.trace4)) { ll.data.push(drw.trace4);}
            if( _.isObject(drw.layout)) { ll.layout=drw.layout;}

        }
        console.info(ll);


        let xll=[
            {
                x:[1,2],
                y:[1,2],
                type:'bar'
            }
        ];
        console.log("CONS:",xll);
        console.log("llll:",ll);

        let settings={
            editable:false,
        };

        this.layout=ll.layout;

        let h=this.widget.getSizeElementHeight();
        let w=this.widget.getSizeElementWidth();
        this.layout.height=h;
        this.layout.width=w;


        this.plotly = Plotly.plot(this.getElement(),ll.data,this.layout,settings);
        return true;
    }

}
