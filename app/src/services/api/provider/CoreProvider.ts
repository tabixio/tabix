import { ConnectionLike, ConnectionType } from '../../Connection';
import ServerStructure from '../ServerStructure';
import { Query } from '../Query';

export default abstract class CoreProvider<C extends ConnectionLike> {
  readonly connection: C;

  constructor(connection: C) {
    this.connection = connection;
  }

  abstract getType(): ConnectionType;

  // abstract queryString(
  //   sql: string,
  //   withDatabase?: string,
  //   format?: string,
  //   extendSettings?: any
  // ): Promise<any>;

  abstract query(query: Query): Promise<any>;

  abstract getProcessLists(_isOnlySelect: boolean, _isCluster: boolean): Promise<any>;

  abstract getTableColumns(_database: string, _tablename: string): Promise<any>;

  abstract makeTableDescribe(_database: string, _tablename: string): Promise<string>;

  abstract fastGetVersion(): Promise<string>;

  abstract getDatabaseStructure(): Promise<ServerStructure.Server>;

  // refactor: use axios?
  // For what this method?
  request(request: Request | string, init?: RequestInit) {
    return fetch(request, init)
      .then(response => {
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
        response => {
          if (response === 'OK' || !response) {
            return 'OK';
          }
          return response;
        },
        // refactor: use catch
        responseBody => Promise.reject(responseBody)
      );
  }
}
