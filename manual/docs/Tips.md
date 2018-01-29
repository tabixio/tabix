
## Работа с мульти запросами

Работа с мульти запросами, удобно написать несколько запросов в одной вкладке и разделить их ";;"
 
Передвигая курсор на первый или второй запрос и нажать Cmd(Ctrl)+Enter - выполняется запрос под курсором

Не нужно использовать историю запросов - все в одном редакторе. 

Можно нажать Shift+Cmd+Enter - и выполнятся все запросы разом в редакторе. 

Допустим вы хотите: 
```
DROP TABLE IF EXISTS default.x 
;;
CREATE TABLE default.x ( x Int32 ) Engine=Log
;;
INSERT INTO default.x 
SELECT 12345
```

Можно ввести это все в поле и выполнить разом 

![Tabix multi query](https://tabix.io/anime/MultiQuery.gif)

Также история запросов отображается в левой части.

## Double click

Двойной клик сворачивает панель 

![Tabix multi query](https://tabix.io/anime/DoubleClicks.gif)

## Переменные 

Отдельная панель для редактирования Vars, поддерживается синтаксис: 

```
$var_name
@var_name
:var_name 

```

![Tabix variables](https://tabix.io/anime/Vars.gif)

## Снипеты 

Часто используемый код, в качестве примера : `event_date=today()` можно сохранить в сниппет и он появляется в автокомплите

![Tabix Snippets](https://tabix.io/anime/Snippets.gif)


## Transpose, поворот таблицы

Бывает очень удобно повернуть таблицу у которой очень большое кол-во колонок и мало строк

![Tabix Transpose](https://tabix.io/anime/Transpose.gif)



## SQL + With totals

Если в запросе указано `WITH TOTALS` последняя строка в результирующей таблице содержит TOTALS


![Tabix Transpose](https://tabix.io/anime/withtotals.gif)



## Right click в таблице 

Правый клик - открывает меню

![Tabix Right Click Table](https://tabix.io/anime/RightClickTable.gif)




## Draw_Chart - [xAxis,yAxis]

Можно указать колонки которые используются для осей

По умолчанию для построения графиков берется за ось X - первая колонка, или колонка формата DateTime

На оси Y откладываются отдельно другие колонки, если встречается колонка типа String, она становится группировочной

Но бывает необходимо построить график только по заданным колонкам:




![Tabix Right Click Table](https://tabix.io/anime/draw_y_x_axis.gif)
 


## Draw_Plotly

Экспериментальная разработка - поддержка Plotly для построения 3D

![Tabix 3D ](https://tabix.io/doc/img/plotly_mesh3d.png)


## Calc sum

Select cells -> Right click -> "Calc Avg & Sum & Median"