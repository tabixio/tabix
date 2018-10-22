export const contextMenuItems = {
  columnFormat: {
    name: 'Column format',
    submenu: {
      items: [
        {
          name: 'Reset',
          key: 'columnFormat:reset',
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
          name: 'Float [3]',
          key: 'columnFormat:float3',
          filter: 'numeric',
        },
        {
          name: 'Float [7]',
          key: 'columnFormat:float7',
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
        // {
        //   name: 'Random color',
        //   key: 'styleCell:Random',
        // },
      ],
    },
  },
  highlightColumn: {
    name: 'Highlight column',
    submenu: {
      items: [
        {
          name: 'Heatmaps',
          key: 'highlightColumn:heatmaps',
          filter: 'numeric',
        },
        {
          name: 'Negative & Positive',
          key: 'highlightColumn:positive',
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
          name: 'Redmine Markdown',
          key: 'copyTo:RedmineMarkdown',
        },
        {
          name: 'Github/Tg Markdown',
          key: 'copyTo:GitMarkdown',
        },
        {
          name: 'WHERE col1 IN (val,val),col2 IN ...',
          key: 'copyTo:SQLWhere',
        },
        {
          name: 'Create Table ...',
          key: 'copyTo:SQLCreate',
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
          name: 'Transpose table',
          key: 'transform:Transpose',
        },
        {
          name: 'Minimize columns',
          key: 'transform:MinimizeCols',
        },
      ],
    },
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
