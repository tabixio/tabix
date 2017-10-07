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


    }

    onResize() {
        // отправденна комманда resize
        // if (this.chart && this.init) {
        //     this.chart.resize();
        // }
    }


    preProcessor() {
        // загрузка карты
        this.loadPlotlyLibJS(this);
    }

    afterLoadLibProcessor() {
        // <script src=""></script>
        if (this.initChartByJsCode()) {
            this.init = true;
        }
        else {
            this.init = this.create();
        }

        if (this.getError()) {
            console.error(this.getError());

            this.chart.before("<p>" + this.getError() + "</p>");

            return false;
        }

        let drw = this.getDrawCommandObject();
        if (drw.raw) {
            this.options = _.merge(this.options, drw.raw);
        }


        if (this.isDark()) {
            // this.options.backgroundColor = '#404a59';
            // this.options.color = ['#1a4882','#dd4444', '#fec42c', '#80F1BE'];
        }
        // log
        console.info('preProcessor', this.init, this.options);
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
        console.info("YA_MAP>Start load map : api-maps.yandex.ru");
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

    
    create() {
        console.warn("CREATE DrawPlotly");
        this.plotly = Plotly.plot(this.widget.element[0],this.options);

    }

}