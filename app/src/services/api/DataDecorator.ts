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
  index: number;
}

interface Metadata {
  columns: ReadonlyArray<ColumnMetadata>;
}

export interface Statistics {
  bytesRead: number;
  timeElapsed: number;
  rowsRead: number;
}

export type Row = Record<string, any>;

// todo: refactor for use in DataTable. Maybe not needed?
export default class DataDecorator {
  readonly meta: Metadata;

  readonly rows: Row[];

  readonly query: Query | undefined;

  readonly stats: Statistics;

  readonly text: string = '';

  readonly isResultText: boolean = false;

  readonly error: boolean = false;

  constructor(result: any, _query?: Query | undefined) {
    this.query = _query;
    this.rows = [];
    this.meta = { columns: [] }; // name: "number" type: "UInt64"

    if (result.totals && result.data) {
      result.data.push(result.totals);
    }
    console.info('result',result);

    const stats = result.statistics || {};
    this.stats = {
      timeElapsed: stats.elapsed || 0,
      rowsRead: stats.rows_read || 0,
      bytesRead: stats.bytes_read || 0,
    };

    // ----------------------------------------------------------------------------------------------------
    // Если результат строка
    if (typeof result !== 'object') {
      // let text = '';
      // if (result.error) {
      //   text = result.error;
      //   this.error = true;
      // } else if (typeof result.data === 'string') {
      //   text = JSON.stringify(result.data);
      // } else {
      //   text = result.data;
      // }
      // XSS
      this.text = result // JSON.stringify(result)
        .replace('<br/>', '\n')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      this.isResultText = true;
      return;
    }
    // ----------------------------------------------------------------------------------------------------
    // this.rows = result.data.map((r: any) => ({ id: uuid(), ...r })); // refactor id

    const limitRows = 3500;

    if (Array.isArray(result.data)) {
      this.rows = result.data.slice(0, limitRows);
    }


    // let columns: Array<ColumnMetadata>;
    const columns: Array<ColumnMetadata> = result?.meta?.map((row: any, index: number) => {
      row.index = index;
      return row;
    });
    this.meta = { columns };

    // prepare (Int64+UInt64+Float64)
    if (this.rows) {
      try {
        this.prepareInt64();
      } catch (e) {
        console.error('Error in prepareInt64', e);
      }
    }
    // this.draw = this.query.drawCommands;
    // this.position = this.query.index; // порядковый номер
    // this.countAll = result.countAllQuery; // всего запросов в выполнении
  }

  findDateTimeOrDateColumn(): ColumnMetadata | null {
    const l = this.getFirstDateTimeColumn();
    if (!l) {
      return this.getFirstDateColumn();
    }
    return l;
  }

  isExistsColumn(col: string): boolean {
    return this.meta.columns.some((elem: ColumnMetadata) => elem.name === col);
  }

  getFirstColumn(): ColumnMetadata | null {
    return this.getColumnByPosition(0);
  }

  getFirstDateTimeColumn(): ColumnMetadata | null {
    return this.getFirstColumnByType('DateTime');
  }

  getFirstDateColumn(): ColumnMetadata | null {
    return this.getFirstColumnByType('Date');
  }

  getColumn(col: string): ColumnMetadata | null {
    const e = this.meta.columns.find((elem: ColumnMetadata) => elem.name === col);
    return !e ? null : e;
  }

  getFirstColumnByType(type: string): ColumnMetadata | null {
    const e = this.meta.columns.find(
      (elem: ColumnMetadata) => elem.type.toLowerCase() === type.toLowerCase()
    );
    return !e ? null : e;
  }

  getColumnByPosition(index: number): ColumnMetadata | null {
    const e = this.meta.columns.find((elem: ColumnMetadata) => elem.index === index);
    return !e ? null : e;
  }

  getColumns(): ReadonlyArray<ColumnMetadata> {
    return this.meta.columns;
  }

  isStringColumn(col: string): boolean {
    const e = this.getColumn(col);
    if (!e) return false;
    const type = e.type.toLowerCase();
    if (type.includes('string') || type.includes('emum')) {
      return true;
    }
    return false;
  }

  isNumericColumn(col: string): boolean {
    const e = this.getColumn(col);
    if (!e) return false;
    const type = e.type.toLowerCase();
    if (type.includes('int') || type.includes('float')) {
      return true;
    }
    return false;
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
