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
        this.liburl='https://cdn.plot.ly/plotly-1.2.0.min.js';

        this.setWidgetSize(6,3);

    }

    onResize() {
        // отправденна комманда resize
        // if (this.chart && this.init) {
        //     this.chart.resize();
        // }
        if (this.plotly)
        {
            let h=this.widget.getSizeElementHeight();
            let w=this.widget.getSizeElementWidth();
            this.layout.height=h;
            this.layout.width=w;

            this.relayout();
        }
    }


    preProcessor() {
        // загрузка карты
        this.loadPlotlyLibJS(this);
    }

    afterLoadLibProcessor() {
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

    loadPlotlyLibJS(callback) {
        // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/load-docpage/

        if (window._sendPlotlyLoad) {
            // уже отправили запрос на загрузку карты
            // @todo : rewrite &&& тут нужно дождаться когда _isPlotlyLoaded=true

            this.afterLoadLibProcessor();

            //window.setTimeout(, 5000);

            return;
        }
        window._sendPlotlyLoad = true;
        window._isPlotlyLoaded = false;
        console.info("loadPlotlyLibJS....");
        let sc = document.createElement('script');
        sc.type = 'text/javascript';
        sc.async = true; // SYNCHRONOUSLY
        sc.src = this.liburl;
        sc.charset = 'utf-8';
        sc.onload = sc.onreadystatechange = function () {
            if (sc.readyState && sc.readyState !== "complete" &&
                sc.readyState !== "loaded") {
                return;
            }
            // если все загрузилось, то снимаем обработчик и выбрасываем callback
            sc.onload = sc.onreadystatechange = null;
            // ready & callback
            callback.afterLoadLibProcessor();
            window._isPlotlyLoaded = true;
        };
        let s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(sc, s);
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
