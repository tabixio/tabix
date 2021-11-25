import DisposableStore from './DisposableStore';
import BaseStore from './BaseStore';

export default abstract class BaseRootStore extends DisposableStore {
  private initStore(store: BaseStore<any> | BaseRootStore) {
    Object.values(store).forEach(value => {
      if (value instanceof BaseStore) this.initStore(value);
    });
    // eslint-disable-next-line dot-notation
    if (store !== this && store instanceof BaseStore && typeof store['initialize'] === 'function') {
      try {
        store['initialize'](); // eslint-disable-line dot-notation
      } catch (ex) {
        console.error(ex);
      }
    }
  }

  /** Initialize all child stores recursively. */
  protected initialize() {
    this.initStore(this);
  }
}
