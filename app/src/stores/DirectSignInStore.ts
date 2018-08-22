import { observable } from 'mobx';
import { LocalUIStore } from '@vzh/mobx-stores';
import { DirectSignInModel } from 'models/SignInModel';
import RootStore from './RootStore';
import BaseSignInStore from './BaseSignInStore';

export default class DirectSignInStore extends BaseSignInStore<DirectSignInModel> {
  @observable
  readonly model: DirectSignInModel = new DirectSignInModel();

  constructor(rootStore: RootStore, uiState: LocalUIStore<RootStore>, initialState: any) {
    super(rootStore, uiState);
    initialState && console.log(initialState);
  }
}
