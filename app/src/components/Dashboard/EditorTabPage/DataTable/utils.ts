import Handsontable, { contextMenu } from 'handsontable';
import { ColumnMetadata } from 'services/api/DataDecorator';
import * as manipulations from './manipulations';
// import ColumnSorting = Handsontable.plugins.ColumnSorting;

function cellWarning(_TD: HTMLElement): HTMLElement {
  const TD = _TD;
  TD.style.color = 'red';
  TD.style.fontWeight = 'bolder';
  TD.style.fontStyle = 'italic';
  return TD;
}

function hotRendererCell(
  ht: Handsontable,
  _TD: HTMLElement,
  _row: number,
  _col: number,
  _prop: string | number,
  _value: any,
  cellProperties: any
): HTMLElement {
  // is not type :gridSettings
  let TD = _TD;
  let isNumericRenderer: boolean = false;
  let value = _value;
  if (value === null) {
    value = 'NULL';
    TD = cellWarning(TD);
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
      TD = cellWarning(TD);
    } else {
      isNumericRenderer = true;
    }
  }

  if (isNumericRenderer) {
    Handsontable.renderers.NumericRenderer(ht, TD, _row, _col, _prop, value, cellProperties);
  } else {
    Handsontable.renderers.TextRenderer(ht, TD, _row, _col, _prop, value, cellProperties);
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

export function getFormatForColumn(cell: ColumnMetadata) {
  let c: any = {};
  c = {
    type: 'text',
    width: 100,
    typeOriginal: cell.type,
    isDark: true,
    data: cell.name,
    title: cell.name,
    renderer: hotRendererCell,
    columnSorting: {
      indicator: true, // disable indicator for the first column,
      sortEmptyCells: true,
      headerAction: true, // clicks on the first column won't sort
    },
  };
  // renderer: HotTableHelper.hotRendererCell,

  if (cell.useHumanSort) {
    c.sortFunction = function sort(sortOrder: any) {
      // Handsontable's object iteration helper
      const unitsRatios = {
        TiB: 1024 * 1024 * 1024 * 1024,
        GiB: 1024 * 1024 * 1024,
        MiB: 1024 * 1024,
        KiB: 1024,
        B: 1,
      };
      const parseUnit = function parseUnit(value: any, unit: string, ratio: number) {
        let v = value;
        if (typeof v === 'undefined') return value;
        if (isNaN(v) && v.indexOf(` ${unit}`) > -1) {
          v = parseFloat(v.replace(unit, '')) * ratio;
        }
        return v;
      };

      return function s(a: any, b: any) {
        let newA = a[1];
        let newB = b[1];
        const e = function sa(val: any, prop: any) {
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

function isFormatColl(ht: Handsontable, format: string) {
  const needFormat = format.toLowerCase();
  const select = manipulations.getSelectedArea(ht);
  const { columns } = ht.getSettings();
  if (!columns) {
    return false;
  }
  for (let col = select.fromCol; col <= select.toCol; col += 1) {
    if (!columns[col].type.toLowerCase().includes(needFormat)) return false;
  }
  return true;
}

export function isDisabledFilterItem(ht: Handsontable, filter: any) {
  if (typeof filter !== 'string') return false;
  return !isFormatColl(ht, filter);
}

export function getColumnSorting(columns: ReadonlyArray<ColumnMetadata>) {
  // @Error in handsontable:columnSorting, use handsontable@5.0.2, check new version 6.2...

  // For forceSortOrder
  const res = {
    sortEmptyCells: true,
    indicator: false,
    headerAction: true,
    initialConfig: {},
  };
  columns.forEach(col => {
    if (col.forceSort) {
      res.initialConfig = {
        sortOrder: col.forceSortOrder,
        column: col.forceSort,
      };
    }
  });
  // return res;
  return true;
}

export function manipulate(ht: Handsontable, key: string, options: contextMenu.Options): any {
  const prefix = 'apply';
  const all = Object.getOwnPropertyNames(manipulations).filter(
    prop => typeof manipulations[prop] === 'function'
  );

  const [func, params] = key.split(':');
  if (!func) return false;

  // capitalizeFirstLetter
  const callFunction = `${prefix}${func.charAt(0).toUpperCase()}${func.slice(1)}`;

  console.log('Call', callFunction, params);
  if (all.indexOf(callFunction) !== -1) {
    return manipulations[callFunction](ht, params || func, options);
  }
  return false;
}
