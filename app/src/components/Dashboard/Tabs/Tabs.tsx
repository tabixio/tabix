import React from 'react';
import { Tabs as AntdTabs } from 'antd';
import { TabsProps as AntdTabsProps } from 'antd/lib/tabs';
import ActionsMenu, { ActionsMenuProps } from './ActionsMenu';
import css from './Tabs.css';

interface TabsProps extends AntdTabsProps, ActionsMenuProps {}

export default function Tabs({
  tabBarExtraContent,
  className,
  type,
  onMenuAction,
  ...rest
}: TabsProps) {
  return (
    <AntdTabs
      type="editable-card"
      className={css.root}
      tabBarExtraContent={<ActionsMenu onMenuAction={onMenuAction} />}
      {...rest}
    />
  );
}

Tabs.TabPane = AntdTabs.TabPane;
