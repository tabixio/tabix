/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar/SMI2 LLC and other contributors
 */

((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).service('Snippets', Snippets);
    Snippets.$inject = ['localStorageService'];

    /**
     * @ngdoc service
     * @name smi2.service:Snippets
     * @description Snippets manager
     */
    function Snippets(localStorageService) {

        this.snippets={

        };


        this.constructor = () =>
        {
            let ls=localStorageService.get('UserSnippets');
            if (!_.isObject(ls)) ls={};

            for (let id in ls) {
                let item=ls[id];


                this.snippets[id]={
                    id:id,
                    code:item.code,
                    dt:item.dt
                };
            }
            console.log('UserSnippets',this.snippets);
        };

        this.constructor();


        this.getCompletions = () => {

            let result=[];
            for (let id in this.snippets)
            {
                let s=this.snippets[id];
                result.push(s.code);
            }
            return result;
        };
        this.getSnippets = () => {
            return this.snippets;
        };
        this.drop = (id) => {
            delete this.snippets[id];
        };
        this.update = (varid) =>
        {
            console.info("Update value",varid);
            this.apply();

        };

        this.hashCode = function(s){
            return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        };
        this.add = (sql) => {

            sql=sql.trim();
            let id="SQL_"+Math.abs(this.hashCode(sql));

            console.log("UserSnippets",sql,id);
            this.snippets[id]={
                id:id,
                code:sql,
                dt:Date.now()
            };
            this.apply();
        };

        this.apply = () =>{
            let store={};
            _.forEach(this.snippets,(item,key) => {
                let l= {
                    id: item.id,
                    code: item.code,
                    dt: item.dt
                };
                store[item.id]=l;
            });
            localStorageService.set('UserSnippets', store);
        };


    }
})(angular, smi2);
