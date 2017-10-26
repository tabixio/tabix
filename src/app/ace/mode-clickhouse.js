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

    let Mode = function () {

        this.foldingRules = new ClickhouseFoldMode();
        this.$outdent = new MatchingBraceOutdent();
        this.$behaviour = new CstyleBehaviour();
        this.HighlightRules = ClickhouseHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function () {
        this.lineCommentStart = "--";

        this.getHighlightRule = () => {
            return this.session.$mode.$highlightRules;

        };

        this.getCompletions = function (state, session,pos, prefix) {
            // return this.$completer.getCompletions(state, session, pos, prefix);
            // editor.session.$mode.$highlightRules.setKeywords({"keyword": "foo|bar|baz"})
            return session.$mode.$highlightRules.completions;
        };
        this.$id = "ace/mode/clickhouse";
        // ---------------------------------------------------------------------------
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


            // text = text.trim().replace(/^(\r\n|\n|\r)/gm, " ").replace(/(\r\n|\n|\r)$/gm, " ");
            if (value!==true &&  typeof value === 'string' && value.length>0)
            {
                text=text.replace("^(" + value + ")", "  ").replace(value + "$", "  ");
                text=text.replace(new RegExp("^" + value + "|" + value + '$', 'g'), "  ");
            }
            // text = text.replace(/^(\r\n|\n|\r)/gm, "  ").replace(/(\r\n|\n|\r)$/gm, "  ");
            return text;
            // return text.trim();

            // return text;
        };
        // ------------------------------------------------------------------------------
        this.collapseAll = function (session) {

            let e=session;
            let foldWidgets = e.foldWidgets;
            let endRow =  e.getLength();
            let startRow = 0;

            for (let row = startRow; row < endRow; row++) {
                if (foldWidgets[row] == null)
                    foldWidgets[row] = e.getFoldWidget(row);

                if (foldWidgets[row] != "start") continue;
                let range = e.getFoldWidgetRange(row);
                if (range
                    && range.end.row <= endRow
                    && range.start.row >= startRow
                ) {
                    row = range.end.row;
                    try {
                        // addFold can change the range
                        let fold = e.addFold("...", range);
                        if (fold)
                            fold.collapseChildren = depth;
                    } catch(e) {
                    }
                }
            }
        };

        this.replaceVars = function (sql,vars) {

            let replaced_vars={};


            let tokens=this.fetchTokens(sql);
            console.warn("Find tokens",tokens,vars);

            if (tokens.vars.length>0) {
                // find $vars


                for (let i in tokens.vars)
                {

                    let v=tokens.vars[i];
                    let origin=v;
                    // replace { }
                    // replace $ | @ | :

                    if (v.indexOf("{")>-1) {
                        v=v.replace('{','').replace('}','');
                    } else {
                        v=v.replace('$','').replace('@','').replace(':','');
                    }
                    for (let x in vars)
                    {
                        let vv=vars[x];
                        if (vv.name.toLowerCase()==v.toLowerCase()) {
                            // @todo : need use type
                            console.info(vv.name.toLowerCase(),'==',v.toLowerCase());
                            sql=sql.replace(origin,vv.value);
                        }

                    }
                }
            }

            return {
                sql:sql,
                tokens:tokens,
                vars:replaced_vars,

            };

        };

        // this.fetchTokensParts = function (sql,token) {
        //     let TokenIterator = require("ace/token_iterator").TokenIterator;
        //     let EditSession = require("ace/edit_session").EditSession;
        //     let session = new EditSession(sql, this);
        //     session.bgTokenizer.start(0);// force rehighlight whole document
        //     let iterator = new TokenIterator(session, token.row, token.col);
        //     let token = iterator.getCurrentToken();
        //
        //
        //
        //     return false;
        //
        // };

        this.fetchTokens = function (sql) {
            let results={
                groupby:[],
                where:[],
                vars:[],
                limit:-1
            };

            // получить список VARS_REPLACE = $var_xxx
            // получить список VARS_MARK    = @file
            // получить список GROUP BY последнего
            // кол-во в limit
            // where (ключи)

            let TokenIterator = require("ace/token_iterator").TokenIterator;
            let EditSession = require("ace/edit_session").EditSession;
            let session = new EditSession(sql, this);

            session.bgTokenizer.start(0);// force rehighlight whole document
            let iterator = new TokenIterator(session, 0, 0);
            let token = iterator.getCurrentToken();
            // let matches = [];
            // let startRow = 0, startCol = 0;
            // let trimValue=false;
            // let range1, text;

            // token: Object {type: "keyword", value: "GROUP BY", row: 10, col: 0}
            // token: Object {type: "text", value: " ", row: 10, col: 8}
            // token: Object {type: "markup.heading", value: "click_status_old", row: 10, col: 9}

            // {type: "variable.language", value: "$prp", row: 1, col: 6}

            // token: {type: "keyword", value: "limit 4,3"
            //     token: {type: "keyword", value: "limit 4",
            //         token: {type: "keyword", value: "limit 4 , 31", row: 1, col: 0}
            while (token) {
                let t = token;
                t['row'] = iterator.getCurrentTokenRow();
                t['col'] = iterator.getCurrentTokenColumn();
                if (t.type=='variable.language' && (t.value))
                {
                    results.vars.push(t.value);
                }
                if (t.type=='keyword' && (t.value.toLowerCase().includes('limit')!==false))
                {
                    let r = t.value.toLowerCase().match(/LIMIT\W+(\d+)\W*\,\W*(\d+)/i);
                    if (!r) r = t.value.toLowerCase().match(/LIMIT\W+(\d+)/i);
                    if (r[0] && r[1] && r[2])
                    {
                        results.limit={from:r[1],to:r[2]};
                    } else if (r[0] && r[1])
                    {
                        results.limit={from:r[1],to:false};
                    }

                }
                // if (t.type=='keyword' && t.value.toLowerCase()=='where')
                // {
                //     // ------ WHERE ---------
                //     results.where=this.fetchTokensParts(sql,t);
                // }
                // if (t.type=='keyword' && t.value.toLowerCase()=='group by')
                // {
                //     // ------ GROUP BY ---------
                //     results.groupby=this.fetchTokensParts(sql,t);
                // }
                // console.log("token:",t);
                token = iterator.stepForward();
            }
            console.info("Parse & Find tokens result",results);
            return results;

        };
        this.splitByTokens = function (sql, type, value) {
            // console.warn("splitByTokens,",type,value,sql);

            // sql = this.trim(sql,';;');
            // sql = this.trim(sql,';');

            let TokenIterator = require("ace/token_iterator").TokenIterator;
            let EditSession = require("ace/edit_session").EditSession;
            let Range = require("ace/range").Range;

            // console.info("SQL:",sql);

            let session = new EditSession(sql, this);

            session.bgTokenizer.start(0);// force rehighlight whole document

            let iterator = new TokenIterator(session, 0, 0); // initialRow + initialColumn
            let token = iterator.getCurrentToken();

            if (_.isUndefined(token))
            {
                let line=0;
                do
                {
                    line++;
                    iterator = new TokenIterator(session, line, 0); // initialRow + initialColumn
                    token = iterator.getCurrentToken();

                }  while (line < 100 && !token);

            }

            let matches = [];
            let startRow = 0, startCol = 0;
            let trimValue=false;
            let range1, text;

            // console.log("splitByTokens [2]",type,value,token);

            while (token) {
                let t = token;

                t['row'] = iterator.getCurrentTokenRow();
                t['col'] = iterator.getCurrentTokenColumn();
                // console.log("token:",t);
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
