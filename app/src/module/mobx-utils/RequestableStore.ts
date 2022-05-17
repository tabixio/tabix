import { Throwable, Try } from 'funfix-core';
import { NotificationType } from './Notification';
import BaseStore from './BaseStore';
import UIStore from './UIStore';
import Validable from './Validable';

export interface ResponseLike {
  data?: any;
  status?: number;
  statusText?: string;
}

export interface DescriptionError {
  title: string;
  description: string;
  error: Error;
}

export interface ResponseErrorLike {
  config: any;
  response: ResponseLike;
}

export interface AsyncAction<T> {
  (...params: any[]): Promise<T>;
}

export function isResponseError(error: ResponseErrorLike | Throwable): error is ResponseErrorLike {
  return (error as ResponseErrorLike).config !== undefined;
}

export function isDescriptionError(
  error: ResponseErrorLike | DescriptionError | Throwable
): error is DescriptionError {
  return (error as DescriptionError).description !== undefined;
}

export default class RequestableStore<
  RS extends object,
  UIS extends UIStore<RS>
> extends BaseStore<RS> {
  constructor(rootStore: RS, public uiStore: UIS) {
    super(rootStore);
    this.request = this.request.bind(this) as any;
    this.onRequestSuccess = this.onRequestSuccess.bind(this);
    this.onRequestError = this.onRequestError.bind(this);
  }

  // Used Try for always return successed promise but keep error if has.
  // If just use promise with error and not use catch in client code then warning in console.
  protected async request<R>(doWork: AsyncAction<R>, ...doWorkParams: any[]): Promise<Try<R>> {
    this.uiStore.cleanNotifications(NotificationType.error);
    this.uiStore.loading = true;

    try {
      const result = await doWork(...doWorkParams);
      this.onRequestSuccess(result);
      return Try.success(result);
    } catch (ex) {
      this.onRequestError(ex);
      return Try.failure(ex);
    } finally {
      this.uiStore.loading = false;
    }
  }

  protected submit<R>(
    validable: Validable,
    doWork: AsyncAction<R>,
    ...doWorkParams: any[]
  ): Promise<Try<R>> {
    if (!validable.validate()) {
      return Promise.resolve(Try.failure(new Error('`model` is in invalid state.')));
    }
    return this.request<R>(doWork, ...doWorkParams);
  }

  // @ts-ignore
  protected onRequestSuccess<R>(result: R) {}

  protected getResponseErrorMessage(response: ResponseLike): string {
    return response.data || response.statusText;
  }

  protected getErrorMessage(error: ResponseErrorLike | DescriptionError | Throwable): string {
    return isResponseError(error) && error.response
      ? this.getResponseErrorMessage(error.response)
      : error.toString();
  }

  protected onRequestError(error: ResponseErrorLike | DescriptionError | Throwable) {
    let description = undefined;
    let showModal = false;
    let title = undefined;
    if (isDescriptionError(error)) {
      description = error.description;
      title = error.title;
      showModal = true;
    }

    this.uiStore.addNotification({
      type: NotificationType.error,
      text: this.getErrorMessage(error),
      description,
      showModal,
      title,
    });
  }
}
