import { observable, action, runInAction, transaction } from 'mobx';
import { Option, None, Some } from 'funfix-core';
import { Api, ServerStructure, localStorage } from 'services';
import { TabModel, TreeFilter, MIN_SEARCH_LENGTH } from 'models';
import RootStore from './RootStore';
import ApiRequestableStore from './ApiRequestableStore';
import DashboardUIStore from './DashboardUIStore';
import ServerStructureFilter, { FilterResult } from './ServerStructureFilter';
import { Query } from '../services/api/Query';

export default class DashboardStore extends ApiRequestableStore<DashboardUIStore> {
  @observable
  serverStructure: Option<ServerStructure.Server> = None;

  @observable
  filteredItems: FilterResult = [];

  @observable
  tabs: TabModel[] = [
    TabModel.from({
      title: 'SQL 1',
      content: `select * from cities
;;
SELECT * FROM system.tables FORMAT TSV
;;
SELECT 33 FORMAT JSON 
;;
SELECT 44 
;;
SELECT 55
`,
      currentDatabase: Some('default'),
    }),
    TabModel.from({
      title: 'SQL 2',
      content: `CREATE TABLE data (ts DATETIME,id VARCHAR,version UInt64, v0 Nullable(DOUBLE), v1 Nullable(DOUBLE)) ENGINE=Null
CREATE MATERIALIZED VIEW dataAgg ENGINE=AggregatingMergeTree PARTITION BY toStartOfDay(ts) ORDER BY (ts,id) AS SELECT ts, id, maxState(version) as version, anyLastState(v0) as v0, anyLastState(v1) as v1 FROM (select * from data order by version) GROUP BY ts,id;

insert into data values(toDateTime('2018-10-11 08:00:00'),'id1',0,0.0,null);
insert into data values(toDateTime('2018-10-11 08:00:00'), 'id1',3,3.0,3.0);
insert into data values(toDateTime('2018-10-11 08:00:00'),'id1',1,1.0,1.0);
insert into data values(toDateTime('2018-10-11 08:00:00'),'id1',2,2.0,2.0);

select ts,id,maxMerge(version),anyLastMerge(v0),anyLastMerge(v1) from (select * from dataAgg order by version) group by ts,id;
;;

SELECT 323;;73709551615, 0xDEADBEEF, 01, 0.1, 1e100, -1e-100, inf, nan
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

  constructor(rootStore: RootStore, uiStore: DashboardUIStore, initialState: any) {
    super(rootStore, uiStore);
    initialState && console.log(initialState);
  }

  @action
  async loadData() {
    const t = await this.request(async () => {
      const api = await Api.connect(this.rootStore.appStore.connection.get());
      return api.loadDatabaseStructure();
    });

    t.forEach(result =>
      runInAction(() =>
        transaction(() => {
          this.serverStructure = Option.of(result);

          // expand root node if expanded keys is empty
          if (this.serverStructure.nonEmpty() && !this.uiStore.treeExpandedKeys.length) {
            this.uiStore.updateTreeExpandedKeys(this.serverStructure.map(ss => [ss.id]).get());
          }

          if (!this.tabs.length) {
            this.addNewTab();
          }
        })
      )
    );
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

  execQueries(queries: Query[]) {
    // if (this.activeTab.isEmpty() || this.activeTab.get().currentDatabase.isEmpty()) return; // ??

    const extendSettings = {
      max_execution_time: 200, // ToDo:Read from Store.User.Tabix.Settings
      max_result_rows: 20000, // ToDo:Read from Store.User.Tabix.Settings
    };

    if (!queries.length) return;
    this.activeTab.forEach(async tab => {
      const t = await this.request(async () => {
        const api = await Api.connect(this.rootStore.appStore.connection.get());
        // return api.fetch(tab.content, tab.currentDatabase.get());
        return Promise.all(
          queries.map(q => {
            q.extendSettings = extendSettings;
            return api.fetch(q);
          })
        );
      });

      runInAction(() => {
        t.forEach(result => {
          // tab.data = Option.of(result);
          tab.data = result;
        });
      });
    });
  }
}
