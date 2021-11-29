export default class preparedStatementQuery {
  //
  private version: string;

  constructor(version: string) {
    this.version = version;
  }

  setVersion(version: string) {
    this.version = version;

    // if version = 21.11.4.14, then this.versionCompare(version,'19.01.01') = 1
    // if version = 21.11.4.14, then this.versionCompare(version,'21.11.4.15') = -1
    // '1' - is less , '0' - eq , '-1' - big
    console.info('compare 21.10.3.14', this.versionCompare(version, '21.11.3.14'));
  }

  versionCompare(v1: string, v2: string): number {
    const lexicographical = false;
    const zeroExtend = false;

    let v1parts: Array<any> = (v1 || '0').trim().split('.');
    let v2parts: Array<any> = (v2 || '0').trim().split('.');

    function isValidPart(x: string) {
      return (lexicographical ? /^\d+[A-Za-zαß]*$/ : /^\d+[A-Za-zαß]?$/).test(x);
    }
    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
      return NaN;
    }
    if (zeroExtend) {
      while (v1parts.length < v2parts.length) v1parts.push('0');
      while (v2parts.length < v1parts.length) v2parts.push('0');
    }

    if (!lexicographical) {
      v1parts = v1parts.map(x => {
        const match = /[A-Za-zαß]/.exec(x);
        return Number(match ? x.replace(match[0], `.${x.charCodeAt(match.index)}`) : x);
      });
      v2parts = v2parts.map(x => {
        const match = /[A-Za-zαß]/.exec(x);
        return Number(match ? x.replace(match[0], `.${x.charCodeAt(match.index)}`) : x);
      });
    }

    for (let i = 0; i < v1parts.length; ++i) {
      if (v2parts.length == i) {
        return 1;
      }

      if (v1parts[i] == v2parts[i]) {
        continue;
      } else if (v1parts[i] > v2parts[i]) {
        return 1;
      } else {
        return -1;
      }
    }

    if (v1parts.length != v2parts.length) {
      return -1;
    }
    return 0;
  }

  processLists(
    isOnlySELECT: boolean,
    isCluster: boolean,
    clusterList: Array<string>,
    username: string,
    password: string
  ): string {
    let sql = `
    SELECT  now() as dt, 
                query,  
                1 as count,
                toUInt64(toUInt64(read_rows) + toUInt64(written_rows)) as rows,
                round(elapsed,1) as elapsed ,
                formatReadableSize(toUInt64(read_bytes)+toUInt64(written_bytes)) as bytes, 
                formatReadableSize(memory_usage) as memory_usage,
                formatReadableSize(read_bytes) as bytes_read,
                formatReadableSize(written_bytes) as bytes_written,  
                * ,     
                cityHash64(query) as hash
    FROM (                
    SELECT * hostName() as host 
    `;
    // from
    if (isCluster && clusterList.length) {
      sql = `${sql} FROM remote('${clusterList.join(
        ','
      )}',system.processes, '${username}','${password}')`;
    } else {
      sql = `${sql} FROM system.processes `;
    }
    // исключить запрос
    sql = `${sql} /* 12XQWE3X1X2XASDF */ WHERE query not like '%12XQWE3X1X2XASDF%'`;
    if (isOnlySELECT) {
      sql = `${sql} AND read_rows>0`;
    }
    return sql;
  }

  functionsList(): string {
    return `SELECT name,is_aggregate from system.functions`;
  }

  dictionariesList(limitDics: number): string {
    // 21.4.1
    // ClickHouse release 21.4.1 2021-04-12
    // Column keys in table system.dictionaries was replaced to columns key.names and key.types. Columns key.names, key.types, attribute.names, attribute.types from system.dictionaries table does not require dictionary to be loaded. #21884 (Maksim Kita).
    // Upated system.dictionaries table : https://github.com/ClickHouse/ClickHouse/commit/a53c90e509d0ab9596e73747f085cf0191284311?branch=a53c90e509d0ab9596e73747f085cf0191284311&diff=unified
    // SELECT * FROM system.dictionaries ARRAY JOIN attribute,key ORDER BY name,attribute.names
    return `SELECT name,key,attribute.names,attribute.types FROM system.dictionaries ARRAY JOIN attribute ORDER BY name,attribute.names LIMIT ${limitDics}`;
  }

  databaseList(limitDBs: number): string {
    return `SELECT name FROM system.databases LIMIT  ${limitDBs}`;
  }

  databaseTablesList(limitTables: number): string {
    return `
SELECT t.database,
       t.name,
       t.engine,
       -- t.*,
       pa.size
FROM system.tables as t
ANY LEFT JOIN ( SELECT database,table as name,formatReadableSize(sum(bytes)) as size FROM system.parts  GROUP BY database,name ) as pa USING (database,name)
LIMIT ${limitTables}`;
  }
}
