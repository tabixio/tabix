import TemplateQuery from './TemplateQuery';

export default class preparedStatementQuery extends TemplateQuery {
  process(
    selectOnly: boolean,
    isCluster: boolean,
    clusterList: Array<string>,
    username: string,
    password: string
  ): string {
    let from = 'system.processes';
    // from
    if (isCluster && clusterList.length) {
      from = `remote('${clusterList.join(',')}',system.processes, '${username}','${password}')`;
    }

    // release 21.2 - Add normalizeQueryKeepNames and normalizedQueryHashKeepNames
    // v20.8 - Add function normalizeQuery that replaces literals,
    const sql = `

      SELECT now()             as time,
             round(elapsed, 1) as elapsed,
        {% if version_ge('20.8') and normalize_queries -%}
        normalizeQuery(query) AS Query,
        {% else -%}
        query as Query,
        {% endif -%}
        1 as count,
        formatReadableSize(toUInt64(read_bytes)+toUInt64(written_bytes)) as bytes,
        toUInt64(toUInt64(read_rows) + toUInt64(written_rows)) as rows,
        formatReadableSize(peak_memory_usage) AS "peak memory",
        formatReadableSize(read_bytes) as "read bytes",
        formatReadableSize(written_bytes) as "written bytes",
        formatReadableSize(memory_usage) AS "memory usage",
        query_id,
        is_cancelled,
        user,
        multiIf(empty(client_name), http_user_agent, concat(client_name, ' ', toString(client_version_major), '.', toString(client_version_minor), '.', toString(client_version_patch))) AS client,
        {% if version_ge('20.8') -%}
        cityHash64(normalizeQuery(query)) AS hash,
        {% else -%}
        cityHash64(query) as hash,
        {% endif -%}


        {% if version_ge('21.3') -%}
        thread_ids,
        {% endif -%}

        {% if version_ge('21.8') -%}
        ProfileEvents,
        Settings
        {% else -%}
        ProfileEvents.Names,
        ProfileEvents.Values,
        Settings.Names,
        Settings.Values
        {% endif -%}

      FROM ${from}

      WHERE query not like '%12XQWE3X1X2XASDF%' /* 12XQWE3X1X2XASDF */

          {%if selectOnly -%}
        AND read_rows
          >0
          {% endif -%}

    `;
    return this.template(sql, {
      normalize_queries: true,
      selectOnly,
    });

    /*  - select * from system.processes -
          is_initial_query
          user
          query_id
          address
          port
          initial_user
          initial_query_id
          initial_address
          initial_port
          interface
          os_user
          client_hostname
          client_name
          client_revision
          client_version_major
          client_version_minor
          client_version_patch
          http_method
          http_user_agent
          forwarded_for
          quota_key
          elapsed
          is_cancelled
          read_rows
          read_bytes
          total_rows_approx
          written_rows
          written_bytes
          memory_usage
          peak_memory_usage
          query
          thread_ids
          ProfileEvents.Names
          ProfileEvents.Values
          Settings.Names
          Settings.Values

    * */
  }

  describe(database: string, table: string): string {
    return this.template(`SHOW CREATE TABLE {{ database }}.{{ table }}`, {
      table,
      database,
    });
  }

  columnsList(limit = 500, database: string | null = null, table: string | null = null): string {
    return this.template(
      `SELECT *
       FROM system.columns {% if table and database -%}
       WHERE database = '{{ database }}'
         AND table = '{{ table }}'
           {% endif -%}

       LIMIT ${limit}`,
      {
        table: table?.toString() ?? '',
        database: database?.toString() ?? '',
      }
    );
  }

  clustersList(limit = 500): string {
    return `SELECT *
            FROM system.clusters
            WHERE host_address NOT LIKE '127.0.0.%'
            LIMIT ${limit}`;
  }

  functionsList(): string {
    /* eslint-disable */
    return `SELECT name, is_aggregate
            from system.functions`;
    /* eslint-enable */
  }

