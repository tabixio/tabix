![Tabix Logo](http://ui.tabix.io/assets/images/logotabix.png)


Tabix - SQL Editor & Open source simple business intelligence for Clickhouse. 

# Advantages

* No need to install, works from the browser
* Supports SQL syntax ClickHouse
* Draws charts, charts or maps of the world

# Capabilities

### Working with Queries - Editor
* Auto-completion of fields, dictionaries and functions
* Tips on fields and functions in Russian and English
* Reformatting queries / autoformat
* Minimizes brackets and subqueries
* Setting the autocompletion / enableLiveAutocompletion
* Backlight brackets
* The list of functions is loaded based on the capabilities of the server
* Displays which query is running


![SQL_Editor](https://tabix.io/anime/SQL_Editor.gif)


### Working with Queries - Tabs
* Renaming
* Attachment


### Database tree and tables

* Display the number of tables at the database
* The icon of the table depends on its engine
* List of fields in the table and inserting the field when clicking in the editor
* DB selection via double click in the tree, pop-up window about selection
* Search in the tree of objects, filtering the tree
* Rebuilding the list of databases / tables after the query is executed DROP / CREATE

![DBView](https://tabix.io/anime/DB_Left_View.gif)


### HotKeys
* [Command | Ctrl] + [Right | Left] toggles the tabs
* Shift-Ctrl- [1 ... 0] switches tabs
* [Command | Ctrl + Shift + Plus | Command | Ctrl + Shift + Minus] - collapse all / expand
* [Command | Ctrl + Shift + F] - Format code


### Viewing processes
* Logging
* KILL QUERY


### Viewing a table
* Request to create a table, via SHOW CREATE TABLE - in the "information"


### Working with the result of the query
* Widgets through gridster rendering, resize move, commit
* handsontable Result table with sorting
* Auto-fit the width of the result table
* HotTable CopyPaste menu
* Table with information about completed requests at the end of the list / Requests in the tab are logged for performance comparison
* HotTable colors / format / heatmaps
* HotTable + Numbro - display the column if the numbers are as human
* HotTable menu: Specify the column format, text / number, the ability to format the number
* HotTable menu: CopyPaste to ReadMine markup
* HotTable menu: Highlight Negative / Positive
* HotTable menu: insert WHERE column = valuse to Clipboard


### Metrics
* Metrics RealTime charts from system.metrics
* system.events + async_metrics

![Metrics](https://tabix.io/anime/Metrics.gif)

### Draw
* DRAW backlight command
* draw as js function result