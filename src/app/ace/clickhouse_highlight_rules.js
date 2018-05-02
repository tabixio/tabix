ace.define("ace/mode/clickhouse_highlight_rules", [ "require", "exports", "$rootScope", "module", "ace/lib/oop", "ace/snippets", 'ace/ext/language_tools' ,"ace/mode/text_highlight_rules"], function (require, exports,$rootScope) {
    "use strict";

    let oop = require("../lib/oop");
    let TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;


    let ClickhouseHighlightRules = function () {
        let keywords = (
            "SELECT|CASE|THEN|DISTINCT|INSERT|UPDATE|DELETE|WHERE|AND|OR|OFFSET|HAVING|AS|FROM|" +
            "WHEN|ELSE|END|TYPE|LEFT|RIGHT|JOIN|ON|OUTER|DESC|ASC|UNION|CREATE|TABLE|PRIMARY|KEY|" +
            "FOREIGN|NOT|REFERENCES|INNER|CROSS|NATURAL|DATABASE|DROP|GRANT|" +
            "ANY|BETWEEN|ATTACH|DETACH|CAST|WITH|BIT_AND|BIT_OR|TO|BIT_XOR|DESCRIBE|OPTIMIZE|PREWHERE|TOTALS|DATABASES|PROCESSLIST|SHOW|IF"
        );
        // let identifier = "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*";
        let keywordsDouble = "INSERT\\W+INTO|RENAME\\WTABLE|IF\\W+NOT\\W+EXISTS|IF\\W+EXISTS|FORMAT\\W+Vertical|FORMAT\\W+JSONCompact|FORMAT\\W+JSONEachRow|FORMAT\\W+TSKV|FORMAT\\W+TabSeparatedWithNames|FORMAT\\W+TabSeparatedWithNamesAndTypes|FORMAT\\W+TabSeparatedRaw|FORMAT\\W+BlockTabSeparated|FORMAT\\W+CSVWithNames|FORMAT\\W+CSV|FORMAT\\W+JSON|FORMAT\\W+TabSeparated";

        let builtinConstants = (
            "true|false|NULL"
        );

        let builtinFunctions = ("sum|sumIf|avg|avgIf");

        let dataTypes = (
            "date|" +
            "integer|" +
            "uint8|uint16|uint32|uint64|int8|int16|int32|int64|float32|float64|datetime|enum8|enum16|" +
            "fixedstring|array|tuple|string"+
            "MergeTree|SummingMergeTree|ReplacingMergeTree|ReplicatedMergeTree|Buffer|ReplicatedCollapsingMergeTree|CollapsingMergeTree|AggregatingMergeTree|Merge|Memory|GraphiteMergeTree|ReplicatedAggregatingMergeTree|ReplicatedSummingMergeTree"
        );

        let CompletionsKeyWords=[
            'IF NOT EXISTS',
            'RENAME TABLE',
            'IF EXISTS',
            'GROUP BY',
            'ORDER BY',
            'UNION ALL',
            // FORM
            'FORMAT JSON',
            'FORMAT JSONCompact',
            'FORMAT JSONEachRow',
            'FORMAT TSV',
            'FORMAT TabSeparated',
            'FORMAT TabSeparatedWithNames',
            'FORMAT TabSeparatedWithNamesAndTypes',
            'FORMAT TabSeparatedRaw',
            'FORMAT BlockTabSeparated',
            'FORMAT TSKV',
            'FORMAT CSV',
            'FORMAT CSVWithNames',
            // SYS
            'SYSTEM RELOAD CONFIG',
            'DROP TEMPORARY TABLE',
            'EXISTS TEMPORARY TABLE',
            'SYSTEM RELOAD DICTIONARY',
            'SYSTEM RELOAD DICTIONARIES',
            'SYSTEM DROP DNS CACHE',
            'SYSTEM SHUTDOWN',
            'SYSTEM KILL',
            'CLEAR COLUMN IN PARTITION'
        ];
        let drawCommand = [
            'DRAW_GMAPS',
            'DRAW_GRAPH',
            'DRAW_PLOTLY',
            'DRAW_CALENDAR',
            'DRAW_TEXT',
            'DRAW_HEATMAP',
            'DRAW_CHART',
            'DRAW_BAR',
            'DRAW_GRIDCHART',
            'DRAW_FLATTREE',
            'DRAW_RIVER',
            'DRAW_RAW',
            'DRAW_SANKEYS',
            'DRAW_TREEMAP',
            'DRAW_C3',
            'DRAW_MAP'
        ];
        let listOfTables="";
        // ------------------------------------------ Init builtin functions ---------------------------------------------
        if (window.aceJSRules && window.aceJSRules.builtinFunctions)
        {
            // автодополнение builtin Functions
            if (window.aceJSRules.builtinFunctions) {

                let builtin=[];
                window.aceJSRules.builtinFunctions.forEach(function (v) {
                    builtin.push(v.name);
                });
                builtinFunctions=builtin.join('|');
            }
            // список всех доступных "баз.табли"
            if (_.isArray(window.aceJSRules.tables)){
                listOfTables=window.aceJSRules.tables.join('|');
            }
        }

        //
        let delit='';
        if (window.global_delimiter)
        {
            delit=new RegExp(window.global_delimiter);
        }
        else{
            delit=new RegExp(';;');
        }

        let $_fields = [];
        let _keywords = keywords.toLowerCase();
        //
        if (window.aceJSRules && _.isArray(window.aceJSRules.fieldsList)) {
            window.aceJSRules.fieldsList.forEach(function (v) {
                let p = v['name'].toLowerCase() + '|';
                if (_keywords.indexOf(p) > -1) {
                    // skip fields if == keyword ( like from )
                    return;
                }
                $_fields.push(v['name']);
            });
        }
        // ----------------------------------------------------------------------------------------------------------------------------------------------
        let keywordMapper = this.createKeywordMapper({
            "support.function": builtinFunctions,
            "keyword": keywords,
            "constant.language": builtinConstants,
            "storage.type": dataTypes,
            "markup.bold": listOfTables,
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
                regex: "GROUP\\W+BY|ON\\W+CLUSTER|ORDER\\W+BY|LIMIT\\W+\\d+\\W*\,\\W*\\d+|LIMIT\\W+\\d+\\W+BY\\W+|LIMIT\\W+\\d+"
            },
            {
                token: "variable.language",
                regex : /\$[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
            },
            {
                token: "variable.language",
                regex: /@[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
            },
            {
                token: "variable.language",
                regex: /\:[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
            },
            {
                token: "variable.language",
                regex: /\{[\w]+(?:\[[\w\]+]|[=\-]>\w+)\}?/
            },
            {
                token: "comment",
                start: "/\\*",
                end: "\\*/"
            },
            {
                token: "constant", // " string
                regex: '".*?"'
            },
            {
                token: "keyword",
                regex: keywordsDouble
            },
            {
                token: "invalid.illegal",
                regex: drawCommand.join('|')
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
        //
        // // ------------------------------------------------------------------------------
        this.completions=[];
        // // ----------------------------------------------------------------------------------------------------------------------------------------------
        this.getCompletions = () =>{
            return this.completions;
        };
        this.addCompletions = function(name,value,caption,score,meta,iconClass,docHTML) {

            this.completions.push({
                name: name,
                value: value,
                caption: caption,
                score: score,
                meta: meta,
                iconClass:iconClass,
                docHTML:docHTML
            });
        };
        this.addCompletionsDictionaries = function(dic) {
            this.addCompletions(
                dic['dic'],
                dic['dic'],
                dic['title'],
                0,
                'dic',
                'dict',
                this.makeCompletionsDocFunctions(dic['title'], dic['dic'])
            );
        };
        this.addCompletionsFunctions = function(func) {
            this.addCompletions(
                func['name'],
                func['name']+'( )',
                func['name']+'( )',
                func['score'],
                'function',
                'function',
                this.makeCompletionsDocFunctions(func['name'], func['origin'],func['comb'])
            );
        };

        this.addCompletionsTableFiled = function(v) {

            let name = v['table'] + '.' + v['name'];
            let value = v['name'];
            let meta = "type:" + v['type'] + '<br><br>default_type:' + v['default_type'] + '<br>' + v['default_expression'];

            this.addCompletions(
                name,
                value,
                value,
                100,
                v['type'],
                'field',
                this.makeCompletionsdocHTML(name, meta)
            );
        };
        this.addArrayCompletions = function (arr,meta,icon) {
            let self=this;
            arr.forEach(function (v) {
                self.addCompletions(v,v,v,0,meta,icon,false);
            });
        };
        // ---------------------------------------------------------------------------------------------------------
        this.setKeywords = function(kwMap) {
            console.log("setKeywords > ",kwMap);
            this.keywordRule.onMatch = this.createKeywordMapper(kwMap, "identifier")
        };
        // ------------------------------------------------------------------------------
        this.makeCompletionsDocFunctions = function (fn, origin,comb) {


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
                let lang='en';
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


                if (desc)
                {
                    desc=desc.replace(/\.\s*/gm, ".<br>");
                }
                body='<span class="ace_doc-header"><b>' + fn + brackets+'</b></span><br><span class="ace_doc-description">' + desc +' </span>';

            }
            else {
                body='<span class="ace_doc-header"><b>' + fn + '( ) </b></span><br>' + origin;
            }
            return body+ '<a title="close" class="ace_doc-tooltip-boxclose"></a></span></div>';
        };
        // // ------------------------------------------------------------------------------
        this.makeCompletionsdocHTML = function (name, meta) {
            return '<div style="padding: 15px 5px 5px 15px"><b>' + name + '</b><br>' + meta + '</div>';
        };
        // ------------------------------------------------------------------------------
        this.addArrayCompletions(keywords.split('|'), 'keyword','keyword');
        this.addArrayCompletions(CompletionsKeyWords, 'keyword','keyword');
        this.addArrayCompletions(drawCommand, 'draw','draw');
        this.addArrayCompletions(dataTypes.split('|'), 'type','type');
    };

    oop.inherits(ClickhouseHighlightRules, TextHighlightRules);
    exports.ClickhouseHighlightRules = ClickhouseHighlightRules;
});
