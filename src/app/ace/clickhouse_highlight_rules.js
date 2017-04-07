ace.define("ace/mode/clickhouse_highlight_rules", [ "require", "exports", "$rootScope", "module", "ace/lib/oop", "ace/snippets", 'ace/ext/language_tools' ,"ace/mode/text_highlight_rules"], function (require, exports,$rootScope) {
    "use strict";

    let oop = require("../lib/oop");
    let TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;


    let ClickhouseHighlightRules = function () {
        let keywords = (
            "SELECT|CASE|THEN|INSERT|UPDATE|DELETE|WHERE|AND|OR|LIMIT|OFFSET|HAVING|AS|FROM|" +
            "WHEN|ELSE|END|TYPE|LEFT|RIGHT|JOIN|ON|OUTER|DESC|ASC|UNION|CREATE|TABLE|PRIMARY|KEY|" +
            "FOREIGN|NOT|REFERENCES|DEFAULT|NULL|INNER|CROSS|NATURAL|DATABASE|DROP|GRANT|" +
            "ANY|BETWEEN|ATTACH|DETACH|DESCRIBE|OPTIMIZE|PREWHERE|TOTALS|DATABASES|PROCESSLIST|SHOW|IF"
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
        let drawCommand = "DRAW_GMAPS|DRAW_CALENDAR|DRAW_TEXT|DRAW_HEATMAP|DRAW_CHART|DRAW_BAR|DRAW_GRIDCHART|DRAW_RIVER|DRAW_RAW|DRAW_SANKEYS|DRAW_TREEMAP|DRAW_C3|DRAW_MAP";


        let $_fields = [];
        let _keywords = keywords.toLowerCase();
        if (_.isArray(window.global_keywords_fieldsList)) {
            window.global_keywords_fieldsList.forEach(function (v) {
                let p = v['name'].toLowerCase() + '|';
                if (_keywords.indexOf(p) > -1) {
                    // skip fields if == keyword ( like from )
                    return;
                }
                $_fields.push(v['name']);
            });
        }
        // ------------------------------
        let keywordMapper = this.createKeywordMapper({
            "support.function": builtinFunctions,
            "keyword": keywords,
            "constant.language": builtinConstants,
            "storage.type": dataTypes,
            "markup.bold": window.global_keywords_tables,
            "markup.heading": $_fields.join('|')
        }, "identifier", true);


        // https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode

        this.$rules = {
            "start": [
            {
                token: "comment",
                regex: "--.*$",
                caseInsensitive: true
            },
                {
                    token: "comment.block",
                    start: "```",
                    end: "```"
                },
            {
                token: "keyword",
                regex: "GROUP\\W+BY|ORDER\\W+BY|LIMIT\\W+\\d+\\W+BY\\W+"
            },
            {
                token: "variable.language",
                regex : /\$[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
            },
                {
                    token: "variable.other",
                    regex: /@[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
            },
            {
                token: "comment",
                start: "/\\*",
                end: "\\*/"
            },
            {
                token: "string", // " string
                regex: '".*?"'
            },
            {
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
                regex: "[\\(\\{]"
            }, {
                token: "paren.rparen",
                regex: "[\\)\\}]"
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


            if (!window.global_chFunctionsHelp) return false;
            if (!window.global_chFunctionsHelp['functions']) return false;
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
                let lang=window.global_lang;
                if (!lang) lang='ru';
                let help=window.global_chFunctionsHelp['functions'][use];
                let brackets='';
                let desc='';
                if (help['desc'])
                {


                    brackets=help['bracket'];
                    desc=help['desc'][lang];
                    if (!desc) {
                        desc=(help['desc']['en']?help['desc']['en']:help['desc']['ru']);
                    }

                }


                if (desc) desc=desc.replace(/\.\s*/gm, ".<br>");
                body='<span class="ace_doc-header"><b>' + fn + brackets+'</b></span><br><span class="ace_doc-description">' + desc +' </span>';
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
        addCompletions(drawCommand.split('|'), 'draw','draw');
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
            // автодополнение dic таблицы
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
                    iconClass: 'field',
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
