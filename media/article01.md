Tabix is open source simple BI and sql editor tool for Clickhouse. 
==================================================================


Для старта ипользованая Tabix, нужно подкорректировать настройки Clickhouse. 

Нужно разрешить подключаться с вашего IP адресса к CH, добавив listen_host в `/etc/clickhouse-server/config.xml` 

```xml
<listen_host>111.222.111.222</listen_host>
```


Далее заходим на `ui.tabix.io`


![Alt Text](tabixlogin.png)

Указываем:
*  в поле url ваш адресс к серверу СH `todo`
* Lhogin & Password
* Другие парамерты оставдяем пустми 