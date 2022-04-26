# Installation

- Download Antrl4 runtime:

```
curl -O http://www.antlr.org/download/antlr-4.9.2-complete.jar
```

- Make an alias to be able to run it:

```
alias antlr4='java -jar {directory_with_antlr}/antlr-4.9.2-complete.jar'
```

- Generate lexer and parser:

```
antlr4 -Dlanguage=JavaScript SqlBase.g4
```
