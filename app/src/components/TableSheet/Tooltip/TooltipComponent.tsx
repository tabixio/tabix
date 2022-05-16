import type { S2CellType, TooltipShowOptions } from '@antv/s2';
import React from 'react';
import {
  ListItem,
  TooltipOperatorOptions,
  TooltipSummaryOptions,
  TooltipNameTipsOptions,
  TooltipHeadInfo as TooltipHeadInfoType,
  TooltipInterpretationOptions,
  getTooltipDefaultOptions,
} from '@antv/s2';
import { Menu, Divider } from 'antd';
import { TooltipOperator } from './TooltipOperator';

export interface TooltipRenderProps<T = React.ReactNode> extends TooltipShowOptions<T> {
  readonly cell: S2CellType | null;
}

export const TooltipComponent: React.FC<TooltipRenderProps> = (props) => {
  const { data, options, content, cell } = props;

  // ------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------
  const renderDivider = () => {
    return <Divider />;
  };

  // ------------------------------------------------------------------------------------------
  // Menu column
  const renderOperation = (operator: TooltipOperatorOptions, onlyMenu?: boolean) => {
    if (operator && cell && onlyMenu)
      return (
        <TooltipOperator
          onClick={operator.onClick}
          menus={operator.menus}
          onlyMenu={onlyMenu}
          cell={cell}
        />
      );
    return <div>Bad muny1</div>;
  };
  // ------------------------------------------------------------------------------------------
  // Base
  const renderContent = () => {
    const option = getTooltipDefaultOptions(options);
    const { operator, onlyMenu } = option;
    const { summaries, headInfo, details, interpretation, infos, tips, name } = data || {};
    const nameTip = { name, tips };
    if (operator && cell && onlyMenu) {
      return renderOperation(operator, true);
    }
    return <div>qwe</div>;
  };
  return renderContent();
};
