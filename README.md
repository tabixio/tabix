## Назначение
Проект предназначен для управления рекламно-новостной сетью.

## Зависимости
Необходимо установить NodeJS >= 5.x.

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
