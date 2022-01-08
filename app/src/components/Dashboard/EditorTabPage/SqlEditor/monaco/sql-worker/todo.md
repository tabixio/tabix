### Global checker:

- [ ] `AS` list
- [ ] ORDER BY x
- [ ] LIMIT x (OFFSET y)
- [ ] WITH TOTALS
- [ ] CREATE/DROP/ALTER/TRUNCATE...

### ClickHouse special Todo:

- [ ] Локальный ItemProvider, подсовывать fields
- [ ] ORDER BY подсветка
- [ ] Автокомплит на глобавльные keywords
- [ ] SYSTEM FLUSH LOGS
- [ ] Allow completion providers for specific instances
- [ ] Выполнять updateEditorStructure после инициализации данных от сервера
- [ ] Повесить эвент и переиминовывать кнопку -"Выполнить" : tab.buttonTitle = editor.getSelectedText() !== '' ? 'Run
  selected ⌘ + ⏎' : 'Run all ⇧ + ⌘ + ⏎';
- [ ] Подпиться на IModelTokensChangedEvent
- [ ] Определение баз.таблиц в редакторе между запросами ???
- [ ] Модификатор WITH CUBE для GROUP BY (также доступен синтаксис: GROUP BY CUBE(...)).
- [ ] LIMIT n BY columns
- [ ] WITH TOTALS
- [ ] [GLOBAL] ANY|ALL INNER|LEFT JOIN
- [ ] CREATE DATABASE ... IF NOT EXISTS
- [ ] DROP TABLE IF EXISTS
- [ ] ALTER UPDATE
- [ ] TRUNCATE TABLE
- [ ] Добавлен тип данных DECIMAL(digits, scale)
- [ ] Возможность указания смещения для LIMIT n, m в виде LIMIT n OFFSET m
- [ ] Order By COLLATE "LAST" : "FIRST"