import { Option, None, Some } from 'funfix-core';
import Connection from './Connection';

const storageKey = 'tabix.connection';
const connectionListKey = `${storageKey}.list`;
// const lastActiveKey = `${storageKey}.lastActive`;

export function getConnections(): Connection[] {
  try {
    // return Option.of(window.localStorage.getItem(connectionListKey))
    //   .map(JSON.parse)
    //   .getOrElse([]);
    return [
      {
        connectionName: 'test',
        connectionUrl: 'http://148.251.39.212:8123/',
        username: 'default',
        password: 'Tkd453EWStHRE',
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
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function getLastActiveConnection(): Option<Connection> {
  try {
    // return Option.of(window.localStorage.getItem(lastActiveKey)).flatMap(n =>
    //   Option.of(getConnections().find(c => c.connectionName === n))
    // );
    return Some({
      connectionName: 'test',
      connectionUrl: 'http://148.251.39.212:8123/',
      username: 'default',
      password: 'Tkd453EWStHRE',
    });
  } catch (e) {
    console.error(e);
    return None;
  }
}

export function saveConnections(connections: Connection[]) {
  try {
    window.localStorage.setItem(connectionListKey, JSON.stringify(connections));
  } catch (e) {
    console.error(e);
  }
}
