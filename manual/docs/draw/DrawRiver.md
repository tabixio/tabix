
EchartAPI:
https://ecomfe.github.io/echarts-doc/public/en/option.html#series-themeRiver
https://ecomfe.github.io/echarts-doc/public/en/option.html#singleAxis



```sql
SELECT
create_date as dt,
count() as cnt,
dictGetString('geonames','name_ru',toUInt64( geoname_id ) ) as  name
FROM
sessions

WHERE

create_date>=today()-30

GROUP BY dt,name
ORDER BY cnt desc

LIMIT 3 BY dt

LIMIT 1601

DRAWRIVER
{
            x          :'dt',
            y          :'cnt',
            name       :'name',
            title      :'title chart'

}
```



## RAW

```JS
DRAWRIVER
{
            x          :'dt',
            y          :'cnt',
            name       :'name',
            title      :'title',
            raw:{
                series:[
                {

                    itemStyle:{
                        emphasis:{

                            opacity:0.1
                        }
                    }

                }
                ]
            }

}

```