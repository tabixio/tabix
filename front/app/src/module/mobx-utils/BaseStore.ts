import DisposableStore from './DisposableStore';

export default abstract class BaseStore<RS extends object> extends DisposableStore {
  constructor(protected readonly rootStore: RS) {
    super();
  }

  /** Call by rootStore after all children stores are created. */
  protected initialize() {}

  dispose() {
    super.dispose(name => name === 'rootStore');
  }
}
