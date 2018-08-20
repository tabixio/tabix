import { Option } from 'funfix-core';
import { History } from 'history';
import { FromLocationDescriptorObject } from '@vzh/react-components/dist/Auth';
import { authApi } from 'services';
import { routePaths } from 'routes';
import { BaseSignInModel } from 'models/SignInModel';
import ApiRequestableStore from './ApiRequestableStore';

export default abstract class BaseSignInStore<
  Model extends BaseSignInModel<any>
> extends ApiRequestableStore {
  abstract readonly model: Model;

  // constructor(rootStore: RootStore, uiState: LocalUIStore<RootStore>, initialState: any) {
  //   super(rootStore, uiState);
  //   initialState && console.log(initialState);
  // }

  protected getResponseErrorMessage(response: AxiosResponse): string {
    return response.status === 401
      ? 'Нет такого пользователя или неправильный пароль.'
      : super.getResponseErrorMessage(response);
  }

  signIn(history: History) {
    this.submit(this.model, () => authApi.login(this.model)).then(r =>
      r.forEach(result => {
        this.rootStore.appStore.updateToken(Option.of(result.accessToken));
        this.rootStore.appStore.loadData();

        const {
          state: { from: path } = { from: routePaths.home.path },
        } = history.location as FromLocationDescriptorObject;
        history.push(path);
      })
    );
  }
}
