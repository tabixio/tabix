/* eslint-disable */

export default class DatabaseStructure {
  private _init = false;

  private uciq_fields: any[] = [];

  private all_fields: any[] = [];

  private all_db_fields: any[] = [];

  private uciq_dbtables: any[] = [];

  private aceJSRules: Record<string, any> = {};

  private columns: any[] = [];

  private tables: any[] = [];

  private databases: any[] = [];

  private functions: any[] = [];

  private dictionaries: any[] = [];

  init(columns: any[], tables: any[], databases: any[], dictionaries: any[], functions: any[]) {
    console.log('Try init DS....');
    if (this._init) return;

    this._init = false;
    this.uciq_fields = [];
    this.all_fields = [];
    this.all_db_fields = [];
    this.uciq_dbtables = [];
    this.aceJSRules = {
      builtinFunctions: [],
      lang: 'en',
      dictionaries: [],
      fieldsList: [],
      tables: [],
    };

    this.columns = columns;
    this.tables = tables;
    this.databases = databases;
    this.functions = functions;
    this.dictionaries = dictionaries;

    this.columns.forEach(item => {
      // if (!isEmpty(item.default_kind) && isEmpty(item.default_type)) {
      if (item.default_kind && !item.default_type) {
        // Renamed column 'default_type' to 'default_kind' in system.columns tab… · yandex/ClickHouse@8d570e2
        item.default_type = item.default_kind;
      }

      let tableNameTrim = item.table;
      if (tableNameTrim.indexOf('.') !== -1) {
        tableNameTrim = `"${tableNameTrim}"`;
      }

      if (!this.all_fields[`${item.database}.${item.table}`]) {
        this.all_fields[`${item.database}.${item.table}`] = [];
      }
      // TypeError: r.all_db_fields[e.database][e.table].push is not a function
      if (!Array.isArray(this.all_db_fields[item.database])) {
        this.all_db_fields[item.database] = [];
      }
      if (!Array.isArray(this.all_db_fields[item.database][item.table])) {
        this.all_db_fields[item.database][item.table] = [];
      }
      this.all_db_fields[item.database][item.table].push(item);
      this.all_fields[`${item.database}.${item.table}`].push({
        name: item.name,
        type: item.type,
        active: true,
      });
      if (!this.uciq_fields[item.database]) {
        this.uciq_fields[item.database] = [];
      }
      if (!Array.isArray(this.uciq_fields[item.database])) {
        this.uciq_fields[item.database] = [];
      }
      if (!Array.isArray(this.uciq_fields[item.database])) {
        this.uciq_fields[item.database] = [];
      }
      this.uciq_fields[item.database].push(item);

      this.uciq_dbtables[`${item.database}.${tableNameTrim}`] = 1;
    });

    // ------------------------------- builtinFunctions -----------------------------------
    this.functions.forEach(item => {
      this.aceJSRules.builtinFunctions.push({
        name: item.name,
        isaggr: item.is_aggregate,
        score: 101,
        comb: false,
        origin: item.name,
      });
      if (item.is_aggregate) {
        // Комбинатор -If. Условные агрегатные функции
        let p = {
          name: `${item.name}If`,
          isaggr: item.is_aggregate,
          score: 3,
          comb: 'If',
          origin: item.name,
        };
        this.aceJSRules.builtinFunctions.push(p);

        // Комбинатор -Array. Агрегатные функции для аргументов-массивов
        p = {
          name: `${item.name}Array`,
          isaggr: item.is_aggregate,
          score: 2,
          comb: 'Array',
          origin: item.name,
        };
        this.aceJSRules.builtinFunctions.push(p);

        // Комбинатор -State. агрегатная функция возвращает промежуточное состояние агрегации
        p = {
          name: `${item.name}State`,
          isaggr: item.is_aggregate,
          score: 1,
          comb: 'State',
          origin: item.name,
        };
        this.aceJSRules.builtinFunctions.push(p);
      }
    });
    // -------------------------------- dictionaries ---------------------------------------------------
    this.dictionaries.forEach(item => {
      let id_field = item.name;

      // Определяем id_field из item.name
      // Если id_field содержит точку вырезать все что до точки
      // Если в конце `s` вырезать
      // подставить _id и все в нижний регистр

      id_field = id_field.replace(/^.*\./gm, '');

      if (id_field !== 'news') {
        id_field = id_field.replace(/s$/gm, '');
      }

      if (!id_field) {
        id_field = 'ID';
      } else {
        id_field = `${id_field.toLowerCase()}_id`;
      }

      const dic = `dictGet${item['attribute.types']}('${item.name}','${
        item['attribute.names']
      }',to${item.key}( ${id_field} ) ) AS ${item['attribute.names']},`;
      this.aceJSRules.dictionaries.push({
        dic,
        title: `dic_${item.name}.${item['attribute.names']}`,
      });
    });
    this.aceJSRules.tables = this.getUniqueDatabaseTables();
    console.log('DS init ... done');

    this._init = true;
  }

  isInit() {
    return this._init && this.functions && this.functions.length > 1;
  }

  getTables() {
    return this.tables;
  }

  getDatabases() {
    return this.databases;
  }

  // @ts-ignore
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

  // @ts-ignore
  getAllFieldsInDatabase(database) {
    return this.uciq_fields[database];
  }

  getDictionaries() {
    return this.dictionaries;
  }

  getColumns() {
    return this.columns;
  }

  // @ts-ignore
  getForAceJS(dataBaseName) {
    const r = this.aceJSRules;
    r.fieldsList = this.getAllFieldsInDatabase(dataBaseName);
    return r;
  }
}
