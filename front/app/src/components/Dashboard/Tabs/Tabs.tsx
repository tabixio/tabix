import React from 'react';
import { Tabs as AntdTabs } from 'antd';
import { TabsProps as AntdTabsProps } from 'antd/lib/tabs';
import ActionsMenu, { ActionsMenuProps } from './ActionsMenu';
import css from './Tabs.css';

interface TabsProps extends AntdTabsProps, ActionsMenuProps {}

export const Tabs: React.FC<TabsProps> = ({
  tabBarExtraContent,
  className,
  type,
  onMenuAction,
  ...rest
}) => (
  <AntdTabs
    type="editable-card"
    className={css.root}
    tabBarExtraContent={<ActionsMenu onMenuAction={onMenuAction} />}
    {...rest}
  />
);

export const TabsTabPane = AntdTabs.TabPane;
