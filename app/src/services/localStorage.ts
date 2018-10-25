import { Option, None, Try } from 'funfix-core';
import { Tab, TabJsonModel } from 'models';
import { JSONModel } from '@vzh/mobx-stores';
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

export function saveActiveTabId(id?: string) {
  try {
    if (!id) window.localStorage.removeItem(`${tabsKey}.active`);
    else window.localStorage.setItem(`${tabsKey}.active`, JSON.stringify(id));
  } catch (e) {
    console.error(e);
  }
}

export function getActiveTabId(): Option<string> {
  try {
    const value = window.localStorage.getItem(`${tabsKey}.active`);
    return Option.of(value ? JSON.parse(value) : undefined);
  } catch (e) {
    console.error(e);
    return None;
  }
}

export function saveTabs(tabs: ReadonlyArray<Tab>) {
  try {
    tabs.forEach(saveTab);
    const ids = tabs.map(t => t.id);
    window.localStorage.setItem(`${tabsKey}.ids`, JSON.stringify(ids));
    console.log('Tabs saved at', new Date().toISOString());
  } catch (e) {
    console.error(e);
  }
}

export function getTabs(): Try<JSONModel<ReadonlyArray<TabJsonModel>>> {
  return Try.of(() => {
    const ids: string[] = JSON.parse(window.localStorage.getItem(`${tabsKey}.ids`) || '');
    const tabs = ids.reduce(
      (acc, id) => {
        const value = window.localStorage.getItem(`${tabsKey}.${id}`);
        return value ? acc.concat(JSON.parse(value)) : acc;
      },
      [] as JSONModel<TabJsonModel[]>
    );
    return tabs;
  });
}
