import { Option, None } from 'funfix-core';
import appStorage from './appStorage';
import Connection from './Connection';

const key = 'connections';
const lastActiveKey = `${key}.lastActive`;

export async function get(): Promise<Connection[]> {
  try {
    const list = await appStorage.getItem<Connection[]>(key);
    return list || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function saveConnections(connections: ReadonlyArray<Connection>) {
  try {
    await appStorage.setItem(key, connections);
  } catch (e) {
    console.error(e);
  }
}

export async function getLastActiveConnection(): Promise<Option<Connection>> {
  try {
    const name = await appStorage.getItem<string | null>(lastActiveKey);
    if (!name) return None;
    const lastConnection = (await get()).find(c => c.connectionName === name);
    return Option.of(lastConnection);
  } catch (e) {
    console.error(e);
    return None;
  }
}

export async function saveLastActiveConnection(connection?: Connection) {
  try {
    if (!connection || !connection.connectionName) {
      await appStorage.removeItem(lastActiveKey);
      return;
    }
    await appStorage.setItem(lastActiveKey, connection.connectionName);
  } catch (e) {
    console.error(e);
  }
}
