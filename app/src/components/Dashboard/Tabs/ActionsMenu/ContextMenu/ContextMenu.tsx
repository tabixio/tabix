import React from 'react';
import { Menu } from 'antd';
import Icon from '@ant-design/icons';
import { MenuProps } from 'antd/lib/menu';

import { SettingOutlined, QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons';
export enum ActionType {
  SignOut = 1,
  Settings,
  Help,
}

export default function ContextMenu(props: MenuProps) {
  return (
    <Menu theme="dark" mode="vertical" {...props}>
      <Menu.Item key={ActionType.Settings}>
        <SettingOutlined />
        <span>Settings</span>
      </Menu.Item>

      <Menu.Item key={ActionType.Help}>
        <QuestionCircleOutlined />
        <span>Help</span>
      </Menu.Item>

      <Menu.Item key={ActionType.SignOut}>
        <LogoutOutlined />
        <span>Sign Out</span>
      </Menu.Item>
    </Menu>
  );
}
