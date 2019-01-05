import React, { useCallback } from 'react';
import { Tooltip } from 'antd';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import css from './ColumnTitle.css';

export enum ColumnAction {
  DoubleClick = 1,
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
  const br = '\n';
  return (
    <Tooltip
      title={`${column.name}${br}${column.type}${br}${br}${column.defaultType}`}
      placement="right"
    >
      <Flex alignItems="center" hfill onDoubleClick={handleDoubleClick}>
        <div className={css.name}>{column.name}</div>
        <Flex grow justifyContent="flex-end" className={css.type}>
          {column.type.substring(0, 20)}
        </Flex>
      </Flex>
    </Tooltip>
  );
}
