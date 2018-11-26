import localforage from 'localforage';

const appStorage: LocalForageDbMethodsCore = localforage.createInstance({
  storeName: 'app',
  driver: localforage.INDEXEDDB,
});

export default appStorage;
