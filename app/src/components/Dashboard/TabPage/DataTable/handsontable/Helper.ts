import { ColumnMetadata } from '../../../../../services/api/DataDecorator';
import Handsontable from 'handsontable';

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
      // renderer : this._handsRenderer;
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
}
