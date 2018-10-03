import { observable, reaction, IReactionDisposer, when, action, computed } from 'mobx';
import { Option, None } from 'funfix-core';
import { UIStore, createViewModel, ViewModelLike } from '@vzh/mobx-stores';
import { TabModel } from 'models';
import RootStore from './RootStore';

export default class DashboardUIStore extends UIStore<RootStore> {
  @observable
  editedTab: Option<ViewModelLike<TabModel>> = None;

  protected changeTabReaction?: IReactionDisposer;

  constructor(rootStore: RootStore) {
    super(rootStore);

    when(action(() => rootStore.dashboardStore !== undefined), () => {
      // reset tab view state
      this.changeTabReaction = reaction(
        () => rootStore.dashboardStore.activeTab,
        tab => {
          this.resetTabViewState();
          return tab;
        }
      );
    });
  }

  @computed
  get treeSelectedKeys() {
    return this.rootStore.dashboardStore.activeTab
      .flatMap(t => t.currentDatabase)
      .map(db => [db])
      .orUndefined();
  }

  @observable
  private expandedKeys: string[] = [];

  @action
  updateExpandedKeys(keys: string[]) {
    this.expandedKeys = keys;
  }

  @computed
  get treeExpandedKeys() {
    // console.log('treeExpandedKeys');
    if (!this.rootStore.dashboardStore.treeFilter.search) return this.expandedKeys;

    // console.time('treeExpandedKeys');
    const keys: string[] = this.expandedKeys.slice();
    // const keys: string[] = this.rootStore.dashboardStore.serverStructure
    //   .map(ss => [ss.id])
    //   .getOrElse([]);
    this.rootStore.dashboardStore.filteredServerStructure.forEach(ss => {
      ss.databases.forEach(db => {
        if (db.tables.length) {
          keys.push(db.id);
          db.tables.forEach(t => {
            if (t.columns.length) keys.push(t.id);
          });
        }
      });
    });
    // console.timeEnd('treeExpandedKeys');
    return keys;
  }

  private resetTabViewState() {
    this.editedTab.forEach(t => {
      t.reset();
    });
    this.editedTab = None;
  }

  @action
  showSaveModal() {
    this.rootStore.dashboardStore.activeTab.forEach(tab => {
      this.editedTab = Option.of(createViewModel(tab));
    });
  }

  @action.bound
  hideSaveModal() {
    this.resetTabViewState();
  }
}
