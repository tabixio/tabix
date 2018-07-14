
ace.define('ace/mode/matching_brace_outdent',['require','exports','module','ace/range'], function(require, exports, module) {
    'use strict';
    let Range = require('ace/range').Range;
    let MatchingBraceOutdent = function() {};
    (function() {
        this.checkOutdent = function(line, input) {
            if (! /^\s+$/.test(line))
                return false;
            return /^\s*\}/.test(input);
        };
        this.autoOutdent = function(doc, row) {
            let line = doc.getLine(row);
            let match = line.match(/^(\s*\})/);
            if (!match) return 0;
            let column = match[1].length;
            let openBracePos = doc.findMatchingBracket({row: row, column: column});
            if (!openBracePos || openBracePos.row == row) return 0;
            let indent = this.$getIndent(doc.getLine(openBracePos.row));
            doc.replace(new Range(row, 0, row, column-1), indent);
        };
        this.$getIndent = function(line) {
            return line.match(/^\s*/)[0];
        };
    }).call(MatchingBraceOutdent.prototype);
    exports.MatchingBraceOutdent = MatchingBraceOutdent;
});

