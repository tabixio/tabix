import RootStore from './RootStore';

export { default as AppStore } from './AppStore';
export { default as SignInStore } from './SignInStore';
export { default as DashboardStore } from './DashboardStore';
export { default as DashboardUIStore } from './DashboardUIStore';
export { RootStore };
export { default as initStores } from './initStores';

export type Stores = { store: RootStore };
