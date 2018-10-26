import Handsontable from 'handsontable';
import chroma from 'chroma-js';

// interfaces
export interface Selection {
  fromRow: number;
  toRow: number;
  toCol: number;
  fromCol: number;
  isSelected: boolean;
}

export default class HotTableManipulations {
  public static call(_ht: Handsontable, keyCall: string, _options: any): any {
    const prefix = 'apply';
    const all = Object.getOwnPropertyNames(HotTableManipulations).filter(
      prop => typeof HotTableManipulations[prop] === 'function'
    );

    const [func, params] = keyCall.split(':');
    if (!func) return false;
    if (!params) return false;

    // capitalizeFirstLetter
    const callFunction = `${prefix}${func.charAt(0).toUpperCase()}${func.slice(1)}`;

    console.log('Call', callFunction, params);
    if (all.indexOf(callFunction) !== -1) {
      return HotTableManipulations[callFunction](_ht, params, _options);
    }
    return false;
  }

  public static getSelectedArea(ht: Handsontable, selectFull: boolean = false): Selection {
    // @ts-ignore: TS2322
    const select: Handsontable.wot.CellRange | undefined = ht.getSelectedRangeLast();
    let fromCol: number = -1;
    let toCol: number = -1;
    let fromRow: number = -1;
    let toRow: number = -1;
    let isSelected = false;

    if (select) {
      isSelected = true;
      fromCol = Math.min(select.from.col, select.to.col);
      toCol = Math.max(select.from.col, select.to.col);
      fromRow = Math.min(select.from.row, select.to.row);
      toRow = Math.max(select.from.row, select.to.row);
    } else if (selectFull) {
      fromRow = 0;
      fromCol = 0;
      toRow = ht.countRows();
      toCol = ht.countCols();
    }

    return {
      fromRow,
      toRow,
      toCol,
      fromCol,
      isSelected,
    };
  }

  // @ts-ignore: TS6133: 'applyStyleCell' is declared but its value is never read.
  private static applyStyleCell(ht: Handsontable, style: string): void {
    const s = HotTableManipulations.getSelectedArea(ht, true);
    for (let row = s.fromRow; row <= s.toRow; row += 1) {
      for (let col = s.fromCol; col <= s.toCol; col += 1) {
        const cellMeta = ht.getCellMeta(row, col);
        const cl = `htCell${style}`;
        if (
          !cellMeta.className ||
          (cellMeta.className &&
            typeof cellMeta.className === 'string' &&
            cellMeta.className.indexOf(cl) < 0)
        ) {
          // refactor? use add class
          ht.setCellMeta(row, col, 'className', cl);
        }
      }
    }
    ht.render();
  }

  // @ts-ignore: TS6133: 'applyColumnFormat' is declared but its value is never read.
  private static applyColumnFormat(ht: Handsontable, _format: string): void {
    const selection = HotTableManipulations.getSelectedArea(ht, true);
    const { columns } = ht.getSettings();
    const format = _format.toLocaleLowerCase();
    if (!columns) return;
    for (let col = selection.fromCol; col <= selection.toCol; col += 1) {
      // console.log(`makeFormat for coll =${col}  ${format}`);
      // http://numbrojs.com/old-format.html
      // https://handsontable.com/docs/6.1.0/Options.html#numericFormat
      switch (format) {
        case 'reset':
          columns[col].numericFormat = undefined;
          columns[col].renderDateFormat = false;
          break;
        case 'money':
          columns[col].numericFormat = { pattern: '$0,0.00' };
          break;
        case 'human':
          columns[col].numericFormat = { pattern: '5a' };
          break;
        case 'bytes':
          columns[col].numericFormat = { pattern: '0.0b' };
          break;
        case 'percentages':
          columns[col].numericFormat = { pattern: '(0.00 %)' };
          break;
        // case 'time':
        //   columns[col].renderDateFormat = 'HH:mm:ss';
        //   break;
        // case 'date':
        //   columns[col].renderDateFormat = 'YYYY-MM-DD';
        //   break;
        // case 'datetime':
        //   columns[col].renderDateFormat = 'YYYY-MM-DD HH:mm:ss';
        //   break;
        // case 'dateloc':
        //   columns[col].renderDateFormat = 'LLLL';
        //   break;
        case 'float7':
          columns[col].numericFormat = { pattern: '0.[0000000]' };
          break;
        case 'float3':
          columns[col].numericFormat = { pattern: '0.[000]' };
          break;
        default:
          break;
      }
    }
    ht.updateSettings(
      {
        columns,
      },
      false
    );
  }

  private static MinimizeCols(ht: Handsontable) {
    const { columns } = ht.getSettings();
    const selection = HotTableManipulations.getSelectedArea(ht, true);
    for (let col = selection.fromCol; col <= selection.toCol; col += 1) {
      if (columns && columns[col]) columns[col].width = 10;
    }
    ht.updateSettings(
      {
        columns,
      },
      false
    );
  }

  private static TransposeTable(ht: Handsontable) {
    const cols = [];
    const matrix = ht.getSourceData();
    let rownum = 1;
    const o = [];
    cols.push(0);
    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const row of matrix) {
      let colnum = 0;
      // eslint-disable-next-line no-restricted-syntax,guard-for-in
      for (const [key, value] of Object.entries(row)) {
        if (!o[colnum]) o[colnum] = {};
        if (rownum === 1) {
          o[colnum][0] = key;
        }
        o[colnum][rownum] = value; // Создаем строки
        colnum += 1;
      }
      cols.push(rownum); // Создаем колонки
      rownum += 1;
    }
    const data = { data: o, columns: cols };

