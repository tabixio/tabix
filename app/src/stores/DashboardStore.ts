import { observable, action } from 'mobx';
import { Option, None } from 'funfix-core';
import { LocalUIStore } from '@vzh/mobx-stores';
import { Api, ServerStructure } from 'services';
import RootStore from './RootStore';
import ApiRequestableStore from './ApiRequestableStore';

export interface Tab {
  id: string;
  title: string;
  content: string;
}

export default class DashboardStore extends ApiRequestableStore {
  @observable
  serverStructure: Option<ServerStructure.Structure> = None;

  @observable
  tabs: Tab[] = [
    {
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
    },
    {
      id: '2',
      title: 'SQL 2',
      content: '',
    },
  ];

  constructor(rootStore: RootStore, uiState: LocalUIStore<RootStore>, initialState: any) {
    super(rootStore, uiState);
    initialState && console.log(initialState);
  }

  @action
  loadData() {
    this.request(async () => {
      const api = new Api(this.rootStore.appStore.connection.get());
      await api.init();
      return api.getDatabaseStructure();
    }).then(r =>
      r.forEach(result => {
        console.log(result);
        this.serverStructure = Option.of(result);
      })
    );
  }
}
