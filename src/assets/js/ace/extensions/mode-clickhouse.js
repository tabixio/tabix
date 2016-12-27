var define = window.define || window.ace.define;


define("ace/mode/clickhouse_FoldMode", ["$rootScope", "require", "exports", "module", "ace/lib/oop",
    "ace/range",'ace/mode/sqlserver','ace/mode/folding/cstyle'], function (require, exports, module) {

    console.warn('YYYYPII!!!');

    var oop = require("../lib/oop");
    var BaseFoldMode = require("ace/mode/folding/cstyle").FoldMode;
    var Range = require("ace/range").Range;

    var FoldMode = exports.FoldMode = function () {

    };

    oop.inherits(FoldMode, BaseFoldMode);

    (function () {


        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
        this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
        this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
        this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
        this._getFoldWidgetBase = this.getFoldWidget;
        this.getFoldWidget = function(session, foldStyle, row) {
            var line = session.getLine(row);

            if (this.singleLineBlockCommentRe.test(line)) {
                if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                    return "";
            }

            var fw = this._getFoldWidgetBase(session, foldStyle, row);

            if (!fw && this.startRegionRe.test(line))
                return "start"; // lineCommentRegionStart

            return fw;
        };

        this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
            var line = session.getLine(row);

            if (this.startRegionRe.test(line))
                return this.getCommentRegionBlock(session, line, row);

            var match = line.match(this.foldingStartMarker);
            if (match) {
                var i = match.index;

                if (match[1])
                    return this.openingBracketBlock(session, match[1], row, i);

                var range = session.getCommentFoldRange(row, i + match[0].length, 1);

                if (range && !range.isMultiLine()) {
                    if (forceMultiline) {
                        range = this.getSectionRange(session, row);
                    } else if (foldStyle != "all")
                        range = null;
                }

                return range;
            }

            if (foldStyle === "markbegin")
                return;

            var match = line.match(this.foldingStopMarker);
            if (match) {
                var i = match.index + match[0].length;

                if (match[1])
                    return this.closingBracketBlock(session, match[1], row, i);

                return session.getCommentFoldRange(row, i, -1);
            }
        };

        this.getSectionRange = function(session, row) {
            var line = session.getLine(row);
            var startIndent = line.search(/\S/);
            var startRow = row;
            var startColumn = line.length;
            row = row + 1;
            var endRow = row;
            var maxRow = session.getLength();
            while (++row < maxRow) {
                line = session.getLine(row);
                var indent = line.search(/\S/);
                if (indent === -1)
                    continue;
                if  (startIndent > indent)
                    break;
                var subRange = this.getFoldWidgetRange(session, "all", row);

                if (subRange) {
                    if (subRange.start.row <= startRow) {
                        break;
                    } else if (subRange.isMultiLine()) {
                        row = subRange.end.row;
                    } else if (startIndent == indent) {
                        break;
                    }
                }
                endRow = row;
            }

            return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
        };
        this.getCommentRegionBlock = function(session, line, row) {
            var startColumn = line.search(/\s*$/);
            var maxRow = session.getLength();
            var startRow = row;

            var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
            var depth = 1;
            while (++row < maxRow) {
                line = session.getLine(row);
                var m = re.exec(line);
                if (!m) continue;
                if (m[1]) depth--;
                else depth++;

                if (!depth) break;
            }

            var endRow = row;
            if (endRow > startRow) {
                return new Range(startRow, startColumn, endRow, line.length);
            }
        };

    }).call(FoldMode.prototype);

});


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
                }, {
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
                    regex: /;{2}/
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
        this.normalizeRules();
        var makeCompletionsDocFunctions = function (fn, origin,comb) {


            var body='<div style="padding: 15px 5px 5px 15px">';
            var use=fn;

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
                var help=window.global_chFunctionsHelp['functions'][use];
                var brackets='';
                var desc_ru='';
                var desc_en='';
                if (help['ru'])
                {
                    brackets=help['bracket'];
                    desc_ru=help['ru'];
                    desc_en=help['en'];
                }
                else
                {
                    brackets=help[0];
                    desc_ru=help[1];
                    desc_en=help[2];
                }

                if (desc_ru) desc_ru=desc_ru.replace(/\.\s*/gm, ".<br>");
                body='<b>' + fn + brackets+'</b><br>' + desc_ru;
            }
            else {
                body='<b>' + fn + '( ) </b><br>' + origin;
            }
            return body+ '</div>';


        };
        var makeCompletionsdocHTML = function (name, meta) {

            return '<div style="padding: 15px 5px 5px 15px"><b>' + name + '</b><br>' + meta + '</div>';


        };

        var completions = [];
        var addCompletions = function (arr, meta) {
            arr.forEach(function (v) {


                completions.push({
                    name: v,
                    value: v,
                    score: 0,
                    meta: meta,
                    docHTML: makeCompletionsdocHTML(v, meta),
                    iconClass: 'f'
                });

            });

        };




        // addCompletions(builtinFunctions.split('|'), 'function');
        addCompletions(keywords.split('|'), 'keyword');
        addCompletions("GROUP BY|ORDER BY|FORMAT JSON|FORMAT JSONCompact|FORMAT JSONEachRow|FORMAT TSKV|FORMAT TabSeparated|FORMAT TabSeparatedWithNames|FORMAT TabSeparatedWithNamesAndTypes|FORMAT TabSeparatedRaw|FORMAT BlockTabSeparated|FORMAT CSV|FORMAT CSVWithNames".split('|'), 'keyword');
        addCompletions(dataTypes.split('|'), 'type');
        addCompletions(window.global_keywords_tables.split('|'), '[table]');


        if (window.global_builtinFunctions) {

            // автодополнение builtin Functions
            window.global_builtinFunctions.forEach(function (v) {

                completions.push({
                    name: v['name'],
                    value: v['name']+'( )',
                    caption: v['name'],
                    score: v['score'],
                    meta: 'function',
                    docHTML: makeCompletionsDocFunctions(v['name'], v['origin'],v['comb'])
                });


                });

            }

        if (window.global_keywords_dictList) {
            // автодополнение полей таблицы
            window.global_keywords_dictList.forEach(function (v) {
                    completions.push({
                        name: v['dic'],
                        value: v['dic'],
                        caption: v['title'],
                        score: 0,
                        meta: 'dic',
                        docHTML: makeCompletionsdocHTML(v['title'], v['dic'])
                    });


                }
            );
        }
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


