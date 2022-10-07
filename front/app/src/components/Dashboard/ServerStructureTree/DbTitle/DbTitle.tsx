import React from 'react';
import { DatabaseOutlined } from '@ant-design/icons';
import { Flex } from 'reflexy';
import css from './DbTitle.css';

interface Props {
  name: string;
  tableCount: number;
}

export default function DbTitle({ name, tableCount }: Props) {
  return (
    <Flex alignItems="center" hfill className={css.root}>
      <DatabaseOutlined />
      <div>{name}</div>
      <Flex grow justifyContent="flex-end" style={{ fontSize: '80%' }}>
        {tableCount}
      </Flex>
    </Flex>
  );
}
