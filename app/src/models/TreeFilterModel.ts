import { observable, computed } from 'mobx';
import { StoreModel } from '@vzh/mobx-stores';

export interface TreeFilter {
  search: string;
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

  protected constructor({ search }: TreeFilter) {
    super();
    this.search = search;
  }
}
