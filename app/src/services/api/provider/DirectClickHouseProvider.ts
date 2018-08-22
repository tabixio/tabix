import CoreProvider from './CoreProvider';

/* eslint-disable */

export default class DirectClickHouseProvider extends CoreProvider {
  getType() {
    return 'direct';
  }

  // @ts-ignore
  makeUrlRequest(withDatabase, extend_settings) {
    let url = '';
    const connection = this.getConnection();
    let httpProto = '';
    if (!(connection.host.indexOf('://') > 0 || connection.host.indexOf('/') == 0)) {
      httpProto = 'http://';
    }
    // ClickHouse/dbms/src/Interpreters/Settings.h : https://github.com/yandex/ClickHouse/blob/master/dbms/src/Interpreters/Settings.h
    url = httpProto + connection.host;
    url += '/?';
    url +=
      'add_http_cors_header=1&log_queries=1&output_format_json_quote_64bit_integers=1&output_format_json_quote_denormals=1';
    // max_block_size=1&send_progress_in_http_headers=1&http_headers_progress_interval_ms=500
    // ------------

    if (connection.password) {
      url += `&user=${encodeURIComponent(connection.login)}&password=${encodeURIComponent(
        connection.password
      )}`;
    } else {
      url += `&user=${encodeURIComponent(connection.login)}`;
    }

    if (withDatabase) {
      url += `&database=${encodeURIComponent(this.getDatabase())}`;
    }
    if (extend_settings) {
      url += `&${extend_settings}`;
    }

    // @ts-ignore
    if (connection.params) {
      // @ts-ignore
      url += `&${connection.params}`;
    }
    return url;
  }

  async loadDatabaseStructure() {
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
    // @ts-ignore
    const functions = await this.query('SELECT name,is_aggregate from system.functions');
    console.timeEnd('Load Database Structure!');

    // @todo : put to cache ( in localStore )
    // @ts-ignore
    this.databaseStructure().init(
      columns.data,
      tables.data,
      databases.data,
      dictionaries.data,
      functions.data
    );
    // @ts-ignore
    return this.databaseStructure().isInit();
  }

  // @ts-ignore
  query(sql, withDatabase, format, extend_settings) {
    const query = this.makeSqlQuery(sql, format);
    const url = this.makeUrlRequest(withDatabase, extend_settings);
    const myInit = {
      mode: 'cors',
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept-Encoding': 'gzip',
      },
      body: query,
      // credentials:'include' // Error : The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
    };
    // @ts-ignore
    const myRequest = new Request(url, myInit);
    return this.request(myRequest);
  }

  fastGetVersion() {
    const url = this.makeUrlRequest(false, false);
    const query = 'SELECT version() as version';
    return this.xhr(query, url);
  }
}
