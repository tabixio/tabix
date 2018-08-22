import { History } from 'history';
import { BaseSignInModel, BaseSignInEntity } from 'models/SignInModel';
import ApiRequestableStore from './ApiRequestableStore';

export default abstract class BaseSignInStore<
  Model extends BaseSignInModel<BaseSignInEntity>
> extends ApiRequestableStore {
  abstract readonly model: Model;

  // constructor(rootStore: RootStore, uiState: LocalUIStore<RootStore>, initialState: any) {
  //   super(rootStore, uiState);
  //   initialState && console.log(initialState);
  // }

  // protected getResponseErrorMessage(response: ResponseLike): string {
  //   return response.status === 401
  //     ? 'Нет такого пользователя или неправильный пароль.'
  //     : super.getResponseErrorMessage(response);
  // }

  signIn(_: History) {
    return Promise.resolve();
    // this.submit(this.model, () => authApi.login(this.model)).then(r =>
    //   r.forEach(result => {
    //     this.rootStore.appStore.updateToken(Option.of(result.accessToken));
    //     this.rootStore.appStore.loadData();

    //     const {
    //       state: { from: path } = { from: routePaths.home.path },
    //     } = history.location as FromLocationDescriptorObject;
    //     history.push(path);
    //   })
    // );
  }
}
