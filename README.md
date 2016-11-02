## Назначение
Данный проект представляет собой GUI для [OLAP Yandex Clickhouse](https://github.com/yandex/ClickHouse).

Последняя версия рабочего приложения: http://guiclickhouse.smi2.ru/


![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen4.jpg)
![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen5.jpg)


## Требования 
* Версия сервера CH, старше  v1.1.54019-stable
* Пользователь с правами _не_ readonly 
* Разрешенный IP адресс



### Roadmap


* Список процессов, с логированием [SHOW PROCESSLIST FORMAT JSON]
* Hotkey справочник и/или help 
* SHOW CREATE TABLE 
* Изменить Grid, выбрать из [ui-grid.info | ag-grid | dhtmlx | paramquery.com | js-grid.com], предпочтение dark
* Возможно выбрать pivotJs таблицы,  c поддержкой D3/C3
* Выбор разделителя `;;` или `;`




## Changelog 

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
![](https://api.monosnap.com/rpc/file/download?id=ky5h5tQoubjbZa01N8FV08qVxqD8xa)


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

## Документация
Для сборки документации:
<pre>
gulp docs
</pre>
