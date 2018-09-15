import Connection, { isDirectConnection } from '../Connection';
import CoreProvider from './provider/CoreProvider';
import DirectClickHouseProvider from './provider/DirectClickHouseProvider';
import TabixServerProvider from './provider/TabixServerProvider';
import DataDecorator from './DataDecorator';

export default class Api {
  // const CURRENT_BASE_KEY = 'currentBaseConfig';
  // let _DatabaseStructure=new DatabaseStructure();
  // let database = null;
  // let connection = {};

  readonly provider: CoreProvider<Connection>;

  private version?: Object = undefined;

  private isInitialized: boolean = false;

  constructor(connection: Connection) {
    this.provider = isDirectConnection(connection)
      ? new DirectClickHouseProvider(connection)
      : new TabixServerProvider(connection);
  }

  getVersion() {
    return this.version;
  }

  getDatabase() {
    return this.provider.getDatabase();
  }

  // getLogin() {
  //   return this.provider.getLogin();
  // }

  // getPassword() {
  //   return this.provider.getPassword();
  // }

  // getHost() {
  //   return this.provider.getHost();
  // }

  useDatabase(db: any) {
    // @ts-ignore
    this.provider.setDatabase(db);
  }

  isAuthorized() {
    return true;
  }

  isTabixServer() {
    // if (!connection.tabix) return false;
    // if (connection.tabix.server) return true;
    return false;
  }

  /**
   * @param sql
   * @param withDatabase
   * @param format
   * @param extendSettings
   * @returns {Promise<*>}
   */
  // @ts-ignore
  async query(sql, withDatabase, format, extendSettings) {
    // @ts-ignore
    return this.provider.query(sql, withDatabase, format, extendSettings);
  }

  /**
   * @returns {Promise<*>}
   */
  async fastGetVersion() {
    // @ts-ignore
    return this.provider.fastGetVersion();
  }

  /**
   * @param sql
   * @param withDatabase
   * @param format
   * @param extendSettings
   * @returns {Promise<DataDecorator>}
   */
  // @ts-ignore
  async fetch(sql, withDatabase, format, extendSettings) {
    const data = await this.query(sql, withDatabase, format, extendSettings);
    // @ts-ignore
    return new DataDecorator(data, this.provider.getType());
  }

  async loadDatabaseStructure() {
    // @ts-ignore
    return this.provider.loadDatabaseStructure();
  }

  async init() {
    this.version = await this.fastGetVersion();
    if (!this.version) {
      throw new Error('Can`t fetch version server');
    }
    if (!this.isInitialized) {
      this.isInitialized = await this.loadDatabaseStructure();
    }
    return this.isInitialized;
  }

  /**
   * @returns {DatabaseStructure}
   */
  getDatabaseStructure() {
    return this.provider.databaseStructure;
  }

  /**
   * Check connection
   * Send query: SELECT \'login success\'
   */
  check() {
    // this.query('SELECT \'login success\'');
  }

  async test() {
    // // @todo for send_progress_in_http_headers try https://github.com/sockjs/sockjs-client
    //

    //
    // let isInit =await this.loadDatabaseStructure();
    // console.log('dsInit',isInit);

    // @ts-ignore
    const data = await this.fetch(
      'select number,sin(number) as sin,cos(number) as cos FROM system.numbers LIMIT 100'
    );

    return data;
  }
}
