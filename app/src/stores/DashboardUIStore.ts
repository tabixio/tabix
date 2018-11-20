import { observable, reaction, IReactionDisposer, when, action, computed } from 'mobx';
import { Option, None } from 'funfix-core';
import { UIStore, createViewModel, ViewModelLike } from '@vzh/mobx-stores';
import { TabEditorModel, TreeFilterModel } from 'models';
import { Query } from 'services';
import RootStore from './RootStore';

export default class DashboardUIStore extends UIStore<RootStore> {
  @observable
  editedTab: Option<ViewModelLike<TabEditorModel>> = None;

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

  protected changeActiveTabReaction?: IReactionDisposer;

  constructor(rootStore: RootStore) {
    super(rootStore);

    when(action(() => rootStore.dashboardStore !== undefined), () => {
      // reset tab view state
      this.changeActiveTabReaction = reaction(
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
