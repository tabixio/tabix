// eslint-disable-next-line jsx-a11y/anchor-is-valid
import TemplateQuery from './TemplateQuery';

export default class preparedStatementQuery extends TemplateQuery {
  processLists(
    isOnlySELECT: boolean,
    isCluster: boolean,
    clusterList: Array<string>,
    username: string,
    password: string
  ): string {
    // eslint-disable-next-line no-unexpected-multiline
    let sql = ` SELECT now() as dt,
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
                  SELECT *, hostName() as host
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
    sql = `${sql} )`;
    return this.template(sql);
  }

  functionsList(): string {
    return `SELECT name, is_aggregate
            from system.functions`;
  }

  dictionariesList(limitDics: number): string {
    // 21.4.1
    // ClickHouse release 21.4.1 2021-04-12
    // Column keys in table system.dictionaries was replaced to columns key.names and key.types. Columns key.names, key.types, attribute.names, attribute.types from system.dictionaries table does not require dictionary to be loaded. #21884 (Maksim Kita).
    // Upated system.dictionaries table : https://github.com/ClickHouse/ClickHouse/commit/a53c90e509d0ab9596e73747f085cf0191284311?branch=a53c90e509d0ab9596e73747f085cf0191284311&diff=unified
    // SELECT * FROM system.dictionaries ARRAY JOIN attribute,key ORDER BY name,attribute.names
    let s1 = `SELECT name, key.names as key,attribute.names,attribute.types
              FROM (
                select name, \`key.names\`, \`key.types\`, attribute.names, attribute.types
                from system.dictionaries array join key, attribute
                )
                LIMIT ${limitDics}
    `;
    if (this.versionCompare(this.version, '21.4.1') < 0) {
      // version < 21.4.1
      s1 = `SELECT name, key, attribute.names, attribute.types
            FROM system.dictionaries ARRAY JOIN attribute
            ORDER BY name, attribute.names LIMIT ${limitDics}`;
    }
    return s1;
  }

  databaseList(limitDBs: number): string {
    return `SELECT name
            FROM system.databases LIMIT ${limitDBs}`;
  }

  databaseTablesList(limitTables: number): string {
    return `
      SELECT t.database,
             t.name,
             t.engine,
             -- t.*,
             pa.size
      FROM system.tables as t ANY LEFT JOIN ( SELECT database,table as name,formatReadableSize(sum(bytes)) as size FROM system.parts  GROUP BY database,name ) as pa USING (database,name)
LIMIT ${limitTables}`;
  }

  // Create by Alex-Burmak ?https://github.com/ClickHouse/ClickHouse/commit/465a9bf615e1b233606460f956c09f71931c99a2
  // https://github.com/ClickHouse/ClickHouse/blob/master/utils/clickhouse-diagnostics/clickhouse-diagnostics

  // release 21.2 - Add normalizeQueryKeepNames and normalizedQueryHashKeepNames
  // v20.8 - Add function normalizeQuery that replaces literals,
  public databasesListAndSize(limit = 10) {
    return `SELECT name,
                   engine,
                   tables,
                   partitions,
                   parts,
                   formatReadableSize(bytes_on_disk) "disk_size"
            FROM system.databases db
                   LEFT JOIN
                 (
                   SELECT database,
                          uniq(table)            "tables",
                          uniq(table, partition) "partitions",
                          count() AS             parts,
                          sum(bytes_on_disk)     "bytes_on_disk"
                   FROM system.parts
                   WHERE active
                   GROUP BY database
                 ) AS db_stats ON db.name = db_stats.database
            ORDER BY bytes_on_disk DESC
              LIMIT ${limit}
    `;
  }

  public replicas() {
    return `SELECT database,
              table,
              is_leader,
              is_readonly,
              absolute_delay,
              queue_size,
              inserts_in_queue,
              merges_in_queue
            FROM system.replicas
            ORDER BY absolute_delay DESC
              LIMIT 10`;
  }

  public replicaQueue() {
    return `SELECT database,
              table,
              replica_name,
              position,
              node_name,
              type,
              source_replica,
              parts_to_merge,
              new_part_name,
              create_time,
              required_quorum,
              is_detach,
              is_currently_executing,
              num_tries,
              last_attempt_time,
              last_exception,
              concat('time: ', toString(last_postpone_time), ', number: ', toString(num_postponed), ', reason: ', postpone_reason) postpone
            FROM system.replication_queue
            ORDER BY create_time ASC
              LIMIT 20
    `;
  }

  public replicatedFetches() {
    return `SELECT database,
              table,
              round(elapsed, 1) "elapsed",
              round(100 * progress, 1) "progress",
              partition_id,
              result_part_name,
              result_part_path,
              total_size_bytes_compressed,
              bytes_read_compressed,
              source_replica_path,
              source_replica_hostname,
              source_replica_port,
              interserver_scheme,
              to_detached,
              thread_id
            FROM system.replicated_fetches`;
  }
}
