/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar, SMI2 LLC and other contributors
 */

((angular, smi2) => {
    'use strict';

    angular.module(smi2.app.name).service('Variables', Variables);
    Variables.$inject = ['localStorageService'];

    /**
     * @ngdoc service
     * @name smi2.service:Variables
     * @description Variables manager
     */
    function Variables(localStorageService) {

        const typeIcons={
            date:'calendar',
            text:'message-text-outline',
            int:'numeric'
        };

        this.vars={

        };


        this.constructor = () =>
        {
            let ls=localStorageService.get('UserVariables');
            if (!_.isObject(ls)) ls={};

            for (let id in ls) {
                let item=ls[id];


                this.vars[id]={
                    id:id,
                    title:item.name,
                    value:item.value,
                    typeEdit:'text',
                    type:item.type,
                    icon:'numeric'
                };
            }
            console.log('UserVariables',this.vars);
        };

        this.constructor();

        this.drop = (id) => {
            delete this.vars[id];
        };
        this.update = (varid) =>
        {
            console.info("Update value",varid);
            this.apply();

        };
        this.getIcon = (type) =>
        {
            return typeIcons[type];
        };


        this.addVar = (type,name,val) => {

            let id=name;
            this.vars[id]={
                id:id,
                title:name,
                value:val,
                typeEdit:'text',
                type:type,
                icon:'numeric'

            };
            this.apply();
        };

        this.apply = () =>{
            let store={};
            _.forEach(this.vars,(item,key) => {
                let l= {
                    id: item.id,
                    name: item.name,
                    type:item.type,
                    value:item.value,

                };
                store[item.id]=l;
            });
            localStorageService.set('UserVariables', store);
        };


    }
})(angular, smi2);
