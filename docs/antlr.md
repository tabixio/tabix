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
* [Github ClickHouse antlr](https://github.com/ClickHouse/ClickHouse/tree/master/utils/antlr)
* [Mysql grammars](https://github.com/mysql/mysql-workbench/tree/8.0/library/parsers/grammars)
* [Грамматика MySQL на ANTLR 4](https://habr.com/ru/company/pt/blog/339336/)
* [Компилятор на JavaScript с использованием ANTLR](https://habr.com/ru/post/351906/)
* [github:antlr-editor](https://github.com/NicoLaval/antlr-editor)
* [github:DTStack dt-sql-parser](https://github.com/DTStack/dt-sql-parser#readme)
* [github:DTStack monaco-sql-languages](https://github.com/DTStack/monaco-sql-languages)

Other: 



https://betterprogramming.pub/create-a-custom-web-editor-using-typescript-react-antlr-and-monaco-editor-bcfc7554e446

https://tomassetti.me/writing-a-browser-based-editor-using-monaco-and-antlr/

https://segmentfault.com/a/1190000040176753/en

https://blog.nimbleways.com/create-a-custom-web-editor-using-typescript-react-antlr-and-monaco-editor-part-1-2/
