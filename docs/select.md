```sql

SELECT c.database, c.table, c.name, c.type, c.position, p.counter
from system.columns as c
       LEFT JOIN (
  SELECT database, table, name, count(*) as counter
  FROM system.parts_columns
  GROUP BY database, table, name
  LIMIT 40
  ) as p ON (p.database = c.database AND p.table = c.table AND p.name = c.name)



```