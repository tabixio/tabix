import { History } from 'history';
import { computed, observable, action } from 'mobx';
import { None, Option } from 'funfix-core';
import { Omit } from 'typelevel-ts';
import { UIStore, SerializableModel, JSONModel, JSONObjectModel } from '@vzh/mobx-stores';
import { Connection, localStorage } from 'services';
import { routePaths } from 'routes';
import ApiRequestableStore from './ApiRequestableStore';
import RootStore from './RootStore';

export type AppStoreModel = Omit<AppStore, 'uiStore' | 'isLoggedIn'>;

export default class AppStore extends ApiRequestableStore
  implements SerializableModel<AppStoreModel> {
  jsonModel: AppStoreModel = this;

  constructor(
    rootStore: RootStore,
    uiStore: UIStore<RootStore>,
    initialState?: JSONObjectModel<AppStoreModel>
  ) {
    super(rootStore, uiStore);
    if (initialState) {
      this.connection = Option.of(initialState.connection);
    }
  }

  @observable
  connection: Option<Connection> = None;

  @computed
  get isLoggedIn(): boolean {
    return this.connection.nonEmpty();
  }

  isAuthorized = () => this.isLoggedIn;

  @action
  updateConnection(connection: Option<Connection>) {
    if (this.connection.equals(connection)) return;
    this.clearAuth();
    this.connection = connection;
    connection.forEach(this.apply);
  }

  private apply(connection: Connection) {
    localStorage.saveLastActiveConnection(connection);
    const connections = localStorage.getConnections();
    if (!connections.find(c => c.connectionName === connection.connectionName)) {
      localStorage.saveConnections(connections.concat(connection));
    }
  }

  private clearAuth() {
    this.connection = None;
    localStorage.saveLastActiveConnection(undefined);
  }

  logout(history: History) {
    this.request(async () => this.updateConnection(None)).then(r =>
      r.forEach(() => history.replace(routePaths.home.path))
    );
  }

  toJSON(): JSONModel<AppStoreModel> {
    return { connection: this.connection.orUndefined() };
  }

  disposeStores() {
    this.rootStore.dispose();
  }
}
