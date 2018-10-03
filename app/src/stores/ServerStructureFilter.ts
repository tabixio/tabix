import { observable } from 'mobx';
import { Option } from 'funfix-core';
import { ServerStructure } from 'services';

export default class ServerStructureFilter {
  static from(searchText: string): ServerStructureFilter {
    return new ServerStructureFilter(searchText.toLowerCase());
  }

  private constructor(private readonly searchText: string) {}

  private filterColumns = (columns: ServerStructure.Column[]) =>
    columns.reduce(
      (colAcc, col) => {
        if (col.name.toLowerCase().includes(this.searchText)) colAcc.push(col);
        return colAcc;
      },
      [] as ServerStructure.Column[]
    );

  private filterTables = (tables: ServerStructure.Table[]) =>
    tables.reduce(
      (tAcc, t) => {
        const columns = this.filterColumns(t.columns);

        // check name only if columns is empty
        const matched = columns.length > 0 || t.name.toLowerCase().includes(this.searchText);
        if (matched) tAcc.push({ ...t, columns });

        return tAcc;
      },
      [] as ServerStructure.Table[]
    );

  private filterDatabases = (databases: ServerStructure.Database[]) =>
    databases.reduce(
      (dbAcc, db) => {
        const tables = this.filterTables(db.tables);

        // check name only if tables is empty
        const matched = tables.length > 0 || db.name.toLowerCase().includes(this.searchText);
        if (matched) dbAcc.push({ ...db, tables });

        return dbAcc;
      },
      [] as ServerStructure.Database[]
    );

  // exec(
  //   serverStructure: Option<ServerStructure.Structure>
  // ): Promise<Option<ServerStructure.Structure>> {
  //   return new Promise(resolve => {
  //     // console.time('filter exec');
  //     const structure = serverStructure.map(ss => {
  //       const databases = this.filterDatabases(ss.databases);
  //       return { ...ss, databases };
  //     });
  //     // console.timeEnd('filter exec');
  //     resolve(structure);
  //   });
  // }
  exec(serverStructure: Option<ServerStructure.Server>): Option<ServerStructure.Server> {
    return serverStructure.map(ss => {
      const databases = this.filterDatabases(ss.databases);
      return observable({ ...ss, databases });
    });
  }
}

export interface FilterResult {
  serverStructure: Option<ServerStructure.Server>;
  keys: string[];
}
