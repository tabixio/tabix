import { DirectConnection, ConnectionType } from '../../Connection';
import ServerStructure from '../ServerStructure';
import CoreProvider from './CoreProvider';
import { Query } from '../Query';
import DataDecorator from '../DataDecorator';

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
      // credentials:'include' // Error : The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
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

  private getRequestUrl(withDatabase?: string, extendSettings?: any): string {
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

  async getDatabaseStructure() {
    const limitClusters = 50;
    const limitColumns = 4000;
    const limitTables = 2000;
    const limitDBs = 2000;
    const limitDics = 1500;

    const columns = await this.queryString(`SELECT *
                                            FROM system.columns LIMIT ${limitColumns}`);
    const tables = await this.queryString(this.preparedQuery.databaseTablesList(limitTables));
    const databases = await this.queryString(this.preparedQuery.databaseList(limitDBs));
    const dictionaries = await this.queryString(this.preparedQuery.dictionariesList(limitDics));
    const functions = await this.queryString(this.preparedQuery.functionsList());

    // ToDo: CheckSupportFunctions , ['normalizeQueryKeepNames','normalizedQueryHashKeepNames','normalizeQuery']
    // Create Map?

    const clusters = await this.queryString(
      `SELECT host_address as hostAddress, port
       FROM system.clusters
       GROUP BY host_address, port LIMIT ${limitClusters}`
    );
    const columnList = columns.data.map((c: any) => {
      /* eslint-disable camelcase */
      const {
        data_compressed_bytes,
        data_uncompressed_bytes,
        default_expression,
        default_kind,
        default_type,
        marks_bytes,
        ...rest
      } = c;

      return {
        ...rest,
        dataCompressedBytes: +data_compressed_bytes,
        dataUncompressedBytes: +data_uncompressed_bytes,
        defaultExpression: default_expression,
        defaultKind: default_kind,
        defaultType: default_type || '',
        marksBytes: +marks_bytes,
      } as ServerStructure.Column;
      /* eslint-enable */
    });
    this.clusters = clusters.data;

    // @todo : put to cache ( in localStore )
    const ConnectionName = this.connection.connectionName;
    return ServerStructure.from(
      columnList,
      tables.data,
      databases.data,
      dictionaries.data,
      functions.data,
      clusters.data,
      ConnectionName
    );
  }

  private queryString(
    sql: string,
    withDatabase?: string,
    format = 'FoRmAt JSON',
    extendSettings?: any
  ) {
    const init: RequestInit = this.getRequestInit(format ? `${sql}\n${format}` : sql);
    const url = this.getRequestUrl(withDatabase, extendSettings);
    return fetch(url, init).then((r) => r.json());
  }

  query(q: Query) {
    // @TODO: if not database exist
    const url = this.getRequestUrl(q.currentDatabase, q.extendSettings);
    const init: RequestInit = this.getRequestInit(q.sql);
    return this.request(url, init).then((r) => r);
  }

  fastGetVersion() {
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
    const sql = this.preparedQuery.processLists(
      isOnlySelect,
      isCluster,
      clusterList,
      this.connection.username,
      this.connection.password
    );
    // const q = new Query();
    return await this.queryString(sql);
  }

  async getTableColumns(database: string, tablename: string) {
    const columns = await this.queryString(
      `SELECT *
       FROM system.columns
       WHERE database = '${database}' AND table ='${tablename}'`
    );
    return columns;
  }

  async makeTableDescribe(_database: string, _tablename: string) {
    // @ts-ignore
    const dat = await this.queryString(`SHOW CREATE TABLE ${_database}.${_tablename}`);
    let sql = '';
    if (dat && dat.data && dat.data[0] && dat.data[0].statement) {
      sql = dat.data[0].statement;
    }
    return sql;
  }
}
