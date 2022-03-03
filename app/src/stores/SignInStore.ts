import { History } from 'history';
import { action, observable, runInAction } from 'mobx';
import { Option } from 'funfix-core';
import { NotificationType, withRequest } from 'module/mobx-utils';
// import { FromLocationDescriptorObject } from 'module/react-auth';
import { Api, Connection, connectionsStorage, isDirectConnection, TabixUpdate } from 'services';
import { ConnectionModel } from 'models';
import { routePaths } from 'routes';
import ApiRequestableStore from './ApiRequestableStore';

interface iTabixUpdate {
  currentVersion: string;
  newVersion: string;
  link: string;
  needUpdate: boolean;
}

export default class SignInStore extends ApiRequestableStore {
  @observable
  selectedConnection: ConnectionModel = ConnectionModel.DirectEmpty;

  @observable
  connectionList: ReadonlyArray<ConnectionModel> = [];

  @observable
  tbxUpdate: iTabixUpdate = {
    currentVersion: '',
    link: '',
    newVersion: '',
    needUpdate: false,
  };

  @withRequest
  async loadConnections() {
    const list = await connectionsStorage.get();
    runInAction(() => {
      this.connectionList = list.map(ConnectionModel.of);
    });
  }

  @withRequest
  async checkVersionUpdateTabix() {
    const currentVersion = TabixUpdate.getTabixBuildVersion();
    const v = await TabixUpdate.checkVersionUpdateTabix(undefined);

    runInAction(() => {
      try {
        this.tbxUpdate = {
          currentVersion,
          needUpdate: v.haveUpdate,
          link: v.link,
          newVersion: v.newVersion,
        };
        if (v.haveUpdate) {
          this.uiStore?.addNotification({
            type: NotificationType.info,
            text: 'Update Tabix, new version: ' + v.newVersion,
          });
        }
      } catch (e) {
        console.warn('Can`t check Tabix update');
      }
      return false;
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
    this.connectionList = this.connectionList.concat(con);
    this.setSelectedConnection(con);
    await connectionsStorage.saveConnections(this.connectionList.map((_) => _.toJSON()));
  }

  @withRequest.bound
  @action
  async deleteSelectedConnection() {
    this.connectionList = this.connectionList.filter(
      (c) => c.connectionName !== this.selectedConnection.connectionName
    );
    this.setSelectedConnection(
      isDirectConnection(this.selectedConnection)
        ? ConnectionModel.DirectEmpty
        : ConnectionModel.ServerEmpty
    );
    await connectionsStorage.saveConnections(this.connectionList.map((_) => _.toJSON()));
  }

  signIn(history: History) {
    return this.submit(this.selectedConnection, async () => {
      const api = await Api.connect(this.selectedConnection.toJSON());
      this.rootStore.appStore.updateApi(Option.of(api));
      const { state: { from: path } = { from: routePaths.home.path } } = history.location; //  as FromLocationDescriptorObject;
      history.push(path);
    });
  }
}
