/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 */


'use strict';

class DataProvider {

    constructor(result,sourceType) {
        this.data=result.data;
        this.text=false;


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
        this.error=result.error;
        this.draw=result.query.drawCommands;
        this.rows=result.rows;
// console.info("DP>",result);

        // this._query = query;
        // this._drawCommands = drawCommands;


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
    }

}
angular.module(smi2.app.name).service('DataProvider', DataProvider);
// Widget.$inject = ['$http', '$q', 'localStorageService', '$sanitize', 'ThemeService'];