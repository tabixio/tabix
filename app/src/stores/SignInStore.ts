import { History } from 'history';
import { observable, action, transaction, runInAction } from 'mobx';
import { Option } from 'funfix-core';
import { withRequest } from '@vzh/mobx-stores';
import { FromLocationDescriptorObject } from '@vzh/react-auth';
import { Connection, Api, isDirectConnection, connectionsStorage } from 'services';
import { ConnectionModel } from 'models';
import { routePaths } from 'routes';
import ApiRequestableStore from './ApiRequestableStore';

export default class SignInStore extends ApiRequestableStore {
  @observable
  selectedConnection: ConnectionModel = ConnectionModel.DirectEmpty;

  @observable
  connectionList: ReadonlyArray<ConnectionModel> = [];

  @withRequest
  async loadConnections() {
    const list = await connectionsStorage.get();
    runInAction(() => {
      this.connectionList = list.map(ConnectionModel.of);
    });
  }

  @action
  setSelectedConnection(connection: Connection) {
    this.selectedConnection = ConnectionModel.of(connection);
  }

  // todo: fix if name already exists
  private getNewConnectionName = () => `CONNECTION ${this.connectionList.length + 1}`;

  @withRequest.bound
  @action
  async addNewConnection() {
    const con = ConnectionModel.of({
      type: this.selectedConnection.type,
      connectionName: this.getNewConnectionName(),
    });
    transaction(() => {
      this.connectionList = this.connectionList.concat(con);
      this.setSelectedConnection(con);
    });
    await connectionsStorage.saveConnections(this.connectionList.map(_ => _.toJSON()));
  }

  @withRequest.bound
  @action
  async deleteSelectedConnection() {
    transaction(() => {
      this.connectionList = this.connectionList.filter(
        c => c.connectionName !== this.selectedConnection.connectionName
      );
      this.setSelectedConnection(
        isDirectConnection(this.selectedConnection)
          ? ConnectionModel.DirectEmpty
          : ConnectionModel.ServerEmpty
      );
    });
    await connectionsStorage.saveConnections(this.connectionList.map(_ => _.toJSON()));
  }

  signIn(history: History) {
    return this.submit(this.selectedConnection, async () => {
      const api = await Api.connect(this.selectedConnection.toJSON());
      transaction(() => {
        this.rootStore.appStore.updateApi(Option.of(api));
        const {
          state: { from: path } = { from: routePaths.home.path },
        } = history.location as FromLocationDescriptorObject;
        history.push(path);
      });
    });
  }
}
