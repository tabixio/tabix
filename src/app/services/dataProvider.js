/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 */


'use strict';

class DataProvider {

    constructor(result,sourceType) {
        this.data=result.data;
        this.sourceType=sourceType;
        this.meta=result.meta;
        this.query=result.query;
        this.draw=result.query.drawCommands;
        this.rows=result.rows;
console.info("DP>",result);

        // this._query = query;
        // this._drawCommands = drawCommands;


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