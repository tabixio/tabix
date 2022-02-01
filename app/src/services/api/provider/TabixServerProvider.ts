import { ConnectionType, ServerConnection } from '../../Connection';
import CoreProvider from './CoreProvider';
import { Query } from '../Query';

export default class TabixServerProvider extends CoreProvider<ServerConnection> {
  getDatabaseStructure(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getType(): ConnectionType {
    throw new Error('Method not implemented.');
  }

  queryString(
    sql: string,
    withDatabase?: string | undefined,
    format?: string | undefined,
    extendSettings?: any
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }

  query(query: Query | string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  fastGetVersion(): Promise<string> {
    throw new Error('Method not implemented.');
  }

  getMetricsData(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getProcessLists(_isOnlySelect: boolean, _isCluster: boolean): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getTableColumns(_database: string, _tablename: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  makeTableDescribe(_database: string, _tablename: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
