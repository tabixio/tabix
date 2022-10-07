import React, { useCallback } from 'react';
import { Flex } from 'reflexy';

import {
  DownOutlined,
  PushpinOutlined,
  PushpinFilled,
  FullscreenOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown, Button, Space } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import css from './Actions.css';

export enum ActionType {
  TogglePin = 1,
  Fullscreen = 2,
  Export = 3,
}

export interface ActionsProps {
  pinned?: boolean;
  onAction: (action: ActionType, subType?: string) => void;
}

export default function Actions({ pinned, onAction }: ActionsProps) {
  const onTogglePin = useCallback(() => onAction(ActionType.TogglePin), [onAction]);
  const onToggleFullScreen = useCallback(() => onAction(ActionType.Fullscreen), [onAction]);
  const onClickExportMenu = useCallback(
    ({ key }: MenuInfo) => onAction(ActionType.Export, key),
    [onAction]
  );
  // Pin
  let pinIcon = <PushpinOutlined onClick={onTogglePin} />;
  if (pinned) {
    pinIcon = <PushpinFilled onClick={onTogglePin} />;
  }

  const exportMenu = (
    <Menu onClick={onClickExportMenu}>
      <Menu.Item key="CSVHeaders">CSV with headers</Menu.Item>
      <Menu.Item key="CSV">CSV without headers</Menu.Item>
      <Menu.Item key="TSVHeaders">TSV with headers</Menu.Item>
      <Menu.Item key="TSV">TSV without headers</Menu.Item>
    </Menu>
  );

  return (
    <Flex grow hfill alignItems="center" justifyContent="flex-end" className={css.root}>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown overlay={exportMenu}>
            <DownloadOutlined />
          </Dropdown>
          {pinIcon}

          <FullscreenOutlined onClick={onToggleFullScreen}></FullscreenOutlined>
        </Space>
      </Space>
    </Flex>
  );
}
