# API 

https://github.com/tabixio/tabix/blob/alpha/src/api/index.js
https://github.com/tabixio/tabix/tree/alpha/src/libs/api

Верхний class API  - через него все отправляется 

У него constructor(connection) принимает коннекшен состоящий из формы логин/пасс и т/д

Он может работать с двумя провайдерами данных providerTabixServer или providerDirectClickHouse
Т/е API поделен на два типа подключения Direct или Tabix.Server 

Сейчас есть только Direct - это отправка запросов сразу в базу CH 

Провайдеры унаследованы от CoreProvider

Который умеет делать fetch()

Выполняем 
```
API=new Api(connection)
API.init(), если все ок - делаем обьект глобальным и работаем с ним
```



### API.getDatabaseStructure() 

Возращает класс DatabaseStructure, после инициализации 
Это позволяет использоваь его в компонентах AceJSEditor 

### API.fetch() или API.query() 

fetch - Оправляют запрос в CH и возращает DataDecorator() - это основной обьект который нужен для отображения результата

query - прямой результат из базы 


### API.test() 

Тестовый запрос на sin и cos 

# AceJS Editor

Оригинал: https://ace.c9.io/

Кастомный собранный Brace=>AceJS 

https://github.com/tabixio/tabix/tree/alpha/src/components/Ace


# Handsontable

Оригинал: https://handsontable.com/

https://github.com/tabixio/tabix/tree/alpha/src/components/Handsontable



 
## Про иерархию баз/таблиц сервеоа

Ключевые:

Есть несколько серверов, сейчас он один называется "Clickhouse Server" это при прямом подключении, API пока не может его возращать - нужно будет допиливать 

Пока он просто прямо в коде сделан как первый уровень и автоматом развернут 

Возможно будем делить код дерева - для прямого подключения или через TS (tabix server) 

В девере в нутри каждого сервера - есть отдельные системны кнопки "Reload Structure" "Metrics"

У девера есть ф-ции:
1) Клик левой кнопкой по полям - по нижнему уровню - вставить название в текущий редактор 
2) Клик правой кнопкой на таблица / на базе / на сервере - разный набор меню 
https://monosnap.com/file/vUW8tmtYJHCB9LFQD4XlKGp2NSTBwI

Сейчас только на таблицах есть меню  - буем расширять 

3) Двойнок клик на таблице - будет открывать новую вкладку <page> с просмотром таблицы

- Цветом выделяется активная база данных - при переключениях между <page> меняется и дерево - происходит "перескок" 

Т/е внешние комманды - могут менять выделение / схлопывание - дерева

Каждый сервер / база / таблица - может иметь свою иконку - она выберается исходя из типа

Делал поиск / фильтр по деверу -- можно было вводить название и делался 

Я брал ф-цию для поиска из AceJS 
this.filterCompletions = function(items, needle) {

Она отлично работает и качество хорошее -- но у меня возникла проблема с Angular1 и их Watch - их было много и это жутко тормозило 

https://github.com/ajaxorg/ace/blob/f4051ee2305d4b1c7c19704f4a9bf51b8c636a2c/lib/ace/autocomplete.js#L477

Структура девера - кэшируется, и есть "глобальная" комманда "reload()" которая обновляет все : дерево и все редакторы AceJs

Reload - нужен чтобы когда создается таблица на сервере - другим пользователем или текущий делает запрос "CREATE TABLE" делаем тоже "Reload()"


## Gridser
* React-Grid-Layout


## PlotLy
* react-chart-editor