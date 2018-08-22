import { observable } from 'mobx';
import { None } from 'funfix-core';
import { required } from 'valtors';
import { ValidableStoreModel } from '@vzh/mobx-stores';

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
  implements BaseSignInEntity {
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
}
