```sql
SELECT 22 as count,	'Shenzhen'  as city,	22.5455 as latitude,	114.068	as longitude
UNION ALL
SELECT 32 as count,	'Brozanky'  as city,	50.3519 as latitude,	14.4596	as longitude
UNION ALL
SELECT 22 as count,	'Enfield' as city,	41.9762 as latitude,	-72.5918 as longitude
DRAW_MAP
{
    name:'city'
}

```

![heatmap](/img/draw-map.png)

### Destination fly

```sql

SELECT 22 as count,	'Shenzhen'  as city,	22.5455 as latitude,	114.068	as longitude, 14.4596 as destination_longitude, 50.3519 as destination_latitude
UNION ALL
SELECT 32 as count,	'Brozanky'  as city,	50.3519 as latitude,	14.4596	as longitude, -73.9496 as destination_longitude, 40.6501 as destination_latitude
UNION ALL
SELECT 22 as count,	'Enfield' as city,	41.9762 as latitude,	-72.5918 as longitude,	-73.9496 as destination_longitude, 40.6501 as destination_latitude

DRAW_MAP
{
name:'city'
}
```

![heatmap](/img/draw-map-fly.png)


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
