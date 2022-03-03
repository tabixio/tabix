import { ConnectionType, DirectConnection } from '../../Connection';
import ServerStructure from '../ServerStructure';
import CoreProvider, { QueryResponse, RequestPool } from './CoreProvider';
import { Query } from '../Query';

export default class DirectClickHouseProvider extends CoreProvider<DirectConnection> {
  private clusters: ReadonlyArray<ServerStructure.Cluster> | undefined;

  getType() {
    return ConnectionType.Direct;
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
      result_overflow_mode: 'throw', // break
      timeout_overflow_mode: 'throw',
      max_execution_time: 10,
      max_result_rows: 90000,
      max_result_bytes: 10000000,

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

  private getRequestUrl(extendSettings?: any, onlyUrlCheck = false): string {
    const httpProto = this.connection.connectionUrl.indexOf('//') === -1 ? 'http://' : '';
    // this.connection.connectionUrl.indexOf('/') > 0

    let url = `${httpProto}${this.connection.connectionUrl}`;
    // if need only checkers
    if (onlyUrlCheck) return url;
    // add /?
    url = `${url}/?`;

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
    const pool: RequestPool = {
      tables: this.prepared().databaseTablesList(_LimitRead * 2),
      databases: this.prepared().databaseList(_LimitRead * 2),
      functions: this.prepared().functionsList(),
      clusters: this.prepared().clustersList(_LimitRead),
      dictionaries: this.prepared().dictionariesList(_LimitRead),
      columns: this.prepared().columnsList(_LimitRead * 10),
    };
    const data = await this.fetchPool(pool);
    const ConnectionName = this.connection.connectionName;
    if ('columns' in data && 'tables' in data && 'databases' in data) {
      // Create ServerStructure.Server
      return ServerStructure.from(
        data['columns'].response.data,
        data['tables'].response.data,
        data['databases'].response.data,
        data['dictionaries'].response.data,
        data['functions'].response.data,
        data['clusters'].response.data,
        ConnectionName
      );
    } else {
      //
      console.error('Can`t create getDatabaseStructure', data);
      throw Error('Can`t create getDatabaseStructure');
    }
  }

  public query(q: Query | string, resultAsKey = false): Promise<QueryResponse> {
    if (typeof q === 'string') {
      q = new Query(q);
      q.setJsonFormat();
    }
    //
    const url = this.getRequestUrl(q.settings?.extendSettings);
    const init = this.getRequestInit(q.getSQL());
    return this.request(url, init)
      .then((r) => {
        return { response: r, query: q as Query, error: null, isError: false } as QueryResponse;
      })
      .catch((e) => {
        return { response: null, query: q as Query, error: e, isError: true } as QueryResponse;
      });
  }

  fastGetVersion(): Promise<string> {
    const url = this.getRequestUrl();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout:

    const query = 'SELECT version() as version';
    return fetch(`${url}&query=${query}`, { method: 'GET', signal: controller.signal }).then((r) =>
      r.text()
    );
  }

  async getProcessLists(isOnlySelect: boolean, isCluster: boolean): Promise<QueryResponse> {
    const clusterList: Array<string> = [];
    if (this.clusters) {
      this.clusters.map((c) => {
        clusterList.push(`${c.hostAddress}:${c.port}`);
        return c;
      });
    }
    const sql = this.prepared().process(
      isOnlySelect,
      isCluster,
      clusterList,
      this.connection.username,
      this.connection.password
    );
    return await this.query(sql);
  }

  async getTableColumns(database: string, tablename: string): Promise<Array<any> | undefined> {
    const r = await this.query(this.prepared().columnsList(1500, database, tablename));
    if (r.isError || !r.response.data) return undefined;
    return r.response.data;
  }

  async makeTableDescribe(database: string, tablename: string): Promise<string | undefined> {
    const r = await this.query(this.prepared().describe(database, tablename));
    if (r.isError || !r.response.data) return undefined;

    let sql = '';
    if (r && r.response.data && r.response.data[0] && r.response.data[0].statement) {
      sql = r.response.data[0].statement;
    }
    return sql;
  }
}
