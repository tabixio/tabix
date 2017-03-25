```SQL

SELECT
'not_use_column' as col1,
toDate(today()-number ) as dt,
'not_use_column_2' as col2,
sin(number)*100 as value
FROM system.numbers
LIMIT 800
DRAW_CALENDAR
{

}

```


![DrawCalendar](/img/draw-calendar.png)




[Echart Example](https://ecomfe.github.io/echarts-examples/public/editor.html?c=calendar-horizontal)



### Raw

```sql
select  event_date,count() as clicks FROM my_clicks_table
WHERE event_date>=today()-100
GROUP BY event_date
DRAW_RAW
function (d)
{
    var data=d.data.map(function (item) {
        return [  item.event_date  ,  item.clicks  ]
    });

    var option = {
           visualMap: {
                min: 80167665,
                max: 111321013,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                top: 'top'
            },
            calendar: [{
                            range: '2017',
                            cellSize: ['auto', 20]
                    }],
            series: [{
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 0,
                data: data

             }]

    };
    return option;
}

```