    const colHeaders = [];
    const columns = [];
    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const col of data.columns) {
      const c = { data: col, type: 'text', width: 100 };
      columns.push(c);
      colHeaders.push(col);
    }
    ht.updateSettings(
      {
        columns,
        colHeaders,
        data: data.data,
      },
      false
    );
  }

  private static textSQLCreateTable(ht: Handsontable): string {
    const s = HotTableManipulations.getSelectedArea(ht);
    const keys = [];
    const { columns } = ht.getSettings();
    for (let col: number = s.fromCol; col <= s.toCol; col += 1) {
      if (columns) keys.push(`\t ${ht.colToProp(col)} ${columns[col].typeOriginal}`);
    }
    return `\nCREATE TABLE x (\n ${keys.join(',\n')}\n)\nENGINE = TinyLog\n;;\n`;
  }

  private static textMarkdown(ht: Handsontable, _command: string): string {
    const s = HotTableManipulations.getSelectedArea(ht);
    const isGit: boolean = _command === 'GitHubMarkdown';
    // Markdown
    let outText = '';
    let cols = [];
    const colsGit = [];
    for (let col: number = s.fromCol; col <= s.toCol; col += 1) {
      cols.push(ht.colToProp(col));
      colsGit.push('-------------');
    }
    if (isGit) outText = ` ${cols.join(' | ')} \n ${colsGit.join(' | ')}  \n`;
    else outText = `| ${cols.join(' | ')} |\n`;
    cols = [];
    for (let row: number = s.fromRow; row <= s.toRow; row += 1) {
      for (let col: number = s.fromCol; col <= s.toCol; col += 1) {
        cols.push(ht.getDataAtCell(row, col));
      }

      if (isGit) outText = `${outText} ${cols.join(' | ')} \n`;
      else outText = `${outText}| ${cols.join(' | ')} |\n`;
      cols = [];
    }
    return outText;
  }

  // @ts-ignore: TS6133: 'applyCopyTo' is declared but its value is never read.
  private static applyInsertTo(ht: Handsontable, _command: string): string {
    // SQLWhere,ColumnsNames
    const s = HotTableManipulations.getSelectedArea(ht);
    const { columns } = ht.getSettings();
    if (!columns) return '';
    const outText = [];
    const usedCols = [];
    for (let col: number = s.fromCol; col <= s.toCol; col += 1) {
      const rr = [];
      for (let row: number = s.fromRow; row <= s.toRow; row += 1) {
        rr.push(ht.getDataAtCell(row, col));
      }
      const unique = rr.filter((v, i, a) => a.indexOf(v) === i);
      const collName = ht.colToProp(col);
      usedCols.push(collName);
      // get Type of column
      const typeColumn = columns[col].type.toLowerCase();
      if (typeColumn.includes('numeric')) {
        // if is number columns
        outText.push(`${collName} IN ( ${unique.join(' , ')} ) `);
      } else {
        // other cols as text
        outText.push(`${collName} IN ( "${unique.join('" , "')}" ) `);
      }
    }
    if (_command === 'ColumnsNames') {
      return `${usedCols.join(' , ')}\n`;
    }
    return `\n${outText.join('\n\tAND\n')}\n`;
  }

  // @ts-ignore: TS6133: 'applyCopyTo' is declared but its value is never read.
  private static applyCopyTo(ht: Handsontable, _command: string): string {
    // RedmineMarkdown,GitMarkdown,SQLCreate
    if (_command === 'SQLCreate') return HotTableManipulations.textSQLCreateTable(ht);
    if (_command === 'RedmineMarkdown' || _command === 'GitHubMarkdown')
      return HotTableManipulations.textMarkdown(ht, _command);
    return '';
  }

  // @ts-ignore: TS6133: 'applyTransform' is declared but its value is never read.
  private static applyTransform(ht: Handsontable, _command: string): void {
    console.info(`applyTranspose ${_command}`);
    if (_command === 'Transpose') {
      HotTableManipulations.TransposeTable(ht);
    }
    if (_command === 'MinimizeCols') {
      HotTableManipulations.MinimizeCols(ht);
    }
  }

  // @ts-ignore: TS6133: 'applyHighlightColumn' is declared but its value is never read.
  private static applyHighlightColumn(ht: Handsontable, _command: string): void {
    // Colors for data scientists. Generate and refine palettes of optimally distinct colors.
    // http://tools.medialab.sciences-po.fr/iwanthue/
    const selection = HotTableManipulations.getSelectedArea(ht, true);
    const countRows = ht.countRows();
    const heatmapScale = chroma.scale(['#737034', '#b8d4af']);

    for (let col = selection.fromCol; col <= selection.toCol; col += 1) {
      const values = ht.getDataAtCol(col);

      const min = Math.min.apply(null, values);
      const max = Math.max.apply(null, values);

      if (min !== null && max !== null) {
        for (let row = 0; row <= countRows; row += 1) {
          const value = parseFloat(ht.getDataAtCell(row, col));
          const meta = ht.getCellMeta(row, col);

          if (_command === 'heatmaps') {
            const point = (value - min) / (max - min);
            const color = heatmapScale(point).hex();
            if (meta) {
              ht.setCellMeta(row, col, 'backgroundColor', color);
            }
          }
          if (_command === 'positive') {
            let color = '';
            if (value < 0) {
              color = '#e27137';
            }
            if (value > 0) {
              color = '#31b3e5';
            }

            if (meta && color) {
              ht.setCellMeta(row, col, 'color', color);
            }
          }
        }
      } else {
        console.warn('Can`t find Min&Max in column', col);
      }
    }
    ht.render();
  }
}
