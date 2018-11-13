import { History } from 'history';
import { computed, observable, transaction, action } from 'mobx';
import { None, Option } from 'funfix-core';
import { withRequest, UIStore, RequestableStore } from '@vzh/mobx-stores';
import { Connection, localStorage, Api } from 'services';
import { routePaths } from 'routes';
import { RootStore } from 'stores';

export default class AppStore extends RequestableStore<RootStore, UIStore<RootStore>> {
  @observable
  api: Option<Api> = None;

  @computed
  get isLoggedIn(): boolean {
    return this.api.nonEmpty();
  }

  isAuthorized = () => this.isLoggedIn;

  private apply(api: Api) {
    const { connection } = api.provider;
    localStorage.saveLastActiveConnection(connection);
    const connections = localStorage.getConnections();
    if (!connections.find(c => c.connectionName === connection.connectionName)) {
      localStorage.saveConnections(connections.concat(connection));
    }
  }

  private clearAuth() {
    this.api = None;
    localStorage.saveLastActiveConnection(undefined);
  }

  @action
  updateApi(api: Option<Api>) {
    if (this.api.equals(api)) return;
    this.clearAuth();
    this.api = api;
    api.forEach(this.apply);
  }

  @withRequest
  async logout(history: History) {
    transaction(() => {
      this.updateApi(None);
      history.replace(routePaths.home.path);
    });
  }

  @withRequest
  async initApi(connection: Connection) {
    const api = await Api.connect(connection);
    this.api = Option.of(api);
  }

  disposeStores() {
    this.rootStore.dispose();
  }
}
