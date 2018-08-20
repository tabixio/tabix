import { LocalUIStore, SerializableModel, JSONModel } from '@vzh/mobx-stores';
import AppStore from './AppStore';

export default class RootStore implements SerializableModel<RootStore> {
  readonly appStore: AppStore;

  constructor(initialState: JSONModel<RootStore> = {}) {
    console.log('initialState', initialState);
    this.appStore = new AppStore(this, new LocalUIStore(this), initialState.appStore);
  }

  toJSON(): JSONModel<RootStore> {
    return {
      appStore: this.appStore.toJSON(),
    };
  }
}
