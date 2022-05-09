import { BaseTooltip, SpreadSheet } from '@antv/s2';
import ReactDOM from 'react-dom';
import React from 'react';
import { S2CellType } from '@antv/s2/esm/common/interface';
import { TooltipComponent, TooltipRenderProps } from './Tooltip/TooltipComponent';

export class Tooltip extends BaseTooltip {
  constructor(spreadsheet: SpreadSheet) {
    super(spreadsheet);
  }

  renderContent() {
    const showOptions = this.options;
    let cell: S2CellType | null = null;
    if (showOptions && showOptions.event?.target) {
      cell = this.spreadsheet.getCell(showOptions.event.target);
    }
    const tooltipProps: TooltipRenderProps = {
      ...showOptions,
      cell,
    };
    ReactDOM.render(<TooltipComponent {...tooltipProps} />, this.container);
  }

  destroy() {
    super.destroy();
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
    }
  }
}
