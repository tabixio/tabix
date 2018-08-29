import { LocalUIStore, JSONModel } from '@vzh/mobx-stores';
import SignInStore from './SignInStore';
import AppStore from './AppStore';

export default class RootStore {
  readonly appStore: AppStore;

  readonly signInStore: SignInStore;

  constructor(initialState: Partial<JSONModel<RootStore>> = {}) {
    console.log('initialState', initialState);

    this.appStore = new AppStore(this, new LocalUIStore(this), initialState.appStore);

    this.signInStore = new SignInStore(this, new LocalUIStore(this), initialState.signInStore);
  }
}
