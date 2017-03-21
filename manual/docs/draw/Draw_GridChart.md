```SQL
SELECT * FROM (
SELECT '2013-05-11 19:00:00' as dt,1000 as speed,2900 as pulse,23000 as metr
UNION ALL
SELECT '2013-05-11 19:00:01' as dt,550 as speed,1900 as pulse,12000 as metr
UNION ALL
SELECT '2013-05-11 19:00:02' as dt,1080 as speed,1950 as pulse,18000 as metr
UNION ALL
SELECT '2013-05-11 19:00:03' as dt,290 as speed,1050 as pulse,15000 as metr
) ORDER BY dt
DRAW_GRIDCHART
{

}
DRAW_CHART
{

}
```


![DrawRiver](/img/draw-chart-grid.png)

