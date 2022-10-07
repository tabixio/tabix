import { KeysOfType, Omit } from 'typelevel-ts';
import { Option } from 'funfix-core';
import ValidableStoreModel from './ValidableStoreModel';

export interface SerializableModel<Entity extends object> {
  jsonModel?: Entity; // Just for correct infering: https://github.com/Microsoft/TypeScript/issues/26688
  toJSON(): JSONModel<Entity>;
}

export type JSONPrimitives = string | number | boolean | null | undefined;

export type JSONTypes = JSONPrimitives | JSONObject | JSONArray;

export interface JSONObject extends Record<string, JSONTypes> {}

export interface JSONArray extends ReadonlyArray<JSONTypes> {}

// type ExcludeFunctions<T> = Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>;
export type ExcludeFunctions<T extends object> = Pick<T, Exclude<keyof T, KeysOfType<T, Function>>>;

// type OnlyEntity<Entity extends object> = ExcludeFunctions<
// Pick<Entity, Exclude<keyof Entity, keyof ValidableStoreModel<any> | keyof SerializableModel<any>>>
// >;

// export type JSONModel<Entity extends object> = {
//   [P in keyof OnlyEntity<Entity>]: OnlyEntity<Entity>[P] extends JSONTypes
//     ? OnlyEntity<Entity>[P] // keep original property type
//     : OnlyEntity<Entity>[P] extends SerializableModel<any> | object
//       ? JSONModel<OnlyEntity<Entity>[P]>
//       : string
// };

// type OnlyEntity<Entity extends object> = ExcludeFunctions<
//   Omit<Entity, keyof ValidableStoreModel<any> | keyof SerializableModel<any>>
// >;

// export type JSONModel<Entity extends object> = {
//   [P in keyof OnlyEntity<Entity>]: Entity[P] extends JSONTypes
//     ? Entity[P]
//     : Entity[P] extends SerializableModel<any> | object ? JSONModel<Entity[P]> : string
// };

export type OnlyEntity<Entity extends object | undefined> = ExcludeFunctions<
  Omit<
    Pick<Entity, Exclude<keyof Entity, undefined>>, // exclude undefined keys for Omit
    keyof ValidableStoreModel<any> | keyof SerializableModel<any>
  >
>;

export type ExtractOptionType<A> = A extends Option<infer B> ? B : A;

export declare type JSONModelProp<P extends any> = P extends JSONTypes
  ? P
  : undefined extends P
  ? P extends object | undefined // @ts-ignore
    ? (JSONModel<Extract<P, undefined>> | undefined)
    : (string | undefined)
  : P extends SerializableModel<infer T>
  ? JSONModel<T>
  : P extends Option<infer T>
  ? T extends JSONTypes
    ? (T | undefined)
    : T extends object
    ? (JSONModel<T> | undefined)
    : (string | undefined)
  : P extends object
  ? JSONModel<P>
  : string;

export type JSONObjectModel<T extends object> = { [P in keyof OnlyEntity<T>]: JSONModelProp<T[P]> };

export declare type JSONModel<Entity extends object> = Entity extends Option<infer T>
  ? T extends JSONTypes
    ? T | undefined
    : T extends object
    ? (JSONObjectModel<T> | undefined)
    : (string | undefined)
  : Entity extends JSONTypes
  ? Entity
  : Entity extends ReadonlyArray<infer T>
  ? T extends JSONTypes
    ? Entity
    : T extends object
    ? Array<JSONObjectModel<T>>
    : Array<string>
  : JSONObjectModel<Entity>;
/* : Entity extends JSONTypes
  ? Entity
  : JSONObjectModel<Entity>; */

