import { BaseTooltip, SpreadSheet } from '@antv/s2';
import ReactDOM from 'react-dom';
import React from 'react';
import { S2CellType } from '@antv/s2/esm/common/interface';
import { TooltipComponent, TooltipRenderProps } from './Tooltip/TooltipComponent';
import DataDecorator from '../../services/api/DataDecorator';

export class SheetTooltip extends BaseTooltip {
  private data: DataDecorator | null = null;

  constructor(spreadsheet: SpreadSheet, data: DataDecorator | null) {
    super(spreadsheet);
    this.data = data;
  }

  renderContent() {
    const showOptions = this.options;
    let cell: S2CellType | null = null;
    if (showOptions && showOptions.event?.target) {
      cell = this.spreadsheet.getCell(showOptions.event.target);
    }
    const tooltipProps: TooltipRenderProps = {
      dataDecorator: this.data,
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
