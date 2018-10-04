import { observable, action, runInAction, reaction, transaction } from 'mobx';
import { Option, None, Some } from 'funfix-core';
import { Api, ServerStructure, localStorage } from 'services';
import { DashboardUIStore } from 'stores';
import { TabModel, TreeFilterModel } from 'models';
import RootStore from './RootStore';
import ApiRequestableStore from './ApiRequestableStore';
import ServerStructureFilter from './ServerStructureFilter';

export default class DashboardStore extends ApiRequestableStore<DashboardUIStore> {
  @observable
  serverStructure: Option<ServerStructure.Server> = None;

  @observable
  filteredServerStructure: Option<ServerStructure.Server> = None;

  @observable
  tabs: TabModel[] = [
    TabModel.from({
      title: 'SQL 1',
      content: 'select * from cities',
      currentDatabase: Some('default'),
    }),
    TabModel.from({
      title: 'SQL 2',
      content: `SELECT 323;;73709551615, 0xDEADBEEF, 01, 0.1, 1e100, -1e-100, inf, nan
;;
SELECT arrayFilter(x -> x LIKE '%World%', ['Hello', 'abc World']) AS res
;;
SELECT field2 , sin(number) as sin  FROM system.numbers
sin( cos(DepTimeBlk) ) , bar(123)  -- support.function 
var1 , var2 , var3          -- markup.heading
 OriginWac,DepTimeBlk,DepTime,OriginAirportSeqID      -- variable.parameter
true|false|NULL    -- const
system.numbers_mt | system.numbers -- tables
ReplicatedCollapsingMergeTree -- dataTypes
SYSTEM RELOAD CONFIG -- doubleSysWord

CREATE TABLE IF NOT EXISTS all_hits ON CLUSTER cluster (p Date, i Int32) ENGINE = Distributed(cluster, default, hits)
DROP DATABASE IF EXISTS db ON CLUSTER cluster
SHOW TEMPORARY TABLES FROM default LIKE 'pattern' INTO OUTFILE filename FORMAT JSON
SELECT s, arr, a FROM arrays_test ARRAY JOIN arr AS a
;;
SELECT
    domainWithoutWWW(URL) AS domain,
    domainWithoutWWW(REFERRER_URL) AS referrer,
    device_type,
    count() cnt
FROM hits
GROUP BY domain, referrer, device_type
ORDER BY cnt DESC
LIMIT 5 BY domain, device_type
LIMIT 100
;;
 1, 18446744073709551615, 0xDEADBEEF, 01, 0.1, 1e100, -1e-100, inf, nan
;;
1 + 2 * 3 + 4
;;
SELECT arrayFilter(x -> x LIKE '%World%', ['Hello', 'abc World']) AS res
;;SELECT 1 as ping;;SELECT 2 as ping;;
SELECT 3
;; 
SELECT * from default.arrays_test_ints`,
      currentDatabase: Some('default'),
    }),
  ];

  @observable
  activeTab: Option<TabModel> = Option.of(this.tabs.length ? this.tabs[0] : undefined);

  @observable
  treeFilter: TreeFilterModel = TreeFilterModel.from();

  private filterTimeout: number = 0;

  protected treeFilterChangeReaction = reaction(
    () => this.treeFilter.search,
    search => {
      if (this.filterTimeout) window.clearTimeout(this.filterTimeout);
      // this.filterTimeout = window.setTimeout(() => this.filterServerStructure(search), 500);
      console.log(search);
      // this.filterServerStructure(search);
    }
  );

  // constructor(rootStore: RootStore, uiStore: UIStore<RootStore>, initialState: any) {
  constructor(rootStore: RootStore, uiStore: DashboardUIStore, initialState: any) {
    super(rootStore, uiStore);
    initialState && console.log(initialState);
  }

  @action
  async loadData() {
    // window.setInterval(
    //   () =>
    //     runInAction(() => {
    //       if (this.treeFilter.search) this.treeFilter.search = '';
    //       else this.treeFilter.search = 'a';
    //     }),
    //   2000
    // );

    const t = await this.request(async () => {
      const api = await Api.connect(this.rootStore.appStore.connection.get());
      return api.loadDatabaseStructure();
    });

    t.forEach(result =>
      runInAction(() =>
        transaction(() => {
          this.serverStructure = Option.of(result);
          // this.serverStructure = this.serverStructure.map(ss => {
          //   ss.databases.splice(-1);
          //   return ss;
          // });
          if (
            this.serverStructure.nonEmpty() &&
            !this.treeFilter.has &&
            !this.uiStore.treeExpandedKeys.length
          ) {
            this.uiStore.updateExpandedKeys(this.serverStructure.map(ss => [ss.id]).get());
          }
          if (!this.tabs.length) {
            this.addNewTab();
          }
        })
      )
    );
  }

  @action
  filterServerStructure() {
    if (!this.treeFilter.has) {
      this.filteredServerStructure = None;
      return;
    }

    const filtered = ServerStructureFilter.from(this.treeFilter.search).exec(this.serverStructure);
    // runInAction(() => {
    this.filteredServerStructure = filtered;
    // });
  }

  @action
  setActiveTab(id: string) {
    this.activeTab = Option.of(this.tabs.find(_ => _.id === id));
  }

  // todo: fix if name already exists
  private getNewTabName = () => `SQL ${this.tabs.length + 1}`;

  @action
  addNewTab() {
    const newTab = TabModel.from({
      title: this.getNewTabName(),
      currentDatabase: this.activeTab
        .flatMap(t => t.currentDatabase)
        .orElse(this.serverStructure.map(s => s.databases[0]).map(d => d.name)),
    });
    this.tabs = this.tabs.concat(newTab);
    this.activeTab = Some(newTab);
  }

  @action.bound
  removeTab(id: string) {
    this.tabs = this.tabs.filter(t => t.id !== id);
    this.activeTab = Option.of(this.tabs[this.tabs.length - 1]);
  }

  @action.bound
  saveEditedTab() {
    this.uiStore.editedTab.forEach(tab => {
      this.request(async () => {
        tab.submit();
        localStorage.saveTab(tab.model);
        this.uiStore.hideSaveModal();
      });
    });
  }

  execCode() {
    // if (this.activeTab.isEmpty() || this.activeTab.get().currentDatabase.isEmpty()) return; // ??

    this.activeTab.forEach(async tab => {
      const t = await this.request(async () => {
        const api = await Api.connect(this.rootStore.appStore.connection.get());
        return api.fetch(tab.content, tab.currentDatabase.get());
      });

      t.forEach(result =>
        runInAction(() => {
          tab.data = Option.of(result);
        })
      );
    });
  }
}
