/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DataProvider {

    /**
     *
     * @param result
     * @param sourceType
     */
    constructor(result, sourceType) {
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
        if (!sourceType) sourceType='ch';
        this.sourceType = sourceType;
        this.meta = result.meta;

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
