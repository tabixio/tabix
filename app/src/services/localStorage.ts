import { Option, None } from 'funfix-core';
import { Connection } from './Connection';

const storageKey = 'tabix.connection';
const connectionListKey = `${storageKey}.list`;
const lastActiveKey = `${storageKey}.lastActive`;

export function getConnections(): Connection[] {
  try {
    return Option.of(window.localStorage.getItem(connectionListKey))
      .map(JSON.parse)
      .getOrElse([]);
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function saveConnections(connections: ReadonlyArray<Connection>) {
  try {
    window.localStorage.setItem(connectionListKey, JSON.stringify(connections));
  } catch (e) {
    console.error(e);
  }
}

export function getLastActiveConnection(): Option<Connection> {
  try {
    return Option.of(window.localStorage.getItem(lastActiveKey))
      .map(str => JSON.parse(str))
      .flatMap(lastConnection =>
        Option.of(getConnections().find(c => c.connectionName === lastConnection.connectionName))
      );
  } catch (e) {
    console.error(e);
    return None;
  }
}

export function saveLastActiveConnection(connection?: Connection) {
  try {
    if (!connection) {
      window.localStorage.removeItem(lastActiveKey);
      return;
    }
    window.localStorage.setItem(lastActiveKey, JSON.stringify(connection));
  } catch (e) {
    console.error(e);
  }
}
