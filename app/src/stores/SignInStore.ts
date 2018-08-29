import { observable, action } from 'mobx';
import { LocalUIStore } from '@vzh/mobx-stores';
import { Connection, localStorage, ConnectionType } from 'services';
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
    return this.request(() => Promise.resolve(localStorage.getConnections())).then(_ =>
      _.forEach(list => {
        // console.log(list);
        this.connectionList = list.map(ConnectionModel.of);
      })
    );
  }

  @action
  setSelectedConnection(connection: Connection) {
    this.selectedConnection = ConnectionModel.of(connection);
  }

  @action
  addNewConnection = () => {
    this.connectionList = this.connectionList.concat(
      ConnectionModel.of({ type: ConnectionType.direct, connectionName: 'CONNECTION 1' })
    );
  };
}
