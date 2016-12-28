<?php
include_once '../../phpClickHouse/include.php';

$ch=new \ClickHouseDB\Client(['host'=>'192.168.1.20','port'=>8123,'username'=>'default','password'=>'']);
$functions_list=array_keys(($ch->select('SELECT * FROM system.functions')->rowsAsTree('name')));

$functions_list=array_values($functions_list);


setlocale(LC_ALL, "C");
mb_internal_encoding("UTF-8");
function parseDocPage($url)
{

    $content=file_get_contents($url);
    $content=str_ireplace("===\n===",' , ',$content);
    $content=str_ireplace('<h4>','===',$content);
    $content=str_ireplace('</h4>','===',$content);

    $out=[];
    foreach (explode("\n==",$content) as $txt)
    {
        $c="\n".'=='.$txt;
        $mathes=[];
        if (preg_match_all('%={2,}(.*)={2,}(((?!={2,})\X)*)%iu',$c,$mathes,PREG_SET_ORDER))
        {
            foreach ($mathes as $m)
            {
                $name=trim(trim($m[1]),'=');
                $value=trim($m[2]);





                $mn=[];
                if (preg_match('%((((?!\()\X)*)%ius',$name,$mn))
                {
                    echo $name."\n";
                    print_r($mn);
                }
                if (stripos($name,'dictGet'))
                {
                    $out[$name.'OrDefault']=$value;
                }
                $out[$name]=$value;
            }
        }
    }
    die();
    return $out;

}

$en=parseDocPage('https://clickhouse.yandex/reference_en.html');
$ru=parseDocPage('https://clickhouse.yandex/reference_ru.html');


$output=[];
foreach ($functions_list as $fn)
{
    $find=false;
    foreach ($ru as $name=>$value)
    {
        if (stripos($name,$fn)!==false)
        {
            $output['f']['ru'][$fn]=$name;
            $find=1;
        }
    }
    foreach ($en as $name=>$value)
    {
        if (stripos($name,$fn)!==false)
        {
            $output['f']['en'][$fn]=$name;
            $find=1;
        }
    }
    if (!$find)
    {
        $notFind[$fn]=1;
    }
}
print_r($notFind);
//
foreach ($ru as $name=>$value)
{
    $value=str_ireplace("\n"," ",$value);
    echo "\033[32m $name \033[0m";
    echo mb_substr($value,0,53);
    echo "\n";

}
//

// Merge

//foreach ()

//    if (preg_match_all('%==(.*)==\s+(.*)==*%',$content,$mathes,PREG_SET_ORDER))