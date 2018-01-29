<?php
namespace Tabix;
class User {

    private $login;
    private $password;
    private $config;
    private $services;

    public function __construct($login, $password, ConfigProvider $config)
    {
        $this->password=$password;
        $this->login=$login;
        $this->config=$config;
        $this->auth=false;

        // List services


        $services=$this->config->getAuthList();
        foreach ($services as $position=>$service)
        {
            if (empty($service['type'])) {
                throw new \Exception("Empty TYPE in Auth config position =".$position);
            }

            $type=strtolower($service['type']);
            // Тут грузим провайдера Auth метода
            // LDAP
            // Lambda
            // MySQL
            // PlainText
            if ($type=='plaintext')
            {
                $this->auth[]=new \Tabix\Auth\Plaintext($service['helper']);
            }
            if ($type=='lambda')
            {
                $this->auth[]=new \Tabix\Auth\LambdaService($service['helper']);
            }
            if ($type=='ldap')
            {
                $this->auth[]=new \Tabix\Auth\LDAP($service['helper']);
            }
        }

        if (!$this->auth) {
            throw new \Exception("Can`t load auth provider");
        }

    }
    private function bruteforce()
    {
        // @todo -- need check bruteforces
    }

    public function userId()
    {
        return $this->login;
    }
    public function userNicName()
    {
        return false;
    }
    public function isAuth()
    {
        foreach ($this->auth as $a)
        {
            $result=$a->login($this->login,$this->password);
            if ($result) return true;
        }
        return false;
//        return $this->auth->login($this->login,$this->password);
    }
}