import { contextMenu } from 'handsontable';
import {
  formatColumns,
  resetColumnFormat,
  moneyColumnFormat,
  bytesColumnFormat,
  humanColumnFormat,
  percentagesColumnFormat,
  timeColumnFormat,
  dateColumnFormat,
  float3ColumnFormat,
  float7ColumnFormat,
  formatCells,
  highlightColumn,
  copyAsSQLCreateTable,
  copyAsMarkdown,
  copyAsSQLWhere,
  copyAsSQLColumns,
  calcAvgSum,
  transposeTable,
  minimizeCols,
  getSelectedArea,
} from './manipulations';

export interface ItemCallback {
  (table: Handsontable, item: ContextMenuItem, options: contextMenu.Options): void;
}

export interface ItemAction {
  (table: Handsontable, options: contextMenu.Options): string | void;
}

export enum ResultActionType {
  Show = 'Show',
  Clipboard = 'Clipboard',
  Insert = 'Insert',
}

export type CellDataType = 'numeric' | 'time' | 'date';

export type DisplayFormat = 'reset' | 'money' | 'human';

interface ContextMenuItemBase {
  key: string;
  name: string;
  disabled?: (this: Handsontable) => void;
}

interface ContextMenuItemAction extends ContextMenuItemBase {
  action: ItemAction;
  resultAction?: ResultActionType;
  callback?: contextMenu.Settings['callback'];
}

interface ContextMenuItemSubmenu extends ContextMenuItemBase {
  submenu: { items: ReadonlyArray<ContextMenuItem> };
}

export type ContextMenuItem = ContextMenuItemAction | ContextMenuItemSubmenu | string;

function createDisabledChecker(filter: CellDataType) {
  return function check(this: Handsontable): boolean {
    const select = getSelectedArea(this);
    const { columns } = this.getSettings();
    if (!columns) return true;

    for (let col = select.fromCol; col <= select.toCol; col += 1) {
      if (!columns[col].type.toLowerCase().includes(filter)) return true;
    }

    return false;
  };
}

