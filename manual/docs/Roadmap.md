## Roadmap 17Q1

> Фичи

- [ ]  Виджет список предустановленных графиков
- [ ]  PivotJS D3/C3/Export
- [ ]  PivotJS Subtotal


> Фичи DRAW

- [ ]  dRAW GRID CHART
- [ ]  dRAW BAR
- [ ]  draw TREEMAP

- [ ]  draw CHART : AmCharts Кill, use Echarts
- [ ]  draw Andrews  Визуализация многомерных данных с помощью диаграмм Эндрюса
- [ ]  draw SOLAR  - Новый тип визуализации для исследования корреляций

> Дока

- [ ]  Оформить readme https://habrahabr.ru/company/everydaytools/blog/322694/
- [ ]  Оформить Tabix.IO



> Bugs

- [ ]  Не перенесенно из старой версии - кнопка экспорта и кнопка создать таблицу в HotTable
- [ ]  Не правильно показывается таблица визитов, переделать на Виджет таблицы и класс DataProvider+HandsTable

## Roadmap 17Q2 - UI

- [ ]  С3 DarkTheme
- [ ]  draw HEATMAP
- [ ]  Граф кластера system.clusters, состояние, список узлов https://ecomfe.github.io/echarts-examples/public/editor.html?c=graph-force https://ecomfe.github.io/echarts-examples/public/editor.html?c=graph-webkit-dep
- [ ]  Ошибка кода JS отображать в поле draw
- [ ]  Минимальный редактор графиков
- [ ]  HotTable запоминать размеры установленные руками ( не сбрасывать в ноль )
- [ ]  DRAWSET, реализовать парсер, задает параметры области рендера результата
- [ ]  HotTable menu : Hide Column / Show Column
- [ ]  Low hotTable : Searching ячеек
- [ ]  Огромное потребление CPU у Метрик
- [ ]  Утечки ram и cpu при длительном использовании
- [ ]  Не просматриваются системные таблицы /system/table/clusters

> Переменные
> - Парсинг в тексте "Переменные" и их подсветка
> - Подстановка в запросах $vars переменных
> - Таблица редактор $vars

- [ ] Позиция ошибки в корявом sql, парсить ошибку на строку + позицию , заставить Ace найти этот запрос и отпозиционироваться Syntax error: failed at position 25 (line 2, col 4)
- [ ] Размер несжатых данных
- [ ] Парсинг в тексте FROM DBName.TBName,список доступных полей исходя из имени таблиц
- [ ] tableau export via WDC/ODATA
- [ ] Ошибка ``Не введен SQL``
- [ ] Ошибка позиции `;;\n
                      select 2\n
                      ;;<cursor>\n
                      select 4\n` в коде `item.range.compare(cursor.row, cursor.column) !== 0)`


-  [ ] polar-dataZoom http://gallery.echartsjs.com/editor.html?c=polar-dataZoom


## Roadmap 17Q2 - Server
