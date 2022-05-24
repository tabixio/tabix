```sql

SELECT c.database, c.table, c.name, c.type, c.position, p.counter
from system.columns as c
       LEFT JOIN (
  SELECT database, table, name, count(*) as counter
  FROM system.parts_columns
  GROUP BY database, table, name
  LIMIT 40
  ) as p ON (p.database = c.database AND p.table = c.table AND p.name = c.name)
;;
-- Rel fix
SELECT z1
FROM (
       SELECT 1 as z1, 2 as z2, 3 as z3
       FROM system.clusters
       UNION ALL
       SELECT 1 as w1, 2 as w2, 3 as w3
       FROM system.collations
       ) as alias_a11





```

```sql
SELECT event_time,
       ProfileEvent_ReadBufferFromFileDescriptorRead,
       ProfileEvent_IOBufferAllocs,
       ProfileEvent_DiskReadElapsedMicroseconds,
       CurrentMetric_PartsActive
FROM system.metric_log
ORDER BY event_time
LIMIT 4000



```

```

DataDecorator - 1 query, and result  
DataLayer - 1...More [DataDecorator]
DataLayer - return all exists items with props for render Table,Draw. DataItemsLayout - render DataLayer, getItems()...
[ Header, Footer ] , getItems().map()=> renderItemByType()


Pool|Array<[SQL -> DataDecorator]> -> DataLayer -> DataRender? >->? DataItemsLayout -> Header+GridLayout -> Table|Draw


DataLay - должен содержать 
<MarkDown>
<SQL Editor>
<Table>
<Draw>
<Rows|Cols|Collapse>

```

----

