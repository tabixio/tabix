### Chart by DateTime column

* First column must be : Date or DateTime
* Use order by Date

![AutoAxis](/img/draw-chart-datetime.png)

### Chart & autoAxis

```SQL
SELECT modification_time,bytes,marks,table,  primary_key_bytes_in_memory
FROM system.parts order by modification_time LIMIT 1000
DRAW_CHART
{
    autoAxis:true
}
```

![AutoAxis](/img/draw-chart-autoAxis.png)

**autoAxis:false**


![AutoAxis](/img/draw-chart-noautoAxis.png)


autoAxis - default is false

### Chart & markLine

Draw median line


```javascript
DRAW_CHART
{
    markLine:true
}
```

![AutoAxis](/img/draw-chart-markLine.png)


### Chart & Stack


```javascript
DRAW_CHART
{
    stack:true
}
```

![AutoAxis](/img/draw-chart-stack.png)

![AutoAxis](/img/draw-chart-stack-bar.png)


### Group columns

```sql

SELECT toDate( '2016-01-04') as dt,'CAR' as type,'WHITE' as color,toInt16(2000) as cost,122 as width
UNION ALL SELECT toDate( '2016-01-04') as dt,'CAR' as type,'BLACK' as color,toInt16(2100) as cost,121 as width
UNION ALL SELECT toDate( '2016-01-02') as dt,'CAR' as type,'WHITE' as color,toInt16(2200) as cost,100 as width
UNION ALL SELECT toDate( '2016-01-02') as dt,'CAR' as type,'BLACK' as color,toInt16(2300) as cost,99 as width
UNION ALL SELECT toDate( '2016-01-03') as dt,'CAR' as type,'WHITE' as color,toInt16(2400) as cost,110 as width
UNION ALL SELECT toDate( '2016-01-03') as dt,'CAR' as type,'BLACK' as color,toInt16(2500) as cost,112 as width
UNION ALL SELECT toDate( '2016-01-13') as dt,'BUS' as type,'BLACK' as color,toInt16(2500) as cost,112 as width
DRAW_CHART 
{
   path:'type'
}


```