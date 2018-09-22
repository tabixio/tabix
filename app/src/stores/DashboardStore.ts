import { observable, action, runInAction } from 'mobx';
import { Option, None, Some } from 'funfix-core';
import uuid from 'uuid';
import { Api, ServerStructure, localStorage } from 'services';
import { DashboardUIStore } from 'stores';
import { TabModel } from 'models';
import RootStore from './RootStore';
import ApiRequestableStore from './ApiRequestableStore';

export default class DashboardStore extends ApiRequestableStore<DashboardUIStore> {
  @observable
  serverStructure: Option<ServerStructure.Structure> = None;

  @observable
  tabs: TabModel[] = [];
  //   new TabModel({
  //     id: '1',
  //     title: 'SQL 1',
  //     content: `@@LANGID select * from  ABSOLUTE 1234 ALL COUNT COUNT() -- type your code...
  //     ;;
  //       SELECT
  //       use_news_ctp,
  //       round(use_news_ctp*1.9,2) as show_CTP
  //       FROM
  //       model.history_model_22_news
  //       WHERE
  //       event_date>=today()-1
  //       AND
  //       news_id IN (4724145)
  //       ORDER BY event_time desc
  //       LIMIT 100
  //      `,
  //     currentDatabase: Some('ads'),
  //   }),
  //   new TabModel({
  //     id: '2',
  //     title: 'SQL 2',
  //     content: '',
  //     currentDatabase: Some('default'),
  //   }),
  // ];

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
      const api = new Api(this.rootStore.appStore.connection.get());
      await api.init();
      return api.getDatabaseStructure();
    });

    // console.log(t.orUndefined());
    t.forEach(result => {
      runInAction(() => {
        this.serverStructure = Option.of(result);
        if (!this.tabs.length) {
          this.addNewTab();
        }
      });
    });
  }

  @action
  setActiveTab(id: string) {
    this.activeTab = Option.of(this.tabs.find(_ => _.id === id));
  }

  // todo: fix if name already exists
  private getNewTabName = () => `SQL ${this.tabs.length + 1}`;

  @action
  addNewTab() {
    const newTab = new TabModel({
      id: uuid(),
      title: this.getNewTabName(),
      content: '',
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
}
