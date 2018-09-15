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

  private getNewConnectionName = () => `CONNECTION ${this.connectionList.length + 1}`;

  @action
  addNewConnection = () =>
    this.request(async () => {
      const con = ConnectionModel.of({
        type: this.selectedConnection.type,
        connectionName: this.getNewConnectionName(),
      });
      this.connectionList = this.connectionList.concat(con);
      this.setSelectedConnection(con);
      localStorage.saveConnections(this.connectionList);
    });

  @action
  deleteSelectedConnection = () => {
    this.connectionList = this.connectionList.filter(
      c => c.connectionName !== this.selectedConnection.connectionName
    );
    this.setSelectedConnection(
      isDirectConnection(this.selectedConnection)
        ? ConnectionModel.DirectEmpty
        : ConnectionModel.ServerEmpty
    );
    localStorage.saveConnections(this.connectionList);
  };

  @action
  signIn = (history: History) =>
    this.submit(this.selectedConnection, async () => {
      const api = new Api(this.selectedConnection.toJSON());
      await api.init();
      console.log(`Connection - OK, version:${api.getVersion()}`);
      // обработка структуры происходит в loginMiddleware
      // return api.getDatabaseStructure();
      return api.provider.getConnection();
    }).then(r =>
      r.forEach(result => {
        console.log('signIn', result);

        this.rootStore.appStore.updateConnection(Option.of(result));
        // this.rootStore.appStore.loadData();

        const {
          state: { from: path } = { from: routePaths.home.path },
        } = history.location as FromLocationDescriptorObject;
        history.push(path);
      })
    );
}
