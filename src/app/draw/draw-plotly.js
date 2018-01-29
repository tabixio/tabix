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
        this._datajs=false;
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

        this.init = this.create();

        if (this.getError()) {
            console.error(this.getError());
            this.chart.before("<p>" + this.getError() + "</p>");
            this.init=false;
            return false;
        }
        console.info('preProcessor', this.init);
    }
    initDrawCodeObject()
    {
        return false;
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

    getDataForCodeJS() {
        // @todo : optimize

        if (this._datajs) return this._datajs;
        let data={};
        let columns=this.getColumns();
        let len = this.data().length;
        for (let index = 0; index < len; ++index) {
            let item=this.data()[index];
            for ( let colPos in columns) {
                let col = columns[colPos];

                if (!data[col]) data[col]=[];
                data[col].push(item[col]);
            }
        }
        this._datajs=data;
        return data;
    }
    applyCode() {


        try {

            let codeJS = this.getCode();

            console.info("applyCode",codeJS);

            let data = this.getDataForCodeJS();
            console.log('getDataForCodeJS',data);
            console.log('this.data()',this.data());
            codeJS = '(' + codeJS + ')';
            let obj = eval(codeJS);

            if (_.isObject(obj)) {
                this.applyObject(obj);
            }

        } catch (E) {
            console.log(E);

        }

    }
    applyLayout(layout)
    {
        console.info("<<<<<<< applyLayout >>>>>>>>>>",layout);
        this.layout=layout;
        let h=this.widget.getSizeElementHeight();
        let w=this.widget.getSizeElementWidth();
        this.layout.height=h;
        this.layout.width=w;
    }

    applyObject(drw) {

        let ll={
            data:[],
            layout:{}
        };

        if (_.isObject(drw))
        {

            if( _.isObject(drw.data))  { ll.data=drw.data;}
            if( _.isObject(drw.trace))  { ll.data.push(drw.trace);}
            if( _.isObject(drw.trace1)) { ll.data.push(drw.trace1);}
            if( _.isObject(drw.trace2)) { ll.data.push(drw.trace2);}
            if( _.isObject(drw.trace3)) { ll.data.push(drw.trace3);}
            if( _.isObject(drw.trace4)) { ll.data.push(drw.trace4);}
            if( _.isObject(drw.layout)) { ll.layout=drw.layout;}

        }
        console.info(ll);
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
        ll=Object.assign(ll,this.getDarkThemeSettings());

        this.applyLayout(ll.layout);

        console.warn('this.layout',this.layout);
        if (this.plotly)
        {
            console.info("UPDATE!");
            this.plotly=Plotly.newPlot(this.getElement(),ll.data,this.layout,settings);
        }
        else {
            //
            this.plotly=Plotly.newPlot(this.getElement(),ll.data,this.layout,settings);

        }

    }
    makeAutoDraw()
    {
        console.info("<<<<<<< makeAutoDraw >>>>>>>>>>");
        let sets = {
            autoAxis: false,
            markLine: true,
            stack: false,
            path: false,
            sort: true,
            xAxis: false,
            yAxis: false
        };

        let enableColumns = {};
        let columns = this.getColumns();
        let firstCol = this.getFirstColumn();
        let xAxisCol = firstCol;
        let dtCol = this.findDateTimeAxis();

        let $data = this.data();

        if (dtCol) {
            firstCol = dtCol;
        }

        // Если указана ось X
        if (false && sets.xAxis) {
            if (!this.haveColumn(sets.xAxis)) {
                throw "xAxis column not exists";
            }
            xAxisCol = sets.xAxis;
        }
        else {
            // Отсортируем данные
            if (sets.sort) {
                $data = _.sortBy($data, firstCol);
            }
            // Берем первую колонку
            xAxisCol = firstCol;

        }

        // ------------------------------------------------------------------------------------------------------------------------------------
        let cntStrAdd = 0;
        let path =[];
        let colValues = [];
        for (let colPos in columns) {
            // Идем по каждой колонке, если она не нужна для постореняи оси, или она числовая - доавляем ее в series
            let col = columns[colPos];

            let skip = false;

            if (_.size(enableColumns)) {
                skip = _.isUndefined(enableColumns[col]);
            }

            if (col != xAxisCol && !skip) {
                if (this.isStringColumn(col) && cntStrAdd < 2 && !groupPath) {
                    // Автопуть - автоматические создание групп если вторая и/или третья колонка строки
                    if (!_.isArray(path)) {
                        path = [];
                    }

                    path.push(col);
                    cntStrAdd++;
                }
                else {
                    if (this.isNumericColumn(col)) {
                        colValues.push(col);
                    }
                }
            }
        }
        // ------------------------------------------------------------------------------------------------------------------------------------

        // ------------------------------------------------------------------------------------------------------------------------------------
        let len = $data.length;
        let index=0;
        let xAxisData=[];
        let series = [];
        let $series = {};

        console.log("DATA LEN", len, $data);

        // выбираем только уникальные значения для оси }{
        for (index = 0; index < len; ++index) {
            let item = $data[index];
            xAxisData.push(item[xAxisCol]);
        }
        xAxisData = _.uniq(xAxisData);


        for (index = 0; index < len; ++index) {
            let item = $data[index];
            // xAxis[0].data.push(item[xAxis[0].name]);

            for (let colPos in columns) {
                // Идем по каждой колонке, если она не нужна для постореняи оси, или она числовая - доавляем ее в series
                let col = columns[colPos];
                let series_path = [xAxisCol];
                let skip = false;

                if (_.size(enableColumns)) {
                    skip = _.isUndefined(enableColumns[col]);
                }


                if (col !== xAxisCol && !skip && this.isNumericColumn(col) && _.findIndex(path, col) < 0) {
                    if (path) {

                        for (let pi = 0; pi < path.length; ++pi) {
                            let cc = path[pi];
                            series_path.push(item[cc]);
                        }
                    }
                    series_path.push(col);
                    series_path = series_path.join(':___:');

                    if (!$series[series_path]) {
                        $series[series_path] = new Map();

                        xAxisData.forEach(function (x) {
                            $series[series_path].set(x, null);
                        });

                    }
                    let __val = item[col];
                    if (this.isNumericColumn(col)) {
                        __val = parseFloat(__val);
                    }

                    // console.log('item[firstCol]=',item[firstCol],__val);
                    $series[series_path].set(item[xAxisCol], __val);
                }
            }// for columns
        } // for $data



        // ---------
        // ---------
        // ---------
        let plotlyDataObject=[];


        // ---------
        // ---------

        for (let seriaName in $series) {
            let yAxisIndex = 0;
            let showSeriaName = '';
            showSeriaName = seriaName.replace(/:___:/g, ':');
            // Fetch data from Map()
            let dataThisColumn = Array.from($series[seriaName].values());



            plotlyDataObject.push({
                x:xAxisData,
                y:dataThisColumn,
                type: 'scatter',
                line: {shape: 'spline'},
                name:showSeriaName,
                mode: "lines",
            });

        }
        console.warn('plotlyDataObject',plotlyDataObject);

        return {
            data:plotlyDataObject
        };

        }

    create() {
        if (this.getCode())
        {
            // draw_command have JS code
            this.applyCode();
        } else
        {
            // auto-create, is empty code
            // make auto draw
            this.applyObject(
                this.makeAutoDraw()
            );
        }


        return true;
    }

    getDarkThemeSettings()
    {
        if (!this.isDark()) return {};
        return {

            layout:{
                autosize:true,
                font:{'color':'eee'},//,'family':'Menlo'
                plot_bgcolor:'#303030',
                paper_bgcolor:'#303030',
                legend:{bgcolor:'#303030',"orientation": "h"},
            },
            colors:{
                increasing:'#00FF00',
                decreasing:'#FF9900',
                border_increasing:'rgba(255, 255, 255, 0.05)',
                border_decreasing:'rgba(255, 255, 255, 0.05)',
                primary :'#11AAEE',
                secondary : '#0084FF',
                tertiary : '#FC0D1B',
                quaternary : '#00FF00',
                grey:'rgba(255, 255, 255, 0.25)',
                grey_light:'rgba(255, 255, 255, 0.15)',
                grey_strong:'rgba(255, 255, 255, 0.40)',
                fill:'rgba(255, 255, 255, 0.10)',
                fill_light:'rgba(255, 255, 255, 0.05)',
                fill_strong:'rgba(255, 255, 255, 0.15)'
            },
            additions:{
                xaxis:{
                    color:'#333',
                        tickfont:'#CCC',
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
                }
            }
        };

        // https://github.com/plotly/dash-technical-charting/blob/master/quantmod/theming/themes.py
        // https://github.com/plotly/dash-technical-charting/blob/master/quantmod/theming/palettes.py

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
