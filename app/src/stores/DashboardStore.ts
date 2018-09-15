import { observable, action, runInAction } from 'mobx';
import { Option, None, Some } from 'funfix-core';
import uuid from 'uuid';
import { UIStore } from '@vzh/mobx-stores';
import { Api, ServerStructure } from 'services';
import { TabModel } from 'models';
import RootStore from './RootStore';
import ApiRequestableStore from './ApiRequestableStore';

export default class DashboardStore extends ApiRequestableStore {
  @observable
  serverStructure: Option<ServerStructure.Structure> = None;

  @observable
  tabs: TabModel[] = [
    new TabModel({
      id: '1',
      title: 'SQL 1',
      content: `@@LANGID select * from  ABSOLUTE 1234 ALL COUNT COUNT() -- type your code...
      ;;
        SELECT
        use_news_ctp,
        round(use_news_ctp*1.9,2) as show_CTP
        FROM
        model.history_model_22_news
        WHERE
        event_date>=today()-1
        AND 
        news_id IN (4724145)
        ORDER BY event_time desc
        LIMIT 100
       `,
      currentDatabase: Some('ads'),
    }),
    new TabModel({
      id: '2',
      title: 'SQL 2',
      content: '',
      currentDatabase: Some('default'),
    }),
  ];

  @observable
  activeTab: Option<TabModel> = None;

  constructor(rootStore: RootStore, uiStore: UIStore<RootStore>, initialState: any) {
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

    console.log(t.orUndefined());
    t.forEach(result => {
      runInAction(() => {
        this.serverStructure = Option.of(result);
      });
    });
  }

  private getNewTabName = () => `SQL ${this.tabs.length + 1}`;

  @action
  addNewTab() {
    const newTab = new TabModel({
      id: uuid(),
      title: this.getNewTabName(),
      content: '',
      currentDatabase: this.serverStructure.map(s => s.databases[0]).map(d => d.name),
    });
    this.tabs = this.tabs.concat(newTab);
    this.activeTab = Some(newTab);
  }

  @action
  deleteActiveTab = () => {
    if (this.tabs.length <= 1 || this.activeTab.isEmpty()) return;

    this.activeTab.forEach(({ id }) => {
      this.tabs = this.tabs.filter(t => t.id !== id);
      this.activeTab = Option.of(this.tabs[this.tabs.length - 1]);
    });
  };
}
