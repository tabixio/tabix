## SQL

```sql

SELECT 'Moscow' as City,'12' as Month,20 as Value
UNION ALL
SELECT 'Moscow' as City,'11' as Month,21 as Value
UNION ALL
SELECT 'Moscow' as City,'10' as Month,21 as Value
UNION ALL
SELECT 'Boston' as City,'12' as Month,12 as Value
UNION ALL
SELECT 'Boston' as City,'11' as Month,5 as Value
UNION ALL
SELECT 'Boston' as City,'10' as Month,32 as Value
DRAW_HEATMAP
"City.Month.Value"
```

![heatmap](/img/draw-heatmap.png)