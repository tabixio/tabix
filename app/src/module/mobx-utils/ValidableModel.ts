import { Option } from 'funfix-core';
import Validable from './Validable';

export interface ErrorProvider {
  error: Option<string>;
}

export type ValidationErrors<Entity extends object> = Record<keyof Entity, ErrorProvider>;

export default interface ValidableModel<Entity extends object> extends Validable {
  errors: ValidationErrors<Entity>;
  readonly isValid: boolean;
  validate(name: keyof Entity): boolean;
  validate(): boolean;
}
