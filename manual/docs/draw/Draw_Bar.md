```SQL
SELECT 'Car' as title,toUInt16( 2023) as price , toUInt16( 9) as discount
UNION ALL
SELECT 'Home' as title,toUInt16( 12023) as price , toUInt16( 4) as discount
UNION  ALL
SELECT 'Eat' as title,toUInt16( 703) as price , toUInt16( 4) as discount
UNION  ALL
SELECT 'my fly' as title,toUInt16( 20233) as price, toUInt16( 6) as discount
DRAW_BAR
{

}
```

![AutoAxis](/img/draw-chart-bar.png)


### Disable Auto Axis


```JAVASCRIPT

DRAW_BAR
{
    autoAxis:false
}

```

![AutoAxis](/img/draw-chart-bar-noautoAxis.png)
