import { Query } from './Query';
import { QueryResponse } from './provider/CoreProvider';

// export enum DataType {
//   String = 'String',
//   ArrayOfUInt8 = 'Array(UInt8)',
// }

//

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

export function humanSize(bytes: number, precision = 1) {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  if (isNaN(bytes) || !isFinite(bytes)) {
    return '?';
  }

  let unit = 0;

  while (bytes >= 1024) {
    bytes /= 1024;
    unit++;
  }

  return bytes.toFixed(+precision) + ' ' + units[unit];
}

export type Row = Record<string, any>;

// todo: refactor for use in DataTable. Maybe not needed?
export default class DataDecorator {
  private LIMIT_ROW = 3500;

  dataUpdate = 0;

  meta: Metadata;

  rows: Row[];

  query: Query | undefined;

  stats: Statistics;

  text = '';

  isResultText = false;

  error = false;

  isHaveData = false;

  constructor(result?: QueryResponse) {
    this.query = undefined;
    this.rows = [];
    this.meta = { columns: [] }; // name: "number" type: "UInt64"
    this.stats = {
      timeElapsed: -1,
      rowsRead: -1,
      bytesRead: -1,
    };
    // ---- Reset `data`
    this.reset();

    if (result) {
      // QueryResponse
      this.query = result.query;

      if (result.isError) {
        this.error = true;
        this.apply(result.error);
      } else {
        this.apply(result.response);
      }
    }
  }

  private updateDT() {
    this.dataUpdate = Date.now();
  }

  resetData(): void {
    this.rows = [];
    this.updateDT();
  }

  reset(): void {
    this.rows = [];
    this.meta = { columns: [] }; // name: "number" type: "UInt64"
    this.isResultText = false;
    this.isHaveData = false;
    this.error = false;
    this.text = '';
    this.updateDT();
  }

  mergeByKey(newData: any, key: string): void {
    let isDataUpdate = false;
    newData.forEach((_cell: any) => {
      let find = false;
      this.rows.forEach((_exists: any, index: number) => {
        if (_exists[key] == _cell[key]) {
          // exists
          find = true;
          if (_exists.hasOwnProperty('count')) {
            let counter: number = _exists.hasOwnProperty('count');
            counter += 1;
            _cell.count = counter;
            this.rows[index] = _cell;
            isDataUpdate = true;
          }
        }
      });
      if (!find) {
        isDataUpdate = true;
        this.rows.push(_cell);
      }
    });
    if (isDataUpdate) {
      this.updateDT();
    }
  }

  applyData(rows: Row[]): void {
    this.rows = rows;
    this.updateDT();
  }

  apply(result: any): void {
    // ---- if result from ClickHouse
    if (!result) {
      return;
    }
    // Если результат строка
    if (typeof result === 'string') {
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
      this.isHaveData = false;
      this.isResultText = true;
      return;
    }
    // ----------------------------------------------------------------------------------------------------
    // this.rows = result.data.map((r: any) => ({ id: uuid(), ...r })); // refactor id
    // ----------------------------------------------------------------------------------------------------

    if (typeof result === 'object') {
      const stats = result.statistics || {};
      this.stats = {
        timeElapsed: stats.elapsed || 0,
        rowsRead: stats.rows_read || 0,
        bytesRead: stats.bytes_read || 0,
      };

      if (result.totals && result.data) {
        result.data.push(result.totals);
      }

      if (Array.isArray(result.data)) {
        this.rows = result.data.slice(0, this.LIMIT_ROW);
      }

      // let columns: Array<ColumnMetadata>;
      if (Array.isArray(result.meta)) {
        const columns: Array<ColumnMetadata> = result.meta.map((row: any, index: number) => {
          row.index = index;
          return row;
        });
        this.meta = { columns };
      }
      // prepare (Int64+UInt64+Float64)
      if (this.rows) {
        try {
          this.isHaveData = true;
          this.prepareInt64();
        } catch (e) {
          console.error('Error in prepareInt64', e);
        }
      }
    }

    this.updateDT();
    // this.draw = this.query.drawCommands;
    // this.position = this.query.index; // порядковый номер
    // this.countAll = result.countAllQuery; // всего запросов в выполнении
  }

  getStatementResponse(): string {
    let ret = 'no?';
    if (this.isHaveData && this.isStringColumn('statement')) {
      ret = 'find1';
      if (this.rows[0] && this.rows[0]['statement']) {
        return this.rows[0]['statement'];
      }
    }
    return ret; //'Can`t getStatementResponse()';
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
    return type.includes('string') || type.includes('enum');
  }

  isNumericColumn(col: string): boolean {
    const e = this.getColumn(col);
    if (!e) return false;
    const type = e.type.toLowerCase();
    return type.includes('int') || type.includes('float');
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
            row[cell.name] == null ||
            !row[cell.name]
          )
        ) {
          //
          let c = 0;
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
    this.meta.columns.map((o) => {
      const e = o;
      e.unsafe64Bit = searchUnSafe[o.name];
      return e;
    });
    return false;
  }

  //
  //
  // /**
  //  * Преобразование массива в объект для конструктора  DataProvider
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

  setSort(coll: string, order: string, useHumanSort = false): boolean {
    // column : Number - this index of column, by which you want to sorter the table.
    // sortOrder : Boolean - defines the order of sorting (true for ascending, false for descending).
    // @todo : write -find coll in meta -> set to coll settings
    console.log(`setSort(${coll}:string, ${order}:string, ${useHumanSort})`);
    return true;
  }
}
