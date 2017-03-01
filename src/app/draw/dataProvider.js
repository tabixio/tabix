/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 */


'use strict';

class DataProvider {

    /**
     *
     * @param result
     * @param sourceType
     */
    constructor(result,sourceType) {
        this.data=result.data;
        this.text=false;

        this.sort=false;
        this.sortOrder=false;
        // Если результат строка
        if (!result.error && !angular.isObject(result.data)) {
            if (!angular.isString(result.data)) {
                this.text = angular.toJson(result.data, true) ;
            }
            else {
                this.text =  result.data
            }
        }

        this.sourceType=sourceType;
        this.meta=result.meta;
        this.query=result.query;
        if (result.error)
        {
            this.error=result.error;
        }
        else
        {
            this.error=false;
        }
        this.draw=result.query.drawCommands;
        this.rows=result.rows;

        this.position = result.query.index;     // порядковый номер
        this.countAll = result.countAllQuery;   // всего запросов в выполнении

    }

    /**
     * Преобразование массива в обьект для конструктора  DataProvider
     *
     * @param data
     * @returns {DataProvider}
     */
    static convertArrayToDataProvider(data,sourceType) {

        let result={};
        result.data=data;
        result.meta=[];
        result.error=false;
        result.query={drawCommands:false};
        result.rows=data.length;
        result.position=0;
        result.countAll=0;
        Object.keys(data[0]).map(key => (
            result.meta.push({name:key,type:'string'})
        ));
        return new DataProvider(result,sourceType);



    }

    isText() {
        if (this.text){
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

    data() {
        return this.data;
    }
    meta() {
        return this.meta;
    }
    toString() {
        return '(' + this.name + ', ' + this.y + ')';
        /**
         *
         */
    }

}
angular.module(smi2.app.name).service('DataProvider', DataProvider);
// Widget.$inject = ['$http', '$q', 'localStorageService', '$sanitize', 'ThemeService'];