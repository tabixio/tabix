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

    public function configConnect()
    {
        return [\PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"];
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
        $tables=$this->query(new SQLQuery("select TABLE_SCHEMA,TABLE_NAME,TABLE_TYPE,ENGINE,DATA_LENGTH,INDEX_LENGTH from information_schema.TABLES"));
        $columns=$this->query(new SQLQuery("select TABLE_SCHEMA,TABLE_NAME,COLUMN_NAME,COLUMN_TYPE,COLUMN_DEFAULT,IS_NULLABLE,DATA_TYPE,COLUMN_COMMENT from information_schema.COLUMNS ORDER BY ORDINAL_POSITION"));

        // convert to format structure
        $_columns=[];
        $_tables=[];
        $_databases=[];
        // ------------------------------------------------------------------------
        foreach ($columns['data'] as $col)
        {


            if ($col['TABLE_SCHEMA']=='mysql') continue;
            if ($col['TABLE_SCHEMA']=='sys') continue;
            if ($col['TABLE_SCHEMA']=='performance_schema') continue;
            if ($col['TABLE_SCHEMA']=='information_schema') continue;

            $_columns[]=
                [
                    "database"=>$col['TABLE_SCHEMA'],
                    "table"=>$col['TABLE_NAME'],
                    "name"=>$col['COLUMN_NAME'],
                    "type"=>$col['COLUMN_TYPE'],
                    "default_kind"=>$col['COLUMN_DEFAULT'],
                    "default_expression"=>'',
                    "title"=>$col['COLUMN_COMMENT'],
                ];
        }
        // ------------------------------------------------------------------------
        foreach ($tables['data'] as $table)
        {
            if ($table['TABLE_SCHEMA']=='sys') continue;
            if ($table['TABLE_SCHEMA']=='mysql') continue;
            if ($table['TABLE_SCHEMA']=='performance_schema') continue;
            if ($table['TABLE_SCHEMA']=='information_schema') continue;
            $_databases[$table['TABLE_SCHEMA']]=true;


            $_tables[]=
                [
                    'database'=>$table['TABLE_SCHEMA'],
                    'name'=>$table['TABLE_NAME'],
                    'engine'=>$table['ENGINE'],
                    'sizedata'=>$table['DATA_LENGTH'],
                    'sizeindex'=>$table['INDEX_LENGTH']
                ];

        }
        // ------------------------------------------------------------------------
        $out=[
            'columns'=>$_columns,
            'tables'=>$_tables,
            'databases'=>array_keys($_databases)
            ];

        return $out;
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
