import React, { useCallback } from 'react';
import { Tooltip } from 'antd';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import css from './ColumnTitle.css';

export enum ColumnAction {
  DoubleClick = 1,
  Click = 2,
}

export interface ColumnTitleProps {
  column: ServerStructure.Column;
  onAction?: (action: ColumnAction, column: ServerStructure.Column) => void;
}

export default function ColumnTitle({ column, onAction }: ColumnTitleProps) {
  const handleDoubleClick = useCallback(
    () => onAction && onAction(ColumnAction.DoubleClick, column),
    [column, onAction]
  );
  const handleClick = useCallback(
    () => onAction && onAction(ColumnAction.Click, column),
    [column, onAction]
  );

  const title = (t: string): string => {
    t = t.replace('LowCardinality(', 'l(').replace('Nullable(', 'n(').replace('Array(', ' N(');

    return t.substring(0, 15);
  };
  const br = '\n\n';
  return (
    <Tooltip
      title={`${column.name}${br}${column.type}${br}${br}${column.defaultType}`}
      className={css.tooltip}
      placement="right"
    >
      <Flex alignItems="center" hfill onDoubleClick={handleDoubleClick}>
        <div className={css.name} onClick={handleClick}>
          {column.name}&nbsp;&nbsp;
        </div>
        <Flex grow justifyContent="flex-end" className={css.type}>
          {title(column.type)}
        </Flex>
      </Flex>
    </Tooltip>
  );
}
