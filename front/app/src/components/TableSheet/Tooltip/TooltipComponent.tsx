import type { S2CellType, TooltipShowOptions } from '@antv/s2';
import React from 'react';
import { isEmpty } from 'lodash';

import { Icon } from '../Icons';
import {
  ListItem,
  TooltipOperatorOptions,
  TooltipSummaryOptions,
  TooltipNameTipsOptions,
  TooltipHeadInfo as TooltipHeadInfoType,
  TooltipInterpretationOptions,
  getTooltipDefaultOptions,
  TOOLTIP_PREFIX_CLS,
  CellTypes,
} from '@antv/s2';
import { Menu, Divider } from 'antd';
import { TooltipOperator } from './TooltipOperator';
import { DataCellTips } from './DataCellTips';
import { TooltipSummary } from './TooltipSummary';
import { Event as CanvasEvent } from '@antv/g-base';
import { DataDecorator } from '../../../services';

export interface TooltipRenderProps<T = React.ReactNode> extends TooltipShowOptions<T> {
  readonly cell: S2CellType | null;
  readonly dataDecorator: null | DataDecorator;
}

export const TooltipComponent: React.FC<TooltipRenderProps> = (props) => {
  const { data, options, content, cell, cellInfos, dataDecorator, event } = props;
  // TableDataCell , TableColCell
  // DataCell | HeaderCell | ColCell | CornerCell | RowCell | MergedCell | BaseCell
  const cellType = cell?.constructor.name;
  const isClick = event && event.type.match(/mouseup|click|contextmenu/g) !== null; //: contextmenu | mouseup | "mousemove" | "click"
  // const isTargetTotalCell = cell?.isTotals;
  const isTargetColCell = cell?.cellType === CellTypes.COL_CELL;
  const isTargetRowCell = cell?.cellType === CellTypes.ROW_CELL;
  const isTargetDataCell = cell?.cellType === CellTypes.DATA_CELL;
  //
  // const isDataCell = cellType && cellType.includes('DataCell');
  // const isColCell = cellType && cellType.includes('ColCell');
  // ------------------------------------------------------------------------------------------
  /*
   @TODO :
   1. Как скрыть (hide) выбранной колонки 
   2. Как выбрать sort ASC/DES     
   */
  // ------------------------------------------------------------------------------------------
  const renderDivider = () => {
    return <Divider />;
  };

  // ------------------------------------------------------------------------------------------
  // Menu column
  const renderOperation = (operator: TooltipOperatorOptions, onlyMenu: boolean) => {
    console.log('....operator', operator);
    return (
      cell && (
        <TooltipOperator
          onClick={operator.onClick}
          menus={operator.menus}
          onlyMenu={onlyMenu}
          cell={cell}
        />
      )
    );
  };
  // ------------------------------------------------------------------------------------------
  const renderContentTip = (cell: S2CellType, event: CanvasEvent | MouseEvent) => {
    return <DataCellTips cell={cell} event={event} />;
  };
  const renderNameTips = (nameTip: TooltipNameTipsOptions) => {
    const { name, tips } = nameTip || {};
    console.log('nametip', nameTip);
    // return <SimpleTips name={name} tips={tips} />;
  };
  const renderSummary = (summaries: TooltipSummaryOptions[]) => {
    return !isEmpty(summaries) && <TooltipSummary summaries={summaries} />;
  };
  // ------------------------------------------------------------------------------------------
  const renderHeadInfo = (headInfo: TooltipHeadInfoType) => {
    const { cols, rows } = headInfo || {};

    return (
      (!isEmpty(cols) || !isEmpty(rows)) && (
        <>
          {renderDivider()}
          <div className={`${TOOLTIP_PREFIX_CLS}-head-info-list`}>
            {cols.map((item: ListItem) => item.value)?.join('/')}
            {cols.length > 0 && rows.length > 0 && '，'}
            {rows.map((item: ListItem) => item.value)?.join('/')}
          </div>
        </>
      )
    );
  };
  // ------------------------------------------------------------------------------------------
  // Base
  const renderContent = () => {
    const option = getTooltipDefaultOptions(options);
    const { operator, onlyMenu } = option;

    //
    const { summaries, headInfo, details, interpretation, infos, tips, name } = data || {};
    const type = cell;
    const nameTip = { name, tips };
    //

    console.log('------------', cellType, event?.type, 'isClick = ', isClick);
    console.log('Data', data);
    console.log('interpretation', interpretation);
    console.log('content', content);
    console.log('cell', cell);
    console.log('cellInfos', cellInfos);
    console.log('event', event);

    // console.log('summaries',summaries);
    //   console.log('headInfo',headInfo):
    // console.log('details',details);
    //   console.log('interpretation',interpretation, infos, tips, name);

    if (operator && cell && onlyMenu) {
      //
      return renderOperation(operator, true);
    }
    const DefaultContent = (
      <>
        {
          cell && isClick && isTargetDataCell && (
            <DataCellTips cell={cell} event={event} />
          ) /* Содержимое ячейки */
        }
        {summaries && renderSummary(summaries) /* Кол-во выбранных элементов и median...*/}
        {/*{renderInterpretation(interpretation)} ??? Толкование ??? */}
        {headInfo && renderHeadInfo(headInfo)}
        {/*{renderDetail(details)}*/}
        {/*{renderInfos(infos)}*/}
      </>
    );
    return (
      <div>
        {operator && renderOperation(operator, false)}
        {content ?? DefaultContent}
      </div>
    );
  };
  return renderContent(); //  : <></>;
};
