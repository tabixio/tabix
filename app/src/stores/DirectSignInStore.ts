import { History } from 'history';
import { observable } from 'mobx';
import { LocalUIStore, SerializableModel, JSONModel } from '@vzh/mobx-stores';
import { DirectSignInModel } from 'models/SignInModel';
import { Api } from 'services';
import RootStore from './RootStore';
import BaseSignInStore from './BaseSignInStore';

export default class DirectSignInStore extends BaseSignInStore<DirectSignInModel>
  implements SerializableModel<DirectSignInStore> {
  @observable
  readonly model: DirectSignInModel = new DirectSignInModel();

  constructor(rootStore: RootStore, uiState: LocalUIStore<RootStore>, initialState: any) {
    super(rootStore, uiState);
    initialState && console.log(initialState);
  }

  private connect = async () => {
    // @ts-ignore
    const api = new Api(this.model.toJSON());
    await api.init();
    console.log(`Connection - OK, version:${api.getVersion()}`);
    // обработка структуры происходит в loginMiddleware
    return api.getDatabaseStructure();
  };

  signIn(_: History) {
    return this.submit(this.model, this.connect).then(_ =>
      _.forEach(result => {
        console.log(result);
        // this.rootStore.appStore.updateToken(Option.of(result.accessToken));
        // this.rootStore.appStore.loadData();

        // const {
        //   state: { from: path } = { from: routePaths.home.path },
        // } = history.location as FromLocationDescriptorObject;
        // history.push(path);
      })
    );
  }

  toJSON(): JSONModel<DirectSignInStore> {
    throw new Error('Method not implemented.');
  }
}
