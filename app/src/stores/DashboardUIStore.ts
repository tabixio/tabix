import { observable, reaction, IReactionDisposer, when, action } from 'mobx';
import { UIStore } from '@vzh/mobx-stores';
import RootStore from './RootStore';

interface TabUIModel {
  showSaveModal: boolean;
}

// interface TabsUIModel {
//   [P: string]: TabUIModel;
// }

export default class DashboardUIStore extends UIStore<RootStore> {
  @observable
  tabViewState: TabUIModel = { showSaveModal: false };

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

  @action
  private resetTabViewState() {
    console.log('***');
    this.tabViewState = { showSaveModal: false };
  }

  @action
  showSaveModal() {
    this.tabViewState.showSaveModal = true;
  }

  @action.bound
  hideSaveModal() {
    this.tabViewState.showSaveModal = false;
  }
}
