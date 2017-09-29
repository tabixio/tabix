<?php
namespace Tabix\Query;

class Result
{
    private $data;

    private $_quid;
    public function __construct($array,$query,$params,$sid)
    {
        $this->data=$array;
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

    public function data()
    {
        return $this->data;
    }



}