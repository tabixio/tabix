## Direct chart by JS code


Доступно у любого типа DRAW_MAP / DRAW_C3 / DRAW_CHART -> результат ф-ции передается в обьект графика как настройки


```sql

SELECT 1
DRAW_RAW
function (d)
{
    console.log(d.data);
    console.log(d.meta);
    return {series:[]};
}


```


Function arguments : ( dataProvider  )

## Object data

* dataProvider.data - result from SQL
* dataProvider.meta - columns meta




### Example river

```sql

SELECT
event_date,
campaign_id,
sum(views) as views
FROM
model.news
GROUP BY event_date,campaign_id
ORDER BY event_date,views DESC
LIMIT 10 BY event_date
LIMIT 1400
DRAW_RAW
function (d)
{
    let x={
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: 'rgba(0,0,0,0.2)',
                width: 1,
                type: 'solid'
            }
        }
    },
    singleAxis: {
        // top: '8%',
        axisTick: {},
        axisLabel: {},
        type: 'time',
        position: 'top',
        splitLine: {
            show: true,
            lineStyle: {
                type: 'dashed',
                opacity: 0.2
            }
        }
    },
    series:[]
    };

    // load data from result to series

    let ddl=d.data.map(function (item) {
        return [item.event_date,item.views,item.campaign_id]
    });

    let sr={
        type: 'themeRiver',
            itemStyle: {
                emphasis: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.8)'
                }
            },
        // apply data
        data:ddl
    };


    x.series.push(sr)

    // debug
    console.log(x);

    // result
    return x;
}
```