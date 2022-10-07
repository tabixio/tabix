import sqlFormatter from 'sql-formatter';
import { action, IReactionDisposer, observable, reaction, runInAction, when } from 'mobx';
import { None, Option, Some, Try } from 'funfix-core';
import { createViewModel, ViewModelLike, withRequest } from 'module/mobx-utils';
import { Query, ServerStructure, sqlHistoryStorage, tabsStorage } from 'services';
import {
  createTabFrom,
  DbOverviewTabModel,
  EditorTabModel,
  isTabOfType,
  MetricsTabModel,
  ProcessesTabModel,
  ServerOverviewTabModel,
  SqlHistoryTabModel,
  Tab,
  TableViewTabModel,
  TabModel,
  TabType,
} from 'models';
import { Statistics } from 'services/api/DataDecorator';
import { TextInsertType } from 'components/Dashboard/EditorTabPage';
import DashboardUIStore from './DashboardUIStore';
import ApiRequestableStore from './ApiRequestableStore';

export default class TabsStore extends ApiRequestableStore<DashboardUIStore> {
  @observable
  tabs: ReadonlyArray<TabModel<Tab>> = [];

  @observable
  activeTab: Option<TabModel<Tab>> = None;

  @observable
  editedTab: Option<ViewModelLike<EditorTabModel>> = None;

  private autosaveTimer?: number;

  protected changeTabsReaction?: IReactionDisposer;

  protected changeActiveTabReaction?: IReactionDisposer;

  protected initialize() {
    this.autosaveTimer = window.setInterval(() => {
      tabsStorage.saveTabs(this.tabs.map((_) => _.toJSON()));
    }, 30000);

    this.changeTabsReaction = reaction(
      () => this.tabs,
      (tabs) => tabsStorage.saveTabs(tabs.map((_) => _.toJSON()))
    );

    this.changeActiveTabReaction = reaction(
      () => this.activeTab,
      (tab) => {
        this.resetTabViewState();
        tabsStorage.saveActiveTabId(tab.map((t) => t.id).orUndefined());
      }
    );
  }

  getActiveTabOfType<T extends TabModel<Tab>>(type: T['type']): Option<T> {
    return this.activeTab.flatMap((t) => (isTabOfType<T>(t, type) ? Some(t) : None));
  }

  getActiveEditorDatabase(): Option<string> {
    return this.rootStore.tabsStore
      .getActiveTabOfType<EditorTabModel>(TabType.Editor)
      .flatMap((t) => t.currentDatabase);
  }

  @withRequest
  async loadData() {
    // if (this.tabs.length) return;
    // load saved tabs if empty
    const tabs = !this.tabs.length ? (await tabsStorage.getTabs()).map(createTabFrom) : this.tabs;
    // load saved active tab id if none
    const activeTabId = this.activeTab.isEmpty() ? await tabsStorage.getActiveTabId() : None;

    runInAction(() => {
      this.tabs = tabs;

      if (this.activeTab.isEmpty()) {
        this.activeTab = activeTabId
          .flatMap((id) => Option.of(this.tabs.find((t) => t.id === id)))
          .orElseL(() => Option.of(this.tabs.length ? this.tabs[0] : undefined));
      }
    });

    // To fix creating a tab when serverStructure is not loaded yet.
    if (this.tabs.length === 0) {
      when(
        () => this.rootStore.treeStore.serverStructure.nonEmpty(),
        () => {
          // Check again
          if (this.tabs.length === 0) {
            this.openNewEditorTab();
          }
        }
      );
    }
  }

  @action.bound
  setActiveTab(id: string) {
    this.activeTab = Option.of(this.tabs.find((_) => _.id === id));
  }

  // todo: fix if name already exists
  private getNewTabName = () => `SQL ${this.tabs.length + 1}`;

  @action.bound
  openNewEditorTab(content?: string) {
    const newTab = EditorTabModel.from({
      title: this.getNewTabName(),
      content,
      currentDatabase: this.getActiveEditorDatabase()
        .orElse(
          this.rootStore.treeStore.serverStructure.map((s) => s.databases[0]).map((d) => d.name)
        )
        .orUndefined(),
    });
    this.tabs = this.tabs.concat(newTab);
    this.activeTab = Some(newTab);
  }

  @action
  private openSpecialTab<T extends TabModel<any>>(
    typeTab: T['type'],
    tabId: T['id'] | null,
    factory: () => T
  ) {
    if (this.activeTab.map((_) => (tabId ? _.id === tabId : _.type === typeTab)).getOrElse(false))
      return;
    let tab = this.tabs.find((_) => (tabId ? _.id === tabId : _.type === typeTab));
    if (!tab) {
      tab = factory();
      this.tabs = this.tabs.concat(tab);
    }
    this.activeTab = Some(tab);
  }

  @action
  openTableTab(table: ServerStructure.Table) {
    this.openSpecialTab(TabType.TableView, TableViewTabModel.id(table.id), () =>
      TableViewTabModel.from({ tableName: table.name, tableId: table.id })
    );
  }

  @action
  openProcessesTab() {
    this.openSpecialTab(TabType.Processes, null, () => ProcessesTabModel.from({}));
  }

  @action
  openMetricsTab() {
    this.openSpecialTab(TabType.Metrics, null, () => MetricsTabModel.from({}));
  }

  @action
  openServerOverviewTab() {
    this.openSpecialTab(TabType.ServerOverview, null, () => ServerOverviewTabModel.from({}));
  }

