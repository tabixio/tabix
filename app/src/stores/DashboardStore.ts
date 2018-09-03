import { observable, action } from 'mobx';
import { Option, None } from 'funfix-core';
import { LocalUIStore } from '@vzh/mobx-stores';
import { Api } from 'services';
import DatabaseStructure from 'services/api/DatabaseStructure';
import RootStore from './RootStore';
import ApiRequestableStore from './ApiRequestableStore';

export default class DashboardStore extends ApiRequestableStore {
  @observable
  databaseStructure: Option<DatabaseStructure> = None;

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
        this.databaseStructure = Option.of(result);
      })
    );
  }
}
