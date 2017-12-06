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
    private $_sing;
    public function __construct($array,\Tabix\SQLQuery $query,\dotArray $params,$server_id)
    {
//        $signKey=$this->_config->getQuerySignkey();
        $this->data=$array;
        $this->query=$query;
        $this->params=$params;
        $this->server_id=$server_id;
        // @todo wtf sing?
        $this->_sing=substr(sha1($server_id.microtime(true).$query.'*'.$server_id),0,10);
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
    public function getSign()
    {
        return $this->_sing;
    }
    public function setQuid($quid)
    {
        $this->_quid=strval($quid);
    }
    public function quid()
    {
        return $this->_quid;
    }


    public function toArray()
    {
        $p=$this->params->as_array();
        unset($p['auth']);
        $z=[
            'sql'=>$this->query->originalSql(),
            'vars'=>$this->query->vars(),
            'params'=>$p,
            'server_id'=>$this->server_id,
            'server_settings'=>[],

        ];

        $apply_data=true;


        if ($p['widget']) {
            $apply_data=false;
        }




        if ($apply_data){
            $z['data']=$this->data();
            $z['sign']=$this->getSign();

        }

        return $z;
    }

    public function data()
    {
        return $this->data;
    }



}