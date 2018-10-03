namespace ServerStructure {
  export interface Column {
    id: string;
    name: string;
    table: string;
    database: string;
    type: string;
    dataCompressedBytes: number;
    dataUncompressedBytes: number;
    defaultExpression: string;
    defaultKind: string;
    defaultType: string; // Renamed column 'default_type' to 'default_kind' in system.columns tab… · yandex/ClickHouse@8d570e2
    marksBytes: number;
  }

  export interface Table {
    id: string;
    name: string;
    database: string;
    engine: string;
    columns: Column[];
  }

  export interface Database {
    id: string;
    name: string;
    tables: Table[];
  }

  export class Server {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly databases: Database[],
      public readonly functions: any[],
      public readonly dictionaries: any[],
      public readonly aceJSRules: Record<string, any>
    ) {
      return Object.freeze(this);
    }
  }

  export const EMPTY: Server = new Server('root', 'Clickhouse Server', [], [], [], {});

  export function from(
    columns: Column[],
    tables: Table[],
    databases: Database[],
    dictionaries: any[],
    functions: any[]
  ) {
    console.log('Try init DS....');

    const dbTableColumns = columns.reduce((acc, col) => {
      const column: Column = {
        ...col,
        defaultType: col.defaultKind && !col.defaultType ? col.defaultKind : col.defaultType,
        id: `${col.database}.${col.table}.${col.name}`,
      };

      acc[col.database] = acc[col.database] || {};
      acc[col.database][col.table] = acc[col.database][col.table] || [];
      acc[col.database][col.table].push(column);

      return acc;
    }, {});

    const dbTables = tables.reduce((acc, t) => {
      const table: Table = {
        ...t,
        columns: dbTableColumns[t.database][t.name],
        id: `${t.database}.${t.name}`,
      };

      acc[t.database] = acc[t.database] || [];
      acc[t.database].push(table);

      return acc;
    }, {});

    const dbList = databases.map(db => ({
      ...db,
      tables: dbTables[db.name],
      id: db.name,
    }));

    const aceJSRules = {
      builtinFunctions: [] as any[],
      lang: 'en',
      dictionaries: [] as any[],
      fieldsList: [] as any[],
      tables: [] as any[],
    };

    // ------------------------------- builtinFunctions -----------------------------------
    functions.forEach(item => {
      aceJSRules.builtinFunctions.push({
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
        aceJSRules.builtinFunctions.push(p);

        // Комбинатор -Array. Агрегатные функции для аргументов-массивов
        p = {
          name: `${item.name}Array`,
          isaggr: item.is_aggregate,
          score: 2,
          comb: 'Array',
          origin: item.name,
        };
        aceJSRules.builtinFunctions.push(p);

        // Комбинатор -State. агрегатная функция возвращает промежуточное состояние агрегации
        p = {
          name: `${item.name}State`,
          isaggr: item.is_aggregate,
          score: 1,
          comb: 'State',
          origin: item.name,
        };
        aceJSRules.builtinFunctions.push(p);
      }
    });

    // -------------------------------- dictionaries ---------------------------------------------------
    dictionaries.forEach(item => {
      let idField = item.name;

      // Определяем id_field из item.name
      // Если id_field содержит точку вырезать все что до точки
      // Если в конце `s` вырезать
      // подставить _id и все в нижний регистр

      idField = idField.replace(/^.*\./gm, '');

      if (idField !== 'news') {
        idField = idField.replace(/s$/gm, '');
      }

      if (!idField) {
        idField = 'ID';
      } else {
        idField = `${idField.toLowerCase()}_id`;
      }

      const dic = `dictGet${item['attribute.types']}('${item.name}','${
        item['attribute.names']
      }',to${item.key}( ${idField} ) ) AS ${item['attribute.names']},`;
      aceJSRules.dictionaries.push({
        dic,
        title: `dic_${item.name}.${item['attribute.names']}`,
      });
    });
    // aceJSRules.tables = this.getUniqueDatabaseTables();
    console.log('DS init ... done');

    return new Server('root', 'Clickhouse Server', dbList, functions, dictionaries, aceJSRules);
  }
}

export default ServerStructure;
