import { History } from 'history';
import { action, computed, observable, runInAction } from 'mobx';
import { None, Option } from 'funfix-core';
import { RequestableStore, UIStore, withRequest } from 'module/mobx-utils';
import { Api, Connection, connectionsStorage } from 'services';
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
  isLogIn = () => {
    return this.isLoggedIn;
  };
  private async saveConnection(api: Api) {
    const { connection } = api.provider;
    await connectionsStorage.saveLastActiveConnection(connection);
    const connections = await connectionsStorage.get();
    if (!connections.find((c) => c.connectionName === connection.connectionName)) {
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
      //
      runInAction(() => {
        this.api = api;
      });
    });
    await api.map(this.saveConnection).orUndefined();
  }

  @withRequest
  async logout(history: History) {
    await this.updateApi(None);
    await this.clearAuth();
    history.replace(routePaths.home.path);
  }

  @withRequest
  async initApi(connection: Connection) {
    let api: Api;
    try {
      api = await Api.connect(connection);
    } catch (e) {
      console.error('initApi error', e);
    }

    runInAction(() => {
      this.api = Option.of(api);
    });
  }

  disposeStores() {
    this.rootStore.dispose();
  }
}
