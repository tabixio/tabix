import React from 'react';
import { themeCfg } from './Theme';
import { Header } from './Header';
import { S2DataConfig, S2Options, SpreadSheet } from '@antv/s2';
import { TableSheet as S2Table } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
import './dark.css';
import { Button } from 'antd';
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
  const getSpreadSheet = (instance: any) => {
    s2Ref.current = instance;
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

  const header = {
    // title: 'Title Table',
    // description: 'Desprip ion',
    exportCfg: {
      open: true,
      copyOriginalText: 'Copy Original text',
      copyFormatText: 'Copy Format text',
      downloadOriginalText: 'Download Original Text',
      downloadFormatText: 'Download Format Text',
      successText: 'Success',
      errorText: 'Error',
    },
    advancedSortCfg: {
      open: true,
      text: 'Advanced sort',
      ruleText: 'Sort by the following rules (low to high priority)',
    },
    switcherCfg: { open: true },
    extra: (
      <Button size={'small'} style={{ verticalAlign: 'top' }}>
        Insert content
      </Button>
    ),
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
