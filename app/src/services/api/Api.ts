import Connection, { isDirectConnection } from '../Connection';
import CoreProvider, {
  QueryResponse,
  QueryResponsePool,
  RequestPool,
} from './provider/CoreProvider';
import DirectClickHouseProvider from './provider/DirectClickHouseProvider';
import TabixServerProvider from './provider/TabixServerProvider';
import connectGetErrorMessage from './provider/connectGetErrorMessage';
import DataDecorator from './DataDecorator';
import { Query } from './Query';
import { DescriptionError } from 'module/mobx-utils';
import preparedStatementQuery from './provider/preparedStatementQuery';

export default class Api {
  static async connect(connection: Connection): Promise<Api> {
    const provider = isDirectConnection(connection)
      ? new DirectClickHouseProvider(connection)
      : new TabixServerProvider(connection);
    // -----
    // connection.readonly = true; // check
    console.log('Try connect to clickhouse');
    let version = '';
    try {
      version = await provider.fastGetVersion();
      console.log('Version CH', version);
      //throw new Error('Cants');
    } catch (e) {
      let typeError = '';
      console.log(e.name);
      if (e.name == 'AbortError') {
        typeError = 'AbortError';
      }
      throw {
        title: 'Error connection to ClickHouse.',
        description: connectGetErrorMessage(connection, typeError),
        error: new Error('Error on connection'),
      } as DescriptionError;
    }
    if (!version) {
      throw {
        title: 'Can`t fetch version server',
        description: connectGetErrorMessage(connection, 'version'),
        error: new Error('Error on connection'),
      } as DescriptionError;
    }
    const api = new Api(provider, version);

    console.log(`Connection - OK, version: ${version}`);
    console.log('CheckDatabaseStructure....');
    await api.provider.checkDatabaseStructure();
    console.log('Structure - OK, go work');
    return api;
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

  public async fetchPool(pool: RequestPool, concurrency = 4): Promise<QueryResponsePool> {
    return this.provider.fetchPool(pool, concurrency);
  }

  public query(sql: string): Promise<DataDecorator> {
    return this.provider.query(sql).then((r: QueryResponse) => {
      return new DataDecorator(r);
    });
  }

  async fetch(query: Query): Promise<DataDecorator> {
    const r = await this.provider.query(query);
    return new DataDecorator(r);
  }

  getProcessLists = async (isOnlySelect: boolean, isCluster: boolean): Promise<QueryResponse> =>
    this.provider.getProcessLists(isOnlySelect, isCluster);

  getTableColumns = async (database: string, tablename: string) =>
    this.provider.getTableColumns(database, tablename);

  makeTableDescribe = async (database: string, tablename: string) =>
    this.provider.makeTableDescribe(database, tablename);

  loadDatabaseStructure = async () => this.provider.getDatabaseStructure(5555);
}
