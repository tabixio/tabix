<?php
namespace Tabix\DBS\Storage;

use Tabix\SQLQuery;

class Http
{
    /**
     * @var \Curler\Request
     */
    private $request;
    public function __construct($config)
    {
        $this->request=new \Curler\Request();
    }

    public function query(SQLQuery $sql,$params)
    {
        try {
            dump($sql->parse()->get());
            // greenlion/php-sql-parser
            die('@TODO : need parse request');
            //
            //$st=$this->client->select($sql,$params);
        }
        catch (\Exception $E)
        {
            throw new \Exception('Error from DB:',$E->getMessage(),$E->getCode());
        }
        return $st->rawData();
    }

    public function processlist($where)
    {
        return false;
    }

    public function kill($qid)
    {
        return false;
    }
    public function dictionaries()
    {
        return false;
    }

    public function structure()
    {
        return [];
    }
    public function describe($path)
    {
        // ----
    }
    public function metrics()
    {
        return false;
    }
}