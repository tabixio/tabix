import { observable } from 'mobx';
import { None } from 'funfix-core';
import { required } from 'valtors';
import { ValidableStoreModel, SerializableModel, JSONModel } from '@vzh/mobx-stores';
import {
  IConnection,
  Connection,
  DirectConnection,
  ServerConnection,
  isDirectConnection,
  ConnectionType,
  PartialConnection,
} from 'services';

export abstract class BaseConnectionModel<T extends Connection> extends ValidableStoreModel<T>
  implements IConnection, SerializableModel<T> {
  @required()
  @observable
  connectionName: string = '';

  @required()
  @observable
  connectionUrl: string = '';

  @required()
  @observable
  username: string = '';

  @required()
  @observable
  password: string = '';

  abstract toJSON(): JSONModel<T>;
}

export class DirectConnectionModel extends BaseConnectionModel<DirectConnection>
  implements DirectConnection {
  type: ConnectionType.direct = ConnectionType.direct;

  @observable
  params?: string;

  constructor(connection: Partial<DirectConnection>) {
    super({
      type: { error: None },
      connectionName: { error: None },
      connectionUrl: { error: None },
      username: { error: None },
      password: { error: None },
      params: { error: None },
    });

    this.connectionName = connection.connectionName || '';
    this.connectionUrl = connection.connectionUrl || '';
    this.username = connection.username || '';
    this.password = connection.password || '';
    this.params = connection.params;
  }

  toJSON(): JSONModel<DirectConnection> {
    return {
      type: this.type,
      connectionName: this.connectionName,
      connectionUrl: this.connectionUrl,
      username: this.username,
      password: this.password,
      params: this.params,
    };
  }
}

export class ServerConnectionModel extends BaseConnectionModel<ServerConnection>
  implements ServerConnection {
  type: ConnectionType.server = ConnectionType.server;

  @observable
  configKey?: string;

  constructor(connection: Partial<ServerConnection>) {
    super({
      type: { error: None },
      connectionName: { error: None },
      connectionUrl: { error: None },
      username: { error: None },
      password: { error: None },
      configKey: { error: None },
    });

    this.connectionName = connection.connectionName || '';
    this.connectionUrl = connection.connectionUrl || '';
    this.username = connection.username || '';
    this.password = connection.password || '';
    this.configKey = connection.configKey;
  }

  toJSON(): JSONModel<ServerConnection> {
    return {
      type: this.type,
      connectionName: this.connectionName,
      connectionUrl: this.connectionUrl,
      username: this.username,
      password: this.password,
      configKey: this.configKey,
    };
  }
}

const ConnectionModel = {
  // Can edited and saved
  DirectEmpty: new DirectConnectionModel({ type: ConnectionType.direct }),
  ServerEmpty: new ServerConnectionModel({ type: ConnectionType.server }),

  of(connection: PartialConnection) {
    if ((connection as ConnectionModel).changeField) {
      return connection as ConnectionModel;
    }

    return isDirectConnection(connection)
      ? new DirectConnectionModel(connection)
      : new ServerConnectionModel(connection);
  },
};

type ConnectionModel = DirectConnectionModel | ServerConnectionModel;

export default ConnectionModel;
