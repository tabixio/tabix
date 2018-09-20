import { Option, None } from 'funfix-core';
import { Tab } from 'models';
import Connection from './Connection';

const storageKey = 'tabix';
const connectionListKey = `${storageKey}.connection.list`;
const lastActiveKey = `${storageKey}.connection.lastActive`;
const tabsKey = `${storageKey}.tabs`;

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

export function saveTab(tab: Tab) {
  try {
    window.localStorage.setItem(`${tabsKey}.${tab.id}`, JSON.stringify(tab));
  } catch (e) {
    console.error(e);
  }
}
