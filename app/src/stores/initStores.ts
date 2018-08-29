import { localStorage } from 'services';
import RootStore from './RootStore';

export default function initStores() {
  const lastActiveConnection = localStorage.getLastActiveConnection();

  return new RootStore({
    appStore: { connection: lastActiveConnection.orUndefined() },
  });
}
