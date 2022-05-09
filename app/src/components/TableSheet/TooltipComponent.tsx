import type { S2CellType, TooltipShowOptions } from '@antv/s2';
import React from 'react';

export interface TooltipRenderProps<T = React.ReactNode> extends TooltipShowOptions<T> {
  readonly cell: S2CellType | null;
}

export const TooltipComponent: React.FC<TooltipRenderProps> = (props) => {
  const { data, options, content, cell } = props;
  const renderContent = () => {
    return <div>MODE</div>;
  };
  return renderContent();
};
