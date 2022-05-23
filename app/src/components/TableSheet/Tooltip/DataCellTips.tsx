import React from 'react';
import { S2CellType, TOOLTIP_PREFIX_CLS } from '@antv/s2';
import { Event as CanvasEvent } from '@antv/g-base';

export interface TooltipSimple {
  cell: S2CellType;
  event?: CanvasEvent | MouseEvent;
}

export const DataCellTips = (props: TooltipSimple) => {
  const { cell, event } = props;
  try {
    console.log('DataCellTips', cell);
    if (!cell) throw 'Not set cell';
    const value = cell.getMeta().fieldValue;
    console.log('value', value);
    // /ERe
    return (
      <div className={'cell-hint'}>
        {
          <textarea
            wrap={'soft'}
            readOnly={true}
            spellCheck={false}
            defaultValue={''}
            value={value}
          />
        }
      </div>
    );
  } catch (e) {
    return <div>Tooltip error ${e} </div>;
  }
};
