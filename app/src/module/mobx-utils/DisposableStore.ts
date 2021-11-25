import { Reaction, IReactionDisposer, $mobx } from 'mobx';

export function isReaction(value: any): value is Reaction {
  return value && typeof value === 'object' && value.isMobXReaction === true;
}

export function isReactionDisposer(value: any): value is IReactionDisposer {
  return value && typeof value === 'function' && isReaction((value as IReactionDisposer)[$mobx]);
}

export function disposeMobxReactions(value: any) {
  if (isReactionDisposer(value)) {
    value();
  }
}

export default abstract class DisposableStore {
  /** If callback returns true then do nothing */
  dispose(callback?: (name: string, value: any) => boolean) {
    Object.entries(this).forEach(([name, value]) => {
      if (callback && callback(name, value)) return;
      if (value instanceof DisposableStore) value.dispose();
      else disposeMobxReactions(value);
    });
  }
}
