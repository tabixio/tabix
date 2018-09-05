import React from 'react';
import { Icon } from 'antd';
import { Flex } from 'reflexy';
import css from './RootTitle.css';

// export interface Props {
export interface RootTitleProps {
  title: string;
  onReload?: () => void;
}

export default function RootTitle({ title, onReload }: RootTitleProps) {
  return (
    <Flex alignItems="center" hfill className={css.root}>
      <Icon type="home" theme="outlined" />
      <div>{title}</div>
      <Flex grow justifyContent="flex-end">
        <Icon type="reload" theme="outlined" title="Reload" onClick={onReload} />
      </Flex>
    </Flex>
  );
}
