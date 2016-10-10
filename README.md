## Назначение
Данный проект представляет собой GUI для [OLAP Yandex Clickhouse](https://github.com/yandex/ClickHouse).

Последняя версия,рабочего приложения : http://guiclickhouse.smi2.ru/


![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen1.png)
![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen2.png)
![](https://raw.githubusercontent.com/smi2/clickhouse-frontend/master/media/screen3.png)


## Требования 
* Версия сервера CH, старше  v1.1.54019-stable
* Пользователь с правами _не_ readonly 
* Разрешенный IP адресс


## Зависимости
Необходимо установить
* NodeJS >= 5.x.

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
