import { observable, action } from 'mobx';
import { UIStore } from 'module/mobx-utils';
import { Query } from 'services';
import RootStore from './RootStore';

export default class DashboardUIStore extends UIStore<RootStore> {
  /** Needed for resizing GridLayout */
  @observable
  primaryPaneSize?: number;

  @observable
  executingQueries: ReadonlyArray<Query> = [];

  @action.bound
  updatePrimaryPaneSize(size: number) {
    this.primaryPaneSize = size;
  }
}
