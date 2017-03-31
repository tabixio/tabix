```sql


SELECT number, 'My row title' as mytitle,  40.9762+sin(number) as xxlatitude,    -10.5918+cos(number) as xxlongitude
FROM system.numbers
LIMIT 12
DRAW_GMAPS
{
    title:'mytitle',
    count:'number',
    longitude:'xxlongitude',
    latitude:'xxlatitude'

}

```


![DRAW_sankeys](/img/draw-google-map.png)
