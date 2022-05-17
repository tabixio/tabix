import { ConnectionLike, ConnectionType } from '../../Connection';
import ServerStructure from '../ServerStructure';
import { Query } from '../Query';
import preparedStatementQuery from './preparedStatementQuery';
import { PromisePool } from '@supercharge/promise-pool';

export interface QueryResponse {
  response: any;
  query: Query;
  error: string | null;
  isError: boolean;
}

export interface QueryResponseKey {
  [key: string]: QueryResponse;
}

export interface QueryResponsePool {
  pool: QueryResponseKey;
  keys: string[];
  isOk: boolean;
}

export interface RequestPool {
  [key: string]: Query | string;
}

export default abstract class CoreProvider<C extends ConnectionLike> {
  readonly connection: C;

  preparedQuery: preparedStatementQuery;

  constructor(connection: C) {
    this.connection = connection;
    this.preparedQuery = new preparedStatementQuery('');
  }

  prepared(): preparedStatementQuery {
    if (!this.preparedQuery.version) {
      throw Error('preparedStatementQuery not set version');
    }
    return this.preparedQuery;
  }

  protected getRequestInit(query: string): RequestInit {
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

  checkVersionUpdateTabix(build: string, ch: string): Promise<string> {
    const url = `https://tabix.io/checkVersion/UpdateTabix?dt=` + Date.now();
    const data = {
      tabix: build,
      clickhouse_compatibility: ch,
    };
    const init = this.getRequestInit(JSON.stringify(data));
    return this.request(url, init);
  }

  abstract getType(): ConnectionType;

  abstract query(query: Query | string): Promise<QueryResponse>;

  abstract getProcessLists(_isOnlySelect: boolean, _isCluster: boolean): Promise<QueryResponse>;

  abstract getTableColumns(_database: string, _tablename: string): Promise<Array<any> | undefined>;

  abstract makeTableDescribe(database: string, tablename: string): Promise<string | undefined>;

  abstract fastCheckConnection(): any;

  abstract fastGetVersion(): Promise<string>;

  abstract getDatabaseStructure(limitRead: number): Promise<ServerStructure.Server>;

  abstract checkDatabaseStructure(): Promise<ServerStructure.Server>;

  // refactor: use axios?
  // For what this method?
  request(request: Request | string, init?: RequestInit) {
    return fetch(request, init)
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (
          contentType &&
          response.status === 200 &&
          response.statusText.toLowerCase() === 'ok' &&
          (contentType.includes('text/plain') ||
            contentType.includes('application/xml') ||
            contentType.includes('text/csv') ||
            contentType.includes('text/tab-separated-values'))
        ) {
          // if create table && drop table
          return Promise.resolve(response.text());
        }
        if (
          contentType &&
          contentType.includes('application/json') &&
          response.status >= 200 &&
          response.status < 300
        ) {
          // return Promise.resolve(response);
          return response.json();
        }
        return response.text().then(Promise.reject.bind(Promise)); // refactor ???
        // return response.text();
      })
      .then(
        (response) => {
          if (response === 'OK' || !response) {
            return 'OK';
          }
          return response;
        },
        // refactor: use catch
        (responseBody) => Promise.reject(responseBody)
      );
  }

  /**
   * Send concurrency query
   *
   *
   * @param pool
   * @param concurrency
   */
  async fetchPool(pool: RequestPool, concurrency = 4): Promise<QueryResponsePool> {
    // Exec
    const r: QueryResponsePool = {
      pool: {},
      keys: [],
      isOk: false,
    };
    let haveErrors = false;
    const reqPool: Array<{ key: string; query: Query | string }> = [];
    for (const [key, v] of Object.entries(pool)) {
      r.keys.push(key);
      reqPool.push({ key, query: v });
    }

    await PromisePool.for(reqPool)
      .withConcurrency(concurrency)
      .process(async (data, index) => {
        if (typeof data.query === 'string') {
          const q = new Query(data.query, data.key);
          q.setJsonFormat();
          r.pool[data.key] = await this.query(q);
        } else {
          data.query.setId(data.key);
          r.pool[data.key] = await this.query(data.query);
        }
        if (r.pool[data.key].isError) {
          haveErrors = true;
        }
      });
    r.isOk = !haveErrors;
    return r;
  }
}
