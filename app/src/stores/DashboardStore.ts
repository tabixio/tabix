import { observable, action, runInAction, transaction, IReactionDisposer, reaction } from 'mobx';
import { Option, None, Some, Try } from 'funfix-core';
import { withRequest } from '@vzh/mobx-stores';
import { ServerStructure, localStorage, Query } from 'services';
import { TabEditorModel, TreeFilter, MIN_SEARCH_LENGTH } from 'models';
import RootStore from './RootStore';
import ApiRequestableStore from './ApiRequestableStore';
import DashboardUIStore from './DashboardUIStore';
import ServerStructureFilter, { FilterResult } from './ServerStructureFilter';
import tabModels from './tabModels.tmp';

export default class DashboardStore extends ApiRequestableStore<DashboardUIStore> {
  @observable
  serverStructure: Option<ServerStructure.Server> = None;

  @observable
  filteredItems: FilterResult = [];

  @observable
  tabs: ReadonlyArray<TabEditorModel> = [];

  @observable
  activeTab: Option<TabEditorModel> = None;

  protected autosaveTimer?: number;

  protected changeTabsReaction?: IReactionDisposer;

  protected changeActiveTabReaction?: IReactionDisposer;

  constructor(rootStore: RootStore, uiStore: DashboardUIStore) {
    super(rootStore, uiStore);
    this.startReactions();
  }

  private startReactions() {
    this.autosaveTimer = window.setInterval(() => {
      localStorage.saveTabs(this.tabs);
    }, 30000);

    this.changeTabsReaction = reaction(
      () => this.tabs,
      tabs => {
        localStorage.saveTabs(tabs);
      }
    );

    this.changeActiveTabReaction = reaction(
      () => this.activeTab,
      tab => {
        localStorage.saveActiveTabId(tab.map(t => t.id).orUndefined());
      }
    );
  }

  @withRequest
  async loadData() {
    const structure = await this.api.loadDatabaseStructure();

    transaction(() => {
      runInAction(() => {
        this.serverStructure = Option.of(structure);

        // load saved tabs if empty
        if (!this.tabs.length) {
          localStorage.getTabs().fold(
            ex => {
              console.error(ex);
            },
            tabs => {
              this.tabs = tabs.map(TabEditorModel.from);
            }
          );
        }

        // todo: remove after testing
        if (!this.tabs.length) this.tabs = tabModels;

        // load saved active tab id if none
        if (this.activeTab.isEmpty()) {
          this.activeTab = localStorage
            .getActiveTabId()
            .flatMap(id => Option.of(this.tabs.find(t => t.id === id)))
            .orElseL(() => Option.of(this.tabs.length ? this.tabs[0] : undefined));
        }
      });

      // expand root node if expanded keys is empty
      if (this.serverStructure.nonEmpty() && !this.uiStore.treeExpandedKeys.length) {
        this.uiStore.updateTreeExpandedKeys(this.serverStructure.map(ss => [ss.id]).get());
      }

      if (!this.tabs.length) {
        this.addNewTab();
      }
    });
  }

  @action.bound
  async filterServerStructure(filter: TreeFilter) {
    if (filter.search.length < MIN_SEARCH_LENGTH) {
      this.filteredItems = [];
      return;
    }

    const filtered = await ServerStructureFilter.from(filter).exec(this.serverStructure);
    runInAction(() => {
      this.filteredItems = filtered;
    });
  }

  @action
  setActiveTab(id: string) {
    this.activeTab = Option.of(this.tabs.find(_ => _.id === id));
  }

  // todo: fix if name already exists
  private getNewTabName = () => `SQL ${this.tabs.length + 1}`;

  @action
  addNewTab() {
    const newTab = TabEditorModel.from({
      title: this.getNewTabName(),
      currentDatabase: this.activeTab
        .flatMap(t => t.currentDatabase)
        .orElse(this.serverStructure.map(s => s.databases[0]).map(d => d.name))
        .orUndefined(),
    });
    this.tabs = this.tabs.concat(newTab);
    this.activeTab = Some(newTab);
  }

  @action.bound
  removeTab(id: string) {
    this.tabs = this.tabs.filter(t => t.id !== id);
    this.activeTab = Option.of(this.tabs[this.tabs.length - 1]);
  }

  @withRequest.bound
  async saveEditedTab() {
    this.uiStore.editedTab.forEach(tab => {
      tab.submit();
      localStorage.saveTab(tab.model);
      this.uiStore.hideSaveModal();
    });
  }

  async execQueries(queries: Query[]) {
    if (!queries.length) return;

    const extendSettings = {
      max_execution_time: 20, // ToDo:Read from Store.User.Tabix.Settings
      max_result_rows: 50000, // ToDo:Read from Store.User.Tabix.Settings
    };

    await this.activeTab
      .map(async tab => {
        const results = await Promise.all(
          queries.map(async q => {
            q.extendSettings = extendSettings;
            runInAction(() => {
              this.uiStore.executingQueries = this.uiStore.executingQueries.concat(q);
            });

            try {
              const fetchResult = await this.api.fetch(q);
              return { id: q.id, result: Try.success(fetchResult) };
            } catch (ex) {
              return { id: q.id, result: Try.failure(ex) };
            } finally {
              runInAction(() => {
                this.uiStore.executingQueries = this.uiStore.executingQueries.filter(
                  eq => eq.id !== q.id
                );
              });
            }
          })
        );
        runInAction(() => {
          tab.queriesResult = results;
        });
      })
      .getOrElse(Promise.resolve());
  }

  dispose() {
    super.dispose();
    window.clearInterval(this.autosaveTimer);
  }
}
