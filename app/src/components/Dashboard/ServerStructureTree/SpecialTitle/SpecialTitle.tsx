import React from 'react';
import Icon from '@ant-design/icons';
import { Flex } from 'reflexy';
import css from './SpecialTitle.css';

interface Props {
  name: string;
  type: string;
}

export default function SpecialTitle({ name, type }: Props) {
  let icon = 'message';
  if (type === 'server.overview') icon = 'control';

  return (
    <Flex alignItems="center" hfill className={css.root}>
      <Icon type={icon} theme="outlined" />
      <div>{name}</div>
      <Flex grow justifyContent="flex-end" />
    </Flex>
  );
}
