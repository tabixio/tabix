
define("ace/mode/clickhouse_highlight_rules", [ "require", "exports", "$rootScope", "module", "ace/lib/oop", "ace/snippets", 'ace/ext/language_tools' ,"ace/mode/text_highlight_rules"], function (require, exports,$rootScope) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;


    var ClickhouseHighlightRules = function () {
        var keywords = (
            "SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|AND|OR|LIMIT|OFFSET|HAVING|AS|" +
            "WHEN|ELSE|END|TYPE|LEFT|RIGHT|JOIN|ON|OUTER|DESC|ASC|UNION|CREATE|TABLE|PRIMARY|KEY|" +
            "FOREIGN|NOT|REFERENCES|DEFAULT|NULL|INNER|CROSS|NATURAL|DATABASE|DROP|GRANT|" +
            "ANY|ATTACH|DETACH|DESCRIBE|OPTIMIZE|PREWHERE|TOTALS|DATABASES|PROCESSLIST|SHOW|IF"
        );
        // var identifier = "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*";
        var keywordsDouble = "IF\\W+NOT\\W+EXISTS|IF\\W+EXISTS|FORMAT\\W+Vertical|FORMAT\\W+JSONCompact|FORMAT\\W+JSONEachRow|FORMAT\\W+TSKV|FORMAT\\W+TabSeparatedWithNames|FORMAT\\W+TabSeparatedWithNamesAndTypes|FORMAT\\W+TabSeparatedRaw|FORMAT\\W+BlockTabSeparated|FORMAT\\W+CSVWithNames|FORMAT\\W+CSV|FORMAT\\W+JSON|FORMAT\\W+TabSeparated";

        var builtinConstants = (
            "true|false"
        );

        var builtinFunctions = ("sum|sumIf|avg|avgIf");

        var dataTypes = (
            "int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|" +
            "money|real|number|integer|" +
            "uint8|uint16|uint32|uint64|int8|int16|int32|int64|float32|float64|datetime|enum8|enum16|" +
            "array|tuple|string"
        );


        if (window.global_builtinFunctions) {

            // автодополнение builtin Functions
            var builtin=[];
            window.global_builtinFunctions.forEach(function (v) {
                builtin.push(v.name);
            });
            builtinFunctions=builtin.join('|');
        };
        //
        var delit='';
        if (window.global_delimiter)
        {
            delit=new RegExp(window.global_delimiter);
        }
        else{
            delit=new RegExp(';;');
        }
        var drawCommand="DRAW\\W+AREA|DRAW\\W+BAR|DRAW\\W+HEATMAP|DRAW\\W+HISTOGRAM|DRAW\\W+LINE|DRAW\\W+POINT|DRAW\\W+PIVOT";

        var keywordMapper = this.createKeywordMapper({
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
        var makeCompletionsDocFunctions = function (fn, origin,comb) {


            var body='<span>';
            var use=fn;

            if (window.global_chFunctionsHelp && typeof window.global_chFunctionsHelp['functions'][fn] != 'undefined')
            {
                use=fn;
            }
            else
            {
                if (window.global_chFunctionsHelp && typeof window.global_chFunctionsHelp['functions'][origin] != 'undefined') use=origin;
            }

            if (window.global_chFunctionsHelp && typeof window.global_chFunctionsHelp['functions'][use] != 'undefined')
            {
                var help=window.global_chFunctionsHelp['functions'][use];
                var brackets='';
                var desc_ru='';
                var desc_en='';
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
        var makeCompletionsdocHTML = function (name, meta) {
            return '<div style="padding: 15px 5px 5px 15px"><b>' + name + '</b><br>' + meta + '</div>';
        };
        // ------------------------------------------------------------------------------
        var completions = [];
        var addCompletions = function (arr, meta,icon) {
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

                    var name = v['table'] + '.' + v['name'];
                    var value = v['name'];
                    var meta = "type:" + v['type'] + '<br><br>default_type:' + v['default_type'] + '<br>' + v['default_expression'];

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
