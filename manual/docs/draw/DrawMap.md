## Params

```javascript
DRAW_MAP
{
    longitude   :'longitude',
    latitude    :'latitude',
    count       :'count',
    name        :'name',
    title       :'Map',
    destination : {
        longitude:'destination_longitude',
        latitude :'destination_latitude',
        speed    : 'destination_speed',
        name     : 'destination_name',
        count    : 'destination_count'
    }
}
```

## SQL

```sql
SELECT
    sum(views_count) as count,
    dictGetString('geonames', 'name_en', toUInt64(geoname_id)) AS nameXYRU,
    dictGetFloat32('geonames', 'latitude', toUInt64( geoname_id)) AS latitude,
    dictGetFloat32('geonames', 'longitude', toUInt64(geoname_id)) AS longitude,

    -73.9496 as destination_longitude,
    40.6501 as destination_latitude,

FROM sessions
where create_date=today()
group by geoname_id

DRAW_MAP
{
  name        :'nameXYRU'
}
```


## Echarts Api

* [option geo](https://ecomfe.github.io/echarts-doc/public/en/option.html#geo)

Example :

* https://ecomfe.github.io/echarts-examples/public/editor.html?c=geo-lines
* http://echarts.baidu.com/demo.html#map-world
* http://echarts.baidu.com/demo.html#geo-map-scatter
