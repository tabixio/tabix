import localforage from 'localforage';

const appStorage: LocalForageDbMethodsCore = localforage.createInstance({
  name: 'tabix',
  storeName: 'app',
  driver: localforage.INDEXEDDB,
});

export default appStorage;
