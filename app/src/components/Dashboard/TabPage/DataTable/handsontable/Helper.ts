import Handsontable from 'handsontable';
import { ColumnMetadata } from '../../../../../services/api/DataDecorator';
// import ColumnSorting = Handsontable.plugins.ColumnSorting;

// interfaces
export interface Selection {
  fromRow: number;
  toRow: number;
  toCol: number;
  fromCol: number;
  isSelected: boolean;
}

export default class HotTableHelper {
  public static getFormatForColumn(cell: ColumnMetadata) {
    let c: any = {};

    c = {
      type: 'text',
      width: 100,
      typeOriginal: cell.type,
      isDark: true,
      data: cell.name,
      title: cell.name,
      renderer: HotTableHelper.hotRendererCell,
    };

    if (cell.useHumanSort) {
      c.sortFunction = function(sortOrder: any) {
        // Handsontable's object iteration helper
        const unitsRatios = {
          TiB: 1024 * 1024 * 1024 * 1024,
          GiB: 1024 * 1024 * 1024,
          MiB: 1024 * 1024,
          KiB: 1024,
          B: 1,
        };
        const parseUnit = function(value: any, unit: string, ratio: number) {
          let v = value;
          if (typeof v === 'undefined') return value;
          if (isNaN(v) && v.indexOf(` ${unit}`) > -1) {
            v = parseFloat(v.replace(unit, '')) * ratio;
          }
          return v;
        };

        return function(a: any, b: any) {
          let newA = a[1];
          let newB = b[1];
          const e = function(val: any, prop: any) {
            newA = parseUnit(newA, prop, val);
            newB = parseUnit(newB, prop, val);
          };

          Handsontable.helper.objectEach(unitsRatios, e);

          if (newA < newB) {
            return sortOrder ? -1 : 1;
          }
          if (newA > newB) {
            return sortOrder ? 1 : -1;
          }
          return 0;
        };
      };
    }

    if (cell.type.includes('Int64')) {
      // if DataProvider.prepareInt64() convert String->Int64, use numeric type
      if (!cell.unsafe64Bit) {
        c.type = 'numeric';
      }
    } else if (cell.type.includes('Int')) {
      c.width = 80;
      c.type = 'numeric';
    }
    // other type
    switch (cell.type) {
      case 'Date':
        c.width = 90;
        c.type = 'date';
        c.dateFormat = 'YYYY-MM-DD';
        break;
      case 'DateTime':
        c.width = 150;
        c.type = 'time';
        c.timeFormat = 'YYYY-MM-DD HH:mm:ss';
        break;
      case 'Float32':
        c.width = 80;
        c.type = 'numeric';
        c.format = '0.[0000000]';
        break;
      case 'Float64':
        c.width = 80;
        c.type = 'numeric';
        c.format = '0.[0000000]';
        break;
      case 'String':
        c.width = 180;
        break;
      default:
        break;
    }
    return c;
  }

  static cellWarning(_TD: HTMLElement): HTMLElement {
    const TD = _TD;
    TD.style.color = 'red';
    TD.style.fontWeight = 'bolder';
    TD.style.fontStyle = 'italic';
    return TD;
  }

  static hotRendererCell(
    _instance: Handsontable,
    _TD: HTMLElement,
    _row: number,
    _col: number,
    _prop: string | number,
    _value: any,
    cellProperties: any // is not type :gridSettings
  ): HTMLElement {
    let TD = _TD;
    let isNumericRenderer: boolean = false;
    let value = _value;
    if (value === null) {
      value = 'NULL';
      TD = HotTableHelper.cellWarning(TD);
    }
    // SQL : SELECT 1/0 as rrr,toInt32(null) as nuuuul , 0 / 0 as p, -0.5 / 0 as e

    if (cellProperties.type === 'numeric') {
      if (
        value === null ||
        value === '-nan' ||
        value === 'inf' ||
        value === '+nan' ||
        value === '+inf' ||
        value === '-inf' ||
        value === 'nan'
      ) {
        TD = HotTableHelper.cellWarning(TD);
      } else {
        isNumericRenderer = true;
      }
    }

    if (isNumericRenderer) {
      Handsontable.renderers.NumericRenderer.apply(this, [
        _instance,
        TD,
        _row,
        _col,
        _prop,
        value,
        cellProperties,
      ]);
    } else {
      Handsontable.renderers.TextRenderer.apply(this, [
        _instance,
        TD,
        _row,
        _col,
        _prop,
        value,
        cellProperties,
      ]);
      // if (cellProperties.type == 'date' || cellProperties.type == 'time') {
      //   // кастомный рендер на поле даты/вреря/датавремя
      //   if (moment(new Date(value)).isValid()) {
      //     if (cellProperties.renderDateFormat) {
      //       value = moment(value).format(cellProperties.renderDateFormat);
      //     }
      //   }
      //   arguments[5] = value;
      //   Handsontable.renderers.TextRenderer.apply(this, arguments);
      // }
      // else {
      //
      // }
    }

    // backgroundColor & color per cell
    if (cellProperties.backgroundColor) {
      TD.style.backgroundColor = cellProperties.backgroundColor;
    }

    if (cellProperties.color) {
      TD.style.color = cellProperties.color;
    }
    return TD;
  }

  public static getSelectedArea(ht: Handsontable, selectFull: boolean = false): Selection {
    // @ts-ignore: TS2322
    const select: Handsontable.wot.CellRange | undefined = ht.getSelectedRangeLast();
    let fromCol: number = -1;
    let toCol: number = -1;
    let fromRow: number = -1;
    let toRow: number = -1;
    let isSelected = false;
    console.log('select.RAnge:', select);

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
}
