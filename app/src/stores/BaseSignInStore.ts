import { History } from 'history';
import { BaseConnectionModel } from 'models';
import { Connection } from 'services';
import ApiRequestableStore from './ApiRequestableStore';

export default abstract class BaseSignInStore<
  Model extends BaseConnectionModel<Connection>
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

  abstract signIn(_: History): Promise<any>;
}
