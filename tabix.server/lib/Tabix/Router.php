<?php
namespace Tabix;

class Router
{
    /**
     * @var \dotArray
     */
    private $__params=null;

    /**
     * @var ConfigProvider
     */
    private $_configServer=null;

    /**
     * @var DBS\Router
     */
    private $_dbsrouter;

    private $_mongo;

    public function __construct($params)
    {

        if (sizeof($params)<1) throw new \Exception("Empty input body");
        $this->__params=new \dotArray($params);

        $this->_configServer=new ConfigProvider($this->__params->get('auth.confid'));

        $this->_user=new User(
            $this->__params->get('auth.login'),
            $this->__params->get('auth.password'),
            $this->_configServer
            
        );
        if (!$this->user()->isAuth())
        {
            throw new \Exception("Not auth user");
        }

    }

    /**
     * @return DBS\Router
     */
    public function dbs()
    {
        if (!$this->_dbsrouter)
            $this->_dbsrouter=new \Tabix\DBS\Router($this->config(),$this->user(),$this->mongo());
        return $this->_dbsrouter;
    }

    public function mongo()
    {
        if (!$this->_mongo)
        {
            $this->_mongo=new \Tabix\Mongo($this->config(),$this->user());
        }
        return $this->_mongo;
    }

    /**
     * @param bool $key
     * @return array|\dotArray|mixed
     */
    public function param($key=false) {
        if ($key==false) return $this->__params;
        return $this->__params->get($key);
    }
    /**
     * @return User
     */
    public function user() {
        return $this->_user;
    }

    /**
     * @return ConfigProvider
     */
    public function config()
    {
        return $this->_configServer;
    }

    public function actionLogin()
    {
        return ['result'=>"ok"];
    }

    public function actionState($command)
    {
        $out=[];
        $out['mongodb']=($this->mongo()->test());
        return $out;
    }
    public function actionServer($command)
    {
        return ['OK'];
    }
    public function actionKill($id)
    {
        return $this->dbs()->kill($id,$this->param());
    }

    public function actionProcesslist($where)
    {
        return $this->dbs()->processlist($where,$this->param());
    }

    public function actionDescribe($path)
    {
        return $this->dbs()->describe($path,$this->param());
    }


    public function actionDashboards($param=false,$value=false)
    {
        return $this->mongo()->listDashboards($param,$value);
    }

    public function actionDrophistory()
    {
        return $this->mongo()->dropHistory();
    }

    public function actionHistory($param=false,$value=false)
    {
        if (!$param) {
            return $this->mongo()->history();
        }
        else {
            return $this->mongo()->historySearch($param,$value);
        }
    }

    public function actionTree()
    {
        return $this->dbs()->tree($this->param());
    }

    public function actionQuery()
    {
        $query=$this->param('query');
        if (!$query) {
            throw new \Exception("Empty Query");
        }

        if (stripos($query,'%TABIX_CHECK_LOGIN%')) {
            return ["meta"=>"1","data"=>["%TABIX_CHECK_LOGIN%"],'tabix'=>[]];
        }

        $q=new SQLQuery($query);
        return $this->dbs()->query($q,$this->param());
    }
}