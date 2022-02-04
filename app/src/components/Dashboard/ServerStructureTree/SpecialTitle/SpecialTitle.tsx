import React from 'react';
import { Flex } from 'reflexy';
import css from './SpecialTitle.css';
import { MessageOutlined, ControlOutlined } from '@ant-design/icons';

interface Props {
  name: string;
  type: string;
}

export default function SpecialTitle({ name, type }: Props) {
  let icon = <MessageOutlined />;
  if (type === 'server.overview') icon = <ControlOutlined />;

  return (
    <Flex alignItems="center" hfill className={css.root}>
      {icon}
      <div>{name}</div>
      <Flex grow justifyContent="flex-end" />
    </Flex>
  );
}
