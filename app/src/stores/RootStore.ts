import { LocalUIStore, JSONModel } from '@vzh/mobx-stores';
import DirectSignInStore from './DirectSignInStore';
import ServerSignInStore from './ServerSignInStore';
import AppStore from './AppStore';

export default class RootStore {
  readonly appStore: AppStore;

  readonly directSignInStore: DirectSignInStore;

  readonly serverSignInStore: ServerSignInStore;

  constructor(initialState: Partial<JSONModel<RootStore>> = {}) {
    console.log('initialState', initialState);

    this.appStore = new AppStore(this, new LocalUIStore(this), initialState.appStore);

    this.directSignInStore = new DirectSignInStore(
      this,
      new LocalUIStore(this),
      initialState.directSignInStore
    );
    this.directSignInStore.model.connectionName = 'test';
    this.directSignInStore.model.connectionUrl = 'http://148.251.39.212:8123/';
    this.directSignInStore.model.username = 'default';
    this.directSignInStore.model.password = 'Tkd453EWStHRE';

    this.serverSignInStore = new ServerSignInStore(
      this,
      new LocalUIStore(this),
      initialState.serverSignInStore
    );
  }
}
