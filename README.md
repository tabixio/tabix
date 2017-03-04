## Tabix.IO

"Data drive"
 Open Source Business Intelligence and reporting tool for Clickhouse, and other datasource.


 A simple business intelligence application.



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



### Roadmap
Список фич:
* Список полей в левом дереве
* Список процессов, с логированием [SHOW PROCESSLIST FORMAT JSON]
* Hotkey справочник и/или help
* SHOW CREATE TABLE
* Изменить Grid, выбрать из [ui-grid.info | ag-grid | paramquery.com | js-grid.com], сортировка на клиенте
* Возможно выбрать pivotJs таблицы,  c поддержкой D3/C3
* Выбор разделителя `;;` или `;`



## Docker
Run command:

```
docker run -d --name client -p 3000:3000 -e CLICKHOUSE_HOST=http://localhost:1982/ spoonest/clickhouse-web-client
```

where `http://localhost:1982/` - link to youe clickhouse server.
Then you can access GUI via http://localhost:3000/. Server takes time to fully start.


## Develop

Для разработки:
<pre>
gulp serve
</pre>