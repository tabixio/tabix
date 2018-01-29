<?php
namespace Tabix\DBS;
use Tabix;

class Router
{
    /**
     * @var Tabix\ConfigProvider
     */
    private $_config;
    /**
     * @var Tabix\User
     */
    private $_user;
    /**
     * @var Tabix\Mongo
     */
    private $_mongo;

    private $__connect=[];
    public function __construct(Tabix\ConfigProvider $configProvider,Tabix\User $user,\Tabix\Mongo $mongo)
    {
        $this->_config=$configProvider;
        $this->_user=$user;
        $this->_mongo=$mongo;
    }
    /**
     * @return Tabix\User
     */
    public function user()
    {
        return $this->_user;
    }
    /**
     * @return Tabix\ConfigProvider
     */
    public function config()
    {
        return $this->_config;
    }
    /**
     * @return Tabix\Mongo
     */
    public function mongo()
    {
        return $this->_mongo;
    }
    /**
     * @param $sid
     * @return \Tabix\DBS\Storage\Clickhouse
     * @throws \Exception
     */
    public function getServer($sid)
    {
        // ------------------------------------------
        if (isset($this->__connect[$sid]))
        {
            return $this->__connect[$sid];
        }
        $connection=$this->config()->getServerConnection($sid);
        $type=$this->config()->getServerType($sid);
        // ------------------------------------------
        $class='Tabix\\DBS\\Storage\\'.ucwords($type);
        if (!class_exists($class))
        {
            throw new \Exception("Cant find:".$class);
        }

        $this->__connect[$sid]=new $class($connection);
        return $this->__connect[$sid];
    }
    /**
     * @param $sid
     * @param Tabix\SQLQuery $query
     * @param \dotArray $params
     * @return \Tabix\Query\Result
     */
    private function execQuery($sid,Tabix\SQLQuery $query,\dotArray $params)
    {
        $pq=$params->get('query_params');
        if (!$pq) $pq=[];

        $data=$this->getServer($sid)->query($query,$pq);


        return new \Tabix\Query\Result(

            $data,
            $query,
            $params,
            $sid
            );

    }
    private function findRouteServer(Tabix\SQLQuery $query,\dotArray $params=null)
    {
        $servers=$this->config()->getServers();
        $default=false;
        foreach ($servers as $sid)
        {
            $key='$'.$sid.'.';
            if ($this->config()->getServerType($sid)=='clickhouse' && !$default)
            {
                $default=$sid;
            }
            if (stripos($query->sql(),$key)) {
                return $sid;
            }
        }
        return $default;
    }
    /**
     * @param Tabix\Query\Result $q
     * @return Tabix\Query\Result
     */
    private function storeToMongo(\Tabix\Query\Result $q)
    {
        return $this->mongo()->query($q);
    }
    public function kill($params=[])
    {

        return [];
    }
    public function processlist($where,$params=[])
    {

        return [];
    }
    public function describe($path,$params=[])
    {

        return [];
    }
    public function structure($params=[])
    {
        // Get structure from all servers
        $servers=$this->config()->getServers();
        foreach ($servers as $sid)
        {
            // ------------------------------------------------
            //  $out=\Tabix\Cache::get('structure'.$sid);
            $out[$sid]=
                [
                        'type'=>$this->config()->getServerType($sid),
                        'id'=>$sid
                ];
            // ------------------------------------------------
            $structure=\Tabix\Cache::get('structure'.$sid);
            if (!$structure)
            {
                $structure=$this->getServer($sid)->structure();
                \Tabix\Cache::set('structure'.$sid,$structure);
            }
            $out[$sid]=$structure;
            // columns,tables,databases,dictionaries,functions
            // ------------------------------------------------
        }
        return
            [
                'servers'=>array_keys($out),
                'cache'=>false,
                'meta'=>$out
            ];
    }
    public function query(Tabix\SQLQuery $SQL,\dotArray $params=null)
    {
        $sid=$this->findRouteServer($SQL,$params);
        if (!$sid) {
            throw new \Exception("Cant find server to route SQL");
        }
        $SQL->applyHost($sid);



        $q=$this->execQuery($sid,$SQL,$params);

        // ------------------------------------------------------------------------------------------------
        $resultStore=$this->storeToMongo($q);
        // ------------------------------------------------------------------------------------------------
        $result=$q->data();
        $result['tabix']=[];
        $result['tabix']=[
                'sign'=>$resultStore->getSign(),
                'qid'=>$resultStore->quid(),
                'storeResult'=>$resultStore->isStoreResult()
        ];

        // Если результат не велик - можно попытаться присвоить QID и сохранить в MongoDB
        // Или сохранить только запрос для истории



        return $result;
    }


}
