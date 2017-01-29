/*
 * Copyright (C) 2017 IgorStrykhar  in  SMI2
 * All rights reserved.
 */


'use strict';

class DataProvider {

    constructor(result,privider) {
        console.warn('DataProvider',result,privider);
        // this._data = data;
        // this._query = query;
        // this._drawCommands = drawCommands;


    }


    data() {
        console.log(this.data);
        return this._data.data;
    }
    meta() {
        return this._data.meta;
    }
    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }

}
angular.module(smi2.app.name).service('DataProvider', DataProvider);
// Widget.$inject = ['$http', '$q', 'localStorageService', '$sanitize', 'ThemeService'];