import { action } from 'mobx';
import { ViewModel as ViewModelOriginal, IViewModel } from 'mobx-utils';
import Model, { ModelLike, NameValue, InputEventLike } from './Model';

export class ViewModel<E extends object, T extends ModelLike<E>> extends ViewModelOriginal<T>
  implements ModelLike<E> {
  protected storeModel = new Model<E>(this as any);

  constructor(model: T) {
    super(model);
    delete this.changeField; // Remove copied method from `model` in order for override it.
  }

  @action.bound
  changeField<K extends keyof E>(event: NameValue<E, K> | InputEventLike): void {
    this.storeModel.changeField(event);
  }
}

export type ViewModelLike<T> = T extends ModelLike<infer E>
  ? (E & ModelLike<E> & IViewModel<T>)
  : never;

export default function createViewModel<E extends object, T extends Model<E>>(
  model: T
): ViewModelLike<T> {
  return (new ViewModel<E, T>(model) as unknown) as ViewModelLike<T>;
}
