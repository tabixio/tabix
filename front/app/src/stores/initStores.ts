import * as mobx from 'mobx';
import RootStore from './RootStore';

mobx.configure({ enforceActions: 'observed' });

export default function initStores(): RootStore {
  return new RootStore();
}
