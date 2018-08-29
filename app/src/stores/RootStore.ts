import { LocalUIStore, JSONModel } from '@vzh/mobx-stores';
import SignInStore from './SignInStore';
import ServerSignInStore from './ServerSignInStore';
import AppStore from './AppStore';

export default class RootStore {
  readonly appStore: AppStore;

  readonly signInStore: SignInStore;

  readonly serverSignInStore: ServerSignInStore;

  constructor(initialState: Partial<JSONModel<RootStore>> = {}) {
    console.log('initialState', initialState);

    this.appStore = new AppStore(this, new LocalUIStore(this), initialState.appStore);

    this.signInStore = new SignInStore(this, new LocalUIStore(this), initialState.signInStore);

    this.serverSignInStore = new ServerSignInStore(
      this,
      new LocalUIStore(this),
      initialState.serverSignInStore
    );
  }
}
