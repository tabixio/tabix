import { observable, reaction, IReactionDisposer, when, action } from 'mobx';
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
