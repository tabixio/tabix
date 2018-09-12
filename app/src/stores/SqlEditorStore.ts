import { observable, action } from 'mobx';
import { LocalUIStore } from '@vzh/mobx-stores';
import RootStore from './RootStore';
import ApiRequestableStore from './ApiRequestableStore';

export default class SqlEditorStore extends ApiRequestableStore {
  @observable
  tabs: {}[] = [];

  constructor(rootStore: RootStore, uiState: LocalUIStore<RootStore>, initialState: any) {
    super(rootStore, uiState);
    initialState && console.log(initialState);
  }

}
