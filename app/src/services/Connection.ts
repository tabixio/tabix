import { Omit } from 'typelevel-ts';
import { ConnectionMode } from '../models';

export interface ConnectionLike {
  uuid?: string;
  connectionName: string;
  connectionUrl: string;
  username: string;
  password: string;
  version: string;
  mode?: ConnectionMode;
}

export enum ConnectionType {
  Direct = 'direct',
  Server = 'server',
}

export interface DirectConnection extends ConnectionLike {
  type: string;
  params?: string;
}

export interface ServerConnection extends ConnectionLike {
  type: string;
  configKey?: string;
}

type Connection = DirectConnection | ServerConnection;

export type ConnectionInit = Partial<Omit<Connection, 'type'>> & Pick<Connection, 'type'>;

export function isDirectConnection(connection: ConnectionInit): connection is DirectConnection {
  return connection.type === ConnectionType.Direct;
}

// Just to avoid warnings when reexporting types when compile with webpack and tsc module option is 'esnext'.
const Connection = {};

export default Connection;