  @action
  openDbOverviewTab() {
    this.openSpecialTab(TabType.DbOverview, null, () => DbOverviewTabModel.from({}));
  }

  @action
  openSqlHistoryTab() {
    this.openSpecialTab(TabType.SqlHistory, null, () => SqlHistoryTabModel.from({}));
  }

  @action
  closeTabsOthers(currentTabId: string) {
    if (this.tabs) {
      const tabs = this.tabs.filter((_) => currentTabId !== _.id);
      for (const tab of tabs) {
        this.closeTab(tab.id);
      }
    }
  }
  @action
  closeTabsDirection(currentTabId: string, directionLeft: boolean) {
    const index = this.tabs.findIndex((_) => _.id === currentTabId);
    if (index === -1) {
      return;
    }
    const tabs = directionLeft ? this.tabs.slice(0, index) : this.tabs.slice(index + 1);
    for (const tab of tabs) {
      this.closeTab(tab.id);
    }
  }
  @action
  closeTabsAll(currentTabId: string) {
    if (this.tabs) {
      for (const tab of this.tabs) {
        this.closeTab(tab.id);
      }
    }
  }
  @action.bound
  closeTab(id: string) {
    this.removeTab(id);
  }

  @action.bound
  removeTab(id: string) {
    this.tabs = this.tabs.filter((t) => t.id !== id);
    this.activeTab = Option.of(this.tabs[this.tabs.length - 1]);
  }

  @action.bound
  insertTextToEditor(text: string, insertType: TextInsertType = TextInsertType.Sql) {
    this.getActiveTabOfType<EditorTabModel>(TabType.Editor)
      .flatMap((t) => t.codeEditor)
      .forEach((editor) => editor.insertText(text, insertType));
  }

  @action.bound
  insertColumnToEditor(coll: ServerStructure.Column) {
    this.getActiveTabOfType<EditorTabModel>(TabType.Editor)
      .flatMap((t) => t.codeEditor)
      .forEach((editor) => editor.insertColumn(coll));
  }

  async insertTableSQLDescribe(table: ServerStructure.Table) {
    const text = await this.api.makeTableDescribe(table.database, table.name);
    this.insertTextToEditor(sqlFormatter.format(text));
  }

  async getProcessLists(isOnlySelect: boolean, isCluster: boolean) {
    return this.api.getProcessLists(isOnlySelect, isCluster);
  }

  async insertSelectFrom(table: ServerStructure.Table) {
    const cols = await this.api.getTableColumns(table.database, table.name);

    if (!cols) return;
    const fields: Array<string> = [];
    const where: Array<string> = [];

    cols.forEach((item: any) => {
      if (!item) return;
      fields.push(item.name);
      if (item.type === 'Date') {
        where.push(`${item.name}=today()`);
      }
    });

    const tableName = table.name.includes('.') ? `"${table.name}"` : table.name;
    const db = table.database;
    const selectFields = fields.join(',\n\t');
    const sqlTemplate = `\nSELECT\n\t${selectFields}\nFROM\n\t${db}.${tableName}\n%WHERE%\nLIMIT 100\n\n`;
    const sql = sqlTemplate.replace(
      '%WHERE%',
      where.length ? `\nWHERE\n\t${where.join('\n AND \n')}` : ''
    );

    this.insertTextToEditor(sql, TextInsertType.Sql);
  }

  @withRequest.bound
  async saveEditedTab() {
    this.editedTab.forEach((tab) => {
      tab.submit();
      tabsStorage.saveTab(tab.model.toJSON());
      this.hideSaveModal();
    });
  }

  private resetTabViewState() {
    if (this.editedTab.isEmpty()) return;
    this.editedTab.forEach((t) => t.reset());
    this.editedTab = None;
  }

  @action
  showSaveModal() {
    this.getActiveTabOfType<EditorTabModel>(TabType.Editor).forEach((tab) => {
      this.editedTab = Option.of(createViewModel(tab));
    });
  }

  @action.bound
  hideSaveModal() {
    this.resetTabViewState();
  }

  async execQueries(queries: Query[]) {
    if (!queries.length) return;

    // Save history
    sqlHistoryStorage.addItems(queries.map((_) => _.sqlOriginal));

    const extendSettings = {
      max_execution_time: 20, // ToDo:Read from Store.User.Tabix.Settings
      max_result_rows: 50000, // ToDo:Read from Store.User.Tabix.Settings
    };

    await this.getActiveTabOfType<EditorTabModel>(TabType.Editor)
      .map(async (t) => {
        const tab = t;

        const results = await Promise.all(
          queries.map(async (query) => {
            const q = query;
            q.settings.extendSettings = extendSettings;

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
                  (eq) => eq.id !== q.id
                );
              });
            }
          })
        );

        const stats = results.reduce(
          (acc, i) => {
            i.result
              .map((d) => d.stats)
              .forEach((s) => {
                acc.timeElapsed += s.timeElapsed;
                acc.rowsRead += s.rowsRead;
                acc.bytesRead += s.bytesRead;
              });
            return acc;
          },
          { timeElapsed: 0, rowsRead: 0, bytesRead: 0 } as Statistics
        );

        runInAction(() => {
          tab.queriesResult = Some({
            list: results,
            totalStats: stats,
          });
        });
      })
      .getOrElse(Promise.resolve());
  }

  dispose() {
    super.dispose();
    window.clearInterval(this.autosaveTimer);
  }
}
