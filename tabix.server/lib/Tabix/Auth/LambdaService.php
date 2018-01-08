<?php
namespace Tabix\Auth;

class LambdaService
{
    private $functionLambda;

    public function __construct($functionLambda)
    {
        $this->functionLambda=$functionLambda;
        if (!is_callable($this->functionLambda)) throw new \Exception('LambdaService not is_callable helper');
    }
    public function login($login,$password)
    {
        $helper=new LambdaProvider($login,$password);
        $ctionLambda=$this->functionLambda;
        return $ctionLambda($helper);
    }
}