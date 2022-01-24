## ClickHouse & Antlr

* Install [JAVA openjdk11](https://adoptopenjdk.net/archive.html?variant=openjdk11&jvmVariant=hotspot)
* Check `java --version`
* Update files antlr
* [ClickHouse grammar-fuzzer](https://github.com/ClickHouse/ClickHouse/tree/master/utils/grammar-fuzzer)

```shell
# 
# Update files from https://github.com/ClickHouse/ClickHouse/tree/master/utils/antlr
cd grammar/clickhouse
wget https://raw.githubusercontent.com/ClickHouse/ClickHouse/master/utils/antlr/ClickHouseLexer.g4
wget https://raw.githubusercontent.com/ClickHouse/ClickHouse/master/utils/antlr/ClickHouseParser.g4
```

* Run build TS `yarn antlr`
* Move files from `grammar/clickhouse` to `app/src/grammar/clickhouse`
* git add new

## Links

* [How to parse a Clickhouse-SQL statement using ANTRL4?](https://stackoverflow.com/questions/68687065/how-to-parse-a-clickhouse-sql-statement-using-antrl4)
* [Github ClickHouse antlr](https://github.com/ClickHouse/ClickHouse/tree/master/utils/antlr)
* [Mysql grammars](https://github.com/mysql/mysql-workbench/tree/8.0/library/parsers/grammars)
* [mysql Oracle](https://github.com/antlr/grammars-v4/tree/master/sql/mysql/Oracle)
* [mysql Positive Technologies](https://github.com/antlr/grammars-v4/tree/master/sql/mysql/Positive-Technologies)
* [Грамматика MySQL на ANTLR 4](https://habr.com/ru/company/pt/blog/339336/)
* [Компилятор на JavaScript с использованием ANTLR](https://habr.com/ru/post/351906/)
* [github:antlr-editor](https://github.com/NicoLaval/antlr-editor)
* [github:DTStack dt-sql-parser](https://github.com/DTStack/dt-sql-parser#readme)
* [github:DTStack monaco-sql-languages](https://github.com/DTStack/monaco-sql-languages)
* [MonacoEditorTWX](https://github.com/ptc-iot-sharing/MonacoEditorTWX)

## Antlr

* [antlr4 TS SQL](https://github.com/modeldba/antlr4ts-sql)
* [cube js SqlParser](https://github.com/cube-js/cube.js/blob/master/packages/cubejs-schema-compiler/src/parser/SqlParser.ts)
* [ts-mysql-parser](https://github.com/stevenmiller888/ts-mysql-parser/blob/master/src/listeners/lexer-error-listener.ts)
* [Rhombic](https://github.com/contiamo/rhombic)

Other:

[antlr-and-monaco-editor](https://betterprogramming.pub/create-a-custom-web-editor-using-typescript-react-antlr-and-monaco-editor-bcfc7554e446)

[writing-a-browser-based-editor-using-monaco-and-antlr](https://tomassetti.me/writing-a-browser-based-editor-using-monaco-and-antlr/)

https://blog.nimbleways.com/create-a-custom-web-editor-using-typescript-react-antlr-and-monaco-editor-part-1-2/

[azure sql/syntaxes](https://github.com/microsoft/azuredatastudio/tree/main/extensions/sql/syntaxes)

https://github.com/microsoft/vscode/tree/main/extensions/sql

https://github.com/microsoft/vscode-mssql/blob/main/syntaxes/SQL.plist

https://github.com/ultram4rine/sqltools-clickhouse-driver/blob/master/src/ls/driver.ts

https://github.com/ultram4rine/sqltools-clickhouse-driver/blob/master/src/ls/keywords.ts

https://github.com/mtxr/vscode-sqltools/tree/dev/packages

https://github.com/joe-re/sql-language-server

https://mono.software/2017/04/11/custom-intellisense-with-monaco-editor/

https://github.com/raycursive/monaco-sql-parser

https://github.com/DiscoverForever/monaco-sqlpad/blob/master/src/core/snippets.js

https://github.com/DTStack/molecule

https://github.com/antlr/grammars-v4/blob/master/sql/mysql/Positive-Technologies/MySqlLexer.g4

## Themes

https://bitwiser.in/monaco-themes/

https://github.com/brijeshb42/monaco-themes/tree/master/themes

https://github.com/Microsoft/vscode/blob/master/src/vs/editor/standalone/common/themes.ts#L13

[registerFoldingProvider](https://github.com/Microsoft/vscode/blob/master/extensions/sql/syntaxes/sql.tmLanguage.json)
[Highlighting](https://code.visualstudio.com/blogs/2017/02/08/syntax-highlighting-optimizations)

```
//    
// Optimizations in Syntax



// https://www.snip2code.com/Snippet/3196855/Example-of-a-completion-provider-for-ngx/

    // https://github.com/contiamo/rhombic
    // https://github.com/elastic/kibana
    // https://github.com/adelsz/pgtyped
    // https://github.com/segmentio/ts-mysql-plugin
    // [Unfinished multiline comment | Unfinished ...] 
    // 



```