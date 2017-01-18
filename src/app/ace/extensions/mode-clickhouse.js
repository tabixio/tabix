// ------------------------------------------------------------------------------
ace.define("ace/mode/clickhouse", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text",
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
    let MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
    let CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
    // var CStyleFoldMode = require("./folding/cstyle").FoldMode;

    // let BaseFoldMode = require("ace/mode/folding/cstyle").FoldMode;

    let Mode = function () {

        this.foldingRules = new ClickhouseFoldMode();
        this.$outdent = new MatchingBraceOutdent();
        this.$behaviour = new CstyleBehaviour();

        // this.foldingRules = new CStyleFoldMode();
        this.HighlightRules = ClickhouseHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function () {

        this.lineCommentStart = "--";

        this.getCompletions = function (state, session,pos, prefix) {
            // return this.$completer.getCompletions(state, session, pos, prefix);
            return session.$mode.$highlightRules.completions;
        };

        this.$id = "ace/mode/clickhouse";


        this.checkOutdent = function(state, line, input) {
            return this.$outdent.checkOutdent(line, input);
        };

        this.autoOutdent = function(state, doc, row) {
            this.$outdent.autoOutdent(doc, row);
        };

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
