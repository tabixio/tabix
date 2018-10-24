import { RequestableStore, UIStore } from '@vzh/mobx-stores';
import RootStore from './RootStore';

export default class ApiRequestableStore<
  UIS extends UIStore<RootStore> = UIStore<RootStore>
> extends RequestableStore<RootStore, UIS> {
  get api() {
    return this.rootStore.appStore.api.get();
  }
}
