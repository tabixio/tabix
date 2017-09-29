<?php

class Autoloader {
    static public function loader($className) {
        $filename =  str_replace('\\', '/', $className) . ".php";

        $d=stream_resolve_include_path($filename);
        if ($d) {
            include($d);
            if (class_exists($className)) {
                return TRUE;
            }
        }
        else
        {
//            throw new \Exception("FileNotFound:".$filename);
        }
        return FALSE;
    }
}
spl_autoload_register('Autoloader::loader');