  dictionariesList(limitDics: number): string {
    // 21.4.1
    // ClickHouse release 21.4.1 2021-04-12
    // Column keys in table system.dictionaries was replaced to columns key.names and key.types. Columns key.names, key.types, attribute.names, attribute.types from system.dictionaries table does not require dictionary to be loaded. #21884 (Maksim Kita).
    // Upated system.dictionaries table : https://github.com/ClickHouse/ClickHouse/commit/a53c90e509d0ab9596e73747f085cf0191284311?branch=a53c90e509d0ab9596e73747f085cf0191284311&diff=unified
    // SELECT * FROM system.dictionaries ARRAY JOIN attribute,key ORDER BY name,attribute.names
    let s1 = `SELECT namez.name    as name,
                     keyz.key_name as key_name,
                     keyz.key_type as key,
                     attr_name     as \`attribute.names\`,
                     attr_type     as \`attribute.types\`
              FROM (SELECT name FROM system.dictionaries) as namez
                     LEFT JOIN ( select name, \`key.names\` as key_name, \`key.types\` as key_type
                                 FROM system.dictionaries
                                        array join key ) as keyz ON (keyz.name = namez.name)
                     LEFT JOIN ( select name, \`attribute.names\` as attr_name, \`attribute.types\` as attr_type
                                 FROM system.dictionaries
                                        array join attribute ) as attrs ON (attrs.name = namez.name)
              ORDER BY namez.name, \`attribute.names\`
              LIMIT ${limitDics}
    `;
    if (this.versionCompare(this.version, '21.4.1') < 0) {
      // version < 21.4.1
      s1 = `SELECT name, key, attribute.names, attribute.types
            FROM system.dictionaries
                   ARRAY JOIN attribute
            ORDER BY name, attribute.names
            LIMIT ${limitDics}`;
    }
    return s1;
  }

  databaseList(limitDBs: number): string {
    return `SELECT name
            FROM system.databases
            LIMIT ${limitDBs}`;
  }

  databaseTablesList(limitTables: number): string {
    return `
      SELECT t.database,
             t.name,
             t.engine,
             -- t.*,
             pa.size
      FROM system.tables as t ANY
             LEFT JOIN ( SELECT database, table as name, formatReadableSize(sum(bytes)) as size
                         FROM system.parts
                         GROUP BY database, name ) as pa USING (database, name)
      LIMIT ${limitTables}`;
  }

  // Create by Alex-Burmak ?https://github.com/ClickHouse/ClickHouse/commit/465a9bf615e1b233606460f956c09f71931c99a2
  // https://github.com/ClickHouse/ClickHouse/blob/master/utils/clickhouse-diagnostics/clickhouse-diagnostics

  public queryLogFast(limit = 100) {
    return (
      `select event_date,
              event_time,
              query_duration_ms,
              read_rows,
              read_bytes,
              memory_usage,
              query

       from system.query_log
       where event_date = today()
         and read_bytes > 0
       order by event_date desc
       LIMIT ` + limit
    );
  }

  public databasesListAndSize(limit = 100) {
    return this.template(`SELECT name,
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
    `);
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
            LIMIT 150`;
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
                   concat('time: ', toString(last_postpone_time), ', number: ', toString(num_postponed), ', reason: ',
                          postpone_reason) postpone
            FROM system.replication_queue
            ORDER BY create_time ASC
            LIMIT 20
    `;
  }

