JSAPI :

* https://ecomfe.github.io/echarts-doc/public/en/option.html#geo



Example :

* http://echarts.baidu.com/demo.html#map-world
* http://echarts.baidu.com/demo.html#geo-map-scatter
* http://echarts.baidu.com/demo.html#geo-lines


```sql
SELECT
    count() as sessions,
    sum(views_count) as views_count,
    dictGetString('geonames', 'name_en', toUInt64(geoname_id)) AS name,
    dictGetFloat32('geonames', 'latitude', toUInt64( geoname_id)) AS latitude,
    dictGetFloat32('geonames', 'longitude', toUInt64(geoname_id)) AS longitude

FROM sessions
where create_date=today()
group by geoname_id

```


## Echarts Api

```javascript

{
  visualMap: {
        min: 0,
        max: 1500,
        left: 'left',
        top: 'bottom',
        text: ['High','Low'],
        seriesIndex: [1],
        inRange: {
            color: ['#e0ffff', '#006edd']
        },
        calculable : true
    },
    geo: {
            map: 'world',
            roam: true,
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: 'rgba(0,0,0,0.4)'
                    }
                }
            },
            itemStyle: {
                normal:{
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis:{
                    areaColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },

}
```



## Finalize

```javascript
DRAWMAP
{
    longitude:"longitude",
    latitude:"latitude",
    counter:"views_count",
    category:"session_count"

    raw:{
        tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
    }
}
```