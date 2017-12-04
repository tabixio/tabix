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

        // ---
    }

    public function kill($qid)
    {
        // ---

    }


    public function structure()
    {
        // information schema
        return [];
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