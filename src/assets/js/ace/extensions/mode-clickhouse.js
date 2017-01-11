let define = window.define || window.ace.define;


define("ace/mode/clickhouse_FoldMode", ["$rootScope", "require", "exports", "module", "ace/lib/oop",
    "ace/range",'ace/mode/sqlserver','ace/mode/folding/cstyle'], function (require, exports, module) {


    let oop = require("../lib/oop");
    let BaseFoldMode = require("ace/mode/folding/cstyle").FoldMode;
    let Range = require("ace/range").Range;
    let TokenIterator = require("ace/token_iterator").TokenIterator;
    let FoldMode = exports.FoldMode = function () {

    };

    oop.inherits(FoldMode, BaseFoldMode);

    (function () {

        this.foldingStartMarker = /\s*(\(\s*SELECT\s*)/mig;

        this.getFoldWidgetRange = function(session, foldStyle, row) {
            let re = this.foldingStartMarker;
            let line = session.getLine(row);
            let m = line.match(re);
            // были ли вообще совпадения по ( SELECT
            //if (!m) return;

            // позиционируем TokenIterator на нужную строку
            let iterator = new TokenIterator(session, row, 0);
            //  получаем token
            let token = iterator.getCurrentToken();
            // if find : ` ( SELECT `
            while (token) {
                let t = token;
                let range=false;

                // позиция текущего токена
                let pos = iterator.getCurrentTokenPosition();

                token = iterator.stepForward();
                //if (token)
                //{
                //    token2 = iterator.stepForward();
                //}
                // если текущий токен скобка а следующий текст и далее SELECT
                if (t.type=='paren.lparen' && t.value=='(' && token.type)
                {
                    range=session.getBracketRange(pos);
                    //
                    //if (token.type=='keyword' && token.value=='SELECT')
                    // {
                    //     range=session.getBracketRange(pos);
                    // }
                    // else
                    // {
                    //     if  (token.type=='text' && token2.type=='keyword' && token2.value=='SELECT')
                    //     {
                    //         range=session.getBracketRange(pos);
                    //     }
                    // }
                 }
                 // Если мы нашли рендж - отлично
                 if (range) break;
            }// while
            return range;
        };
    }).call(FoldMode.prototype);

});


define("ace/mode/clickhouse_highlight_rules", [ "require", "exports", "$rootScope", "module", "ace/lib/oop", "ace/snippets", 'ace/ext/language_tools' ,"ace/mode/text_highlight_rules"], function (require, exports,$rootScope) {
    "use strict";

    let oop = require("../lib/oop");
    let TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;


    let ClickhouseHighlightRules = function () {
        let keywords = (
            "SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|AND|OR|LIMIT|OFFSET|HAVING|AS|" +
            "WHEN|ELSE|END|TYPE|LEFT|RIGHT|JOIN|ON|OUTER|DESC|ASC|UNION|CREATE|TABLE|PRIMARY|KEY|" +
            "FOREIGN|NOT|REFERENCES|DEFAULT|NULL|INNER|CROSS|NATURAL|DATABASE|DROP|GRANT|" +
            "ANY|ATTACH|DETACH|DESCRIBE|OPTIMIZE|PREWHERE|TOTALS|DATABASES|PROCESSLIST|SHOW|IF"
        );
        // let identifier = "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*";
        let keywordsDouble = "IF\\W+NOT\\W+EXISTS|IF\\W+EXISTS|FORMAT\\W+Vertical|FORMAT\\W+JSONCompact|FORMAT\\W+JSONEachRow|FORMAT\\W+TSKV|FORMAT\\W+TabSeparatedWithNames|FORMAT\\W+TabSeparatedWithNamesAndTypes|FORMAT\\W+TabSeparatedRaw|FORMAT\\W+BlockTabSeparated|FORMAT\\W+CSVWithNames|FORMAT\\W+CSV|FORMAT\\W+JSON|FORMAT\\W+TabSeparated";

        let builtinConstants = (
            "true|false"
        );

        let builtinFunctions = ("sum|sumIf|avg|avgIf");

        let dataTypes = (
            "int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|" +
            "money|real|number|integer|" +
            "uint8|uint16|uint32|uint64|int8|int16|int32|int64|float32|float64|datetime|enum8|enum16|" +
            "array|tuple|string"
        );


        if (window.global_builtinFunctions) {

            // автодополнение builtin Functions
            let builtin=[];
            window.global_builtinFunctions.forEach(function (v) {
                builtin.push(v.name);
            });
            builtinFunctions=builtin.join('|');
        };
                //
        let delit='';
        if (window.global_delimiter)
        {
             delit=new RegExp(window.global_delimiter);
        }
        else{
             delit=new RegExp(';;');
        }
        let drawCommand="DRAW\\W+AREA|DRAW\\W+BAR|DRAW\\W+HEATMAP|DRAW\\W+HISTOGRAM|DRAW\\W+LINE|DRAW\\W+POINT|DRAW\\W+PIVOT";

        let keywordMapper = this.createKeywordMapper({
            "support.function": builtinFunctions,
            "keyword": keywords,
            "constant.language": builtinConstants,
            "storage.type": dataTypes,
            "markup.bold": window.global_keywords_tables,
            "markup.heading": window.global_keywords_fields
        }, "identifier", true);

        this.$rules = {
            "start": [{
                token: "comment",
                regex: "--.*$",
                caseInsensitive: true
            }, {
                token: "keyword",
                regex: "GROUP\\W+BY|ORDER\\W+BY"
            },
                {
                    token: "comment",
                    start: "/\\*",
                    end: "\\*/"
                }, {
                    token: "string", // " string
                    regex: '".*?"'
                }, {
                    token: "storage",
                    regex: keywordsDouble
                },
                {
                    token: "invalid.illegal",
                    regex: drawCommand
                },
                {
                    token: "string", // ' string
                    regex: "'.*?'"
                }, {
                    token: "constant.numeric", // float
                    regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
                }, {
                    token: keywordMapper,
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                },
                {
                    token: "constant.character.escape",
                    regex: delit
                },
                {
                    token: "punctuation",
                    regex: /[?:,;.]/
                },
                {
                    token: "keyword.operator",
                    regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
                }, {
                    token: "paren.lparen",
                    regex: "[\\(]"
                }, {
                    token: "paren.rparen",
                    regex: "[\\)]"
                }, {
                    token: "text",
                    regex: "\\s+"
                }

            ]
        };

        // ------------------------------------------------------------------------------

        this.normalizeRules();

        // ------------------------------------------------------------------------------
        let makeCompletionsDocFunctions = function (fn, origin,comb) {


            let body='<span>';
            let use=fn;

            if (typeof window.global_chFunctionsHelp['functions'][fn] != 'undefined')
            {
                use=fn;
            }
            else
            {
                if (typeof window.global_chFunctionsHelp['functions'][origin] != 'undefined') use=origin;
            }

            if (typeof window.global_chFunctionsHelp['functions'][use] != 'undefined')
            {
                let help=window.global_chFunctionsHelp['functions'][use];
                let brackets='';
                let desc_ru='';
                let desc_en='';
                if (help['desc']['ru'])
                {
                    brackets=help['bracket'];
                    desc_ru=help['desc']['ru'];
                    desc_en=help['desc']['en'];
                }


                if (desc_ru) desc_ru=desc_ru.replace(/\.\s*/gm, ".<br>");
                body='<span class="ace_doc-header"><b>' + fn + brackets+'</b></span><br><span class="ace_doc-description">' + desc_ru +' </span>';
            }
            else {
                body='<span class="ace_doc-header"><b>' + fn + '( ) </b></span><br>' + origin;
            }
            return body+ '<a title="close" class="ace_doc-tooltip-boxclose"></a></span></div>';
        };
        // ------------------------------------------------------------------------------
        let makeCompletionsdocHTML = function (name, meta) {
            return '<div style="padding: 15px 5px 5px 15px"><b>' + name + '</b><br>' + meta + '</div>';
        };
        // ------------------------------------------------------------------------------
        let completions = [];
        let addCompletions = function (arr, meta,icon) {
            arr.forEach(function (v) {


                completions.push({
                    name: v,
                    value: v,
                    score: 0,
                    meta: meta,
                    docHTML: makeCompletionsdocHTML(v, meta),
                    iconClass: icon
                });

            });

        };

        addCompletions(keywords.split('|'), 'keyword','keyword');
        addCompletions("GROUP BY|ORDER BY|FORMAT JSON|FORMAT JSONCompact|FORMAT JSONEachRow|FORMAT TSKV|FORMAT TabSeparated|FORMAT TabSeparatedWithNames|FORMAT TabSeparatedWithNamesAndTypes|FORMAT TabSeparatedRaw|FORMAT BlockTabSeparated|FORMAT CSV|FORMAT CSVWithNames".split('|'), 'keyword','keyword');
        addCompletions("DRAW AREA|DRAW BAR|DRAW HEATMAP|DRAW HISTOGRAM|DRAW LINE|DRAW POINT|DRAW PIVOT".split('|'), 'draw','draw');
        addCompletions(dataTypes.split('|'), 'type','type');
        addCompletions(window.global_keywords_tables.split('|'), '[table]','table');

        // ------------------------------------------------------------------------------
        if (window.global_builtinFunctions) {

            // автодополнение builtin Functions
            window.global_builtinFunctions.forEach(function (v) {

                completions.push({
                    name: v['name'],
                    value: v['name']+'( )',
                    caption: v['name'],
                    score: v['score'],
                    meta: 'function',
                    iconClass:'function',
                    docHTML: makeCompletionsDocFunctions(v['name'], v['origin'],v['comb'])
                });


                });

            }
        // ------------------------------------------------------------------------------
        if (window.global_keywords_dictList) {
            // автодополнение полей таблицы
            window.global_keywords_dictList.forEach(function (v) {
                    completions.push({
                        name: v['dic'],
                        value: v['dic'],
                        caption: v['title'],
                        score: 0,
                        meta: 'dic',
                        iconClass:'dict',
                        docHTML: makeCompletionsdocHTML(v['title'], v['dic'])
                    });


                }
            );
        }
        // ------------------------------------------------------------------------------
        if (window.global_keywords_fieldsList) {

            // автодополнение полей таблицы
            window.global_keywords_fieldsList.forEach(function (v) {

                    let name = v['table'] + '.' + v['name'];
                    let value = v['name'];
                    let meta = "type:" + v['type'] + '<br><br>default_type:' + v['default_type'] + '<br>' + v['default_expression'];

                    completions.push({
                        name: name,
                        // caption: name,
                        value: value,
                        score: 20,
                        meta: v['table'],
                        iconClass:'field',
                        docHTML: makeCompletionsdocHTML(name, meta)
                    });


                }
            );
        }

        //this allows for custom 'meta' and proper case of completions
        this.completions = completions;

    };

    oop.inherits(ClickhouseHighlightRules, TextHighlightRules);
    exports.ClickhouseHighlightRules = ClickhouseHighlightRules;
});

// ------------------------------------------------------------------------------
define("ace/mode/clickhouse", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text",
    "ace/token_iterator",
    "ace/mode/folding",
    "ace/mode/clickhouse_FoldMode",
    "ace/mode/clickhouse_highlight_rules"

], function (require, exports) {
    "use strict";

    let oop = require("../lib/oop");
    let TextMode = require("./text").Mode;
    let ClickhouseHighlightRules = require("./clickhouse_highlight_rules").ClickhouseHighlightRules;
    let ClickhouseFoldMode = require("./clickhouse_FoldMode").FoldMode;
    // let BaseFoldMode = require("ace/mode/folding/cstyle").FoldMode;

    let Mode = function () {
        this.foldingRules = new ClickhouseFoldMode();
        this.HighlightRules = ClickhouseHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function () {

        this.lineCommentStart = "--";
        this.getCompletions = function (state, session) {
            return session.$mode.$highlightRules.completions;
        };

        this.$id = "ace/mode/clickhouse";
        // ---------------------------------------------------------------------------
        this.findTokens = function (sql, type, needfirst) {
            sql = sql.replace(/^(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)$/gm, "");

            let TokenIterator = require("ace/token_iterator").TokenIterator;

            let EditSession = require("ace/edit_session").EditSession;


            let session = new EditSession(sql, this);


            let iterator = new TokenIterator(session, 0, 0);
            let token = iterator.getCurrentToken();
            let matches = [];

            while (token) {
                let t = token;
                t['row'] = iterator.getCurrentTokenRow();
                t['col'] = iterator.getCurrentTokenColumn();
                if (t.type == type) {
                    matches.push(t);
                    if (needfirst) {
                        t.value = t.value.toLowerCase();
                        return t;
                    }
                }
                token = iterator.stepForward();
            }//w
            return matches;
        };
        // ------------------------------------------------------------------------------
        this.trim = function (text , value) {

            text = text.trim().replace(/^(\r\n|\n|\r)/gm, " ").replace(/(\r\n|\n|\r)$/gm, " ");
            if (value!==true &&  typeof value === 'string' && value.length>0)
            {
                text=text.replace("^(" + value + ")", "").replace(value + "$", "");
                text=text.replace(new RegExp("^" + value + "|" + value + '$', 'g'), "");
            }
            text = text.replace(/^(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)$/gm, "");
            return text.trim();
        };

        // ------------------------------------------------------------------------------
        this.splitByTokens = function (sql, type, value) {
            sql = sql.replace(/^(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)$/gm, "");

            let TokenIterator = require("ace/token_iterator").TokenIterator;
            let EditSession = require("ace/edit_session").EditSession;
            let Range = require("ace/range").Range;

            let session = new EditSession(sql, this);

            session.bgTokenizer.start(0);// force rehighlight whole document
            // foreach $rules find type=$type and update value

            let iterator = new TokenIterator(session, 0, 0);

            let token = iterator.getCurrentToken();
            let matches = [];
            let startRow = 0, startCol = 0;
            let trimValue=false;
            let range1, text;
            while (token) {
                let t = token;

                t['row'] = iterator.getCurrentTokenRow();
                t['col'] = iterator.getCurrentTokenColumn();

                if (
                    t.type == type &&
                    (
                        (value!==true && t.value == value )
                        ||
                        value===true
                    )
                )
                {
                    let vl=0;
                    if (value instanceof String) vl=value.length;

                    // bug : col + vl - не корректно, возможен случай смешение строки
                    range1 = new Range(startRow, startCol, t.row, t.col + vl);

                    text = session.getTextRange(range1);

                    startRow = t.row;
                    startCol = t.col + vl;

                    text = this.trim(text,t.value);
                    if (text.length > 2) {

                        if (typeof trimValue === 'string'){
                            text = this.trim(text,trimValue);
                        }

                        matches.push({sql: text, range: range1,keyword:trimValue});

                        trimValue=t.value;
                    }
                }
                token = iterator.stepForward();
            }


            range1 = new Range(startRow, startCol, Number.MAX_VALUE, Number.MAX_VALUE);
            text = session.getTextRange(range1);
            text = this.trim(text,value);

            if (typeof trimValue === 'string'){
                text = this.trim(text,trimValue);
            }


            if (text.length > 2) {

                matches.push({sql: text, range: range1,keyword:trimValue});
            }
            return matches;
        };

    }).call(Mode.prototype);

    exports.Mode = Mode;

});
