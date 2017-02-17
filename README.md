## Назначение
Данный проект представляет собой GUI для [OLAP Yandex Clickhouse](https://github.com/yandex/ClickHouse).

Последняя версия рабочего приложения: [master buid on github pages](http://guiclickhouse.smi2.ru/)

[Youtube demo](https://www.youtube.com/watch?v=u5DOWnm47vg)

![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen4.jpg)
![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen5.jpg)


## Требования 
* Версия сервера CH, старше  v1.1.54019-stable, process list >= 1.1.54159
* Пользователь с правами _не_ readonly 
* Разрешенный IP адресс




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

## B
Для разработки:
<pre>
gulp serve
</pre>