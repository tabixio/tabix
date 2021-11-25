import { observable } from 'mobx';
import { StoreModel } from 'module/mobx-utils';

export interface TreeFilter {
  text: string;
  isFiltering: boolean;
}

export default class TreeFilterModel extends StoreModel<TreeFilter> implements TreeFilter {
  static MIN_SEARCH_LENGTH = 2;

  static from({ text: search }: Partial<TreeFilter> = {}): TreeFilterModel {
    return new TreeFilterModel({ text: search || '', isFiltering: false });
  }

  @observable
  text: string;

  @observable
  isFiltering: boolean;

  private constructor({ text: search, isFiltering }: TreeFilter) {
    super();
    this.text = search;
    this.isFiltering = isFiltering;
  }
}
