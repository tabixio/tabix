import { observable, computed } from 'mobx';
import { StoreModel } from '@vzh/mobx-stores';
import { Omit } from 'typelevel-ts';

export interface TreeFilter {
  search: string;
  readonly has: boolean;
}

export default class TreeFilterModel extends StoreModel<TreeFilter> implements TreeFilter {
  static from({ search }: Partial<TreeFilter> = {}): TreeFilterModel {
    return new TreeFilterModel({
      search: search || '',
    });
  }

  @observable
  search: string;

  @computed
  get has() {
    return !!this.search;
  }

  protected constructor({ search }: Omit<TreeFilter, 'has'>) {
    super();
    this.search = search;
  }
}
