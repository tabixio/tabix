import { Omit } from 'typelevel-ts';
import { contextMenu } from 'handsontable';
import { isDisabledFilterItem } from './utils';

export interface ItemCallback {
  (table: Handsontable, item: ContextMenuItem, key: string, options: contextMenu.Options): void;
}

export interface ContextMenuItem {
  key: string;
  name: string;
  filter?: 'numeric' | 'time' | 'date';
  result?: 'show' | 'clipboard' | 'insert';
  submenu?: { items: ReadonlyArray<ContextMenuItem> };
  callback?: contextMenu.Settings['callback'];
  // callback?: (
  //   this: Handsontable,
  //   item: ContextMenuItem,
  //   key: string,
  //   options: contextMenu.Options
  // ) => void;
  disabled?: (this: Handsontable) => void;
}

export interface ContextMenuItems {
  [P: string]: Omit<ContextMenuItem, 'key'> | string;
}

export const defaultContextMenuItems = Object.freeze({
  columnFormat: {
    name: 'Column format',
    submenu: {
      items: [
        {
          key: 'reset',
          name: 'Reset',
        },
        {
          key: 'money',
          name: 'Money',
          filter: 'numeric',
        },
        {
          key: 'bytes',
          name: 'Bytes',
          filter: 'numeric',
        },
        {
          key: 'human',
          name: 'Human',
          filter: 'numeric',
        },
        {
          key: 'percentages',
          name: 'Percentages',
          filter: 'numeric',
        },
        {
          key: 'time',
          name: 'Time',
          filter: 'time',
        },
        {
          key: 'date',
          name: 'Date',
          filter: 'date',
        },
        {
          key: 'float3',
          name: 'Float [3]',
          filter: 'numeric',
        },
        {
          key: 'float7',
          name: 'Float [7]',
          filter: 'numeric',
        },
      ],
    },
  },
  styleCell: {
    name: 'Style cell',
    submenu: {
      items: [
        {
          key: 'reset',
          name: 'Reset',
        },
        {
          key: 'bold',
          name: 'Bold',
        },
        {
          key: 'redcolor',
          name: 'Red color',
        },
        {
          key: 'greencolor',
          name: 'Green color',
        },
        {
          key: 'yellowcolor',
          name: 'Yellow color',
        },
        {
          key: 'orangecolor',
          name: 'Orange color',
        },
      ],
    },
  },
  highlightColumn: {
    name: 'Highlight column',
    submenu: {
      items: [
        {
          key: 'heatmaps',
          name: 'Heatmaps',
          filter: 'numeric',
        },
        {
          key: 'negativepositive',
          name: 'Negative & Positive',
          filter: 'numeric',
        },
      ],
    },
  },
  hsep1: '---------',
  copyTo: {
    name: 'To Clipboard',
    submenu: {
      items: [
        {
          key: 'redminemarkdown',
          name: 'Redmine Markdown',
          result: 'clipboard',
        },
        {
          key: 'githubmarkdown',
          name: 'GitHub Markdown',
          result: 'clipboard',
        },
        {
          key: 'createtable',
          name: 'Create Table ...',
          result: 'clipboard',
        },
      ],
    },
  },
  insertTo: {
    name: 'Insert SQL',
    submenu: {
      items: [
        {
          key: 'where',
          name: 'WHERE col1 IN (val,val) AND col2 IN ...',
          result: 'insert',
        },
        {
          key: 'columns',
          name: 'Columns names',
          result: 'insert',
        },
      ],
    },
  },
  hsep3: '---------',
  transform: {
    name: 'Transform',
    submenu: {
      items: [
        {
          key: 'transposetable',
          name: 'Transpose table',
        },
        {
          key: 'minimizecolumns',
          name: 'Minimize columns',
        },
      ],
    },
  },
  calculate: {
    name: 'Calc Avg & Sum & Median',
    key: 'CalcAvgSum',
    filter: 'numeric',
    result: 'show',
  },
  hsep4: '---------',
  // copy: {},
  // undo: {},
  // make_read_only: {},
  // borders: {},
  // freeze_column: {},
  // unfreeze_column: {},
  // remove_col: {},
  // mergeCells: {},
  // alignment: {},

  // -------------------- column Show Hide --------------------------------------------------------------------
  //
  // "columnshowhide": {
  //     name: 'ShowHide Columns',
  //     submenu: {
  //         items: [
  //             {
  //                 name: "Hide this column",
  //                 callback: function (key, options,pf) {
  //                     // HandsTable.makeStyle(this,'Normal');;
  //                     console.log("Hide this column");
  //                 },
  //                 key:"columnshowhide:1"
  //             }//Money
  //         ]//items
  //     },//submenu
  // },
  //
} as ContextMenuItems);

function createContextMenuItems(
  item: ContextMenuItem,
  itemCallback: ItemCallback,
  parent?: ContextMenuItem
) {
  const { filter, ...value } = item;
  if (parent) {
    value.key = `${parent.key}:${value.key}`;
  }
  if (filter) {
    value.disabled = function disable() {
      return isDisabledFilterItem(this, filter);
    };
  }
  if (value.submenu) {
    value.submenu = {
      items: value.submenu.items.map(it => createContextMenuItems(it, itemCallback, value)),
    };
  } else {
    // item without submenu -> add callback
    value.callback = function cb(this: Handsontable, key, options) {
      itemCallback(this, value, key, options);
    };
  }
  return value;
}

export function createContextMenu(itemCallback: ItemCallback): contextMenu.Settings {
  const items = Object.entries(defaultContextMenuItems).reduce(
    (acc, [key, value]) => {
      if (typeof value !== 'object') {
        acc[key] = value;
        return acc;
      }
      const item: ContextMenuItem = { ...value, key };
      acc[key] = createContextMenuItems(item, itemCallback);
      return acc;
    },
    {} as ContextMenuItems
  );

  return {
    items,
    callback: function cb() {
      return null;
    },
  };
}
