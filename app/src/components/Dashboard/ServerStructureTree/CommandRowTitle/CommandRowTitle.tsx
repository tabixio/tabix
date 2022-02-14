import React, { useCallback } from 'react';
import { Tooltip } from 'antd';
import {
  CheckOutlined,
  BranchesOutlined,
  ConsoleSqlOutlined,
  FundViewOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
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
  let icon = <CheckOutlined />;
  // <ConsoleSqlOutlined />

  if (command.command === ServerStructure.PagesCommands.Processes) icon = <BranchesOutlined />;
  if (command.command === ServerStructure.PagesCommands.Metrics) icon = <FundViewOutlined />;
  if (command.command === ServerStructure.PagesCommands.SqlHistory) icon = <ConsoleSqlOutlined />;
  if (command.command === ServerStructure.PagesCommands.ServerOverview)
    icon = <CloudDownloadOutlined />;

  const br = '\n';
  return (
    <Tooltip title={`${command.name}${br} ${br}${br} `} placement="right">
      <Flex alignItems="center" hfill onDoubleClick={handleDoubleClick}>
        {icon}
        <div className={css.name} onClick={handleClick}>
          {command.name}
        </div>
        <Flex grow justifyContent="flex-end" className={css.type} />
      </Flex>
    </Tooltip>
  );
}
