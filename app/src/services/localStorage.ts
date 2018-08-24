import Connection from './Connection';

const storageKey = 'tabix.connections';

export function getConnections(): Connection[] {
  try {
    const connections = JSON.parse(window.localStorage.getItem(storageKey) || null);
    return connections;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function saveConnections(connections: Connection[]) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(connections));
  } catch (e) {
    console.error(e);
  }
}
