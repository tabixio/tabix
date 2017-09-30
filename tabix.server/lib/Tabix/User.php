<?php
namespace Tabix;
class User {

    private $login;
    private $password;
    private $config;

    public function __construct($login, $password, ConfigProvider $config)
    {
        $this->password=$password;
        $this->login=$login;
        $this->config=$config;
        $this->auth=false;

        if ($this->config->getAuth('type')) {
            // Тут грузим провайдера Auth метода
            // LDAP
            // oAuth
            // MySQL
            $type=strtolower($this->config->getAuth('type'));
            if ($type=='plaintext')
            {
                $this->auth=new \Tabix\Auth\Plaintext($this->config->getAuth('helper'));
            }
        }


        if (!$this->auth) {
            throw new \Exception("can`t load auth provider");
        }

    }
    public function userNicName()
    {
        return false;
    }
    public function isAuth()
    {
        return $this->auth->login($this->login,$this->password);
    }
}