import React from 'react';
import { Omit } from 'typelevel-ts';
import { Tabs as AntdTabs } from 'antd';
import { TabsProps as AntdTabsProps } from 'antd/lib/tabs';
import Actions, { ActionsProps } from './Actions';

interface TabsProps
  extends Omit<AntdTabsProps, 'tabBarExtraContent' | 'className' | 'type'>,
    ActionsProps {}

export const Tabs: React.FC<TabsProps> = ({ pinned, onAction, ...rest }) => (
  <AntdTabs
    type="card"
    animated={false}
    tabBarExtraContent={<Actions pinned={pinned} onAction={onAction} />}
    {...rest}
  />
);
export const TabsTabPane = AntdTabs.TabPane;
