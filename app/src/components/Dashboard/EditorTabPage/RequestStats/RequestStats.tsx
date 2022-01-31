import React from 'react';
import { Flex, FlexProps } from 'reflexy';
import classNames from 'classnames';
import { Statistics, humanSize } from 'services/api/DataDecorator';
import css from './RequestStats.css';

interface Props extends FlexProps, Statistics {}

export default function RequestStats({
  timeElapsed,
  rowsRead,
  bytesRead,
  className,
  ...rest
}: Props) {
  return (
    <Flex alignItems="center" className={classNames(css.root, className)} {...rest}>
      <div className={css.time}>{timeElapsed.toFixed(2)}</div>
      <div className={css.rows}>
        {rowsRead.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </div>
      <div className={css.bytes}>{humanSize(bytesRead)}</div>
    </Flex>
  );
}
