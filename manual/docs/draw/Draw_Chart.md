
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
