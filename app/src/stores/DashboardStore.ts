import { observable, action, runInAction } from 'mobx';
import { Option, None, Some } from 'funfix-core';
import { Api, ServerStructure, localStorage } from 'services';
import { DashboardUIStore } from 'stores';
import { TabModel } from 'models';
import RootStore from './RootStore';
import ApiRequestableStore from './ApiRequestableStore';

export default class DashboardStore extends ApiRequestableStore<DashboardUIStore> {
  @observable
  serverStructure: Option<ServerStructure.Structure> = None;

  @observable
  tabs: TabModel[] = [
    TabModel.from({
      title: 'SQL 1',
      content: `SELECT * from default.arrays_test_ints`,
      currentDatabase: Some('default'),
    }),
  ];

  @observable
  activeTab: Option<TabModel> = Option.of(this.tabs.length ? this.tabs[0] : undefined);

  // constructor(rootStore: RootStore, uiStore: UIStore<RootStore>, initialState: any) {
  constructor(rootStore: RootStore, uiStore: DashboardUIStore, initialState: any) {
    super(rootStore, uiStore);
    initialState && console.log(initialState);
  }

  @action
  async loadData() {
    const t = await this.request(async () => {
      const api = await Api.connect(this.rootStore.appStore.connection.get());
      return api.loadDatabaseStructure();
    });

    t.forEach(result =>
      runInAction(() => {
        this.serverStructure = Option.of(result);
        if (!this.tabs.length) {
          this.addNewTab();
        }
      })
    );
  }

  @action
  setActiveTab(id: string) {
    this.activeTab = Option.of(this.tabs.find(_ => _.id === id));
  }

  // todo: fix if name already exists
  private getNewTabName = () => `SQL ${this.tabs.length + 1}`;

  @action
  addNewTab() {
    const newTab = TabModel.from({
      title: this.getNewTabName(),
      currentDatabase: this.activeTab
        .flatMap(t => t.currentDatabase)
        .orElse(this.serverStructure.map(s => s.databases[0]).map(d => d.name)),
    });
    this.tabs = this.tabs.concat(newTab);
    this.activeTab = Some(newTab);
  }

  @action.bound
  removeTab(id: string) {
    this.tabs = this.tabs.filter(t => t.id !== id);
    this.activeTab = Option.of(this.tabs[this.tabs.length - 1]);
  }

  @action.bound
  saveEditedTab() {
    this.uiStore.editedTab.forEach(tab => {
      this.request(async () => {
        tab.submit();
        localStorage.saveTab(tab.model);
        this.uiStore.hideSaveModal();
      });
    });
  }

  execCode() {
    // if (this.activeTab.isEmpty() || this.activeTab.get().currentDatabase.isEmpty()) return; // ??

    this.activeTab.forEach(async tab => {
      const t = await this.request(async () => {
        const api = await Api.connect(this.rootStore.appStore.connection.get());
        return api.fetch(tab.content, tab.currentDatabase.get());
      });

      t.forEach(result =>
        runInAction(() => {
          tab.data = Option.of(result);
        })
      );
    });
  }
}
