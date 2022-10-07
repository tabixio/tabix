import { observable, action } from 'mobx';
import { UIStore, BaseRootStore } from 'module/mobx-utils';
import { Connection } from 'services';
import AppStore from './AppStore';
import SignInStore from './SignInStore';
import DashboardUIStore from './DashboardUIStore';
import SqlHistoryStore from './SqlHistoryStore';
import TreeStore from './TreeStore';
import TabsStore from './TabsStore';

export default class RootStore extends BaseRootStore {
  @observable
  appStore: AppStore;

  @observable
  signInStore: SignInStore;

  @observable
  treeStore: TreeStore;

  @observable
  tabsStore: TabsStore;

  @observable
  sqlHistoryStore: SqlHistoryStore;

  constructor() {
    super();
    this.appStore = new AppStore(this, new UIStore(this));
    this.signInStore = new SignInStore(this, new UIStore(this));
    const dashboardUIStore = new DashboardUIStore(this);
    this.treeStore = new TreeStore(this, dashboardUIStore);
    this.tabsStore = new TabsStore(this, dashboardUIStore);
    this.sqlHistoryStore = new SqlHistoryStore(this, new UIStore(this));
    this.initialize();
  }

  // After hot update and rerender App will dispose all stores,
  // so we need to reinitialize them in order to work all mobx reactions.
  @action.bound
  reinitialize() {
    this.dispose();
    this.initialize();
  }

  // refactor: temporary for HMR
  @action
  updateChildStores(nextRootStore: RootStore, connection?: Connection) {
    this.dispose();
    this.appStore = nextRootStore.appStore;
    this.signInStore = nextRootStore.signInStore;
    this.treeStore = nextRootStore.treeStore;
    this.tabsStore = nextRootStore.tabsStore;
    this.sqlHistoryStore = nextRootStore.sqlHistoryStore;
    connection && !this.appStore.isLoggedIn && this.appStore.initApi(connection);
  }
}
