import { History } from 'history';
import { observable } from 'mobx';
import { LocalUIStore } from '@vzh/mobx-stores';
import { ServerSignInModel } from 'models/SignInModel';
import RootStore from './RootStore';
import BaseSignInStore from './BaseSignInStore';

export default class ServerSignInStore extends BaseSignInStore<ServerSignInModel> {
  @observable
  readonly model: ServerSignInModel = new ServerSignInModel();

  constructor(rootStore: RootStore, uiState: LocalUIStore<RootStore>, initialState: any) {
    super(rootStore, uiState);
    initialState && console.log(initialState);
  }

  signIn(_: History) {
    return Promise.resolve();
  }
}
