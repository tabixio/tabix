## OnTime data set

https://clickhouse.yandex/docs/ru/single/index.html#ontime


Все полеты по дате
```sql
SELECT FlightDate , count(*) AS `count fly` FROM ontime
GROUP BY FlightDate
ORDER BY FlightDate

DRAW_CHART
{
}
```




Процент задержек по перевозчикам за 2017 год
```sql


select Carrier,c3 FROM
(
SELECT Carrier, c, c2, c*100/c2 as c3
FROM
(
    SELECT
        Carrier,
        count(*) AS c
    FROM ontime
    WHERE DepDelay>10
        AND Year=2017
    GROUP BY Carrier
)
ANY INNER JOIN
(
    SELECT
        Carrier,
        count(*) AS c2
    FROM ontime
    WHERE Year=2017
    GROUP BY Carrier
) USING Carrier
ORDER BY c3 DESC
)
DRAW_BAR
{

}
```

Количество задержек по аэропортам
```sql




SELECT
(OriginId || ' = ' || toString(c)) as title,c, toFloat64(latitude) as latitude,toFloat64(longitude) as longitude
FROM (
SELECT
toString(Origin) as OriginId, count(*) AS c FROM ontime

WHERE DepDelay>10
GROUP BY OriginId ORDER BY c DESC LIMIT 10
)
ANY LEFT JOIN (
SELECT Origin as OriginId, latitude , longitude FROM default.aircode

) USING (OriginId)
DRAW_MAP
{
name:'title',
count:'c'
}
```


### Airport Code


wget https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat

```php
$out='';
if (($handle = fopen("airports.dat", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $out.=$data[4]."\t".$data[6]."\t".$data[7]."\n";
    }
    fclose($handle);
}

file_put_contents("out.tsv",$out);
```



```sql
drop table if exists aircode
;;

create table aircode
(
  `Origin` String,
  `latitude` Float64,
  `longitude` Float64
) Engine=Log
```


cat out.tsv | clickhouse-client --query="INSERT INTO aircode FORMAT TSV"

