import React, { useRef, useState, useEffect } from 'react';
import { themeCfg } from './Theme';
import { Header } from './Header';
import { S2DataConfig, S2Options, SpreadSheet } from '@antv/s2';
import { SheetComponent as S2Table } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
import './dark.css';
import { Tooltip } from './Tooltip';
import DataDecorator from 'services/api/DataDecorator';
import { SheetType } from '@antv/s2-react/esm/components/sheets/interface';
import { Flex, FlexProps } from 'reflexy';

export interface TableSheetProps {
  data: DataDecorator | null;
  dataUpdate?: number;
  defaultSheetType?: 'table' | 'pivot';
  defaultConfig?: S2DataConfig;
  defaultHeight?: number;
  defaultWidth?: number;
  title?: string;
  //  onAction?: (action: ResultActionType, data: any) => void;
}

export default function TableSheet({
  data,
  defaultSheetType,
  title,
  dataUpdate,
  // defaultHeight = 600,
  // defaultWidth = 600,
  ...flexProps
}: TableSheetProps & FlexProps) {
  const getSpreadSheet = (instance: SpreadSheet) => {
    setLoading(true);
    setLoading(false);
    s2Ref.current = instance;
  };
  const s2Ref = React.useRef<SpreadSheet>();
  const [s2DataConfig, setData] = useState(null as S2DataConfig | null);
  const [sheetType, setSheetType] = useState(defaultSheetType ?? ('table' as SheetType));
  const [loading, setLoading] = useState(true);
  // ----------------------------------- Options
  const s2Options = {
    // width: defaultWidth,
    // height: defaultHeight,
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
      // console.log('setOptions->hierarchyType');
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
      // console.log('Set Data', data);
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
  return (
    s2DataConfig && (
      <Flex column fill {...flexProps} style={{ minHeight: 150 /*, border: '1px solid green' */ }}>
        <Header
          dataCfg={s2DataConfig as S2DataConfig}
          options={s2Options as S2Options}
          sheetType={sheetType}
          sheet={s2Ref.current as SpreadSheet}
          setSheetType={setSheetType}
          title={title}
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
      </Flex>
    )
  );
}