define("ace/mode/clickhouse", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text",
    "ace/token_iterator",
    "ace/mode/folding",
    "ace/mode/clickhouse_FoldMode",
    "ace/mode/clickhouse_highlight_rules"

], function (require, exports) {
    "use strict";

    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var ClickhouseHighlightRules = require("./clickhouse_highlight_rules").ClickhouseHighlightRules;
    //var ClickhouseFoldMode = require("./clickhouse_FoldMode").FoldMode;
    var BaseFoldMode = require("ace/mode/folding/cstyle").FoldMode;

    var Mode = function () {
        this.foldingRules = new BaseFoldMode();
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

            var TokenIterator = require("ace/token_iterator").TokenIterator;

            var EditSession = require("ace/edit_session").EditSession;


            var session = new EditSession(sql, this);


            var iterator = new TokenIterator(session, 0, 0);
            var token = iterator.getCurrentToken();
            var matches = [];

            while (token) {
                var t = token;
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
        this.splitByTokens = function (sql, type, value) {
            sql = sql.replace(/^(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)$/gm, "");


            console.info('splitByTokens:' + value);

            var TokenIterator = require("ace/token_iterator").TokenIterator;
            var EditSession = require("ace/edit_session").EditSession;
            var Range = require("ace/range").Range;

            var session = new EditSession(sql, this);


            session.bgTokenizer.start(0);// force rehighlight whole document

            // foreach $rules find type=$type and update value
            console.log(session.$mode.$highlightRules.$rules);

            var iterator = new TokenIterator(session, 0, 0);


            var token = iterator.getCurrentToken();
            var matches = [];
            var startRow = 0, startCol = 0;

            var range1, text;
            while (token) {
                var t = token;
                t['row'] = iterator.getCurrentTokenRow();
                t['col'] = iterator.getCurrentTokenColumn();
                if (t.type == type && t.value == value) {
                    //var session = new EditSession(sql,this);
                    //session.clearSelection();
                    range1 = new Range(startRow, startCol, t.row, t.col + value.length);
                    text = session.getTextRange(range1);
                    startRow = t.row;
                    startCol = t.col + value.length;
                    text = text.trim().replace(new RegExp("^" + value + "|" + value + '$', 'g'), "").trim().replace(/^(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)$/gm, "");
                    if (text.length > 2) {
                        matches.push({sql: text, range: range1});
                    }
                }
                token = iterator.stepForward();
            }


            range1 = new Range(startRow, startCol, Number.MAX_VALUE, Number.MAX_VALUE);
            text = session.getTextRange(range1);

            text = text.trim().replace("^(" + value + ")", "").replace(value + "$", "").trim().replace(/^(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)$/gm, "");
            text = text.replace(new RegExp("^" + value + "|" + value + '$', 'g'), "").trim().replace(/^(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)$/gm, "");
            if (text.length > 2) {

                matches.push({sql: text, range: range1});
            }
            return matches;
        };

    }).call(Mode.prototype);

    exports.Mode = Mode;

});
