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

export type PartialConnection = Partial<Omit<Connection, 'type'>> & Pick<Connection, 'type'>;

export function isDirectConnection(connection: PartialConnection): connection is DirectConnection {
  return connection.type === ConnectionType.direct;
}
