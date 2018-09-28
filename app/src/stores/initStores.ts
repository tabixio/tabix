import * as mobx from 'mobx';
import { localStorage } from 'services';
import RootStore from './RootStore';

mobx.configure({ enforceActions: 'observed' });

export default function initStores() {
  const lastActiveConnection = localStorage.getLastActiveConnection();

  return new RootStore({
    appStore: { connection: lastActiveConnection.orUndefined() },
  });
}
