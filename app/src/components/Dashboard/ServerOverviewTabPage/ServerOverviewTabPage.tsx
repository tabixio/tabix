import React from 'react';
import { TableSheet } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
import { Button } from 'antd';
import {
  getPalette,
  generatePalette,
  getTheme,
  ThemeCfg,
  TOOLTIP_OPERATOR_HIDDEN_COLUMNS_MENU,
  setEVALocale,
} from '@antv/s2';
// Select cols, filter, search https://s2.antv.vision/en/examples/case/data-preview#index
// S2 theme : https://juejin.cn/post/7094509003241160712
// https://qdmana.com/2022/04/202204011639070406.html
// https://stackblitz.com/edit/react-ts-eymcdd?file=index.tsx
// var TOOLTIP_OPERATOR_HIDDEN_COLUMNS_MENU =  key: 'hiddenColumns', text: i18n('隐藏'),
// https://github.com/antvis/S2/blob/master/packages/s2-core/src/common/i18n/en_US.ts
interface Props {}

// const translateAntVS2 =>  {
//
// }

export default function ServerOverviewTabPage({}: Props) {
  const s2Options = {
    width: 600,
    height: 600,
    showSeriesNumber: true,
    interaction: {
      enableCopy: true,
    },
  };
  //
  // Translate
  // console.log('Lang', Lang);
  TOOLTIP_OPERATOR_HIDDEN_COLUMNS_MENU.text = 'Hide';
  setEVALocale('en_US');
  // console.log('Lang', Lang);
  // Colors : Theme
  const BORDER_COLOR = '#636363';
  const BACK_COLOR = '#424242';
  const HEADER_BACK_COLOR = '#303030';
  const CELL_ACTIVE_BACK_COLOR = '#525252';
  const fontFamily = 'Monaco';
  const customTheme = {
    background: {
      color: HEADER_BACK_COLOR,
    },
    cornerCell: {
      cell: {
        horizontalBorderColor: BORDER_COLOR,
        verticalBorderColor: BORDER_COLOR,
        padding: {
          top: 12,
          right: 8,
          bottom: 12,
          left: 8,
        },
        backgroundColor: HEADER_BACK_COLOR,
      },
      text: {
        fill: '#fff',
        fontFamily,
      },
      bolderText: {
        fontFamily,
        fill: '#fff',
        opacity: 0.4,
      },
    },
    splitLine: {
      horizontalBorderColor: BORDER_COLOR,
      horizontalBorderColorOpacity: 1,
      horizontalBorderWidth: 2,
      verticalBorderColor: BORDER_COLOR,
      verticalBorderColorOpacity: 1,
      verticalBorderWidth: 2,
      showRightShadow: true,
      shadowWidth: 10,
      shadowColors: {
        left: 'rgba(0,0,0,0.1)',
        right: 'rgba(0,0,0,0)',
      },
    },
    rowCell: {
      text: {
        fill: '#fff',
        opacity: 0.4,
        // fontSize: 15,
        // fontWeight: 'bold',
        fontFamily,
      },
      cell: {
        text: {
          fontFamily,
        },
        backgroundColor: HEADER_BACK_COLOR,
        padding: {
          top: 12,
          right: 8,
          bottom: 12,
          left: 8,
        },
        interactionState: {
          hover: {
            backgroundColor: CELL_ACTIVE_BACK_COLOR,
            backgroundOpacity: 1,
          },
          selected: {
            backgroundColor: 'rgb(63, 69, 97)',
          },
        },
        horizontalBorderColor: BORDER_COLOR,
        verticalBorderColor: BORDER_COLOR,
        verticalBorderWidth: 1,
      },
    },
    colCell: {
      cell: {
        horizontalBorderColor: BORDER_COLOR,
        verticalBorderColor: BORDER_COLOR,
        verticalBorderWidth: 2,
        horizontalBorderWidth: 2,
        padding: {
          top: 12,
          right: 8,
          bottom: 12,
          left: 8,
        },
        backgroundColor: HEADER_BACK_COLOR,
        interactionState: {
          hover: {
            backgroundColor: CELL_ACTIVE_BACK_COLOR,
            backgroundOpacity: 1,
          },
          selected: {
            backgroundColor: 'rgb(63, 69, 97)',
          },
        },
      },
      text: {
        fill: '#fff',
        fontFamily,
      },
      bolderText: {
        fill: '#fff',
        opacity: 0.4,
        fontFamily,
      },
    },
    dataCell: {
      icon: {
        size: 14,
        margin: {
          left: 10,
        },
      },
      cell: {
        interactionState: {
          hover: {
            backgroundColor: CELL_ACTIVE_BACK_COLOR,
            backgroundOpacity: 1,
          },
          hoverFocus: {
            backgroundColor: CELL_ACTIVE_BACK_COLOR,
            backgroundOpacity: 1,
            borderColor: 'blue',
          },
          selected: {
            backgroundColor: CELL_ACTIVE_BACK_COLOR,
            backgroundOpacity: 1,
          },
          unselected: {
            backgroundOpacity: 1,
            opacity: 1,
          },
          prepareSelect: {
            borderColor: CELL_ACTIVE_BACK_COLOR,
          },
        },
        horizontalBorderColor: BORDER_COLOR,
        verticalBorderColor: BORDER_COLOR,
        verticalBorderWidth: 2,
        horizontalBorderWidth: 2,
        padding: {
          top: 0,
          right: 8,
          bottom: 2,
          left: 0,
        },
        backgroundColorOpacity: 0.9,
        backgroundColor: BACK_COLOR,
      },
      text: {
        fill: '#fff',
        fontFamily,
      },
    },
  };

  const s2DataConfig = {
    fields: {
      // rows: ['a', 'b'],
      columns: ['province', 'city', 'type', 'price', 'cost'],
      // valueInCols: true,
    },
    meta: [
      {
        field: 'province',
        name: 'province',
      },
      {
        field: 'city',
        name: 'city',
      },
      {
        field: 'type',
        name: 'type',
      },
    ],
    data: [
      {
        province: '浙江',
        city: '杭州',
        type: '笔',
        price: 1,
      },
      {
        province: '浙江',
        city: '杭州',
        type: '纸张',
        price: 2,
      },
    ],
  };

  const themeColor = '#303030';

  // 使用内置的 colorful 色板作为参考色板
  // 根据风格差异，你也可以选择 default、gray 作为参考色板
  const palette = getPalette('gray');

  const themePalette = generatePalette({ ...palette, brandColor: themeColor });
  const baseTheme = getTheme({
    palette: themePalette,
  });

  // baseTheme.dataCell.text.fontFamily = 'Monaco';
  // baseTheme.colCell.text.fontFamily = 'Monaco';
  // baseTheme.headerCell.text.fontFamily = 'Monaco';
  const themeCfg = {
    name: 'gray',
    theme: customTheme,
  };
  console.log('s2DataConfig', s2DataConfig);

  const header = {
    title: 'Title Table',
    description: 'Desprip ion',
    exportCfg: { open: true },
    advancedSortCfg: { open: true },
    switcherCfg: { open: true },
    extra: (
      <Button size={'small'} style={{ verticalAlign: 'top' }}>
        Insert content
      </Button>
    ),
  };

  //  themeCfg={{ name: 'gray' }}
  //  sheetType = 'pivot' | 'table' | 'gridAnalysis' | 'strategy';
  return (
    <div>
      s2 sd ServerOverviewTabPage
      <TableSheet
        adaptive={true}
        sheetType={'table'}
        dataCfg={s2DataConfig}
        options={s2Options}
        themeCfg={themeCfg as ThemeCfg}
        header={header}
      />
    </div>
  );
}
