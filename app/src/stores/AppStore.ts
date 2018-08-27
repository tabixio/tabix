import { computed, observable } from 'mobx';
import { None, Option } from 'funfix-core';
import { Omit } from 'typelevel-ts';
import { LocalUIStore, SerializableModel, JSONModel, JSONObjectModel } from '@vzh/mobx-stores';
import { Connection } from 'services';
import ApiRequestableStore from './ApiRequestableStore';
import RootStore from './RootStore';

export type AppStoreModel = Omit<AppStore, 'uiStore' | 'isLoggedIn'>;

export default class AppStore extends ApiRequestableStore
  implements SerializableModel<AppStoreModel> {
  jsonModel: AppStoreModel = this;

  constructor(
    rootStore: RootStore,
    uiState: LocalUIStore<RootStore>,
    initialState?: JSONObjectModel<AppStoreModel>
  ) {
    super(rootStore, uiState);
    if (initialState) {
      this.connection = Option.of(initialState.connection);
      this.connectionList = initialState.connectionList;
    }
  }

  @observable
  connection: Option<Connection> = None;

  @observable
  connectionList: ReadonlyArray<Connection> = [];

  @computed
  get isLoggedIn(): boolean {
    return false;
  }

  isAuthorized = () => true;

  loadData() {
    return Promise.resolve();
  }

  toJSON(): JSONModel<AppStoreModel> {
    return { connection: this.connection.orUndefined(), connectionList: this.connectionList };
  }
}
