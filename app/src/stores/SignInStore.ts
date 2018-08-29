import { observable, action } from 'mobx';
import { LocalUIStore } from '@vzh/mobx-stores';
import { Connection, localStorage, Api, isDirectConnection } from 'services';
import { ConnectionModel } from 'models';
import ApiRequestableStore from './ApiRequestableStore';
import RootStore from './RootStore';

export default class SignInStore extends ApiRequestableStore {
  @observable
  selectedConnection: ConnectionModel = ConnectionModel.DirectEmpty;

  @observable
  connectionList: ReadonlyArray<ConnectionModel> = [];

  constructor(rootStore: RootStore, uiState: LocalUIStore<RootStore>, initialState: any) {
    super(rootStore, uiState);
    initialState && console.log(initialState);
  }

  @action
  loadConnections() {
    return this.request(async () => localStorage.getConnections()).then(_ =>
      _.forEach(list => {
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

  connect = async () => {
    const api = new Api(this.selectedConnection.toJSON());
    await api.init();
    console.log(`Connection - OK, version:${api.getVersion()}`);
    // обработка структуры происходит в loginMiddleware
    return api.getDatabaseStructure();
  };
}
