import { ServerConnection, ConnectionType } from '../../Connection';
import CoreProvider from './CoreProvider';
import {Query} from '../Query';

export default class TabixServerProvider extends CoreProvider<ServerConnection> {
    getDatabaseStructure(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getType(): ConnectionType {
    throw new Error('Method not implemented.');
  }

    queryString(
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

    query(
        // @ts-ignore
        q: Query
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }

  fastGetVersion(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
