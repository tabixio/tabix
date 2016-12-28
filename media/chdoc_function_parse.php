<?php
include_once '../../phpClickHouse/include.php';

$ch=new \ClickHouseDB\Client(include_once '/sites/_clickhouse_config_product.php');
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

                $name=str_ireplace('<i>T</i>','String',$name);


                $back='(v)';
                $nameList=[];


                $mn=[];
                //replaceRegexpAll(haystack, pattern, replacement)
                if (preg_match('%([^\(]*)(\([^\(]*\).*)%ius',$name,$mn))
                {

                    $name=$mn[1];
                    $back=$mn[2];
                }

                if (stripos($name,','))
                {

                    //emptyArrayUInt8, emptyArrayUInt16, emptyArrayUInt32, emptyArrayUInt64
                    if (preg_match_all('%([^,\)\(]*)%ius',$name,$mn,PREG_SET_ORDER))
                    {
                        $o=[];
                        foreach($mn as $r)
                        {
                            $v=trim($r[0]);
                            if ($v) $o[]=$v;
                        }
                        $nameList=$o;
                    }


                }
                if (stripos($name,'dictGet'))
                {
                    $out[$name.'OrDefault']=$value;
                }

                if (sizeof($nameList))
                {

                    foreach ($nameList as $name)
                    {
                        $out[$name]=[$value,$back];
                    }
                }
                else
                {
                    $out[$name]=[$value,$back];
                }

            }
        }
    }

//
//

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
            $output['f'][$fn]['ru']=[$name,$value[0]];
            $output['f'][$fn]['b']=$value[1];
            $find=1;
        }
    }
    foreach ($en as $name=>$value)
    {
        if (stripos($name,$fn)!==false)
        {
            $output['f'][$fn]['en']=[$name,$value[0]];
            $output['f'][$fn]['b']=$value[1];
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
$json=[];


foreach($notFind as $name=>$tmp)
{
    $json[$name]['bracket']="()";
    $json[$name]['desc']['ru']="";
    $json[$name]['desc']['en']="";
}

foreach ($output['f'] as $name=>$data)
{
    $ru=$data['ru'][1];
    $en=$data['en'][1];
    $b=$data['b'];
    $en=str_ireplace("\n"," <br> ",$en);
    $ru=str_ireplace("\n"," <br> ",$ru);

    echo "\033[32m ".mb_substr($name,0,40)." \033[0m";
    echo "\033[31m ".$b." \033[0m";
    echo mb_substr($en,0,43);
    echo mb_substr($ru,0,43);
    echo "\n";




    $json[$name]['bracket']=$b;
    $json[$name]['desc']['ru']=mb_substr($ru,0,1450);
    $json[$name]['desc']['en']=mb_substr($en,0,1450);


}

$x= json_encode(['functions'=>$json],JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents('out.json',$x);