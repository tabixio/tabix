ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"], function(require, exports, module) {
    "use strict";

    var Range = require("ace/range").Range;

    var MatchingBraceOutdent = function() {};

    (function() {

        this.checkOutdent = function(line, input) {
            if (! /^\s+$/.test(line))
                return false;

            return /^\s*\}/.test(input);
        };

        this.autoOutdent = function(doc, row) {
            var line = doc.getLine(row);
            var match = line.match(/^(\s*\})/);

            if (!match) return 0;

            var column = match[1].length;
            var openBracePos = doc.findMatchingBracket({row: row, column: column});

            if (!openBracePos || openBracePos.row == row) return 0;

            var indent = this.$getIndent(doc.getLine(openBracePos.row));
            doc.replace(new Range(row, 0, row, column-1), indent);
        };

        this.$getIndent = function(line) {
            return line.match(/^\s*/)[0];
        };

    }).call(MatchingBraceOutdent.prototype);

    exports.MatchingBraceOutdent = MatchingBraceOutdent;
});


ace.define("ace/mode/clickhouse_FoldMode", ["$rootScope", "require", "exports", "module", "ace/lib/oop",
    "ace/range",'ace/mode/sqlserver','ace/mode/folding/cstyle'], function (require, exports, module) {


    let oop = require("../lib/oop");
    let BaseFoldMode = require("ace/mode/folding/cstyle").FoldMode;
    let Range = require("ace/range").Range;
    let TokenIterator = require("ace/token_iterator").TokenIterator;
    let FoldMode = exports.FoldMode = function () {

    };

    oop.inherits(FoldMode, BaseFoldMode);

    (function () {
        this.foldingRules = "cStyle";

        // this.foldingStartMarker = /\s*(\(\s*SELECT\s*)/mig;
        // this.foldingStartMarker = /\s*SELECT\s*/mig;
        this.foldingStartMarker = /\(|\{/;

        this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
            // let re = this.foldingStartMarker;
            // let line = session.getLine(row);
            // let m = line.match(re);
            // были ли вообще совпадения по ( SELECT
            //if (!m) return;

            // позиционируем TokenIterator на нужную строку
            let iterator = new TokenIterator(session, row, 0);
            //  получаем token
            let token = iterator.getCurrentToken();

            let range=false;
            // if find : ` ( SELECT `
            while (token) {
                let t = token;
                // позиция текущего токена
                let pos = iterator.getCurrentTokenPosition();
                token = iterator.stepForward();
                // если текущий токен скобка а следующий текст и далее SELECT
                if
                (
                 (t.type=='paren.lparen' && ( t.value=='(' ||  t.value=='{' ) )

                )
                {
                   range=session.getBracketRange(pos);
                }
                // Если мы нашли рендж - отлично
                if (range) break;
            }// while
            return range;
        };
    }).call(FoldMode.prototype);
});
