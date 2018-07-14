
ace.define('ace/mode/clickhouse_FoldMode', ['require', 'exports', 'module', 'ace/lib/oop',
    'ace/range','ace/mode/sqlserver','ace/mode/folding/cstyle'], function (require, exports, module) {


    let oop = null;
    let BaseFoldMode = null;
    let Range = null;
    let TokenIterator = null;

    try {
        oop = require('../lib/oop');
        BaseFoldMode = require('ace/mode/folding/cstyle').FoldMode;
        Range = require('ace/range').Range;
        TokenIterator = require('ace/token_iterator').TokenIterator;
    } catch (e) {
        console.warn('ace/mode/clickhouse_FoldMode',e);
    }


    let FoldMode = exports.FoldMode = function () { };

    oop.inherits(FoldMode, BaseFoldMode);

    (function () {
        this.foldingRules = 'cStyle';

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
                if ( (t.type=='paren.lparen' && ( t.value=='(' ||  t.value=='{' ) ) )
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
