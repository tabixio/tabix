<?php
namespace Tabix\DBS\Storage;
use ClickHouseDB;

class Clickhouse
{
    /**
     * @var ClickHouseDB\Client
     */
    private $client;
    public function __construct($config)
    {
        $this->client=new ClickHouseDB\Client($config);
    }

    /**
     * @param \Tabix\SQLQuery $sql
     * @param $params
     * @return array
     * @throws \Exception
     */
    public function query(\Tabix\SQLQuery $sql,$params)
    {

        $st=$this->client->select($sql->sql(),$params);
        return $st->rawData();
    }
    public function databaseStructure()
    {

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

    /**
     * @return array
     */
    public function structure()
    {
        $sql['columns']="SELECT * FROM system.columns";
        $sql['tables']="SELECT database,name,engine FROM system.tables" ;
        $sql['databases']= "SELECT name FROM system.databases" ;
        $sql['dictionaries']="SELECT name,key,attribute.names,attribute.types from system.dictionaries ARRAY JOIN attribute ORDER BY name,attribute.names";
        $sql['functions']="SELECT name,is_aggregate from system.functions";


        $r=[];
        foreach ($sql as $key=>$q)
        {
            $r[$key]=$this->client->selectAsync($q);
        }

        $this->client->executeAsync();
        $out=[];
        foreach ($sql as $key=>$q)
        {
                $out[$key]=$r[$key]->rows();
        }
        return $out;

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