export const defaultContextMenuItems: ReadonlyArray<ContextMenuItem> = [
  {
    key: 'formatColumns',
    name: 'Column format',
    submenu: {
      items: [
        {
          key: `formatColumns:${formatColumns.name}-${resetColumnFormat.name}`,
          name: 'Reset',
          action: formatColumns.bind(undefined, resetColumnFormat),
        },
        {
          key: `formatColumns:${formatColumns.name}-${moneyColumnFormat.name}`,
          name: 'Money',
          disabled: createDisabledChecker('numeric'),
          action: formatColumns.bind(undefined, moneyColumnFormat),
        },
        {
          key: `formatColumns:${formatColumns.name}-${bytesColumnFormat.name}`,
          name: 'Bytes',
          disabled: createDisabledChecker('numeric'),
          action: formatColumns.bind(undefined, bytesColumnFormat),
        },
        {
          key: `formatColumns:${formatColumns.name}-${humanColumnFormat.name}`,
          name: 'Human',
          disabled: createDisabledChecker('numeric'),
          action: formatColumns.bind(undefined, humanColumnFormat),
        },
        {
          key: `formatColumns:${formatColumns.name}-${percentagesColumnFormat.name}`,
          name: 'Percentages',
          disabled: createDisabledChecker('numeric'),
          action: formatColumns.bind(undefined, percentagesColumnFormat),
        },
        {
          key: `formatColumns:${formatColumns.name}-${timeColumnFormat.name}`,
          name: 'Time',
          disabled: createDisabledChecker('time'),
          action: formatColumns.bind(undefined, timeColumnFormat),
        },
        {
          key: `formatColumns:${formatColumns.name}-${dateColumnFormat.name}`,
          name: 'Date',
          disabled: createDisabledChecker('date'),
          action: formatColumns.bind(undefined, dateColumnFormat),
        },
        {
          key: `formatColumns:${formatColumns.name}-${float3ColumnFormat.name}`,
          name: 'Float [3]',
          disabled: createDisabledChecker('numeric'),
          action: formatColumns.bind(undefined, float3ColumnFormat),
        },
        {
          key: `formatColumns:${formatColumns.name}-${float7ColumnFormat.name}`,
          name: 'Float [7]',
          disabled: createDisabledChecker('numeric'),
          action: formatColumns.bind(undefined, float7ColumnFormat),
        },
      ],
    },
  },
  {
    key: 'formatCell',
    name: 'Style cell',
    submenu: {
      items: [
        {
          key: `formatCell:${formatCells.name}-htCellReset`,
          name: 'Reset',
          action: formatCells.bind(undefined, 'htCellReset'),
        },
        {
          key: `formatCell:${formatCells.name}-htCellBold`,
          name: 'Bold',
          action: formatCells.bind(undefined, 'htCellBold'),
        },
        {
          key: `formatCell:${formatCells.name}-htCellRed`,
          name: 'Red color',
          action: formatCells.bind(undefined, 'htCellRed'),
        },
        {
          key: `formatCell:${formatCells.name}-htCellGreen`,
          name: 'Green color',
          action: formatCells.bind(undefined, 'htCellGreen'),
        },
        {
          key: `formatCell:${formatCells.name}-htCellYellow`,
          name: 'Yellow color',
          action: formatCells.bind(undefined, 'htCellYellow'),
        },
        {
          key: `formatCell:${formatCells.name}-htCellOrange`,
          name: 'Orange color',
          action: formatCells.bind(undefined, 'htCellOrange'),
        },
      ],
    },
  },
  {
    key: 'highlightColumn',
    name: 'Highlight column',
    submenu: {
      items: [
        {
          key: `highlightColumn:${highlightColumn.name}-heatmaps`,
          name: 'Heatmaps',
          disabled: createDisabledChecker('numeric'),
          action: highlightColumn.bind(undefined, 'heatmaps'),
        },
        {
          key: `highlightColumn:${highlightColumn.name}-positive`,
          name: 'Negative & Positive',
          disabled: createDisabledChecker('numeric'),
          action: highlightColumn.bind(undefined, 'positive'),
        },
      ],
    },
  },
  '---------',
  {
    key: 'clipboard',
    name: 'To Clipboard',
    submenu: {
      items: [
        {
          key: `clipboard:${copyAsMarkdown.name}-Redmine`,
          name: 'Redmine Markdown',
          action: copyAsMarkdown.bind(undefined, 'Redmine'),
          resultAction: ResultActionType.Clipboard,
        },
        {
          key: `clipboard:${copyAsMarkdown.name}-GitHub`,
          name: 'GitHub Markdown',
          action: copyAsMarkdown.bind(undefined, 'GitHub'),
          resultAction: ResultActionType.Clipboard,
        },
        {
          key: `clipboard:${copyAsSQLCreateTable.name}`,
          name: 'Create Table ...',
          action: copyAsSQLCreateTable,
          resultAction: ResultActionType.Clipboard,
        },
      ],
    },
  },
  {
    key: 'insertsql',
    name: 'Insert SQL',
    submenu: {
      items: [
        {
          key: `insertsql:${copyAsSQLWhere.name}`,
          name: 'WHERE col1 IN (val,val) AND col2 IN ...',
          action: copyAsSQLWhere,
          resultAction: ResultActionType.Insert,
        },
        {
          key: `insertsql:${copyAsSQLColumns.name}`,
          name: 'Columns names',
          action: copyAsSQLColumns,
          resultAction: ResultActionType.Insert,
        },
      ],
    },
  },
  '---------',
  {
    key: 'transform',
    name: 'Transform',
    submenu: {
      items: [
        {
          key: `transform:${transposeTable.name}`,
          name: 'Transpose table',
          action: transposeTable,
        },
        {
          key: `transform:${minimizeCols.name}`,
          name: 'Minimize columns',
          action: minimizeCols,
        },
      ],
    },
  },
  {
    key: `${calcAvgSum.name}`,
    name: 'Calc Avg & Sum & Median',
    disabled: createDisabledChecker('numeric'),
    action: calcAvgSum,
    resultAction: ResultActionType.Show,
  },
];

export function isSubmenu(item: ContextMenuItem): item is ContextMenuItemSubmenu {
  return !!(item as ContextMenuItemSubmenu).submenu;
}

function createContextMenuItems(
  items: ReadonlyArray<ContextMenuItem>,
  itemCallback: ItemCallback
): ReadonlyArray<ContextMenuItem> {
  return items.map<ContextMenuItem>(item => {
    if (typeof item === 'string') return item;

    if (isSubmenu(item)) {
      return {
        ...item,
        submenu: {
          items: createContextMenuItems(item.submenu.items, itemCallback),
        },
      };
    }

    return {
      ...item,
      callback: function cb(this: Handsontable, _key, options) {
        itemCallback(this, item, options);
      },
    };
  });
}

export function createContextMenu(itemCallback: ItemCallback): contextMenu.Settings {
  const items = createContextMenuItems(defaultContextMenuItems, itemCallback);
  return {
    items,
    callback: function cb() {
      return null;
    },
  };
}
