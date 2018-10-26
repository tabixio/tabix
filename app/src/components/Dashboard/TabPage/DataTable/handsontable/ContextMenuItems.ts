const contextMenuItems = {
  columnFormat: {
    name: 'Column format',
    submenu: {
      reset: {
        name: 'Reset',
        key: 'reset',
      },
      money: {
        name: 'Money',
        filter: 'numeric',
      },
      bytes: {
        name: 'Bytes',
        filter: 'numeric',
      },
      human: {
        name: 'Human',
        filter: 'numeric',
      },
      percentages: {
        name: 'Percentages',
        filter: 'numeric',
      },
      timeonly: {
        name: 'Time',
        filter: 'time',
      },
      dateonly: {
        name: 'Date',
        filter: 'date',
      },
      float3: {
        name: 'Float [3]',
        filter: 'numeric',
      },
      float7: {
        name: 'Float [7]',
        filter: 'numeric',
      },
    },
  },
  styleCell: {
    name: 'Style cell',
    submenu: {
      Reset: {
        name: 'Reset',
      },
      Bold: {
        name: 'Bold',
      },
      Red: {
        name: 'Red color',
      },
      Green: {
        name: 'Green color',
      },
      Yellow: {
        name: 'Yellow color',
      },
      Orange: {
        name: 'Orange color',
      },
    },
  },
  highlightColumn: {
    name: 'Highlight column',
    submenu: {
      heatmaps: {
        name: 'Heatmaps',
        filter: 'numeric',
      },
      positive: {
        name: 'Negative & Positive',
        filter: 'numeric',
      },
    },
  },
  hsep1: '---------',
  copyTo: {
    name: 'To Clipboard',
    submenu: {
      RedmineMarkdown: {
        name: 'Redmine Markdown',
        result: 'clipboard',
      },
      GitHubMarkdown: {
        name: 'GitHub Markdown',
        result: 'clipboard',
      },
      // GitMarkdown: {
      //   name: 'Github/Tg Markdown',
      //   result: 'clipboard',
      // },
      SQLCreate: {
        name: 'Create Table ...',
        result: 'clipboard',
      },
    },
  },
  insertTo: {
    name: 'Insert SQL',
    submenu: {
      SQLWhere: {
        name: 'WHERE col1 IN (val,val) AND col2 IN ...',
        result: 'insert',
      },
      ColumnsNames: {
        name: 'Columns names',
        result: 'insert',
      },
    },
  },
  hsep3: '---------',
  transform: {
    name: 'Transform',
    submenu: {
      Transpose: {
        name: 'Transpose table',
      },
      MinimizeCols: {
        name: 'Minimize columns',
      },
    },
  },
  calculate: {
    name: 'Calc Avg & Sum & Median',
    key: 'CalcAvgSum',
    filter: 'numeric',
    result: 'show',
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
export default contextMenuItems;
