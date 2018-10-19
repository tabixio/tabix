export const contextMenuItems = {
  columnFormat: {
    name: 'Column format',
    submenu: {
      items: [
        {
          name: 'Reset',
          key: 'columnFormat:reset',
          filter: 'all',
        },
        {
          name: 'Money',
          key: 'columnFormat:money',
          filter: 'numeric',
        },
        {
          name: 'Bytes',
          key: 'columnFormat:bytes',
          filter: 'numeric',
        },
        {
          name: 'Human',
          key: 'columnFormat:human',
          filter: 'numeric',
        },
        {
          name: 'Percentages',
          key: 'columnFormat:percentages',
          filter: 'numeric',
        },
        // {
        //   name: 'Time',
        // },
        // {
        //   name: 'Date',
        // },
        {
          name: 'Float',
          key: 'columnFormat:float',
          filter: 'numeric',
        },
        {
          name: 'Heatmaps',
          key: 'columnFormat:heatmaps',
          filter: 'numeric',
        },
        {
          name: 'Negative & Positive',
          key: 'columnFormat:positive',
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
          name: 'Reset',
          key: 'styleCell:Reset',
        },
        {
          name: 'Bold',
          key: 'styleCell:Bold',
        },
        {
          name: 'Red color',
          key: 'styleCell:Red',
        },
        {
          name: 'Green color',
          key: 'styleCell:Green',
        },
        {
          name: 'Yellow color',
          key: 'styleCell:Yellow',
        },
        {
          name: 'Orange color',
          key: 'styleCell:Orange',
        },
        {
          name: 'Random color',
          key: 'styleCell:Random',
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
          name: 'Redmine Markdown (select)',
          key: 'copyTo:RedmineSelect',
        },
        {
          name: 'Redmine Markdown (full)',
          key: 'copyTo:RedmineFull',
        },
        {
          name: 'WHERE col1 IN (val,val),col2 IN ...',
          key: 'copyTo:Where',
        },
        {
          name: 'Create Table ...',
          key: 'copyTo:Create',
        },
      ],
    },
  },
  hsep3: '---------',
  transform: {
    name: 'Transpose full table',
    key: 'Transpose',
  },
  calculate: {
    name: 'Calc Avg & Sum & Median',
    key: 'CalcAvgSum',
  },
  hsep4: '---------',
  copy: {},
  undo: {},
  make_read_only: {},
  borders: {},
  freeze_column: {},
  unfreeze_column: {},
  remove_col: {},
  mergeCells: {},

  alignment: {},

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
};
