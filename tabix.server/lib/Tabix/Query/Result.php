<?php
namespace Tabix\Query;

class Result
{
    private $data;

    /**
     * @var \Tabix\SQLQuery
     */
    private $query;
    /**
     * @var \dotArray
     */
    private $params;
    /**
     * @var string
     */
    private $server_id;

    private $_quid;
    public function __construct($array,\Tabix\SQLQuery $query,\dotArray $params,$server_id)
    {
        $this->data=$array;
        $this->query=$query;
        $this->params=$params;
        $this->server_id=$server_id;
    }
    public function sql()
    {
        return $this->query->sql();
    }
    public function isCanStoreResult()
    {
        return true;
    }
    public function isStoreResult()
    {
        return true;
    }
    public function quid()
    {
        return $this->_quid;
    }


    public function toArray()
    {
        return [
            'sql'=>$this->query->sql(),
            'params'=>$this->params->as_array(),
            'data'=>$this->data(),
            'server_id'=>$this->server_id
        ];
    }

    public function data()
    {
        return $this->data;
    }



}