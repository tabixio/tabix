import React from 'react';
import { Icon } from 'antd';
import { Flex } from 'reflexy';
import css from './DbTitle.css';

interface Props {
  name: string;
  tableCount: number;
}

export default function DbTitle({ name, tableCount }: Props) {
  return (
    <Flex alignItems="center" hfill className={css.root}>
      <Icon type="database" theme="outlined" />
      <div>{name}</div>
      <Flex grow justifyContent="flex-end">
        {tableCount}
      </Flex>
    </Flex>
  );
}
