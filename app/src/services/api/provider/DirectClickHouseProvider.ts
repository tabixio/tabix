import { ConnectionType, DirectConnection } from '../../Connection';
import ServerStructure from '../ServerStructure';
import CoreProvider, { QueryResponse } from './CoreProvider';
import { Query } from '../Query';
import { PromisePool } from '@supercharge/promise-pool';

export default class DirectClickHouseProvider extends CoreProvider<DirectConnection> {
  private clusters: ReadonlyArray<ServerStructure.Cluster> | undefined;

  getType() {
    return ConnectionType.Direct;
  }

  private getRequestInit(query: string): RequestInit {
    const init: RequestInit = {
      mode: 'cors',
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept-Encoding': 'gzip',
      },
      body: query,
      // credentials: 'include', // Error : The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
    };
    return init;
  }

  private getPresetSettings(extendSettings: any, urlParams: string | undefined): object {
    // Doc
    // ClickHouse/dbms/src/Interpreters/Settings.h :
    // https://github.com/yandex/ClickHouse/blob/master/dbms/src/Interpreters/Settings.h
    // https://github.com/ClickHouse/ClickHouse/blob/master/src/Core/Settings.h
    const defaultState = {
      output_format_json_quote_denormals: 1,
      output_format_json_quote_64bit_integers: 1,
      log_queries: 1,
      enable_http_compression: 1,
      add_http_cors_header: 1,
      result_overflow_mode: 'throw',
      timeout_overflow_mode: 'throw',
      max_execution_time: 10,
      max_result_rows: 90000,

      // max_block_size:200,
      // send_progress_in_http_headers:1,
      // http_headers_progress_interval_ms:500
      // http_connection_timeout
      // http_send_timeout
      // enable_http_compression
      // cancel_http_readonly_queries_on_client_close
      // http_options_response
      // output_format_json_quote_denormals
      // use_client_time_zone
    };

    if (typeof urlParams === 'string' && urlParams) {
      const hashes = urlParams.slice(urlParams.indexOf('?') + 1).split('&');

      hashes.map((hash) => {
        const [key, val] = hash.split('=');
        defaultState[key] = decodeURIComponent(val);
        return true;
      });
    }
    if (typeof extendSettings === 'object') {
      return {
        ...defaultState,
        ...extendSettings,
      };
    }
    return defaultState;
  }

  private getRequestUrl(extendSettings?: any): string {
    const httpProto = this.connection.connectionUrl.indexOf('//') === -1 ? 'http://' : '';
    // this.connection.connectionUrl.indexOf('/') > 0

    let url = `${httpProto}${this.connection.connectionUrl}/?`;

    const settings: object = this.getPresetSettings(extendSettings, this.connection.params);

    url += Object.entries(settings)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
    if (this.connection.password) {
      url += `&user=${encodeURIComponent(this.connection.username)}&password=${encodeURIComponent(
        this.connection.password
      )}`;
    } else {
      url += `&user=${encodeURIComponent(this.connection.username)}`;
    }

    // if (withDatabase) {
    //   url += `&database=${encodeURIComponent(withDatabase)}`;
    // }

    return url;
  }

  async getDatabaseStructure(): Promise<ServerStructure.Server> {
    const _LimitRead = 5000;

    // Create pool of SQL-Query
    const pool: { key: string; query: string }[] = [
      { key: 'tables', query: this.prepared().databaseTablesList(_LimitRead * 2) },
      { key: 'databases', query: this.prepared().databaseList(_LimitRead * 2) },
      { key: 'functions', query: this.prepared().functionsList() },
      { key: 'clusters', query: this.prepared().clustersList(_LimitRead) },
      { key: 'dictionaries', query: this.prepared().dictionariesList(_LimitRead) },
      { key: 'columns', query: this.prepared().columnsList(_LimitRead * 10) },
    ];

    // Exec
    const { results, errors } = await PromisePool.for(pool)
      .withConcurrency(4)
      .handleError(async (error, user) => {
        throw error; // Uncaught errors will immediately stop PromisePool
      })
      .process(async (data) => {
        const q = new Query(data.query, data.key);
        q.setJsonFormat();
        return this.query(q);
      });
    // Fetch done, fill map [key<->result]
    const map: Map<string, number> = new Map<string, number>();
    results.map((q: QueryResponse, index) => {
      map.set(q.query.id, index);
    });

    const ConnectionName = this.connection.connectionName;

    if (
      // Check all filled
      map.has('columns') &&
      map.has('tables') &&
      map.has('databases') &&
      map.has('dictionaries') &&
      map.has('functions') &&
      map.has('clusters')
    ) {
      // Create ServerStructure.Server
      return ServerStructure.from(
        results[map.get('columns') ?? 0].response.data,
        results[map.get('tables') ?? 0].response.data,
        results[map.get('databases') ?? 0].response.data,
        results[map.get('dictionaries') ?? 0].response.data,
        results[map.get('functions') ?? 0].response.data,
        results[map.get('clusters') ?? 0].response.data,
        ConnectionName
      );
    } else {
      console.error('Can`t create getDatabaseStructure', results);
      throw Error('Can`t create getDatabaseStructure');
    }
  }

  public query(q: Query | string): Promise<QueryResponse> {
    if (typeof q === 'string') {
      q = new Query(q);
      q.setJsonFormat();
    }
    const url = this.getRequestUrl(q.settings?.extendSettings);
    const init = this.getRequestInit(q.getSQL());
    return this.request(url, init).then((r) => {
      return { response: r, query: q as Query, error: [] };
    });
  }

  fastGetVersion(): Promise<string> {
    const url = this.getRequestUrl();
    const query = 'SELECT version() as version';
    return fetch(`${url}&query=${query}`, { method: 'GET' }).then((r) => r.text());
  }

  async getProcessLists(isOnlySelect: boolean, isCluster: boolean): Promise<any> {
    const clusterList: Array<string> = [];
    if (this.clusters) {
      this.clusters.map((c) => {
        clusterList.push(`${c.hostAddress}:${c.port}`);
        return c;
      });
    }
    const sql = this.prepared().processLists(
      isOnlySelect,
      isCluster,
      clusterList,
      this.connection.username,
      this.connection.password
    );
    return await this.query(sql);
  }

  async getTableColumns(database: string, tablename: string) {
    const columns = await this.query(this.prepared().columnsList(1500, database, tablename));
    return columns;
  }

  async _fetchQueryPool(pool: { key: string; query: string }[]): Promise<any> {
    // Exec
    // const errors: Array<any> = [];

    const { results, errors } = await PromisePool.for(pool)
      .withConcurrency(4)
      // .handleError(async (error, item) => {
      //   return errors.push({ error, item });
      // })
      .process(async (data) => {
        const q = new Query(data.query, data.key);
        q.setJsonFormat();
        return this.query(q);
      });
    return { results, errors };
  }

  async fetchPool(pool: { key: string; query: string | Query }[]): Promise<any> {
    const d = await this.fetchPool(pool);
    const map: Map<string, number> = new Map<string, number>();

    d.map((q: QueryResponse, index) => {
      map.set(q.query.id, index);
    });

    console.log('dddd2:', d);
    return d;
  }

  async metricsTabStructure() {
    // Create pool of SQL-Query
    const pool: { key: string; query: string }[] = [
      { key: 'replicas', query: this.prepared().replicas() },
      { key: 'replicaQueue', query: this.prepared().replicaQueue() },
      { key: 'replicatedFetches', query: this.prepared().replicatedFetches() },
      { key: 'partsPerTable', query: this.prepared().partsPerTable() },
      { key: 'merges', query: this.prepared().merges() },
      { key: 'recentDataParts', query: this.prepared().recentDataParts() },
      { key: 'mutations', query: this.prepared().mutations() },
      { key: 'crashLog', query: this.prepared().crashLog() },
      // { key: 'detachedDataParts', query: this.prepared().detachedDataParts() },
      // { key: 'failedQueries', query: this.prepared().failedQueries() },
      // { key: 'stackTraces', query: this.prepared().stackTraces() },
    ];
    const e = await this.fetchPool(pool);
    console.log('E2:', e);
    return e;
  }
  async makeTableDescribe(_database: string, _tablename: string) {
    // let dat = await this.query(`SHOW CREATE TABLE ${_database}.${_tablename}`);
    // dat = dat.response;
    //
    // let sql = '';
    // if (dat && dat.data && dat.data[0] && dat.data[0].statement) {
    //   sql = dat.data[0].statement;
    // }
    return `sql[XF2]`;
  }
}
