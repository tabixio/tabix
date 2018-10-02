import Connection, { isDirectConnection } from '../Connection';
import CoreProvider from './provider/CoreProvider';
import DirectClickHouseProvider from './provider/DirectClickHouseProvider';
import TabixServerProvider from './provider/TabixServerProvider';
import DataDecorator from './DataDecorator';

export default class Api {
  static async connect(connection: Connection): Promise<Api> {
    const api = new Api(connection);
    await api.init();
    return api;
  }

  readonly provider: CoreProvider<Connection>;

  private version?: string;

  private constructor(connection: Connection) {
    this.provider = isDirectConnection(connection)
      ? new DirectClickHouseProvider(connection)
      : new TabixServerProvider(connection);
  }

  getVersion() {
    return this.version;
  }

  // refactor
  private async init() {
    this.version = await this.provider.fastGetVersion();
    if (!this.version) {
      throw new Error('Can`t fetch version server');
    }
    console.log(`Connection - OK, version: ${this.version}`);
  }

  // async fastGetVersion() {
  //   return this.provider.fastGetVersion();
  // }

  async query(sql: string, withDatabase?: string, format?: string, extendSettings?: any) {
    return this.provider.query(sql, withDatabase, format, extendSettings);
  }

  async fetch(sql: string, withDatabase?: string, format?: string, extendSettings?: any) {
    const data = await this.query(sql, withDatabase, format, extendSettings);
    return new DataDecorator(data, this.provider.getType());
  }

  async loadDatabaseStructure() {
    return this.provider.getDatabaseStructure();
  }

  test() {
    return this.fetch(
      'select number,sin(number) as sin,cos(number) as cos FROM system.numbers LIMIT 100'
    );
  }
}
