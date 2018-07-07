
ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(acequire, exports, module) {
    "use strict";

    var oop = acequire("../../lib/oop");
    var Range = acequire("../../range").Range;
    var BaseFoldMode = acequire("./fold_mode").FoldMode;

    var FoldMode = exports.FoldMode = function(commentRegex) {
        if (commentRegex) {
            this.foldingStartMarker = new RegExp(
                this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
            );
            this.foldingStopMarker = new RegExp(
                this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
            );
        }
    };
    oop.inherits(FoldMode, BaseFoldMode);

    (function() {

        this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
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


ace.define("ace/mode/clickhouse_FoldMode", ["require", "exports", "module", "ace/lib/oop",
    "ace/range",'ace/mode/sqlserver','ace/mode/folding/cstyle'], function (require, exports, module) {

    console.info('clickhouse_FoldMode:TRY');

    let oop = null;
    let BaseFoldMode = null;
    let Range = null;
    let TokenIterator = null;

    try {
        oop = require("../lib/oop");
        BaseFoldMode = require("ace/mode/folding/cstyle").FoldMode;
        Range = require("ace/range").Range;
        TokenIterator = require("ace/token_iterator").TokenIterator;
    } catch (e) {
        console.warn('ace/mode/clickhouse_FoldMode',e);
    }


    let FoldMode = exports.FoldMode = function () { };
    console.info('clickhouse_FoldMode:END');

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
