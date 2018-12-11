import { Option } from 'funfix-core';
import { ServerStructure } from 'services';
import { TreeFilter } from 'models';

export type FilterResult = Array<
  ServerStructure.Column | ServerStructure.Table | ServerStructure.Database
>;

export default class ServerStructureFilter {
  static from(filter: TreeFilter): ServerStructureFilter {
    return new ServerStructureFilter(filter);
  }

  private constructor(private readonly filter: TreeFilter) {}

  private filterColumns(result: FilterResult, columns: ReadonlyArray<ServerStructure.Column>) {
    columns.forEach(col => {
      if (col.name.toLowerCase().includes(this.filter.search)) result.push(col);
    });
  }

  private filterTables(result: FilterResult, tables: ReadonlyArray<ServerStructure.Table>) {
    tables.forEach(t => {
      if (t.name.toLowerCase().includes(this.filter.search)) result.push(t);
      this.filterColumns(result, t.columns);
    });
  }

  private filterDatabases(
    result: FilterResult,
    databases: ReadonlyArray<ServerStructure.Database>
  ) {
    databases.forEach(db => {
      if (db.name.toLowerCase().includes(this.filter.search)) result.push(db);
      this.filterTables(result, db.tables);
    });
  }

  exec(serverStructure: Option<ServerStructure.Server>): Promise<FilterResult> {
    return new Promise(resolve => {
      const result: FilterResult = [];
      serverStructure.forEach(ss => {
        this.filterDatabases(result, ss.databases);
      });
      resolve(result);
    });
  }
}
