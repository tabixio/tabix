import { LocalUIStore, JSONModel } from '@vzh/mobx-stores';
import AppStore from './AppStore';
import SignInStore from './SignInStore';
import DashboardStore from './DashboardStore';

export default class RootStore {
  readonly appStore: AppStore;

  readonly signInStore: SignInStore;

  readonly dashboardStore: DashboardStore;

  // readonly SqlEditorStore: SqlEditorStore;

  constructor(initialState: Partial<JSONModel<RootStore>> = {}) {
    console.log('initialState', initialState);

    this.appStore = new AppStore(this, new LocalUIStore(this), initialState.appStore);

    this.signInStore = new SignInStore(this, new LocalUIStore(this), initialState.signInStore);

    this.dashboardStore = new DashboardStore(
      this,
      new LocalUIStore(this),
      initialState.dashboardStore
    );
  }
}
