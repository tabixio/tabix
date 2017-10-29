<?php
namespace Tabix;
class ConfigProvider
{
    private $config_id=null;
    private $file_name=null;
    private $_is_load=false;
    private $hash=false;
    /**
     * @var \dotArray
     */
    private $config;
    public function __construct($config_id)
    {
        if ($config_id) {
            $this->config_id=preg_replace("/[^a-zA-Z0-9]+/", "",$config_id);
        }
        else {
            $this->config_id='ApiTester';
        }

        $this->file_name=APP_ROOT.'/../config/providers/'.$this->config_id.'.php';
        //

        if (!file_exists($this->file_name)) {
            throw new \Exception("Not load config file : ".$this->file_name);
        }
        $this->load();
    }

    private function load() {
        if ($this->_is_load) return true;


        $conf=include_once $this->file_name;

        $this->hash=sha1(json_encode($conf));

        $this->config=new \dotArray($conf);

        $this->_is_load=true;
        return true;

    }

    public function getQuerySignkey()
    {
        $h=$this->config->get('query.hash');
        if (!$h) $h='TabixHASH';
        return sha1($h);
    }
    public function hash()
    {
        if (!$this->hash)
        {
            throw new \Exception('Not init config,try load');
        }
        return $this->hash;
    }
    public function getAuth($key)
    {
        return $this->config->get('auth.'.$key);
    }

    public function getMongoDB($key)
    {
        return $this->config->get('mongodb.'.$key);
    }
    public function getServers()
    {
        return array_keys($this->config->get('servers'));
    }

    private function getServerSettings($id,$value)
    {
        $key='servers.'.$id.'.'.$value;
        if (!$this->config->is($key))
        {
            throw new \Exception("Server not fount $value:".$key);
        }
        return $this->config->get($key);
    }

    public function getServerConnection($id)
    {
        return $this->getServerSettings($id,'connection');
    }
    public function getServerType($id)
    {
        return strtolower($this->getServerSettings($id,'type'));
    }


}
