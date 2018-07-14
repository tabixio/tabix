import { ch_doubleWordKeywords,ch_delimiter} from '../static-clickhouse-highlight';

ace.define('ace/mode/clickhouse_highlight_rules', [ 'require', 'exports', 'module', 'ace/lib/oop', 'ace/snippets', 'ace/ext/language_tools' ,'ace/mode/text_highlight_rules'], function (require, exports) {
    'use strict';
    let oop = require('../lib/oop');
    let TextHighlightRules = require('./text_highlight_rules').TextHighlightRules;

    // help docs
    // https://stackoverflow.com/questions/28767920/dynamically-update-syntax-highlighting-for-the-ace-editor-requirejs
    // https://stackoverflow.com/questions/22166784/dynamically-update-syntax-highlighting-mode-rules-for-the-ace-editor
    // http://qaru.site/questions/1187040/dynamically-update-syntax-highlighting-mode-rules-for-the-ace-editor
    // https://gist.github.com/anonymous/c08f414ac819c1e5531b
    // https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode
    // https://github.com/ajaxorg/ace/blob/master/lib/ace/mode/javascript_highlight_rules.js#L40
    // https://gist.github.com/geakstr/68cc92493feb166271ff


    let ClickhouseHighlightRules = function () {
        const keywordsDouble=ch_doubleWordKeywords.join('|').replace(/\s+/gi,'\\W+');
        const delimiter=new RegExp(ch_delimiter);
        //dynamic keyword Rule for setKeywords
        this.keywordRule = {
            token : 'keywordRule',
            // regex : "\\w+",
            regex: '[a-zA-Z_$\\.][a-zA-Z0-9_$\\.]*\\b',
            onMatch : function() {return 'text';}
        };
        // ----------------------------------------------------------------------------------------------------------------------------------------------
        // base rules
        this.$rules = {
            'start': [
                {
                    token: 'comment',
                    regex: '--.*$',
                    caseInsensitive: true
                },
                {
                    token: 'comment.block',
                    start: '```',
                    end: '```'
                },
                {
                    token: 'keyword',
                    regex: 'GROUP\\W+BY|ON\\W+CLUSTER|ORDER\\W+BY|LIMIT\\W+\\d+\\W*\,\\W*\\d+|LIMIT\\W+\\d+\\W+BY\\W+|LIMIT\\W+\\d+'
                },
                {
                    token: 'variable.language',
                    regex : /\$[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
                },
                {
                    token: 'variable.language',
                    regex: /@[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
                },
                {
                    token: 'variable.language',
                    regex: /\:[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
                },
                {
                    token: 'variable.language',
                    regex: /\{[\w]+(?:\[[\w\]+]|[=\-]>\w+)\}?/
                },
                {
                    token: 'comment',
                    start: '/\\*',
                    end: '\\*/'
                },
                {
                    token: 'constant', // " string
                    regex: '".*?"'
                },
                {
                    token: 'keyword',
                    regex: keywordsDouble
                },
                {
                    token: 'string', // ' string
                    regex: '\'.*?\''
                }, {
                    token: 'constant.numeric', // float
                    regex: '[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b' // @todo:  0xDEADBEEF
                }, {
                    token: 'constant.numeric', // 'inf|nan'
                    regex: 'inf|nan'
                }, {
                    token: 'constant.numeric', // 'inf|nan'
                    regex: '0x[a-fA-F0-9]{8}'
                },
                {
                    token: 'constant.character.escape',
                    regex: delimiter
                },
                {
                    token: 'punctuation',
                    regex: /[?:,;.]/
                },
                {
                    token: 'keyword.operator',
                    regex: '\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|=|\\*'
                }, {
                    token: 'paren.lparen',
                    regex: '[\\(\\{]'
                }, {
                    token: 'paren.rparen',
                    regex: '[\\)\\}]'
                }, {
                    token: 'text',
                    regex: '\\s+'
                }, {
                    token: 'string',
                    start: '"',
                    end: '"',
                    next: [{ token : 'language.escape', regex : /\\[tn"\\]/}]
                },this.keywordRule

            ]
        };
        this.normalizeRules();
        // ----------------------------------------------------------------------------------------------------------------------------------------------
        this.completions=[];

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
                    desc=desc.replace(/\.\s*/gm, '.<br>');
                }
                body='<span class="ace_doc-header"><b>' + fn + brackets+'</b></span><br><span class="ace_doc-description">' + desc +' </span>';

            }
            else {
                body='<span class="ace_doc-header"><b>' + fn + '( ) </b></span><br>' + origin;
            }
            return body+ '<a title="close" class="ace_doc-tooltip-boxclose"></a></span></div>';
        };
        this.makeCompletionsdocHTML = function (name, meta) {
            return '<div style="padding: 15px 5px 5px 15px"><b>' + name + '</b><br>' + meta + '</div>';
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
            let meta = 'type:' + v['type'] + '<br><br>default_type:' + v['default_type'] + '<br>' + v['default_expression'];

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
        // add function to change keywords
        this.setKeywords = function(kwMap) {
            this.keywordRule.onMatch = this.createKeywordMapper(kwMap, 'identifier',true);// (map, defaultToken, ignoreCase, splitChar)
        };
        // ------------------------------------------------------------------------------
        this.addArrayCompletions(ch_doubleWordKeywords, 'keyword','keyword');
    };
    oop.inherits(ClickhouseHighlightRules, TextHighlightRules);
    exports.ClickhouseHighlightRules = ClickhouseHighlightRules;
});
