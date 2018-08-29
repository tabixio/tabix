import { History } from 'history';
import { observable } from 'mobx';
import { LocalUIStore } from '@vzh/mobx-stores';
import { ServerConnectionModel } from 'models/ConnectionModel';
import RootStore from './RootStore';
import BaseSignInStore from './BaseSignInStore';

export default class ServerSignInStore extends BaseSignInStore<ServerConnectionModel> {
  @observable
  readonly model: ServerConnectionModel = new ServerConnectionModel({});

  constructor(rootStore: RootStore, uiState: LocalUIStore<RootStore>, initialState: any) {
    super(rootStore, uiState);
    initialState && console.log(initialState);
  }

  signIn(_: History) {
    return Promise.resolve();
  }
}
