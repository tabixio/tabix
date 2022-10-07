import { Omit } from 'typelevel-ts';
import { inject, IReactComponent, IStoresToProps } from 'mobx-react';

type TypedInject = <I extends object, P extends I, S = any>(
  mapStoreToProps: IStoresToProps<S, P, I>
) => (component: IReactComponent<P>) => IReactComponent<Omit<P, keyof I> & Partial<I>>;

export default inject as TypedInject;
