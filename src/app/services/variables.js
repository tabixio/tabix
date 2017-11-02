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
            int:'numeric',
            code:'cow'
        };

        this.vars={

        };

        this.getIcon = (type) =>
        {
            // console.info("TYPE",type,typeIcons[type]);
            return typeIcons[type];
        };


        this.constructor = () =>
        {
            let ls=localStorageService.get('UserVariables');
            if (!_.isObject(ls)) ls={};

            for (let id in ls) {
                let item=ls[id];


                this.vars[id]={
                    id:id,
                    name:item.name,
                    title:item.name,
                    value:item.value,
                    typeEdit:'text',
                    type:item.type,
                    icon:this.getIcon(item.type)
                };
            }
            // console.log('UserVariables',this.vars);
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
        this.getCompletions = () => {

            let result=[];
            for (let id in this.vars)
            {
                let c=this.vars[id];
                result.push('$'+c.name);
            }
            return result;

        };
        this.get = () =>
        {
          return this.vars;
        };


        this.addVar = (type,name,val) => {

            let id=name;
            this.vars[id]={
                id:id,
                name:name,
                title:name,
                value:val,
                typeEdit:'text',
                type:type,
                icon:this.getIcon(type)

            };
            this.apply();
        };

        this.apply = () =>{
            let store={};
            _.forEach(this.vars,(item,key) => {
                let l= {
                    id: item.id,
                    name: item.title,
                    type:item.type,
                    value:item.value,

                };
                store[item.id]=l;
            });
            localStorageService.set('UserVariables', store);
        };


    }
})(angular, smi2);
