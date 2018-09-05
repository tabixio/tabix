import React from 'react';
import { Icon } from 'antd';
import { Flex } from 'reflexy';
import css from './TableTitle.css';

interface Props {
  name: string;
}

export default function TableTitle({ name }: Props) {
  return (
    <Flex alignItems="center" hfill className={css.root}>
      <Icon type="table" theme="outlined" />
      <div>{name}</div>
    </Flex>
  );
}
