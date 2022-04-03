```shell
cd ./docker/

docker-compose build
docker-compose up

 


#  
docker-compose build clickhouse19 clickhouse209 clickhouse21 clickhouse22
docker-compose up clickhouse19 clickhouse209 clickhouse21 clickhouse22
```

```shell

echo 'select version()' | curl 'http://localhost:9813/?user=default&password=secret' --data-binary @-
echo 'select version()' | curl 'http://localhost:10813/?user=default&password=secret' --data-binary @-
echo 'select version()' | curl 'http://localhost:11813/?user=default&password=secret' --data-binary @-
echo 'select version()' | curl 'http://localhost:12813/?user=default&password=secret' --data-binary @-


```