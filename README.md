## Tabix.IO

"Data drive"
 Open Source Business Intelligence and reporting tool for Clickhouse, and other datasource.


 A simple business intelligence application.

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