/* export type JSONModelProp<P extends any> = ExtractOptionType<P> extends JSONTypes
  ? ExtractOptionType<P>
  : undefined extends ExtractOptionType<P>
    ? ExtractOptionType<P> extends object | undefined
      ? OptionalJSONModel<ExtractOptionType<P>>
      : string
    : ExtractOptionType<P> extends Option<infer T> // extract generic type of Option
      ? T extends JSONTypes ? (T | undefined) : T extends object ? OptionalJSONModel<T> : string
      : ExtractOptionType<P> extends object ? JSONModel<ExtractOptionType<P>> : string;

export declare type JSONModel<Entity extends object | undefined> = Entity extends Option<infer T>
  ? T extends JSONTypes
    ? T | undefined
    : T extends object
      ? (
          | {
              [P in keyof OnlyEntity<ExtractOptionType<T>>]: JSONModelProp<ExtractOptionType<T>[P]>
            }
          | undefined)
      : string | undefined
  : {
      [P in keyof OnlyEntity<ExtractOptionType<Entity>>]: JSONModelProp<
        ExtractOptionType<Entity>[P]
      >
    };
 */
/* export type JSONModel<Entity extends object | undefined> = {
  // [P in keyof OnlyEntity<Entity>]: Entity[P] extends JSONTypes
  //   ? Entity[P]
  //   : undefined extends Entity[P]
  //     ? Entity[P] extends SerializableModel<any> | object | undefined
  //       ? (JSONModel<Exclude<Entity[P], undefined>>)
  //       : string
  //     : Entity[P] extends SerializableModel<any> | object ? JSONModel<Entity[P]> : string
  [P in keyof OnlyEntity<Entity>]: Entity[P] extends JSONTypes
    ? Entity[P]
    : undefined extends Entity[P]
      ? Entity[P] extends object | undefined ? OptionalJSONModel<Entity[P]> : string
      : Entity[P] extends Option<infer T> // extract generic type of Option
        ? T extends JSONTypes ? (T | undefined) : T extends object ? OptionalJSONModel<T> : string
        : Entity[P] extends object ? JSONModel<Entity[P]> : string
};
 */
// export type OptionalJSONModel<Entity extends object | undefined> = undefined extends Entity
//   ? (JSONModel<Exclude<Entity, undefined>> | undefined)
//   : JSONModel<Entity>;
// export type OptionalJSONModel<Entity extends object | undefined> =
//   | JSONModel<Exclude<Entity, undefined>>
//   | undefined;

// export declare function serialize<Entity extends object | undefined>(
//   v: Entity
// ): Entity extends undefined ? undefined : JSONModel<Entity>;

export function serialize<Entity>(
  v: Entity
): Entity extends JSONTypes
  ? Entity
  : undefined extends Entity
  ? Entity extends object | undefined
    ? (JSONModel<Extract<Entity & object, undefined>> | undefined)
    : (string | undefined)
  : Entity extends object
  ? JSONModel<Entity>
  : string {
  if (v == null) {
    // @ts-ignore
    return v;
  }
  if (Array.isArray(v)) {
    return v.map(serialize) as any;
  }

  if (typeof v === 'object' && v instanceof Option) {
    return v.map(serialize).orUndefined();
  }

  if (typeof v === 'object') {
    return Object.entries(v).reduce((acc, [key, value]) => {
      // Skip functions and symbols
      if (typeof value === 'function' || typeof value === 'symbol') return acc;
      return { ...acc, [key]: serialize(value) };
    }, {}) as any;
  }

  if (typeof v === 'boolean' || typeof v === 'number' || typeof v === 'string') {
    return v as any;
  }

  return String(v) as any;
}

// const a = serialize({ a: 1 });
// const a = serialize(undefined);
// const a = serialize(null);
// const a = serialize([1]);
// const a = serialize(Option.of(1));
// a;
// type B = JSONModel<Option<number>>;
// type B = JSONModel<number[]>;
// type B = JSONModel<{ a: 1; b: { q: string; w: string[] }[] }>;
// const b: B = {};
// type J = JSONObject;
// const j: J = { a: 0, 1: 7, z: new Date() };
