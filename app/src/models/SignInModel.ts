import { observable } from 'mobx';
import { None } from 'funfix-core';
import { required } from 'valtors';
import { ValidableStoreModel, SerializableModel, JSONModel } from '@vzh/mobx-stores';

export interface BaseSignInEntity {
  connectionName: string;
  connectionUrl: string;
  username: string;
  password: string;
}

export interface DirectSignInEntity extends BaseSignInEntity {
  params?: string;
}

export interface ServerSignInEntity extends BaseSignInEntity {
  configKey?: string;
}

export abstract class BaseSignInModel<T extends BaseSignInEntity> extends ValidableStoreModel<T>
  implements BaseSignInEntity, SerializableModel<T> {
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

export class DirectSignInModel extends BaseSignInModel<DirectSignInEntity>
  implements DirectSignInEntity {
  @observable
  params?: string;

  constructor() {
    super({
      connectionName: { error: None },
      connectionUrl: { error: None },
      username: { error: None },
      password: { error: None },
      params: { error: None },
    });
  }

  toJSON(): JSONModel<DirectSignInEntity> {
    return {
      connectionName: this.connectionName,
      connectionUrl: this.connectionUrl,
      username: this.username,
      password: this.password,
      params: this.params,
    };
  }
}

export class ServerSignInModel extends BaseSignInModel<ServerSignInEntity>
  implements ServerSignInEntity {
  @observable
  configKey?: string;

  constructor() {
    super({
      connectionName: { error: None },
      connectionUrl: { error: None },
      username: { error: None },
      password: { error: None },
      configKey: { error: None },
    });
  }

  toJSON(): JSONModel<ServerSignInEntity> {
    return {
      connectionName: this.connectionName,
      connectionUrl: this.connectionUrl,
      username: this.username,
      password: this.password,
      configKey: this.configKey,
    };
  }
}
