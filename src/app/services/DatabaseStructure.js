
'use strict';

class DatabaseStructure {

    constructor() {
        this._init=false;
        this.uciq_fields=[];
        this.all_fields=[];
        this.all_db_fields=[];
        this.uciq_dbtables=[];

    }

    init(columns,tables,databases,dictionaries,functions) {

        console.log("Try init DS....");
        if (this._init) return;

        this.columns=columns;
        this.tables=tables;
        this.databases=databases;
        this.functions=functions;
        this.dictionaries=dictionaries;

        this.columns.forEach((item) => {

            if (!angular.isUndefined(item.default_kind) && angular.isUndefined(item.default_type)) {
                //Renamed column "default_type" to "default_kind" in system.columns tab… · yandex/ClickHouse@8d570e2
                item.default_type = item.default_kind;
            }



            if (!this.all_fields[item.database+'.'+item.table])
            {
                this.all_fields[item.database+'.'+item.table]=[];
            }

            // TypeError: r.all_db_fields[e.database][e.table].push is not a function
            if (!_.isArray(this.all_db_fields[item.database]))
            {
                this.all_db_fields[item.database]=[];
            }

            if (!_.isArray(this.all_db_fields[item.database][item.table]))
            {
                this.all_db_fields[item.database][item.table]=[];
            }

            this.all_db_fields[item.database][item.table].push(item);

            this.all_fields[item.database+'.'+item.table].push({ name:item.name,type: item.type,active:true });

            if (!this.uciq_fields[item.database])
            {
                this.uciq_fields[item.database]=[];
            }


            if (!_.isArray(this.uciq_fields[item.database])) {
                this.uciq_fields[item.database]=[];
            }




            if (!_.isArray(this.uciq_fields[item.database])) {

                this.uciq_fields[item.database]=[];
            }

            this.uciq_fields[item.database].push(item);


            this.uciq_dbtables[item.database+'.'+item.table]=1;


        });

        console.log('DS init ... done');
        this._init=true;

    }

    isInit() {
        return (this._init && this.functions && this.functions.length>1);
    }
    getTables() {
        return this.tables;
    }
    getDatabases() {
        return this.databases;
    }
    getFieldsByDatabase(database) {
        return this.all_db_fields[database];
    }

    getFunctions() {
        return this.functions;
    }

    getFields() {
        return this.all_fields;
    }
    getUniqueDatabaseTables() {
        return this.uciq_dbtables;
    }
    getAllFieldsInDatabase(database) {
        return this.uciq_fields[database];
    }


    getDictionaries() {
        return this.dictionaries;
    }
    getColumns() {
        return this.columns;
    }
}