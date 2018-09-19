// import { None, Option, Some } from 'funfix-core';
import { RequestableStore, UIStore } from '@vzh/mobx-stores';
// import { ErrorResponse } from 'shared/types';
import RootStore from './RootStore';

export default class ApiRequestableStore<
  UIS extends UIStore<RootStore> = UIStore<RootStore>
> extends RequestableStore<RootStore, UIS> {
  // protected isErrorResponse(data: ErrorResponse | any): data is ErrorResponse {
  //   return data && data.error !== undefined;
  // }
  // protected getResponseErrorMessage(response: AxiosResponse): string {
  //   console.log(response.data);
  //   return Option.of(response.data)
  //     .flatMap(data => (this.isErrorResponse(data) ? Some(data) : None))
  //     .map(
  //       d =>
  //         `${d.message}${Option.of(d.hint)
  //           .map(s => `\n${s}`)
  //           .getOrElse('')}`
  //     )
  //     .getOrElse(response.statusText);
  // }
}
