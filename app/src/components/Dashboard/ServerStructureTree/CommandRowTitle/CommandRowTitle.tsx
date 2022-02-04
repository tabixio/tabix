import React, { useCallback } from 'react';
import { Tooltip } from 'antd';
import Icon from '@ant-design/icons';
import { Flex } from 'reflexy';
import { ServerStructure } from 'services';
import css from './CommandRowTitle.css';

export enum RowActionTypeAction {
  DoubleClick = 1,
  Click = 2,
}

export interface CommandRowProps {
  command: ServerStructure.SpecialItem;
  onAction?: (action: RowActionTypeAction, column: ServerStructure.SpecialItem) => void;
}

export default function CommandRowTitle({ command, onAction }: CommandRowProps) {
  const handleDoubleClick = useCallback(
    () => onAction && onAction(RowActionTypeAction.DoubleClick, command),
    [command, onAction]
  );
  const handleClick = useCallback(
    () => onAction && onAction(RowActionTypeAction.Click, command),
    [command, onAction]
  );
  const br = '\n';
  return (
    <Tooltip title={`${command.name}${br} ${br}${br} `} placement="right">
      <Flex alignItems="center" hfill onDoubleClick={handleDoubleClick}>
        <Icon type="check" theme="outlined" />
        <div className={css.name} onClick={handleClick}>
          {command.name}
        </div>
        <Flex grow justifyContent="flex-end" className={css.type} />
      </Flex>
    </Tooltip>
  );
}
