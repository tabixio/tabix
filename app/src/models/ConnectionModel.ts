import { observable } from 'mobx';
import { None } from 'funfix-core';
import { required } from 'valtors';
import { ValidableStoreModel, SerializableModel, JSONModel } from 'module/mobx-utils';
import {
  ConnectionLike,
  Connection,
  DirectConnection,
  ServerConnection,
  isDirectConnection,
  ConnectionType,
  ConnectionInit,
} from 'services';

export enum ConnectionMode {
  'normal' = 'normal',
  'readOnly' = 'readOnly',
}

export abstract class BaseConnectionModel<T extends Connection>
  extends ValidableStoreModel<T>
  implements ConnectionLike, SerializableModel<T>
{
  @required()
  @observable
  connectionName = '';

  @required()
  @observable
  connectionUrl = '';

  @required()
  @observable
  username = '';

  @observable
  password = '';

  version = '';

  abstract toJSON(): JSONModel<T>;
}

export class DirectConnectionModel
  extends BaseConnectionModel<DirectConnection>
  implements DirectConnection
{
  uuid = '';

  type: ConnectionType.Direct = ConnectionType.Direct;

  @observable
  params?: string;

  @observable
  mode?: ConnectionMode;

  constructor({
    connectionName = '',
    connectionUrl = '',
    username = '',
    password = '',
    mode = ConnectionMode.normal,
    params,
  }: Partial<DirectConnection>) {
    super({
      uuid: { error: None },
      type: { error: None },
      connectionName: { error: None },
      connectionUrl: { error: None },
      username: { error: None },
      password: { error: None },
      mode: { error: None },
      params: { error: None },
      version: { error: None },
    });
    this.connectionName = connectionName;
    this.connectionUrl = connectionUrl;
    this.username = username;
    this.password = password;
    //
    this.mode =
      mode === undefined
        ? ConnectionMode.normal
        : mode !== ConnectionMode.readOnly
        ? ConnectionMode.normal
        : ConnectionMode.readOnly;
    this.params = params;
  }

  setConnectionName(name: string) {
    this.connectionName = name;
  }

  toJSON(): JSONModel<DirectConnection> {
    return {
      type: this.type,
      connectionName: this.connectionName,
      connectionUrl: this.connectionUrl,
      username: this.username,
      password: this.password,
      params: this.params,
      mode: this.mode,
      version: this.version,
    };
  }
}

export class ServerConnectionModel
  extends BaseConnectionModel<ServerConnection>
  implements ServerConnection
{
  uuid = '';

  type: ConnectionType.Server = ConnectionType.Server;

  @observable
  configKey?: string;

  constructor({
    connectionName = '',
    connectionUrl = '',
    username = '',
    password = '',
    configKey,
  }: Partial<ServerConnection>) {
    super({
      uuid: { error: None },
      type: { error: None },
      connectionName: { error: None },
      connectionUrl: { error: None },
      username: { error: None },
      password: { error: None },
      mode: { error: None },
      configKey: { error: None },
      version: { error: None },
    });

    this.connectionName = connectionName;
    this.connectionUrl = connectionUrl;
    this.username = username;
    this.password = password;
    this.configKey = configKey;
  }

  toJSON(): JSONModel<ServerConnection> {
    return {
      type: this.type,
      connectionName: this.connectionName,
      connectionUrl: this.connectionUrl,
      username: this.username,
      password: this.password,
      configKey: this.configKey,
      version: this.version,
    };
  }
}

const ConnectionModel = {
  // Can edited and saved
  DirectEmpty: new DirectConnectionModel({ type: ConnectionType.Direct }),
  ServerEmpty: new ServerConnectionModel({ type: ConnectionType.Server }),

  of(connection: ConnectionInit) {
    if ((connection as ConnectionModel).changeField) {
      return connection as ConnectionModel;
    }
    // Ds

    return isDirectConnection(connection)
      ? new DirectConnectionModel(connection)
      : new ServerConnectionModel(connection);
  },
};

type ConnectionModel = DirectConnectionModel | ServerConnectionModel;

export default ConnectionModel;
