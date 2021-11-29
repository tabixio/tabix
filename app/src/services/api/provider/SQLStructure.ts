export default class SQLStructure {
  //
  static processLists(
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
}
