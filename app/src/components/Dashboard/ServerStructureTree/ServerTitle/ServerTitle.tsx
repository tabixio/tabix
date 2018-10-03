import React from 'react';
import { Icon } from 'antd';
import { Flex } from 'reflexy';
import css from './ServerTitle.css';

export interface ServerTitleProps {
  title: string;
  onReload?: () => void;
  onCollapse?: () => void;
}

export default function ServerTitle({ title, onReload, onCollapse }: ServerTitleProps) {
  return (
    <Flex alignItems="center" hfill className={css.root}>
      <Icon type="home" theme="outlined" />
      <div>{title}</div>
      <Flex grow justifyContent="flex-end">
        <Icon
          type="switcher"
          theme="outlined"
          title="Collapse"
          onClick={onCollapse}
          className={css.action}
        />
        <Icon
          type="reload"
          theme="outlined"
          title="Reload"
          onClick={onReload}
          className={css.action}
        />
      </Flex>
    </Flex>
  );
}
