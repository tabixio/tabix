export declare type Compact<A> = { [K in keyof A]: A[K] };
/**
 * Returns the string literal 'T' if `A` and `B` are equal types, 'F' otherwise
 */
export declare type Equals<A, B> = (<C>() => C extends Compact<A> ? 'T' : 'F') extends (<
  C
>() => C extends Compact<B> ? 'T' : 'F')
  ? 'T'
  : 'F';
/**
 * Extracts a super-type of `A` identified by its keys `K`
 */
export declare type Omit<A extends object, K extends string | number | symbol> = Pick<
  A,
  Exclude<keyof A, K>
>;
export declare type Overwrite<A extends object, B extends object> = Compact<
  { [K in Exclude<keyof A, keyof B>]: A[K] } & B
>;
export declare type Diff<A extends object, OK extends keyof A> = Compact<
  { [K in Exclude<keyof A, OK>]: A[K] } & { [K in OK]?: A[K] }
>;
/**
 * Picks only the keys of a certain type
 */
export declare type KeysOfType<A extends object, B> = {
  [K in keyof A]-?: A[K] extends B ? K : never
}[keyof A];
/**
 * Encodes the constraint that a given object `A`
 * does not contain specific keys `K`
 */
export declare type RowLacks<A extends object, K extends string | number | symbol> = A &
  Record<Extract<keyof A, K>, never>;
export declare type Exact<A extends object, B extends A> = A &
  Record<Exclude<keyof B, keyof A>, never>;
export declare type AnyTuple = Array<any> & {
  '0': any;
};
export interface DeepReadonlyArray<A> extends ReadonlyArray<DeepReadonly<A>> {}
export declare type DeepReadonlyObject<A> = { readonly [K in keyof A]: DeepReadonly<A[K]> };
export declare type DeepReadonly<A> = A extends Array<infer B>
  ? DeepReadonlyArray<B>
  : DeepReadonlyObject<A>;
/**
 * Extracts the type of a member of a tagged union
 */
export declare type TaggedUnionMember<
  A extends object,
  Tag extends keyof A,
  Value extends A[Tag]
> = Extract<A, Record<Tag, Value>>;
/**
 * Extracts required keys as a literal type union
 */
export declare type RequiredKeys<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? never : K
} extends { [_ in keyof T]: infer U }
  ? {} extends U
    ? never
    : U
  : never;
/**
 * Extracts optional keys as a literal type union
 */
export declare type OptionalKeys<T> = {
  [K in keyof T]: T extends Record<K, T[K]> ? never : K
} extends { [_ in keyof T]: infer U }
  ? {} extends U
    ? never
    : U
  : never;
