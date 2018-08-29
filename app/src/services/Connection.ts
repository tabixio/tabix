import { Omit } from 'typelevel-ts';

export interface IConnection {
  connectionName: string;
  connectionUrl: string;
  username: string;
  password: string;
}

export enum ConnectionType {
  direct = 'direct',
  server = 'server',
}

export interface DirectConnection extends IConnection {
  type: ConnectionType.direct;
  params?: string;
}

export interface ServerConnection extends IConnection {
  type: ConnectionType.server;
  configKey?: string;
}

export type Connection = DirectConnection | ServerConnection;

export function isDirectConnection(
  connection: Partial<Omit<Connection, 'type'>> & Pick<Connection, 'type'>
): connection is DirectConnection {
  return connection.type === ConnectionType.direct;
}
