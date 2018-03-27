## Working with multiple queries


Working with multiple queries, it is convenient to write several queries in one tab and split them ";;"
 
Moving the cursor to the first or second query and pressing Cmd (Ctrl) + Enter - the query is performed under the cursor

Do not use the query history - all in one editor.

You can press Shift + Cmd + Enter - and all queries are executed at once in the editor.

Let's say you want:

```
DROP TABLE IF EXISTS default.x 
;;
CREATE TABLE default.x ( x Int32 ) Engine=Log
;;
INSERT INTO default.x 
SELECT 12345
```

You can enter this all into the field and execute at once

![Tabix multi query](https://tabix.io/anime/MultiQuery.gif)

Also, the query history is displayed on the left.


## Double click

Double-click to collapse the panel

![Tabix multi query](https://tabix.io/anime/DoubleClicks.gif)

## Variables

A separate panel for editing Vars, the syntax is supported:


```
$var_name
@var_name
:var_name 

```

![Tabix variables](https://tabix.io/anime/Vars.gif)

## Snippet

Often used code, as an example: `event_date = today ()` can be saved to the snippet and it appears in the autocomplete

![Tabix Snippets](https://tabix.io/anime/Snippets.gif)


## Transpose table

It can be very convenient to rotate the table which has a very large number of columns and few rows

![Tabix Transpose](https://tabix.io/anime/Transpose.gif)



## SQL + With totals

If the query specifies `WITH TOTALS`, the last row in the resulting table contains TOTALS


![Tabix Transpose](https://tabix.io/anime/withtotals.gif)



## Right click in the table 

Right click - opens the menu

![Tabix Right Click Table](https://tabix.io/anime/RightClickTable.gif)




## Draw_Chart - [xAxis,yAxis]

You can specify the columns that are used for the axes

By default, the X-axis is used for plotting - the first column, or the DateTime column

On the Y axis, other columns are stored separately, if there is a column of type String, it becomes grouping

But sometimes it is necessary to build a graph only on the given columns:




![Tabix Right Click Table](https://tabix.io/anime/draw_y_x_axis.gif)
 


## Draw_Plotly

Experimental development - Plotly support for building 3D

![Tabix 3D ](https://tabix.io/doc/img/plotly_mesh3d.png)


## Calc sum

Select cells -> Right click -> "Calc Avg & Sum & Median"

![Tabix 3D ](https://tabix.io/doc/img/CalcSumMedian.png)
