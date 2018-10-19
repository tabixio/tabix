import { Query } from './Query';

// export enum DataType {
//   String = 'String',
//   ArrayOfUInt8 = 'Array(UInt8)',
// }

export interface ColumnMetadata {
  name: string;
  // type: DataType;
  type: string;
  unsafe64Bit: boolean;
  useHumanSort: boolean;
  forceSort: boolean;
  forceSortOrder: boolean;
}

export interface Metadata {
  columns: ColumnMetadata[];
}

export type Row = Record<string, any>; // & { id: string | number };

// todo: refactor for use in DataTable. Maybe not needed?
export default class DataDecorator {
  readonly meta: Metadata;

  readonly rows: Row[];

  readonly query: Query;

  readonly text: string = '';

  readonly isResultText: boolean = false;

  readonly error: boolean = false;

  constructor(result: any, _query: Query) {
    this.query = _query;
    this.rows = [];
    this.meta = { columns: [] };

    if (result.totals && result.data) {
      result.data.push(result.totals);
    }
    // ----------------------------------------------------------------------------------------------------
    // Если результат строка
    if (typeof result.data !== 'object') {
      let text = '';
      if (result.error) {
        text = result.error;
        this.error = true;
      } else if (typeof result.data === 'string') {
        text = JSON.stringify(result.data);
      } else {
        text = result.data;
      }
      // XSS
      this.text = text
        .replace('<br/>', '\n')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      this.isResultText = true;
      return;
    }
    // ----------------------------------------------------------------------------------------------------
    // this.rows = result.data.map((r: any) => ({ id: uuid(), ...r })); // refactor id
    this.rows = result.data;
    this.meta = { columns: result.meta };
    // prepare (Int64+UInt64+Float64)
    if (this.rows) {
      try {
        this.prepareInt64();
      } catch (e) {
        console.error('Error in prepareInt64', e);
      }
    }

    // this.draw = this.query.drawCommands;
    // this.rows = result.rows;
    // this.position = this.query.index; // порядковый номер
    // this.countAll = result.countAllQuery; // всего запросов в выполнении
  }

  private prepareInt64() {
    const searchUnSafe: any[] = [];
    if (!(Array.isArray(this.rows) && this.rows.length > 1)) return false;
    // For IN For => One loop, one loop, NO REPARSE,one pass => Fast
    // eslint-disable-next-line no-restricted-syntax
    for (const row of this.rows) {
      // eslint-disable-next-line no-restricted-syntax
      for (const cell of this.meta.columns) {
        if (!searchUnSafe[cell.name]) searchUnSafe[cell.name] = 0;

        if (
          !(
            cell.type.includes('Array(') ||
            !(cell.type.includes('Int64') || cell.type.includes('Float64')) ||
            (row[cell.name] == null || !row[cell.name])
          )
        ) {
          //
          let c: number = 0;
          if (cell.type.includes('Float64')) {
            c = parseFloat(row[cell.name]);
          } else {
            // eslint-disable-next-line radix
            c = parseInt(row[cell.name]);
          }
          if (Math.abs(c) < Number.MAX_SAFE_INTEGER) {
            row[cell.name] = c;
          } else {
            searchUnSafe[cell.name] = 1;
          }
        } // if
      } // for
    }
    // Find max
    this.meta.columns.map(o => {
      const e = o;
      e.unsafe64Bit = searchUnSafe[o.name];
      return e;
    });

    // console.warn(this.rows);
    // console.warn(searchUnSafe);
    // console.warn(this.meta.columns);
    return false;
  }
  //
  //
  // /**
  //  * Преобразование массива в обьект для конструктора  DataProvider
  //  *
  //  * @param data
  //  * @returns {DataDecorator}
  //  */
  // // @ts-ignore
  // static convertArrayToDataProvider(data, sourceType) {
  //   const result = {
  //     data,
  //     meta: [] as any[],
  //     error: false,
  //     query: { drawCommands: false },
  //     rows: data.length,
  //     position: 0,
  //     countAll: 0,
  //   };
  //   result.meta = Object.keys(data[0]).map(key => ({ name: key, type: 'string' }));
  //   // @ts-ignore
  //   return new DataDecorator(result, sourceType);
  // }

  toString() {
    return JSON.stringify(this.rows);
  }

  setSort(coll: string, order: string, useHumanSort: boolean = false): boolean {
    // column : Number - this index of column, by which you want to sorter the table.
    // sortOrder : Boolean - defines the order of sorting (true for ascending, false for descending).
    // @todo : write -find coll in meta -> set to coll settings
    console.log(`setSort(${coll}:string, ${order}:string, ${useHumanSort})`);
    return true;
  }
}
