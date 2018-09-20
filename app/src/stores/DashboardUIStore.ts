import { observable, reaction, IReactionDisposer, when, action } from 'mobx';
import { UIStore, createViewModel, ViewModelLike } from '@vzh/mobx-stores';
import { Option, None } from 'funfix-core';
import { Tab, TabModel } from 'models';
import RootStore from './RootStore';

export default class DashboardUIStore extends UIStore<RootStore> {
  @observable
  editedTab: Option<ViewModelLike<TabModel> & Tab> = None;

  protected changeTabReaction?: IReactionDisposer;

  constructor(rootStore: RootStore) {
    super(rootStore);

    when(
      () => rootStore.dashboardStore !== undefined,
      () => {
        // reset tab view state
        this.changeTabReaction = reaction(
          () => rootStore.dashboardStore.activeTab,
          tab => {
            this.resetTabViewState();
            return tab;
          }
        );
      }
    );
  }

  private resetTabViewState() {
    // console.log('***', 'resetTabViewState');
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
