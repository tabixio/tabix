### 2017-08-08

* Update handsontable + echarts 
* Fix ERR_BIG_header
* Fix table blink & not resize
* Fix dot table names
* Add sidebar field type 
* Change size tabs 
* Fix Export to TSV
* Fix DrawChart 

### 2017-07-12

* Support Clickhouse 1.1.54237 - Renamed column "default_type" to "default_kind" in system.columns
* Fix translations YandexBrowser
* Update handsontable 0.33.0
* Build 17.07.1

### 2017-07-08

* Create Table from select grid

### 2017-05-29

* "Draw Chart by Group" [see Draw_CHART](https://tabix.io/doc/draw/Draw_Chart/#group-columns)
* ProcessList in cluster, show all process in top 10 servers
* Render NULL in table 
* Fix metrics = not show zero values
* Checkbox select : 'Shift-Alt-Ctrl-Left' VS 'Ctrl-Left'
* Fix Firefox, but not recommended use ff|opera

Minor:

* Disable tabs select animation to fix layout destruction bug
* Render errors on draw + helpText + helpLink
* Fix English translation
* Update handsontable#0.32.0-beta2
* Disable DEFAULT_PORT
* Change table font Size
* Add "how to start in Docker"


### 2017-04-09

* Fix : Cannot parse input: expected ( before: /TABIX_QUERY_ID_ec0JCHn37U409iQ_()/
* Fix : SideBar menu reload on DROP/CREATE table
* Public build 17.04.3


### 2017-04-07

* Change route to `#`
* Add load CSV to Browser table
* Add WHERE IN (`@local_csv`)

### 2017-04-06

* Export CSV + add support multi query
* Move Stats table to Tab
* Public build 17.04.2


### 2017-04-03

* Fix render FORMAT CSVWithNames


### 2017-04-01

* Public build 17.04.1

### 2017-03-31

* Add google map


### 2017-03-29

* Sankeys - fix dark theme
* Fix table resize
* Add processes reload 0.5 seconds
* Parse error and move cursor
* Parse & highlight $variable in SQL Query

### 2017-03-25

* Draw_Calendar
* Echarts update to 3.5.0
* Translate echarts toolbox
* Fix CSS widgets, external white border
* Support Subtotal Pivot Data
* Fix C3 render style
* Fix XSS
* Public build 17.03.3



### Tabix  2017-03-24 Init release
*  Bind: Cmd-Y | Ctrl-Y = removeLines
*  Автодополнение + подсказка по полям с типом
*  Автодополнение словарей + подсказка
*  Возможность уменьшать редактор SQL
*  Словари в автоподсказках "dic_*"
*  Отображение числа таблиц у базы
*  fix : Не показываются пустые базы
*  Иконка таблицы зависит от Engine
*  Подсказка при подключении в виде http://127.0.0.1:8123 , возможно использование httpS
*  HTTP параметр,возможность устанавливать настройки для севера
*  Список полей в таблице (левом дереве) и вставка поля при клике в редактор
*  Запрос создания таблицы, через SHOW CREATE TABLE - в "информации"
*  Настройка автодополнение / enableLiveAutocompletion
*  Размер div результата компактнее
*  Подсветка скобок
*  Список ф-ций загружатеся исходя из возможностей сервера. Из таблицы `system.functions` + keywordMapper.builtinFunctions
*  Подсказка по функции (загрузка из json)
*  [Command | Ctrl ] + [ Right | Left ] переключает вкладки
*  Shift-Ctrl-[1...0] переключает вкладки
*  Редактор - иконки в подсказках
*  Отдельное окно SHOW PROCESSLIST FORMAT JSON
*  Подсказки из офф документации в виде Json/js
*  Редактор:Сворачивать скобки / Подзапросы
*  Редактор:Выбор разделителя запросов `;;` или `;`
*  Комманда DRAW подсветка
*  Отправка запросов post
*  Сворачивать _все_ скобки
*  Переформатирование запросов/автоформат
*  Контекстное меню у редактора, свернуть все/развернуть
*  [Command|Ctrl+Shift+Plus | Command|Ctrl+Shift+Minus ] - свернуть все/развернуть
*  [Command|Ctrl+Shift+F ] - Format code
*  Виджет-ная стуктура (Плагинная структура для Renders)
*  Виджеты через отрисовка gridster, резайз move, фиксация
*  Моноширинная таблица результата и код ошибки, или текстовый ответ
*  handsontable Таблица результата с сортировкой
*  Автоподбор ширины таблицы результата
*  TabiX name
*  HotTable темная тема для меню и hottable в списке процессов
*  PROCESSLIST режим логировать запросы
*  HotTable ресайз колонок
*  HotTable CopyPaste menu
*  Menlo font
*  В словарях поле ID строится из названия словаря, ads.blocks => block_id , ads.campaigns => campaign_id , ads.news => news_id , geonames => geoname_id
*  SHOW PROCESSLIST не останавливается
*  Меню по правой кнопке на таблице, наполнить элементы
*  KILL QUERY WHERE в SHOW PROCESSLIST ("KILL QUERY WHERE query LIKE 'SELECT sleep(%' AND (elapsed >= 0.) SYNC"
*  Меню для таблицы (по прав.кнопке )
*  Улучшить отображение полей таблицы в дереве, поддержка клика , доп элементы у таблицы - меню по правому клику
*  Редактор ACEjs,вынести из под Bower, ACE скрестить с Ace.Tern
*  Live autocomplete delay
*  KILL QUERY по query_id не по hash
*  Выбор DB через двойной клик в дереве, вслывашка о выборе
*  Дерево теперь не переключается
*  HotTable ресайз виджета, и при инициализации не правильный размер
*  Рендеры графики AmCharts + resize
*  Рендеры графики eChars + resize
*  echarts тема темная
*  Отображение какой запрос выполняется
*  Таблица с информацией о выполненых запросах в конце списка
*  HotTable menu : Style cell Bold/Green/Red
*  Метрики RealTime charts из system.metrics
*  Поправить верстку шапки
*  HotTable : ChromaJS heatmaps for the values HeatMap / DataBars(color) для колонки
*  HotTable в сплывашке показывается криво
*  HotTable + Numbro - отображать колонку если цифры как human
*  HotTable menu : Указывать формат колонки, текст/число , возможность форматирования числа
*  HotTable menu : CopyPaste to ReadMine markup
*  HotTable menu : Highlight Negative/Positive
*  HotTable menu : insert WHERE column=valuse to Clipboard
*  Метрики кнопка очистить
*  Запросы во вкладке логируются для сравнения производительности
*  PivotJS не работает Drag&Drop
*  Поиск в дереве обьектов, фильтрация дерева - оптимизация, иконка сброса поиска
*  Переиминовать в коде CHGui в Tabix
*  HotTable menu : CopyPaste - нормальная реализация не через Promnt, можно всплывающим Dialog c TextArea
*  HotTable : подсветка активной строки для темы Dark/White : currentRow : https://docs.handsontable.com/0.31.0/demo-highlighting-selection.html
*  class HandsTable.isDark() придумать как достать из isDark из глобального обьекта темы
*  Hints всплывашка рандомно каждые 5-10 минут, в tips.rand() , отдельный массив ru/eng
*  Настройка показывать скрытые символы  в acejs, задержка LiveAuto
*  Настройка размера шрифта HotTable
*  Документация : Help Modal Window
*  Расшить классы DrawChart
*  Документация : Help Modal : Hotkey + Link to docs
*  drawMAP : object.raw
*  drawMAP(Fly) : object.destination...
*  Метрики добавить system.events + async_metrics
*  draw as js function result
*  Перестроение списка баз/таблиц после выволенения запроса DROP/CREATE
*  Ошибка при создании select правой кнопкой - потерян FROM
*  drawC3 : RawAsFunction
*  draw RIVER
*  Документация : https://tabix.io/doc/ собранный из md файлов
*  draw SANKEYS
*  PivotJS D3/C3/Export
*  draw TREEMAP
*  Ошибка ``Не введен SQL``
*  Ошибка позиции `;;\nselect 2\n;;<cursor>\nselect 4\n` в коде `item.range.compare(cursor.row, cursor.column) !== 0)`
*  Не правильно показывается таблица в сплывашке
*  Обзор сервера
*  Draw_TEXT
*  Отказ от AmChart
*  Автоматические оси

### 2016-12-17

* "Order by и group by" - подсветка fix
* Разделитель запросов


### 2016-12-11

* Добавлена поддержка английского языка. Язык выбирается автоматически в зависимости от настроек браузера
* httpS поддержка - если указать в подключении https://ip:port

### 2016-11-03
Полностью обновили GUI
Вместо слов : https://monosnap.com/file/rIEnBkDoh0jMmhGDsu0umaqk5F0srt


### 2016-10-12
* Запрос на create_table из select , если запрос содержит таблицу ответа
* Сортировка словарей по name + удобное отображение
* Выполнение запроса "под курсором"
* Shift-Ctrl-Enter | Shift-Command-Enter - запустить все запросы разделенные ;; или выделенный
* Ctrl-Enter | Command-Enter - запускает текущий или выделенный
* Размер таблицы
* Исправлена загрузка шрифтов.
* Вынесен screenfull из html в зависимости
* Изменения в шаблоне lumX

### 2016-10-11
* Показ версии сборки
* Автодополнение, поддержка словарей - отдельная кнопка вставить словать
* Прогресс бар запросов
* Правки подсветки IF EXISTS + IF NOT EXISTS
* Отрисовка ответа после create/drop/insert + обновление автодополнения

### 2016-10-10
* Добавили поддержку FORMAT CSV|FORMAT CSVWithNames в запросе + подсветка + дополнение
* В редакторе добавленна возможность максимальное кол-во строк в ответа
* Развернуть в полный экран редактор запросов
* HotKey ⌘ + ⏎ для мак , выполнить запрос или выполнить выделенный запрос только
* История запросов, показывает последний успешный запрос при открытии GUI
* Анонимное подключение к базе без указания user+password
* Корректная подсветка и автодополние, теперь автодополнение содержит колонки и названия таблиц
* Последовательное выполнение нескольких запросов которые разделены `;;`

