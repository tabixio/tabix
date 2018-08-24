import { computed } from 'mobx';
import { LocalUIStore, SerializableModel, JSONModel } from '@vzh/mobx-stores';
import ApiRequestableStore from './ApiRequestableStore';
import RootStore from './RootStore';

export default class AppStore extends ApiRequestableStore
  implements SerializableModel<Exclude<AppStore, Function>> {
  constructor(rootStore: RootStore, uiState: LocalUIStore<RootStore>, initialState: any) {
    super(rootStore, uiState);
    if (initialState) {
    }
  }

  @computed
  get isLoggedIn(): boolean {
    return false;
  }

  isAuthorized = () => true;

  loadData() {
    return Promise.resolve();
  }

  toJSON(): JSONModel<AppStore> {
    throw new Error('Method not implemented.');
  }
}
