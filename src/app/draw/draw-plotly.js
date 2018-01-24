/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
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
    editor() {
        console.info("editoreditoreditor");
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
            // modeBarButtonsToAdd: [{
            //     name: 'custom button',
            //     icon: Plotly.Icons['coffee'],
            //     click: function() {
            //         this.editor()
            //     }
            // }]
        };

        this.layout=ll.layout;

        let h=this.widget.getSizeElementHeight();
        let w=this.widget.getSizeElementWidth();
        this.layout.height=h;
        this.layout.width=w;


        this.plotly = Plotly.plot(this.getElement(),ll.data,this.layout,settings);
        return true;
    }
    applyDarkTheme() {

    // # Dark Quantmod theme
    //         colors = dict(
    //             increasing = '#00FF00',
    //             decreasing = '#FF9900',
    //             border_increasing = DARK_PALETTE['grey95'],
    //             border_decreasing = DARK_PALETTE['grey95'],
    //             primary = '#11AAEE',
    //             secondary = '#0084FF',
    //             tertiary = '#FC0D1B',
    //             quaternary = '#00FF00',
    //             grey = DARK_PALETTE['grey75'],
    //             grey_light = DARK_PALETTE['grey85'],
    //             grey_strong = DARK_PALETTE['grey60'],
    //             fill = DARK_PALETTE['grey90'],
    //             fill_light = DARK_PALETTE['grey95'],
    //             fill_strong = DARK_PALETTE['grey85'],
    //         ),
    //
    //         traces = dict(
    //             line_thin = dict(width = 1,),
    //             line_thick = dict(width = 4,),
    //             line_dashed = dict(dash = 5,),
    //             line_dashed_thin = dict(dash = 5, width = 1,),
    //             line_dashed_thick = dict(dash = 5, width = 4,),
    //             area_dashed = dict(dash = 5,),
    //             area_dashed_thin = dict(dash = 5, width = 1,),
    //             area_dashed_thick = dict(dash = 5, width = 4,),
    //         ),
    //
    //         additions = dict(
    //             xaxis = dict(
    //                 color = '#999999',
    //                 tickfont = dict(color = '#CCCCCC',),
    //                 rangeslider = dict(
    //                     bordercolor = '#444444',
    //                     bgcolor = '#444444',
    //                     thickness = 0.1,
    //                 ),
    //                 rangeselector = dict(
    //                     bordercolor = '#444444',
    //                     bgcolor = '#444444',
    //                     activecolor = '#666666',
    //                 ),
    //             ),
    //             yaxis = dict(
    //                 color = '#999999',
    //                 tickfont = dict(color = '#CCCCCC',),
    //                 side = 'left',
    //             ),
    //         ),
    //
    //         layout = dict(
    //             font = dict(
    //                 family = 'droid sans mono',
    //                 size = 12,
    //                 color = '#CCCCCC',
    //             ),
    //             plot_bgcolor = '#252525',
    //             paper_bgcolor = '#202020',
    //             legend = dict(
    //                 bgcolor = DARK_PALETTE['transparent'],
    //             ),
    //         ),






        // select number as nu,
        // sin(number) as s,
        // cos(number) as c
        // from system.numbers limit 40
        // DRAW_PLOTLY {
        //     trace:{x:data.nu,y:data.s,type:'scatter',name:'sin()'},
        //     trace1:{x:data.nu,y:data.c,type:'scatter',name:'cos()'},
        //     additions:{
        //         xaxis:{color:'#333'}
        //     },
        //     layout:{
        //         font:{'color':'eee','family':'Menlo'},
        //         plot_bgcolor:'#333',
        //             paper_bgcolor:'#333',
        //             legend:{bgcolor:'#333'}
        //
        //     }
        // }
    }
}
