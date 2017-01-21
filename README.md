## Назначение
Данный проект представляет собой GUI для [OLAP Yandex Clickhouse](https://github.com/yandex/ClickHouse).

Последняя версия рабочего приложения: [master buid on github pages](http://guiclickhouse.smi2.ru/)

[Youtube demo](https://www.youtube.com/watch?v=u5DOWnm47vg)

![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen4.jpg)
![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen5.jpg)


## Требования 
* Версия сервера CH, старше  v1.1.54019-stable
* Пользователь с правами _не_ readonly 
* Разрешенный IP адресс



## Changelog 


### Dev ( > 2016-12-22  )
- [x]  Bind: Cmd-Y | Ctrl-Y = removeLines
- [x]  Автодополнение + подсказка по полям с типом 
- [x]  Автодополнение словарей + подсказка
- [x]  Возможность уменьшать редактор SQL
- [x]  Словари в автоподсказках "dic_*"
- [x]  Отображение числа таблиц у базы
- [x]  fix : Не показываются пустые базы
- [x]  Перестроение списка баз/таблиц после выволенения запроса DROP/CREATE
- [x]  Иконка таблицы зависит от Engine
- [x]  Подсказка при подключении в виде http://127.0.0.1:8123 , возможно использование httpS
- [x]  HTTP параметр,возможность устанавливать настройки для севера
- [x]  Список полей в таблице (левом дереве) и вставка поля при клике в редактор
- [x]  Запрос создания таблицы, через SHOW CREATE TABLE - в "информации" 
- [x]  Настройка автодополнение / enableLiveAutocompletion
- [x]  Размер div результата компактнее
- [x]  Подсветка скобок
- [x]  Список ф-ций загружатеся исходя из возможностей сервера. Из таблицы `system.functions` + keywordMapper.builtinFunctions
- [x]  Подсказка по функции (загрузка из json)
- [x]  [Command | Ctrl ] + [ Right | Left ] переключает вкладки
- [x]  Shift-Ctrl-[1...0] переключает вкладки 
- [x]  Редактор ACEjs,вынести из под Bower
- [x]  Редактор - иконки в подсказках
- [x]  Отдельное окно SHOW PROCESSLIST FORMAT JSON
- [x]  Подсказки из офф документации в виде Json/js 
- [x]  Редактор:Сворачивать скобки / Подзапросы
- [x]  Редактор:Выбор разделителя запросов `;;` или `;` 
- [x]  Комманда DRAW подсветка
- [x]  Отправка запросов post
- [x]  Сворачивать _все_ скобки 
- [x]  Переформатирование запросов/автоформат
- [x]  Контекстное меню у редактора, свернуть все/развернуть
- [x]  [Command|Ctrl+Shift+Plus | Command|Ctrl+Shift+Minus ] - свернуть все/развернуть
- [x]  [Command|Ctrl+Shift+F ] - Format code





**Todo high**:
- [ ] Редактор 
> - Парсинг в тексте FROM DBName.TBName,список доступных полей исходя из имени таблиц
 
- [ ] Переменные 
> - Подстановка в запросах $var переменных 
> - Таблица редактор


- [ ] Рендер
> - в виде текста для Redmine 
> - Рендеры графики AmCharts
> - Плагинная структура для Renders
> - Рендер стандартной таблицы с фильтрами + сортировка ( клиенте/  сервером ) Grid, выбрать из pivotJs таблицы,   [ui-grid.info | ag-grid | paramquery.com | js-grid.com]
http://krispo.github.io/angular-nvd3/#/

- [ ] Улучшить отображение полей таблицы в дереве, поддержка клика , доп элементы у таблицы - меню по правому клику
- [ ] Help Modal Window -> Link to github +  Hotkey справочник и/или help 
- [ ] Kill query in SHOW PROCESSLIST

- [ ]  echarts тема темная 
- [ ]  ACE скрестить с Ace.Tern
- [ ]  Live autocomplete delay

**Todo low**:
- [ ] tableau export via WDC/ODATA
- [ ] Ошибка ``Не введен SQL`` 

- [ ] Ошибка позиции `;;\n
                      select 2\n
                      ;;<cursor>\n
                      select 4\n` в коде `item.range.compare(cursor.row, cursor.column) !== 0)`
 


----
*Построение графи.*
sankeys in Tableau: https://community.tableau.com/thread/154623

http://echarts.baidu.com/demo.html#sankey-product

http://echarts.baidu.com/demo.html#treemap-drill-down

http://echarts.baidu.com/examples.html



**ACE**

https://github.com/ajaxorg/ace/wiki/Configuring-Ace

https://github.com/tlatoza/SeeCodeRun/wiki/Ace-code-editor

https://masonwebdev.wordpress.com/2016/03/22/extending-ace-lets-make-sure-you-are-always-with-higher-hand/

----
tableau: 

https://community.tableau.com/community/developers/web-data-connectors
https://github.com/justindarc/fxos-web-server
https://onlinehelp.tableau.com/current/server/en-us/datasource_wdc.htm
https://github.com/wangshijun/angular-echarts

----

GridX : http://oria.github.io/gridx/gallery.html#filter

zkoss Grid: https://www.zkoss.org/zkdemo/grid/grouping_model

ember-table : http://opensource.addepar.com/ember-table/#/community-examples

ui-grid.info : http://ui-grid.info/docs/#/tutorial/401_AllFeatures



http://raw.densitydesign.org/



# Draw 

### drawchart

```javascript
{
    cos:{'lineColor':'green','type':'column'},
    sin:{'title':'COS!!!!'}
}
```
### drawsankeys

```javascript
{
    levels:[
        {source:'AdmArea',target:'District',value:'MoneyPerHour'},
        {source:'District',target:'Street',value:'MoneyPerHour'}
    ],
    echarts:{}
}
```

----

### 2016-12-17

* "Order by и group by" - подсветка fix
* Разделитель запросов 


### 2016-12-11

* Добавлена поддержка английского языка. Язык выбирается автоматически в зависимости от настроек браузера
* httpS поддержка - если указать в подключении https://ip:port 

### 2016-11-03
Полностью обновили GUI 
Вместо слов : https://monosnap.com/file/rIEnBkDoh0jMmhGDsu0umaqk5F0srt 


### 2016-10-12
* Запрос на create_table из select , если запрос содержит таблицу ответа 
* Сортировка словарей по name + удобное отображение
* Выполнение запроса "под курсором"  
* Shift-Ctrl-Enter | Shift-Command-Enter - запустить все запросы разделенные ;; или выделенный 
* Ctrl-Enter | Command-Enter - запускает текущий или выделенный 
* Размер таблицы 
* Исправлена загрузка шрифтов. 
* Вынесен screenfull из html в зависимости
* Изменения в шаблоне lumX

### 2016-10-11
* Показ версии сборки
* Автодополнение, поддержка словарей - отдельная кнопка вставить словать
* Прогресс бар запросов
* Правки подсветки IF EXISTS + IF NOT EXISTS
* Отрисовка ответа после create/drop/insert + обновление автодополнения

### 2016-10-10
* Добавили поддержку FORMAT CSV|FORMAT CSVWithNames в запросе + подсветка + дополнение
* В редакторе добавленна возможность максимальное кол-во строк в ответа
* Развернуть в полный экран редактор запросов 
* HotKey ⌘ + ⏎ для мак , выполнить запрос или выполнить выделенный запрос только 
* История запросов, показывает последний успешный запрос при открытии GUI 
* Анонимное подключение к базе без указания user+password  
* Корректная подсветка и автодополние, теперь автодополнение содержит колонки и названия таблиц
* Последовательное выполнение нескольких запросов которые разделены `;;`



Пример тестового запроса: 
```sql

;;select 0 as ping;;
select 1 as ping;;select 2 as ping
;;select 3+sleep(0.1) as ping;;select 4+sleep(0.1) as ping;;
SELECT 5 As PING format JSON;;select 6 as ping
;;select 7 as ping FORMAT CSVWithNames
;;CREATE TABLE IF NOT EXISTS t (a UInt8,b String) ENGINE = Log;;
INSERT INTO t SELECT toUInt8(123) as a,';;' as b  
;;DROP TABLE IF EXISTS t;;DROP DATABASE IF EXISTS xzxz;;

```


# Dev

## Зависимости
Необходимо установить
* NodeJS >= 5.x. ( лучше v6.7.0 )

Установить глобальные NPM пакеты Gulp и Bower, загрузить зависимости:
<pre>
sudo npm install bower -g
sudo npm install gulp -g
npm install
bower install
</pre>

## Сборка
Для разработки:
<pre>
gulp serve
</pre>
На production:
<pre>
gulp build
</pre>

Для сборки документации:
<pre>
gulp docs
</pre>
