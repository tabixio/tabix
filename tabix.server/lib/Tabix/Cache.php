<?php
namespace Tabix;
class Cache
{
    //
    private static $type=false;

    private static function init()
    {
//        redis / apc / memcache
//        apc_fetch()
//        memcache_get()
//        memcache_set()
    }

    public static function set($key,$value,$ttl=120)
    {
        self::init();
        return true;
    }

    public static function get($key)
    {
        self::init();
        return null;
    }
}
