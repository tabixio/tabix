import { History } from 'history';
import { observable, action } from 'mobx';
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
    this.connectionList = this.connectionList.concat(con);
    this.setSelectedConnection(con);
    localStorage.saveConnections(this.connectionList);
  }

  @withRequest.bound
  @action
  async deleteSelectedConnection() {
    this.connectionList = this.connectionList.filter(
      c => c.connectionName !== this.selectedConnection.connectionName
    );
    this.setSelectedConnection(
      isDirectConnection(this.selectedConnection)
        ? ConnectionModel.DirectEmpty
        : ConnectionModel.ServerEmpty
    );
    localStorage.saveConnections(this.connectionList);
  }

  @action.bound
  async signIn(history: History) {
    const r = await this.submit(this.selectedConnection, async () => {
      const api = await Api.connect(this.selectedConnection.toJSON());
      this.rootStore.appStore.updateApi(Option.of(api));
    });

    r.forEach(() => {
      const {
        state: { from: path } = { from: routePaths.home.path },
      } = history.location as FromLocationDescriptorObject;
      history.push(path);
    });
  }
}
