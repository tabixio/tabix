namespace ServerStructure {
  export enum PagesCommands {
    Processes = 'Processes',
    Metrics = 'Metrics',
    ServerOverview = 'ServerOverview',
    DbOverview = 'DbOverview',
    SqlHistory = 'SqlHistory',
    QueryLog = 'QueryLog',
    ClusterOverview = 'ClusterOverview',
  }

  export interface Item {
    id: string;
    name: string;
  }

  export interface Cluster {
    hostAddress: string;
    port: string;
  }

  export interface Column extends Item {
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

  export interface Table extends Item {
    insertName: string;
    database: string;
    engine: string;
    size: string;
    columns: ReadonlyArray<Column>;
  }

  export interface Database extends Item {
    tables: ReadonlyArray<Table>;
  }

  export interface SpecialItem extends Item {
    command: ServerStructure.PagesCommands;
  }

  export interface SpecialArrayGroupItem {
    children: ReadonlyArray<SpecialGroupItem>;
  }

  export interface SpecialGroupItem extends Item {
    type: string;
    children: ReadonlyArray<SpecialItem>;
  }

  export class Server implements Item {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly databases: ReadonlyArray<Database>,
      public readonly clusters: ReadonlyArray<Cluster>,
      public readonly functions: ReadonlyArray<any>,
      public readonly dictionaries: ReadonlyArray<any>,
      public readonly editorRules: Record<string, any>
    ) {
      return Object.freeze(this);
    }
  }

  export function isServer(
    item: Server | Table | Column | Database | SpecialItem | SpecialGroupItem
  ): item is Server {
    return !!(item as Server).databases;
  }

  export function isDatabase(
    item: Server | Table | Column | Database | SpecialItem | SpecialGroupItem
  ): item is Database {
    return !(item as Table).database && !(item as Column).table && !!(item as Database).tables;
  }

  export function isSpecialItem(
    item: Server | Table | Column | Database | SpecialItem | SpecialGroupItem
  ): item is SpecialItem {
    return !!(item as SpecialItem).command && !(item as Column).database;
  }

  export function isSpecialGroupItem(
    item: Server | Table | Column | Database | SpecialItem | SpecialGroupItem
  ): item is SpecialGroupItem {
    return !!(item as SpecialGroupItem).type && !(item as Column).database;
  }

  export function isTable(
    item: Server | Table | Column | Database | SpecialItem | SpecialGroupItem
  ): item is Table {
    return !!(item as Table).database && !!(item as Table).columns;
  }

  export function isColumn(
    item: Server | Table | Column | Database | SpecialItem | SpecialGroupItem
  ): item is Column {
    return !!(item as Column).table && !!(item as Column).database;
  }

  // export const EMPTY: Server = new Server('root', 'Clickhouse Server', [], [], [], [], {});

  export function from(
    tables: ReadonlyArray<Table>,
    databases: ReadonlyArray<Database>,
    connectionName: string,
    columnsRaw?: any[],
    dictionaries?: any[],
    functions?: any[],
    clusters?: any[]
  ) {
    let columns: Array<Column> = [];
    if (columnsRaw) {
      columns = columnsRaw.map((c: any) => {
        /* eslint-disable camelcase */
        const {
          data_compressed_bytes,
          data_uncompressed_bytes,
          default_expression,
          default_kind,
          default_type,
          marks_bytes,
          ...rest
        } = c;

        return {
          ...rest,
          dataCompressedBytes: +data_compressed_bytes,
          dataUncompressedBytes: +data_uncompressed_bytes,
          defaultExpression: default_expression,
          defaultKind: default_kind,
          defaultType: default_type || '',
          marksBytes: +marks_bytes,
        } as ServerStructure.Column;
        /* eslint-enable */
      });
    }
    const dbTableColumns = columns.reduce((acc, col) => {
      const pcol = col;
      if (col.type) {
        if (col.type.toLowerCase().indexOf('enum') !== -1) {
          const t = col.type.split(',');
          pcol.type = t.join(',\n');
        }
      }
      const column: Column = {
        ...pcol,
        defaultType: col.defaultKind && !col.defaultType ? col.defaultKind : col.defaultType,
        id: `${col.database}.${col.table}.${col.name}`,
      };

      acc[col.database] = acc[col.database] || {};
      acc[col.database][col.table] = acc[col.database][col.table] || [];
      acc[col.database][col.table].push(column);

      return acc;
    }, {});

    const dbTables = tables.reduce((acc, t) => {
      let tableNameTrim: string = t.name;
      if (tableNameTrim.indexOf('.') !== -1) {
        tableNameTrim = `"${tableNameTrim}"`;
      }

      acc[t.database] = acc[t.database] || [];

      if (!(!dbTableColumns[t.database] || !dbTableColumns[t.database][t.name])) {
        const table: Table = {
          ...t,
          columns: dbTableColumns[t.database][t.name] || [],
          insertName: tableNameTrim,
          id: `${t.database}.${t.name}`,
        };

        acc[t.database].push(table);
      }
      return acc;
    }, {});

    const dbList = databases.map((db) => ({
      ...db,
      tables: dbTables[db.name] || [],
      id: db.name,
    }));

    const editorRules = {
      builtinFunctions: [] as any[],
      lang: 'en',
      dictionaries: [] as any[],
      tables: {} as object,
    };

    // ------------------------------- builtinFunctions -----------------------------------

    if (functions) {
      functions.forEach((item) => {
        editorRules.builtinFunctions.push({
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
          editorRules.builtinFunctions.push(p);

          // Комбинатор -Array. Агрегатные функции для аргументов-массивов
          p = {
            name: `${item.name}Array`,
            isaggr: item.is_aggregate,
            score: 2,
            comb: 'Array',
            origin: item.name,
          };
          editorRules.builtinFunctions.push(p);

          // Комбинатор -State. агрегатная функция возвращает промежуточное состояние агрегации
          p = {
            name: `${item.name}State`,
            isaggr: item.is_aggregate,
            score: 1,
            comb: 'State',
            origin: item.name,
          };
          editorRules.builtinFunctions.push(p);
        }
      });
    }

    // -------------------------------- dictionaries ---------------------------------------------------
    if (dictionaries) {
      dictionaries.forEach((item) => {
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
        }',to${item.key}( ${idField} ${
          item['key_name'] ? '/*' + item['key_name'] + ' */' : ''
        } ) ) AS ${item['attribute.names']},`;
        editorRules.dictionaries.push({
          dic,
          title: `dic_${item.name}.${item['attribute.names']}`,
        });
      });
    }
    editorRules.tables = dbTables;

    //

    if (!clusters) clusters = [];
    if (!functions) functions = [];
    if (!dictionaries) dictionaries = [];
    return new Server(
      'root',
      connectionName,
      dbList,
      clusters,
      functions,
      dictionaries,
      editorRules
    );
  }
}

export default ServerStructure;
