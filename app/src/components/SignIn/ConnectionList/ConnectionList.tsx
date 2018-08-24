import React from 'react';
import { Flex } from 'reflexy';
import { Menu } from 'antd';
import Connection from 'services/Connection';

const connections: Connection[] = [
  {
    connectionName: '1',
    connectionUrl: 'url',
    username: '',
    password: '',
  },
  {
    connectionName: '2',
    connectionUrl: 'url',
    username: '',
    password: '',
  },
  {
    connectionName: '3',
    connectionUrl: 'url',
    username: '',
    password: '',
  },
];

export default class ConnectionList extends React.Component {
  render() {
    return (
      <Menu theme="dark" mode="inline">
        {connections.map(c => (
          <Menu.Item key={c.connectionName}>
            <Flex column>
              <h2>{c.connectionName}</h2>
              <h3>{c.connectionUrl}</h3>
            </Flex>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
