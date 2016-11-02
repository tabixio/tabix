var define = window.define || window.ace.define;

define("ace/mode/clickhouse_highlight_rules", ["$rootScope","require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports) {
	"use strict";

	var oop = require("../lib/oop");
	var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;


	var ClickhouseHighlightRules = function() {
		var keywords = (
			"SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|AND|OR|GROUP|BY|ORDER|LIMIT|OFFSET|HAVING|AS|" +
			"WHEN|ELSE|END|TYPE|LEFT|RIGHT|JOIN|ON|OUTER|DESC|ASC|UNION|CREATE|TABLE|PRIMARY|KEY|" +
			"FOREIGN|NOT|REFERENCES|DEFAULT|NULL|INNER|CROSS|NATURAL|DATABASE|DROP|GRANT|" +
			"ANY|ATTACH|DETACH|DESCRIBE|OPTIMIZE|PREWHERE|TOTALS|DATABASES|PROCESSLIST|SHOW|IF"
		);
		var identifier = "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*";
		var keywordsDouble="IF\\W+NOT\\W+EXISTS|IF\\W+EXISTS|FORMAT\\W+JSONCompact|FORMAT\\W+JSONEachRow|FORMAT\\W+TSKV|FORMAT\\W+TabSeparatedWithNames|FORMAT\\W+TabSeparatedWithNamesAndTypes|FORMAT\\W+TabSeparatedRaw|FORMAT\\W+BlockTabSeparated|FORMAT\\W+CSVWithNames|FORMAT\\W+CSV|FORMAT\\W+JSON|FORMAT\\W+TabSeparated";

		var builtinConstants = (
			"true|false"
		);

		var builtinFunctions = (
			"avg|count|first|last|max|min|sum|ucase|lcase|mid|len|round|rank|now|" +
			"coalesce|ifnull|isnull|nvl|countIf|timeSlot|yesterday|today|now|toRelativeSecondNum|" + "toRelativeMinuteNum|toRelativeHourNum|toRelativeDayNum|toRelativeWeekNum|toRelativeMonthNum|" +
			"toRelativeYearNum|toTime|toStartOfHour|toStartOfFiveMinute|toStartOfMinute|toStartOfYear|" +
			"toStartOfQuarter|toStartOfMonth|toMonday|toSecond|toMinute|toHour|toDayOfWeek|toDayOfMonth|" +
			"toMonth|toYear|toFixedString|toStringCutToZero|reinterpretAsString|reinterpretAsDate|" +
			"reinterpretAsDateTime|reinterpretAsFloat32|reinterpretAsFloat64|reinterpretAsInt8|" +
			"reinterpretAsInt16|reinterpretAsInt32|reinterpretAsInt64|reinterpretAsUInt8|" +
			"reinterpretAsUInt16|reinterpretAsUInt32|reinterpretAsUInt64|toUInt8|toUInt16|toUInt32|" +
			"toUInt64|toInt8|toInt16|toInt32|toInt64|toFloat32|toFloat64|toDate|toDateTime|toString|" +
			"bitAnd|bitOr|bitXor|bitNot|bitShiftLeft|bitShiftRight|abs|negate|modulo|intDivOrZero|" +
			"intDiv|divide|multiply|minus|plus|empty|notEmpty|length|lengthUTF8|lower|upper|lowerUTF8|" +
			"upperUTF8|reverse|reverseUTF8|concat|substring|substringUTF8|appendTrailingCharIfAbsent|" +
			"position|positionUTF8|match|extract|extractAll|like|notLike|replaceOne|replaceAll|" +
			"replaceRegexpOne|range|arrayElement|has|indexOf|countEqual|arrayEnumerate|arrayEnumerateUniq|" +
			"arrayJoin|arrayMap|arrayFilter|arrayExists|arrayCount|arrayAll|arrayFirst|arraySum|splitByChar|" +
			"splitByString|alphaTokens|domainWithoutWWW|topLevelDomain|firstSignificantSubdomain|" +
			"cutToFirstSignificantSubdomain|queryString|URLPathHierarchy|URLHierarchy|extractURLParameterNames|" +
			"extractURLParameters|extractURLParameter|queryStringAndFragment|cutWWW|cutQueryString|" +
			"cutFragment|cutQueryStringAndFragment|cutURLParameter|IPv4NumToString|IPv4StringToNum|" +
			"IPv4NumToStringClassC|IPv6NumToString|IPv6StringToNum|rand|rand64|halfMD5|MD5|sipHash64|" +
			"sipHash128|cityHash64|intHash32|intHash64|SHA1|SHA224|SHA256|URLHash|hex|unhex|bitmaskToList|" +
			"bitmaskToArray|floor|ceil|round|roundToExp2|roundDuration|roundAge|regionToCountry|" +
			"regionToContinent|regionToPopulation|regionIn|regionHierarchy|regionToName|OSToRoot|OSIn|" +
			"OSHierarchy|SEToRoot|SEIn|SEHierarchy|dictGetUInt8|dictGetUInt16|dictGetUInt32|" +
			"dictGetUInt64|dictGetInt8|dictGetInt16|dictGetInt32|dictGetInt64|dictGetFloat32|" +
			"dictGetFloat64|dictGetDate|dictGetDateTime|dictGetString|dictGetHierarchy|dictHas|dictIsIn|" +
			"uniq|argMin|argMax|uniqCombined|uniqHLL12|uniqExact|groupArray|groupUniqArray|quantile|" +
			"quantileDeterministic|quantileTiming|quantileTimingWeighted|quantileExact|" +
			"quantileExactWeighted|quantileTDigest|median|quantiles|varSamp|varPop|stddevSamp|stddevPop|" +
			"covarSamp|covarPop|corr|sequenceMatch|sequenceCount|uniqUpTo|countIf|avgIf|" +
			"quantilesTimingIf|argMinIf|uniqArray|sumArray|quantilesTimingArrayIf|uniqArrayIf|medianIf|" +
			"quantilesIf|varSampIf|varPopIf|stddevSampIf|stddevPopIf|covarSampIf|covarPopIf|corrIf|" +
			"uniqArrayIf|sumArrayIf"
		);

		var dataTypes = (
			"int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|" +
			"money|real|number|integer|" +
			"uint8|uint16|uint32|uint64|int8|int16|int32|int64|float32|float64|datetime|enum8|enum16|" +
			"array|tuple|string"
		);

		var keywordMapper = this.createKeywordMapper({
			"support.function": builtinFunctions,
			"keyword": keywords,
			"constant.language": builtinConstants,
			"storage.type": dataTypes,
			"markup.bold":window.global_keywords_tables,
			"markup.heading":window.global_keywords_fields
		}, "identifier", true);


		this.$rules = {
			"start": [{
				token: "comment",
				regex: "--.*$",
				caseInsensitive: true
			},
				{
				token: "comment",
				start: "/\\*",
				end: "\\*/"
			}, {
				token: "string", // " string
				regex: '".*?"'
			},{
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
					regex: /[?:,;.]/,
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

		var completions = [];
		var addCompletions = function(arr, meta) {
			arr.forEach(function(v) {
				completions.push({
					name: v,
					value: v,
					score: 0,
					meta: meta
				});
			});
		};

		addCompletions(builtinFunctions.split('|'), 'function');
		addCompletions(keywords.split('|'), 'keyword');
		addCompletions("FORMAT JSON|FORMAT JSONCompact|FORMAT JSONEachRow|FORMAT TSKV|FORMAT TabSeparated|FORMAT TabSeparatedWithNames|FORMAT TabSeparatedWithNamesAndTypes|FORMAT TabSeparatedRaw|FORMAT BlockTabSeparated|FORMAT CSV|FORMAT CSVWithNames".split('|'), 'keyword');
		addCompletions(dataTypes.split('|'), 'type');
		addCompletions(window.global_keywords_tables.split('|'), 'storage');
		addCompletions(window.global_keywords_fields.split('|'), 'storage');
		//this allows for custom 'meta' and proper case of completions
		this.completions = completions;

	};

	oop.inherits(ClickhouseHighlightRules, TextHighlightRules);
	exports.ClickhouseHighlightRules = ClickhouseHighlightRules;
});

define("ace/mode/clickhouse", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text","ace/token_iterator", "ace/mode/clickhouse_highlight_rules", "ace/range"], function(require, exports) {
	"use strict";

	var oop = require("../lib/oop");
	var TextMode = require("./text").Mode;
	var ClickhouseHighlightRules = require("./clickhouse_highlight_rules").ClickhouseHighlightRules;

	var Mode = function() {

		this.HighlightRules = ClickhouseHighlightRules;
	};
	oop.inherits(Mode, TextMode);

	(function() {

		this.lineCommentStart = "--";
		this.getCompletions = function(state, session) {
			return session.$mode.$highlightRules.completions;
		};

		this.$id = "ace/mode/clickhouse";
// ---------------------------------------------------------------------------
		this.findTokens = function(sql,type,needfirst) {
			sql=sql.replace(/^(\r\n|\n|\r)/gm,"").replace(/(\r\n|\n|\r)$/gm,"");
			var TokenIterator = require("ace/token_iterator").TokenIterator;
			var EditSession = require("ace/edit_session").EditSession;

			var session = new EditSession(sql,this);
			var iterator = new TokenIterator(session, 0, 0);
			var token = iterator.getCurrentToken();
			var matches=[];
			var startRow= 0, startCol=0;

			while (token) {
				var t = token;
				t['row'] = iterator.getCurrentTokenRow();
				t['col'] = iterator.getCurrentTokenColumn();
				if (t.type == type ) {
					matches.push(t);
					if (needfirst)
					{
						t.value=t.value.toLowerCase();
						return t;
					}
				}
				token = iterator.stepForward();
			}//w
			return matches;
		};
		this.splitByTokens = function(sql,type,value) {
			sql=sql.replace(/^(\r\n|\n|\r)/gm,"").replace(/(\r\n|\n|\r)$/gm,"");

			var TokenIterator = require("ace/token_iterator").TokenIterator;
			var EditSession = require("ace/edit_session").EditSession;
			var Range = require("ace/range").Range;

			var session = new EditSession(sql,this);
			var iterator = new TokenIterator(session, 0, 0);
			var token = iterator.getCurrentToken();
			var matches=[];
			var startRow= 0, startCol=0;

			while (token) {
				var t=token;
				t['row']=iterator.getCurrentTokenRow();
				t['col']=iterator.getCurrentTokenColumn();
				if 	( t.type == type && t.value == value)
				{
					//var session = new EditSession(sql,this);
					//session.clearSelection();
					var range1 = new Range(startRow, startCol, t.row, t.col+value.length);
					var text=session.getTextRange(range1);
					startRow= t.row;
					startCol= t.col+value.length;
					text=text.trim().replace(new RegExp("^"+value+"|"+value+'$','g'),"").trim().replace(/^(\r\n|\n|\r)/gm,"").replace(/(\r\n|\n|\r)$/gm,"");
					if (text.length>2)
					{
						matches.push({sql:text,range:range1});
					}
				}
				token = iterator.stepForward();
			}
			var range1 = new Range(startRow, startCol,Number.MAX_VALUE,Number.MAX_VALUE);
			var text=session.getTextRange(range1);
			text=text.trim().replace("^("+value+")","").replace(value+"$","").trim().replace(/^(\r\n|\n|\r)/gm,"").replace(/(\r\n|\n|\r)$/gm,"");
			text=text.replace(new RegExp("^"+value+"|"+value+'$','g'),"").trim().replace(/^(\r\n|\n|\r)/gm,"").replace(/(\r\n|\n|\r)$/gm,"");
			if (text.length>2)
			{

				matches.push({sql:text,range:range1});
			}
			return matches;
		};

	}).call(Mode.prototype);

	exports.Mode = Mode;

});
