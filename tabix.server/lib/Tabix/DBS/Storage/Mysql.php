<?php
namespace Tabix\DBS\Storage;


use Tabix\SQLQuery;

class Mysql extends PDOProxy
{

    public function query(SQLQuery $sql,$params=[])
    {
        try {
            if (!$params) $params=[];
            $st=$this->fetchAll($sql,$params);
        }
        catch (\Exception $E)
        {
            throw new \Exception('Error from DB:'.$E->getMessage(),$E->getCode());
        }

        return $st;
    }

    public function processlist($where)
    {
        // --
        /**
         * SELECT
        now() as dt,
        query,
        1 as count,

        formatReadableSize(read_bytes) as bytes_read,
        formatReadableSize(written_bytes) as written_bytes,
        formatReadableSize(memory_usage) as memory_usage,
        read_rows,written_rows,
        round(elapsed,4) as elapsed ,  * ,
        cityHash64(query) as hash,
        hostName()
        FROM system.processes
         */
    }

    public function kill($qid)
    {
        // ---

    }
    public function dictionaries()
    {
        // ---
    }
    public function tree()
    {
        // --- system.columns + system.tables + system.databases
    }
    public function describe($path)
    {
        // ----
    }
    public function metrics()
    {
        // --- SELECT * FROM system.metrics ORDER BY metric
    }
}