
## Работа с мульизапросами

Работа с мульизапросами, удобно написать несколько запросов в одной вкладке и разделить их ";;"
 
Передвигая курсов на первый или второй запрос и нажать Cmd+Enter - выполниться запрос под курсором 

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


## SQL + With totals


## Right click в дереве 


## Right click в таблице 



## Draw_Chart - [xAxis,yAxis]

Можно указать колонки которые используются для осей



 


