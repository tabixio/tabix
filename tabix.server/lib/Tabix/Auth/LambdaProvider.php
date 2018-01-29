<?php
namespace Tabix\Auth;

class LambdaProvider
{
    private $login;
    private $password;
    public function __construct($login,$password)
    {
        $this->login=$login;
        $this->password=$password;
    }

    public function getPassword()
    {
        return $this->password;
    }
    public function getLogin()
    {
        return $this->login;
    }

}