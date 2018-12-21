import { History } from 'history';
import { computed, observable, action, runInAction } from 'mobx';
import { None, Option } from 'funfix-core';
import { withRequest, UIStore, RequestableStore } from '@vzh/mobx-stores';
import { Connection, connectionsStorage, Api } from 'services';
import { routePaths } from 'routes';
import RootStore from './RootStore';

export default class AppStore extends RequestableStore<RootStore, UIStore<RootStore>> {
  @observable
  api: Option<Api> = None;

  @computed
  get isLoggedIn(): boolean {
    return this.api.nonEmpty();
  }

  isAuthorized = () => this.isLoggedIn;

  private async saveConnection(api: Api) {
    const { connection } = api.provider;
    await connectionsStorage.saveLastActiveConnection(connection);
    const connections = await connectionsStorage.get();
    if (!connections.find(c => c.connectionName === connection.connectionName)) {
      await connectionsStorage.saveConnections(connections.concat(connection));
    }
  }

  private async clearAuth() {
    this.api = None;
    await connectionsStorage.saveLastActiveConnection(undefined);
  }

  @action
  async updateApi(api: Option<Api>) {
    if (this.api.equals(api)) return;
    runInAction(async () => {
      await this.clearAuth();
      runInAction(() => {
        this.api = api;
      });
    });
    await api.map(this.saveConnection).orUndefined();
  }

  @withRequest
  async logout(history: History) {
    await this.updateApi(None);
    history.replace(routePaths.home.path);
  }

  @withRequest
  async init(connection: Connection) {
    const api = await Api.connect(connection);
    runInAction(() => {
      this.api = Option.of(api);
    });
  }

  disposeStores() {
    this.rootStore.dispose();
  }
}
