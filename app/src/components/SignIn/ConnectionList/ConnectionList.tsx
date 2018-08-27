import React from 'react';
import { Flex } from 'reflexy';
import { Menu } from 'antd';
import { Connection } from 'services';
import css from './ConnectionList.css';

export interface Props {
  connections: Connection[];
}

export default function ConnectionList({ connections }: Props) {
  return (
    <Menu theme="dark" mode="inline" className={css['root']}>
      {connections.map(c => (
        <Menu.Item key={c.connectionName}>
          <Flex column>
            <div className={css['title']}>{c.connectionName}</div>
            <div className={css['subtitle']}>{c.connectionUrl}</div>
          </Flex>
        </Menu.Item>
      ))}
    </Menu>
  );
}
