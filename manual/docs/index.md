tabix.io


# Достоинства

* Не нужно устанавливать, работает из браузера
* Поддерживает ClickHouse SQL синтаксис
* Отрисовка графиков и схем или карты мира.





# Фичи


### Работа с запросами - Редактор
* Автодополнение полей / словарей / функций 
* Подсказки по полям / ф-циям русский/английский
* Переформатирование запросов/автоформат 
* Редактор:Сворачивать скобки / Подзапросы
* Настройка автодополнение / enableLiveAutocompletion
* Подсветка скобок
* Список ф-ций загружатеся исходя из возможностей сервера
* Отображение какой запрос выполняется
![SQL_Editor](https://tabix.io/anime/SQL_Editor.gif)

### Работа с запросами - Вкладки
* Rename
* Pin

### Дерево баз и таблиц

* Отображение числа таблиц у базы
* Иконка таблицы зависит от Engine
* Список полей в таблице и вставка поля при клике в редактор
* Выбор DB через двойной клик в дереве, вслывашка о выборе
* Поиск в дереве обьектов, фильтрация дерева 
* Перестроение списка баз/таблиц после выволенения запроса DROP/CREATE

![DBView](https://tabix.io/anime/DB_Left_View.gif)


### HotKeys
* [Command | Ctrl ] + [ Right | Left ] переключает вкладки
* Shift-Ctrl-[1...0] переключает вкладки
* [Command|Ctrl+Shift+Plus | Command|Ctrl+Shift+Minus ] - свернуть все/развернуть
* [Command|Ctrl+Shift+F ] - Format code

### Просмотр процессов 
* Логирование 
* KILL QUERY

### Просмотр таблицы 
* Запрос создания таблицы, через SHOW CREATE TABLE - в "информации"

### Работа с результатом запроса
* Виджеты через отрисовка gridster, резайз move, фиксация
* handsontable Таблица результата с сортировкой
* Автоподбор ширины таблицы результата
* HotTable CopyPaste menu
* Таблица с информацией о выполненых запросах в конце списка / Запросы во вкладке логируются для сравнения производительности
* HotTable colors / format/heatmaps 
* HotTable + Numbro - отображать колонку если цифры как human
* HotTable menu : Указывать формат колонки, текст/число , возможность форматирования числа
* HotTable menu : CopyPaste to ReadMine markup
* HotTable menu : Highlight Negative/Positive
* HotTable menu : insert WHERE column=valuse to Clipboard



### Метрики
* Метрики RealTime charts из system.metrics
* system.events + async_metrics

![Mectrics](https://tabix.io/anime/Metrics.gif)

### Draw
* Комманда DRAW подсветка
* draw as js function result



