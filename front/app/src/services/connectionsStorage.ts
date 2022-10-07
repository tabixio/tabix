import { Option, None } from 'funfix-core';
import appStorage from './appStorage';
import Connection from './Connection';
import { v4 as UUIDv4 } from 'uuid';

const key = 'connections';
const lastActiveKey = `${key}.lastActive`;

export async function get(): Promise<Connection[]> {
  try {
    let list = await appStorage.getItem<Connection[]>(key);
    // filter for dublicate by connectionName
    list = list.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.connectionName === value.connectionName)
    );

    list.map((d) => (d.uuid = UUIDv4()));
    return list || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function saveConnections(connections: ReadonlyArray<Connection>) {
  try {
    // console.log('appStorage->saveConnections', connections);
    await appStorage.setItem(key, connections);
  } catch (e) {
    console.error(e);
  }
}

export async function getLastActiveConnection(): Promise<Option<Connection>> {
  try {
    const name = await appStorage.getItem<string | null>(lastActiveKey);
    if (!name) return None;
    const lastConnection = (await get()).find((c) => c.connectionName === name);
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
