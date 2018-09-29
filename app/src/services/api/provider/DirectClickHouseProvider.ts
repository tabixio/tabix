import { DirectConnection, ConnectionType } from '../../Connection';
import ServerStructure from '../ServerStructure';
import CoreProvider from './CoreProvider';

export default class DirectClickHouseProvider extends CoreProvider<DirectConnection> {
  getType() {
    return ConnectionType.direct;
  }

  makeUrlRequest(withDatabase?: string, extendSettings?: any) {
    // const httpProto =
    //   this.connection.connectionUrl.indexOf('://') === 0 ||
    //   this.connection.connectionUrl.indexOf('/') > 0
    //     ? 'http://'
    //     : '';

    // ClickHouse/dbms/src/Interpreters/Settings.h : https://github.com/yandex/ClickHouse/blob/master/dbms/src/Interpreters/Settings.h
    let url =
      `${this.connection.connectionUrl}/?` +
      `add_http_cors_header=1&log_queries=1&output_format_json_quote_64bit_integers=1&output_format_json_quote_denormals=1`;
    // max_block_size=1&send_progress_in_http_headers=1&http_headers_progress_interval_ms=500
    // ------------

    if (this.connection.password) {
      url += `&user=${encodeURIComponent(this.connection.username)}&password=${encodeURIComponent(
        this.connection.password
      )}`;
    } else {
      url += `&user=${encodeURIComponent(this.connection.username)}`;
    }

    if (withDatabase) {
      url += `&database=${encodeURIComponent(withDatabase)}`;
    }
    if (extendSettings) {
      url += `&${extendSettings}`;
    }

    if (this.connection.params) {
      url += `&${this.connection.params}`;
    }

    return url;
  }

  async getDatabaseStructure() {
    console.time('Load Database Structure!');
    // @ts-ignore
    const columns = await this.query('SELECT * FROM system.columns');
    // @ts-ignore
    const tables = await this.query('SELECT database,name,engine FROM system.tables');
    // @ts-ignore
    const databases = await this.query('SELECT name FROM system.databases');
    // @ts-ignore
    const dictionaries = await this.query(
      'SELECT name,key,attribute.names,attribute.types from system.dictionaries ARRAY JOIN attribute ORDER BY name,attribute.names'
    );
    const functions = await this.query('SELECT name,is_aggregate from system.functions');
    console.timeEnd('Load Database Structure!');

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

    // @todo : put to cache ( in localStore )
    return ServerStructure.from(
      columnList,
      tables.data,
      databases.data,
      dictionaries.data,
      functions.data
    );
  }

  query(sql: string, withDatabase?: string, format: string = 'FoRmAt JSON', extendSettings?: any) {
    const query = format ? `${sql}\n${format}` : sql;
    const url = this.makeUrlRequest(withDatabase, extendSettings);
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
    // return this.request(url, init);
    return fetch(url, init).then(r => r.json());
  }

  fastGetVersion() {
    const url = this.makeUrlRequest();
    const query = 'SELECT version() as version';
    return fetch(`${url}&query=${query}`, { method: 'GET' }).then(r => r.text());
  }
}
