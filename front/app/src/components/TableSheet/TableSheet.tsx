import React, { useEffect, useState } from 'react';
import { themeCfg } from './Theme';
import { Header } from './Header';
import {
  DataCell,
  InterceptType,
  S2DataConfig,
  S2Event,
  S2Options,
  SpreadSheet,
  TargetCellInfo,
} from '@antv/s2';
import { Event as CanvasEvent } from '@antv/g-canvas';
import { SheetComponentOptions, SheetComponent as S2Table } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
import './dark.css';
import { SheetTooltip } from './SheetTooltip';
import DataDecorator from 'services/api/DataDecorator';
import { SheetType } from './SheetType';
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
  //
  const toolTip: SheetTooltip | null = null;

  const getSpreadSheet = (instance: SpreadSheet) => {
    setLoading(true);
    setLoading(false);
    s2Ref.current = instance;

    // tooltip: {
    //
    //     renderTooltip: (spreadsheet) => toolTip,
    // },
    // const toolTip = new Tooltip(instance, data);
  };
  const s2Ref = React.useRef<SpreadSheet>();
  const [s2DataConfig, setData] = useState(null as S2DataConfig | null);
  const [sheetType, setSheetType] = useState(defaultSheetType ?? ('table' as SheetType));
  const [loading, setLoading] = useState(true);

  // ----------------------------------- Options
  const s2Options: SheetComponentOptions = {
    // width: defaultWidth,
    // height: defaultHeight,
    // showSeriesNumber: true,
    hierarchyType: 'grid', // tree
    // totals: {
    //   rows: { showGrandTotals: true },
    //   col: { showGrandTotals: true },
    // },
    // frozenRowCount: 1,
    showDefaultHeaderActionIcon: true,
    frozenColCount: 1,
    // frozenTrailingRowCount: 1,
    // frozenTrailingColCount: 1,
    // tooltip: {
    //   corner: {},
    //   // row: {},
    //   col: {},
    //   data: {},
    // },
    interaction: {
      enableCopy: true,
      // hiddenColumnFields: ['cost'],
      // selectedCellsSpotlight: true,
      hoverHighlight: true,
      hoverFocus: true,
      multiSelection: true,
      selectedCellMove: true,
    },
    tooltip: {
      row: {
        showTooltip: true,
      },
      data: {
        showTooltip: true,
        renderTooltip: (spreadsheet) => new SheetTooltip(spreadsheet, data),
      },
    },
    // https://s2.antv.vision/en/examples/case/data-preview#index
    style: {
      cellCfg: {
        height: 20,
      },
    },
  } as SheetComponentOptions;
  // -----

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
      s2Ref.current.on(S2Event.GLOBAL_CONTEXT_MENU, (event) => {
        console.log('EVENTX', event);
      });
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
      setData({
        data: data.rows,
        fields: { columns: data.getColumns().map((o) => o.name) },
        // fields: {
        //   values: ['tables', 'parts', 'partitions'],
        //   rows: ['name', 'engine'],
        //   columns: [],
        // },
        meta: data.getColumns().map((o) => {
          return {
            field: o.name,
            name: o.name,
            // @ts-ignore
            formatter: (v: unknown) => {
              if (v instanceof String || typeof v === 'string') {
                return v.replace('\n', '\u23CE');
              }
              return v as string;
            }, //v.split('\n')?.[0],
          };
        }),
      });
      setLoading(false);
    }
  }, [data?.dataUpdate]);

  const onDataCellDoubleClick = (cell: TargetCellInfo) => {
    console.log('onDataCellDoubleClick - mmed', cell);
    return true;
  };
  const onContextMenu = (event: CanvasEvent) => {
    console.log('onContextMenu - CALL');

    if (!s2Ref.current) return;
    // -- go
    event.preventDefault();
    const { interaction } = s2Ref.current;
    const cell: DataCell = s2Ref.current.getCell(event.target);
    const meta = cell.getMeta();

    if (!meta) {
      return;
    }
    interaction.addIntercepts([InterceptType.HOVER]);
    if (interaction.isSelectedCell(cell)) {
      interaction.reset();
      return;
    }
    // s2Ref?.current.emit(S2Event.DATA_CELL_CLICK, event);
    s2Ref?.current.showTooltip({
      event: event,
      position: { x: event.clientX, y: event.clientY },
    });
    return true;
  };
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
          onContextMenu={onContextMenu}
          onDataCellDoubleClick={onDataCellDoubleClick}
          getSpreadSheet={getSpreadSheet}
          adaptive={true}
          sheetType={sheetType}
          dataCfg={s2DataConfig}
          options={s2Options as SheetComponentOptions}
          themeCfg={themeCfg}
          loading={loading}
        />
      </Flex>
    )
  );
}
