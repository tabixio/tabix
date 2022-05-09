import React from 'react';
import { themeCfg } from './Theme';
import { Header } from './Header';
import { S2DataConfig, S2Options, SpreadSheet } from '@antv/s2';
import { TableSheet as S2Table } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
import './dark.css';
import { Tooltip } from './Tooltip';
import DataDecorator from 'services/api/DataDecorator';

// import { ResultActionType } from '../DataTable/contextMenuItems';

export interface TableSheetProps {
  data: DataDecorator;
  dataUpdate?: number;
  height?: number;
  // onAction?: (action: ResultActionType, data: any) => void;
}

interface State {
  width?: number;
  height?: number;
}

export default function TableSheet({ data }: TableSheetProps) {
  const getSpreadSheet = (instance: SpreadSheet) => {
    s2Ref.current = instance;
    // instance.showTooltip = (tooltipOptions) => {
    //   const { position, data = {}, options } = tooltipOptions;
    //   const name = `${data.name} - Name`; // 只有单元格中文案被省略才显示
    //   const infos = 'Hold Shift for multiple or box selection to view multiple data points';
    //   const tips = 'Description: This is a description';
    //   const customSummaries = (data.summaries || []).map((item) => {
    //     return { ...item, name: `${item.name} - name` };
    //   });
    //   const { cols = [], rows = [] } = data.headInfo || {};
    //   const customCols = cols.map((item) => {
    //     return { ...item, value: `${item.value} - value` };
    //   });
    //   const customDetails = (data.details || []).map((item) => {
    //     return {
    //       name: `${item.name} - name`,
    //       value: `${item.value} - value`,
    //     };
    //   });
    //   const customOperator = {
    //     onClick: ({ key }) => {
    //       console.log('Нажмите на любой пункт меню', key);
    //     },
    //     menus: [
    //       {
    //         id: 'trend',
    //         icon: 'trend',
    //         text: 'Trend',
    //         onClick: () => {
    //           console.log('щелчок по текущему пункту меню');
    //         },
    //       },
    //     ],
    //   };
    //   const customOptions = {
    //     ...tooltipOptions,
    //     position: { x: position.x + 1, y: position.y + 1 },
    //     data: {
    //       ...data,
    //       name: data.name ? name : '',
    //       infos,
    //       tips,
    //       summaries: customSummaries,
    //       headInfo: { rows, cols: customCols },
    //       details: customDetails,
    //     },
    //     options: {
    //       ...options,
    //       operator: customOperator,
    //     },
    //   };
    //   instance.tooltip.show(customOptions);
    // };
  };
  const s2Ref = React.useRef<SpreadSheet>();

  const s2Options = {
    width: 600,
    height: 600,
    showSeriesNumber: true,
    interaction: {
      enableCopy: true,
      hiddenColumnFields: ['cost'],
    },
    tooltip: {
      showTooltip: true,
      renderTooltip: (spreadsheet) => new Tooltip(spreadsheet),
    },
    //
    style: {
      cellCfg: {
        height: 20,
      },
      //colCfg: {
      //  height: 30,
      //},
    },
  } as S2Options;

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
        province: 'Moscow',
        city: 'MSK',
        type: 'City',
        price: 1,
      },
      {
        province: 'Spb',
        city: 'Питер',
        type: 'Xshow 21',
        price: 2,
      },
    ],
  };

  //
  // data....
  //  sheetType = 'pivot' | 'table' | 'gridAnalysis' | 'strategy';
  return (
    <div>
      H:{s2Ref.current ? 'Y' : 'N'}{' '}
      {s2Ref.current && (
        <Header
          dataCfg={s2DataConfig as S2DataConfig}
          options={s2Options as S2Options}
          sheet={s2Ref.current as SpreadSheet}
        />
      )}
      <S2Table
        getSpreadSheet={getSpreadSheet}
        adaptive={true}
        sheetType={'table'}
        dataCfg={s2DataConfig}
        options={s2Options}
        themeCfg={themeCfg}
      />
    </div>
  );
}
