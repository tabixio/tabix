/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Tabix LLC,Igor Strykhar and other contributors
 */

'use strict';

class DataProvider {

    /**
     *
     * @param result
     * @param sourceType
     */
    constructor(result, sourceType) {

        if (result.totals && result.data)
        {
            result.data.push(result.totals);
        }
        this._humanSortCols=[];
        this._sortBy=false;
        this._sortOrder=false;
        this.data = result.data;
        this.text = false;
        this.progressQuery = '';
        this.sort = false;
        this.sortOrder = false;
        // Если результат строка
        if (!result.error && !angular.isObject(result.data)) {
            if (!angular.isString(result.data)) {
                this.text = angular.toJson(result.data, true);
            }
            else {
                this.text = result.data
            }
            // XSS
            this.text=this.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        // --------------------------------------------------
        if (!sourceType) sourceType='ch';
        this.sourceType = sourceType;
        this.meta = result.meta;
        this.prepareInt64Cols={};

        // prepare (Int64+UInt64)
        if (this.data)
        {
            try {
                this.prepareInt64();
            } catch (e)
            {
                console.error("Error in prepareInt64",e);
            }

            if (_.isObject(this.meta))
            {
                this.meta.prepareInt64Cols=this.prepareInt64Cols;
            }

        }

        if (result.query) {
            this.query = result.query;
        }
        else {
            this.query = {index:0,drawCommands:false}
        }
        if (result.error) {
            // XSS
            this.error = result.error.replace('<br/>',"\n").replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            // console.log("Error Text",this.error);

            this.error = this.error.replace('\\'+'n','<br/>');
            // console.log("Error Text",this.error);

        }
        else {
            this.error = false;
        }
        this.draw = this.query.drawCommands;
        this.rows = result.rows;

        this.position = this.query.index;     // порядковый номер
        this.countAll = result.countAllQuery;   // всего запросов в выполнении

    }
    prepareInt64()
    {
        let $canConvert=[];

        if (!(_.isArray(this.data) && this.data.length>1)) return false;

        this.prepareInt64Cols={};
        this.meta.forEach((cell) => {
            if (cell.type.includes('Int64') && !cell.type.includes('Array(') ) {
                //  max value

                let $v=0;
                try {

                    $v=_.maxBy(this.data, function(o){
                        if (!_.isEmpty(o[cell.name]))
                            return parseInt(o[cell.name]);
                    } )[cell.name];

                } catch (e)
                {
                    console.error("prepareInt64,maxBy",e,'in cell',cell,'meta',this.meta);
                }


                let $max=parseInt($v);

                // 11117311154531369000

                if ($max<Number.MAX_SAFE_INTEGER) {
                    $canConvert.push(cell.name);
                    this.prepareInt64Cols[cell.name]=true;
                }
            }
        });

        if (!($canConvert.length>0)) return false;

        // console.log("$canConvert, convert to Int",$canConvert);

        this.data=_.map(this.data,function (o) {
            $canConvert.forEach((cell)=>{
                o[cell]=parseInt(o[cell]);
            });
            return o;
        });

    }
    isNormalInt64Col(coll)
    {
        return this.prepareInt64Cols[coll];
    }
    /**
     * Преобразование массива в обьект для конструктора  DataProvider
     *
     * @param data
     * @returns {DataProvider}
     */
    static convertArrayToDataProvider(data, sourceType) {

        let result = {};
        result.data = data;
        result.meta = [];
        result.error = false;
        result.query = {drawCommands: false};
        result.rows = data.length;
        result.position = 0;
        result.countAll = 0;
        Object.keys(data[0]).map(key => (
            result.meta.push({name: key, type: 'string'})
        ));
        return new DataProvider(result, sourceType);


    }

    isText() {
        if (this.text) {
            return true;
        }
        return false;

    }

    isError() {
        if (this.error) {
            return true;
        }
        return false;
    }

    getError() {
        return this.error;
    }
    update(data)
    {
        this.data=data;
    }

    data() {
        return this.data;
    }
    getData() {
        return this.data;
    }

    meta() {
        return this.meta;
    }

    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }
    getColumnsHumanSort()
    {
        return this._humanSortCols;
    }
    setColumnsHumanSort($cols)
    {
        this._humanSortCols=$cols;
    }
    setSort($coll,$order)
    {
        // column : Number - this index of column, by which you want to sorter the table.
        // sortOrder : Boolean - defines the order of sorting (true for ascending, false for descending).
        this._sortBy=$coll;
        this._sortOrder=$order;

        if (_.isNumber($order))
        {
            this._sortOrder=(parseInt($order)<0?false:true);
        }
    }
    sortByColl() {
        return this._sortBy;
    }

    sortOrderBy() {
        return this._sortOrder;
    }

}
angular.module(smi2.app.name).service('DataProvider', DataProvider);
// Widget.$inject = ['$http', '$q', 'localStorageService', '$sanitize', 'ThemeService'];
