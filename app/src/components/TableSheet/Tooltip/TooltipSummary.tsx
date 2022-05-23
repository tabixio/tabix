import React from 'react';
import { size, reduce } from 'lodash';
import { SummaryProps, TOOLTIP_PREFIX_CLS } from '@antv/s2';
import cls from 'classnames';
// import { DataFrame } from '@antv/data-wizard';

export const TooltipSummary: React.FC<SummaryProps> = React.memo((props) => {
  const { summaries = [] } = props;

  const renderSelected = () => {
    const count = reduce(summaries, (pre, next) => pre + size(next?.selectedData), 0);
    return (
      <div className={`${TOOLTIP_PREFIX_CLS}-summary-item`}>
        <span className={`${TOOLTIP_PREFIX_CLS}-selected`}>{count} Items</span>
        selected
      </div>
    );
  };

  const renderSummary = () => {
    /*
    // ------------------------------------
    // ToDo: DataFrame
    summaries.0.selectedData: Array(8)
    0: {tables: 8}
    1: {partitions: 2542}
    2: {tables: 8}
    3: {partitions: 23}
    4: {tables: 0}
    5: {partitions: 0}
    6: {tables: 0}
    7: {partitions: 0}
    // ------------------------------------
    */
    console.log('summaries', summaries);
    return summaries?.map((item) => {
      const { name = '', value } = item || {};
      if (!name && !value) {
        return;
      }

      return (
        <div key={`${name}-${value}`} className={`${TOOLTIP_PREFIX_CLS}-summary-item`}>
          <span className={`${TOOLTIP_PREFIX_CLS}-summary-key`}>{name} sum</span>
          <span className={cls(`${TOOLTIP_PREFIX_CLS}-summary-val`, `${TOOLTIP_PREFIX_CLS}-bold`)}>
            {value}
          </span>
        </div>
      );
    });
  };

  return (
    <div className={`${TOOLTIP_PREFIX_CLS}-summary`}>
      {renderSelected()}
      {renderSummary()}
    </div>
  );
});
