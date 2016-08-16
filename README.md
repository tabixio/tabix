## Назначение
Данный проект представляет собой GUI для [OLAP Yandex Clickhouse](https://github.com/yandex/ClickHouse).
![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen1.png)
![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen2.png)
![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen3.png)

## Зависимости
Необходимо установить
* NodeJS >= 5.x.
* PHP > 5.4

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
