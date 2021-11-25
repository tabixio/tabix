import { observable, computed } from 'mobx';
import BaseStore from './BaseStore';

export default abstract class LoadableStore<RS extends object> extends BaseStore<RS> {
  @observable
  protected pendingRequestCount: number = 0; // For multiple requests

  /** true - while has at least 1 running request. */
  @computed
  get loading() {
    return this.pendingRequestCount > 0;
  }

  /** Increment or decrement running requests number. */
  set loading(value: boolean) {
    if (this.pendingRequestCount === 0 && !value) {
      return;
    }
    this.pendingRequestCount += value ? 1 : -1;
  }
}
