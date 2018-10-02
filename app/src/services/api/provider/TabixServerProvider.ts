import { ServerConnection, ConnectionType } from '../../Connection';
import CoreProvider from './CoreProvider';

export default class TabixServerProvider extends CoreProvider<ServerConnection> {
  getDatabaseStructure(): Promise<
    import('/home/vladimir/dev/sources/tabixio/tabix/app/src/services/api/ServerStructure').default.Structure
  > {
    throw new Error('Method not implemented.');
  }

  getType(): ConnectionType {
    throw new Error('Method not implemented.');
  }

  query(
    // @ts-ignore
    sql: string,
    // @ts-ignore
    withDatabase?: string | undefined,
    // @ts-ignore
    format?: string | undefined,
    // @ts-ignore
    extendSettings?: any
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }

  fastGetVersion(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
