import React from 'react';
import { Menu, Icon } from 'antd';
import { MenuProps } from 'antd/lib/menu';

export enum ActionType {
  SignOut = 1,
  Settings,
  Help,
}

export default function ContextMenu(props: MenuProps) {
  return (
    <Menu theme="dark" mode="vertical" {...props}>
      <Menu.Item key={ActionType.Settings}>
        <Icon type="setting" theme="outlined" />
        <span>Settings</span>
      </Menu.Item>

      <Menu.Item key={ActionType.Help}>
        <Icon type="question-circle" theme="outlined" />
        <span>Help</span>
      </Menu.Item>

      <Menu.Item key={ActionType.SignOut}>
        <Icon type="logout" theme="outlined" />
        <span>Sign Out</span>
      </Menu.Item>
    </Menu>
  );
}
