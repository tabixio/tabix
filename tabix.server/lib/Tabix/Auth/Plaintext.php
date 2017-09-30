<?php
namespace Tabix\Auth;

class Plaintext
{
    private $users=[];
    private $isLogin=null;
    private $authConfig=[];
    public function __construct($auth_config)
    {
        foreach ($auth_config as $user) {
            if (isset($user['login']) && isset($user['password']))
            {
                $this->users[$user['login']]=$user;
            }
        }
        if (empty($this->users)) {
            throw new \Exception("Error in Plaintext - empty input array");
        }
    }
    public function isLogin()
    {
        return $this->isLogin;
    }
    public function settings()
    {
        return $this->authConfig;
    }

    public function login($user,$password)
    {
        if ($this->isLogin!==null) {
            return $this->isLogin;
        }
        $this->authConfig=[];
        $this->isLogin=false;
        if (isset($this->users[$user])) {
            if ($this->users[$user]['password']==$password) {
                $this->isLogin=true;
                $this->authConfig=$this->users[$user];
                return true;
            }
        }
        return false;
    }
}