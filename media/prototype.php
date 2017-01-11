<?php
class DBSource
{
    public function getFields()
    {
        return $this->cache($this->getSourceType().'getFields');
    }
    public function getDatabasesAndTables()
    {
        return $this->cache($this->getSourceType().'getDatabases');
    }
    public function getTableInformation($db,$table)
    {
        //
    }
    public function getShowCreateTable($db,$table)
    {

    }
    public function getSourceType()
    {
        return 'MySQL|Clickhouse';
    }
    public function query($q)
    {
        $this->makeQueryId();
        return $this->populate($q);
    }
    public function killQuery()
    {

    }
}

class Auth
{
    public function isAuth($user,$password)
    {

    }
}