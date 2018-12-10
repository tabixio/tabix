import { observable, action } from 'mobx';
import { UIStore, BaseRootStore } from '@vzh/mobx-stores';
import { Connection } from 'services';
import AppStore from './AppStore';
import SignInStore from './SignInStore';
import DashboardStore from './DashboardStore';
import DashboardUIStore from './DashboardUIStore';
import SqlHistoryStore from './SqlHistoryStore';

export default class RootStore extends BaseRootStore {
  @observable
  appStore: AppStore;

  @observable
  signInStore: SignInStore;

  @observable
  dashboardStore: DashboardStore;

  @observable
  sqlHistoryStore: SqlHistoryStore;

  constructor() {
    super();
    this.appStore = new AppStore(this, new UIStore(this));
    this.signInStore = new SignInStore(this, new UIStore(this));
    this.dashboardStore = new DashboardStore(this, new DashboardUIStore(this));
    this.sqlHistoryStore = new SqlHistoryStore(this, new UIStore(this));
    this.initialize();
  }

  // refactor: temporary for HMR
  @action
  updateChildStores(rootStore: RootStore, connection?: Connection) {
    this.dispose();
    this.appStore = rootStore.appStore;
    this.signInStore = rootStore.signInStore;
    this.dashboardStore = rootStore.dashboardStore;
    this.sqlHistoryStore = rootStore.sqlHistoryStore;
    connection && this.appStore.initApi(connection);
  }
}
