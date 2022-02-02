import Connection, { isDirectConnection } from '../Connection';
import CoreProvider from './provider/CoreProvider';
import DirectClickHouseProvider from './provider/DirectClickHouseProvider';
import TabixServerProvider from './provider/TabixServerProvider';
import DataDecorator from './DataDecorator';
import { Query } from './Query';
import preparedStatementQuery from './provider/preparedStatementQuery';

export default class Api {
  static async connect(connection: Connection): Promise<Api> {
    const provider = isDirectConnection(connection)
      ? new DirectClickHouseProvider(connection)
      : new TabixServerProvider(connection);
    // -----
    console.log('Try connect to clickhouse');
    let version = '';
    try {
      version = await provider.fastGetVersion();
      console.log('Version CH', version);
    } catch (e) {
      throw new Error('Can`t fetch version server,check connection URL/DNS/Host:PORT');
    }
    if (!version) {
      throw new Error('Can`t fetch version server');
    }
    console.log(`Connection - OK, version: ${version}`);
    return new Api(provider, version);
  }

  private constructor(
    public readonly provider: CoreProvider<Connection>,
    public readonly version: string
  ) {
    // Cnos
    this.provider.preparedQuery.setVersion(version);
  }

  public prepared(): preparedStatementQuery {
    return this.provider.prepared();
  }

  public query(sql: string): Promise<DataDecorator> {
    return this.provider.query(sql).then((r) => {
      return new DataDecorator(r.response, r.query);
    });
  }

  async fetch(query: Query): Promise<DataDecorator> {
    const r = await this.provider.query(query);
    return new DataDecorator(r.response, r.query);
  }

  getProcessLists = async (isOnlySelect: boolean, isCluster: boolean): Promise<any> =>
    this.provider.getProcessLists(isOnlySelect, isCluster);

  getTableColumns = async (database: string, tablename: string) =>
    this.provider.getTableColumns(database, tablename);

  makeTableDescribe = async (database: string, tablename: string) =>
    this.provider.makeTableDescribe(database, tablename);

  loadDatabaseStructure = async () => this.provider.getDatabaseStructure();
  // @ts-ignore
  metricsTabStructure() {
    return this.provider.metricsTabStructure();
  }
}
