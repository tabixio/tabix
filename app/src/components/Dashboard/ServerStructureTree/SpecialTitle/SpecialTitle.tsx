import React from 'react';
import { Icon } from 'antd';
import { Flex } from 'reflexy';
import css from './SpecialTitle.css';

interface Props {
  name: string;
}

export default function SpecialTitle({ name }: Props) {
  return (
    <Flex alignItems="center" hfill className={css.root}>
      <Icon type="control" theme="outlined" />
      <div>{name}</div>
      <Flex grow justifyContent="flex-end" />
    </Flex>
  );
}
