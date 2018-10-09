import { observable } from 'mobx';
import { StoreModel } from '@vzh/mobx-stores';

export const MIN_SEARCH_LENGTH = 2;

export interface TreeFilter {
  search: string;
}

export default class TreeFilterModel extends StoreModel<TreeFilter> implements TreeFilter {
  static from({ search }: Partial<TreeFilter> = {}): TreeFilterModel {
    return new TreeFilterModel({ search: search || '' });
  }

  @observable
  search: string;

  private constructor({ search }: TreeFilter) {
    super();
    this.search = search;
  }
}