  public replicatedFetches() {
    return `SELECT database,
                   table,
                   round(elapsed, 1)        "elapsed",
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

  public columnsPerOneTable(limit = 140, database?: string, table?: string) {
    return this.template(
      `

        SELECT *
        FROM system.columns
        WHERE
      ` +
        '{% if table and database -%}' +
        `
          database = '{{ database }}'
          AND table = '{{ table }}'
            {% endif -%}
        LIMIT ${limit}
      `,

      //
      {
        table: table?.toString() ?? '',
        database: database?.toString() ?? '',
      }
    );
  }

  public partsPerOneTable(limit = 140, database?: string, table?: string) {
    return this.template(
      `

        SELECT *
        FROM system.parts
        WHERE active {% if table and database -%}
               AND database = '{{ database }}'
                 AND table = '{{ table }}'
                   {% endif -%}
        LIMIT ${limit}
      `,
      {
        table: table?.toString() ?? '',
        database: database?.toString() ?? '',
      }
    );
  }

  public partsPerTable(limit = 140, database?: string, table?: string) {
    return this.template(
      `
        SELECT database,
               table,
               count()         "partitions",
               sum(part_count) "parts",
               max(part_count) "max_parts_per_partition"
        FROM (
               SELECT database,
                      table,
                      partition,
                      count() "part_count"
               FROM system.parts
               WHERE active {% if table and database -%}
               AND database = '{{ database }}'
                 AND table = '{{ table }}'
                   {% endif -%}
               GROUP BY database, table, partition
               ) partitions
        GROUP BY database, table
        ORDER BY max_parts_per_partition DESC
        LIMIT ${limit}
      `,
      {
        table: table?.toString() ?? '',
        database: database?.toString() ?? '',
      }
    );
  }

  public merges() {
    return this.template(`
      SELECT database,
             table,
             round(elapsed, 1)        "elapsed",
             round(100 * progress, 1) "progress",
             is_mutation,
             partition_id,
        {% if version_ge('20.3') -%}
        result_part_path,
        source_part_paths,
        {% endif -%}
        num_parts,
        formatReadableSize(total_size_bytes_compressed) "total_size_compressed",
        formatReadableSize(bytes_read_uncompressed) "read_uncompressed",
        formatReadableSize(bytes_written_uncompressed) "written_uncompressed",
        columns_written,
        {% if version_ge('20.3') -%}
        formatReadableSize(memory_usage) "memory_usage",
        thread_id
        {% else -%}
        formatReadableSize(memory_usage) "memory_usage"
        {% endif -%}
      FROM
      system.merges
    `);
  }

  public mutations() {
    return this.template(`

      SELECT database,
             table,
             mutation_id,
             command,
             create_time,
        {% if version_ge('20.3') -%}
        parts_to_do_names,
        {% endif -%}
        parts_to_do,
        is_done,
        latest_failed_part,
        latest_fail_time,
        latest_fail_reason
      FROM
      system.mutations
        WHERE NOT is_done
        ORDER BY create_time
      DESC

    `);
  }

  public recentDataParts() {
    return this.template(`
      SELECT database,
             table,
             engine,
             partition_id,
             name,
        {% if version_ge('20.3') -%}
        part_type,
        {% endif -%}
        active,
        level,
        {% if version_ge('20.3') -%}
        disk_name,
        {% endif -%}
        path,
        marks,
        rows,
        bytes_on_disk,
        data_compressed_bytes,
        data_uncompressed_bytes,
        marks_bytes,
        modification_time,
        remove_time,
        refcount,
        is_frozen,
        min_date,
        max_date,
        min_time,
        max_time,
        min_block_number,
        max_block_number
      FROM
      system.parts
        WHERE modification_time > now() - INTERVAL 3 MINUTE
        ORDER BY modification_time
      DESC
    `);
  }

  public crashLog() {
    return this.template(`

      SELECT event_time,
             signal,
             thread_id,
             query_id,
             '\\n' || arrayStringConcat(trace_full, '\\n') AS trace,
             version
      FROM system.crash_log
      ORDER BY event_time DESC

    `);
  }

  public detachedDataParts() {
    return this.template(`

      SELECT database,
             table,
             partition_id,
             name,
             disk,
             reason,
             min_block_number,
             max_block_number,
             level
      FROM system.detached_parts

    `);
  }

  public failedQueries(normalize = true) {
    return this.template(
      ` SELECT type,
               query_start_time,
               query_duration_ms,
               query_id,
               query_kind,
               is_initial_query,
          {% if normalize_queries -%}
          normalizeQuery(query) AS normalized_query,
          {% else -%}
          query,
          {% endif -%}
          concat(toString(read_rows), ' rows / ', formatReadableSize(read_bytes)) AS read,
          concat(toString(written_rows), ' rows / ', formatReadableSize(written_bytes)) AS written,
          concat(toString(result_rows), ' rows / ', formatReadableSize(result_bytes)) AS result,
          formatReadableSize(memory_usage) AS "memory usage",
          exception,
          '\\n' || stack_trace AS stack_trace,
          user,
          initial_user,
          multiIf(empty(client_name), http_user_agent, concat(client_name, ' ', toString(client_version_major), '.', toString(client_version_minor), '.', toString(client_version_patch))) AS client,
          client_hostname,
          {% if version_ge('21.3') -%}
          databases,
          tables,
          columns,
          used_aggregate_functions,
          used_aggregate_function_combinators,
          used_database_engines,
          used_data_type_families,
          used_dictionaries,
          used_formats,
          used_functions,
          used_storages,
          used_table_functions,
          thread_ids,
          {% endif -%}
          {% if version_ge('21.8') -%}
          ProfileEvents,
          Settings
          {% else -%}
          ProfileEvents.Names,
          ProfileEvents.Values,
          Settings.Names,
          Settings.Values
          {% endif -%}
        FROM
      system.query_log
        WHERE type != 'QueryStart'
        AND event_date >= today() - 1
        AND event_time >= now() - INTERVAL 1 DAY
        AND exception != ''
        ORDER BY query_start_time
      DESC
        LIMIT 10
      `,
      { normalize_queries: normalize }
    );
  }

  public stackTraces() {
    return this.template(`

      SELECT '\\n' || arrayStringConcat(
        arrayMap(
            x,
            y -> concat(x, ': ', y),
            arrayMap(x -> addressToLine(x), trace),
            arrayMap(x -> demangle(addressToSymbol(x)), trace)),
        '\\n') AS trace
      FROM system.stack_trace

    `);
  }

  //
  // public merges() {
  //   return this.template(`   `)
  // }
}
