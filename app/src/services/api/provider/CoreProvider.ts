import { ConnectionLike, ConnectionType } from '../../Connection';
import ServerStructure from '../ServerStructure';
import {Query} from '../Query';

export default abstract class CoreProvider<C extends ConnectionLike> {
  readonly connection: C;

  constructor(connection: C) {
    this.connection = connection;
  }

  abstract getType(): ConnectionType;

    abstract queryString(
    sql: string,
    withDatabase?: string,
    format?: string,
    extendSettings?: any
  ): Promise<any>;

    abstract query(query: Query): Promise<any>;

  abstract fastGetVersion(): Promise<string>;

  abstract getDatabaseStructure(): Promise<ServerStructure.Server>;

  // refactor: What fot this method??
  // makeQueryId() {
  //   let text = '';
  //   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (let i = 0; i < 8; i += 1)
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   return text;
  // }

  // refactor: use axios?
  // For what this method?
  request(request: Request | string, init?: RequestInit) {
    return fetch(request, init)
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (
          contentType &&
          contentType.includes('text/tab-separated-values') &&
          response.status === 200 &&
          response.statusText.toLowerCase() === 'ok'
        ) {
          // if insert
          return Promise.resolve('OK');
        }
        if (
          contentType &&
          contentType.includes('text/plain') &&
          response.status === 200 &&
          response.statusText.toLowerCase() === 'ok'
        ) {
          // if create table && drop table
          return Promise.resolve('OK');
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
          if (response === 'OK') {
            return 'OK';
          }
          return response;
        },
        // refactor: use catch
        responseBody => Promise.reject(responseBody)
      );
  }
}
