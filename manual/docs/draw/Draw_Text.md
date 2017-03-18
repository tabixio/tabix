```sql
SELECT version( ) as ver
DRAW_TEXT
<b>Clickhouse Version</b>: <i style='color:red'> {{data.0.ver}}</i>

```


![DrawRiver](/img/draw-text.png)



### JS Template engine

**Mustache**

https://github.com/janl/mustache.js


### Data


```
{{data.0}} - first row
{{data.0.col1}} - first row and col1

{{meta}} - object meta