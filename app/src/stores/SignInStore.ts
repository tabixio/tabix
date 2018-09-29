import { History } from 'history';
import { observable, action, runInAction } from 'mobx';
import { Option } from 'funfix-core';
import { UIStore } from '@vzh/mobx-stores';
import { FromLocationDescriptorObject } from '@vzh/react-auth';
import { Connection, localStorage, Api, isDirectConnection } from 'services';
import { ConnectionModel } from 'models';
import { routePaths } from 'routes';
import RootStore from './RootStore';
import ApiRequestableStore from './ApiRequestableStore';

export default class SignInStore extends ApiRequestableStore {
  @observable
  selectedConnection: ConnectionModel = ConnectionModel.DirectEmpty;

  @observable
  connectionList: ReadonlyArray<ConnectionModel> = [];

  constructor(rootStore: RootStore, uiStore: UIStore<RootStore>, initialState: any) {
    super(rootStore, uiStore);
    initialState && console.log(initialState);
  }

  @action
  async loadConnections() {
    const t = await this.request(async () => localStorage.getConnections());
    t.forEach(list =>
      runInAction(() => {
        this.connectionList = list.map(ConnectionModel.of);
      })
    );
  }

  @action
  setSelectedConnection(connection: Connection) {
    this.selectedConnection = ConnectionModel.of(connection);
  }

  // todo: fix if name already exists
  private getNewConnectionName = () => `CONNECTION ${this.connectionList.length + 1}`;

  @action.bound
  addNewConnection() {
    this.request(async () => {
      const con = ConnectionModel.of({
        type: this.selectedConnection.type,
        connectionName: this.getNewConnectionName(),
      });
      this.connectionList = this.connectionList.concat(con);
      this.setSelectedConnection(con);
      localStorage.saveConnections(this.connectionList);
    });
  }

  @action.bound
  deleteSelectedConnection() {
    this.request(async () => {
      this.connectionList = this.connectionList.filter(
        c => c.connectionName !== this.selectedConnection.connectionName
      );
      this.setSelectedConnection(
        isDirectConnection(this.selectedConnection)
          ? ConnectionModel.DirectEmpty
          : ConnectionModel.ServerEmpty
      );
      localStorage.saveConnections(this.connectionList);
    });
  }

  @action.bound
  async signIn(history: History) {
    const r = await this.submit(this.selectedConnection, async () => {
      const api = await Api.connect(this.selectedConnection.toJSON());
      return api.provider.connection;
    });

    r.forEach(result => {
      runInAction(() => {
        this.rootStore.appStore.updateConnection(Option.of(result));
      });

      const {
        state: { from: path } = { from: routePaths.home.path },
      } = history.location as FromLocationDescriptorObject;
      history.push(path);
    });
  }
}
