import { ConnectionLike, ConnectionType } from '../../Connection';
import ServerStructure from '../ServerStructure';
import { Query } from '../Query';
import preparedStatementQuery from './preparedStatementQuery';
import { PromisePool } from '@supercharge/promise-pool';

export interface QueryResponse {
  response: any;
  query: Query;
  error: any;
  isError: boolean;
}
export interface QueryResponseKey {
  [key: string]: QueryResponse;
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

  abstract getType(): ConnectionType;

  abstract query(query: Query | string): Promise<QueryResponse>;

  abstract getProcessLists(_isOnlySelect: boolean, _isCluster: boolean): Promise<any>;

  abstract getTableColumns(_database: string, _tablename: string): Promise<any>;

  abstract makeTableDescribe(_database: string, _tablename: string): Promise<string>;

  abstract fastGetVersion(): Promise<string>;

  abstract getDatabaseStructure(): Promise<ServerStructure.Server>;

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
  async fetchPool(pool: RequestPool, concurrency = 4): Promise<QueryResponseKey> {
    // Exec
    const r: QueryResponseKey = {};

    const reqPool: Array<{ key: string; query: Query | string }> = [];
    for (const [key, v] of Object.entries(pool)) {
      reqPool.push({ key, query: v });
    }

    await PromisePool.for(reqPool)
      .withConcurrency(concurrency)
      // .handleError(async (error, item) => {
      //   return errors.push({ error, item });
      // })
      .process(async (data, index) => {
        if (typeof data.query === 'string') {
          const q = new Query(data.query, data.key);
          q.setJsonFormat();
          r[data.key] = await this.query(q);
        } else {
          data.query.setId(data.key);
          r[data.key] = await this.query(data.query);
        }
      });
    return r;
  }
}
