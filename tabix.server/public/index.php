<?php
define('APP_ROOT', (__DIR__).'');
//

function flog($obj,$message='')
{
    file_put_contents("/tmp/tabix.log",date('H:i:s')." $message\n".print_r($obj,true)."\n".str_repeat("--",20)."\n",FILE_APPEND);
}
function dump($obj)
{
    header('Content-Type: application/json');
    die("DUMP:".json_encode($obj));
}

include_once '../lib/inc.php';