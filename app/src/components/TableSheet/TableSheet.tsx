import React, { useState, useEffect } from 'react';
import { themeCfg } from './Theme';
import { Header } from './Header';
import { S2DataConfig, S2Options, SpreadSheet } from '@antv/s2';
import { TableSheet as S2Table } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
import './dark.css';
import { Tooltip } from './Tooltip';
import DataDecorator from 'services/api/DataDecorator';
import { SheetType } from '@antv/s2-react/esm/components/sheets/interface';

// import { ResultActionType } from '../DataTable/contextMenuItems';

export interface TableSheetProps {
  data: DataDecorator | null;
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
  const [s2DataConfig, setData] = useState(null as S2DataConfig | null);
  const [sheetType, setSheetType] = useState('strategy' as SheetType);
  const s2Options = {
    width: 600,
    height: 600,
    // showSeriesNumber: true,
    hierarchyType: 'tree',
    interaction: {
      enableCopy: true,
      // hiddenColumnFields: ['cost'],
      // selectedCellsSpotlight: true,
      // hoverHighlight: true,
    },
    tooltip: {
      showTooltip: true,
      renderTooltip: (spreadsheet) => new Tooltip(spreadsheet),
    },
    // https://s2.antv.vision/en/examples/case/data-preview#index
    style: {
      cellCfg: {
        height: 20,
      },
    },
  } as S2Options;

  useEffect(() => {
    /**
     *      database,
     *     table,
     *     count() "partitions",
     *     sum(part_count) "parts",
     *     max(part_count) "max_parts_per_partition"
     */
    //   fields: {
    //     // rows: ['a', 'b'],
    //     columns: ['province', 'city', 'type', 'price', 'cost'],
    //     // valueInCols: true,
    //   },
    //   meta: [
    //     {  field: 'province',   name: 'province', },
    //     {  field: 'city',       name: 'city',     },
    //     {  field: 'type',       name: 'type',     },
    //   ],
    if (!data?.error && data?.rows) {
      setData({
        data: data.rows,
        // fields: { columns: data.getColumns().map((o) => o.name) },
        fields: {
          values: ['tables', 'parts', 'partitions'],
          rows: ['name', 'engine'],
          columns: [],
        },
        meta: data.getColumns().map((o) => {
          return { field: o.name, name: o.name };
        }),
      });
    }

    console.log('DATA LOAD', data);
  }, [data?.dataUpdate]);
  //
  // data....
  //  sheetType = 'pivot' | 'table' | 'gridAnalysis' | 'strategy';
  return (
    s2DataConfig && (
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
          sheetType={sheetType}
          dataCfg={s2DataConfig}
          options={s2Options}
          themeCfg={themeCfg}
        />
      </div>
    )
  );
}
