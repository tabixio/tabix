import { observable, action } from 'mobx';
import { UIStore } from '@vzh/mobx-stores';
import RootStore from './RootStore';
import ApiRequestableStore from './ApiRequestableStore';

export default class SqlEditorStore extends ApiRequestableStore {
  @observable
  tabs: {}[] = [];

  constructor(rootStore: RootStore, uiStore: UIStore<RootStore>, initialState: any) {
    super(rootStore, uiStore);
    initialState && console.log(initialState);
  }

}
