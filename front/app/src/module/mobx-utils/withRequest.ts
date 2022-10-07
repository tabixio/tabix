import RequestableStore, { AsyncAction } from './RequestableStore';

function withRequest(
  target: RequestableStore<any, any>,
  _propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<AsyncAction<void>>
): TypedPropertyDescriptor<AsyncAction<void>> {
  const { value, get, set, ...rest } = descriptor;
  const fn = value!;

  return {
    ...rest,
    async value(this: typeof target, ...params: any[]) {
      await this['request'](() => fn.call(this, ...params)); // eslint-disable-line dot-notation
    },
  };
}

withRequest.bound = function bound(
  target: RequestableStore<any, any>,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<AsyncAction<void>>
): TypedPropertyDescriptor<AsyncAction<void>> {
  return {
    configurable: true,
    enumerable: false,

    get(this: typeof target) {
      const { value, get, set, ...rest } = descriptor;
      const fn = value!;
      const self = this;

      Object.defineProperty(this, propertyKey, {
        ...rest,
        async value(...params: any[]) {
          await self['request'](() => fn.call(self, ...params)); // eslint-disable-line dot-notation
        },
      });

      return this[propertyKey];
    },
    set: () => {},
  };
};

export default withRequest;
