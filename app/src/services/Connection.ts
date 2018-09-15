import { Omit } from 'typelevel-ts';

export interface ConnectionLike {
  connectionName: string;
  connectionUrl: string;
  username: string;
  password: string;
}

export enum ConnectionType {
  direct = 'direct',
  server = 'server',
}

export interface DirectConnection extends ConnectionLike {
  type: ConnectionType.direct;
  params?: string;
}

export interface ServerConnection extends ConnectionLike {
  type: ConnectionType.server;
  configKey?: string;
}

type Connection = DirectConnection | ServerConnection;

export type PartialConnection = Partial<Omit<Connection, 'type'>> & Pick<Connection, 'type'>;

export function isDirectConnection(connection: PartialConnection): connection is DirectConnection {
  return connection.type === ConnectionType.direct;
}

// Just to avoid warnings when reexporting types when compile with webpack and tsc module option is 'esnext'.
const Connection = {};

export default Connection;
