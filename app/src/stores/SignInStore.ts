import { History } from 'history';
import { observable, action, transaction } from 'mobx';
import { Option } from 'funfix-core';
import { withRequest } from '@vzh/mobx-stores';
import { FromLocationDescriptorObject } from '@vzh/react-auth';
import { Connection, localStorage, Api, isDirectConnection } from 'services';
import { ConnectionModel } from 'models';
import { routePaths } from 'routes';
import ApiRequestableStore from './ApiRequestableStore';

export default class SignInStore extends ApiRequestableStore {
  @observable
  selectedConnection: ConnectionModel = ConnectionModel.DirectEmpty;

  @observable
  connectionList: ReadonlyArray<ConnectionModel> = [];

  @withRequest
  @action
  async loadConnections() {
    const list = localStorage.getConnections();
    this.connectionList = list.map(ConnectionModel.of);
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
    localStorage.saveConnections(this.connectionList);
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
    localStorage.saveConnections(this.connectionList);
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
