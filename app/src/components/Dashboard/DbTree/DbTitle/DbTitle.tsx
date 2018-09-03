import React from 'react';
import { Icon } from 'antd';
import { Flex } from 'reflexy';
import css from './DbTitle.css';

interface Props {
  dbName: string;
  tableCount: number;
}

export default function DbTitle({ dbName, tableCount }: Props) {
  return (
    <Flex alignItems="center" hfill className={css.root}>
      <Icon type="database" theme="outlined" />
      <div>{dbName}</div>
      <Flex grow justifyContent="flex-end">
        {tableCount}
      </Flex>
    </Flex>
  );
}
