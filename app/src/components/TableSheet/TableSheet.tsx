import React, { useState, useEffect } from 'react';
import { themeCfg } from './Theme';
import { Header } from './Header';
import { S2DataConfig, S2Options, SpreadSheet } from '@antv/s2';
import { SheetComponent as S2Table } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
import './dark.css';
import { Tooltip } from './Tooltip';
import DataDecorator from 'services/api/DataDecorator';
import { SheetType } from '@antv/s2-react/esm/components/sheets/interface';

export interface TableSheetProps {
  data: DataDecorator | null;
  dataUpdate?: number;
  defaultConfig?: S2DataConfig;
  height?: number;
  //  onAction?: (action: ResultActionType, data: any) => void;
}

export default function TableSheet({ data }: TableSheetProps) {
  const getSpreadSheet = (instance: SpreadSheet) => {
    setLoading(true);
    console.log('getSpreadSheet');
    setLoading(false);
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
  const [sheetType, setSheetType] = useState('pivot' as SheetType);
  const [loading, setLoading] = useState(true);
  // ----------------------------------- Options
  const s2Options = {
    width: 600,
    height: 600,
    // showSeriesNumber: true,
    hierarchyType: 'grid', // tree
    // totals: {
    //   rows: { showGrandTotals: true },
    //   col: { showGrandTotals: true },
    // },
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
  // ----------------------------------- Update Sheet Type
  useEffect(() => {
    //  sheetType = 'pivot' | 'table' | 'gridAnalysis' | 'strategy';
    // @TODO : !!! Change config by Type
    // hierarchyType=> grid | tree?
    // totals => [...]
    // freeze cols ...
    if (s2Ref?.current) {
      const hierarchyType = sheetType === 'pivot' ? 'tree' : 'grid';
      // s2Options.hierarchyType = sheetType === 'pivot' ? 'tree' : 'grid';
      s2Ref.current.setOptions({ hierarchyType });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      });
      // Rerender
      s2Ref.current.render();
    }
  }, [sheetType]);
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
        fields: { columns: data.getColumns().map((o) => o.name) },
        // fields: {
        //   values: ['tables', 'parts', 'partitions'],
        //   rows: ['name', 'engine'],
        //   columns: [],
        // },
        meta: data.getColumns().map((o) => {
          return { field: o.name, name: o.name };
        }),
      });
      setLoading(false);
    }
  }, [data?.dataUpdate]);
  //
  return (
    s2DataConfig && (
      <div>
        <Header
          dataCfg={s2DataConfig as S2DataConfig}
          options={s2Options as S2Options}
          sheetType={sheetType}
          sheet={s2Ref.current as SpreadSheet}
          setSheetType={setSheetType}
        />
        <S2Table
          getSpreadSheet={getSpreadSheet}
          adaptive={true}
          sheetType={sheetType}
          dataCfg={s2DataConfig}
          options={s2Options}
          themeCfg={themeCfg}
          loading={loading}
        />
      </div>
    )
  );
}
