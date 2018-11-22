import { observable, action, computed } from 'mobx';
import { Option, None } from 'funfix-core';
import { UIStore, createViewModel, ViewModelLike } from '@vzh/mobx-stores';
import { EditorTabModel, TreeFilterModel, TabType } from 'models';
import { Query } from 'services';
import RootStore from './RootStore';

export default class DashboardUIStore extends UIStore<RootStore> {
  @observable
  editedTab: Option<ViewModelLike<EditorTabModel>> = None;

  @observable
  treeExpandedKeys: string[] = [];

  @observable
  treeHighlightedKey: Option<string> = None;

  @observable
  treeFilter: TreeFilterModel = TreeFilterModel.from();

  @observable
  isFiltering: boolean = false;

  @observable
  executingQueries: ReadonlyArray<Query> = [];

  @computed
  get treeSelectedKeys() {
    return this.rootStore.dashboardStore
      .activeTabOfType<EditorTabModel>(TabType.Editor)
      .flatMap(t => t.currentDatabase)
      .map(db => [db])
      .orUndefined();
  }

  @action
  updateTreeHighlightedKey(key?: string) {
    this.treeHighlightedKey = Option.of(key);
  }

  @action
  updateTreeExpandedKeys(keys: string[]) {
    this.treeExpandedKeys = keys;
  }

  @action
  updateFiltering(filtering: boolean) {
    this.isFiltering = filtering;
  }

  resetTabViewState() {
    if (this.editedTab.isEmpty()) return;
    this.editedTab.forEach(t => {
      t.reset();
    });
    this.editedTab = None;
  }

  @action
  showSaveModal() {
    this.rootStore.dashboardStore.activeTabOfType<EditorTabModel>(TabType.Editor).forEach(tab => {
      this.editedTab = Option.of(createViewModel(tab));
    });
  }

  @action.bound
  hideSaveModal() {
    this.resetTabViewState();
  }
}
