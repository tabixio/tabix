<?php
namespace Tabix\Auth;

// https://github.com/rroemhild/docker-test-openldap
// https://github.com/Adldap2/Adldap2/blob/master/docs/quick-start.md


use Tabix\Cache;

class LDAP
{
    private $isLogin=null;
    private $helper=[];
    private $authConfig=[];
    private $adldap=false;
    private $providerLdap=false;
    private $cache=true;
    public function __construct($helper)
    {
        if (!$helper['domain_controllers']) throw new \Exception("Error in LDAP - empty domain_controllers");
        if (!$helper['base_dn']) throw new \Exception("Error in LDAP - empty base_dn");
        if (!$helper['admin_username']) throw new \Exception("Error in LDAP - empty admin_username");
        if (!$helper['admin_password']) throw new \Exception("Error in LDAP - empty admin_password");

        if (isset($helper['cache'])) {
            $this->cache=$helper['cache'];
        }


        $this->helper=$helper;
    }
    public function isLogin()
    {
        return $this->isLogin;
    }
    public function settings()
    {
        return $this->authConfig;
    }

    protected function providerLdap()
    {
        if (!$this->providerLdap)
        {
            $this->adldap = new \Adldap\Adldap();
            $this->adldap->addProvider($this->helper);
            $this->providerLdap = $this->connect();

        }

        return $this->providerLdap;
    }


    public function login($user,$password)
    {

        $cacheKey=sha1($user.':'.json_encode($this->helper).$password);

        $user=false;

        if ($this->cache) {
            $user=Cache::get($cacheKey);
        }
        if (!$user)
        {
            $results = $this->providerLdap()->search()->where('cn', '=', 'John Doe')->get();
            // Finding a record.
            $user = $this->providerLdap()->search()->find('jdoe');


            if ($this->cache) {
                Cache::set($cacheKey,$user);
            }

        }


//        if ($this->isLogin!==null) {
//            return $this->isLogin;
//        }
//        $this->authConfig=[];
//        $this->isLogin=false;
//        if (isset($this->users[$user])) {
//            if ($this->users[$user]['password']==$password) {
//                $this->isLogin=true;
//                $this->authConfig=$this->users[$user];
//                return true;
//            }
//        }
//        return false;
    }
}
