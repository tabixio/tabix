<?php
include_once '/Users/igor/sites/phpClickHouse/include.php';

$ch=new \ClickHouseDB\Client(['host'=>'192.168.1.20','port'=>8123,'username'=>'default','password'=>'']);
$functions_list=array_keys(($ch->select('SELECT * FROM system.functions')->rowsAsTree('name')));
arsort($functions_list);
print_r($functions_list);
die();
$content=file_get_contents('https://clickhouse.yandex/reference_ru.html');
$content=file_get_contents('https://clickhouse.yandex/reference_en.html');

$content=str_ireplace('<h4>','===',$content);
$content=str_ireplace('</h4>','===',$content);
$mathes=[];
if (preg_match_all('%===(.*)===\s*(.*)(?!===)%',$content,$mathes,PREG_SET_ORDER))
{
    foreach ($mathes as $m)
    echo "\033[31m ".$m[1]." \033[0m \n ".$m[2]."\n\n";
}