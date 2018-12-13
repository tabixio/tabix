import ApiRequestableStore from './ApiRequestableStore';
import DashboardUIStore from './DashboardUIStore';

export default class DashboardStore extends ApiRequestableStore<DashboardUIStore> {
  async getTableColumns(database: string, tablename: string) {
    const ret = await this.api.getTableColumns(database, tablename);
    return ret;
  }

  async getTableSQLDescribe(database: string, tablename: string) {
    const ret = await this.api.makeTableDescribe(database, tablename);
    return ret;
  }
}
