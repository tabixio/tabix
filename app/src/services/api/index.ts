import TabixServerProvider from './provider/TabixServerProvider';
import DirectClickHouseProvider from './provider/DirectClickHouseProvider';
import DataDecorator from './DataDecorator';

export default class API {
  // const CURRENT_BASE_KEY = 'currentBaseConfig';
  // let _DatabaseStructure=new DatabaseStructure();
  // let database = null;
  // let connection = {};

  readonly provider: DirectClickHouseProvider;

  private version?: Object = undefined;

  constructor(connection) {
    this.provider = new DirectClickHouseProvider(connection);
    this._initDs = false;
  }

  getVersion() {
    return this.version;
  }

  getDatabase() {
    return this.provider.getDatabase();
  }

  getLogin() {
    return this.provider.getLogin();
  }

  getPassword() {
    return this.provider.getPassword();
  }

  getHost() {
    return this.provider.getHost();
  }

  useDatabase(db) {
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
   * @param extend_settings
   * @returns {Promise<*>}
   */
  async query(sql, withDatabase, format, extend_settings) {
    return this.provider.query(sql, withDatabase, format, extend_settings);
  }

  /**
   * @returns {Promise<*>}
   */
  async fastGetVersion() {
    return this.provider.fastGetVersion();
  }

  /**
   * @param sql
   * @param withDatabase
   * @param format
   * @param extend_settings
   * @returns {Promise<DataDecorator>}
   */
  async fetch(sql, withDatabase, format, extend_settings) {
    const data = await this.query(sql, withDatabase, format, extend_settings);
    return new DataDecorator(data, this.provider.getType());
  }

  async loadDatabaseStructure() {
    return this.provider.loadDatabaseStructure();
  }

  async init() {
    this.version = await this.fastGetVersion();
    if (!this.version) {
      throw new Error('Can`t fetch version server');
    }
    if (!this._initDs) {
      this._initDs = await this.loadDatabaseStructure();
    }
    return this._initDs;
  }

  /**
   * @returns {DatabaseStructure}
   */
  getDatabaseStructure() {
    return this.provider.databaseStructure();
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

    const data = await this.fetch(
      'select number,sin(number) as sin,cos(number) as cos FROM system.numbers LIMIT 100'
    );

    return data;
  }
}
