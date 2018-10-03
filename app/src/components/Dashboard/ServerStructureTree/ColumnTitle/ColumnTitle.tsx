import React from 'react';
import { Flex } from 'reflexy';
import css from './ColumnTitle.css';

interface Props {
  name: string;
  type: string;
}

export default function ColumnTitle({ name, type }: Props) {
  return (
    <Flex alignItems="center" hfill>
      <div className={css.name}>{name}</div>
      <Flex grow justifyContent="flex-end" className={css.type}>
        {type}
      </Flex>
    </Flex>
  );
}
