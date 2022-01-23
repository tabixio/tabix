// Generated from grammar/clickhouse/ClickHouseParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ClickHouseParserListener } from "./ClickHouseParserListener";
import { ClickHouseParserVisitor } from "./ClickHouseParserVisitor";


export class ClickHouseParser extends Parser {
	public static readonly ADD = 1;
	public static readonly AFTER = 2;
	public static readonly ALIAS = 3;
	public static readonly ALL = 4;
	public static readonly ALTER = 5;
	public static readonly AND = 6;
	public static readonly ANTI = 7;
	public static readonly ANY = 8;
	public static readonly ARRAY = 9;
	public static readonly AS = 10;
	public static readonly ASCENDING = 11;
	public static readonly ASOF = 12;
	public static readonly AST = 13;
	public static readonly ASYNC = 14;
	public static readonly ATTACH = 15;
	public static readonly BETWEEN = 16;
	public static readonly BOTH = 17;
	public static readonly BY = 18;
	public static readonly CASE = 19;
	public static readonly CAST = 20;
	public static readonly CHECK = 21;
	public static readonly CLEAR = 22;
	public static readonly CLUSTER = 23;
	public static readonly CODEC = 24;
	public static readonly COLLATE = 25;
	public static readonly COLUMN = 26;
	public static readonly COMMENT = 27;
	public static readonly CONSTRAINT = 28;
	public static readonly CREATE = 29;
	public static readonly CROSS = 30;
	public static readonly CUBE = 31;
	public static readonly CURRENT = 32;
	public static readonly DATABASE = 33;
	public static readonly DATABASES = 34;
	public static readonly DATE = 35;
	public static readonly DAY = 36;
	public static readonly DEDUPLICATE = 37;
	public static readonly DEFAULT = 38;
	public static readonly DELAY = 39;
	public static readonly DELETE = 40;
	public static readonly DESC = 41;
	public static readonly DESCENDING = 42;
	public static readonly DESCRIBE = 43;
	public static readonly DETACH = 44;
	public static readonly DICTIONARIES = 45;
	public static readonly DICTIONARY = 46;
	public static readonly DISK = 47;
	public static readonly DISTINCT = 48;
	public static readonly DISTRIBUTED = 49;
	public static readonly DROP = 50;
	public static readonly ELSE = 51;
	public static readonly END = 52;
	public static readonly ENGINE = 53;
	public static readonly EVENTS = 54;
	public static readonly EXISTS = 55;
	public static readonly EXPLAIN = 56;
	public static readonly EXPRESSION = 57;
	public static readonly EXTRACT = 58;
	public static readonly FETCHES = 59;
	public static readonly FINAL = 60;
	public static readonly FIRST = 61;
	public static readonly FLUSH = 62;
	public static readonly FOLLOWING = 63;
	public static readonly FOR = 64;
	public static readonly FORMAT = 65;
	public static readonly FREEZE = 66;
	public static readonly FROM = 67;
	public static readonly FULL = 68;
	public static readonly FUNCTION = 69;
	public static readonly GLOBAL = 70;
	public static readonly GRANULARITY = 71;
	public static readonly GROUP = 72;
	public static readonly HAVING = 73;
	public static readonly HIERARCHICAL = 74;
	public static readonly HOUR = 75;
	public static readonly ID = 76;
	public static readonly IF = 77;
	public static readonly ILIKE = 78;
	public static readonly IN = 79;
	public static readonly INDEX = 80;
	public static readonly INF = 81;
	public static readonly INJECTIVE = 82;
	public static readonly INNER = 83;
	public static readonly INSERT = 84;
	public static readonly INTERVAL = 85;
	public static readonly INTO = 86;
	public static readonly IS = 87;
	public static readonly IS_OBJECT_ID = 88;
	public static readonly JOIN = 89;
	public static readonly KEY = 90;
	public static readonly KILL = 91;
	public static readonly LAST = 92;
	public static readonly LAYOUT = 93;
	public static readonly LEADING = 94;
	public static readonly LEFT = 95;
	public static readonly LIFETIME = 96;
	public static readonly LIKE = 97;
	public static readonly LIMIT = 98;
	public static readonly LIVE = 99;
	public static readonly LOCAL = 100;
	public static readonly LOGS = 101;
	public static readonly MATERIALIZE = 102;
	public static readonly MATERIALIZED = 103;
	public static readonly MAX = 104;
	public static readonly MERGES = 105;
	public static readonly MIN = 106;
	public static readonly MINUTE = 107;
	public static readonly MODIFY = 108;
	public static readonly MONTH = 109;
	public static readonly MOVE = 110;
	public static readonly MUTATION = 111;
	public static readonly NAN_SQL = 112;
	public static readonly NO = 113;
	public static readonly NOT = 114;
	public static readonly NULL_SQL = 115;
	public static readonly NULLS = 116;
	public static readonly OFFSET = 117;
	public static readonly ON = 118;
	public static readonly OPTIMIZE = 119;
	public static readonly OR = 120;
	public static readonly ORDER = 121;
	public static readonly OUTER = 122;
	public static readonly OUTFILE = 123;
	public static readonly OVER = 124;
	public static readonly PARTITION = 125;
	public static readonly POPULATE = 126;
	public static readonly PRECEDING = 127;
	public static readonly PREWHERE = 128;
	public static readonly PRIMARY = 129;
	public static readonly PROJECTION = 130;
	public static readonly QUARTER = 131;
	public static readonly RANGE = 132;
	public static readonly RELOAD = 133;
	public static readonly REMOVE = 134;
	public static readonly RENAME = 135;
	public static readonly REPLACE = 136;
	public static readonly REPLICA = 137;
	public static readonly REPLICATED = 138;
	public static readonly RIGHT = 139;
	public static readonly ROLLUP = 140;
	public static readonly ROW = 141;
	public static readonly ROWS = 142;
	public static readonly SAMPLE = 143;
	public static readonly SECOND = 144;
	public static readonly SELECT = 145;
	public static readonly SEMI = 146;
	public static readonly SENDS = 147;
	public static readonly SET = 148;
	public static readonly SETTINGS = 149;
	public static readonly SHOW = 150;
	public static readonly SOURCE = 151;
	public static readonly START = 152;
	public static readonly STOP = 153;
	public static readonly SUBSTRING = 154;
	public static readonly SYNC = 155;
	public static readonly SYNTAX = 156;
	public static readonly SYSTEM = 157;
	public static readonly TABLE = 158;
	public static readonly TABLES = 159;
	public static readonly TEMPORARY = 160;
	public static readonly TEST = 161;
	public static readonly THEN = 162;
	public static readonly TIES = 163;
	public static readonly TIMEOUT = 164;
	public static readonly TIMESTAMP = 165;
	public static readonly TO = 166;
	public static readonly TOP = 167;
	public static readonly TOTALS = 168;
	public static readonly TRAILING = 169;
	public static readonly TRIM = 170;
	public static readonly TRUNCATE = 171;
	public static readonly TTL = 172;
	public static readonly TYPE = 173;
	public static readonly UNBOUNDED = 174;
	public static readonly UNION = 175;
	public static readonly UPDATE = 176;
	public static readonly USE = 177;
	public static readonly USING = 178;
	public static readonly UUID = 179;
	public static readonly VALUES = 180;
	public static readonly VIEW = 181;
	public static readonly VOLUME = 182;
	public static readonly WATCH = 183;
	public static readonly WEEK = 184;
	public static readonly WHEN = 185;
	public static readonly WHERE = 186;
	public static readonly WINDOW = 187;
	public static readonly WITH = 188;
	public static readonly YEAR = 189;
	public static readonly JSON_FALSE = 190;
	public static readonly JSON_TRUE = 191;
	public static readonly IDENTIFIER = 192;
	public static readonly FLOATING_LITERAL = 193;
	public static readonly OCTAL_LITERAL = 194;
	public static readonly DECIMAL_LITERAL = 195;
	public static readonly HEXADECIMAL_LITERAL = 196;
	public static readonly STRING_LITERAL = 197;
	public static readonly ARROW = 198;
	public static readonly ASTERISK = 199;
	public static readonly BACKQUOTE = 200;
	public static readonly BACKSLASH = 201;
	public static readonly COLON = 202;
	public static readonly COMMA = 203;
	public static readonly CONCAT = 204;
	public static readonly DASH = 205;
	public static readonly DOT = 206;
	public static readonly EQ_DOUBLE = 207;
	public static readonly EQ_SINGLE = 208;
	public static readonly GE = 209;
	public static readonly GT = 210;
	public static readonly LBRACE = 211;
	public static readonly LBRACKET = 212;
	public static readonly LE = 213;
	public static readonly LPAREN = 214;
	public static readonly LT = 215;
	public static readonly NOT_EQ = 216;
	public static readonly PERCENT = 217;
	public static readonly PLUS = 218;
	public static readonly QUERY = 219;
	public static readonly QUOTE_DOUBLE = 220;
	public static readonly QUOTE_SINGLE = 221;
	public static readonly RBRACE = 222;
	public static readonly RBRACKET = 223;
	public static readonly RPAREN = 224;
	public static readonly SEMICOLON = 225;
	public static readonly SLASH = 226;
	public static readonly UNDERSCORE = 227;
	public static readonly MULTI_LINE_COMMENT = 228;
	public static readonly SINGLE_LINE_COMMENT = 229;
	public static readonly WHITESPACE = 230;
	public static readonly RULE_sql = 0;
	public static readonly RULE_queryStmt = 1;
	public static readonly RULE_query = 2;
	public static readonly RULE_alterStmt = 3;
	public static readonly RULE_alterTableClause = 4;
	public static readonly RULE_assignmentExprList = 5;
	public static readonly RULE_assignmentExpr = 6;
	public static readonly RULE_tableColumnPropertyType = 7;
	public static readonly RULE_partitionClause = 8;
	public static readonly RULE_attachStmt = 9;
	public static readonly RULE_checkStmt = 10;
	public static readonly RULE_createStmt = 11;
	public static readonly RULE_dictionarySchemaClause = 12;
	public static readonly RULE_dictionaryAttrDfnt = 13;
	public static readonly RULE_dictionaryEngineClause = 14;
	public static readonly RULE_dictionaryPrimaryKeyClause = 15;
	public static readonly RULE_dictionaryArgExpr = 16;
	public static readonly RULE_sourceClause = 17;
	public static readonly RULE_lifetimeClause = 18;
	public static readonly RULE_layoutClause = 19;
	public static readonly RULE_rangeClause = 20;
	public static readonly RULE_dictionarySettingsClause = 21;
	public static readonly RULE_clusterClause = 22;
	public static readonly RULE_uuidClause = 23;
	public static readonly RULE_destinationClause = 24;
	public static readonly RULE_subqueryClause = 25;
	public static readonly RULE_tableSchemaClause = 26;
	public static readonly RULE_engineClause = 27;
	public static readonly RULE_partitionByClause = 28;
	public static readonly RULE_primaryKeyClause = 29;
	public static readonly RULE_sampleByClause = 30;
	public static readonly RULE_ttlClause = 31;
	public static readonly RULE_engineExpr = 32;
	public static readonly RULE_tableElementExpr = 33;
	public static readonly RULE_tableColumnDfnt = 34;
	public static readonly RULE_tableColumnPropertyExpr = 35;
	public static readonly RULE_tableIndexDfnt = 36;
	public static readonly RULE_tableProjectionDfnt = 37;
	public static readonly RULE_codecExpr = 38;
	public static readonly RULE_codecArgExpr = 39;
	public static readonly RULE_ttlExpr = 40;
	public static readonly RULE_describeStmt = 41;
	public static readonly RULE_dropStmt = 42;
	public static readonly RULE_existsStmt = 43;
	public static readonly RULE_explainStmt = 44;
	public static readonly RULE_insertStmt = 45;
	public static readonly RULE_columnsClause = 46;
	public static readonly RULE_dataClause = 47;
	public static readonly RULE_killStmt = 48;
	public static readonly RULE_optimizeStmt = 49;
	public static readonly RULE_renameStmt = 50;
	public static readonly RULE_projectionSelectStmt = 51;
	public static readonly RULE_selectUnionStmt = 52;
	public static readonly RULE_selectStmtWithParens = 53;
	public static readonly RULE_selectStmt = 54;
	public static readonly RULE_withClause = 55;
	public static readonly RULE_topClause = 56;
	public static readonly RULE_fromClause = 57;
	public static readonly RULE_arrayJoinClause = 58;
	public static readonly RULE_windowClause = 59;
	public static readonly RULE_prewhereClause = 60;
	public static readonly RULE_whereClause = 61;
	public static readonly RULE_groupByClause = 62;
	public static readonly RULE_havingClause = 63;
	public static readonly RULE_orderByClause = 64;
	public static readonly RULE_projectionOrderByClause = 65;
	public static readonly RULE_limitByClause = 66;
	public static readonly RULE_limitClause = 67;
	public static readonly RULE_settingsClause = 68;
	public static readonly RULE_joinExpr = 69;
	public static readonly RULE_joinOp = 70;
	public static readonly RULE_joinOpCross = 71;
	public static readonly RULE_joinConstraintClause = 72;
	public static readonly RULE_sampleClause = 73;
	public static readonly RULE_limitExpr = 74;
	public static readonly RULE_orderExprList = 75;
	public static readonly RULE_orderExpr = 76;
	public static readonly RULE_ratioExpr = 77;
	public static readonly RULE_settingExprList = 78;
	public static readonly RULE_settingExpr = 79;
	public static readonly RULE_windowExpr = 80;
	public static readonly RULE_winPartitionByClause = 81;
	public static readonly RULE_winOrderByClause = 82;
	public static readonly RULE_winFrameClause = 83;
	public static readonly RULE_winFrameExtend = 84;
	public static readonly RULE_winFrameBound = 85;
	public static readonly RULE_setStmt = 86;
	public static readonly RULE_showStmt = 87;
	public static readonly RULE_systemStmt = 88;
	public static readonly RULE_truncateStmt = 89;
	public static readonly RULE_useStmt = 90;
	public static readonly RULE_watchStmt = 91;
	public static readonly RULE_columnTypeExpr = 92;
	public static readonly RULE_columnExprList = 93;
	public static readonly RULE_columnsExpr = 94;
	public static readonly RULE_columnExpr = 95;
	public static readonly RULE_columnArgList = 96;
	public static readonly RULE_columnArgExpr = 97;
	public static readonly RULE_columnLambdaExpr = 98;
	public static readonly RULE_columnIdentifier = 99;
	public static readonly RULE_nestedIdentifier = 100;
	public static readonly RULE_tableExpr = 101;
	public static readonly RULE_tableFunctionExpr = 102;
	public static readonly RULE_tableIdentifier = 103;
	public static readonly RULE_tableArgList = 104;
	public static readonly RULE_tableArgExpr = 105;
	public static readonly RULE_databaseIdentifier = 106;
	public static readonly RULE_floatingLiteral = 107;
	public static readonly RULE_numberLiteral = 108;
	public static readonly RULE_literal = 109;
	public static readonly RULE_interval = 110;
	public static readonly RULE_keyword = 111;
	public static readonly RULE_keywordForAlias = 112;
	public static readonly RULE_alias = 113;
	public static readonly RULE_identifier = 114;
	public static readonly RULE_identifierOrNull = 115;
	public static readonly RULE_enumValue = 116;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"sql", "queryStmt", "query", "alterStmt", "alterTableClause", "assignmentExprList", 
		"assignmentExpr", "tableColumnPropertyType", "partitionClause", "attachStmt", 
		"checkStmt", "createStmt", "dictionarySchemaClause", "dictionaryAttrDfnt", 
		"dictionaryEngineClause", "dictionaryPrimaryKeyClause", "dictionaryArgExpr", 
		"sourceClause", "lifetimeClause", "layoutClause", "rangeClause", "dictionarySettingsClause", 
		"clusterClause", "uuidClause", "destinationClause", "subqueryClause", 
		"tableSchemaClause", "engineClause", "partitionByClause", "primaryKeyClause", 
		"sampleByClause", "ttlClause", "engineExpr", "tableElementExpr", "tableColumnDfnt", 
		"tableColumnPropertyExpr", "tableIndexDfnt", "tableProjectionDfnt", "codecExpr", 
		"codecArgExpr", "ttlExpr", "describeStmt", "dropStmt", "existsStmt", "explainStmt", 
		"insertStmt", "columnsClause", "dataClause", "killStmt", "optimizeStmt", 
		"renameStmt", "projectionSelectStmt", "selectUnionStmt", "selectStmtWithParens", 
		"selectStmt", "withClause", "topClause", "fromClause", "arrayJoinClause", 
		"windowClause", "prewhereClause", "whereClause", "groupByClause", "havingClause", 
		"orderByClause", "projectionOrderByClause", "limitByClause", "limitClause", 
		"settingsClause", "joinExpr", "joinOp", "joinOpCross", "joinConstraintClause", 
		"sampleClause", "limitExpr", "orderExprList", "orderExpr", "ratioExpr", 
		"settingExprList", "settingExpr", "windowExpr", "winPartitionByClause", 
		"winOrderByClause", "winFrameClause", "winFrameExtend", "winFrameBound", 
		"setStmt", "showStmt", "systemStmt", "truncateStmt", "useStmt", "watchStmt", 
		"columnTypeExpr", "columnExprList", "columnsExpr", "columnExpr", "columnArgList", 
		"columnArgExpr", "columnLambdaExpr", "columnIdentifier", "nestedIdentifier", 
		"tableExpr", "tableFunctionExpr", "tableIdentifier", "tableArgList", "tableArgExpr", 
		"databaseIdentifier", "floatingLiteral", "numberLiteral", "literal", "interval", 
		"keyword", "keywordForAlias", "alias", "identifier", "identifierOrNull", 
		"enumValue",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "'false'", "'true'", undefined, undefined, undefined, undefined, 
		undefined, undefined, "'->'", "'*'", "'`'", "'\\'", "':'", "','", "'||'", 
		"'-'", "'.'", "'=='", "'='", "'>='", "'>'", "'{'", "'['", "'<='", "'('", 
		"'<'", undefined, "'%'", "'+'", "'?'", "'\"'", "'''", "'}'", "']'", "')'", 
		"';'", "'/'", "'_'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "ADD", "AFTER", "ALIAS", "ALL", "ALTER", "AND", "ANTI", "ANY", 
		"ARRAY", "AS", "ASCENDING", "ASOF", "AST", "ASYNC", "ATTACH", "BETWEEN", 
		"BOTH", "BY", "CASE", "CAST", "CHECK", "CLEAR", "CLUSTER", "CODEC", "COLLATE", 
		"COLUMN", "COMMENT", "CONSTRAINT", "CREATE", "CROSS", "CUBE", "CURRENT", 
		"DATABASE", "DATABASES", "DATE", "DAY", "DEDUPLICATE", "DEFAULT", "DELAY", 
		"DELETE", "DESC", "DESCENDING", "DESCRIBE", "DETACH", "DICTIONARIES", 
		"DICTIONARY", "DISK", "DISTINCT", "DISTRIBUTED", "DROP", "ELSE", "END", 
		"ENGINE", "EVENTS", "EXISTS", "EXPLAIN", "EXPRESSION", "EXTRACT", "FETCHES", 
		"FINAL", "FIRST", "FLUSH", "FOLLOWING", "FOR", "FORMAT", "FREEZE", "FROM", 
		"FULL", "FUNCTION", "GLOBAL", "GRANULARITY", "GROUP", "HAVING", "HIERARCHICAL", 
		"HOUR", "ID", "IF", "ILIKE", "IN", "INDEX", "INF", "INJECTIVE", "INNER", 
		"INSERT", "INTERVAL", "INTO", "IS", "IS_OBJECT_ID", "JOIN", "KEY", "KILL", 
		"LAST", "LAYOUT", "LEADING", "LEFT", "LIFETIME", "LIKE", "LIMIT", "LIVE", 
		"LOCAL", "LOGS", "MATERIALIZE", "MATERIALIZED", "MAX", "MERGES", "MIN", 
		"MINUTE", "MODIFY", "MONTH", "MOVE", "MUTATION", "NAN_SQL", "NO", "NOT", 
		"NULL_SQL", "NULLS", "OFFSET", "ON", "OPTIMIZE", "OR", "ORDER", "OUTER", 
		"OUTFILE", "OVER", "PARTITION", "POPULATE", "PRECEDING", "PREWHERE", "PRIMARY", 
		"PROJECTION", "QUARTER", "RANGE", "RELOAD", "REMOVE", "RENAME", "REPLACE", 
		"REPLICA", "REPLICATED", "RIGHT", "ROLLUP", "ROW", "ROWS", "SAMPLE", "SECOND", 
		"SELECT", "SEMI", "SENDS", "SET", "SETTINGS", "SHOW", "SOURCE", "START", 
		"STOP", "SUBSTRING", "SYNC", "SYNTAX", "SYSTEM", "TABLE", "TABLES", "TEMPORARY", 
		"TEST", "THEN", "TIES", "TIMEOUT", "TIMESTAMP", "TO", "TOP", "TOTALS", 
		"TRAILING", "TRIM", "TRUNCATE", "TTL", "TYPE", "UNBOUNDED", "UNION", "UPDATE", 
		"USE", "USING", "UUID", "VALUES", "VIEW", "VOLUME", "WATCH", "WEEK", "WHEN", 
		"WHERE", "WINDOW", "WITH", "YEAR", "JSON_FALSE", "JSON_TRUE", "IDENTIFIER", 
		"FLOATING_LITERAL", "OCTAL_LITERAL", "DECIMAL_LITERAL", "HEXADECIMAL_LITERAL", 
		"STRING_LITERAL", "ARROW", "ASTERISK", "BACKQUOTE", "BACKSLASH", "COLON", 
		"COMMA", "CONCAT", "DASH", "DOT", "EQ_DOUBLE", "EQ_SINGLE", "GE", "GT", 
		"LBRACE", "LBRACKET", "LE", "LPAREN", "LT", "NOT_EQ", "PERCENT", "PLUS", 
		"QUERY", "QUOTE_DOUBLE", "QUOTE_SINGLE", "RBRACE", "RBRACKET", "RPAREN", 
		"SEMICOLON", "SLASH", "UNDERSCORE", "MULTI_LINE_COMMENT", "SINGLE_LINE_COMMENT", 
		"WHITESPACE",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ClickHouseParser._LITERAL_NAMES, ClickHouseParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ClickHouseParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "ClickHouseParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return ClickHouseParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ClickHouseParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ClickHouseParser._ATN, this);
	}
	// @RuleVersion(0)
	public sql(): SqlContext {
		let _localctx: SqlContext = new SqlContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ClickHouseParser.RULE_sql);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 243;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALTER) | (1 << ClickHouseParser.ATTACH) | (1 << ClickHouseParser.CHECK) | (1 << ClickHouseParser.CREATE))) !== 0) || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (ClickHouseParser.DESC - 41)) | (1 << (ClickHouseParser.DESCRIBE - 41)) | (1 << (ClickHouseParser.DETACH - 41)) | (1 << (ClickHouseParser.DROP - 41)) | (1 << (ClickHouseParser.EXISTS - 41)) | (1 << (ClickHouseParser.EXPLAIN - 41)))) !== 0) || _la === ClickHouseParser.INSERT || _la === ClickHouseParser.KILL || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & ((1 << (ClickHouseParser.OPTIMIZE - 119)) | (1 << (ClickHouseParser.RENAME - 119)) | (1 << (ClickHouseParser.REPLACE - 119)) | (1 << (ClickHouseParser.SELECT - 119)) | (1 << (ClickHouseParser.SET - 119)) | (1 << (ClickHouseParser.SHOW - 119)))) !== 0) || ((((_la - 157)) & ~0x1F) === 0 && ((1 << (_la - 157)) & ((1 << (ClickHouseParser.SYSTEM - 157)) | (1 << (ClickHouseParser.TRUNCATE - 157)) | (1 << (ClickHouseParser.USE - 157)) | (1 << (ClickHouseParser.WATCH - 157)) | (1 << (ClickHouseParser.WITH - 157)))) !== 0) || _la === ClickHouseParser.LPAREN) {
				{
				{
				{
				this.state = 234;
				this.queryStmt();
				}
				this.state = 238;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ClickHouseParser.SEMICOLON) {
					{
					{
					this.state = 235;
					this.match(ClickHouseParser.SEMICOLON);
					}
					}
					this.state = 240;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				}
				this.state = 245;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 246;
			this.match(ClickHouseParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public queryStmt(): QueryStmtContext {
		let _localctx: QueryStmtContext = new QueryStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ClickHouseParser.RULE_queryStmt);
		let _la: number;
		try {
			this.state = 262;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.ALTER:
			case ClickHouseParser.ATTACH:
			case ClickHouseParser.CHECK:
			case ClickHouseParser.CREATE:
			case ClickHouseParser.DESC:
			case ClickHouseParser.DESCRIBE:
			case ClickHouseParser.DETACH:
			case ClickHouseParser.DROP:
			case ClickHouseParser.EXISTS:
			case ClickHouseParser.EXPLAIN:
			case ClickHouseParser.KILL:
			case ClickHouseParser.OPTIMIZE:
			case ClickHouseParser.RENAME:
			case ClickHouseParser.REPLACE:
			case ClickHouseParser.SELECT:
			case ClickHouseParser.SET:
			case ClickHouseParser.SHOW:
			case ClickHouseParser.SYSTEM:
			case ClickHouseParser.TRUNCATE:
			case ClickHouseParser.USE:
			case ClickHouseParser.WATCH:
			case ClickHouseParser.WITH:
			case ClickHouseParser.LPAREN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 248;
				this.query();
				this.state = 252;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.INTO) {
					{
					this.state = 249;
					this.match(ClickHouseParser.INTO);
					this.state = 250;
					this.match(ClickHouseParser.OUTFILE);
					this.state = 251;
					this.match(ClickHouseParser.STRING_LITERAL);
					}
				}

				this.state = 256;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.FORMAT) {
					{
					this.state = 254;
					this.match(ClickHouseParser.FORMAT);
					this.state = 255;
					this.identifierOrNull();
					}
				}

				this.state = 259;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
				case 1:
					{
					this.state = 258;
					this.match(ClickHouseParser.SEMICOLON);
					}
					break;
				}
				}
				break;
			case ClickHouseParser.INSERT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 261;
				this.insertStmt();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public query(): QueryContext {
		let _localctx: QueryContext = new QueryContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ClickHouseParser.RULE_query);
		try {
			this.state = 282;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 264;
				this.alterStmt();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 265;
				this.attachStmt();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 266;
				this.checkStmt();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 267;
				this.createStmt();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 268;
				this.describeStmt();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 269;
				this.dropStmt();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 270;
				this.existsStmt();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 271;
				this.explainStmt();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 272;
				this.killStmt();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 273;
				this.optimizeStmt();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 274;
				this.renameStmt();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 275;
				this.selectUnionStmt();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 276;
				this.setStmt();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 277;
				this.showStmt();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 278;
				this.systemStmt();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 279;
				this.truncateStmt();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 280;
				this.useStmt();
				}
				break;

			case 18:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 281;
				this.watchStmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public alterStmt(): AlterStmtContext {
		let _localctx: AlterStmtContext = new AlterStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ClickHouseParser.RULE_alterStmt);
		let _la: number;
		try {
			_localctx = new AlterTableStmtContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 284;
			this.match(ClickHouseParser.ALTER);
			this.state = 285;
			this.match(ClickHouseParser.TABLE);
			this.state = 286;
			this.tableIdentifier();
			this.state = 288;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ON) {
				{
				this.state = 287;
				this.clusterClause();
				}
			}

			this.state = 290;
			this.alterTableClause();
			this.state = 295;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.COMMA) {
				{
				{
				this.state = 291;
				this.match(ClickHouseParser.COMMA);
				this.state = 292;
				this.alterTableClause();
				}
				}
				this.state = 297;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public alterTableClause(): AlterTableClauseContext {
		let _localctx: AlterTableClauseContext = new AlterTableClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ClickHouseParser.RULE_alterTableClause);
		let _la: number;
		try {
			this.state = 512;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				_localctx = new AlterTableClauseAddColumnContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 298;
				this.match(ClickHouseParser.ADD);
				this.state = 299;
				this.match(ClickHouseParser.COLUMN);
				this.state = 303;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
				case 1:
					{
					this.state = 300;
					this.match(ClickHouseParser.IF);
					this.state = 301;
					this.match(ClickHouseParser.NOT);
					this.state = 302;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 305;
				this.tableColumnDfnt();
				this.state = 308;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.AFTER) {
					{
					this.state = 306;
					this.match(ClickHouseParser.AFTER);
					this.state = 307;
					this.nestedIdentifier();
					}
				}

				}
				break;

			case 2:
				_localctx = new AlterTableClauseAddIndexContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 310;
				this.match(ClickHouseParser.ADD);
				this.state = 311;
				this.match(ClickHouseParser.INDEX);
				this.state = 315;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 11, this._ctx) ) {
				case 1:
					{
					this.state = 312;
					this.match(ClickHouseParser.IF);
					this.state = 313;
					this.match(ClickHouseParser.NOT);
					this.state = 314;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 317;
				this.tableIndexDfnt();
				this.state = 320;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.AFTER) {
					{
					this.state = 318;
					this.match(ClickHouseParser.AFTER);
					this.state = 319;
					this.nestedIdentifier();
					}
				}

				}
				break;

			case 3:
				_localctx = new AlterTableClauseAddProjectionContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 322;
				this.match(ClickHouseParser.ADD);
				this.state = 323;
				this.match(ClickHouseParser.PROJECTION);
				this.state = 327;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
				case 1:
					{
					this.state = 324;
					this.match(ClickHouseParser.IF);
					this.state = 325;
					this.match(ClickHouseParser.NOT);
					this.state = 326;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 329;
				this.tableProjectionDfnt();
				this.state = 332;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.AFTER) {
					{
					this.state = 330;
					this.match(ClickHouseParser.AFTER);
					this.state = 331;
					this.nestedIdentifier();
					}
				}

				}
				break;

			case 4:
				_localctx = new AlterTableClauseAttachContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 334;
				this.match(ClickHouseParser.ATTACH);
				this.state = 335;
				this.partitionClause();
				this.state = 338;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.FROM) {
					{
					this.state = 336;
					this.match(ClickHouseParser.FROM);
					this.state = 337;
					this.tableIdentifier();
					}
				}

				}
				break;

			case 5:
				_localctx = new AlterTableClauseClearColumnContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 340;
				this.match(ClickHouseParser.CLEAR);
				this.state = 341;
				this.match(ClickHouseParser.COLUMN);
				this.state = 344;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 16, this._ctx) ) {
				case 1:
					{
					this.state = 342;
					this.match(ClickHouseParser.IF);
					this.state = 343;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 346;
				this.nestedIdentifier();
				this.state = 349;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.IN) {
					{
					this.state = 347;
					this.match(ClickHouseParser.IN);
					this.state = 348;
					this.partitionClause();
					}
				}

				}
				break;

			case 6:
				_localctx = new AlterTableClauseClearIndexContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 351;
				this.match(ClickHouseParser.CLEAR);
				this.state = 352;
				this.match(ClickHouseParser.INDEX);
				this.state = 355;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
				case 1:
					{
					this.state = 353;
					this.match(ClickHouseParser.IF);
					this.state = 354;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 357;
				this.nestedIdentifier();
				this.state = 360;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.IN) {
					{
					this.state = 358;
					this.match(ClickHouseParser.IN);
					this.state = 359;
					this.partitionClause();
					}
				}

				}
				break;

			case 7:
				_localctx = new AlterTableClauseClearProjectionContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 362;
				this.match(ClickHouseParser.CLEAR);
				this.state = 363;
				this.match(ClickHouseParser.PROJECTION);
				this.state = 366;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
				case 1:
					{
					this.state = 364;
					this.match(ClickHouseParser.IF);
					this.state = 365;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 368;
				this.nestedIdentifier();
				this.state = 371;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.IN) {
					{
					this.state = 369;
					this.match(ClickHouseParser.IN);
					this.state = 370;
					this.partitionClause();
					}
				}

				}
				break;

			case 8:
				_localctx = new AlterTableClauseCommentContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 373;
				this.match(ClickHouseParser.COMMENT);
				this.state = 374;
				this.match(ClickHouseParser.COLUMN);
				this.state = 377;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
				case 1:
					{
					this.state = 375;
					this.match(ClickHouseParser.IF);
					this.state = 376;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 379;
				this.nestedIdentifier();
				this.state = 380;
				this.match(ClickHouseParser.STRING_LITERAL);
				}
				break;

			case 9:
				_localctx = new AlterTableClauseDeleteContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 382;
				this.match(ClickHouseParser.DELETE);
				this.state = 383;
				this.match(ClickHouseParser.WHERE);
				this.state = 384;
				this.columnExpr(0);
				}
				break;

			case 10:
				_localctx = new AlterTableClauseDetachContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 385;
				this.match(ClickHouseParser.DETACH);
				this.state = 386;
				this.partitionClause();
				}
				break;

			case 11:
				_localctx = new AlterTableClauseDropColumnContext(_localctx);
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 387;
				this.match(ClickHouseParser.DROP);
				this.state = 388;
				this.match(ClickHouseParser.COLUMN);
				this.state = 391;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
				case 1:
					{
					this.state = 389;
					this.match(ClickHouseParser.IF);
					this.state = 390;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 393;
				this.nestedIdentifier();
				}
				break;

			case 12:
				_localctx = new AlterTableClauseDropIndexContext(_localctx);
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 394;
				this.match(ClickHouseParser.DROP);
				this.state = 395;
				this.match(ClickHouseParser.INDEX);
				this.state = 398;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
				case 1:
					{
					this.state = 396;
					this.match(ClickHouseParser.IF);
					this.state = 397;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 400;
				this.nestedIdentifier();
				}
				break;

			case 13:
				_localctx = new AlterTableClauseDropProjectionContext(_localctx);
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 401;
				this.match(ClickHouseParser.DROP);
				this.state = 402;
				this.match(ClickHouseParser.PROJECTION);
				this.state = 405;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 25, this._ctx) ) {
				case 1:
					{
					this.state = 403;
					this.match(ClickHouseParser.IF);
					this.state = 404;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 407;
				this.nestedIdentifier();
				}
				break;

			case 14:
				_localctx = new AlterTableClauseDropPartitionContext(_localctx);
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 408;
				this.match(ClickHouseParser.DROP);
				this.state = 409;
				this.partitionClause();
				}
				break;

			case 15:
				_localctx = new AlterTableClauseFreezePartitionContext(_localctx);
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 410;
				this.match(ClickHouseParser.FREEZE);
				this.state = 412;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.PARTITION) {
					{
					this.state = 411;
					this.partitionClause();
					}
				}

				}
				break;

			case 16:
				_localctx = new AlterTableClauseMaterializeIndexContext(_localctx);
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 414;
				this.match(ClickHouseParser.MATERIALIZE);
				this.state = 415;
				this.match(ClickHouseParser.INDEX);
				this.state = 418;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 27, this._ctx) ) {
				case 1:
					{
					this.state = 416;
					this.match(ClickHouseParser.IF);
					this.state = 417;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 420;
				this.nestedIdentifier();
				this.state = 423;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.IN) {
					{
					this.state = 421;
					this.match(ClickHouseParser.IN);
					this.state = 422;
					this.partitionClause();
					}
				}

				}
				break;

			case 17:
				_localctx = new AlterTableClauseMaterializeProjectionContext(_localctx);
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 425;
				this.match(ClickHouseParser.MATERIALIZE);
				this.state = 426;
				this.match(ClickHouseParser.PROJECTION);
				this.state = 429;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 29, this._ctx) ) {
				case 1:
					{
					this.state = 427;
					this.match(ClickHouseParser.IF);
					this.state = 428;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 431;
				this.nestedIdentifier();
				this.state = 434;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.IN) {
					{
					this.state = 432;
					this.match(ClickHouseParser.IN);
					this.state = 433;
					this.partitionClause();
					}
				}

				}
				break;

			case 18:
				_localctx = new AlterTableClauseModifyCodecContext(_localctx);
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 436;
				this.match(ClickHouseParser.MODIFY);
				this.state = 437;
				this.match(ClickHouseParser.COLUMN);
				this.state = 440;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 31, this._ctx) ) {
				case 1:
					{
					this.state = 438;
					this.match(ClickHouseParser.IF);
					this.state = 439;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 442;
				this.nestedIdentifier();
				this.state = 443;
				this.codecExpr();
				}
				break;

			case 19:
				_localctx = new AlterTableClauseModifyCommentContext(_localctx);
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 445;
				this.match(ClickHouseParser.MODIFY);
				this.state = 446;
				this.match(ClickHouseParser.COLUMN);
				this.state = 449;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 32, this._ctx) ) {
				case 1:
					{
					this.state = 447;
					this.match(ClickHouseParser.IF);
					this.state = 448;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 451;
				this.nestedIdentifier();
				this.state = 452;
				this.match(ClickHouseParser.COMMENT);
				this.state = 453;
				this.match(ClickHouseParser.STRING_LITERAL);
				}
				break;

			case 20:
				_localctx = new AlterTableClauseModifyRemoveContext(_localctx);
				this.enterOuterAlt(_localctx, 20);
				{
				this.state = 455;
				this.match(ClickHouseParser.MODIFY);
				this.state = 456;
				this.match(ClickHouseParser.COLUMN);
				this.state = 459;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 33, this._ctx) ) {
				case 1:
					{
					this.state = 457;
					this.match(ClickHouseParser.IF);
					this.state = 458;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 461;
				this.nestedIdentifier();
				this.state = 462;
				this.match(ClickHouseParser.REMOVE);
				this.state = 463;
				this.tableColumnPropertyType();
				}
				break;

			case 21:
				_localctx = new AlterTableClauseModifyContext(_localctx);
				this.enterOuterAlt(_localctx, 21);
				{
				this.state = 465;
				this.match(ClickHouseParser.MODIFY);
				this.state = 466;
				this.match(ClickHouseParser.COLUMN);
				this.state = 469;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
				case 1:
					{
					this.state = 467;
					this.match(ClickHouseParser.IF);
					this.state = 468;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 471;
				this.tableColumnDfnt();
				}
				break;

			case 22:
				_localctx = new AlterTableClauseModifyOrderByContext(_localctx);
				this.enterOuterAlt(_localctx, 22);
				{
				this.state = 472;
				this.match(ClickHouseParser.MODIFY);
				this.state = 473;
				this.match(ClickHouseParser.ORDER);
				this.state = 474;
				this.match(ClickHouseParser.BY);
				this.state = 475;
				this.columnExpr(0);
				}
				break;

			case 23:
				_localctx = new AlterTableClauseModifyTTLContext(_localctx);
				this.enterOuterAlt(_localctx, 23);
				{
				this.state = 476;
				this.match(ClickHouseParser.MODIFY);
				this.state = 477;
				this.ttlClause();
				}
				break;

			case 24:
				_localctx = new AlterTableClauseMovePartitionContext(_localctx);
				this.enterOuterAlt(_localctx, 24);
				{
				this.state = 478;
				this.match(ClickHouseParser.MOVE);
				this.state = 479;
				this.partitionClause();
				this.state = 489;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
				case 1:
					{
					this.state = 480;
					this.match(ClickHouseParser.TO);
					this.state = 481;
					this.match(ClickHouseParser.DISK);
					this.state = 482;
					this.match(ClickHouseParser.STRING_LITERAL);
					}
					break;

				case 2:
					{
					this.state = 483;
					this.match(ClickHouseParser.TO);
					this.state = 484;
					this.match(ClickHouseParser.VOLUME);
					this.state = 485;
					this.match(ClickHouseParser.STRING_LITERAL);
					}
					break;

				case 3:
					{
					this.state = 486;
					this.match(ClickHouseParser.TO);
					this.state = 487;
					this.match(ClickHouseParser.TABLE);
					this.state = 488;
					this.tableIdentifier();
					}
					break;
				}
				}
				break;

			case 25:
				_localctx = new AlterTableClauseRemoveTTLContext(_localctx);
				this.enterOuterAlt(_localctx, 25);
				{
				this.state = 491;
				this.match(ClickHouseParser.REMOVE);
				this.state = 492;
				this.match(ClickHouseParser.TTL);
				}
				break;

			case 26:
				_localctx = new AlterTableClauseRenameContext(_localctx);
				this.enterOuterAlt(_localctx, 26);
				{
				this.state = 493;
				this.match(ClickHouseParser.RENAME);
				this.state = 494;
				this.match(ClickHouseParser.COLUMN);
				this.state = 497;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
				case 1:
					{
					this.state = 495;
					this.match(ClickHouseParser.IF);
					this.state = 496;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 499;
				this.nestedIdentifier();
				this.state = 500;
				this.match(ClickHouseParser.TO);
				this.state = 501;
				this.nestedIdentifier();
				}
				break;

			case 27:
				_localctx = new AlterTableClauseReplaceContext(_localctx);
				this.enterOuterAlt(_localctx, 27);
				{
				this.state = 503;
				this.match(ClickHouseParser.REPLACE);
				this.state = 504;
				this.partitionClause();
				this.state = 505;
				this.match(ClickHouseParser.FROM);
				this.state = 506;
				this.tableIdentifier();
				}
				break;

			case 28:
				_localctx = new AlterTableClauseUpdateContext(_localctx);
				this.enterOuterAlt(_localctx, 28);
				{
				this.state = 508;
				this.match(ClickHouseParser.UPDATE);
				this.state = 509;
				this.assignmentExprList();
				this.state = 510;
				this.whereClause();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignmentExprList(): AssignmentExprListContext {
		let _localctx: AssignmentExprListContext = new AssignmentExprListContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ClickHouseParser.RULE_assignmentExprList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 514;
			this.assignmentExpr();
			this.state = 519;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.COMMA) {
				{
				{
				this.state = 515;
				this.match(ClickHouseParser.COMMA);
				this.state = 516;
				this.assignmentExpr();
				}
				}
				this.state = 521;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignmentExpr(): AssignmentExprContext {
		let _localctx: AssignmentExprContext = new AssignmentExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ClickHouseParser.RULE_assignmentExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 522;
			this.nestedIdentifier();
			this.state = 523;
			this.match(ClickHouseParser.EQ_SINGLE);
			this.state = 524;
			this.columnExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableColumnPropertyType(): TableColumnPropertyTypeContext {
		let _localctx: TableColumnPropertyTypeContext = new TableColumnPropertyTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ClickHouseParser.RULE_tableColumnPropertyType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 526;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALIAS) | (1 << ClickHouseParser.CODEC) | (1 << ClickHouseParser.COMMENT))) !== 0) || _la === ClickHouseParser.DEFAULT || _la === ClickHouseParser.MATERIALIZED || _la === ClickHouseParser.TTL)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public partitionClause(): PartitionClauseContext {
		let _localctx: PartitionClauseContext = new PartitionClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, ClickHouseParser.RULE_partitionClause);
		try {
			this.state = 533;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 528;
				this.match(ClickHouseParser.PARTITION);
				this.state = 529;
				this.columnExpr(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 530;
				this.match(ClickHouseParser.PARTITION);
				this.state = 531;
				this.match(ClickHouseParser.ID);
				this.state = 532;
				this.match(ClickHouseParser.STRING_LITERAL);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attachStmt(): AttachStmtContext {
		let _localctx: AttachStmtContext = new AttachStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ClickHouseParser.RULE_attachStmt);
		let _la: number;
		try {
			_localctx = new AttachDictionaryStmtContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 535;
			this.match(ClickHouseParser.ATTACH);
			this.state = 536;
			this.match(ClickHouseParser.DICTIONARY);
			this.state = 537;
			this.tableIdentifier();
			this.state = 539;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ON) {
				{
				this.state = 538;
				this.clusterClause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public checkStmt(): CheckStmtContext {
		let _localctx: CheckStmtContext = new CheckStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ClickHouseParser.RULE_checkStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 541;
			this.match(ClickHouseParser.CHECK);
			this.state = 542;
			this.match(ClickHouseParser.TABLE);
			this.state = 543;
			this.tableIdentifier();
			this.state = 545;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.PARTITION) {
				{
				this.state = 544;
				this.partitionClause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public createStmt(): CreateStmtContext {
		let _localctx: CreateStmtContext = new CreateStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ClickHouseParser.RULE_createStmt);
		let _la: number;
		try {
			this.state = 700;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 77, this._ctx) ) {
			case 1:
				_localctx = new CreateDatabaseStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 547;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.ATTACH || _la === ClickHouseParser.CREATE)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 548;
				this.match(ClickHouseParser.DATABASE);
				this.state = 552;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 42, this._ctx) ) {
				case 1:
					{
					this.state = 549;
					this.match(ClickHouseParser.IF);
					this.state = 550;
					this.match(ClickHouseParser.NOT);
					this.state = 551;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 554;
				this.databaseIdentifier();
				this.state = 556;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ON) {
					{
					this.state = 555;
					this.clusterClause();
					}
				}

				this.state = 559;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ENGINE) {
					{
					this.state = 558;
					this.engineExpr();
					}
				}

				}
				break;

			case 2:
				_localctx = new CreateDictionaryStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 568;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ClickHouseParser.ATTACH:
					{
					this.state = 561;
					this.match(ClickHouseParser.ATTACH);
					}
					break;
				case ClickHouseParser.CREATE:
					{
					this.state = 562;
					this.match(ClickHouseParser.CREATE);
					this.state = 565;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.OR) {
						{
						this.state = 563;
						this.match(ClickHouseParser.OR);
						this.state = 564;
						this.match(ClickHouseParser.REPLACE);
						}
					}

					}
					break;
				case ClickHouseParser.REPLACE:
					{
					this.state = 567;
					this.match(ClickHouseParser.REPLACE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 570;
				this.match(ClickHouseParser.DICTIONARY);
				this.state = 574;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 47, this._ctx) ) {
				case 1:
					{
					this.state = 571;
					this.match(ClickHouseParser.IF);
					this.state = 572;
					this.match(ClickHouseParser.NOT);
					this.state = 573;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 576;
				this.tableIdentifier();
				this.state = 578;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.UUID) {
					{
					this.state = 577;
					this.uuidClause();
					}
				}

				this.state = 581;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ON) {
					{
					this.state = 580;
					this.clusterClause();
					}
				}

				this.state = 583;
				this.dictionarySchemaClause();
				this.state = 584;
				this.dictionaryEngineClause();
				}
				break;

			case 3:
				_localctx = new CreateLiveViewStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 586;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.ATTACH || _la === ClickHouseParser.CREATE)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 587;
				this.match(ClickHouseParser.LIVE);
				this.state = 588;
				this.match(ClickHouseParser.VIEW);
				this.state = 592;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 50, this._ctx) ) {
				case 1:
					{
					this.state = 589;
					this.match(ClickHouseParser.IF);
					this.state = 590;
					this.match(ClickHouseParser.NOT);
					this.state = 591;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 594;
				this.tableIdentifier();
				this.state = 596;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.UUID) {
					{
					this.state = 595;
					this.uuidClause();
					}
				}

				this.state = 599;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ON) {
					{
					this.state = 598;
					this.clusterClause();
					}
				}

				this.state = 606;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.WITH) {
					{
					this.state = 601;
					this.match(ClickHouseParser.WITH);
					this.state = 602;
					this.match(ClickHouseParser.TIMEOUT);
					this.state = 604;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.DECIMAL_LITERAL) {
						{
						this.state = 603;
						this.match(ClickHouseParser.DECIMAL_LITERAL);
						}
					}

					}
				}

				this.state = 609;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.TO) {
					{
					this.state = 608;
					this.destinationClause();
					}
				}

				this.state = 612;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 56, this._ctx) ) {
				case 1:
					{
					this.state = 611;
					this.tableSchemaClause();
					}
					break;
				}
				this.state = 614;
				this.subqueryClause();
				}
				break;

			case 4:
				_localctx = new CreateMaterializedViewStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 616;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.ATTACH || _la === ClickHouseParser.CREATE)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 617;
				this.match(ClickHouseParser.MATERIALIZED);
				this.state = 618;
				this.match(ClickHouseParser.VIEW);
				this.state = 622;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 57, this._ctx) ) {
				case 1:
					{
					this.state = 619;
					this.match(ClickHouseParser.IF);
					this.state = 620;
					this.match(ClickHouseParser.NOT);
					this.state = 621;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 624;
				this.tableIdentifier();
				this.state = 626;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.UUID) {
					{
					this.state = 625;
					this.uuidClause();
					}
				}

				this.state = 629;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ON) {
					{
					this.state = 628;
					this.clusterClause();
					}
				}

				this.state = 632;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.AS || _la === ClickHouseParser.LPAREN) {
					{
					this.state = 631;
					this.tableSchemaClause();
					}
				}

				this.state = 639;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ClickHouseParser.TO:
					{
					this.state = 634;
					this.destinationClause();
					}
					break;
				case ClickHouseParser.ENGINE:
					{
					this.state = 635;
					this.engineClause();
					this.state = 637;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.POPULATE) {
						{
						this.state = 636;
						this.match(ClickHouseParser.POPULATE);
						}
					}

					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 641;
				this.subqueryClause();
				}
				break;

			case 5:
				_localctx = new CreateTableStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 650;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ClickHouseParser.ATTACH:
					{
					this.state = 643;
					this.match(ClickHouseParser.ATTACH);
					}
					break;
				case ClickHouseParser.CREATE:
					{
					this.state = 644;
					this.match(ClickHouseParser.CREATE);
					this.state = 647;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.OR) {
						{
						this.state = 645;
						this.match(ClickHouseParser.OR);
						this.state = 646;
						this.match(ClickHouseParser.REPLACE);
						}
					}

					}
					break;
				case ClickHouseParser.REPLACE:
					{
					this.state = 649;
					this.match(ClickHouseParser.REPLACE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 653;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.TEMPORARY) {
					{
					this.state = 652;
					this.match(ClickHouseParser.TEMPORARY);
					}
				}

				this.state = 655;
				this.match(ClickHouseParser.TABLE);
				this.state = 659;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 66, this._ctx) ) {
				case 1:
					{
					this.state = 656;
					this.match(ClickHouseParser.IF);
					this.state = 657;
					this.match(ClickHouseParser.NOT);
					this.state = 658;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 661;
				this.tableIdentifier();
				this.state = 663;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.UUID) {
					{
					this.state = 662;
					this.uuidClause();
					}
				}

				this.state = 666;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ON) {
					{
					this.state = 665;
					this.clusterClause();
					}
				}

				this.state = 669;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 69, this._ctx) ) {
				case 1:
					{
					this.state = 668;
					this.tableSchemaClause();
					}
					break;
				}
				this.state = 672;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ENGINE) {
					{
					this.state = 671;
					this.engineClause();
					}
				}

				this.state = 675;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.AS) {
					{
					this.state = 674;
					this.subqueryClause();
					}
				}

				}
				break;

			case 6:
				_localctx = new CreateViewStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 677;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.ATTACH || _la === ClickHouseParser.CREATE)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 680;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.OR) {
					{
					this.state = 678;
					this.match(ClickHouseParser.OR);
					this.state = 679;
					this.match(ClickHouseParser.REPLACE);
					}
				}

				this.state = 682;
				this.match(ClickHouseParser.VIEW);
				this.state = 686;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 73, this._ctx) ) {
				case 1:
					{
					this.state = 683;
					this.match(ClickHouseParser.IF);
					this.state = 684;
					this.match(ClickHouseParser.NOT);
					this.state = 685;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 688;
				this.tableIdentifier();
				this.state = 690;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.UUID) {
					{
					this.state = 689;
					this.uuidClause();
					}
				}

				this.state = 693;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ON) {
					{
					this.state = 692;
					this.clusterClause();
					}
				}

				this.state = 696;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 76, this._ctx) ) {
				case 1:
					{
					this.state = 695;
					this.tableSchemaClause();
					}
					break;
				}
				this.state = 698;
				this.subqueryClause();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dictionarySchemaClause(): DictionarySchemaClauseContext {
		let _localctx: DictionarySchemaClauseContext = new DictionarySchemaClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ClickHouseParser.RULE_dictionarySchemaClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 702;
			this.match(ClickHouseParser.LPAREN);
			this.state = 703;
			this.dictionaryAttrDfnt();
			this.state = 708;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.COMMA) {
				{
				{
				this.state = 704;
				this.match(ClickHouseParser.COMMA);
				this.state = 705;
				this.dictionaryAttrDfnt();
				}
				}
				this.state = 710;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 711;
			this.match(ClickHouseParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dictionaryAttrDfnt(): DictionaryAttrDfntContext {
		let _localctx: DictionaryAttrDfntContext = new DictionaryAttrDfntContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ClickHouseParser.RULE_dictionaryAttrDfnt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 713;
			this.identifier();
			this.state = 714;
			this.columnTypeExpr();
			this.state = 724;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.DEFAULT || _la === ClickHouseParser.EXPRESSION || ((((_la - 74)) & ~0x1F) === 0 && ((1 << (_la - 74)) & ((1 << (ClickHouseParser.HIERARCHICAL - 74)) | (1 << (ClickHouseParser.INJECTIVE - 74)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 74)))) !== 0)) {
				{
				this.state = 722;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ClickHouseParser.DEFAULT:
					{
					this.state = 715;
					this.match(ClickHouseParser.DEFAULT);
					this.state = 716;
					this.literal();
					}
					break;
				case ClickHouseParser.EXPRESSION:
					{
					this.state = 717;
					this.match(ClickHouseParser.EXPRESSION);
					this.state = 718;
					this.columnExpr(0);
					}
					break;
				case ClickHouseParser.HIERARCHICAL:
					{
					this.state = 719;
					this.match(ClickHouseParser.HIERARCHICAL);
					}
					break;
				case ClickHouseParser.INJECTIVE:
					{
					this.state = 720;
					this.match(ClickHouseParser.INJECTIVE);
					}
					break;
				case ClickHouseParser.IS_OBJECT_ID:
					{
					this.state = 721;
					this.match(ClickHouseParser.IS_OBJECT_ID);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 726;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dictionaryEngineClause(): DictionaryEngineClauseContext {
		let _localctx: DictionaryEngineClauseContext = new DictionaryEngineClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, ClickHouseParser.RULE_dictionaryEngineClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 728;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.PRIMARY) {
				{
				this.state = 727;
				this.dictionaryPrimaryKeyClause();
				}
			}

			this.state = 737;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.LAYOUT || _la === ClickHouseParser.LIFETIME || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & ((1 << (ClickHouseParser.RANGE - 132)) | (1 << (ClickHouseParser.SETTINGS - 132)) | (1 << (ClickHouseParser.SOURCE - 132)))) !== 0)) {
				{
				this.state = 735;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ClickHouseParser.SOURCE:
					{
					this.state = 730;
					this.sourceClause();
					}
					break;
				case ClickHouseParser.LIFETIME:
					{
					this.state = 731;
					this.lifetimeClause();
					}
					break;
				case ClickHouseParser.LAYOUT:
					{
					this.state = 732;
					this.layoutClause();
					}
					break;
				case ClickHouseParser.RANGE:
					{
					this.state = 733;
					this.rangeClause();
					}
					break;
				case ClickHouseParser.SETTINGS:
					{
					this.state = 734;
					this.dictionarySettingsClause();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 739;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dictionaryPrimaryKeyClause(): DictionaryPrimaryKeyClauseContext {
		let _localctx: DictionaryPrimaryKeyClauseContext = new DictionaryPrimaryKeyClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, ClickHouseParser.RULE_dictionaryPrimaryKeyClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 740;
			this.match(ClickHouseParser.PRIMARY);
			this.state = 741;
			this.match(ClickHouseParser.KEY);
			this.state = 742;
			this.columnExprList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dictionaryArgExpr(): DictionaryArgExprContext {
		let _localctx: DictionaryArgExprContext = new DictionaryArgExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, ClickHouseParser.RULE_dictionaryArgExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 744;
			this.identifier();
			this.state = 751;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.AFTER:
			case ClickHouseParser.ALIAS:
			case ClickHouseParser.ALL:
			case ClickHouseParser.ALTER:
			case ClickHouseParser.AND:
			case ClickHouseParser.ANTI:
			case ClickHouseParser.ANY:
			case ClickHouseParser.ARRAY:
			case ClickHouseParser.AS:
			case ClickHouseParser.ASCENDING:
			case ClickHouseParser.ASOF:
			case ClickHouseParser.AST:
			case ClickHouseParser.ASYNC:
			case ClickHouseParser.ATTACH:
			case ClickHouseParser.BETWEEN:
			case ClickHouseParser.BOTH:
			case ClickHouseParser.BY:
			case ClickHouseParser.CASE:
			case ClickHouseParser.CAST:
			case ClickHouseParser.CHECK:
			case ClickHouseParser.CLEAR:
			case ClickHouseParser.CLUSTER:
			case ClickHouseParser.CODEC:
			case ClickHouseParser.COLLATE:
			case ClickHouseParser.COLUMN:
			case ClickHouseParser.COMMENT:
			case ClickHouseParser.CONSTRAINT:
			case ClickHouseParser.CREATE:
			case ClickHouseParser.CROSS:
			case ClickHouseParser.CUBE:
			case ClickHouseParser.CURRENT:
			case ClickHouseParser.DATABASE:
			case ClickHouseParser.DATABASES:
			case ClickHouseParser.DATE:
			case ClickHouseParser.DAY:
			case ClickHouseParser.DEDUPLICATE:
			case ClickHouseParser.DEFAULT:
			case ClickHouseParser.DELAY:
			case ClickHouseParser.DELETE:
			case ClickHouseParser.DESC:
			case ClickHouseParser.DESCENDING:
			case ClickHouseParser.DESCRIBE:
			case ClickHouseParser.DETACH:
			case ClickHouseParser.DICTIONARIES:
			case ClickHouseParser.DICTIONARY:
			case ClickHouseParser.DISK:
			case ClickHouseParser.DISTINCT:
			case ClickHouseParser.DISTRIBUTED:
			case ClickHouseParser.DROP:
			case ClickHouseParser.ELSE:
			case ClickHouseParser.END:
			case ClickHouseParser.ENGINE:
			case ClickHouseParser.EVENTS:
			case ClickHouseParser.EXISTS:
			case ClickHouseParser.EXPLAIN:
			case ClickHouseParser.EXPRESSION:
			case ClickHouseParser.EXTRACT:
			case ClickHouseParser.FETCHES:
			case ClickHouseParser.FINAL:
			case ClickHouseParser.FIRST:
			case ClickHouseParser.FLUSH:
			case ClickHouseParser.FOLLOWING:
			case ClickHouseParser.FOR:
			case ClickHouseParser.FORMAT:
			case ClickHouseParser.FREEZE:
			case ClickHouseParser.FROM:
			case ClickHouseParser.FULL:
			case ClickHouseParser.FUNCTION:
			case ClickHouseParser.GLOBAL:
			case ClickHouseParser.GRANULARITY:
			case ClickHouseParser.GROUP:
			case ClickHouseParser.HAVING:
			case ClickHouseParser.HIERARCHICAL:
			case ClickHouseParser.HOUR:
			case ClickHouseParser.ID:
			case ClickHouseParser.IF:
			case ClickHouseParser.ILIKE:
			case ClickHouseParser.IN:
			case ClickHouseParser.INDEX:
			case ClickHouseParser.INJECTIVE:
			case ClickHouseParser.INNER:
			case ClickHouseParser.INSERT:
			case ClickHouseParser.INTERVAL:
			case ClickHouseParser.INTO:
			case ClickHouseParser.IS:
			case ClickHouseParser.IS_OBJECT_ID:
			case ClickHouseParser.JOIN:
			case ClickHouseParser.KEY:
			case ClickHouseParser.KILL:
			case ClickHouseParser.LAST:
			case ClickHouseParser.LAYOUT:
			case ClickHouseParser.LEADING:
			case ClickHouseParser.LEFT:
			case ClickHouseParser.LIFETIME:
			case ClickHouseParser.LIKE:
			case ClickHouseParser.LIMIT:
			case ClickHouseParser.LIVE:
			case ClickHouseParser.LOCAL:
			case ClickHouseParser.LOGS:
			case ClickHouseParser.MATERIALIZE:
			case ClickHouseParser.MATERIALIZED:
			case ClickHouseParser.MAX:
			case ClickHouseParser.MERGES:
			case ClickHouseParser.MIN:
			case ClickHouseParser.MINUTE:
			case ClickHouseParser.MODIFY:
			case ClickHouseParser.MONTH:
			case ClickHouseParser.MOVE:
			case ClickHouseParser.MUTATION:
			case ClickHouseParser.NO:
			case ClickHouseParser.NOT:
			case ClickHouseParser.NULLS:
			case ClickHouseParser.OFFSET:
			case ClickHouseParser.ON:
			case ClickHouseParser.OPTIMIZE:
			case ClickHouseParser.OR:
			case ClickHouseParser.ORDER:
			case ClickHouseParser.OUTER:
			case ClickHouseParser.OUTFILE:
			case ClickHouseParser.OVER:
			case ClickHouseParser.PARTITION:
			case ClickHouseParser.POPULATE:
			case ClickHouseParser.PRECEDING:
			case ClickHouseParser.PREWHERE:
			case ClickHouseParser.PRIMARY:
			case ClickHouseParser.QUARTER:
			case ClickHouseParser.RANGE:
			case ClickHouseParser.RELOAD:
			case ClickHouseParser.REMOVE:
			case ClickHouseParser.RENAME:
			case ClickHouseParser.REPLACE:
			case ClickHouseParser.REPLICA:
			case ClickHouseParser.REPLICATED:
			case ClickHouseParser.RIGHT:
			case ClickHouseParser.ROLLUP:
			case ClickHouseParser.ROW:
			case ClickHouseParser.ROWS:
			case ClickHouseParser.SAMPLE:
			case ClickHouseParser.SECOND:
			case ClickHouseParser.SELECT:
			case ClickHouseParser.SEMI:
			case ClickHouseParser.SENDS:
			case ClickHouseParser.SET:
			case ClickHouseParser.SETTINGS:
			case ClickHouseParser.SHOW:
			case ClickHouseParser.SOURCE:
			case ClickHouseParser.START:
			case ClickHouseParser.STOP:
			case ClickHouseParser.SUBSTRING:
			case ClickHouseParser.SYNC:
			case ClickHouseParser.SYNTAX:
			case ClickHouseParser.SYSTEM:
			case ClickHouseParser.TABLE:
			case ClickHouseParser.TABLES:
			case ClickHouseParser.TEMPORARY:
			case ClickHouseParser.TEST:
			case ClickHouseParser.THEN:
			case ClickHouseParser.TIES:
			case ClickHouseParser.TIMEOUT:
			case ClickHouseParser.TIMESTAMP:
			case ClickHouseParser.TO:
			case ClickHouseParser.TOP:
			case ClickHouseParser.TOTALS:
			case ClickHouseParser.TRAILING:
			case ClickHouseParser.TRIM:
			case ClickHouseParser.TRUNCATE:
			case ClickHouseParser.TTL:
			case ClickHouseParser.TYPE:
			case ClickHouseParser.UNBOUNDED:
			case ClickHouseParser.UNION:
			case ClickHouseParser.UPDATE:
			case ClickHouseParser.USE:
			case ClickHouseParser.USING:
			case ClickHouseParser.UUID:
			case ClickHouseParser.VALUES:
			case ClickHouseParser.VIEW:
			case ClickHouseParser.VOLUME:
			case ClickHouseParser.WATCH:
			case ClickHouseParser.WEEK:
			case ClickHouseParser.WHEN:
			case ClickHouseParser.WHERE:
			case ClickHouseParser.WINDOW:
			case ClickHouseParser.WITH:
			case ClickHouseParser.YEAR:
			case ClickHouseParser.JSON_FALSE:
			case ClickHouseParser.JSON_TRUE:
			case ClickHouseParser.IDENTIFIER:
				{
				this.state = 745;
				this.identifier();
				this.state = 748;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.LPAREN) {
					{
					this.state = 746;
					this.match(ClickHouseParser.LPAREN);
					this.state = 747;
					this.match(ClickHouseParser.RPAREN);
					}
				}

				}
				break;
			case ClickHouseParser.INF:
			case ClickHouseParser.NAN_SQL:
			case ClickHouseParser.NULL_SQL:
			case ClickHouseParser.FLOATING_LITERAL:
			case ClickHouseParser.OCTAL_LITERAL:
			case ClickHouseParser.DECIMAL_LITERAL:
			case ClickHouseParser.HEXADECIMAL_LITERAL:
			case ClickHouseParser.STRING_LITERAL:
			case ClickHouseParser.DASH:
			case ClickHouseParser.DOT:
			case ClickHouseParser.PLUS:
				{
				this.state = 750;
				this.literal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sourceClause(): SourceClauseContext {
		let _localctx: SourceClauseContext = new SourceClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, ClickHouseParser.RULE_sourceClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 753;
			this.match(ClickHouseParser.SOURCE);
			this.state = 754;
			this.match(ClickHouseParser.LPAREN);
			this.state = 755;
			this.identifier();
			this.state = 756;
			this.match(ClickHouseParser.LPAREN);
			this.state = 760;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 2)) & ~0x1F) === 0 && ((1 << (_la - 2)) & ((1 << (ClickHouseParser.AFTER - 2)) | (1 << (ClickHouseParser.ALIAS - 2)) | (1 << (ClickHouseParser.ALL - 2)) | (1 << (ClickHouseParser.ALTER - 2)) | (1 << (ClickHouseParser.AND - 2)) | (1 << (ClickHouseParser.ANTI - 2)) | (1 << (ClickHouseParser.ANY - 2)) | (1 << (ClickHouseParser.ARRAY - 2)) | (1 << (ClickHouseParser.AS - 2)) | (1 << (ClickHouseParser.ASCENDING - 2)) | (1 << (ClickHouseParser.ASOF - 2)) | (1 << (ClickHouseParser.AST - 2)) | (1 << (ClickHouseParser.ASYNC - 2)) | (1 << (ClickHouseParser.ATTACH - 2)) | (1 << (ClickHouseParser.BETWEEN - 2)) | (1 << (ClickHouseParser.BOTH - 2)) | (1 << (ClickHouseParser.BY - 2)) | (1 << (ClickHouseParser.CASE - 2)) | (1 << (ClickHouseParser.CAST - 2)) | (1 << (ClickHouseParser.CHECK - 2)) | (1 << (ClickHouseParser.CLEAR - 2)) | (1 << (ClickHouseParser.CLUSTER - 2)) | (1 << (ClickHouseParser.CODEC - 2)) | (1 << (ClickHouseParser.COLLATE - 2)) | (1 << (ClickHouseParser.COLUMN - 2)) | (1 << (ClickHouseParser.COMMENT - 2)) | (1 << (ClickHouseParser.CONSTRAINT - 2)) | (1 << (ClickHouseParser.CREATE - 2)) | (1 << (ClickHouseParser.CROSS - 2)) | (1 << (ClickHouseParser.CUBE - 2)) | (1 << (ClickHouseParser.CURRENT - 2)) | (1 << (ClickHouseParser.DATABASE - 2)))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ClickHouseParser.DATABASES - 34)) | (1 << (ClickHouseParser.DATE - 34)) | (1 << (ClickHouseParser.DAY - 34)) | (1 << (ClickHouseParser.DEDUPLICATE - 34)) | (1 << (ClickHouseParser.DEFAULT - 34)) | (1 << (ClickHouseParser.DELAY - 34)) | (1 << (ClickHouseParser.DELETE - 34)) | (1 << (ClickHouseParser.DESC - 34)) | (1 << (ClickHouseParser.DESCENDING - 34)) | (1 << (ClickHouseParser.DESCRIBE - 34)) | (1 << (ClickHouseParser.DETACH - 34)) | (1 << (ClickHouseParser.DICTIONARIES - 34)) | (1 << (ClickHouseParser.DICTIONARY - 34)) | (1 << (ClickHouseParser.DISK - 34)) | (1 << (ClickHouseParser.DISTINCT - 34)) | (1 << (ClickHouseParser.DISTRIBUTED - 34)) | (1 << (ClickHouseParser.DROP - 34)) | (1 << (ClickHouseParser.ELSE - 34)) | (1 << (ClickHouseParser.END - 34)) | (1 << (ClickHouseParser.ENGINE - 34)) | (1 << (ClickHouseParser.EVENTS - 34)) | (1 << (ClickHouseParser.EXISTS - 34)) | (1 << (ClickHouseParser.EXPLAIN - 34)) | (1 << (ClickHouseParser.EXPRESSION - 34)) | (1 << (ClickHouseParser.EXTRACT - 34)) | (1 << (ClickHouseParser.FETCHES - 34)) | (1 << (ClickHouseParser.FINAL - 34)) | (1 << (ClickHouseParser.FIRST - 34)) | (1 << (ClickHouseParser.FLUSH - 34)) | (1 << (ClickHouseParser.FOLLOWING - 34)) | (1 << (ClickHouseParser.FOR - 34)) | (1 << (ClickHouseParser.FORMAT - 34)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (ClickHouseParser.FREEZE - 66)) | (1 << (ClickHouseParser.FROM - 66)) | (1 << (ClickHouseParser.FULL - 66)) | (1 << (ClickHouseParser.FUNCTION - 66)) | (1 << (ClickHouseParser.GLOBAL - 66)) | (1 << (ClickHouseParser.GRANULARITY - 66)) | (1 << (ClickHouseParser.GROUP - 66)) | (1 << (ClickHouseParser.HAVING - 66)) | (1 << (ClickHouseParser.HIERARCHICAL - 66)) | (1 << (ClickHouseParser.HOUR - 66)) | (1 << (ClickHouseParser.ID - 66)) | (1 << (ClickHouseParser.IF - 66)) | (1 << (ClickHouseParser.ILIKE - 66)) | (1 << (ClickHouseParser.IN - 66)) | (1 << (ClickHouseParser.INDEX - 66)) | (1 << (ClickHouseParser.INJECTIVE - 66)) | (1 << (ClickHouseParser.INNER - 66)) | (1 << (ClickHouseParser.INSERT - 66)) | (1 << (ClickHouseParser.INTERVAL - 66)) | (1 << (ClickHouseParser.INTO - 66)) | (1 << (ClickHouseParser.IS - 66)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 66)) | (1 << (ClickHouseParser.JOIN - 66)) | (1 << (ClickHouseParser.KEY - 66)) | (1 << (ClickHouseParser.KILL - 66)) | (1 << (ClickHouseParser.LAST - 66)) | (1 << (ClickHouseParser.LAYOUT - 66)) | (1 << (ClickHouseParser.LEADING - 66)) | (1 << (ClickHouseParser.LEFT - 66)) | (1 << (ClickHouseParser.LIFETIME - 66)) | (1 << (ClickHouseParser.LIKE - 66)))) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & ((1 << (ClickHouseParser.LIMIT - 98)) | (1 << (ClickHouseParser.LIVE - 98)) | (1 << (ClickHouseParser.LOCAL - 98)) | (1 << (ClickHouseParser.LOGS - 98)) | (1 << (ClickHouseParser.MATERIALIZE - 98)) | (1 << (ClickHouseParser.MATERIALIZED - 98)) | (1 << (ClickHouseParser.MAX - 98)) | (1 << (ClickHouseParser.MERGES - 98)) | (1 << (ClickHouseParser.MIN - 98)) | (1 << (ClickHouseParser.MINUTE - 98)) | (1 << (ClickHouseParser.MODIFY - 98)) | (1 << (ClickHouseParser.MONTH - 98)) | (1 << (ClickHouseParser.MOVE - 98)) | (1 << (ClickHouseParser.MUTATION - 98)) | (1 << (ClickHouseParser.NO - 98)) | (1 << (ClickHouseParser.NOT - 98)) | (1 << (ClickHouseParser.NULLS - 98)) | (1 << (ClickHouseParser.OFFSET - 98)) | (1 << (ClickHouseParser.ON - 98)) | (1 << (ClickHouseParser.OPTIMIZE - 98)) | (1 << (ClickHouseParser.OR - 98)) | (1 << (ClickHouseParser.ORDER - 98)) | (1 << (ClickHouseParser.OUTER - 98)) | (1 << (ClickHouseParser.OUTFILE - 98)) | (1 << (ClickHouseParser.OVER - 98)) | (1 << (ClickHouseParser.PARTITION - 98)) | (1 << (ClickHouseParser.POPULATE - 98)) | (1 << (ClickHouseParser.PRECEDING - 98)) | (1 << (ClickHouseParser.PREWHERE - 98)) | (1 << (ClickHouseParser.PRIMARY - 98)))) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & ((1 << (ClickHouseParser.QUARTER - 131)) | (1 << (ClickHouseParser.RANGE - 131)) | (1 << (ClickHouseParser.RELOAD - 131)) | (1 << (ClickHouseParser.REMOVE - 131)) | (1 << (ClickHouseParser.RENAME - 131)) | (1 << (ClickHouseParser.REPLACE - 131)) | (1 << (ClickHouseParser.REPLICA - 131)) | (1 << (ClickHouseParser.REPLICATED - 131)) | (1 << (ClickHouseParser.RIGHT - 131)) | (1 << (ClickHouseParser.ROLLUP - 131)) | (1 << (ClickHouseParser.ROW - 131)) | (1 << (ClickHouseParser.ROWS - 131)) | (1 << (ClickHouseParser.SAMPLE - 131)) | (1 << (ClickHouseParser.SECOND - 131)) | (1 << (ClickHouseParser.SELECT - 131)) | (1 << (ClickHouseParser.SEMI - 131)) | (1 << (ClickHouseParser.SENDS - 131)) | (1 << (ClickHouseParser.SET - 131)) | (1 << (ClickHouseParser.SETTINGS - 131)) | (1 << (ClickHouseParser.SHOW - 131)) | (1 << (ClickHouseParser.SOURCE - 131)) | (1 << (ClickHouseParser.START - 131)) | (1 << (ClickHouseParser.STOP - 131)) | (1 << (ClickHouseParser.SUBSTRING - 131)) | (1 << (ClickHouseParser.SYNC - 131)) | (1 << (ClickHouseParser.SYNTAX - 131)) | (1 << (ClickHouseParser.SYSTEM - 131)) | (1 << (ClickHouseParser.TABLE - 131)) | (1 << (ClickHouseParser.TABLES - 131)) | (1 << (ClickHouseParser.TEMPORARY - 131)) | (1 << (ClickHouseParser.TEST - 131)) | (1 << (ClickHouseParser.THEN - 131)))) !== 0) || ((((_la - 163)) & ~0x1F) === 0 && ((1 << (_la - 163)) & ((1 << (ClickHouseParser.TIES - 163)) | (1 << (ClickHouseParser.TIMEOUT - 163)) | (1 << (ClickHouseParser.TIMESTAMP - 163)) | (1 << (ClickHouseParser.TO - 163)) | (1 << (ClickHouseParser.TOP - 163)) | (1 << (ClickHouseParser.TOTALS - 163)) | (1 << (ClickHouseParser.TRAILING - 163)) | (1 << (ClickHouseParser.TRIM - 163)) | (1 << (ClickHouseParser.TRUNCATE - 163)) | (1 << (ClickHouseParser.TTL - 163)) | (1 << (ClickHouseParser.TYPE - 163)) | (1 << (ClickHouseParser.UNBOUNDED - 163)) | (1 << (ClickHouseParser.UNION - 163)) | (1 << (ClickHouseParser.UPDATE - 163)) | (1 << (ClickHouseParser.USE - 163)) | (1 << (ClickHouseParser.USING - 163)) | (1 << (ClickHouseParser.UUID - 163)) | (1 << (ClickHouseParser.VALUES - 163)) | (1 << (ClickHouseParser.VIEW - 163)) | (1 << (ClickHouseParser.VOLUME - 163)) | (1 << (ClickHouseParser.WATCH - 163)) | (1 << (ClickHouseParser.WEEK - 163)) | (1 << (ClickHouseParser.WHEN - 163)) | (1 << (ClickHouseParser.WHERE - 163)) | (1 << (ClickHouseParser.WINDOW - 163)) | (1 << (ClickHouseParser.WITH - 163)) | (1 << (ClickHouseParser.YEAR - 163)) | (1 << (ClickHouseParser.JSON_FALSE - 163)) | (1 << (ClickHouseParser.JSON_TRUE - 163)) | (1 << (ClickHouseParser.IDENTIFIER - 163)))) !== 0)) {
				{
				{
				this.state = 757;
				this.dictionaryArgExpr();
				}
				}
				this.state = 762;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 763;
			this.match(ClickHouseParser.RPAREN);
			this.state = 764;
			this.match(ClickHouseParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lifetimeClause(): LifetimeClauseContext {
		let _localctx: LifetimeClauseContext = new LifetimeClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, ClickHouseParser.RULE_lifetimeClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 766;
			this.match(ClickHouseParser.LIFETIME);
			this.state = 767;
			this.match(ClickHouseParser.LPAREN);
			this.state = 777;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.DECIMAL_LITERAL:
				{
				this.state = 768;
				this.match(ClickHouseParser.DECIMAL_LITERAL);
				}
				break;
			case ClickHouseParser.MIN:
				{
				this.state = 769;
				this.match(ClickHouseParser.MIN);
				this.state = 770;
				this.match(ClickHouseParser.DECIMAL_LITERAL);
				this.state = 771;
				this.match(ClickHouseParser.MAX);
				this.state = 772;
				this.match(ClickHouseParser.DECIMAL_LITERAL);
				}
				break;
			case ClickHouseParser.MAX:
				{
				this.state = 773;
				this.match(ClickHouseParser.MAX);
				this.state = 774;
				this.match(ClickHouseParser.DECIMAL_LITERAL);
				this.state = 775;
				this.match(ClickHouseParser.MIN);
				this.state = 776;
				this.match(ClickHouseParser.DECIMAL_LITERAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 779;
			this.match(ClickHouseParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public layoutClause(): LayoutClauseContext {
		let _localctx: LayoutClauseContext = new LayoutClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, ClickHouseParser.RULE_layoutClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 781;
			this.match(ClickHouseParser.LAYOUT);
			this.state = 782;
			this.match(ClickHouseParser.LPAREN);
			this.state = 783;
			this.identifier();
			this.state = 784;
			this.match(ClickHouseParser.LPAREN);
			this.state = 788;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 2)) & ~0x1F) === 0 && ((1 << (_la - 2)) & ((1 << (ClickHouseParser.AFTER - 2)) | (1 << (ClickHouseParser.ALIAS - 2)) | (1 << (ClickHouseParser.ALL - 2)) | (1 << (ClickHouseParser.ALTER - 2)) | (1 << (ClickHouseParser.AND - 2)) | (1 << (ClickHouseParser.ANTI - 2)) | (1 << (ClickHouseParser.ANY - 2)) | (1 << (ClickHouseParser.ARRAY - 2)) | (1 << (ClickHouseParser.AS - 2)) | (1 << (ClickHouseParser.ASCENDING - 2)) | (1 << (ClickHouseParser.ASOF - 2)) | (1 << (ClickHouseParser.AST - 2)) | (1 << (ClickHouseParser.ASYNC - 2)) | (1 << (ClickHouseParser.ATTACH - 2)) | (1 << (ClickHouseParser.BETWEEN - 2)) | (1 << (ClickHouseParser.BOTH - 2)) | (1 << (ClickHouseParser.BY - 2)) | (1 << (ClickHouseParser.CASE - 2)) | (1 << (ClickHouseParser.CAST - 2)) | (1 << (ClickHouseParser.CHECK - 2)) | (1 << (ClickHouseParser.CLEAR - 2)) | (1 << (ClickHouseParser.CLUSTER - 2)) | (1 << (ClickHouseParser.CODEC - 2)) | (1 << (ClickHouseParser.COLLATE - 2)) | (1 << (ClickHouseParser.COLUMN - 2)) | (1 << (ClickHouseParser.COMMENT - 2)) | (1 << (ClickHouseParser.CONSTRAINT - 2)) | (1 << (ClickHouseParser.CREATE - 2)) | (1 << (ClickHouseParser.CROSS - 2)) | (1 << (ClickHouseParser.CUBE - 2)) | (1 << (ClickHouseParser.CURRENT - 2)) | (1 << (ClickHouseParser.DATABASE - 2)))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ClickHouseParser.DATABASES - 34)) | (1 << (ClickHouseParser.DATE - 34)) | (1 << (ClickHouseParser.DAY - 34)) | (1 << (ClickHouseParser.DEDUPLICATE - 34)) | (1 << (ClickHouseParser.DEFAULT - 34)) | (1 << (ClickHouseParser.DELAY - 34)) | (1 << (ClickHouseParser.DELETE - 34)) | (1 << (ClickHouseParser.DESC - 34)) | (1 << (ClickHouseParser.DESCENDING - 34)) | (1 << (ClickHouseParser.DESCRIBE - 34)) | (1 << (ClickHouseParser.DETACH - 34)) | (1 << (ClickHouseParser.DICTIONARIES - 34)) | (1 << (ClickHouseParser.DICTIONARY - 34)) | (1 << (ClickHouseParser.DISK - 34)) | (1 << (ClickHouseParser.DISTINCT - 34)) | (1 << (ClickHouseParser.DISTRIBUTED - 34)) | (1 << (ClickHouseParser.DROP - 34)) | (1 << (ClickHouseParser.ELSE - 34)) | (1 << (ClickHouseParser.END - 34)) | (1 << (ClickHouseParser.ENGINE - 34)) | (1 << (ClickHouseParser.EVENTS - 34)) | (1 << (ClickHouseParser.EXISTS - 34)) | (1 << (ClickHouseParser.EXPLAIN - 34)) | (1 << (ClickHouseParser.EXPRESSION - 34)) | (1 << (ClickHouseParser.EXTRACT - 34)) | (1 << (ClickHouseParser.FETCHES - 34)) | (1 << (ClickHouseParser.FINAL - 34)) | (1 << (ClickHouseParser.FIRST - 34)) | (1 << (ClickHouseParser.FLUSH - 34)) | (1 << (ClickHouseParser.FOLLOWING - 34)) | (1 << (ClickHouseParser.FOR - 34)) | (1 << (ClickHouseParser.FORMAT - 34)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (ClickHouseParser.FREEZE - 66)) | (1 << (ClickHouseParser.FROM - 66)) | (1 << (ClickHouseParser.FULL - 66)) | (1 << (ClickHouseParser.FUNCTION - 66)) | (1 << (ClickHouseParser.GLOBAL - 66)) | (1 << (ClickHouseParser.GRANULARITY - 66)) | (1 << (ClickHouseParser.GROUP - 66)) | (1 << (ClickHouseParser.HAVING - 66)) | (1 << (ClickHouseParser.HIERARCHICAL - 66)) | (1 << (ClickHouseParser.HOUR - 66)) | (1 << (ClickHouseParser.ID - 66)) | (1 << (ClickHouseParser.IF - 66)) | (1 << (ClickHouseParser.ILIKE - 66)) | (1 << (ClickHouseParser.IN - 66)) | (1 << (ClickHouseParser.INDEX - 66)) | (1 << (ClickHouseParser.INJECTIVE - 66)) | (1 << (ClickHouseParser.INNER - 66)) | (1 << (ClickHouseParser.INSERT - 66)) | (1 << (ClickHouseParser.INTERVAL - 66)) | (1 << (ClickHouseParser.INTO - 66)) | (1 << (ClickHouseParser.IS - 66)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 66)) | (1 << (ClickHouseParser.JOIN - 66)) | (1 << (ClickHouseParser.KEY - 66)) | (1 << (ClickHouseParser.KILL - 66)) | (1 << (ClickHouseParser.LAST - 66)) | (1 << (ClickHouseParser.LAYOUT - 66)) | (1 << (ClickHouseParser.LEADING - 66)) | (1 << (ClickHouseParser.LEFT - 66)) | (1 << (ClickHouseParser.LIFETIME - 66)) | (1 << (ClickHouseParser.LIKE - 66)))) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & ((1 << (ClickHouseParser.LIMIT - 98)) | (1 << (ClickHouseParser.LIVE - 98)) | (1 << (ClickHouseParser.LOCAL - 98)) | (1 << (ClickHouseParser.LOGS - 98)) | (1 << (ClickHouseParser.MATERIALIZE - 98)) | (1 << (ClickHouseParser.MATERIALIZED - 98)) | (1 << (ClickHouseParser.MAX - 98)) | (1 << (ClickHouseParser.MERGES - 98)) | (1 << (ClickHouseParser.MIN - 98)) | (1 << (ClickHouseParser.MINUTE - 98)) | (1 << (ClickHouseParser.MODIFY - 98)) | (1 << (ClickHouseParser.MONTH - 98)) | (1 << (ClickHouseParser.MOVE - 98)) | (1 << (ClickHouseParser.MUTATION - 98)) | (1 << (ClickHouseParser.NO - 98)) | (1 << (ClickHouseParser.NOT - 98)) | (1 << (ClickHouseParser.NULLS - 98)) | (1 << (ClickHouseParser.OFFSET - 98)) | (1 << (ClickHouseParser.ON - 98)) | (1 << (ClickHouseParser.OPTIMIZE - 98)) | (1 << (ClickHouseParser.OR - 98)) | (1 << (ClickHouseParser.ORDER - 98)) | (1 << (ClickHouseParser.OUTER - 98)) | (1 << (ClickHouseParser.OUTFILE - 98)) | (1 << (ClickHouseParser.OVER - 98)) | (1 << (ClickHouseParser.PARTITION - 98)) | (1 << (ClickHouseParser.POPULATE - 98)) | (1 << (ClickHouseParser.PRECEDING - 98)) | (1 << (ClickHouseParser.PREWHERE - 98)) | (1 << (ClickHouseParser.PRIMARY - 98)))) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & ((1 << (ClickHouseParser.QUARTER - 131)) | (1 << (ClickHouseParser.RANGE - 131)) | (1 << (ClickHouseParser.RELOAD - 131)) | (1 << (ClickHouseParser.REMOVE - 131)) | (1 << (ClickHouseParser.RENAME - 131)) | (1 << (ClickHouseParser.REPLACE - 131)) | (1 << (ClickHouseParser.REPLICA - 131)) | (1 << (ClickHouseParser.REPLICATED - 131)) | (1 << (ClickHouseParser.RIGHT - 131)) | (1 << (ClickHouseParser.ROLLUP - 131)) | (1 << (ClickHouseParser.ROW - 131)) | (1 << (ClickHouseParser.ROWS - 131)) | (1 << (ClickHouseParser.SAMPLE - 131)) | (1 << (ClickHouseParser.SECOND - 131)) | (1 << (ClickHouseParser.SELECT - 131)) | (1 << (ClickHouseParser.SEMI - 131)) | (1 << (ClickHouseParser.SENDS - 131)) | (1 << (ClickHouseParser.SET - 131)) | (1 << (ClickHouseParser.SETTINGS - 131)) | (1 << (ClickHouseParser.SHOW - 131)) | (1 << (ClickHouseParser.SOURCE - 131)) | (1 << (ClickHouseParser.START - 131)) | (1 << (ClickHouseParser.STOP - 131)) | (1 << (ClickHouseParser.SUBSTRING - 131)) | (1 << (ClickHouseParser.SYNC - 131)) | (1 << (ClickHouseParser.SYNTAX - 131)) | (1 << (ClickHouseParser.SYSTEM - 131)) | (1 << (ClickHouseParser.TABLE - 131)) | (1 << (ClickHouseParser.TABLES - 131)) | (1 << (ClickHouseParser.TEMPORARY - 131)) | (1 << (ClickHouseParser.TEST - 131)) | (1 << (ClickHouseParser.THEN - 131)))) !== 0) || ((((_la - 163)) & ~0x1F) === 0 && ((1 << (_la - 163)) & ((1 << (ClickHouseParser.TIES - 163)) | (1 << (ClickHouseParser.TIMEOUT - 163)) | (1 << (ClickHouseParser.TIMESTAMP - 163)) | (1 << (ClickHouseParser.TO - 163)) | (1 << (ClickHouseParser.TOP - 163)) | (1 << (ClickHouseParser.TOTALS - 163)) | (1 << (ClickHouseParser.TRAILING - 163)) | (1 << (ClickHouseParser.TRIM - 163)) | (1 << (ClickHouseParser.TRUNCATE - 163)) | (1 << (ClickHouseParser.TTL - 163)) | (1 << (ClickHouseParser.TYPE - 163)) | (1 << (ClickHouseParser.UNBOUNDED - 163)) | (1 << (ClickHouseParser.UNION - 163)) | (1 << (ClickHouseParser.UPDATE - 163)) | (1 << (ClickHouseParser.USE - 163)) | (1 << (ClickHouseParser.USING - 163)) | (1 << (ClickHouseParser.UUID - 163)) | (1 << (ClickHouseParser.VALUES - 163)) | (1 << (ClickHouseParser.VIEW - 163)) | (1 << (ClickHouseParser.VOLUME - 163)) | (1 << (ClickHouseParser.WATCH - 163)) | (1 << (ClickHouseParser.WEEK - 163)) | (1 << (ClickHouseParser.WHEN - 163)) | (1 << (ClickHouseParser.WHERE - 163)) | (1 << (ClickHouseParser.WINDOW - 163)) | (1 << (ClickHouseParser.WITH - 163)) | (1 << (ClickHouseParser.YEAR - 163)) | (1 << (ClickHouseParser.JSON_FALSE - 163)) | (1 << (ClickHouseParser.JSON_TRUE - 163)) | (1 << (ClickHouseParser.IDENTIFIER - 163)))) !== 0)) {
				{
				{
				this.state = 785;
				this.dictionaryArgExpr();
				}
				}
				this.state = 790;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 791;
			this.match(ClickHouseParser.RPAREN);
			this.state = 792;
			this.match(ClickHouseParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rangeClause(): RangeClauseContext {
		let _localctx: RangeClauseContext = new RangeClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, ClickHouseParser.RULE_rangeClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 794;
			this.match(ClickHouseParser.RANGE);
			this.state = 795;
			this.match(ClickHouseParser.LPAREN);
			this.state = 806;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.MIN:
				{
				this.state = 796;
				this.match(ClickHouseParser.MIN);
				this.state = 797;
				this.identifier();
				this.state = 798;
				this.match(ClickHouseParser.MAX);
				this.state = 799;
				this.identifier();
				}
				break;
			case ClickHouseParser.MAX:
				{
				this.state = 801;
				this.match(ClickHouseParser.MAX);
				this.state = 802;
				this.identifier();
				this.state = 803;
				this.match(ClickHouseParser.MIN);
				this.state = 804;
				this.identifier();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 808;
			this.match(ClickHouseParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dictionarySettingsClause(): DictionarySettingsClauseContext {
		let _localctx: DictionarySettingsClauseContext = new DictionarySettingsClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, ClickHouseParser.RULE_dictionarySettingsClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 810;
			this.match(ClickHouseParser.SETTINGS);
			this.state = 811;
			this.match(ClickHouseParser.LPAREN);
			this.state = 812;
			this.settingExprList();
			this.state = 813;
			this.match(ClickHouseParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public clusterClause(): ClusterClauseContext {
		let _localctx: ClusterClauseContext = new ClusterClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, ClickHouseParser.RULE_clusterClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 815;
			this.match(ClickHouseParser.ON);
			this.state = 816;
			this.match(ClickHouseParser.CLUSTER);
			this.state = 819;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.AFTER:
			case ClickHouseParser.ALIAS:
			case ClickHouseParser.ALL:
			case ClickHouseParser.ALTER:
			case ClickHouseParser.AND:
			case ClickHouseParser.ANTI:
			case ClickHouseParser.ANY:
			case ClickHouseParser.ARRAY:
			case ClickHouseParser.AS:
			case ClickHouseParser.ASCENDING:
			case ClickHouseParser.ASOF:
			case ClickHouseParser.AST:
			case ClickHouseParser.ASYNC:
			case ClickHouseParser.ATTACH:
			case ClickHouseParser.BETWEEN:
			case ClickHouseParser.BOTH:
			case ClickHouseParser.BY:
			case ClickHouseParser.CASE:
			case ClickHouseParser.CAST:
			case ClickHouseParser.CHECK:
			case ClickHouseParser.CLEAR:
			case ClickHouseParser.CLUSTER:
			case ClickHouseParser.CODEC:
			case ClickHouseParser.COLLATE:
			case ClickHouseParser.COLUMN:
			case ClickHouseParser.COMMENT:
			case ClickHouseParser.CONSTRAINT:
			case ClickHouseParser.CREATE:
			case ClickHouseParser.CROSS:
			case ClickHouseParser.CUBE:
			case ClickHouseParser.CURRENT:
			case ClickHouseParser.DATABASE:
			case ClickHouseParser.DATABASES:
			case ClickHouseParser.DATE:
			case ClickHouseParser.DAY:
			case ClickHouseParser.DEDUPLICATE:
			case ClickHouseParser.DEFAULT:
			case ClickHouseParser.DELAY:
			case ClickHouseParser.DELETE:
			case ClickHouseParser.DESC:
			case ClickHouseParser.DESCENDING:
			case ClickHouseParser.DESCRIBE:
			case ClickHouseParser.DETACH:
			case ClickHouseParser.DICTIONARIES:
			case ClickHouseParser.DICTIONARY:
			case ClickHouseParser.DISK:
			case ClickHouseParser.DISTINCT:
			case ClickHouseParser.DISTRIBUTED:
			case ClickHouseParser.DROP:
			case ClickHouseParser.ELSE:
			case ClickHouseParser.END:
			case ClickHouseParser.ENGINE:
			case ClickHouseParser.EVENTS:
			case ClickHouseParser.EXISTS:
			case ClickHouseParser.EXPLAIN:
			case ClickHouseParser.EXPRESSION:
			case ClickHouseParser.EXTRACT:
			case ClickHouseParser.FETCHES:
			case ClickHouseParser.FINAL:
			case ClickHouseParser.FIRST:
			case ClickHouseParser.FLUSH:
			case ClickHouseParser.FOLLOWING:
			case ClickHouseParser.FOR:
			case ClickHouseParser.FORMAT:
			case ClickHouseParser.FREEZE:
			case ClickHouseParser.FROM:
			case ClickHouseParser.FULL:
			case ClickHouseParser.FUNCTION:
			case ClickHouseParser.GLOBAL:
			case ClickHouseParser.GRANULARITY:
			case ClickHouseParser.GROUP:
			case ClickHouseParser.HAVING:
			case ClickHouseParser.HIERARCHICAL:
			case ClickHouseParser.HOUR:
			case ClickHouseParser.ID:
			case ClickHouseParser.IF:
			case ClickHouseParser.ILIKE:
			case ClickHouseParser.IN:
			case ClickHouseParser.INDEX:
			case ClickHouseParser.INJECTIVE:
			case ClickHouseParser.INNER:
			case ClickHouseParser.INSERT:
			case ClickHouseParser.INTERVAL:
			case ClickHouseParser.INTO:
			case ClickHouseParser.IS:
			case ClickHouseParser.IS_OBJECT_ID:
			case ClickHouseParser.JOIN:
			case ClickHouseParser.KEY:
			case ClickHouseParser.KILL:
			case ClickHouseParser.LAST:
			case ClickHouseParser.LAYOUT:
			case ClickHouseParser.LEADING:
			case ClickHouseParser.LEFT:
			case ClickHouseParser.LIFETIME:
			case ClickHouseParser.LIKE:
			case ClickHouseParser.LIMIT:
			case ClickHouseParser.LIVE:
			case ClickHouseParser.LOCAL:
			case ClickHouseParser.LOGS:
			case ClickHouseParser.MATERIALIZE:
			case ClickHouseParser.MATERIALIZED:
			case ClickHouseParser.MAX:
			case ClickHouseParser.MERGES:
			case ClickHouseParser.MIN:
			case ClickHouseParser.MINUTE:
			case ClickHouseParser.MODIFY:
			case ClickHouseParser.MONTH:
			case ClickHouseParser.MOVE:
			case ClickHouseParser.MUTATION:
			case ClickHouseParser.NO:
			case ClickHouseParser.NOT:
			case ClickHouseParser.NULLS:
			case ClickHouseParser.OFFSET:
			case ClickHouseParser.ON:
			case ClickHouseParser.OPTIMIZE:
			case ClickHouseParser.OR:
			case ClickHouseParser.ORDER:
			case ClickHouseParser.OUTER:
			case ClickHouseParser.OUTFILE:
			case ClickHouseParser.OVER:
			case ClickHouseParser.PARTITION:
			case ClickHouseParser.POPULATE:
			case ClickHouseParser.PRECEDING:
			case ClickHouseParser.PREWHERE:
			case ClickHouseParser.PRIMARY:
			case ClickHouseParser.QUARTER:
			case ClickHouseParser.RANGE:
			case ClickHouseParser.RELOAD:
			case ClickHouseParser.REMOVE:
			case ClickHouseParser.RENAME:
			case ClickHouseParser.REPLACE:
			case ClickHouseParser.REPLICA:
			case ClickHouseParser.REPLICATED:
			case ClickHouseParser.RIGHT:
			case ClickHouseParser.ROLLUP:
			case ClickHouseParser.ROW:
			case ClickHouseParser.ROWS:
			case ClickHouseParser.SAMPLE:
			case ClickHouseParser.SECOND:
			case ClickHouseParser.SELECT:
			case ClickHouseParser.SEMI:
			case ClickHouseParser.SENDS:
			case ClickHouseParser.SET:
			case ClickHouseParser.SETTINGS:
			case ClickHouseParser.SHOW:
			case ClickHouseParser.SOURCE:
			case ClickHouseParser.START:
			case ClickHouseParser.STOP:
			case ClickHouseParser.SUBSTRING:
			case ClickHouseParser.SYNC:
			case ClickHouseParser.SYNTAX:
			case ClickHouseParser.SYSTEM:
			case ClickHouseParser.TABLE:
			case ClickHouseParser.TABLES:
			case ClickHouseParser.TEMPORARY:
			case ClickHouseParser.TEST:
			case ClickHouseParser.THEN:
			case ClickHouseParser.TIES:
			case ClickHouseParser.TIMEOUT:
			case ClickHouseParser.TIMESTAMP:
			case ClickHouseParser.TO:
			case ClickHouseParser.TOP:
			case ClickHouseParser.TOTALS:
			case ClickHouseParser.TRAILING:
			case ClickHouseParser.TRIM:
			case ClickHouseParser.TRUNCATE:
			case ClickHouseParser.TTL:
			case ClickHouseParser.TYPE:
			case ClickHouseParser.UNBOUNDED:
			case ClickHouseParser.UNION:
			case ClickHouseParser.UPDATE:
			case ClickHouseParser.USE:
			case ClickHouseParser.USING:
			case ClickHouseParser.UUID:
			case ClickHouseParser.VALUES:
			case ClickHouseParser.VIEW:
			case ClickHouseParser.VOLUME:
			case ClickHouseParser.WATCH:
			case ClickHouseParser.WEEK:
			case ClickHouseParser.WHEN:
			case ClickHouseParser.WHERE:
			case ClickHouseParser.WINDOW:
			case ClickHouseParser.WITH:
			case ClickHouseParser.YEAR:
			case ClickHouseParser.JSON_FALSE:
			case ClickHouseParser.JSON_TRUE:
			case ClickHouseParser.IDENTIFIER:
				{
				this.state = 817;
				this.identifier();
				}
				break;
			case ClickHouseParser.STRING_LITERAL:
				{
				this.state = 818;
				this.match(ClickHouseParser.STRING_LITERAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public uuidClause(): UuidClauseContext {
		let _localctx: UuidClauseContext = new UuidClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, ClickHouseParser.RULE_uuidClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 821;
			this.match(ClickHouseParser.UUID);
			this.state = 822;
			this.match(ClickHouseParser.STRING_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public destinationClause(): DestinationClauseContext {
		let _localctx: DestinationClauseContext = new DestinationClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, ClickHouseParser.RULE_destinationClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 824;
			this.match(ClickHouseParser.TO);
			this.state = 825;
			this.tableIdentifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subqueryClause(): SubqueryClauseContext {
		let _localctx: SubqueryClauseContext = new SubqueryClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, ClickHouseParser.RULE_subqueryClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 827;
			this.match(ClickHouseParser.AS);
			this.state = 828;
			this.selectUnionStmt();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableSchemaClause(): TableSchemaClauseContext {
		let _localctx: TableSchemaClauseContext = new TableSchemaClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, ClickHouseParser.RULE_tableSchemaClause);
		let _la: number;
		try {
			this.state = 845;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 92, this._ctx) ) {
			case 1:
				_localctx = new SchemaDescriptionClauseContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 830;
				this.match(ClickHouseParser.LPAREN);
				this.state = 831;
				this.tableElementExpr();
				this.state = 836;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ClickHouseParser.COMMA) {
					{
					{
					this.state = 832;
					this.match(ClickHouseParser.COMMA);
					this.state = 833;
					this.tableElementExpr();
					}
					}
					this.state = 838;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 839;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 2:
				_localctx = new SchemaAsTableClauseContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 841;
				this.match(ClickHouseParser.AS);
				this.state = 842;
				this.tableIdentifier();
				}
				break;

			case 3:
				_localctx = new SchemaAsFunctionClauseContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 843;
				this.match(ClickHouseParser.AS);
				this.state = 844;
				this.tableFunctionExpr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public engineClause(): EngineClauseContext {
		let _localctx: EngineClauseContext = new EngineClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, ClickHouseParser.RULE_engineClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 847;
			this.engineExpr();
			this.state = 849;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ORDER) {
				{
				this.state = 848;
				this.orderByClause();
				}
			}

			this.state = 852;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.PARTITION) {
				{
				this.state = 851;
				this.partitionByClause();
				}
			}

			this.state = 855;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.PRIMARY) {
				{
				this.state = 854;
				this.primaryKeyClause();
				}
			}

			this.state = 858;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.SAMPLE) {
				{
				this.state = 857;
				this.sampleByClause();
				}
			}

			this.state = 861;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.TTL) {
				{
				this.state = 860;
				this.ttlClause();
				}
			}

			this.state = 864;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.SETTINGS) {
				{
				this.state = 863;
				this.settingsClause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public partitionByClause(): PartitionByClauseContext {
		let _localctx: PartitionByClauseContext = new PartitionByClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, ClickHouseParser.RULE_partitionByClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 866;
			this.match(ClickHouseParser.PARTITION);
			this.state = 867;
			this.match(ClickHouseParser.BY);
			this.state = 868;
			this.columnExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primaryKeyClause(): PrimaryKeyClauseContext {
		let _localctx: PrimaryKeyClauseContext = new PrimaryKeyClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, ClickHouseParser.RULE_primaryKeyClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 870;
			this.match(ClickHouseParser.PRIMARY);
			this.state = 871;
			this.match(ClickHouseParser.KEY);
			this.state = 872;
			this.columnExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sampleByClause(): SampleByClauseContext {
		let _localctx: SampleByClauseContext = new SampleByClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, ClickHouseParser.RULE_sampleByClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 874;
			this.match(ClickHouseParser.SAMPLE);
			this.state = 875;
			this.match(ClickHouseParser.BY);
			this.state = 876;
			this.columnExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ttlClause(): TtlClauseContext {
		let _localctx: TtlClauseContext = new TtlClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, ClickHouseParser.RULE_ttlClause);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 878;
			this.match(ClickHouseParser.TTL);
			this.state = 879;
			this.ttlExpr();
			this.state = 884;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 99, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 880;
					this.match(ClickHouseParser.COMMA);
					this.state = 881;
					this.ttlExpr();
					}
					}
				}
				this.state = 886;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 99, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public engineExpr(): EngineExprContext {
		let _localctx: EngineExprContext = new EngineExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, ClickHouseParser.RULE_engineExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 887;
			this.match(ClickHouseParser.ENGINE);
			this.state = 889;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.EQ_SINGLE) {
				{
				this.state = 888;
				this.match(ClickHouseParser.EQ_SINGLE);
				}
			}

			this.state = 891;
			this.identifierOrNull();
			this.state = 897;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 102, this._ctx) ) {
			case 1:
				{
				this.state = 892;
				this.match(ClickHouseParser.LPAREN);
				this.state = 894;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.AFTER) | (1 << ClickHouseParser.ALIAS) | (1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ALTER) | (1 << ClickHouseParser.AND) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ARRAY) | (1 << ClickHouseParser.AS) | (1 << ClickHouseParser.ASCENDING) | (1 << ClickHouseParser.ASOF) | (1 << ClickHouseParser.AST) | (1 << ClickHouseParser.ASYNC) | (1 << ClickHouseParser.ATTACH) | (1 << ClickHouseParser.BETWEEN) | (1 << ClickHouseParser.BOTH) | (1 << ClickHouseParser.BY) | (1 << ClickHouseParser.CASE) | (1 << ClickHouseParser.CAST) | (1 << ClickHouseParser.CHECK) | (1 << ClickHouseParser.CLEAR) | (1 << ClickHouseParser.CLUSTER) | (1 << ClickHouseParser.CODEC) | (1 << ClickHouseParser.COLLATE) | (1 << ClickHouseParser.COLUMN) | (1 << ClickHouseParser.COMMENT) | (1 << ClickHouseParser.CONSTRAINT) | (1 << ClickHouseParser.CREATE) | (1 << ClickHouseParser.CROSS) | (1 << ClickHouseParser.CUBE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ClickHouseParser.CURRENT - 32)) | (1 << (ClickHouseParser.DATABASE - 32)) | (1 << (ClickHouseParser.DATABASES - 32)) | (1 << (ClickHouseParser.DATE - 32)) | (1 << (ClickHouseParser.DAY - 32)) | (1 << (ClickHouseParser.DEDUPLICATE - 32)) | (1 << (ClickHouseParser.DEFAULT - 32)) | (1 << (ClickHouseParser.DELAY - 32)) | (1 << (ClickHouseParser.DELETE - 32)) | (1 << (ClickHouseParser.DESC - 32)) | (1 << (ClickHouseParser.DESCENDING - 32)) | (1 << (ClickHouseParser.DESCRIBE - 32)) | (1 << (ClickHouseParser.DETACH - 32)) | (1 << (ClickHouseParser.DICTIONARIES - 32)) | (1 << (ClickHouseParser.DICTIONARY - 32)) | (1 << (ClickHouseParser.DISK - 32)) | (1 << (ClickHouseParser.DISTINCT - 32)) | (1 << (ClickHouseParser.DISTRIBUTED - 32)) | (1 << (ClickHouseParser.DROP - 32)) | (1 << (ClickHouseParser.ELSE - 32)) | (1 << (ClickHouseParser.END - 32)) | (1 << (ClickHouseParser.ENGINE - 32)) | (1 << (ClickHouseParser.EVENTS - 32)) | (1 << (ClickHouseParser.EXISTS - 32)) | (1 << (ClickHouseParser.EXPLAIN - 32)) | (1 << (ClickHouseParser.EXPRESSION - 32)) | (1 << (ClickHouseParser.EXTRACT - 32)) | (1 << (ClickHouseParser.FETCHES - 32)) | (1 << (ClickHouseParser.FINAL - 32)) | (1 << (ClickHouseParser.FIRST - 32)) | (1 << (ClickHouseParser.FLUSH - 32)) | (1 << (ClickHouseParser.FOLLOWING - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ClickHouseParser.FOR - 64)) | (1 << (ClickHouseParser.FORMAT - 64)) | (1 << (ClickHouseParser.FREEZE - 64)) | (1 << (ClickHouseParser.FROM - 64)) | (1 << (ClickHouseParser.FULL - 64)) | (1 << (ClickHouseParser.FUNCTION - 64)) | (1 << (ClickHouseParser.GLOBAL - 64)) | (1 << (ClickHouseParser.GRANULARITY - 64)) | (1 << (ClickHouseParser.GROUP - 64)) | (1 << (ClickHouseParser.HAVING - 64)) | (1 << (ClickHouseParser.HIERARCHICAL - 64)) | (1 << (ClickHouseParser.HOUR - 64)) | (1 << (ClickHouseParser.ID - 64)) | (1 << (ClickHouseParser.IF - 64)) | (1 << (ClickHouseParser.ILIKE - 64)) | (1 << (ClickHouseParser.IN - 64)) | (1 << (ClickHouseParser.INDEX - 64)) | (1 << (ClickHouseParser.INF - 64)) | (1 << (ClickHouseParser.INJECTIVE - 64)) | (1 << (ClickHouseParser.INNER - 64)) | (1 << (ClickHouseParser.INSERT - 64)) | (1 << (ClickHouseParser.INTERVAL - 64)) | (1 << (ClickHouseParser.INTO - 64)) | (1 << (ClickHouseParser.IS - 64)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 64)) | (1 << (ClickHouseParser.JOIN - 64)) | (1 << (ClickHouseParser.KEY - 64)) | (1 << (ClickHouseParser.KILL - 64)) | (1 << (ClickHouseParser.LAST - 64)) | (1 << (ClickHouseParser.LAYOUT - 64)) | (1 << (ClickHouseParser.LEADING - 64)) | (1 << (ClickHouseParser.LEFT - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (ClickHouseParser.LIFETIME - 96)) | (1 << (ClickHouseParser.LIKE - 96)) | (1 << (ClickHouseParser.LIMIT - 96)) | (1 << (ClickHouseParser.LIVE - 96)) | (1 << (ClickHouseParser.LOCAL - 96)) | (1 << (ClickHouseParser.LOGS - 96)) | (1 << (ClickHouseParser.MATERIALIZE - 96)) | (1 << (ClickHouseParser.MATERIALIZED - 96)) | (1 << (ClickHouseParser.MAX - 96)) | (1 << (ClickHouseParser.MERGES - 96)) | (1 << (ClickHouseParser.MIN - 96)) | (1 << (ClickHouseParser.MINUTE - 96)) | (1 << (ClickHouseParser.MODIFY - 96)) | (1 << (ClickHouseParser.MONTH - 96)) | (1 << (ClickHouseParser.MOVE - 96)) | (1 << (ClickHouseParser.MUTATION - 96)) | (1 << (ClickHouseParser.NAN_SQL - 96)) | (1 << (ClickHouseParser.NO - 96)) | (1 << (ClickHouseParser.NOT - 96)) | (1 << (ClickHouseParser.NULL_SQL - 96)) | (1 << (ClickHouseParser.NULLS - 96)) | (1 << (ClickHouseParser.OFFSET - 96)) | (1 << (ClickHouseParser.ON - 96)) | (1 << (ClickHouseParser.OPTIMIZE - 96)) | (1 << (ClickHouseParser.OR - 96)) | (1 << (ClickHouseParser.ORDER - 96)) | (1 << (ClickHouseParser.OUTER - 96)) | (1 << (ClickHouseParser.OUTFILE - 96)) | (1 << (ClickHouseParser.OVER - 96)) | (1 << (ClickHouseParser.PARTITION - 96)) | (1 << (ClickHouseParser.POPULATE - 96)) | (1 << (ClickHouseParser.PRECEDING - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (ClickHouseParser.PREWHERE - 128)) | (1 << (ClickHouseParser.PRIMARY - 128)) | (1 << (ClickHouseParser.QUARTER - 128)) | (1 << (ClickHouseParser.RANGE - 128)) | (1 << (ClickHouseParser.RELOAD - 128)) | (1 << (ClickHouseParser.REMOVE - 128)) | (1 << (ClickHouseParser.RENAME - 128)) | (1 << (ClickHouseParser.REPLACE - 128)) | (1 << (ClickHouseParser.REPLICA - 128)) | (1 << (ClickHouseParser.REPLICATED - 128)) | (1 << (ClickHouseParser.RIGHT - 128)) | (1 << (ClickHouseParser.ROLLUP - 128)) | (1 << (ClickHouseParser.ROW - 128)) | (1 << (ClickHouseParser.ROWS - 128)) | (1 << (ClickHouseParser.SAMPLE - 128)) | (1 << (ClickHouseParser.SECOND - 128)) | (1 << (ClickHouseParser.SELECT - 128)) | (1 << (ClickHouseParser.SEMI - 128)) | (1 << (ClickHouseParser.SENDS - 128)) | (1 << (ClickHouseParser.SET - 128)) | (1 << (ClickHouseParser.SETTINGS - 128)) | (1 << (ClickHouseParser.SHOW - 128)) | (1 << (ClickHouseParser.SOURCE - 128)) | (1 << (ClickHouseParser.START - 128)) | (1 << (ClickHouseParser.STOP - 128)) | (1 << (ClickHouseParser.SUBSTRING - 128)) | (1 << (ClickHouseParser.SYNC - 128)) | (1 << (ClickHouseParser.SYNTAX - 128)) | (1 << (ClickHouseParser.SYSTEM - 128)) | (1 << (ClickHouseParser.TABLE - 128)) | (1 << (ClickHouseParser.TABLES - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (ClickHouseParser.TEMPORARY - 160)) | (1 << (ClickHouseParser.TEST - 160)) | (1 << (ClickHouseParser.THEN - 160)) | (1 << (ClickHouseParser.TIES - 160)) | (1 << (ClickHouseParser.TIMEOUT - 160)) | (1 << (ClickHouseParser.TIMESTAMP - 160)) | (1 << (ClickHouseParser.TO - 160)) | (1 << (ClickHouseParser.TOP - 160)) | (1 << (ClickHouseParser.TOTALS - 160)) | (1 << (ClickHouseParser.TRAILING - 160)) | (1 << (ClickHouseParser.TRIM - 160)) | (1 << (ClickHouseParser.TRUNCATE - 160)) | (1 << (ClickHouseParser.TTL - 160)) | (1 << (ClickHouseParser.TYPE - 160)) | (1 << (ClickHouseParser.UNBOUNDED - 160)) | (1 << (ClickHouseParser.UNION - 160)) | (1 << (ClickHouseParser.UPDATE - 160)) | (1 << (ClickHouseParser.USE - 160)) | (1 << (ClickHouseParser.USING - 160)) | (1 << (ClickHouseParser.UUID - 160)) | (1 << (ClickHouseParser.VALUES - 160)) | (1 << (ClickHouseParser.VIEW - 160)) | (1 << (ClickHouseParser.VOLUME - 160)) | (1 << (ClickHouseParser.WATCH - 160)) | (1 << (ClickHouseParser.WEEK - 160)) | (1 << (ClickHouseParser.WHEN - 160)) | (1 << (ClickHouseParser.WHERE - 160)) | (1 << (ClickHouseParser.WINDOW - 160)) | (1 << (ClickHouseParser.WITH - 160)) | (1 << (ClickHouseParser.YEAR - 160)) | (1 << (ClickHouseParser.JSON_FALSE - 160)) | (1 << (ClickHouseParser.JSON_TRUE - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (ClickHouseParser.IDENTIFIER - 192)) | (1 << (ClickHouseParser.FLOATING_LITERAL - 192)) | (1 << (ClickHouseParser.OCTAL_LITERAL - 192)) | (1 << (ClickHouseParser.DECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.HEXADECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.STRING_LITERAL - 192)) | (1 << (ClickHouseParser.ASTERISK - 192)) | (1 << (ClickHouseParser.DASH - 192)) | (1 << (ClickHouseParser.DOT - 192)) | (1 << (ClickHouseParser.LBRACKET - 192)) | (1 << (ClickHouseParser.LPAREN - 192)) | (1 << (ClickHouseParser.PLUS - 192)))) !== 0)) {
					{
					this.state = 893;
					this.columnExprList();
					}
				}

				this.state = 896;
				this.match(ClickHouseParser.RPAREN);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableElementExpr(): TableElementExprContext {
		let _localctx: TableElementExprContext = new TableElementExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, ClickHouseParser.RULE_tableElementExpr);
		try {
			this.state = 909;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 103, this._ctx) ) {
			case 1:
				_localctx = new TableElementExprColumnContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 899;
				this.tableColumnDfnt();
				}
				break;

			case 2:
				_localctx = new TableElementExprConstraintContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 900;
				this.match(ClickHouseParser.CONSTRAINT);
				this.state = 901;
				this.identifier();
				this.state = 902;
				this.match(ClickHouseParser.CHECK);
				this.state = 903;
				this.columnExpr(0);
				}
				break;

			case 3:
				_localctx = new TableElementExprIndexContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 905;
				this.match(ClickHouseParser.INDEX);
				this.state = 906;
				this.tableIndexDfnt();
				}
				break;

			case 4:
				_localctx = new TableElementExprProjectionContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 907;
				this.match(ClickHouseParser.PROJECTION);
				this.state = 908;
				this.tableProjectionDfnt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableColumnDfnt(): TableColumnDfntContext {
		let _localctx: TableColumnDfntContext = new TableColumnDfntContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, ClickHouseParser.RULE_tableColumnDfnt);
		let _la: number;
		try {
			this.state = 943;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 112, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 911;
				this.nestedIdentifier();
				this.state = 912;
				this.columnTypeExpr();
				this.state = 914;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ALIAS || _la === ClickHouseParser.DEFAULT || _la === ClickHouseParser.MATERIALIZED) {
					{
					this.state = 913;
					this.tableColumnPropertyExpr();
					}
				}

				this.state = 918;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.COMMENT) {
					{
					this.state = 916;
					this.match(ClickHouseParser.COMMENT);
					this.state = 917;
					this.match(ClickHouseParser.STRING_LITERAL);
					}
				}

				this.state = 921;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.CODEC) {
					{
					this.state = 920;
					this.codecExpr();
					}
				}

				this.state = 925;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.TTL) {
					{
					this.state = 923;
					this.match(ClickHouseParser.TTL);
					this.state = 924;
					this.columnExpr(0);
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 927;
				this.nestedIdentifier();
				this.state = 929;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 108, this._ctx) ) {
				case 1:
					{
					this.state = 928;
					this.columnTypeExpr();
					}
					break;
				}
				this.state = 931;
				this.tableColumnPropertyExpr();
				this.state = 934;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.COMMENT) {
					{
					this.state = 932;
					this.match(ClickHouseParser.COMMENT);
					this.state = 933;
					this.match(ClickHouseParser.STRING_LITERAL);
					}
				}

				this.state = 937;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.CODEC) {
					{
					this.state = 936;
					this.codecExpr();
					}
				}

				this.state = 941;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.TTL) {
					{
					this.state = 939;
					this.match(ClickHouseParser.TTL);
					this.state = 940;
					this.columnExpr(0);
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableColumnPropertyExpr(): TableColumnPropertyExprContext {
		let _localctx: TableColumnPropertyExprContext = new TableColumnPropertyExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, ClickHouseParser.RULE_tableColumnPropertyExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 945;
			_la = this._input.LA(1);
			if (!(_la === ClickHouseParser.ALIAS || _la === ClickHouseParser.DEFAULT || _la === ClickHouseParser.MATERIALIZED)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 946;
			this.columnExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableIndexDfnt(): TableIndexDfntContext {
		let _localctx: TableIndexDfntContext = new TableIndexDfntContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, ClickHouseParser.RULE_tableIndexDfnt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 948;
			this.nestedIdentifier();
			this.state = 949;
			this.columnExpr(0);
			this.state = 950;
			this.match(ClickHouseParser.TYPE);
			this.state = 951;
			this.columnTypeExpr();
			this.state = 952;
			this.match(ClickHouseParser.GRANULARITY);
			this.state = 953;
			this.match(ClickHouseParser.DECIMAL_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableProjectionDfnt(): TableProjectionDfntContext {
		let _localctx: TableProjectionDfntContext = new TableProjectionDfntContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, ClickHouseParser.RULE_tableProjectionDfnt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 955;
			this.nestedIdentifier();
			this.state = 956;
			this.projectionSelectStmt();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public codecExpr(): CodecExprContext {
		let _localctx: CodecExprContext = new CodecExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, ClickHouseParser.RULE_codecExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 958;
			this.match(ClickHouseParser.CODEC);
			this.state = 959;
			this.match(ClickHouseParser.LPAREN);
			this.state = 960;
			this.codecArgExpr();
			this.state = 965;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.COMMA) {
				{
				{
				this.state = 961;
				this.match(ClickHouseParser.COMMA);
				this.state = 962;
				this.codecArgExpr();
				}
				}
				this.state = 967;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 968;
			this.match(ClickHouseParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public codecArgExpr(): CodecArgExprContext {
		let _localctx: CodecArgExprContext = new CodecArgExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, ClickHouseParser.RULE_codecArgExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 970;
			this.identifier();
			this.state = 976;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.LPAREN) {
				{
				this.state = 971;
				this.match(ClickHouseParser.LPAREN);
				this.state = 973;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.AFTER) | (1 << ClickHouseParser.ALIAS) | (1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ALTER) | (1 << ClickHouseParser.AND) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ARRAY) | (1 << ClickHouseParser.AS) | (1 << ClickHouseParser.ASCENDING) | (1 << ClickHouseParser.ASOF) | (1 << ClickHouseParser.AST) | (1 << ClickHouseParser.ASYNC) | (1 << ClickHouseParser.ATTACH) | (1 << ClickHouseParser.BETWEEN) | (1 << ClickHouseParser.BOTH) | (1 << ClickHouseParser.BY) | (1 << ClickHouseParser.CASE) | (1 << ClickHouseParser.CAST) | (1 << ClickHouseParser.CHECK) | (1 << ClickHouseParser.CLEAR) | (1 << ClickHouseParser.CLUSTER) | (1 << ClickHouseParser.CODEC) | (1 << ClickHouseParser.COLLATE) | (1 << ClickHouseParser.COLUMN) | (1 << ClickHouseParser.COMMENT) | (1 << ClickHouseParser.CONSTRAINT) | (1 << ClickHouseParser.CREATE) | (1 << ClickHouseParser.CROSS) | (1 << ClickHouseParser.CUBE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ClickHouseParser.CURRENT - 32)) | (1 << (ClickHouseParser.DATABASE - 32)) | (1 << (ClickHouseParser.DATABASES - 32)) | (1 << (ClickHouseParser.DATE - 32)) | (1 << (ClickHouseParser.DAY - 32)) | (1 << (ClickHouseParser.DEDUPLICATE - 32)) | (1 << (ClickHouseParser.DEFAULT - 32)) | (1 << (ClickHouseParser.DELAY - 32)) | (1 << (ClickHouseParser.DELETE - 32)) | (1 << (ClickHouseParser.DESC - 32)) | (1 << (ClickHouseParser.DESCENDING - 32)) | (1 << (ClickHouseParser.DESCRIBE - 32)) | (1 << (ClickHouseParser.DETACH - 32)) | (1 << (ClickHouseParser.DICTIONARIES - 32)) | (1 << (ClickHouseParser.DICTIONARY - 32)) | (1 << (ClickHouseParser.DISK - 32)) | (1 << (ClickHouseParser.DISTINCT - 32)) | (1 << (ClickHouseParser.DISTRIBUTED - 32)) | (1 << (ClickHouseParser.DROP - 32)) | (1 << (ClickHouseParser.ELSE - 32)) | (1 << (ClickHouseParser.END - 32)) | (1 << (ClickHouseParser.ENGINE - 32)) | (1 << (ClickHouseParser.EVENTS - 32)) | (1 << (ClickHouseParser.EXISTS - 32)) | (1 << (ClickHouseParser.EXPLAIN - 32)) | (1 << (ClickHouseParser.EXPRESSION - 32)) | (1 << (ClickHouseParser.EXTRACT - 32)) | (1 << (ClickHouseParser.FETCHES - 32)) | (1 << (ClickHouseParser.FINAL - 32)) | (1 << (ClickHouseParser.FIRST - 32)) | (1 << (ClickHouseParser.FLUSH - 32)) | (1 << (ClickHouseParser.FOLLOWING - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ClickHouseParser.FOR - 64)) | (1 << (ClickHouseParser.FORMAT - 64)) | (1 << (ClickHouseParser.FREEZE - 64)) | (1 << (ClickHouseParser.FROM - 64)) | (1 << (ClickHouseParser.FULL - 64)) | (1 << (ClickHouseParser.FUNCTION - 64)) | (1 << (ClickHouseParser.GLOBAL - 64)) | (1 << (ClickHouseParser.GRANULARITY - 64)) | (1 << (ClickHouseParser.GROUP - 64)) | (1 << (ClickHouseParser.HAVING - 64)) | (1 << (ClickHouseParser.HIERARCHICAL - 64)) | (1 << (ClickHouseParser.HOUR - 64)) | (1 << (ClickHouseParser.ID - 64)) | (1 << (ClickHouseParser.IF - 64)) | (1 << (ClickHouseParser.ILIKE - 64)) | (1 << (ClickHouseParser.IN - 64)) | (1 << (ClickHouseParser.INDEX - 64)) | (1 << (ClickHouseParser.INF - 64)) | (1 << (ClickHouseParser.INJECTIVE - 64)) | (1 << (ClickHouseParser.INNER - 64)) | (1 << (ClickHouseParser.INSERT - 64)) | (1 << (ClickHouseParser.INTERVAL - 64)) | (1 << (ClickHouseParser.INTO - 64)) | (1 << (ClickHouseParser.IS - 64)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 64)) | (1 << (ClickHouseParser.JOIN - 64)) | (1 << (ClickHouseParser.KEY - 64)) | (1 << (ClickHouseParser.KILL - 64)) | (1 << (ClickHouseParser.LAST - 64)) | (1 << (ClickHouseParser.LAYOUT - 64)) | (1 << (ClickHouseParser.LEADING - 64)) | (1 << (ClickHouseParser.LEFT - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (ClickHouseParser.LIFETIME - 96)) | (1 << (ClickHouseParser.LIKE - 96)) | (1 << (ClickHouseParser.LIMIT - 96)) | (1 << (ClickHouseParser.LIVE - 96)) | (1 << (ClickHouseParser.LOCAL - 96)) | (1 << (ClickHouseParser.LOGS - 96)) | (1 << (ClickHouseParser.MATERIALIZE - 96)) | (1 << (ClickHouseParser.MATERIALIZED - 96)) | (1 << (ClickHouseParser.MAX - 96)) | (1 << (ClickHouseParser.MERGES - 96)) | (1 << (ClickHouseParser.MIN - 96)) | (1 << (ClickHouseParser.MINUTE - 96)) | (1 << (ClickHouseParser.MODIFY - 96)) | (1 << (ClickHouseParser.MONTH - 96)) | (1 << (ClickHouseParser.MOVE - 96)) | (1 << (ClickHouseParser.MUTATION - 96)) | (1 << (ClickHouseParser.NAN_SQL - 96)) | (1 << (ClickHouseParser.NO - 96)) | (1 << (ClickHouseParser.NOT - 96)) | (1 << (ClickHouseParser.NULL_SQL - 96)) | (1 << (ClickHouseParser.NULLS - 96)) | (1 << (ClickHouseParser.OFFSET - 96)) | (1 << (ClickHouseParser.ON - 96)) | (1 << (ClickHouseParser.OPTIMIZE - 96)) | (1 << (ClickHouseParser.OR - 96)) | (1 << (ClickHouseParser.ORDER - 96)) | (1 << (ClickHouseParser.OUTER - 96)) | (1 << (ClickHouseParser.OUTFILE - 96)) | (1 << (ClickHouseParser.OVER - 96)) | (1 << (ClickHouseParser.PARTITION - 96)) | (1 << (ClickHouseParser.POPULATE - 96)) | (1 << (ClickHouseParser.PRECEDING - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (ClickHouseParser.PREWHERE - 128)) | (1 << (ClickHouseParser.PRIMARY - 128)) | (1 << (ClickHouseParser.QUARTER - 128)) | (1 << (ClickHouseParser.RANGE - 128)) | (1 << (ClickHouseParser.RELOAD - 128)) | (1 << (ClickHouseParser.REMOVE - 128)) | (1 << (ClickHouseParser.RENAME - 128)) | (1 << (ClickHouseParser.REPLACE - 128)) | (1 << (ClickHouseParser.REPLICA - 128)) | (1 << (ClickHouseParser.REPLICATED - 128)) | (1 << (ClickHouseParser.RIGHT - 128)) | (1 << (ClickHouseParser.ROLLUP - 128)) | (1 << (ClickHouseParser.ROW - 128)) | (1 << (ClickHouseParser.ROWS - 128)) | (1 << (ClickHouseParser.SAMPLE - 128)) | (1 << (ClickHouseParser.SECOND - 128)) | (1 << (ClickHouseParser.SELECT - 128)) | (1 << (ClickHouseParser.SEMI - 128)) | (1 << (ClickHouseParser.SENDS - 128)) | (1 << (ClickHouseParser.SET - 128)) | (1 << (ClickHouseParser.SETTINGS - 128)) | (1 << (ClickHouseParser.SHOW - 128)) | (1 << (ClickHouseParser.SOURCE - 128)) | (1 << (ClickHouseParser.START - 128)) | (1 << (ClickHouseParser.STOP - 128)) | (1 << (ClickHouseParser.SUBSTRING - 128)) | (1 << (ClickHouseParser.SYNC - 128)) | (1 << (ClickHouseParser.SYNTAX - 128)) | (1 << (ClickHouseParser.SYSTEM - 128)) | (1 << (ClickHouseParser.TABLE - 128)) | (1 << (ClickHouseParser.TABLES - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (ClickHouseParser.TEMPORARY - 160)) | (1 << (ClickHouseParser.TEST - 160)) | (1 << (ClickHouseParser.THEN - 160)) | (1 << (ClickHouseParser.TIES - 160)) | (1 << (ClickHouseParser.TIMEOUT - 160)) | (1 << (ClickHouseParser.TIMESTAMP - 160)) | (1 << (ClickHouseParser.TO - 160)) | (1 << (ClickHouseParser.TOP - 160)) | (1 << (ClickHouseParser.TOTALS - 160)) | (1 << (ClickHouseParser.TRAILING - 160)) | (1 << (ClickHouseParser.TRIM - 160)) | (1 << (ClickHouseParser.TRUNCATE - 160)) | (1 << (ClickHouseParser.TTL - 160)) | (1 << (ClickHouseParser.TYPE - 160)) | (1 << (ClickHouseParser.UNBOUNDED - 160)) | (1 << (ClickHouseParser.UNION - 160)) | (1 << (ClickHouseParser.UPDATE - 160)) | (1 << (ClickHouseParser.USE - 160)) | (1 << (ClickHouseParser.USING - 160)) | (1 << (ClickHouseParser.UUID - 160)) | (1 << (ClickHouseParser.VALUES - 160)) | (1 << (ClickHouseParser.VIEW - 160)) | (1 << (ClickHouseParser.VOLUME - 160)) | (1 << (ClickHouseParser.WATCH - 160)) | (1 << (ClickHouseParser.WEEK - 160)) | (1 << (ClickHouseParser.WHEN - 160)) | (1 << (ClickHouseParser.WHERE - 160)) | (1 << (ClickHouseParser.WINDOW - 160)) | (1 << (ClickHouseParser.WITH - 160)) | (1 << (ClickHouseParser.YEAR - 160)) | (1 << (ClickHouseParser.JSON_FALSE - 160)) | (1 << (ClickHouseParser.JSON_TRUE - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (ClickHouseParser.IDENTIFIER - 192)) | (1 << (ClickHouseParser.FLOATING_LITERAL - 192)) | (1 << (ClickHouseParser.OCTAL_LITERAL - 192)) | (1 << (ClickHouseParser.DECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.HEXADECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.STRING_LITERAL - 192)) | (1 << (ClickHouseParser.ASTERISK - 192)) | (1 << (ClickHouseParser.DASH - 192)) | (1 << (ClickHouseParser.DOT - 192)) | (1 << (ClickHouseParser.LBRACKET - 192)) | (1 << (ClickHouseParser.LPAREN - 192)) | (1 << (ClickHouseParser.PLUS - 192)))) !== 0)) {
					{
					this.state = 972;
					this.columnExprList();
					}
				}

				this.state = 975;
				this.match(ClickHouseParser.RPAREN);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ttlExpr(): TtlExprContext {
		let _localctx: TtlExprContext = new TtlExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, ClickHouseParser.RULE_ttlExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 978;
			this.columnExpr(0);
			this.state = 986;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 116, this._ctx) ) {
			case 1:
				{
				this.state = 979;
				this.match(ClickHouseParser.DELETE);
				}
				break;

			case 2:
				{
				this.state = 980;
				this.match(ClickHouseParser.TO);
				this.state = 981;
				this.match(ClickHouseParser.DISK);
				this.state = 982;
				this.match(ClickHouseParser.STRING_LITERAL);
				}
				break;

			case 3:
				{
				this.state = 983;
				this.match(ClickHouseParser.TO);
				this.state = 984;
				this.match(ClickHouseParser.VOLUME);
				this.state = 985;
				this.match(ClickHouseParser.STRING_LITERAL);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public describeStmt(): DescribeStmtContext {
		let _localctx: DescribeStmtContext = new DescribeStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, ClickHouseParser.RULE_describeStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 988;
			_la = this._input.LA(1);
			if (!(_la === ClickHouseParser.DESC || _la === ClickHouseParser.DESCRIBE)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 990;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 117, this._ctx) ) {
			case 1:
				{
				this.state = 989;
				this.match(ClickHouseParser.TABLE);
				}
				break;
			}
			this.state = 992;
			this.tableExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dropStmt(): DropStmtContext {
		let _localctx: DropStmtContext = new DropStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, ClickHouseParser.RULE_dropStmt);
		let _la: number;
		try {
			this.state = 1025;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 125, this._ctx) ) {
			case 1:
				_localctx = new DropDatabaseStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 994;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.DETACH || _la === ClickHouseParser.DROP)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 995;
				this.match(ClickHouseParser.DATABASE);
				this.state = 998;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 118, this._ctx) ) {
				case 1:
					{
					this.state = 996;
					this.match(ClickHouseParser.IF);
					this.state = 997;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 1000;
				this.databaseIdentifier();
				this.state = 1002;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ON) {
					{
					this.state = 1001;
					this.clusterClause();
					}
				}

				}
				break;

			case 2:
				_localctx = new DropTableStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1004;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.DETACH || _la === ClickHouseParser.DROP)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 1011;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ClickHouseParser.DICTIONARY:
					{
					this.state = 1005;
					this.match(ClickHouseParser.DICTIONARY);
					}
					break;
				case ClickHouseParser.TABLE:
				case ClickHouseParser.TEMPORARY:
					{
					this.state = 1007;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.TEMPORARY) {
						{
						this.state = 1006;
						this.match(ClickHouseParser.TEMPORARY);
						}
					}

					this.state = 1009;
					this.match(ClickHouseParser.TABLE);
					}
					break;
				case ClickHouseParser.VIEW:
					{
					this.state = 1010;
					this.match(ClickHouseParser.VIEW);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 1015;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 122, this._ctx) ) {
				case 1:
					{
					this.state = 1013;
					this.match(ClickHouseParser.IF);
					this.state = 1014;
					this.match(ClickHouseParser.EXISTS);
					}
					break;
				}
				this.state = 1017;
				this.tableIdentifier();
				this.state = 1019;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ON) {
					{
					this.state = 1018;
					this.clusterClause();
					}
				}

				this.state = 1023;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.NO) {
					{
					this.state = 1021;
					this.match(ClickHouseParser.NO);
					this.state = 1022;
					this.match(ClickHouseParser.DELAY);
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public existsStmt(): ExistsStmtContext {
		let _localctx: ExistsStmtContext = new ExistsStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, ClickHouseParser.RULE_existsStmt);
		let _la: number;
		try {
			this.state = 1040;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 128, this._ctx) ) {
			case 1:
				_localctx = new ExistsDatabaseStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1027;
				this.match(ClickHouseParser.EXISTS);
				this.state = 1028;
				this.match(ClickHouseParser.DATABASE);
				this.state = 1029;
				this.databaseIdentifier();
				}
				break;

			case 2:
				_localctx = new ExistsTableStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1030;
				this.match(ClickHouseParser.EXISTS);
				this.state = 1037;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 127, this._ctx) ) {
				case 1:
					{
					this.state = 1031;
					this.match(ClickHouseParser.DICTIONARY);
					}
					break;

				case 2:
					{
					this.state = 1033;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.TEMPORARY) {
						{
						this.state = 1032;
						this.match(ClickHouseParser.TEMPORARY);
						}
					}

					this.state = 1035;
					this.match(ClickHouseParser.TABLE);
					}
					break;

				case 3:
					{
					this.state = 1036;
					this.match(ClickHouseParser.VIEW);
					}
					break;
				}
				this.state = 1039;
				this.tableIdentifier();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public explainStmt(): ExplainStmtContext {
		let _localctx: ExplainStmtContext = new ExplainStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, ClickHouseParser.RULE_explainStmt);
		try {
			this.state = 1048;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 129, this._ctx) ) {
			case 1:
				_localctx = new ExplainASTStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1042;
				this.match(ClickHouseParser.EXPLAIN);
				this.state = 1043;
				this.match(ClickHouseParser.AST);
				this.state = 1044;
				this.query();
				}
				break;

			case 2:
				_localctx = new ExplainSyntaxStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1045;
				this.match(ClickHouseParser.EXPLAIN);
				this.state = 1046;
				this.match(ClickHouseParser.SYNTAX);
				this.state = 1047;
				this.query();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public insertStmt(): InsertStmtContext {
		let _localctx: InsertStmtContext = new InsertStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, ClickHouseParser.RULE_insertStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1050;
			this.match(ClickHouseParser.INSERT);
			this.state = 1051;
			this.match(ClickHouseParser.INTO);
			this.state = 1053;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 130, this._ctx) ) {
			case 1:
				{
				this.state = 1052;
				this.match(ClickHouseParser.TABLE);
				}
				break;
			}
			this.state = 1058;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 131, this._ctx) ) {
			case 1:
				{
				this.state = 1055;
				this.tableIdentifier();
				}
				break;

			case 2:
				{
				this.state = 1056;
				this.match(ClickHouseParser.FUNCTION);
				this.state = 1057;
				this.tableFunctionExpr();
				}
				break;
			}
			this.state = 1061;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 132, this._ctx) ) {
			case 1:
				{
				this.state = 1060;
				this.columnsClause();
				}
				break;
			}
			this.state = 1063;
			this.dataClause();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnsClause(): ColumnsClauseContext {
		let _localctx: ColumnsClauseContext = new ColumnsClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, ClickHouseParser.RULE_columnsClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1065;
			this.match(ClickHouseParser.LPAREN);
			this.state = 1066;
			this.nestedIdentifier();
			this.state = 1071;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.COMMA) {
				{
				{
				this.state = 1067;
				this.match(ClickHouseParser.COMMA);
				this.state = 1068;
				this.nestedIdentifier();
				}
				}
				this.state = 1073;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1074;
			this.match(ClickHouseParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dataClause(): DataClauseContext {
		let _localctx: DataClauseContext = new DataClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, ClickHouseParser.RULE_dataClause);
		let _la: number;
		try {
			this.state = 1085;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.FORMAT:
				_localctx = new DataClauseFormatContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1076;
				this.match(ClickHouseParser.FORMAT);
				this.state = 1077;
				this.identifier();
				}
				break;
			case ClickHouseParser.VALUES:
				_localctx = new DataClauseValuesContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1078;
				this.match(ClickHouseParser.VALUES);
				}
				break;
			case ClickHouseParser.SELECT:
			case ClickHouseParser.WITH:
			case ClickHouseParser.LPAREN:
				_localctx = new DataClauseSelectContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1079;
				this.selectUnionStmt();
				this.state = 1081;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.SEMICOLON) {
					{
					this.state = 1080;
					this.match(ClickHouseParser.SEMICOLON);
					}
				}

				this.state = 1083;
				this.match(ClickHouseParser.EOF);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public killStmt(): KillStmtContext {
		let _localctx: KillStmtContext = new KillStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, ClickHouseParser.RULE_killStmt);
		let _la: number;
		try {
			_localctx = new KillMutationStmtContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1087;
			this.match(ClickHouseParser.KILL);
			this.state = 1088;
			this.match(ClickHouseParser.MUTATION);
			this.state = 1090;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ON) {
				{
				this.state = 1089;
				this.clusterClause();
				}
			}

			this.state = 1092;
			this.whereClause();
			this.state = 1094;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ASYNC || _la === ClickHouseParser.SYNC || _la === ClickHouseParser.TEST) {
				{
				this.state = 1093;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.ASYNC || _la === ClickHouseParser.SYNC || _la === ClickHouseParser.TEST)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public optimizeStmt(): OptimizeStmtContext {
		let _localctx: OptimizeStmtContext = new OptimizeStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, ClickHouseParser.RULE_optimizeStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1096;
			this.match(ClickHouseParser.OPTIMIZE);
			this.state = 1097;
			this.match(ClickHouseParser.TABLE);
			this.state = 1098;
			this.tableIdentifier();
			this.state = 1100;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ON) {
				{
				this.state = 1099;
				this.clusterClause();
				}
			}

			this.state = 1103;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.PARTITION) {
				{
				this.state = 1102;
				this.partitionClause();
				}
			}

			this.state = 1106;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.FINAL) {
				{
				this.state = 1105;
				this.match(ClickHouseParser.FINAL);
				}
			}

			this.state = 1109;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.DEDUPLICATE) {
				{
				this.state = 1108;
				this.match(ClickHouseParser.DEDUPLICATE);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public renameStmt(): RenameStmtContext {
		let _localctx: RenameStmtContext = new RenameStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, ClickHouseParser.RULE_renameStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1111;
			this.match(ClickHouseParser.RENAME);
			this.state = 1112;
			this.match(ClickHouseParser.TABLE);
			this.state = 1113;
			this.tableIdentifier();
			this.state = 1114;
			this.match(ClickHouseParser.TO);
			this.state = 1115;
			this.tableIdentifier();
			this.state = 1123;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.COMMA) {
				{
				{
				this.state = 1116;
				this.match(ClickHouseParser.COMMA);
				this.state = 1117;
				this.tableIdentifier();
				this.state = 1118;
				this.match(ClickHouseParser.TO);
				this.state = 1119;
				this.tableIdentifier();
				}
				}
				this.state = 1125;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1127;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ON) {
				{
				this.state = 1126;
				this.clusterClause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public projectionSelectStmt(): ProjectionSelectStmtContext {
		let _localctx: ProjectionSelectStmtContext = new ProjectionSelectStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, ClickHouseParser.RULE_projectionSelectStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1129;
			this.match(ClickHouseParser.LPAREN);
			this.state = 1131;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.WITH) {
				{
				this.state = 1130;
				this.withClause();
				}
			}

			this.state = 1133;
			this.match(ClickHouseParser.SELECT);
			this.state = 1134;
			this.columnExprList();
			this.state = 1136;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.GROUP) {
				{
				this.state = 1135;
				this.groupByClause();
				}
			}

			this.state = 1139;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ORDER) {
				{
				this.state = 1138;
				this.projectionOrderByClause();
				}
			}

			this.state = 1141;
			this.match(ClickHouseParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectUnionStmt(): SelectUnionStmtContext {
		let _localctx: SelectUnionStmtContext = new SelectUnionStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, ClickHouseParser.RULE_selectUnionStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1143;
			this.selectStmtWithParens();
			this.state = 1149;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.UNION) {
				{
				{
				this.state = 1144;
				this.match(ClickHouseParser.UNION);
				this.state = 1145;
				this.match(ClickHouseParser.ALL);
				this.state = 1146;
				this.selectStmtWithParens();
				}
				}
				this.state = 1151;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectStmtWithParens(): SelectStmtWithParensContext {
		let _localctx: SelectStmtWithParensContext = new SelectStmtWithParensContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, ClickHouseParser.RULE_selectStmtWithParens);
		try {
			this.state = 1157;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.SELECT:
			case ClickHouseParser.WITH:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1152;
				this.selectStmt();
				}
				break;
			case ClickHouseParser.LPAREN:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1153;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1154;
				this.selectUnionStmt();
				this.state = 1155;
				this.match(ClickHouseParser.RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectStmt(): SelectStmtContext {
		let _localctx: SelectStmtContext = new SelectStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, ClickHouseParser.RULE_selectStmt);
		let _la: number;
		try {
			_localctx = new RegularQuerySpecificationContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1160;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.WITH) {
				{
				this.state = 1159;
				this.withClause();
				}
			}

			this.state = 1162;
			this.match(ClickHouseParser.SELECT);
			this.state = 1164;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 150, this._ctx) ) {
			case 1:
				{
				this.state = 1163;
				this.match(ClickHouseParser.DISTINCT);
				}
				break;
			}
			this.state = 1167;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 151, this._ctx) ) {
			case 1:
				{
				this.state = 1166;
				this.topClause();
				}
				break;
			}
			this.state = 1169;
			this.columnExprList();
			this.state = 1171;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.FROM) {
				{
				this.state = 1170;
				this.fromClause();
				}
			}

			this.state = 1174;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ARRAY || _la === ClickHouseParser.INNER || _la === ClickHouseParser.LEFT) {
				{
				this.state = 1173;
				this.arrayJoinClause();
				}
			}

			this.state = 1177;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.WINDOW) {
				{
				this.state = 1176;
				this.windowClause();
				}
			}

			this.state = 1180;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.PREWHERE) {
				{
				this.state = 1179;
				this.prewhereClause();
				}
			}

			this.state = 1183;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.WHERE) {
				{
				this.state = 1182;
				this.whereClause();
				}
			}

			this.state = 1186;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.GROUP) {
				{
				this.state = 1185;
				this.groupByClause();
				}
			}

			this.state = 1190;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 158, this._ctx) ) {
			case 1:
				{
				this.state = 1188;
				this.match(ClickHouseParser.WITH);
				this.state = 1189;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.CUBE || _la === ClickHouseParser.ROLLUP)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			}
			this.state = 1194;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 159, this._ctx) ) {
			case 1:
				{
				this.state = 1192;
				this.match(ClickHouseParser.WITH);
				this.state = 1193;
				this.match(ClickHouseParser.TOTALS);
				}
				break;
			}
			this.state = 1197;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.HAVING) {
				{
				this.state = 1196;
				this.havingClause();
				}
			}

			this.state = 1200;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ORDER) {
				{
				this.state = 1199;
				this.orderByClause();
				}
			}

			this.state = 1203;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 162, this._ctx) ) {
			case 1:
				{
				this.state = 1202;
				this.limitByClause();
				}
				break;
			}
			this.state = 1206;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.LIMIT) {
				{
				this.state = 1205;
				this.limitClause();
				}
			}

			this.state = 1209;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.SETTINGS) {
				{
				this.state = 1208;
				this.settingsClause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public withClause(): WithClauseContext {
		let _localctx: WithClauseContext = new WithClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, ClickHouseParser.RULE_withClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1211;
			this.match(ClickHouseParser.WITH);
			this.state = 1212;
			this.columnExprList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public topClause(): TopClauseContext {
		let _localctx: TopClauseContext = new TopClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, ClickHouseParser.RULE_topClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1214;
			this.match(ClickHouseParser.TOP);
			this.state = 1215;
			this.match(ClickHouseParser.DECIMAL_LITERAL);
			this.state = 1218;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 165, this._ctx) ) {
			case 1:
				{
				this.state = 1216;
				this.match(ClickHouseParser.WITH);
				this.state = 1217;
				this.match(ClickHouseParser.TIES);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fromClause(): FromClauseContext {
		let _localctx: FromClauseContext = new FromClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, ClickHouseParser.RULE_fromClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1220;
			this.match(ClickHouseParser.FROM);
			this.state = 1221;
			this.joinExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrayJoinClause(): ArrayJoinClauseContext {
		let _localctx: ArrayJoinClauseContext = new ArrayJoinClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, ClickHouseParser.RULE_arrayJoinClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1224;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.INNER || _la === ClickHouseParser.LEFT) {
				{
				this.state = 1223;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.INNER || _la === ClickHouseParser.LEFT)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 1226;
			this.match(ClickHouseParser.ARRAY);
			this.state = 1227;
			this.match(ClickHouseParser.JOIN);
			this.state = 1228;
			this.columnExprList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public windowClause(): WindowClauseContext {
		let _localctx: WindowClauseContext = new WindowClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, ClickHouseParser.RULE_windowClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1230;
			this.match(ClickHouseParser.WINDOW);
			this.state = 1231;
			this.identifier();
			this.state = 1232;
			this.match(ClickHouseParser.AS);
			this.state = 1233;
			this.match(ClickHouseParser.LPAREN);
			this.state = 1234;
			this.windowExpr();
			this.state = 1235;
			this.match(ClickHouseParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public prewhereClause(): PrewhereClauseContext {
		let _localctx: PrewhereClauseContext = new PrewhereClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, ClickHouseParser.RULE_prewhereClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1237;
			this.match(ClickHouseParser.PREWHERE);
			this.state = 1238;
			this.columnExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whereClause(): WhereClauseContext {
		let _localctx: WhereClauseContext = new WhereClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, ClickHouseParser.RULE_whereClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1240;
			this.match(ClickHouseParser.WHERE);
			this.state = 1241;
			this.columnExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public groupByClause(): GroupByClauseContext {
		let _localctx: GroupByClauseContext = new GroupByClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, ClickHouseParser.RULE_groupByClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1243;
			this.match(ClickHouseParser.GROUP);
			this.state = 1244;
			this.match(ClickHouseParser.BY);
			this.state = 1251;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 167, this._ctx) ) {
			case 1:
				{
				this.state = 1245;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.CUBE || _la === ClickHouseParser.ROLLUP)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 1246;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1247;
				this.columnExprList();
				this.state = 1248;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 2:
				{
				this.state = 1250;
				this.columnExprList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public havingClause(): HavingClauseContext {
		let _localctx: HavingClauseContext = new HavingClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, ClickHouseParser.RULE_havingClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1253;
			this.match(ClickHouseParser.HAVING);
			this.state = 1254;
			this.columnExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orderByClause(): OrderByClauseContext {
		let _localctx: OrderByClauseContext = new OrderByClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, ClickHouseParser.RULE_orderByClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1256;
			this.match(ClickHouseParser.ORDER);
			this.state = 1257;
			this.match(ClickHouseParser.BY);
			this.state = 1258;
			this.orderExprList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public projectionOrderByClause(): ProjectionOrderByClauseContext {
		let _localctx: ProjectionOrderByClauseContext = new ProjectionOrderByClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, ClickHouseParser.RULE_projectionOrderByClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1260;
			this.match(ClickHouseParser.ORDER);
			this.state = 1261;
			this.match(ClickHouseParser.BY);
			this.state = 1262;
			this.columnExprList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public limitByClause(): LimitByClauseContext {
		let _localctx: LimitByClauseContext = new LimitByClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, ClickHouseParser.RULE_limitByClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1264;
			this.match(ClickHouseParser.LIMIT);
			this.state = 1265;
			this.limitExpr();
			this.state = 1266;
			this.match(ClickHouseParser.BY);
			this.state = 1267;
			this.columnExprList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public limitClause(): LimitClauseContext {
		let _localctx: LimitClauseContext = new LimitClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, ClickHouseParser.RULE_limitClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1269;
			this.match(ClickHouseParser.LIMIT);
			this.state = 1270;
			this.limitExpr();
			this.state = 1273;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 168, this._ctx) ) {
			case 1:
				{
				this.state = 1271;
				this.match(ClickHouseParser.WITH);
				this.state = 1272;
				this.match(ClickHouseParser.TIES);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public settingsClause(): SettingsClauseContext {
		let _localctx: SettingsClauseContext = new SettingsClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, ClickHouseParser.RULE_settingsClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1275;
			this.match(ClickHouseParser.SETTINGS);
			this.state = 1276;
			this.settingExprList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public joinExpr(): JoinExprContext;
	public joinExpr(_p: number): JoinExprContext;
	// @RuleVersion(0)
	public joinExpr(_p?: number): JoinExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: JoinExprContext = new JoinExprContext(this._ctx, _parentState);
		let _prevctx: JoinExprContext = _localctx;
		let _startState: number = 138;
		this.enterRecursionRule(_localctx, 138, ClickHouseParser.RULE_joinExpr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1290;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 171, this._ctx) ) {
			case 1:
				{
				_localctx = new JoinExprTableContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 1279;
				this.tableExpr(0);
				this.state = 1281;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 169, this._ctx) ) {
				case 1:
					{
					this.state = 1280;
					this.match(ClickHouseParser.FINAL);
					}
					break;
				}
				this.state = 1284;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 170, this._ctx) ) {
				case 1:
					{
					this.state = 1283;
					this.sampleClause();
					}
					break;
				}
				}
				break;

			case 2:
				{
				_localctx = new JoinExprParensContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1286;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1287;
				this.joinExpr(0);
				this.state = 1288;
				this.match(ClickHouseParser.RPAREN);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 1309;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 175, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 1307;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 174, this._ctx) ) {
					case 1:
						{
						_localctx = new JoinExprCrossOpContext(new JoinExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_joinExpr);
						this.state = 1292;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 1293;
						this.joinOpCross();
						this.state = 1294;
						this.joinExpr(4);
						}
						break;

					case 2:
						{
						_localctx = new JoinExprOpContext(new JoinExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_joinExpr);
						this.state = 1296;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 1298;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === ClickHouseParser.GLOBAL || _la === ClickHouseParser.LOCAL) {
							{
							this.state = 1297;
							_la = this._input.LA(1);
							if (!(_la === ClickHouseParser.GLOBAL || _la === ClickHouseParser.LOCAL)) {
							this._errHandler.recoverInline(this);
							} else {
								if (this._input.LA(1) === Token.EOF) {
									this.matchedEOF = true;
								}

								this._errHandler.reportMatch(this);
								this.consume();
							}
							}
						}

						this.state = 1301;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ASOF))) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & ((1 << (ClickHouseParser.FULL - 68)) | (1 << (ClickHouseParser.INNER - 68)) | (1 << (ClickHouseParser.LEFT - 68)))) !== 0) || _la === ClickHouseParser.RIGHT || _la === ClickHouseParser.SEMI) {
							{
							this.state = 1300;
							this.joinOp();
							}
						}

						this.state = 1303;
						this.match(ClickHouseParser.JOIN);
						this.state = 1304;
						this.joinExpr(0);
						this.state = 1305;
						this.joinConstraintClause();
						}
						break;
					}
					}
				}
				this.state = 1311;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 175, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public joinOp(): JoinOpContext {
		let _localctx: JoinOpContext = new JoinOpContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, ClickHouseParser.RULE_joinOp);
		let _la: number;
		try {
			this.state = 1355;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 189, this._ctx) ) {
			case 1:
				_localctx = new JoinOpInnerContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1321;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 178, this._ctx) ) {
				case 1:
					{
					this.state = 1313;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ASOF))) !== 0)) {
						{
						this.state = 1312;
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ASOF))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
					}

					this.state = 1315;
					this.match(ClickHouseParser.INNER);
					}
					break;

				case 2:
					{
					this.state = 1316;
					this.match(ClickHouseParser.INNER);
					this.state = 1318;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ASOF))) !== 0)) {
						{
						this.state = 1317;
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ASOF))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
					}

					}
					break;

				case 3:
					{
					this.state = 1320;
					_la = this._input.LA(1);
					if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ASOF))) !== 0))) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
					break;
				}
				}
				break;

			case 2:
				_localctx = new JoinOpLeftRightContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1337;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 183, this._ctx) ) {
				case 1:
					{
					this.state = 1324;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ASOF))) !== 0) || _la === ClickHouseParser.SEMI) {
						{
						this.state = 1323;
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ASOF))) !== 0) || _la === ClickHouseParser.SEMI)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
					}

					this.state = 1326;
					_la = this._input.LA(1);
					if (!(_la === ClickHouseParser.LEFT || _la === ClickHouseParser.RIGHT)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 1328;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.OUTER) {
						{
						this.state = 1327;
						this.match(ClickHouseParser.OUTER);
						}
					}

					}
					break;

				case 2:
					{
					this.state = 1330;
					_la = this._input.LA(1);
					if (!(_la === ClickHouseParser.LEFT || _la === ClickHouseParser.RIGHT)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 1332;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.OUTER) {
						{
						this.state = 1331;
						this.match(ClickHouseParser.OUTER);
						}
					}

					this.state = 1335;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ASOF))) !== 0) || _la === ClickHouseParser.SEMI) {
						{
						this.state = 1334;
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ASOF))) !== 0) || _la === ClickHouseParser.SEMI)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
					}

					}
					break;
				}
				}
				break;

			case 3:
				_localctx = new JoinOpFullContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1353;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 188, this._ctx) ) {
				case 1:
					{
					this.state = 1340;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.ALL || _la === ClickHouseParser.ANY) {
						{
						this.state = 1339;
						_la = this._input.LA(1);
						if (!(_la === ClickHouseParser.ALL || _la === ClickHouseParser.ANY)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
					}

					this.state = 1342;
					this.match(ClickHouseParser.FULL);
					this.state = 1344;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.OUTER) {
						{
						this.state = 1343;
						this.match(ClickHouseParser.OUTER);
						}
					}

					}
					break;

				case 2:
					{
					this.state = 1346;
					this.match(ClickHouseParser.FULL);
					this.state = 1348;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.OUTER) {
						{
						this.state = 1347;
						this.match(ClickHouseParser.OUTER);
						}
					}

					this.state = 1351;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.ALL || _la === ClickHouseParser.ANY) {
						{
						this.state = 1350;
						_la = this._input.LA(1);
						if (!(_la === ClickHouseParser.ALL || _la === ClickHouseParser.ANY)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
					}

					}
					break;
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public joinOpCross(): JoinOpCrossContext {
		let _localctx: JoinOpCrossContext = new JoinOpCrossContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, ClickHouseParser.RULE_joinOpCross);
		let _la: number;
		try {
			this.state = 1363;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.CROSS:
			case ClickHouseParser.GLOBAL:
			case ClickHouseParser.LOCAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1358;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.GLOBAL || _la === ClickHouseParser.LOCAL) {
					{
					this.state = 1357;
					_la = this._input.LA(1);
					if (!(_la === ClickHouseParser.GLOBAL || _la === ClickHouseParser.LOCAL)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
				}

				this.state = 1360;
				this.match(ClickHouseParser.CROSS);
				this.state = 1361;
				this.match(ClickHouseParser.JOIN);
				}
				break;
			case ClickHouseParser.COMMA:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1362;
				this.match(ClickHouseParser.COMMA);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public joinConstraintClause(): JoinConstraintClauseContext {
		let _localctx: JoinConstraintClauseContext = new JoinConstraintClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, ClickHouseParser.RULE_joinConstraintClause);
		try {
			this.state = 1374;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 192, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1365;
				this.match(ClickHouseParser.ON);
				this.state = 1366;
				this.columnExprList();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1367;
				this.match(ClickHouseParser.USING);
				this.state = 1368;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1369;
				this.columnExprList();
				this.state = 1370;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1372;
				this.match(ClickHouseParser.USING);
				this.state = 1373;
				this.columnExprList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sampleClause(): SampleClauseContext {
		let _localctx: SampleClauseContext = new SampleClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, ClickHouseParser.RULE_sampleClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1376;
			this.match(ClickHouseParser.SAMPLE);
			this.state = 1377;
			this.ratioExpr();
			this.state = 1380;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 193, this._ctx) ) {
			case 1:
				{
				this.state = 1378;
				this.match(ClickHouseParser.OFFSET);
				this.state = 1379;
				this.ratioExpr();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public limitExpr(): LimitExprContext {
		let _localctx: LimitExprContext = new LimitExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, ClickHouseParser.RULE_limitExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1382;
			this.columnExpr(0);
			this.state = 1385;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.OFFSET || _la === ClickHouseParser.COMMA) {
				{
				this.state = 1383;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.OFFSET || _la === ClickHouseParser.COMMA)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 1384;
				this.columnExpr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orderExprList(): OrderExprListContext {
		let _localctx: OrderExprListContext = new OrderExprListContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, ClickHouseParser.RULE_orderExprList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1387;
			this.orderExpr();
			this.state = 1392;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.COMMA) {
				{
				{
				this.state = 1388;
				this.match(ClickHouseParser.COMMA);
				this.state = 1389;
				this.orderExpr();
				}
				}
				this.state = 1394;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orderExpr(): OrderExprContext {
		let _localctx: OrderExprContext = new OrderExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, ClickHouseParser.RULE_orderExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1395;
			this.columnExpr(0);
			this.state = 1397;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 196, this._ctx) ) {
			case 1:
				{
				this.state = 1396;
				_la = this._input.LA(1);
				if (!(((((_la - 11)) & ~0x1F) === 0 && ((1 << (_la - 11)) & ((1 << (ClickHouseParser.ASCENDING - 11)) | (1 << (ClickHouseParser.DESC - 11)) | (1 << (ClickHouseParser.DESCENDING - 11)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			}
			this.state = 1401;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.NULLS) {
				{
				this.state = 1399;
				this.match(ClickHouseParser.NULLS);
				this.state = 1400;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.FIRST || _la === ClickHouseParser.LAST)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 1405;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.COLLATE) {
				{
				this.state = 1403;
				this.match(ClickHouseParser.COLLATE);
				this.state = 1404;
				this.match(ClickHouseParser.STRING_LITERAL);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ratioExpr(): RatioExprContext {
		let _localctx: RatioExprContext = new RatioExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, ClickHouseParser.RULE_ratioExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1407;
			this.numberLiteral();
			this.state = 1410;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 199, this._ctx) ) {
			case 1:
				{
				this.state = 1408;
				this.match(ClickHouseParser.SLASH);
				this.state = 1409;
				this.numberLiteral();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public settingExprList(): SettingExprListContext {
		let _localctx: SettingExprListContext = new SettingExprListContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, ClickHouseParser.RULE_settingExprList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1412;
			this.settingExpr();
			this.state = 1417;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.COMMA) {
				{
				{
				this.state = 1413;
				this.match(ClickHouseParser.COMMA);
				this.state = 1414;
				this.settingExpr();
				}
				}
				this.state = 1419;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public settingExpr(): SettingExprContext {
		let _localctx: SettingExprContext = new SettingExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, ClickHouseParser.RULE_settingExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1420;
			this.identifier();
			this.state = 1421;
			this.match(ClickHouseParser.EQ_SINGLE);
			this.state = 1422;
			this.literal();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public windowExpr(): WindowExprContext {
		let _localctx: WindowExprContext = new WindowExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, ClickHouseParser.RULE_windowExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1425;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.PARTITION) {
				{
				this.state = 1424;
				this.winPartitionByClause();
				}
			}

			this.state = 1428;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ORDER) {
				{
				this.state = 1427;
				this.winOrderByClause();
				}
			}

			this.state = 1431;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.RANGE || _la === ClickHouseParser.ROWS) {
				{
				this.state = 1430;
				this.winFrameClause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public winPartitionByClause(): WinPartitionByClauseContext {
		let _localctx: WinPartitionByClauseContext = new WinPartitionByClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, ClickHouseParser.RULE_winPartitionByClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1433;
			this.match(ClickHouseParser.PARTITION);
			this.state = 1434;
			this.match(ClickHouseParser.BY);
			this.state = 1435;
			this.columnExprList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public winOrderByClause(): WinOrderByClauseContext {
		let _localctx: WinOrderByClauseContext = new WinOrderByClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, ClickHouseParser.RULE_winOrderByClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1437;
			this.match(ClickHouseParser.ORDER);
			this.state = 1438;
			this.match(ClickHouseParser.BY);
			this.state = 1439;
			this.orderExprList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public winFrameClause(): WinFrameClauseContext {
		let _localctx: WinFrameClauseContext = new WinFrameClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 166, ClickHouseParser.RULE_winFrameClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1441;
			_la = this._input.LA(1);
			if (!(_la === ClickHouseParser.RANGE || _la === ClickHouseParser.ROWS)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 1442;
			this.winFrameExtend();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public winFrameExtend(): WinFrameExtendContext {
		let _localctx: WinFrameExtendContext = new WinFrameExtendContext(this._ctx, this.state);
		this.enterRule(_localctx, 168, ClickHouseParser.RULE_winFrameExtend);
		try {
			this.state = 1450;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.CURRENT:
			case ClickHouseParser.INF:
			case ClickHouseParser.NAN_SQL:
			case ClickHouseParser.UNBOUNDED:
			case ClickHouseParser.FLOATING_LITERAL:
			case ClickHouseParser.OCTAL_LITERAL:
			case ClickHouseParser.DECIMAL_LITERAL:
			case ClickHouseParser.HEXADECIMAL_LITERAL:
			case ClickHouseParser.DASH:
			case ClickHouseParser.DOT:
			case ClickHouseParser.PLUS:
				_localctx = new FrameStartContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1444;
				this.winFrameBound();
				}
				break;
			case ClickHouseParser.BETWEEN:
				_localctx = new FrameBetweenContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1445;
				this.match(ClickHouseParser.BETWEEN);
				this.state = 1446;
				this.winFrameBound();
				this.state = 1447;
				this.match(ClickHouseParser.AND);
				this.state = 1448;
				this.winFrameBound();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public winFrameBound(): WinFrameBoundContext {
		let _localctx: WinFrameBoundContext = new WinFrameBoundContext(this._ctx, this.state);
		this.enterRule(_localctx, 170, ClickHouseParser.RULE_winFrameBound);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1464;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 205, this._ctx) ) {
			case 1:
				{
				this.state = 1452;
				this.match(ClickHouseParser.CURRENT);
				this.state = 1453;
				this.match(ClickHouseParser.ROW);
				}
				break;

			case 2:
				{
				this.state = 1454;
				this.match(ClickHouseParser.UNBOUNDED);
				this.state = 1455;
				this.match(ClickHouseParser.PRECEDING);
				}
				break;

			case 3:
				{
				this.state = 1456;
				this.match(ClickHouseParser.UNBOUNDED);
				this.state = 1457;
				this.match(ClickHouseParser.FOLLOWING);
				}
				break;

			case 4:
				{
				this.state = 1458;
				this.numberLiteral();
				this.state = 1459;
				this.match(ClickHouseParser.PRECEDING);
				}
				break;

			case 5:
				{
				this.state = 1461;
				this.numberLiteral();
				this.state = 1462;
				this.match(ClickHouseParser.FOLLOWING);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public setStmt(): SetStmtContext {
		let _localctx: SetStmtContext = new SetStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 172, ClickHouseParser.RULE_setStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1466;
			this.match(ClickHouseParser.SET);
			this.state = 1467;
			this.settingExprList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public showStmt(): ShowStmtContext {
		let _localctx: ShowStmtContext = new ShowStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 174, ClickHouseParser.RULE_showStmt);
		let _la: number;
		try {
			this.state = 1511;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 213, this._ctx) ) {
			case 1:
				_localctx = new ShowCreateDatabaseStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1469;
				this.match(ClickHouseParser.SHOW);
				this.state = 1470;
				this.match(ClickHouseParser.CREATE);
				this.state = 1471;
				this.match(ClickHouseParser.DATABASE);
				this.state = 1472;
				this.databaseIdentifier();
				}
				break;

			case 2:
				_localctx = new ShowCreateDictionaryStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1473;
				this.match(ClickHouseParser.SHOW);
				this.state = 1474;
				this.match(ClickHouseParser.CREATE);
				this.state = 1475;
				this.match(ClickHouseParser.DICTIONARY);
				this.state = 1476;
				this.tableIdentifier();
				}
				break;

			case 3:
				_localctx = new ShowCreateTableStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1477;
				this.match(ClickHouseParser.SHOW);
				this.state = 1478;
				this.match(ClickHouseParser.CREATE);
				this.state = 1480;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 206, this._ctx) ) {
				case 1:
					{
					this.state = 1479;
					this.match(ClickHouseParser.TEMPORARY);
					}
					break;
				}
				this.state = 1483;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 207, this._ctx) ) {
				case 1:
					{
					this.state = 1482;
					this.match(ClickHouseParser.TABLE);
					}
					break;
				}
				this.state = 1485;
				this.tableIdentifier();
				}
				break;

			case 4:
				_localctx = new ShowDatabasesStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1486;
				this.match(ClickHouseParser.SHOW);
				this.state = 1487;
				this.match(ClickHouseParser.DATABASES);
				}
				break;

			case 5:
				_localctx = new ShowDictionariesStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1488;
				this.match(ClickHouseParser.SHOW);
				this.state = 1489;
				this.match(ClickHouseParser.DICTIONARIES);
				this.state = 1492;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.FROM) {
					{
					this.state = 1490;
					this.match(ClickHouseParser.FROM);
					this.state = 1491;
					this.databaseIdentifier();
					}
				}

				}
				break;

			case 6:
				_localctx = new ShowTablesStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1494;
				this.match(ClickHouseParser.SHOW);
				this.state = 1496;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.TEMPORARY) {
					{
					this.state = 1495;
					this.match(ClickHouseParser.TEMPORARY);
					}
				}

				this.state = 1498;
				this.match(ClickHouseParser.TABLES);
				this.state = 1501;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.FROM || _la === ClickHouseParser.IN) {
					{
					this.state = 1499;
					_la = this._input.LA(1);
					if (!(_la === ClickHouseParser.FROM || _la === ClickHouseParser.IN)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 1500;
					this.databaseIdentifier();
					}
				}

				this.state = 1506;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ClickHouseParser.LIKE:
					{
					this.state = 1503;
					this.match(ClickHouseParser.LIKE);
					this.state = 1504;
					this.match(ClickHouseParser.STRING_LITERAL);
					}
					break;
				case ClickHouseParser.WHERE:
					{
					this.state = 1505;
					this.whereClause();
					}
					break;
				case ClickHouseParser.EOF:
				case ClickHouseParser.ALTER:
				case ClickHouseParser.ATTACH:
				case ClickHouseParser.CHECK:
				case ClickHouseParser.CREATE:
				case ClickHouseParser.DESC:
				case ClickHouseParser.DESCRIBE:
				case ClickHouseParser.DETACH:
				case ClickHouseParser.DROP:
				case ClickHouseParser.EXISTS:
				case ClickHouseParser.EXPLAIN:
				case ClickHouseParser.FORMAT:
				case ClickHouseParser.INSERT:
				case ClickHouseParser.INTO:
				case ClickHouseParser.KILL:
				case ClickHouseParser.LIMIT:
				case ClickHouseParser.OPTIMIZE:
				case ClickHouseParser.RENAME:
				case ClickHouseParser.REPLACE:
				case ClickHouseParser.SELECT:
				case ClickHouseParser.SET:
				case ClickHouseParser.SHOW:
				case ClickHouseParser.SYSTEM:
				case ClickHouseParser.TRUNCATE:
				case ClickHouseParser.USE:
				case ClickHouseParser.WATCH:
				case ClickHouseParser.WITH:
				case ClickHouseParser.LPAREN:
				case ClickHouseParser.SEMICOLON:
					break;
				default:
					break;
				}
				this.state = 1509;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.LIMIT) {
					{
					this.state = 1508;
					this.limitClause();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public systemStmt(): SystemStmtContext {
		let _localctx: SystemStmtContext = new SystemStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 176, ClickHouseParser.RULE_systemStmt);
		let _la: number;
		try {
			this.state = 1547;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 216, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1513;
				this.match(ClickHouseParser.SYSTEM);
				this.state = 1514;
				this.match(ClickHouseParser.FLUSH);
				this.state = 1515;
				this.match(ClickHouseParser.DISTRIBUTED);
				this.state = 1516;
				this.tableIdentifier();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1517;
				this.match(ClickHouseParser.SYSTEM);
				this.state = 1518;
				this.match(ClickHouseParser.FLUSH);
				this.state = 1519;
				this.match(ClickHouseParser.LOGS);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1520;
				this.match(ClickHouseParser.SYSTEM);
				this.state = 1521;
				this.match(ClickHouseParser.RELOAD);
				this.state = 1522;
				this.match(ClickHouseParser.DICTIONARIES);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1523;
				this.match(ClickHouseParser.SYSTEM);
				this.state = 1524;
				this.match(ClickHouseParser.RELOAD);
				this.state = 1525;
				this.match(ClickHouseParser.DICTIONARY);
				this.state = 1526;
				this.tableIdentifier();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1527;
				this.match(ClickHouseParser.SYSTEM);
				this.state = 1528;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.START || _la === ClickHouseParser.STOP)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 1536;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ClickHouseParser.DISTRIBUTED:
					{
					this.state = 1529;
					this.match(ClickHouseParser.DISTRIBUTED);
					this.state = 1530;
					this.match(ClickHouseParser.SENDS);
					}
					break;
				case ClickHouseParser.FETCHES:
					{
					this.state = 1531;
					this.match(ClickHouseParser.FETCHES);
					}
					break;
				case ClickHouseParser.MERGES:
				case ClickHouseParser.TTL:
					{
					this.state = 1533;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ClickHouseParser.TTL) {
						{
						this.state = 1532;
						this.match(ClickHouseParser.TTL);
						}
					}

					this.state = 1535;
					this.match(ClickHouseParser.MERGES);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 1538;
				this.tableIdentifier();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1539;
				this.match(ClickHouseParser.SYSTEM);
				this.state = 1540;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.START || _la === ClickHouseParser.STOP)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 1541;
				this.match(ClickHouseParser.REPLICATED);
				this.state = 1542;
				this.match(ClickHouseParser.SENDS);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1543;
				this.match(ClickHouseParser.SYSTEM);
				this.state = 1544;
				this.match(ClickHouseParser.SYNC);
				this.state = 1545;
				this.match(ClickHouseParser.REPLICA);
				this.state = 1546;
				this.tableIdentifier();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public truncateStmt(): TruncateStmtContext {
		let _localctx: TruncateStmtContext = new TruncateStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 178, ClickHouseParser.RULE_truncateStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1549;
			this.match(ClickHouseParser.TRUNCATE);
			this.state = 1551;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 217, this._ctx) ) {
			case 1:
				{
				this.state = 1550;
				this.match(ClickHouseParser.TEMPORARY);
				}
				break;
			}
			this.state = 1554;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 218, this._ctx) ) {
			case 1:
				{
				this.state = 1553;
				this.match(ClickHouseParser.TABLE);
				}
				break;
			}
			this.state = 1558;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 219, this._ctx) ) {
			case 1:
				{
				this.state = 1556;
				this.match(ClickHouseParser.IF);
				this.state = 1557;
				this.match(ClickHouseParser.EXISTS);
				}
				break;
			}
			this.state = 1560;
			this.tableIdentifier();
			this.state = 1562;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.ON) {
				{
				this.state = 1561;
				this.clusterClause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public useStmt(): UseStmtContext {
		let _localctx: UseStmtContext = new UseStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 180, ClickHouseParser.RULE_useStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1564;
			this.match(ClickHouseParser.USE);
			this.state = 1565;
			this.databaseIdentifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public watchStmt(): WatchStmtContext {
		let _localctx: WatchStmtContext = new WatchStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 182, ClickHouseParser.RULE_watchStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1567;
			this.match(ClickHouseParser.WATCH);
			this.state = 1568;
			this.tableIdentifier();
			this.state = 1570;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.EVENTS) {
				{
				this.state = 1569;
				this.match(ClickHouseParser.EVENTS);
				}
			}

			this.state = 1574;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.LIMIT) {
				{
				this.state = 1572;
				this.match(ClickHouseParser.LIMIT);
				this.state = 1573;
				this.match(ClickHouseParser.DECIMAL_LITERAL);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnTypeExpr(): ColumnTypeExprContext {
		let _localctx: ColumnTypeExprContext = new ColumnTypeExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 184, ClickHouseParser.RULE_columnTypeExpr);
		let _la: number;
		try {
			this.state = 1623;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 227, this._ctx) ) {
			case 1:
				_localctx = new ColumnTypeExprSimpleContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1576;
				this.identifier();
				}
				break;

			case 2:
				_localctx = new ColumnTypeExprNestedContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1577;
				this.identifier();
				this.state = 1578;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1579;
				this.identifier();
				this.state = 1580;
				this.columnTypeExpr();
				this.state = 1587;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ClickHouseParser.COMMA) {
					{
					{
					this.state = 1581;
					this.match(ClickHouseParser.COMMA);
					this.state = 1582;
					this.identifier();
					this.state = 1583;
					this.columnTypeExpr();
					}
					}
					this.state = 1589;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1590;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 3:
				_localctx = new ColumnTypeExprEnumContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1592;
				this.identifier();
				this.state = 1593;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1594;
				this.enumValue();
				this.state = 1599;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ClickHouseParser.COMMA) {
					{
					{
					this.state = 1595;
					this.match(ClickHouseParser.COMMA);
					this.state = 1596;
					this.enumValue();
					}
					}
					this.state = 1601;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1602;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 4:
				_localctx = new ColumnTypeExprComplexContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1604;
				this.identifier();
				this.state = 1605;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1606;
				this.columnTypeExpr();
				this.state = 1611;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ClickHouseParser.COMMA) {
					{
					{
					this.state = 1607;
					this.match(ClickHouseParser.COMMA);
					this.state = 1608;
					this.columnTypeExpr();
					}
					}
					this.state = 1613;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1614;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 5:
				_localctx = new ColumnTypeExprParamContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1616;
				this.identifier();
				this.state = 1617;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1619;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.AFTER) | (1 << ClickHouseParser.ALIAS) | (1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ALTER) | (1 << ClickHouseParser.AND) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ARRAY) | (1 << ClickHouseParser.AS) | (1 << ClickHouseParser.ASCENDING) | (1 << ClickHouseParser.ASOF) | (1 << ClickHouseParser.AST) | (1 << ClickHouseParser.ASYNC) | (1 << ClickHouseParser.ATTACH) | (1 << ClickHouseParser.BETWEEN) | (1 << ClickHouseParser.BOTH) | (1 << ClickHouseParser.BY) | (1 << ClickHouseParser.CASE) | (1 << ClickHouseParser.CAST) | (1 << ClickHouseParser.CHECK) | (1 << ClickHouseParser.CLEAR) | (1 << ClickHouseParser.CLUSTER) | (1 << ClickHouseParser.CODEC) | (1 << ClickHouseParser.COLLATE) | (1 << ClickHouseParser.COLUMN) | (1 << ClickHouseParser.COMMENT) | (1 << ClickHouseParser.CONSTRAINT) | (1 << ClickHouseParser.CREATE) | (1 << ClickHouseParser.CROSS) | (1 << ClickHouseParser.CUBE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ClickHouseParser.CURRENT - 32)) | (1 << (ClickHouseParser.DATABASE - 32)) | (1 << (ClickHouseParser.DATABASES - 32)) | (1 << (ClickHouseParser.DATE - 32)) | (1 << (ClickHouseParser.DAY - 32)) | (1 << (ClickHouseParser.DEDUPLICATE - 32)) | (1 << (ClickHouseParser.DEFAULT - 32)) | (1 << (ClickHouseParser.DELAY - 32)) | (1 << (ClickHouseParser.DELETE - 32)) | (1 << (ClickHouseParser.DESC - 32)) | (1 << (ClickHouseParser.DESCENDING - 32)) | (1 << (ClickHouseParser.DESCRIBE - 32)) | (1 << (ClickHouseParser.DETACH - 32)) | (1 << (ClickHouseParser.DICTIONARIES - 32)) | (1 << (ClickHouseParser.DICTIONARY - 32)) | (1 << (ClickHouseParser.DISK - 32)) | (1 << (ClickHouseParser.DISTINCT - 32)) | (1 << (ClickHouseParser.DISTRIBUTED - 32)) | (1 << (ClickHouseParser.DROP - 32)) | (1 << (ClickHouseParser.ELSE - 32)) | (1 << (ClickHouseParser.END - 32)) | (1 << (ClickHouseParser.ENGINE - 32)) | (1 << (ClickHouseParser.EVENTS - 32)) | (1 << (ClickHouseParser.EXISTS - 32)) | (1 << (ClickHouseParser.EXPLAIN - 32)) | (1 << (ClickHouseParser.EXPRESSION - 32)) | (1 << (ClickHouseParser.EXTRACT - 32)) | (1 << (ClickHouseParser.FETCHES - 32)) | (1 << (ClickHouseParser.FINAL - 32)) | (1 << (ClickHouseParser.FIRST - 32)) | (1 << (ClickHouseParser.FLUSH - 32)) | (1 << (ClickHouseParser.FOLLOWING - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ClickHouseParser.FOR - 64)) | (1 << (ClickHouseParser.FORMAT - 64)) | (1 << (ClickHouseParser.FREEZE - 64)) | (1 << (ClickHouseParser.FROM - 64)) | (1 << (ClickHouseParser.FULL - 64)) | (1 << (ClickHouseParser.FUNCTION - 64)) | (1 << (ClickHouseParser.GLOBAL - 64)) | (1 << (ClickHouseParser.GRANULARITY - 64)) | (1 << (ClickHouseParser.GROUP - 64)) | (1 << (ClickHouseParser.HAVING - 64)) | (1 << (ClickHouseParser.HIERARCHICAL - 64)) | (1 << (ClickHouseParser.HOUR - 64)) | (1 << (ClickHouseParser.ID - 64)) | (1 << (ClickHouseParser.IF - 64)) | (1 << (ClickHouseParser.ILIKE - 64)) | (1 << (ClickHouseParser.IN - 64)) | (1 << (ClickHouseParser.INDEX - 64)) | (1 << (ClickHouseParser.INF - 64)) | (1 << (ClickHouseParser.INJECTIVE - 64)) | (1 << (ClickHouseParser.INNER - 64)) | (1 << (ClickHouseParser.INSERT - 64)) | (1 << (ClickHouseParser.INTERVAL - 64)) | (1 << (ClickHouseParser.INTO - 64)) | (1 << (ClickHouseParser.IS - 64)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 64)) | (1 << (ClickHouseParser.JOIN - 64)) | (1 << (ClickHouseParser.KEY - 64)) | (1 << (ClickHouseParser.KILL - 64)) | (1 << (ClickHouseParser.LAST - 64)) | (1 << (ClickHouseParser.LAYOUT - 64)) | (1 << (ClickHouseParser.LEADING - 64)) | (1 << (ClickHouseParser.LEFT - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (ClickHouseParser.LIFETIME - 96)) | (1 << (ClickHouseParser.LIKE - 96)) | (1 << (ClickHouseParser.LIMIT - 96)) | (1 << (ClickHouseParser.LIVE - 96)) | (1 << (ClickHouseParser.LOCAL - 96)) | (1 << (ClickHouseParser.LOGS - 96)) | (1 << (ClickHouseParser.MATERIALIZE - 96)) | (1 << (ClickHouseParser.MATERIALIZED - 96)) | (1 << (ClickHouseParser.MAX - 96)) | (1 << (ClickHouseParser.MERGES - 96)) | (1 << (ClickHouseParser.MIN - 96)) | (1 << (ClickHouseParser.MINUTE - 96)) | (1 << (ClickHouseParser.MODIFY - 96)) | (1 << (ClickHouseParser.MONTH - 96)) | (1 << (ClickHouseParser.MOVE - 96)) | (1 << (ClickHouseParser.MUTATION - 96)) | (1 << (ClickHouseParser.NAN_SQL - 96)) | (1 << (ClickHouseParser.NO - 96)) | (1 << (ClickHouseParser.NOT - 96)) | (1 << (ClickHouseParser.NULL_SQL - 96)) | (1 << (ClickHouseParser.NULLS - 96)) | (1 << (ClickHouseParser.OFFSET - 96)) | (1 << (ClickHouseParser.ON - 96)) | (1 << (ClickHouseParser.OPTIMIZE - 96)) | (1 << (ClickHouseParser.OR - 96)) | (1 << (ClickHouseParser.ORDER - 96)) | (1 << (ClickHouseParser.OUTER - 96)) | (1 << (ClickHouseParser.OUTFILE - 96)) | (1 << (ClickHouseParser.OVER - 96)) | (1 << (ClickHouseParser.PARTITION - 96)) | (1 << (ClickHouseParser.POPULATE - 96)) | (1 << (ClickHouseParser.PRECEDING - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (ClickHouseParser.PREWHERE - 128)) | (1 << (ClickHouseParser.PRIMARY - 128)) | (1 << (ClickHouseParser.QUARTER - 128)) | (1 << (ClickHouseParser.RANGE - 128)) | (1 << (ClickHouseParser.RELOAD - 128)) | (1 << (ClickHouseParser.REMOVE - 128)) | (1 << (ClickHouseParser.RENAME - 128)) | (1 << (ClickHouseParser.REPLACE - 128)) | (1 << (ClickHouseParser.REPLICA - 128)) | (1 << (ClickHouseParser.REPLICATED - 128)) | (1 << (ClickHouseParser.RIGHT - 128)) | (1 << (ClickHouseParser.ROLLUP - 128)) | (1 << (ClickHouseParser.ROW - 128)) | (1 << (ClickHouseParser.ROWS - 128)) | (1 << (ClickHouseParser.SAMPLE - 128)) | (1 << (ClickHouseParser.SECOND - 128)) | (1 << (ClickHouseParser.SELECT - 128)) | (1 << (ClickHouseParser.SEMI - 128)) | (1 << (ClickHouseParser.SENDS - 128)) | (1 << (ClickHouseParser.SET - 128)) | (1 << (ClickHouseParser.SETTINGS - 128)) | (1 << (ClickHouseParser.SHOW - 128)) | (1 << (ClickHouseParser.SOURCE - 128)) | (1 << (ClickHouseParser.START - 128)) | (1 << (ClickHouseParser.STOP - 128)) | (1 << (ClickHouseParser.SUBSTRING - 128)) | (1 << (ClickHouseParser.SYNC - 128)) | (1 << (ClickHouseParser.SYNTAX - 128)) | (1 << (ClickHouseParser.SYSTEM - 128)) | (1 << (ClickHouseParser.TABLE - 128)) | (1 << (ClickHouseParser.TABLES - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (ClickHouseParser.TEMPORARY - 160)) | (1 << (ClickHouseParser.TEST - 160)) | (1 << (ClickHouseParser.THEN - 160)) | (1 << (ClickHouseParser.TIES - 160)) | (1 << (ClickHouseParser.TIMEOUT - 160)) | (1 << (ClickHouseParser.TIMESTAMP - 160)) | (1 << (ClickHouseParser.TO - 160)) | (1 << (ClickHouseParser.TOP - 160)) | (1 << (ClickHouseParser.TOTALS - 160)) | (1 << (ClickHouseParser.TRAILING - 160)) | (1 << (ClickHouseParser.TRIM - 160)) | (1 << (ClickHouseParser.TRUNCATE - 160)) | (1 << (ClickHouseParser.TTL - 160)) | (1 << (ClickHouseParser.TYPE - 160)) | (1 << (ClickHouseParser.UNBOUNDED - 160)) | (1 << (ClickHouseParser.UNION - 160)) | (1 << (ClickHouseParser.UPDATE - 160)) | (1 << (ClickHouseParser.USE - 160)) | (1 << (ClickHouseParser.USING - 160)) | (1 << (ClickHouseParser.UUID - 160)) | (1 << (ClickHouseParser.VALUES - 160)) | (1 << (ClickHouseParser.VIEW - 160)) | (1 << (ClickHouseParser.VOLUME - 160)) | (1 << (ClickHouseParser.WATCH - 160)) | (1 << (ClickHouseParser.WEEK - 160)) | (1 << (ClickHouseParser.WHEN - 160)) | (1 << (ClickHouseParser.WHERE - 160)) | (1 << (ClickHouseParser.WINDOW - 160)) | (1 << (ClickHouseParser.WITH - 160)) | (1 << (ClickHouseParser.YEAR - 160)) | (1 << (ClickHouseParser.JSON_FALSE - 160)) | (1 << (ClickHouseParser.JSON_TRUE - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (ClickHouseParser.IDENTIFIER - 192)) | (1 << (ClickHouseParser.FLOATING_LITERAL - 192)) | (1 << (ClickHouseParser.OCTAL_LITERAL - 192)) | (1 << (ClickHouseParser.DECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.HEXADECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.STRING_LITERAL - 192)) | (1 << (ClickHouseParser.ASTERISK - 192)) | (1 << (ClickHouseParser.DASH - 192)) | (1 << (ClickHouseParser.DOT - 192)) | (1 << (ClickHouseParser.LBRACKET - 192)) | (1 << (ClickHouseParser.LPAREN - 192)) | (1 << (ClickHouseParser.PLUS - 192)))) !== 0)) {
					{
					this.state = 1618;
					this.columnExprList();
					}
				}

				this.state = 1621;
				this.match(ClickHouseParser.RPAREN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnExprList(): ColumnExprListContext {
		let _localctx: ColumnExprListContext = new ColumnExprListContext(this._ctx, this.state);
		this.enterRule(_localctx, 186, ClickHouseParser.RULE_columnExprList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1625;
			this.columnsExpr();
			this.state = 1630;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 228, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1626;
					this.match(ClickHouseParser.COMMA);
					this.state = 1627;
					this.columnsExpr();
					}
					}
				}
				this.state = 1632;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 228, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnsExpr(): ColumnsExprContext {
		let _localctx: ColumnsExprContext = new ColumnsExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 188, ClickHouseParser.RULE_columnsExpr);
		let _la: number;
		try {
			this.state = 1644;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 230, this._ctx) ) {
			case 1:
				_localctx = new ColumnsExprAsteriskContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1636;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 2)) & ~0x1F) === 0 && ((1 << (_la - 2)) & ((1 << (ClickHouseParser.AFTER - 2)) | (1 << (ClickHouseParser.ALIAS - 2)) | (1 << (ClickHouseParser.ALL - 2)) | (1 << (ClickHouseParser.ALTER - 2)) | (1 << (ClickHouseParser.AND - 2)) | (1 << (ClickHouseParser.ANTI - 2)) | (1 << (ClickHouseParser.ANY - 2)) | (1 << (ClickHouseParser.ARRAY - 2)) | (1 << (ClickHouseParser.AS - 2)) | (1 << (ClickHouseParser.ASCENDING - 2)) | (1 << (ClickHouseParser.ASOF - 2)) | (1 << (ClickHouseParser.AST - 2)) | (1 << (ClickHouseParser.ASYNC - 2)) | (1 << (ClickHouseParser.ATTACH - 2)) | (1 << (ClickHouseParser.BETWEEN - 2)) | (1 << (ClickHouseParser.BOTH - 2)) | (1 << (ClickHouseParser.BY - 2)) | (1 << (ClickHouseParser.CASE - 2)) | (1 << (ClickHouseParser.CAST - 2)) | (1 << (ClickHouseParser.CHECK - 2)) | (1 << (ClickHouseParser.CLEAR - 2)) | (1 << (ClickHouseParser.CLUSTER - 2)) | (1 << (ClickHouseParser.CODEC - 2)) | (1 << (ClickHouseParser.COLLATE - 2)) | (1 << (ClickHouseParser.COLUMN - 2)) | (1 << (ClickHouseParser.COMMENT - 2)) | (1 << (ClickHouseParser.CONSTRAINT - 2)) | (1 << (ClickHouseParser.CREATE - 2)) | (1 << (ClickHouseParser.CROSS - 2)) | (1 << (ClickHouseParser.CUBE - 2)) | (1 << (ClickHouseParser.CURRENT - 2)) | (1 << (ClickHouseParser.DATABASE - 2)))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ClickHouseParser.DATABASES - 34)) | (1 << (ClickHouseParser.DATE - 34)) | (1 << (ClickHouseParser.DAY - 34)) | (1 << (ClickHouseParser.DEDUPLICATE - 34)) | (1 << (ClickHouseParser.DEFAULT - 34)) | (1 << (ClickHouseParser.DELAY - 34)) | (1 << (ClickHouseParser.DELETE - 34)) | (1 << (ClickHouseParser.DESC - 34)) | (1 << (ClickHouseParser.DESCENDING - 34)) | (1 << (ClickHouseParser.DESCRIBE - 34)) | (1 << (ClickHouseParser.DETACH - 34)) | (1 << (ClickHouseParser.DICTIONARIES - 34)) | (1 << (ClickHouseParser.DICTIONARY - 34)) | (1 << (ClickHouseParser.DISK - 34)) | (1 << (ClickHouseParser.DISTINCT - 34)) | (1 << (ClickHouseParser.DISTRIBUTED - 34)) | (1 << (ClickHouseParser.DROP - 34)) | (1 << (ClickHouseParser.ELSE - 34)) | (1 << (ClickHouseParser.END - 34)) | (1 << (ClickHouseParser.ENGINE - 34)) | (1 << (ClickHouseParser.EVENTS - 34)) | (1 << (ClickHouseParser.EXISTS - 34)) | (1 << (ClickHouseParser.EXPLAIN - 34)) | (1 << (ClickHouseParser.EXPRESSION - 34)) | (1 << (ClickHouseParser.EXTRACT - 34)) | (1 << (ClickHouseParser.FETCHES - 34)) | (1 << (ClickHouseParser.FINAL - 34)) | (1 << (ClickHouseParser.FIRST - 34)) | (1 << (ClickHouseParser.FLUSH - 34)) | (1 << (ClickHouseParser.FOLLOWING - 34)) | (1 << (ClickHouseParser.FOR - 34)) | (1 << (ClickHouseParser.FORMAT - 34)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (ClickHouseParser.FREEZE - 66)) | (1 << (ClickHouseParser.FROM - 66)) | (1 << (ClickHouseParser.FULL - 66)) | (1 << (ClickHouseParser.FUNCTION - 66)) | (1 << (ClickHouseParser.GLOBAL - 66)) | (1 << (ClickHouseParser.GRANULARITY - 66)) | (1 << (ClickHouseParser.GROUP - 66)) | (1 << (ClickHouseParser.HAVING - 66)) | (1 << (ClickHouseParser.HIERARCHICAL - 66)) | (1 << (ClickHouseParser.HOUR - 66)) | (1 << (ClickHouseParser.ID - 66)) | (1 << (ClickHouseParser.IF - 66)) | (1 << (ClickHouseParser.ILIKE - 66)) | (1 << (ClickHouseParser.IN - 66)) | (1 << (ClickHouseParser.INDEX - 66)) | (1 << (ClickHouseParser.INJECTIVE - 66)) | (1 << (ClickHouseParser.INNER - 66)) | (1 << (ClickHouseParser.INSERT - 66)) | (1 << (ClickHouseParser.INTERVAL - 66)) | (1 << (ClickHouseParser.INTO - 66)) | (1 << (ClickHouseParser.IS - 66)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 66)) | (1 << (ClickHouseParser.JOIN - 66)) | (1 << (ClickHouseParser.KEY - 66)) | (1 << (ClickHouseParser.KILL - 66)) | (1 << (ClickHouseParser.LAST - 66)) | (1 << (ClickHouseParser.LAYOUT - 66)) | (1 << (ClickHouseParser.LEADING - 66)) | (1 << (ClickHouseParser.LEFT - 66)) | (1 << (ClickHouseParser.LIFETIME - 66)) | (1 << (ClickHouseParser.LIKE - 66)))) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & ((1 << (ClickHouseParser.LIMIT - 98)) | (1 << (ClickHouseParser.LIVE - 98)) | (1 << (ClickHouseParser.LOCAL - 98)) | (1 << (ClickHouseParser.LOGS - 98)) | (1 << (ClickHouseParser.MATERIALIZE - 98)) | (1 << (ClickHouseParser.MATERIALIZED - 98)) | (1 << (ClickHouseParser.MAX - 98)) | (1 << (ClickHouseParser.MERGES - 98)) | (1 << (ClickHouseParser.MIN - 98)) | (1 << (ClickHouseParser.MINUTE - 98)) | (1 << (ClickHouseParser.MODIFY - 98)) | (1 << (ClickHouseParser.MONTH - 98)) | (1 << (ClickHouseParser.MOVE - 98)) | (1 << (ClickHouseParser.MUTATION - 98)) | (1 << (ClickHouseParser.NO - 98)) | (1 << (ClickHouseParser.NOT - 98)) | (1 << (ClickHouseParser.NULLS - 98)) | (1 << (ClickHouseParser.OFFSET - 98)) | (1 << (ClickHouseParser.ON - 98)) | (1 << (ClickHouseParser.OPTIMIZE - 98)) | (1 << (ClickHouseParser.OR - 98)) | (1 << (ClickHouseParser.ORDER - 98)) | (1 << (ClickHouseParser.OUTER - 98)) | (1 << (ClickHouseParser.OUTFILE - 98)) | (1 << (ClickHouseParser.OVER - 98)) | (1 << (ClickHouseParser.PARTITION - 98)) | (1 << (ClickHouseParser.POPULATE - 98)) | (1 << (ClickHouseParser.PRECEDING - 98)) | (1 << (ClickHouseParser.PREWHERE - 98)) | (1 << (ClickHouseParser.PRIMARY - 98)))) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & ((1 << (ClickHouseParser.QUARTER - 131)) | (1 << (ClickHouseParser.RANGE - 131)) | (1 << (ClickHouseParser.RELOAD - 131)) | (1 << (ClickHouseParser.REMOVE - 131)) | (1 << (ClickHouseParser.RENAME - 131)) | (1 << (ClickHouseParser.REPLACE - 131)) | (1 << (ClickHouseParser.REPLICA - 131)) | (1 << (ClickHouseParser.REPLICATED - 131)) | (1 << (ClickHouseParser.RIGHT - 131)) | (1 << (ClickHouseParser.ROLLUP - 131)) | (1 << (ClickHouseParser.ROW - 131)) | (1 << (ClickHouseParser.ROWS - 131)) | (1 << (ClickHouseParser.SAMPLE - 131)) | (1 << (ClickHouseParser.SECOND - 131)) | (1 << (ClickHouseParser.SELECT - 131)) | (1 << (ClickHouseParser.SEMI - 131)) | (1 << (ClickHouseParser.SENDS - 131)) | (1 << (ClickHouseParser.SET - 131)) | (1 << (ClickHouseParser.SETTINGS - 131)) | (1 << (ClickHouseParser.SHOW - 131)) | (1 << (ClickHouseParser.SOURCE - 131)) | (1 << (ClickHouseParser.START - 131)) | (1 << (ClickHouseParser.STOP - 131)) | (1 << (ClickHouseParser.SUBSTRING - 131)) | (1 << (ClickHouseParser.SYNC - 131)) | (1 << (ClickHouseParser.SYNTAX - 131)) | (1 << (ClickHouseParser.SYSTEM - 131)) | (1 << (ClickHouseParser.TABLE - 131)) | (1 << (ClickHouseParser.TABLES - 131)) | (1 << (ClickHouseParser.TEMPORARY - 131)) | (1 << (ClickHouseParser.TEST - 131)) | (1 << (ClickHouseParser.THEN - 131)))) !== 0) || ((((_la - 163)) & ~0x1F) === 0 && ((1 << (_la - 163)) & ((1 << (ClickHouseParser.TIES - 163)) | (1 << (ClickHouseParser.TIMEOUT - 163)) | (1 << (ClickHouseParser.TIMESTAMP - 163)) | (1 << (ClickHouseParser.TO - 163)) | (1 << (ClickHouseParser.TOP - 163)) | (1 << (ClickHouseParser.TOTALS - 163)) | (1 << (ClickHouseParser.TRAILING - 163)) | (1 << (ClickHouseParser.TRIM - 163)) | (1 << (ClickHouseParser.TRUNCATE - 163)) | (1 << (ClickHouseParser.TTL - 163)) | (1 << (ClickHouseParser.TYPE - 163)) | (1 << (ClickHouseParser.UNBOUNDED - 163)) | (1 << (ClickHouseParser.UNION - 163)) | (1 << (ClickHouseParser.UPDATE - 163)) | (1 << (ClickHouseParser.USE - 163)) | (1 << (ClickHouseParser.USING - 163)) | (1 << (ClickHouseParser.UUID - 163)) | (1 << (ClickHouseParser.VALUES - 163)) | (1 << (ClickHouseParser.VIEW - 163)) | (1 << (ClickHouseParser.VOLUME - 163)) | (1 << (ClickHouseParser.WATCH - 163)) | (1 << (ClickHouseParser.WEEK - 163)) | (1 << (ClickHouseParser.WHEN - 163)) | (1 << (ClickHouseParser.WHERE - 163)) | (1 << (ClickHouseParser.WINDOW - 163)) | (1 << (ClickHouseParser.WITH - 163)) | (1 << (ClickHouseParser.YEAR - 163)) | (1 << (ClickHouseParser.JSON_FALSE - 163)) | (1 << (ClickHouseParser.JSON_TRUE - 163)) | (1 << (ClickHouseParser.IDENTIFIER - 163)))) !== 0)) {
					{
					this.state = 1633;
					this.tableIdentifier();
					this.state = 1634;
					this.match(ClickHouseParser.DOT);
					}
				}

				this.state = 1638;
				this.match(ClickHouseParser.ASTERISK);
				}
				break;

			case 2:
				_localctx = new ColumnsExprSubqueryContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1639;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1640;
				this.selectUnionStmt();
				this.state = 1641;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 3:
				_localctx = new ColumnsExprColumnContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1643;
				this.columnExpr(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public columnExpr(): ColumnExprContext;
	public columnExpr(_p: number): ColumnExprContext;
	// @RuleVersion(0)
	public columnExpr(_p?: number): ColumnExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ColumnExprContext = new ColumnExprContext(this._ctx, _parentState);
		let _prevctx: ColumnExprContext = _localctx;
		let _startState: number = 190;
		this.enterRecursionRule(_localctx, 190, ClickHouseParser.RULE_columnExpr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1775;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 243, this._ctx) ) {
			case 1:
				{
				_localctx = new ColumnExprCaseContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 1647;
				this.match(ClickHouseParser.CASE);
				this.state = 1649;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 231, this._ctx) ) {
				case 1:
					{
					this.state = 1648;
					this.columnExpr(0);
					}
					break;
				}
				this.state = 1656;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 1651;
					this.match(ClickHouseParser.WHEN);
					this.state = 1652;
					this.columnExpr(0);
					this.state = 1653;
					this.match(ClickHouseParser.THEN);
					this.state = 1654;
					this.columnExpr(0);
					}
					}
					this.state = 1658;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === ClickHouseParser.WHEN);
				this.state = 1662;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.ELSE) {
					{
					this.state = 1660;
					this.match(ClickHouseParser.ELSE);
					this.state = 1661;
					this.columnExpr(0);
					}
				}

				this.state = 1664;
				this.match(ClickHouseParser.END);
				}
				break;

			case 2:
				{
				_localctx = new ColumnExprCastContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1666;
				this.match(ClickHouseParser.CAST);
				this.state = 1667;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1668;
				this.columnExpr(0);
				this.state = 1669;
				this.match(ClickHouseParser.AS);
				this.state = 1670;
				this.columnTypeExpr();
				this.state = 1671;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 3:
				{
				_localctx = new ColumnExprDateContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1673;
				this.match(ClickHouseParser.DATE);
				this.state = 1674;
				this.match(ClickHouseParser.STRING_LITERAL);
				}
				break;

			case 4:
				{
				_localctx = new ColumnExprExtractContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1675;
				this.match(ClickHouseParser.EXTRACT);
				this.state = 1676;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1677;
				this.interval();
				this.state = 1678;
				this.match(ClickHouseParser.FROM);
				this.state = 1679;
				this.columnExpr(0);
				this.state = 1680;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 5:
				{
				_localctx = new ColumnExprIntervalContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1682;
				this.match(ClickHouseParser.INTERVAL);
				this.state = 1683;
				this.columnExpr(0);
				this.state = 1684;
				this.interval();
				}
				break;

			case 6:
				{
				_localctx = new ColumnExprSubstringContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1686;
				this.match(ClickHouseParser.SUBSTRING);
				this.state = 1687;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1688;
				this.columnExpr(0);
				this.state = 1689;
				this.match(ClickHouseParser.FROM);
				this.state = 1690;
				this.columnExpr(0);
				this.state = 1693;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ClickHouseParser.FOR) {
					{
					this.state = 1691;
					this.match(ClickHouseParser.FOR);
					this.state = 1692;
					this.columnExpr(0);
					}
				}

				this.state = 1695;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 7:
				{
				_localctx = new ColumnExprTimestampContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1697;
				this.match(ClickHouseParser.TIMESTAMP);
				this.state = 1698;
				this.match(ClickHouseParser.STRING_LITERAL);
				}
				break;

			case 8:
				{
				_localctx = new ColumnExprTrimContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1699;
				this.match(ClickHouseParser.TRIM);
				this.state = 1700;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1701;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.BOTH || _la === ClickHouseParser.LEADING || _la === ClickHouseParser.TRAILING)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 1702;
				this.match(ClickHouseParser.STRING_LITERAL);
				this.state = 1703;
				this.match(ClickHouseParser.FROM);
				this.state = 1704;
				this.columnExpr(0);
				this.state = 1705;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 9:
				{
				_localctx = new ColumnExprWinFunctionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1707;
				this.identifier();
				{
				this.state = 1708;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1710;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.AFTER) | (1 << ClickHouseParser.ALIAS) | (1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ALTER) | (1 << ClickHouseParser.AND) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ARRAY) | (1 << ClickHouseParser.AS) | (1 << ClickHouseParser.ASCENDING) | (1 << ClickHouseParser.ASOF) | (1 << ClickHouseParser.AST) | (1 << ClickHouseParser.ASYNC) | (1 << ClickHouseParser.ATTACH) | (1 << ClickHouseParser.BETWEEN) | (1 << ClickHouseParser.BOTH) | (1 << ClickHouseParser.BY) | (1 << ClickHouseParser.CASE) | (1 << ClickHouseParser.CAST) | (1 << ClickHouseParser.CHECK) | (1 << ClickHouseParser.CLEAR) | (1 << ClickHouseParser.CLUSTER) | (1 << ClickHouseParser.CODEC) | (1 << ClickHouseParser.COLLATE) | (1 << ClickHouseParser.COLUMN) | (1 << ClickHouseParser.COMMENT) | (1 << ClickHouseParser.CONSTRAINT) | (1 << ClickHouseParser.CREATE) | (1 << ClickHouseParser.CROSS) | (1 << ClickHouseParser.CUBE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ClickHouseParser.CURRENT - 32)) | (1 << (ClickHouseParser.DATABASE - 32)) | (1 << (ClickHouseParser.DATABASES - 32)) | (1 << (ClickHouseParser.DATE - 32)) | (1 << (ClickHouseParser.DAY - 32)) | (1 << (ClickHouseParser.DEDUPLICATE - 32)) | (1 << (ClickHouseParser.DEFAULT - 32)) | (1 << (ClickHouseParser.DELAY - 32)) | (1 << (ClickHouseParser.DELETE - 32)) | (1 << (ClickHouseParser.DESC - 32)) | (1 << (ClickHouseParser.DESCENDING - 32)) | (1 << (ClickHouseParser.DESCRIBE - 32)) | (1 << (ClickHouseParser.DETACH - 32)) | (1 << (ClickHouseParser.DICTIONARIES - 32)) | (1 << (ClickHouseParser.DICTIONARY - 32)) | (1 << (ClickHouseParser.DISK - 32)) | (1 << (ClickHouseParser.DISTINCT - 32)) | (1 << (ClickHouseParser.DISTRIBUTED - 32)) | (1 << (ClickHouseParser.DROP - 32)) | (1 << (ClickHouseParser.ELSE - 32)) | (1 << (ClickHouseParser.END - 32)) | (1 << (ClickHouseParser.ENGINE - 32)) | (1 << (ClickHouseParser.EVENTS - 32)) | (1 << (ClickHouseParser.EXISTS - 32)) | (1 << (ClickHouseParser.EXPLAIN - 32)) | (1 << (ClickHouseParser.EXPRESSION - 32)) | (1 << (ClickHouseParser.EXTRACT - 32)) | (1 << (ClickHouseParser.FETCHES - 32)) | (1 << (ClickHouseParser.FINAL - 32)) | (1 << (ClickHouseParser.FIRST - 32)) | (1 << (ClickHouseParser.FLUSH - 32)) | (1 << (ClickHouseParser.FOLLOWING - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ClickHouseParser.FOR - 64)) | (1 << (ClickHouseParser.FORMAT - 64)) | (1 << (ClickHouseParser.FREEZE - 64)) | (1 << (ClickHouseParser.FROM - 64)) | (1 << (ClickHouseParser.FULL - 64)) | (1 << (ClickHouseParser.FUNCTION - 64)) | (1 << (ClickHouseParser.GLOBAL - 64)) | (1 << (ClickHouseParser.GRANULARITY - 64)) | (1 << (ClickHouseParser.GROUP - 64)) | (1 << (ClickHouseParser.HAVING - 64)) | (1 << (ClickHouseParser.HIERARCHICAL - 64)) | (1 << (ClickHouseParser.HOUR - 64)) | (1 << (ClickHouseParser.ID - 64)) | (1 << (ClickHouseParser.IF - 64)) | (1 << (ClickHouseParser.ILIKE - 64)) | (1 << (ClickHouseParser.IN - 64)) | (1 << (ClickHouseParser.INDEX - 64)) | (1 << (ClickHouseParser.INF - 64)) | (1 << (ClickHouseParser.INJECTIVE - 64)) | (1 << (ClickHouseParser.INNER - 64)) | (1 << (ClickHouseParser.INSERT - 64)) | (1 << (ClickHouseParser.INTERVAL - 64)) | (1 << (ClickHouseParser.INTO - 64)) | (1 << (ClickHouseParser.IS - 64)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 64)) | (1 << (ClickHouseParser.JOIN - 64)) | (1 << (ClickHouseParser.KEY - 64)) | (1 << (ClickHouseParser.KILL - 64)) | (1 << (ClickHouseParser.LAST - 64)) | (1 << (ClickHouseParser.LAYOUT - 64)) | (1 << (ClickHouseParser.LEADING - 64)) | (1 << (ClickHouseParser.LEFT - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (ClickHouseParser.LIFETIME - 96)) | (1 << (ClickHouseParser.LIKE - 96)) | (1 << (ClickHouseParser.LIMIT - 96)) | (1 << (ClickHouseParser.LIVE - 96)) | (1 << (ClickHouseParser.LOCAL - 96)) | (1 << (ClickHouseParser.LOGS - 96)) | (1 << (ClickHouseParser.MATERIALIZE - 96)) | (1 << (ClickHouseParser.MATERIALIZED - 96)) | (1 << (ClickHouseParser.MAX - 96)) | (1 << (ClickHouseParser.MERGES - 96)) | (1 << (ClickHouseParser.MIN - 96)) | (1 << (ClickHouseParser.MINUTE - 96)) | (1 << (ClickHouseParser.MODIFY - 96)) | (1 << (ClickHouseParser.MONTH - 96)) | (1 << (ClickHouseParser.MOVE - 96)) | (1 << (ClickHouseParser.MUTATION - 96)) | (1 << (ClickHouseParser.NAN_SQL - 96)) | (1 << (ClickHouseParser.NO - 96)) | (1 << (ClickHouseParser.NOT - 96)) | (1 << (ClickHouseParser.NULL_SQL - 96)) | (1 << (ClickHouseParser.NULLS - 96)) | (1 << (ClickHouseParser.OFFSET - 96)) | (1 << (ClickHouseParser.ON - 96)) | (1 << (ClickHouseParser.OPTIMIZE - 96)) | (1 << (ClickHouseParser.OR - 96)) | (1 << (ClickHouseParser.ORDER - 96)) | (1 << (ClickHouseParser.OUTER - 96)) | (1 << (ClickHouseParser.OUTFILE - 96)) | (1 << (ClickHouseParser.OVER - 96)) | (1 << (ClickHouseParser.PARTITION - 96)) | (1 << (ClickHouseParser.POPULATE - 96)) | (1 << (ClickHouseParser.PRECEDING - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (ClickHouseParser.PREWHERE - 128)) | (1 << (ClickHouseParser.PRIMARY - 128)) | (1 << (ClickHouseParser.QUARTER - 128)) | (1 << (ClickHouseParser.RANGE - 128)) | (1 << (ClickHouseParser.RELOAD - 128)) | (1 << (ClickHouseParser.REMOVE - 128)) | (1 << (ClickHouseParser.RENAME - 128)) | (1 << (ClickHouseParser.REPLACE - 128)) | (1 << (ClickHouseParser.REPLICA - 128)) | (1 << (ClickHouseParser.REPLICATED - 128)) | (1 << (ClickHouseParser.RIGHT - 128)) | (1 << (ClickHouseParser.ROLLUP - 128)) | (1 << (ClickHouseParser.ROW - 128)) | (1 << (ClickHouseParser.ROWS - 128)) | (1 << (ClickHouseParser.SAMPLE - 128)) | (1 << (ClickHouseParser.SECOND - 128)) | (1 << (ClickHouseParser.SELECT - 128)) | (1 << (ClickHouseParser.SEMI - 128)) | (1 << (ClickHouseParser.SENDS - 128)) | (1 << (ClickHouseParser.SET - 128)) | (1 << (ClickHouseParser.SETTINGS - 128)) | (1 << (ClickHouseParser.SHOW - 128)) | (1 << (ClickHouseParser.SOURCE - 128)) | (1 << (ClickHouseParser.START - 128)) | (1 << (ClickHouseParser.STOP - 128)) | (1 << (ClickHouseParser.SUBSTRING - 128)) | (1 << (ClickHouseParser.SYNC - 128)) | (1 << (ClickHouseParser.SYNTAX - 128)) | (1 << (ClickHouseParser.SYSTEM - 128)) | (1 << (ClickHouseParser.TABLE - 128)) | (1 << (ClickHouseParser.TABLES - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (ClickHouseParser.TEMPORARY - 160)) | (1 << (ClickHouseParser.TEST - 160)) | (1 << (ClickHouseParser.THEN - 160)) | (1 << (ClickHouseParser.TIES - 160)) | (1 << (ClickHouseParser.TIMEOUT - 160)) | (1 << (ClickHouseParser.TIMESTAMP - 160)) | (1 << (ClickHouseParser.TO - 160)) | (1 << (ClickHouseParser.TOP - 160)) | (1 << (ClickHouseParser.TOTALS - 160)) | (1 << (ClickHouseParser.TRAILING - 160)) | (1 << (ClickHouseParser.TRIM - 160)) | (1 << (ClickHouseParser.TRUNCATE - 160)) | (1 << (ClickHouseParser.TTL - 160)) | (1 << (ClickHouseParser.TYPE - 160)) | (1 << (ClickHouseParser.UNBOUNDED - 160)) | (1 << (ClickHouseParser.UNION - 160)) | (1 << (ClickHouseParser.UPDATE - 160)) | (1 << (ClickHouseParser.USE - 160)) | (1 << (ClickHouseParser.USING - 160)) | (1 << (ClickHouseParser.UUID - 160)) | (1 << (ClickHouseParser.VALUES - 160)) | (1 << (ClickHouseParser.VIEW - 160)) | (1 << (ClickHouseParser.VOLUME - 160)) | (1 << (ClickHouseParser.WATCH - 160)) | (1 << (ClickHouseParser.WEEK - 160)) | (1 << (ClickHouseParser.WHEN - 160)) | (1 << (ClickHouseParser.WHERE - 160)) | (1 << (ClickHouseParser.WINDOW - 160)) | (1 << (ClickHouseParser.WITH - 160)) | (1 << (ClickHouseParser.YEAR - 160)) | (1 << (ClickHouseParser.JSON_FALSE - 160)) | (1 << (ClickHouseParser.JSON_TRUE - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (ClickHouseParser.IDENTIFIER - 192)) | (1 << (ClickHouseParser.FLOATING_LITERAL - 192)) | (1 << (ClickHouseParser.OCTAL_LITERAL - 192)) | (1 << (ClickHouseParser.DECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.HEXADECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.STRING_LITERAL - 192)) | (1 << (ClickHouseParser.ASTERISK - 192)) | (1 << (ClickHouseParser.DASH - 192)) | (1 << (ClickHouseParser.DOT - 192)) | (1 << (ClickHouseParser.LBRACKET - 192)) | (1 << (ClickHouseParser.LPAREN - 192)) | (1 << (ClickHouseParser.PLUS - 192)))) !== 0)) {
					{
					this.state = 1709;
					this.columnExprList();
					}
				}

				this.state = 1712;
				this.match(ClickHouseParser.RPAREN);
				}
				this.state = 1714;
				this.match(ClickHouseParser.OVER);
				this.state = 1715;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1716;
				this.windowExpr();
				this.state = 1717;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 10:
				{
				_localctx = new ColumnExprWinFunctionTargetContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1719;
				this.identifier();
				{
				this.state = 1720;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1722;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.AFTER) | (1 << ClickHouseParser.ALIAS) | (1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ALTER) | (1 << ClickHouseParser.AND) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ARRAY) | (1 << ClickHouseParser.AS) | (1 << ClickHouseParser.ASCENDING) | (1 << ClickHouseParser.ASOF) | (1 << ClickHouseParser.AST) | (1 << ClickHouseParser.ASYNC) | (1 << ClickHouseParser.ATTACH) | (1 << ClickHouseParser.BETWEEN) | (1 << ClickHouseParser.BOTH) | (1 << ClickHouseParser.BY) | (1 << ClickHouseParser.CASE) | (1 << ClickHouseParser.CAST) | (1 << ClickHouseParser.CHECK) | (1 << ClickHouseParser.CLEAR) | (1 << ClickHouseParser.CLUSTER) | (1 << ClickHouseParser.CODEC) | (1 << ClickHouseParser.COLLATE) | (1 << ClickHouseParser.COLUMN) | (1 << ClickHouseParser.COMMENT) | (1 << ClickHouseParser.CONSTRAINT) | (1 << ClickHouseParser.CREATE) | (1 << ClickHouseParser.CROSS) | (1 << ClickHouseParser.CUBE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ClickHouseParser.CURRENT - 32)) | (1 << (ClickHouseParser.DATABASE - 32)) | (1 << (ClickHouseParser.DATABASES - 32)) | (1 << (ClickHouseParser.DATE - 32)) | (1 << (ClickHouseParser.DAY - 32)) | (1 << (ClickHouseParser.DEDUPLICATE - 32)) | (1 << (ClickHouseParser.DEFAULT - 32)) | (1 << (ClickHouseParser.DELAY - 32)) | (1 << (ClickHouseParser.DELETE - 32)) | (1 << (ClickHouseParser.DESC - 32)) | (1 << (ClickHouseParser.DESCENDING - 32)) | (1 << (ClickHouseParser.DESCRIBE - 32)) | (1 << (ClickHouseParser.DETACH - 32)) | (1 << (ClickHouseParser.DICTIONARIES - 32)) | (1 << (ClickHouseParser.DICTIONARY - 32)) | (1 << (ClickHouseParser.DISK - 32)) | (1 << (ClickHouseParser.DISTINCT - 32)) | (1 << (ClickHouseParser.DISTRIBUTED - 32)) | (1 << (ClickHouseParser.DROP - 32)) | (1 << (ClickHouseParser.ELSE - 32)) | (1 << (ClickHouseParser.END - 32)) | (1 << (ClickHouseParser.ENGINE - 32)) | (1 << (ClickHouseParser.EVENTS - 32)) | (1 << (ClickHouseParser.EXISTS - 32)) | (1 << (ClickHouseParser.EXPLAIN - 32)) | (1 << (ClickHouseParser.EXPRESSION - 32)) | (1 << (ClickHouseParser.EXTRACT - 32)) | (1 << (ClickHouseParser.FETCHES - 32)) | (1 << (ClickHouseParser.FINAL - 32)) | (1 << (ClickHouseParser.FIRST - 32)) | (1 << (ClickHouseParser.FLUSH - 32)) | (1 << (ClickHouseParser.FOLLOWING - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ClickHouseParser.FOR - 64)) | (1 << (ClickHouseParser.FORMAT - 64)) | (1 << (ClickHouseParser.FREEZE - 64)) | (1 << (ClickHouseParser.FROM - 64)) | (1 << (ClickHouseParser.FULL - 64)) | (1 << (ClickHouseParser.FUNCTION - 64)) | (1 << (ClickHouseParser.GLOBAL - 64)) | (1 << (ClickHouseParser.GRANULARITY - 64)) | (1 << (ClickHouseParser.GROUP - 64)) | (1 << (ClickHouseParser.HAVING - 64)) | (1 << (ClickHouseParser.HIERARCHICAL - 64)) | (1 << (ClickHouseParser.HOUR - 64)) | (1 << (ClickHouseParser.ID - 64)) | (1 << (ClickHouseParser.IF - 64)) | (1 << (ClickHouseParser.ILIKE - 64)) | (1 << (ClickHouseParser.IN - 64)) | (1 << (ClickHouseParser.INDEX - 64)) | (1 << (ClickHouseParser.INF - 64)) | (1 << (ClickHouseParser.INJECTIVE - 64)) | (1 << (ClickHouseParser.INNER - 64)) | (1 << (ClickHouseParser.INSERT - 64)) | (1 << (ClickHouseParser.INTERVAL - 64)) | (1 << (ClickHouseParser.INTO - 64)) | (1 << (ClickHouseParser.IS - 64)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 64)) | (1 << (ClickHouseParser.JOIN - 64)) | (1 << (ClickHouseParser.KEY - 64)) | (1 << (ClickHouseParser.KILL - 64)) | (1 << (ClickHouseParser.LAST - 64)) | (1 << (ClickHouseParser.LAYOUT - 64)) | (1 << (ClickHouseParser.LEADING - 64)) | (1 << (ClickHouseParser.LEFT - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (ClickHouseParser.LIFETIME - 96)) | (1 << (ClickHouseParser.LIKE - 96)) | (1 << (ClickHouseParser.LIMIT - 96)) | (1 << (ClickHouseParser.LIVE - 96)) | (1 << (ClickHouseParser.LOCAL - 96)) | (1 << (ClickHouseParser.LOGS - 96)) | (1 << (ClickHouseParser.MATERIALIZE - 96)) | (1 << (ClickHouseParser.MATERIALIZED - 96)) | (1 << (ClickHouseParser.MAX - 96)) | (1 << (ClickHouseParser.MERGES - 96)) | (1 << (ClickHouseParser.MIN - 96)) | (1 << (ClickHouseParser.MINUTE - 96)) | (1 << (ClickHouseParser.MODIFY - 96)) | (1 << (ClickHouseParser.MONTH - 96)) | (1 << (ClickHouseParser.MOVE - 96)) | (1 << (ClickHouseParser.MUTATION - 96)) | (1 << (ClickHouseParser.NAN_SQL - 96)) | (1 << (ClickHouseParser.NO - 96)) | (1 << (ClickHouseParser.NOT - 96)) | (1 << (ClickHouseParser.NULL_SQL - 96)) | (1 << (ClickHouseParser.NULLS - 96)) | (1 << (ClickHouseParser.OFFSET - 96)) | (1 << (ClickHouseParser.ON - 96)) | (1 << (ClickHouseParser.OPTIMIZE - 96)) | (1 << (ClickHouseParser.OR - 96)) | (1 << (ClickHouseParser.ORDER - 96)) | (1 << (ClickHouseParser.OUTER - 96)) | (1 << (ClickHouseParser.OUTFILE - 96)) | (1 << (ClickHouseParser.OVER - 96)) | (1 << (ClickHouseParser.PARTITION - 96)) | (1 << (ClickHouseParser.POPULATE - 96)) | (1 << (ClickHouseParser.PRECEDING - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (ClickHouseParser.PREWHERE - 128)) | (1 << (ClickHouseParser.PRIMARY - 128)) | (1 << (ClickHouseParser.QUARTER - 128)) | (1 << (ClickHouseParser.RANGE - 128)) | (1 << (ClickHouseParser.RELOAD - 128)) | (1 << (ClickHouseParser.REMOVE - 128)) | (1 << (ClickHouseParser.RENAME - 128)) | (1 << (ClickHouseParser.REPLACE - 128)) | (1 << (ClickHouseParser.REPLICA - 128)) | (1 << (ClickHouseParser.REPLICATED - 128)) | (1 << (ClickHouseParser.RIGHT - 128)) | (1 << (ClickHouseParser.ROLLUP - 128)) | (1 << (ClickHouseParser.ROW - 128)) | (1 << (ClickHouseParser.ROWS - 128)) | (1 << (ClickHouseParser.SAMPLE - 128)) | (1 << (ClickHouseParser.SECOND - 128)) | (1 << (ClickHouseParser.SELECT - 128)) | (1 << (ClickHouseParser.SEMI - 128)) | (1 << (ClickHouseParser.SENDS - 128)) | (1 << (ClickHouseParser.SET - 128)) | (1 << (ClickHouseParser.SETTINGS - 128)) | (1 << (ClickHouseParser.SHOW - 128)) | (1 << (ClickHouseParser.SOURCE - 128)) | (1 << (ClickHouseParser.START - 128)) | (1 << (ClickHouseParser.STOP - 128)) | (1 << (ClickHouseParser.SUBSTRING - 128)) | (1 << (ClickHouseParser.SYNC - 128)) | (1 << (ClickHouseParser.SYNTAX - 128)) | (1 << (ClickHouseParser.SYSTEM - 128)) | (1 << (ClickHouseParser.TABLE - 128)) | (1 << (ClickHouseParser.TABLES - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (ClickHouseParser.TEMPORARY - 160)) | (1 << (ClickHouseParser.TEST - 160)) | (1 << (ClickHouseParser.THEN - 160)) | (1 << (ClickHouseParser.TIES - 160)) | (1 << (ClickHouseParser.TIMEOUT - 160)) | (1 << (ClickHouseParser.TIMESTAMP - 160)) | (1 << (ClickHouseParser.TO - 160)) | (1 << (ClickHouseParser.TOP - 160)) | (1 << (ClickHouseParser.TOTALS - 160)) | (1 << (ClickHouseParser.TRAILING - 160)) | (1 << (ClickHouseParser.TRIM - 160)) | (1 << (ClickHouseParser.TRUNCATE - 160)) | (1 << (ClickHouseParser.TTL - 160)) | (1 << (ClickHouseParser.TYPE - 160)) | (1 << (ClickHouseParser.UNBOUNDED - 160)) | (1 << (ClickHouseParser.UNION - 160)) | (1 << (ClickHouseParser.UPDATE - 160)) | (1 << (ClickHouseParser.USE - 160)) | (1 << (ClickHouseParser.USING - 160)) | (1 << (ClickHouseParser.UUID - 160)) | (1 << (ClickHouseParser.VALUES - 160)) | (1 << (ClickHouseParser.VIEW - 160)) | (1 << (ClickHouseParser.VOLUME - 160)) | (1 << (ClickHouseParser.WATCH - 160)) | (1 << (ClickHouseParser.WEEK - 160)) | (1 << (ClickHouseParser.WHEN - 160)) | (1 << (ClickHouseParser.WHERE - 160)) | (1 << (ClickHouseParser.WINDOW - 160)) | (1 << (ClickHouseParser.WITH - 160)) | (1 << (ClickHouseParser.YEAR - 160)) | (1 << (ClickHouseParser.JSON_FALSE - 160)) | (1 << (ClickHouseParser.JSON_TRUE - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (ClickHouseParser.IDENTIFIER - 192)) | (1 << (ClickHouseParser.FLOATING_LITERAL - 192)) | (1 << (ClickHouseParser.OCTAL_LITERAL - 192)) | (1 << (ClickHouseParser.DECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.HEXADECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.STRING_LITERAL - 192)) | (1 << (ClickHouseParser.ASTERISK - 192)) | (1 << (ClickHouseParser.DASH - 192)) | (1 << (ClickHouseParser.DOT - 192)) | (1 << (ClickHouseParser.LBRACKET - 192)) | (1 << (ClickHouseParser.LPAREN - 192)) | (1 << (ClickHouseParser.PLUS - 192)))) !== 0)) {
					{
					this.state = 1721;
					this.columnExprList();
					}
				}

				this.state = 1724;
				this.match(ClickHouseParser.RPAREN);
				}
				this.state = 1726;
				this.match(ClickHouseParser.OVER);
				this.state = 1727;
				this.identifier();
				}
				break;

			case 11:
				{
				_localctx = new ColumnExprFunctionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1729;
				this.identifier();
				this.state = 1735;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 238, this._ctx) ) {
				case 1:
					{
					this.state = 1730;
					this.match(ClickHouseParser.LPAREN);
					this.state = 1732;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.AFTER) | (1 << ClickHouseParser.ALIAS) | (1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ALTER) | (1 << ClickHouseParser.AND) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ARRAY) | (1 << ClickHouseParser.AS) | (1 << ClickHouseParser.ASCENDING) | (1 << ClickHouseParser.ASOF) | (1 << ClickHouseParser.AST) | (1 << ClickHouseParser.ASYNC) | (1 << ClickHouseParser.ATTACH) | (1 << ClickHouseParser.BETWEEN) | (1 << ClickHouseParser.BOTH) | (1 << ClickHouseParser.BY) | (1 << ClickHouseParser.CASE) | (1 << ClickHouseParser.CAST) | (1 << ClickHouseParser.CHECK) | (1 << ClickHouseParser.CLEAR) | (1 << ClickHouseParser.CLUSTER) | (1 << ClickHouseParser.CODEC) | (1 << ClickHouseParser.COLLATE) | (1 << ClickHouseParser.COLUMN) | (1 << ClickHouseParser.COMMENT) | (1 << ClickHouseParser.CONSTRAINT) | (1 << ClickHouseParser.CREATE) | (1 << ClickHouseParser.CROSS) | (1 << ClickHouseParser.CUBE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ClickHouseParser.CURRENT - 32)) | (1 << (ClickHouseParser.DATABASE - 32)) | (1 << (ClickHouseParser.DATABASES - 32)) | (1 << (ClickHouseParser.DATE - 32)) | (1 << (ClickHouseParser.DAY - 32)) | (1 << (ClickHouseParser.DEDUPLICATE - 32)) | (1 << (ClickHouseParser.DEFAULT - 32)) | (1 << (ClickHouseParser.DELAY - 32)) | (1 << (ClickHouseParser.DELETE - 32)) | (1 << (ClickHouseParser.DESC - 32)) | (1 << (ClickHouseParser.DESCENDING - 32)) | (1 << (ClickHouseParser.DESCRIBE - 32)) | (1 << (ClickHouseParser.DETACH - 32)) | (1 << (ClickHouseParser.DICTIONARIES - 32)) | (1 << (ClickHouseParser.DICTIONARY - 32)) | (1 << (ClickHouseParser.DISK - 32)) | (1 << (ClickHouseParser.DISTINCT - 32)) | (1 << (ClickHouseParser.DISTRIBUTED - 32)) | (1 << (ClickHouseParser.DROP - 32)) | (1 << (ClickHouseParser.ELSE - 32)) | (1 << (ClickHouseParser.END - 32)) | (1 << (ClickHouseParser.ENGINE - 32)) | (1 << (ClickHouseParser.EVENTS - 32)) | (1 << (ClickHouseParser.EXISTS - 32)) | (1 << (ClickHouseParser.EXPLAIN - 32)) | (1 << (ClickHouseParser.EXPRESSION - 32)) | (1 << (ClickHouseParser.EXTRACT - 32)) | (1 << (ClickHouseParser.FETCHES - 32)) | (1 << (ClickHouseParser.FINAL - 32)) | (1 << (ClickHouseParser.FIRST - 32)) | (1 << (ClickHouseParser.FLUSH - 32)) | (1 << (ClickHouseParser.FOLLOWING - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ClickHouseParser.FOR - 64)) | (1 << (ClickHouseParser.FORMAT - 64)) | (1 << (ClickHouseParser.FREEZE - 64)) | (1 << (ClickHouseParser.FROM - 64)) | (1 << (ClickHouseParser.FULL - 64)) | (1 << (ClickHouseParser.FUNCTION - 64)) | (1 << (ClickHouseParser.GLOBAL - 64)) | (1 << (ClickHouseParser.GRANULARITY - 64)) | (1 << (ClickHouseParser.GROUP - 64)) | (1 << (ClickHouseParser.HAVING - 64)) | (1 << (ClickHouseParser.HIERARCHICAL - 64)) | (1 << (ClickHouseParser.HOUR - 64)) | (1 << (ClickHouseParser.ID - 64)) | (1 << (ClickHouseParser.IF - 64)) | (1 << (ClickHouseParser.ILIKE - 64)) | (1 << (ClickHouseParser.IN - 64)) | (1 << (ClickHouseParser.INDEX - 64)) | (1 << (ClickHouseParser.INF - 64)) | (1 << (ClickHouseParser.INJECTIVE - 64)) | (1 << (ClickHouseParser.INNER - 64)) | (1 << (ClickHouseParser.INSERT - 64)) | (1 << (ClickHouseParser.INTERVAL - 64)) | (1 << (ClickHouseParser.INTO - 64)) | (1 << (ClickHouseParser.IS - 64)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 64)) | (1 << (ClickHouseParser.JOIN - 64)) | (1 << (ClickHouseParser.KEY - 64)) | (1 << (ClickHouseParser.KILL - 64)) | (1 << (ClickHouseParser.LAST - 64)) | (1 << (ClickHouseParser.LAYOUT - 64)) | (1 << (ClickHouseParser.LEADING - 64)) | (1 << (ClickHouseParser.LEFT - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (ClickHouseParser.LIFETIME - 96)) | (1 << (ClickHouseParser.LIKE - 96)) | (1 << (ClickHouseParser.LIMIT - 96)) | (1 << (ClickHouseParser.LIVE - 96)) | (1 << (ClickHouseParser.LOCAL - 96)) | (1 << (ClickHouseParser.LOGS - 96)) | (1 << (ClickHouseParser.MATERIALIZE - 96)) | (1 << (ClickHouseParser.MATERIALIZED - 96)) | (1 << (ClickHouseParser.MAX - 96)) | (1 << (ClickHouseParser.MERGES - 96)) | (1 << (ClickHouseParser.MIN - 96)) | (1 << (ClickHouseParser.MINUTE - 96)) | (1 << (ClickHouseParser.MODIFY - 96)) | (1 << (ClickHouseParser.MONTH - 96)) | (1 << (ClickHouseParser.MOVE - 96)) | (1 << (ClickHouseParser.MUTATION - 96)) | (1 << (ClickHouseParser.NAN_SQL - 96)) | (1 << (ClickHouseParser.NO - 96)) | (1 << (ClickHouseParser.NOT - 96)) | (1 << (ClickHouseParser.NULL_SQL - 96)) | (1 << (ClickHouseParser.NULLS - 96)) | (1 << (ClickHouseParser.OFFSET - 96)) | (1 << (ClickHouseParser.ON - 96)) | (1 << (ClickHouseParser.OPTIMIZE - 96)) | (1 << (ClickHouseParser.OR - 96)) | (1 << (ClickHouseParser.ORDER - 96)) | (1 << (ClickHouseParser.OUTER - 96)) | (1 << (ClickHouseParser.OUTFILE - 96)) | (1 << (ClickHouseParser.OVER - 96)) | (1 << (ClickHouseParser.PARTITION - 96)) | (1 << (ClickHouseParser.POPULATE - 96)) | (1 << (ClickHouseParser.PRECEDING - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (ClickHouseParser.PREWHERE - 128)) | (1 << (ClickHouseParser.PRIMARY - 128)) | (1 << (ClickHouseParser.QUARTER - 128)) | (1 << (ClickHouseParser.RANGE - 128)) | (1 << (ClickHouseParser.RELOAD - 128)) | (1 << (ClickHouseParser.REMOVE - 128)) | (1 << (ClickHouseParser.RENAME - 128)) | (1 << (ClickHouseParser.REPLACE - 128)) | (1 << (ClickHouseParser.REPLICA - 128)) | (1 << (ClickHouseParser.REPLICATED - 128)) | (1 << (ClickHouseParser.RIGHT - 128)) | (1 << (ClickHouseParser.ROLLUP - 128)) | (1 << (ClickHouseParser.ROW - 128)) | (1 << (ClickHouseParser.ROWS - 128)) | (1 << (ClickHouseParser.SAMPLE - 128)) | (1 << (ClickHouseParser.SECOND - 128)) | (1 << (ClickHouseParser.SELECT - 128)) | (1 << (ClickHouseParser.SEMI - 128)) | (1 << (ClickHouseParser.SENDS - 128)) | (1 << (ClickHouseParser.SET - 128)) | (1 << (ClickHouseParser.SETTINGS - 128)) | (1 << (ClickHouseParser.SHOW - 128)) | (1 << (ClickHouseParser.SOURCE - 128)) | (1 << (ClickHouseParser.START - 128)) | (1 << (ClickHouseParser.STOP - 128)) | (1 << (ClickHouseParser.SUBSTRING - 128)) | (1 << (ClickHouseParser.SYNC - 128)) | (1 << (ClickHouseParser.SYNTAX - 128)) | (1 << (ClickHouseParser.SYSTEM - 128)) | (1 << (ClickHouseParser.TABLE - 128)) | (1 << (ClickHouseParser.TABLES - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (ClickHouseParser.TEMPORARY - 160)) | (1 << (ClickHouseParser.TEST - 160)) | (1 << (ClickHouseParser.THEN - 160)) | (1 << (ClickHouseParser.TIES - 160)) | (1 << (ClickHouseParser.TIMEOUT - 160)) | (1 << (ClickHouseParser.TIMESTAMP - 160)) | (1 << (ClickHouseParser.TO - 160)) | (1 << (ClickHouseParser.TOP - 160)) | (1 << (ClickHouseParser.TOTALS - 160)) | (1 << (ClickHouseParser.TRAILING - 160)) | (1 << (ClickHouseParser.TRIM - 160)) | (1 << (ClickHouseParser.TRUNCATE - 160)) | (1 << (ClickHouseParser.TTL - 160)) | (1 << (ClickHouseParser.TYPE - 160)) | (1 << (ClickHouseParser.UNBOUNDED - 160)) | (1 << (ClickHouseParser.UNION - 160)) | (1 << (ClickHouseParser.UPDATE - 160)) | (1 << (ClickHouseParser.USE - 160)) | (1 << (ClickHouseParser.USING - 160)) | (1 << (ClickHouseParser.UUID - 160)) | (1 << (ClickHouseParser.VALUES - 160)) | (1 << (ClickHouseParser.VIEW - 160)) | (1 << (ClickHouseParser.VOLUME - 160)) | (1 << (ClickHouseParser.WATCH - 160)) | (1 << (ClickHouseParser.WEEK - 160)) | (1 << (ClickHouseParser.WHEN - 160)) | (1 << (ClickHouseParser.WHERE - 160)) | (1 << (ClickHouseParser.WINDOW - 160)) | (1 << (ClickHouseParser.WITH - 160)) | (1 << (ClickHouseParser.YEAR - 160)) | (1 << (ClickHouseParser.JSON_FALSE - 160)) | (1 << (ClickHouseParser.JSON_TRUE - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (ClickHouseParser.IDENTIFIER - 192)) | (1 << (ClickHouseParser.FLOATING_LITERAL - 192)) | (1 << (ClickHouseParser.OCTAL_LITERAL - 192)) | (1 << (ClickHouseParser.DECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.HEXADECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.STRING_LITERAL - 192)) | (1 << (ClickHouseParser.ASTERISK - 192)) | (1 << (ClickHouseParser.DASH - 192)) | (1 << (ClickHouseParser.DOT - 192)) | (1 << (ClickHouseParser.LBRACKET - 192)) | (1 << (ClickHouseParser.LPAREN - 192)) | (1 << (ClickHouseParser.PLUS - 192)))) !== 0)) {
						{
						this.state = 1731;
						this.columnExprList();
						}
					}

					this.state = 1734;
					this.match(ClickHouseParser.RPAREN);
					}
					break;
				}
				this.state = 1737;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1739;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 239, this._ctx) ) {
				case 1:
					{
					this.state = 1738;
					this.match(ClickHouseParser.DISTINCT);
					}
					break;
				}
				this.state = 1742;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.AFTER) | (1 << ClickHouseParser.ALIAS) | (1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ALTER) | (1 << ClickHouseParser.AND) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ARRAY) | (1 << ClickHouseParser.AS) | (1 << ClickHouseParser.ASCENDING) | (1 << ClickHouseParser.ASOF) | (1 << ClickHouseParser.AST) | (1 << ClickHouseParser.ASYNC) | (1 << ClickHouseParser.ATTACH) | (1 << ClickHouseParser.BETWEEN) | (1 << ClickHouseParser.BOTH) | (1 << ClickHouseParser.BY) | (1 << ClickHouseParser.CASE) | (1 << ClickHouseParser.CAST) | (1 << ClickHouseParser.CHECK) | (1 << ClickHouseParser.CLEAR) | (1 << ClickHouseParser.CLUSTER) | (1 << ClickHouseParser.CODEC) | (1 << ClickHouseParser.COLLATE) | (1 << ClickHouseParser.COLUMN) | (1 << ClickHouseParser.COMMENT) | (1 << ClickHouseParser.CONSTRAINT) | (1 << ClickHouseParser.CREATE) | (1 << ClickHouseParser.CROSS) | (1 << ClickHouseParser.CUBE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ClickHouseParser.CURRENT - 32)) | (1 << (ClickHouseParser.DATABASE - 32)) | (1 << (ClickHouseParser.DATABASES - 32)) | (1 << (ClickHouseParser.DATE - 32)) | (1 << (ClickHouseParser.DAY - 32)) | (1 << (ClickHouseParser.DEDUPLICATE - 32)) | (1 << (ClickHouseParser.DEFAULT - 32)) | (1 << (ClickHouseParser.DELAY - 32)) | (1 << (ClickHouseParser.DELETE - 32)) | (1 << (ClickHouseParser.DESC - 32)) | (1 << (ClickHouseParser.DESCENDING - 32)) | (1 << (ClickHouseParser.DESCRIBE - 32)) | (1 << (ClickHouseParser.DETACH - 32)) | (1 << (ClickHouseParser.DICTIONARIES - 32)) | (1 << (ClickHouseParser.DICTIONARY - 32)) | (1 << (ClickHouseParser.DISK - 32)) | (1 << (ClickHouseParser.DISTINCT - 32)) | (1 << (ClickHouseParser.DISTRIBUTED - 32)) | (1 << (ClickHouseParser.DROP - 32)) | (1 << (ClickHouseParser.ELSE - 32)) | (1 << (ClickHouseParser.END - 32)) | (1 << (ClickHouseParser.ENGINE - 32)) | (1 << (ClickHouseParser.EVENTS - 32)) | (1 << (ClickHouseParser.EXISTS - 32)) | (1 << (ClickHouseParser.EXPLAIN - 32)) | (1 << (ClickHouseParser.EXPRESSION - 32)) | (1 << (ClickHouseParser.EXTRACT - 32)) | (1 << (ClickHouseParser.FETCHES - 32)) | (1 << (ClickHouseParser.FINAL - 32)) | (1 << (ClickHouseParser.FIRST - 32)) | (1 << (ClickHouseParser.FLUSH - 32)) | (1 << (ClickHouseParser.FOLLOWING - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ClickHouseParser.FOR - 64)) | (1 << (ClickHouseParser.FORMAT - 64)) | (1 << (ClickHouseParser.FREEZE - 64)) | (1 << (ClickHouseParser.FROM - 64)) | (1 << (ClickHouseParser.FULL - 64)) | (1 << (ClickHouseParser.FUNCTION - 64)) | (1 << (ClickHouseParser.GLOBAL - 64)) | (1 << (ClickHouseParser.GRANULARITY - 64)) | (1 << (ClickHouseParser.GROUP - 64)) | (1 << (ClickHouseParser.HAVING - 64)) | (1 << (ClickHouseParser.HIERARCHICAL - 64)) | (1 << (ClickHouseParser.HOUR - 64)) | (1 << (ClickHouseParser.ID - 64)) | (1 << (ClickHouseParser.IF - 64)) | (1 << (ClickHouseParser.ILIKE - 64)) | (1 << (ClickHouseParser.IN - 64)) | (1 << (ClickHouseParser.INDEX - 64)) | (1 << (ClickHouseParser.INF - 64)) | (1 << (ClickHouseParser.INJECTIVE - 64)) | (1 << (ClickHouseParser.INNER - 64)) | (1 << (ClickHouseParser.INSERT - 64)) | (1 << (ClickHouseParser.INTERVAL - 64)) | (1 << (ClickHouseParser.INTO - 64)) | (1 << (ClickHouseParser.IS - 64)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 64)) | (1 << (ClickHouseParser.JOIN - 64)) | (1 << (ClickHouseParser.KEY - 64)) | (1 << (ClickHouseParser.KILL - 64)) | (1 << (ClickHouseParser.LAST - 64)) | (1 << (ClickHouseParser.LAYOUT - 64)) | (1 << (ClickHouseParser.LEADING - 64)) | (1 << (ClickHouseParser.LEFT - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (ClickHouseParser.LIFETIME - 96)) | (1 << (ClickHouseParser.LIKE - 96)) | (1 << (ClickHouseParser.LIMIT - 96)) | (1 << (ClickHouseParser.LIVE - 96)) | (1 << (ClickHouseParser.LOCAL - 96)) | (1 << (ClickHouseParser.LOGS - 96)) | (1 << (ClickHouseParser.MATERIALIZE - 96)) | (1 << (ClickHouseParser.MATERIALIZED - 96)) | (1 << (ClickHouseParser.MAX - 96)) | (1 << (ClickHouseParser.MERGES - 96)) | (1 << (ClickHouseParser.MIN - 96)) | (1 << (ClickHouseParser.MINUTE - 96)) | (1 << (ClickHouseParser.MODIFY - 96)) | (1 << (ClickHouseParser.MONTH - 96)) | (1 << (ClickHouseParser.MOVE - 96)) | (1 << (ClickHouseParser.MUTATION - 96)) | (1 << (ClickHouseParser.NAN_SQL - 96)) | (1 << (ClickHouseParser.NO - 96)) | (1 << (ClickHouseParser.NOT - 96)) | (1 << (ClickHouseParser.NULL_SQL - 96)) | (1 << (ClickHouseParser.NULLS - 96)) | (1 << (ClickHouseParser.OFFSET - 96)) | (1 << (ClickHouseParser.ON - 96)) | (1 << (ClickHouseParser.OPTIMIZE - 96)) | (1 << (ClickHouseParser.OR - 96)) | (1 << (ClickHouseParser.ORDER - 96)) | (1 << (ClickHouseParser.OUTER - 96)) | (1 << (ClickHouseParser.OUTFILE - 96)) | (1 << (ClickHouseParser.OVER - 96)) | (1 << (ClickHouseParser.PARTITION - 96)) | (1 << (ClickHouseParser.POPULATE - 96)) | (1 << (ClickHouseParser.PRECEDING - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (ClickHouseParser.PREWHERE - 128)) | (1 << (ClickHouseParser.PRIMARY - 128)) | (1 << (ClickHouseParser.QUARTER - 128)) | (1 << (ClickHouseParser.RANGE - 128)) | (1 << (ClickHouseParser.RELOAD - 128)) | (1 << (ClickHouseParser.REMOVE - 128)) | (1 << (ClickHouseParser.RENAME - 128)) | (1 << (ClickHouseParser.REPLACE - 128)) | (1 << (ClickHouseParser.REPLICA - 128)) | (1 << (ClickHouseParser.REPLICATED - 128)) | (1 << (ClickHouseParser.RIGHT - 128)) | (1 << (ClickHouseParser.ROLLUP - 128)) | (1 << (ClickHouseParser.ROW - 128)) | (1 << (ClickHouseParser.ROWS - 128)) | (1 << (ClickHouseParser.SAMPLE - 128)) | (1 << (ClickHouseParser.SECOND - 128)) | (1 << (ClickHouseParser.SELECT - 128)) | (1 << (ClickHouseParser.SEMI - 128)) | (1 << (ClickHouseParser.SENDS - 128)) | (1 << (ClickHouseParser.SET - 128)) | (1 << (ClickHouseParser.SETTINGS - 128)) | (1 << (ClickHouseParser.SHOW - 128)) | (1 << (ClickHouseParser.SOURCE - 128)) | (1 << (ClickHouseParser.START - 128)) | (1 << (ClickHouseParser.STOP - 128)) | (1 << (ClickHouseParser.SUBSTRING - 128)) | (1 << (ClickHouseParser.SYNC - 128)) | (1 << (ClickHouseParser.SYNTAX - 128)) | (1 << (ClickHouseParser.SYSTEM - 128)) | (1 << (ClickHouseParser.TABLE - 128)) | (1 << (ClickHouseParser.TABLES - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (ClickHouseParser.TEMPORARY - 160)) | (1 << (ClickHouseParser.TEST - 160)) | (1 << (ClickHouseParser.THEN - 160)) | (1 << (ClickHouseParser.TIES - 160)) | (1 << (ClickHouseParser.TIMEOUT - 160)) | (1 << (ClickHouseParser.TIMESTAMP - 160)) | (1 << (ClickHouseParser.TO - 160)) | (1 << (ClickHouseParser.TOP - 160)) | (1 << (ClickHouseParser.TOTALS - 160)) | (1 << (ClickHouseParser.TRAILING - 160)) | (1 << (ClickHouseParser.TRIM - 160)) | (1 << (ClickHouseParser.TRUNCATE - 160)) | (1 << (ClickHouseParser.TTL - 160)) | (1 << (ClickHouseParser.TYPE - 160)) | (1 << (ClickHouseParser.UNBOUNDED - 160)) | (1 << (ClickHouseParser.UNION - 160)) | (1 << (ClickHouseParser.UPDATE - 160)) | (1 << (ClickHouseParser.USE - 160)) | (1 << (ClickHouseParser.USING - 160)) | (1 << (ClickHouseParser.UUID - 160)) | (1 << (ClickHouseParser.VALUES - 160)) | (1 << (ClickHouseParser.VIEW - 160)) | (1 << (ClickHouseParser.VOLUME - 160)) | (1 << (ClickHouseParser.WATCH - 160)) | (1 << (ClickHouseParser.WEEK - 160)) | (1 << (ClickHouseParser.WHEN - 160)) | (1 << (ClickHouseParser.WHERE - 160)) | (1 << (ClickHouseParser.WINDOW - 160)) | (1 << (ClickHouseParser.WITH - 160)) | (1 << (ClickHouseParser.YEAR - 160)) | (1 << (ClickHouseParser.JSON_FALSE - 160)) | (1 << (ClickHouseParser.JSON_TRUE - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (ClickHouseParser.IDENTIFIER - 192)) | (1 << (ClickHouseParser.FLOATING_LITERAL - 192)) | (1 << (ClickHouseParser.OCTAL_LITERAL - 192)) | (1 << (ClickHouseParser.DECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.HEXADECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.STRING_LITERAL - 192)) | (1 << (ClickHouseParser.ASTERISK - 192)) | (1 << (ClickHouseParser.DASH - 192)) | (1 << (ClickHouseParser.DOT - 192)) | (1 << (ClickHouseParser.LBRACKET - 192)) | (1 << (ClickHouseParser.LPAREN - 192)) | (1 << (ClickHouseParser.PLUS - 192)))) !== 0)) {
					{
					this.state = 1741;
					this.columnArgList();
					}
				}

				this.state = 1744;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 12:
				{
				_localctx = new ColumnExprLiteralContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1746;
				this.literal();
				}
				break;

			case 13:
				{
				_localctx = new ColumnExprNegateContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1747;
				this.match(ClickHouseParser.DASH);
				this.state = 1748;
				this.columnExpr(17);
				}
				break;

			case 14:
				{
				_localctx = new ColumnExprNotContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1749;
				this.match(ClickHouseParser.NOT);
				this.state = 1750;
				this.columnExpr(12);
				}
				break;

			case 15:
				{
				_localctx = new ColumnExprAsteriskContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1754;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 2)) & ~0x1F) === 0 && ((1 << (_la - 2)) & ((1 << (ClickHouseParser.AFTER - 2)) | (1 << (ClickHouseParser.ALIAS - 2)) | (1 << (ClickHouseParser.ALL - 2)) | (1 << (ClickHouseParser.ALTER - 2)) | (1 << (ClickHouseParser.AND - 2)) | (1 << (ClickHouseParser.ANTI - 2)) | (1 << (ClickHouseParser.ANY - 2)) | (1 << (ClickHouseParser.ARRAY - 2)) | (1 << (ClickHouseParser.AS - 2)) | (1 << (ClickHouseParser.ASCENDING - 2)) | (1 << (ClickHouseParser.ASOF - 2)) | (1 << (ClickHouseParser.AST - 2)) | (1 << (ClickHouseParser.ASYNC - 2)) | (1 << (ClickHouseParser.ATTACH - 2)) | (1 << (ClickHouseParser.BETWEEN - 2)) | (1 << (ClickHouseParser.BOTH - 2)) | (1 << (ClickHouseParser.BY - 2)) | (1 << (ClickHouseParser.CASE - 2)) | (1 << (ClickHouseParser.CAST - 2)) | (1 << (ClickHouseParser.CHECK - 2)) | (1 << (ClickHouseParser.CLEAR - 2)) | (1 << (ClickHouseParser.CLUSTER - 2)) | (1 << (ClickHouseParser.CODEC - 2)) | (1 << (ClickHouseParser.COLLATE - 2)) | (1 << (ClickHouseParser.COLUMN - 2)) | (1 << (ClickHouseParser.COMMENT - 2)) | (1 << (ClickHouseParser.CONSTRAINT - 2)) | (1 << (ClickHouseParser.CREATE - 2)) | (1 << (ClickHouseParser.CROSS - 2)) | (1 << (ClickHouseParser.CUBE - 2)) | (1 << (ClickHouseParser.CURRENT - 2)) | (1 << (ClickHouseParser.DATABASE - 2)))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ClickHouseParser.DATABASES - 34)) | (1 << (ClickHouseParser.DATE - 34)) | (1 << (ClickHouseParser.DAY - 34)) | (1 << (ClickHouseParser.DEDUPLICATE - 34)) | (1 << (ClickHouseParser.DEFAULT - 34)) | (1 << (ClickHouseParser.DELAY - 34)) | (1 << (ClickHouseParser.DELETE - 34)) | (1 << (ClickHouseParser.DESC - 34)) | (1 << (ClickHouseParser.DESCENDING - 34)) | (1 << (ClickHouseParser.DESCRIBE - 34)) | (1 << (ClickHouseParser.DETACH - 34)) | (1 << (ClickHouseParser.DICTIONARIES - 34)) | (1 << (ClickHouseParser.DICTIONARY - 34)) | (1 << (ClickHouseParser.DISK - 34)) | (1 << (ClickHouseParser.DISTINCT - 34)) | (1 << (ClickHouseParser.DISTRIBUTED - 34)) | (1 << (ClickHouseParser.DROP - 34)) | (1 << (ClickHouseParser.ELSE - 34)) | (1 << (ClickHouseParser.END - 34)) | (1 << (ClickHouseParser.ENGINE - 34)) | (1 << (ClickHouseParser.EVENTS - 34)) | (1 << (ClickHouseParser.EXISTS - 34)) | (1 << (ClickHouseParser.EXPLAIN - 34)) | (1 << (ClickHouseParser.EXPRESSION - 34)) | (1 << (ClickHouseParser.EXTRACT - 34)) | (1 << (ClickHouseParser.FETCHES - 34)) | (1 << (ClickHouseParser.FINAL - 34)) | (1 << (ClickHouseParser.FIRST - 34)) | (1 << (ClickHouseParser.FLUSH - 34)) | (1 << (ClickHouseParser.FOLLOWING - 34)) | (1 << (ClickHouseParser.FOR - 34)) | (1 << (ClickHouseParser.FORMAT - 34)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (ClickHouseParser.FREEZE - 66)) | (1 << (ClickHouseParser.FROM - 66)) | (1 << (ClickHouseParser.FULL - 66)) | (1 << (ClickHouseParser.FUNCTION - 66)) | (1 << (ClickHouseParser.GLOBAL - 66)) | (1 << (ClickHouseParser.GRANULARITY - 66)) | (1 << (ClickHouseParser.GROUP - 66)) | (1 << (ClickHouseParser.HAVING - 66)) | (1 << (ClickHouseParser.HIERARCHICAL - 66)) | (1 << (ClickHouseParser.HOUR - 66)) | (1 << (ClickHouseParser.ID - 66)) | (1 << (ClickHouseParser.IF - 66)) | (1 << (ClickHouseParser.ILIKE - 66)) | (1 << (ClickHouseParser.IN - 66)) | (1 << (ClickHouseParser.INDEX - 66)) | (1 << (ClickHouseParser.INJECTIVE - 66)) | (1 << (ClickHouseParser.INNER - 66)) | (1 << (ClickHouseParser.INSERT - 66)) | (1 << (ClickHouseParser.INTERVAL - 66)) | (1 << (ClickHouseParser.INTO - 66)) | (1 << (ClickHouseParser.IS - 66)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 66)) | (1 << (ClickHouseParser.JOIN - 66)) | (1 << (ClickHouseParser.KEY - 66)) | (1 << (ClickHouseParser.KILL - 66)) | (1 << (ClickHouseParser.LAST - 66)) | (1 << (ClickHouseParser.LAYOUT - 66)) | (1 << (ClickHouseParser.LEADING - 66)) | (1 << (ClickHouseParser.LEFT - 66)) | (1 << (ClickHouseParser.LIFETIME - 66)) | (1 << (ClickHouseParser.LIKE - 66)))) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & ((1 << (ClickHouseParser.LIMIT - 98)) | (1 << (ClickHouseParser.LIVE - 98)) | (1 << (ClickHouseParser.LOCAL - 98)) | (1 << (ClickHouseParser.LOGS - 98)) | (1 << (ClickHouseParser.MATERIALIZE - 98)) | (1 << (ClickHouseParser.MATERIALIZED - 98)) | (1 << (ClickHouseParser.MAX - 98)) | (1 << (ClickHouseParser.MERGES - 98)) | (1 << (ClickHouseParser.MIN - 98)) | (1 << (ClickHouseParser.MINUTE - 98)) | (1 << (ClickHouseParser.MODIFY - 98)) | (1 << (ClickHouseParser.MONTH - 98)) | (1 << (ClickHouseParser.MOVE - 98)) | (1 << (ClickHouseParser.MUTATION - 98)) | (1 << (ClickHouseParser.NO - 98)) | (1 << (ClickHouseParser.NOT - 98)) | (1 << (ClickHouseParser.NULLS - 98)) | (1 << (ClickHouseParser.OFFSET - 98)) | (1 << (ClickHouseParser.ON - 98)) | (1 << (ClickHouseParser.OPTIMIZE - 98)) | (1 << (ClickHouseParser.OR - 98)) | (1 << (ClickHouseParser.ORDER - 98)) | (1 << (ClickHouseParser.OUTER - 98)) | (1 << (ClickHouseParser.OUTFILE - 98)) | (1 << (ClickHouseParser.OVER - 98)) | (1 << (ClickHouseParser.PARTITION - 98)) | (1 << (ClickHouseParser.POPULATE - 98)) | (1 << (ClickHouseParser.PRECEDING - 98)) | (1 << (ClickHouseParser.PREWHERE - 98)) | (1 << (ClickHouseParser.PRIMARY - 98)))) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & ((1 << (ClickHouseParser.QUARTER - 131)) | (1 << (ClickHouseParser.RANGE - 131)) | (1 << (ClickHouseParser.RELOAD - 131)) | (1 << (ClickHouseParser.REMOVE - 131)) | (1 << (ClickHouseParser.RENAME - 131)) | (1 << (ClickHouseParser.REPLACE - 131)) | (1 << (ClickHouseParser.REPLICA - 131)) | (1 << (ClickHouseParser.REPLICATED - 131)) | (1 << (ClickHouseParser.RIGHT - 131)) | (1 << (ClickHouseParser.ROLLUP - 131)) | (1 << (ClickHouseParser.ROW - 131)) | (1 << (ClickHouseParser.ROWS - 131)) | (1 << (ClickHouseParser.SAMPLE - 131)) | (1 << (ClickHouseParser.SECOND - 131)) | (1 << (ClickHouseParser.SELECT - 131)) | (1 << (ClickHouseParser.SEMI - 131)) | (1 << (ClickHouseParser.SENDS - 131)) | (1 << (ClickHouseParser.SET - 131)) | (1 << (ClickHouseParser.SETTINGS - 131)) | (1 << (ClickHouseParser.SHOW - 131)) | (1 << (ClickHouseParser.SOURCE - 131)) | (1 << (ClickHouseParser.START - 131)) | (1 << (ClickHouseParser.STOP - 131)) | (1 << (ClickHouseParser.SUBSTRING - 131)) | (1 << (ClickHouseParser.SYNC - 131)) | (1 << (ClickHouseParser.SYNTAX - 131)) | (1 << (ClickHouseParser.SYSTEM - 131)) | (1 << (ClickHouseParser.TABLE - 131)) | (1 << (ClickHouseParser.TABLES - 131)) | (1 << (ClickHouseParser.TEMPORARY - 131)) | (1 << (ClickHouseParser.TEST - 131)) | (1 << (ClickHouseParser.THEN - 131)))) !== 0) || ((((_la - 163)) & ~0x1F) === 0 && ((1 << (_la - 163)) & ((1 << (ClickHouseParser.TIES - 163)) | (1 << (ClickHouseParser.TIMEOUT - 163)) | (1 << (ClickHouseParser.TIMESTAMP - 163)) | (1 << (ClickHouseParser.TO - 163)) | (1 << (ClickHouseParser.TOP - 163)) | (1 << (ClickHouseParser.TOTALS - 163)) | (1 << (ClickHouseParser.TRAILING - 163)) | (1 << (ClickHouseParser.TRIM - 163)) | (1 << (ClickHouseParser.TRUNCATE - 163)) | (1 << (ClickHouseParser.TTL - 163)) | (1 << (ClickHouseParser.TYPE - 163)) | (1 << (ClickHouseParser.UNBOUNDED - 163)) | (1 << (ClickHouseParser.UNION - 163)) | (1 << (ClickHouseParser.UPDATE - 163)) | (1 << (ClickHouseParser.USE - 163)) | (1 << (ClickHouseParser.USING - 163)) | (1 << (ClickHouseParser.UUID - 163)) | (1 << (ClickHouseParser.VALUES - 163)) | (1 << (ClickHouseParser.VIEW - 163)) | (1 << (ClickHouseParser.VOLUME - 163)) | (1 << (ClickHouseParser.WATCH - 163)) | (1 << (ClickHouseParser.WEEK - 163)) | (1 << (ClickHouseParser.WHEN - 163)) | (1 << (ClickHouseParser.WHERE - 163)) | (1 << (ClickHouseParser.WINDOW - 163)) | (1 << (ClickHouseParser.WITH - 163)) | (1 << (ClickHouseParser.YEAR - 163)) | (1 << (ClickHouseParser.JSON_FALSE - 163)) | (1 << (ClickHouseParser.JSON_TRUE - 163)) | (1 << (ClickHouseParser.IDENTIFIER - 163)))) !== 0)) {
					{
					this.state = 1751;
					this.tableIdentifier();
					this.state = 1752;
					this.match(ClickHouseParser.DOT);
					}
				}

				this.state = 1756;
				this.match(ClickHouseParser.ASTERISK);
				}
				break;

			case 16:
				{
				_localctx = new ColumnExprSubqueryContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1757;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1758;
				this.selectUnionStmt();
				this.state = 1759;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 17:
				{
				_localctx = new ColumnExprParensContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1761;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1762;
				this.columnExpr(0);
				this.state = 1763;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 18:
				{
				_localctx = new ColumnExprTupleContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1765;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1766;
				this.columnExprList();
				this.state = 1767;
				this.match(ClickHouseParser.RPAREN);
				}
				break;

			case 19:
				{
				_localctx = new ColumnExprArrayContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1769;
				this.match(ClickHouseParser.LBRACKET);
				this.state = 1771;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.AFTER) | (1 << ClickHouseParser.ALIAS) | (1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ALTER) | (1 << ClickHouseParser.AND) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ARRAY) | (1 << ClickHouseParser.AS) | (1 << ClickHouseParser.ASCENDING) | (1 << ClickHouseParser.ASOF) | (1 << ClickHouseParser.AST) | (1 << ClickHouseParser.ASYNC) | (1 << ClickHouseParser.ATTACH) | (1 << ClickHouseParser.BETWEEN) | (1 << ClickHouseParser.BOTH) | (1 << ClickHouseParser.BY) | (1 << ClickHouseParser.CASE) | (1 << ClickHouseParser.CAST) | (1 << ClickHouseParser.CHECK) | (1 << ClickHouseParser.CLEAR) | (1 << ClickHouseParser.CLUSTER) | (1 << ClickHouseParser.CODEC) | (1 << ClickHouseParser.COLLATE) | (1 << ClickHouseParser.COLUMN) | (1 << ClickHouseParser.COMMENT) | (1 << ClickHouseParser.CONSTRAINT) | (1 << ClickHouseParser.CREATE) | (1 << ClickHouseParser.CROSS) | (1 << ClickHouseParser.CUBE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ClickHouseParser.CURRENT - 32)) | (1 << (ClickHouseParser.DATABASE - 32)) | (1 << (ClickHouseParser.DATABASES - 32)) | (1 << (ClickHouseParser.DATE - 32)) | (1 << (ClickHouseParser.DAY - 32)) | (1 << (ClickHouseParser.DEDUPLICATE - 32)) | (1 << (ClickHouseParser.DEFAULT - 32)) | (1 << (ClickHouseParser.DELAY - 32)) | (1 << (ClickHouseParser.DELETE - 32)) | (1 << (ClickHouseParser.DESC - 32)) | (1 << (ClickHouseParser.DESCENDING - 32)) | (1 << (ClickHouseParser.DESCRIBE - 32)) | (1 << (ClickHouseParser.DETACH - 32)) | (1 << (ClickHouseParser.DICTIONARIES - 32)) | (1 << (ClickHouseParser.DICTIONARY - 32)) | (1 << (ClickHouseParser.DISK - 32)) | (1 << (ClickHouseParser.DISTINCT - 32)) | (1 << (ClickHouseParser.DISTRIBUTED - 32)) | (1 << (ClickHouseParser.DROP - 32)) | (1 << (ClickHouseParser.ELSE - 32)) | (1 << (ClickHouseParser.END - 32)) | (1 << (ClickHouseParser.ENGINE - 32)) | (1 << (ClickHouseParser.EVENTS - 32)) | (1 << (ClickHouseParser.EXISTS - 32)) | (1 << (ClickHouseParser.EXPLAIN - 32)) | (1 << (ClickHouseParser.EXPRESSION - 32)) | (1 << (ClickHouseParser.EXTRACT - 32)) | (1 << (ClickHouseParser.FETCHES - 32)) | (1 << (ClickHouseParser.FINAL - 32)) | (1 << (ClickHouseParser.FIRST - 32)) | (1 << (ClickHouseParser.FLUSH - 32)) | (1 << (ClickHouseParser.FOLLOWING - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ClickHouseParser.FOR - 64)) | (1 << (ClickHouseParser.FORMAT - 64)) | (1 << (ClickHouseParser.FREEZE - 64)) | (1 << (ClickHouseParser.FROM - 64)) | (1 << (ClickHouseParser.FULL - 64)) | (1 << (ClickHouseParser.FUNCTION - 64)) | (1 << (ClickHouseParser.GLOBAL - 64)) | (1 << (ClickHouseParser.GRANULARITY - 64)) | (1 << (ClickHouseParser.GROUP - 64)) | (1 << (ClickHouseParser.HAVING - 64)) | (1 << (ClickHouseParser.HIERARCHICAL - 64)) | (1 << (ClickHouseParser.HOUR - 64)) | (1 << (ClickHouseParser.ID - 64)) | (1 << (ClickHouseParser.IF - 64)) | (1 << (ClickHouseParser.ILIKE - 64)) | (1 << (ClickHouseParser.IN - 64)) | (1 << (ClickHouseParser.INDEX - 64)) | (1 << (ClickHouseParser.INF - 64)) | (1 << (ClickHouseParser.INJECTIVE - 64)) | (1 << (ClickHouseParser.INNER - 64)) | (1 << (ClickHouseParser.INSERT - 64)) | (1 << (ClickHouseParser.INTERVAL - 64)) | (1 << (ClickHouseParser.INTO - 64)) | (1 << (ClickHouseParser.IS - 64)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 64)) | (1 << (ClickHouseParser.JOIN - 64)) | (1 << (ClickHouseParser.KEY - 64)) | (1 << (ClickHouseParser.KILL - 64)) | (1 << (ClickHouseParser.LAST - 64)) | (1 << (ClickHouseParser.LAYOUT - 64)) | (1 << (ClickHouseParser.LEADING - 64)) | (1 << (ClickHouseParser.LEFT - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (ClickHouseParser.LIFETIME - 96)) | (1 << (ClickHouseParser.LIKE - 96)) | (1 << (ClickHouseParser.LIMIT - 96)) | (1 << (ClickHouseParser.LIVE - 96)) | (1 << (ClickHouseParser.LOCAL - 96)) | (1 << (ClickHouseParser.LOGS - 96)) | (1 << (ClickHouseParser.MATERIALIZE - 96)) | (1 << (ClickHouseParser.MATERIALIZED - 96)) | (1 << (ClickHouseParser.MAX - 96)) | (1 << (ClickHouseParser.MERGES - 96)) | (1 << (ClickHouseParser.MIN - 96)) | (1 << (ClickHouseParser.MINUTE - 96)) | (1 << (ClickHouseParser.MODIFY - 96)) | (1 << (ClickHouseParser.MONTH - 96)) | (1 << (ClickHouseParser.MOVE - 96)) | (1 << (ClickHouseParser.MUTATION - 96)) | (1 << (ClickHouseParser.NAN_SQL - 96)) | (1 << (ClickHouseParser.NO - 96)) | (1 << (ClickHouseParser.NOT - 96)) | (1 << (ClickHouseParser.NULL_SQL - 96)) | (1 << (ClickHouseParser.NULLS - 96)) | (1 << (ClickHouseParser.OFFSET - 96)) | (1 << (ClickHouseParser.ON - 96)) | (1 << (ClickHouseParser.OPTIMIZE - 96)) | (1 << (ClickHouseParser.OR - 96)) | (1 << (ClickHouseParser.ORDER - 96)) | (1 << (ClickHouseParser.OUTER - 96)) | (1 << (ClickHouseParser.OUTFILE - 96)) | (1 << (ClickHouseParser.OVER - 96)) | (1 << (ClickHouseParser.PARTITION - 96)) | (1 << (ClickHouseParser.POPULATE - 96)) | (1 << (ClickHouseParser.PRECEDING - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (ClickHouseParser.PREWHERE - 128)) | (1 << (ClickHouseParser.PRIMARY - 128)) | (1 << (ClickHouseParser.QUARTER - 128)) | (1 << (ClickHouseParser.RANGE - 128)) | (1 << (ClickHouseParser.RELOAD - 128)) | (1 << (ClickHouseParser.REMOVE - 128)) | (1 << (ClickHouseParser.RENAME - 128)) | (1 << (ClickHouseParser.REPLACE - 128)) | (1 << (ClickHouseParser.REPLICA - 128)) | (1 << (ClickHouseParser.REPLICATED - 128)) | (1 << (ClickHouseParser.RIGHT - 128)) | (1 << (ClickHouseParser.ROLLUP - 128)) | (1 << (ClickHouseParser.ROW - 128)) | (1 << (ClickHouseParser.ROWS - 128)) | (1 << (ClickHouseParser.SAMPLE - 128)) | (1 << (ClickHouseParser.SECOND - 128)) | (1 << (ClickHouseParser.SELECT - 128)) | (1 << (ClickHouseParser.SEMI - 128)) | (1 << (ClickHouseParser.SENDS - 128)) | (1 << (ClickHouseParser.SET - 128)) | (1 << (ClickHouseParser.SETTINGS - 128)) | (1 << (ClickHouseParser.SHOW - 128)) | (1 << (ClickHouseParser.SOURCE - 128)) | (1 << (ClickHouseParser.START - 128)) | (1 << (ClickHouseParser.STOP - 128)) | (1 << (ClickHouseParser.SUBSTRING - 128)) | (1 << (ClickHouseParser.SYNC - 128)) | (1 << (ClickHouseParser.SYNTAX - 128)) | (1 << (ClickHouseParser.SYSTEM - 128)) | (1 << (ClickHouseParser.TABLE - 128)) | (1 << (ClickHouseParser.TABLES - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (ClickHouseParser.TEMPORARY - 160)) | (1 << (ClickHouseParser.TEST - 160)) | (1 << (ClickHouseParser.THEN - 160)) | (1 << (ClickHouseParser.TIES - 160)) | (1 << (ClickHouseParser.TIMEOUT - 160)) | (1 << (ClickHouseParser.TIMESTAMP - 160)) | (1 << (ClickHouseParser.TO - 160)) | (1 << (ClickHouseParser.TOP - 160)) | (1 << (ClickHouseParser.TOTALS - 160)) | (1 << (ClickHouseParser.TRAILING - 160)) | (1 << (ClickHouseParser.TRIM - 160)) | (1 << (ClickHouseParser.TRUNCATE - 160)) | (1 << (ClickHouseParser.TTL - 160)) | (1 << (ClickHouseParser.TYPE - 160)) | (1 << (ClickHouseParser.UNBOUNDED - 160)) | (1 << (ClickHouseParser.UNION - 160)) | (1 << (ClickHouseParser.UPDATE - 160)) | (1 << (ClickHouseParser.USE - 160)) | (1 << (ClickHouseParser.USING - 160)) | (1 << (ClickHouseParser.UUID - 160)) | (1 << (ClickHouseParser.VALUES - 160)) | (1 << (ClickHouseParser.VIEW - 160)) | (1 << (ClickHouseParser.VOLUME - 160)) | (1 << (ClickHouseParser.WATCH - 160)) | (1 << (ClickHouseParser.WEEK - 160)) | (1 << (ClickHouseParser.WHEN - 160)) | (1 << (ClickHouseParser.WHERE - 160)) | (1 << (ClickHouseParser.WINDOW - 160)) | (1 << (ClickHouseParser.WITH - 160)) | (1 << (ClickHouseParser.YEAR - 160)) | (1 << (ClickHouseParser.JSON_FALSE - 160)) | (1 << (ClickHouseParser.JSON_TRUE - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (ClickHouseParser.IDENTIFIER - 192)) | (1 << (ClickHouseParser.FLOATING_LITERAL - 192)) | (1 << (ClickHouseParser.OCTAL_LITERAL - 192)) | (1 << (ClickHouseParser.DECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.HEXADECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.STRING_LITERAL - 192)) | (1 << (ClickHouseParser.ASTERISK - 192)) | (1 << (ClickHouseParser.DASH - 192)) | (1 << (ClickHouseParser.DOT - 192)) | (1 << (ClickHouseParser.LBRACKET - 192)) | (1 << (ClickHouseParser.LPAREN - 192)) | (1 << (ClickHouseParser.PLUS - 192)))) !== 0)) {
					{
					this.state = 1770;
					this.columnExprList();
					}
				}

				this.state = 1773;
				this.match(ClickHouseParser.RBRACKET);
				}
				break;

			case 20:
				{
				_localctx = new ColumnExprIdentifierContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1774;
				this.columnIdentifier();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 1848;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 252, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 1846;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 251, this._ctx) ) {
					case 1:
						{
						_localctx = new ColumnExprPrecedence1Context(new ColumnExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_columnExpr);
						this.state = 1777;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 1778;
						_la = this._input.LA(1);
						if (!(((((_la - 199)) & ~0x1F) === 0 && ((1 << (_la - 199)) & ((1 << (ClickHouseParser.ASTERISK - 199)) | (1 << (ClickHouseParser.PERCENT - 199)) | (1 << (ClickHouseParser.SLASH - 199)))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1779;
						this.columnExpr(17);
						}
						break;

					case 2:
						{
						_localctx = new ColumnExprPrecedence2Context(new ColumnExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_columnExpr);
						this.state = 1780;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 1781;
						_la = this._input.LA(1);
						if (!(((((_la - 204)) & ~0x1F) === 0 && ((1 << (_la - 204)) & ((1 << (ClickHouseParser.CONCAT - 204)) | (1 << (ClickHouseParser.DASH - 204)) | (1 << (ClickHouseParser.PLUS - 204)))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1782;
						this.columnExpr(16);
						}
						break;

					case 3:
						{
						_localctx = new ColumnExprPrecedence3Context(new ColumnExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_columnExpr);
						this.state = 1783;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 1802;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 247, this._ctx) ) {
						case 1:
							{
							this.state = 1784;
							this.match(ClickHouseParser.EQ_DOUBLE);
							}
							break;

						case 2:
							{
							this.state = 1785;
							this.match(ClickHouseParser.EQ_SINGLE);
							}
							break;

						case 3:
							{
							this.state = 1786;
							this.match(ClickHouseParser.NOT_EQ);
							}
							break;

						case 4:
							{
							this.state = 1787;
							this.match(ClickHouseParser.LE);
							}
							break;

						case 5:
							{
							this.state = 1788;
							this.match(ClickHouseParser.GE);
							}
							break;

						case 6:
							{
							this.state = 1789;
							this.match(ClickHouseParser.LT);
							}
							break;

						case 7:
							{
							this.state = 1790;
							this.match(ClickHouseParser.GT);
							}
							break;

						case 8:
							{
							this.state = 1792;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
							if (_la === ClickHouseParser.GLOBAL) {
								{
								this.state = 1791;
								this.match(ClickHouseParser.GLOBAL);
								}
							}

							this.state = 1795;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
							if (_la === ClickHouseParser.NOT) {
								{
								this.state = 1794;
								this.match(ClickHouseParser.NOT);
								}
							}

							this.state = 1797;
							this.match(ClickHouseParser.IN);
							}
							break;

						case 9:
							{
							this.state = 1799;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
							if (_la === ClickHouseParser.NOT) {
								{
								this.state = 1798;
								this.match(ClickHouseParser.NOT);
								}
							}

							this.state = 1801;
							_la = this._input.LA(1);
							if (!(_la === ClickHouseParser.ILIKE || _la === ClickHouseParser.LIKE)) {
							this._errHandler.recoverInline(this);
							} else {
								if (this._input.LA(1) === Token.EOF) {
									this.matchedEOF = true;
								}

								this._errHandler.reportMatch(this);
								this.consume();
							}
							}
							break;
						}
						this.state = 1804;
						this.columnExpr(15);
						}
						break;

					case 4:
						{
						_localctx = new ColumnExprAndContext(new ColumnExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_columnExpr);
						this.state = 1805;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 1806;
						this.match(ClickHouseParser.AND);
						this.state = 1807;
						this.columnExpr(12);
						}
						break;

					case 5:
						{
						_localctx = new ColumnExprOrContext(new ColumnExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_columnExpr);
						this.state = 1808;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 1809;
						this.match(ClickHouseParser.OR);
						this.state = 1810;
						this.columnExpr(11);
						}
						break;

					case 6:
						{
						_localctx = new ColumnExprBetweenContext(new ColumnExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_columnExpr);
						this.state = 1811;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 1813;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === ClickHouseParser.NOT) {
							{
							this.state = 1812;
							this.match(ClickHouseParser.NOT);
							}
						}

						this.state = 1815;
						this.match(ClickHouseParser.BETWEEN);
						this.state = 1816;
						this.columnExpr(0);
						this.state = 1817;
						this.match(ClickHouseParser.AND);
						this.state = 1818;
						this.columnExpr(10);
						}
						break;

					case 7:
						{
						_localctx = new ColumnExprTernaryOpContext(new ColumnExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_columnExpr);
						this.state = 1820;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 1821;
						this.match(ClickHouseParser.QUERY);
						this.state = 1822;
						this.columnExpr(0);
						this.state = 1823;
						this.match(ClickHouseParser.COLON);
						this.state = 1824;
						this.columnExpr(8);
						}
						break;

					case 8:
						{
						_localctx = new ColumnExprArrayAccessContext(new ColumnExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_columnExpr);
						this.state = 1826;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 1827;
						this.match(ClickHouseParser.LBRACKET);
						this.state = 1828;
						this.columnExpr(0);
						this.state = 1829;
						this.match(ClickHouseParser.RBRACKET);
						}
						break;

					case 9:
						{
						_localctx = new ColumnExprTupleAccessContext(new ColumnExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_columnExpr);
						this.state = 1831;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 1832;
						this.match(ClickHouseParser.DOT);
						this.state = 1833;
						this.match(ClickHouseParser.DECIMAL_LITERAL);
						}
						break;

					case 10:
						{
						_localctx = new ColumnExprIsNullContext(new ColumnExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_columnExpr);
						this.state = 1834;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 1835;
						this.match(ClickHouseParser.IS);
						this.state = 1837;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === ClickHouseParser.NOT) {
							{
							this.state = 1836;
							this.match(ClickHouseParser.NOT);
							}
						}

						this.state = 1839;
						this.match(ClickHouseParser.NULL_SQL);
						}
						break;

					case 11:
						{
						_localctx = new ColumnExprAliasContext(new ColumnExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_columnExpr);
						this.state = 1840;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 1844;
						this._errHandler.sync(this);
						switch (this._input.LA(1)) {
						case ClickHouseParser.DATE:
						case ClickHouseParser.FIRST:
						case ClickHouseParser.ID:
						case ClickHouseParser.KEY:
						case ClickHouseParser.IDENTIFIER:
							{
							this.state = 1841;
							this.alias();
							}
							break;
						case ClickHouseParser.AS:
							{
							this.state = 1842;
							this.match(ClickHouseParser.AS);
							this.state = 1843;
							this.identifier();
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						}
						break;
					}
					}
				}
				this.state = 1850;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 252, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnArgList(): ColumnArgListContext {
		let _localctx: ColumnArgListContext = new ColumnArgListContext(this._ctx, this.state);
		this.enterRule(_localctx, 192, ClickHouseParser.RULE_columnArgList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1851;
			this.columnArgExpr();
			this.state = 1856;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.COMMA) {
				{
				{
				this.state = 1852;
				this.match(ClickHouseParser.COMMA);
				this.state = 1853;
				this.columnArgExpr();
				}
				}
				this.state = 1858;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnArgExpr(): ColumnArgExprContext {
		let _localctx: ColumnArgExprContext = new ColumnArgExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 194, ClickHouseParser.RULE_columnArgExpr);
		try {
			this.state = 1861;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 254, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1859;
				this.columnLambdaExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1860;
				this.columnExpr(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnLambdaExpr(): ColumnLambdaExprContext {
		let _localctx: ColumnLambdaExprContext = new ColumnLambdaExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 196, ClickHouseParser.RULE_columnLambdaExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1882;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.LPAREN:
				{
				this.state = 1863;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1864;
				this.identifier();
				this.state = 1869;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ClickHouseParser.COMMA) {
					{
					{
					this.state = 1865;
					this.match(ClickHouseParser.COMMA);
					this.state = 1866;
					this.identifier();
					}
					}
					this.state = 1871;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1872;
				this.match(ClickHouseParser.RPAREN);
				}
				break;
			case ClickHouseParser.AFTER:
			case ClickHouseParser.ALIAS:
			case ClickHouseParser.ALL:
			case ClickHouseParser.ALTER:
			case ClickHouseParser.AND:
			case ClickHouseParser.ANTI:
			case ClickHouseParser.ANY:
			case ClickHouseParser.ARRAY:
			case ClickHouseParser.AS:
			case ClickHouseParser.ASCENDING:
			case ClickHouseParser.ASOF:
			case ClickHouseParser.AST:
			case ClickHouseParser.ASYNC:
			case ClickHouseParser.ATTACH:
			case ClickHouseParser.BETWEEN:
			case ClickHouseParser.BOTH:
			case ClickHouseParser.BY:
			case ClickHouseParser.CASE:
			case ClickHouseParser.CAST:
			case ClickHouseParser.CHECK:
			case ClickHouseParser.CLEAR:
			case ClickHouseParser.CLUSTER:
			case ClickHouseParser.CODEC:
			case ClickHouseParser.COLLATE:
			case ClickHouseParser.COLUMN:
			case ClickHouseParser.COMMENT:
			case ClickHouseParser.CONSTRAINT:
			case ClickHouseParser.CREATE:
			case ClickHouseParser.CROSS:
			case ClickHouseParser.CUBE:
			case ClickHouseParser.CURRENT:
			case ClickHouseParser.DATABASE:
			case ClickHouseParser.DATABASES:
			case ClickHouseParser.DATE:
			case ClickHouseParser.DAY:
			case ClickHouseParser.DEDUPLICATE:
			case ClickHouseParser.DEFAULT:
			case ClickHouseParser.DELAY:
			case ClickHouseParser.DELETE:
			case ClickHouseParser.DESC:
			case ClickHouseParser.DESCENDING:
			case ClickHouseParser.DESCRIBE:
			case ClickHouseParser.DETACH:
			case ClickHouseParser.DICTIONARIES:
			case ClickHouseParser.DICTIONARY:
			case ClickHouseParser.DISK:
			case ClickHouseParser.DISTINCT:
			case ClickHouseParser.DISTRIBUTED:
			case ClickHouseParser.DROP:
			case ClickHouseParser.ELSE:
			case ClickHouseParser.END:
			case ClickHouseParser.ENGINE:
			case ClickHouseParser.EVENTS:
			case ClickHouseParser.EXISTS:
			case ClickHouseParser.EXPLAIN:
			case ClickHouseParser.EXPRESSION:
			case ClickHouseParser.EXTRACT:
			case ClickHouseParser.FETCHES:
			case ClickHouseParser.FINAL:
			case ClickHouseParser.FIRST:
			case ClickHouseParser.FLUSH:
			case ClickHouseParser.FOLLOWING:
			case ClickHouseParser.FOR:
			case ClickHouseParser.FORMAT:
			case ClickHouseParser.FREEZE:
			case ClickHouseParser.FROM:
			case ClickHouseParser.FULL:
			case ClickHouseParser.FUNCTION:
			case ClickHouseParser.GLOBAL:
			case ClickHouseParser.GRANULARITY:
			case ClickHouseParser.GROUP:
			case ClickHouseParser.HAVING:
			case ClickHouseParser.HIERARCHICAL:
			case ClickHouseParser.HOUR:
			case ClickHouseParser.ID:
			case ClickHouseParser.IF:
			case ClickHouseParser.ILIKE:
			case ClickHouseParser.IN:
			case ClickHouseParser.INDEX:
			case ClickHouseParser.INJECTIVE:
			case ClickHouseParser.INNER:
			case ClickHouseParser.INSERT:
			case ClickHouseParser.INTERVAL:
			case ClickHouseParser.INTO:
			case ClickHouseParser.IS:
			case ClickHouseParser.IS_OBJECT_ID:
			case ClickHouseParser.JOIN:
			case ClickHouseParser.KEY:
			case ClickHouseParser.KILL:
			case ClickHouseParser.LAST:
			case ClickHouseParser.LAYOUT:
			case ClickHouseParser.LEADING:
			case ClickHouseParser.LEFT:
			case ClickHouseParser.LIFETIME:
			case ClickHouseParser.LIKE:
			case ClickHouseParser.LIMIT:
			case ClickHouseParser.LIVE:
			case ClickHouseParser.LOCAL:
			case ClickHouseParser.LOGS:
			case ClickHouseParser.MATERIALIZE:
			case ClickHouseParser.MATERIALIZED:
			case ClickHouseParser.MAX:
			case ClickHouseParser.MERGES:
			case ClickHouseParser.MIN:
			case ClickHouseParser.MINUTE:
			case ClickHouseParser.MODIFY:
			case ClickHouseParser.MONTH:
			case ClickHouseParser.MOVE:
			case ClickHouseParser.MUTATION:
			case ClickHouseParser.NO:
			case ClickHouseParser.NOT:
			case ClickHouseParser.NULLS:
			case ClickHouseParser.OFFSET:
			case ClickHouseParser.ON:
			case ClickHouseParser.OPTIMIZE:
			case ClickHouseParser.OR:
			case ClickHouseParser.ORDER:
			case ClickHouseParser.OUTER:
			case ClickHouseParser.OUTFILE:
			case ClickHouseParser.OVER:
			case ClickHouseParser.PARTITION:
			case ClickHouseParser.POPULATE:
			case ClickHouseParser.PRECEDING:
			case ClickHouseParser.PREWHERE:
			case ClickHouseParser.PRIMARY:
			case ClickHouseParser.QUARTER:
			case ClickHouseParser.RANGE:
			case ClickHouseParser.RELOAD:
			case ClickHouseParser.REMOVE:
			case ClickHouseParser.RENAME:
			case ClickHouseParser.REPLACE:
			case ClickHouseParser.REPLICA:
			case ClickHouseParser.REPLICATED:
			case ClickHouseParser.RIGHT:
			case ClickHouseParser.ROLLUP:
			case ClickHouseParser.ROW:
			case ClickHouseParser.ROWS:
			case ClickHouseParser.SAMPLE:
			case ClickHouseParser.SECOND:
			case ClickHouseParser.SELECT:
			case ClickHouseParser.SEMI:
			case ClickHouseParser.SENDS:
			case ClickHouseParser.SET:
			case ClickHouseParser.SETTINGS:
			case ClickHouseParser.SHOW:
			case ClickHouseParser.SOURCE:
			case ClickHouseParser.START:
			case ClickHouseParser.STOP:
			case ClickHouseParser.SUBSTRING:
			case ClickHouseParser.SYNC:
			case ClickHouseParser.SYNTAX:
			case ClickHouseParser.SYSTEM:
			case ClickHouseParser.TABLE:
			case ClickHouseParser.TABLES:
			case ClickHouseParser.TEMPORARY:
			case ClickHouseParser.TEST:
			case ClickHouseParser.THEN:
			case ClickHouseParser.TIES:
			case ClickHouseParser.TIMEOUT:
			case ClickHouseParser.TIMESTAMP:
			case ClickHouseParser.TO:
			case ClickHouseParser.TOP:
			case ClickHouseParser.TOTALS:
			case ClickHouseParser.TRAILING:
			case ClickHouseParser.TRIM:
			case ClickHouseParser.TRUNCATE:
			case ClickHouseParser.TTL:
			case ClickHouseParser.TYPE:
			case ClickHouseParser.UNBOUNDED:
			case ClickHouseParser.UNION:
			case ClickHouseParser.UPDATE:
			case ClickHouseParser.USE:
			case ClickHouseParser.USING:
			case ClickHouseParser.UUID:
			case ClickHouseParser.VALUES:
			case ClickHouseParser.VIEW:
			case ClickHouseParser.VOLUME:
			case ClickHouseParser.WATCH:
			case ClickHouseParser.WEEK:
			case ClickHouseParser.WHEN:
			case ClickHouseParser.WHERE:
			case ClickHouseParser.WINDOW:
			case ClickHouseParser.WITH:
			case ClickHouseParser.YEAR:
			case ClickHouseParser.JSON_FALSE:
			case ClickHouseParser.JSON_TRUE:
			case ClickHouseParser.IDENTIFIER:
				{
				this.state = 1874;
				this.identifier();
				this.state = 1879;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ClickHouseParser.COMMA) {
					{
					{
					this.state = 1875;
					this.match(ClickHouseParser.COMMA);
					this.state = 1876;
					this.identifier();
					}
					}
					this.state = 1881;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 1884;
			this.match(ClickHouseParser.ARROW);
			this.state = 1885;
			this.columnExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnIdentifier(): ColumnIdentifierContext {
		let _localctx: ColumnIdentifierContext = new ColumnIdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 198, ClickHouseParser.RULE_columnIdentifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1890;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 258, this._ctx) ) {
			case 1:
				{
				this.state = 1887;
				this.tableIdentifier();
				this.state = 1888;
				this.match(ClickHouseParser.DOT);
				}
				break;
			}
			this.state = 1892;
			this.nestedIdentifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nestedIdentifier(): NestedIdentifierContext {
		let _localctx: NestedIdentifierContext = new NestedIdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 200, ClickHouseParser.RULE_nestedIdentifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1894;
			this.identifier();
			this.state = 1897;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 259, this._ctx) ) {
			case 1:
				{
				this.state = 1895;
				this.match(ClickHouseParser.DOT);
				this.state = 1896;
				this.identifier();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public tableExpr(): TableExprContext;
	public tableExpr(_p: number): TableExprContext;
	// @RuleVersion(0)
	public tableExpr(_p?: number): TableExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: TableExprContext = new TableExprContext(this._ctx, _parentState);
		let _prevctx: TableExprContext = _localctx;
		let _startState: number = 202;
		this.enterRecursionRule(_localctx, 202, ClickHouseParser.RULE_tableExpr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1906;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 260, this._ctx) ) {
			case 1:
				{
				_localctx = new TableExprIdentifierContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 1900;
				this.tableIdentifier();
				}
				break;

			case 2:
				{
				_localctx = new TableExprFunctionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1901;
				this.tableFunctionExpr();
				}
				break;

			case 3:
				{
				_localctx = new TableExprSubqueryContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 1902;
				this.match(ClickHouseParser.LPAREN);
				this.state = 1903;
				this.selectUnionStmt();
				this.state = 1904;
				this.match(ClickHouseParser.RPAREN);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 1916;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 262, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new TableExprAliasContext(new TableExprContext(_parentctx, _parentState));
					this.pushNewRecursionContext(_localctx, _startState, ClickHouseParser.RULE_tableExpr);
					this.state = 1908;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 1912;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case ClickHouseParser.DATE:
					case ClickHouseParser.FIRST:
					case ClickHouseParser.ID:
					case ClickHouseParser.KEY:
					case ClickHouseParser.IDENTIFIER:
						{
						this.state = 1909;
						this.alias();
						}
						break;
					case ClickHouseParser.AS:
						{
						this.state = 1910;
						this.match(ClickHouseParser.AS);
						this.state = 1911;
						this.identifier();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 1918;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 262, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableFunctionExpr(): TableFunctionExprContext {
		let _localctx: TableFunctionExprContext = new TableFunctionExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 204, ClickHouseParser.RULE_tableFunctionExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1919;
			this.identifier();
			this.state = 1920;
			this.match(ClickHouseParser.LPAREN);
			this.state = 1922;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.AFTER) | (1 << ClickHouseParser.ALIAS) | (1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ALTER) | (1 << ClickHouseParser.AND) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ARRAY) | (1 << ClickHouseParser.AS) | (1 << ClickHouseParser.ASCENDING) | (1 << ClickHouseParser.ASOF) | (1 << ClickHouseParser.AST) | (1 << ClickHouseParser.ASYNC) | (1 << ClickHouseParser.ATTACH) | (1 << ClickHouseParser.BETWEEN) | (1 << ClickHouseParser.BOTH) | (1 << ClickHouseParser.BY) | (1 << ClickHouseParser.CASE) | (1 << ClickHouseParser.CAST) | (1 << ClickHouseParser.CHECK) | (1 << ClickHouseParser.CLEAR) | (1 << ClickHouseParser.CLUSTER) | (1 << ClickHouseParser.CODEC) | (1 << ClickHouseParser.COLLATE) | (1 << ClickHouseParser.COLUMN) | (1 << ClickHouseParser.COMMENT) | (1 << ClickHouseParser.CONSTRAINT) | (1 << ClickHouseParser.CREATE) | (1 << ClickHouseParser.CROSS) | (1 << ClickHouseParser.CUBE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ClickHouseParser.CURRENT - 32)) | (1 << (ClickHouseParser.DATABASE - 32)) | (1 << (ClickHouseParser.DATABASES - 32)) | (1 << (ClickHouseParser.DATE - 32)) | (1 << (ClickHouseParser.DAY - 32)) | (1 << (ClickHouseParser.DEDUPLICATE - 32)) | (1 << (ClickHouseParser.DEFAULT - 32)) | (1 << (ClickHouseParser.DELAY - 32)) | (1 << (ClickHouseParser.DELETE - 32)) | (1 << (ClickHouseParser.DESC - 32)) | (1 << (ClickHouseParser.DESCENDING - 32)) | (1 << (ClickHouseParser.DESCRIBE - 32)) | (1 << (ClickHouseParser.DETACH - 32)) | (1 << (ClickHouseParser.DICTIONARIES - 32)) | (1 << (ClickHouseParser.DICTIONARY - 32)) | (1 << (ClickHouseParser.DISK - 32)) | (1 << (ClickHouseParser.DISTINCT - 32)) | (1 << (ClickHouseParser.DISTRIBUTED - 32)) | (1 << (ClickHouseParser.DROP - 32)) | (1 << (ClickHouseParser.ELSE - 32)) | (1 << (ClickHouseParser.END - 32)) | (1 << (ClickHouseParser.ENGINE - 32)) | (1 << (ClickHouseParser.EVENTS - 32)) | (1 << (ClickHouseParser.EXISTS - 32)) | (1 << (ClickHouseParser.EXPLAIN - 32)) | (1 << (ClickHouseParser.EXPRESSION - 32)) | (1 << (ClickHouseParser.EXTRACT - 32)) | (1 << (ClickHouseParser.FETCHES - 32)) | (1 << (ClickHouseParser.FINAL - 32)) | (1 << (ClickHouseParser.FIRST - 32)) | (1 << (ClickHouseParser.FLUSH - 32)) | (1 << (ClickHouseParser.FOLLOWING - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ClickHouseParser.FOR - 64)) | (1 << (ClickHouseParser.FORMAT - 64)) | (1 << (ClickHouseParser.FREEZE - 64)) | (1 << (ClickHouseParser.FROM - 64)) | (1 << (ClickHouseParser.FULL - 64)) | (1 << (ClickHouseParser.FUNCTION - 64)) | (1 << (ClickHouseParser.GLOBAL - 64)) | (1 << (ClickHouseParser.GRANULARITY - 64)) | (1 << (ClickHouseParser.GROUP - 64)) | (1 << (ClickHouseParser.HAVING - 64)) | (1 << (ClickHouseParser.HIERARCHICAL - 64)) | (1 << (ClickHouseParser.HOUR - 64)) | (1 << (ClickHouseParser.ID - 64)) | (1 << (ClickHouseParser.IF - 64)) | (1 << (ClickHouseParser.ILIKE - 64)) | (1 << (ClickHouseParser.IN - 64)) | (1 << (ClickHouseParser.INDEX - 64)) | (1 << (ClickHouseParser.INF - 64)) | (1 << (ClickHouseParser.INJECTIVE - 64)) | (1 << (ClickHouseParser.INNER - 64)) | (1 << (ClickHouseParser.INSERT - 64)) | (1 << (ClickHouseParser.INTERVAL - 64)) | (1 << (ClickHouseParser.INTO - 64)) | (1 << (ClickHouseParser.IS - 64)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 64)) | (1 << (ClickHouseParser.JOIN - 64)) | (1 << (ClickHouseParser.KEY - 64)) | (1 << (ClickHouseParser.KILL - 64)) | (1 << (ClickHouseParser.LAST - 64)) | (1 << (ClickHouseParser.LAYOUT - 64)) | (1 << (ClickHouseParser.LEADING - 64)) | (1 << (ClickHouseParser.LEFT - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (ClickHouseParser.LIFETIME - 96)) | (1 << (ClickHouseParser.LIKE - 96)) | (1 << (ClickHouseParser.LIMIT - 96)) | (1 << (ClickHouseParser.LIVE - 96)) | (1 << (ClickHouseParser.LOCAL - 96)) | (1 << (ClickHouseParser.LOGS - 96)) | (1 << (ClickHouseParser.MATERIALIZE - 96)) | (1 << (ClickHouseParser.MATERIALIZED - 96)) | (1 << (ClickHouseParser.MAX - 96)) | (1 << (ClickHouseParser.MERGES - 96)) | (1 << (ClickHouseParser.MIN - 96)) | (1 << (ClickHouseParser.MINUTE - 96)) | (1 << (ClickHouseParser.MODIFY - 96)) | (1 << (ClickHouseParser.MONTH - 96)) | (1 << (ClickHouseParser.MOVE - 96)) | (1 << (ClickHouseParser.MUTATION - 96)) | (1 << (ClickHouseParser.NAN_SQL - 96)) | (1 << (ClickHouseParser.NO - 96)) | (1 << (ClickHouseParser.NOT - 96)) | (1 << (ClickHouseParser.NULL_SQL - 96)) | (1 << (ClickHouseParser.NULLS - 96)) | (1 << (ClickHouseParser.OFFSET - 96)) | (1 << (ClickHouseParser.ON - 96)) | (1 << (ClickHouseParser.OPTIMIZE - 96)) | (1 << (ClickHouseParser.OR - 96)) | (1 << (ClickHouseParser.ORDER - 96)) | (1 << (ClickHouseParser.OUTER - 96)) | (1 << (ClickHouseParser.OUTFILE - 96)) | (1 << (ClickHouseParser.OVER - 96)) | (1 << (ClickHouseParser.PARTITION - 96)) | (1 << (ClickHouseParser.POPULATE - 96)) | (1 << (ClickHouseParser.PRECEDING - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (ClickHouseParser.PREWHERE - 128)) | (1 << (ClickHouseParser.PRIMARY - 128)) | (1 << (ClickHouseParser.QUARTER - 128)) | (1 << (ClickHouseParser.RANGE - 128)) | (1 << (ClickHouseParser.RELOAD - 128)) | (1 << (ClickHouseParser.REMOVE - 128)) | (1 << (ClickHouseParser.RENAME - 128)) | (1 << (ClickHouseParser.REPLACE - 128)) | (1 << (ClickHouseParser.REPLICA - 128)) | (1 << (ClickHouseParser.REPLICATED - 128)) | (1 << (ClickHouseParser.RIGHT - 128)) | (1 << (ClickHouseParser.ROLLUP - 128)) | (1 << (ClickHouseParser.ROW - 128)) | (1 << (ClickHouseParser.ROWS - 128)) | (1 << (ClickHouseParser.SAMPLE - 128)) | (1 << (ClickHouseParser.SECOND - 128)) | (1 << (ClickHouseParser.SELECT - 128)) | (1 << (ClickHouseParser.SEMI - 128)) | (1 << (ClickHouseParser.SENDS - 128)) | (1 << (ClickHouseParser.SET - 128)) | (1 << (ClickHouseParser.SETTINGS - 128)) | (1 << (ClickHouseParser.SHOW - 128)) | (1 << (ClickHouseParser.SOURCE - 128)) | (1 << (ClickHouseParser.START - 128)) | (1 << (ClickHouseParser.STOP - 128)) | (1 << (ClickHouseParser.SUBSTRING - 128)) | (1 << (ClickHouseParser.SYNC - 128)) | (1 << (ClickHouseParser.SYNTAX - 128)) | (1 << (ClickHouseParser.SYSTEM - 128)) | (1 << (ClickHouseParser.TABLE - 128)) | (1 << (ClickHouseParser.TABLES - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (ClickHouseParser.TEMPORARY - 160)) | (1 << (ClickHouseParser.TEST - 160)) | (1 << (ClickHouseParser.THEN - 160)) | (1 << (ClickHouseParser.TIES - 160)) | (1 << (ClickHouseParser.TIMEOUT - 160)) | (1 << (ClickHouseParser.TIMESTAMP - 160)) | (1 << (ClickHouseParser.TO - 160)) | (1 << (ClickHouseParser.TOP - 160)) | (1 << (ClickHouseParser.TOTALS - 160)) | (1 << (ClickHouseParser.TRAILING - 160)) | (1 << (ClickHouseParser.TRIM - 160)) | (1 << (ClickHouseParser.TRUNCATE - 160)) | (1 << (ClickHouseParser.TTL - 160)) | (1 << (ClickHouseParser.TYPE - 160)) | (1 << (ClickHouseParser.UNBOUNDED - 160)) | (1 << (ClickHouseParser.UNION - 160)) | (1 << (ClickHouseParser.UPDATE - 160)) | (1 << (ClickHouseParser.USE - 160)) | (1 << (ClickHouseParser.USING - 160)) | (1 << (ClickHouseParser.UUID - 160)) | (1 << (ClickHouseParser.VALUES - 160)) | (1 << (ClickHouseParser.VIEW - 160)) | (1 << (ClickHouseParser.VOLUME - 160)) | (1 << (ClickHouseParser.WATCH - 160)) | (1 << (ClickHouseParser.WEEK - 160)) | (1 << (ClickHouseParser.WHEN - 160)) | (1 << (ClickHouseParser.WHERE - 160)) | (1 << (ClickHouseParser.WINDOW - 160)) | (1 << (ClickHouseParser.WITH - 160)) | (1 << (ClickHouseParser.YEAR - 160)) | (1 << (ClickHouseParser.JSON_FALSE - 160)) | (1 << (ClickHouseParser.JSON_TRUE - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (ClickHouseParser.IDENTIFIER - 192)) | (1 << (ClickHouseParser.FLOATING_LITERAL - 192)) | (1 << (ClickHouseParser.OCTAL_LITERAL - 192)) | (1 << (ClickHouseParser.DECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.HEXADECIMAL_LITERAL - 192)) | (1 << (ClickHouseParser.STRING_LITERAL - 192)) | (1 << (ClickHouseParser.DASH - 192)) | (1 << (ClickHouseParser.DOT - 192)) | (1 << (ClickHouseParser.PLUS - 192)))) !== 0)) {
				{
				this.state = 1921;
				this.tableArgList();
				}
			}

			this.state = 1924;
			this.match(ClickHouseParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableIdentifier(): TableIdentifierContext {
		let _localctx: TableIdentifierContext = new TableIdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 206, ClickHouseParser.RULE_tableIdentifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1929;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 264, this._ctx) ) {
			case 1:
				{
				this.state = 1926;
				this.databaseIdentifier();
				this.state = 1927;
				this.match(ClickHouseParser.DOT);
				}
				break;
			}
			this.state = 1931;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableArgList(): TableArgListContext {
		let _localctx: TableArgListContext = new TableArgListContext(this._ctx, this.state);
		this.enterRule(_localctx, 208, ClickHouseParser.RULE_tableArgList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1933;
			this.tableArgExpr();
			this.state = 1938;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ClickHouseParser.COMMA) {
				{
				{
				this.state = 1934;
				this.match(ClickHouseParser.COMMA);
				this.state = 1935;
				this.tableArgExpr();
				}
				}
				this.state = 1940;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableArgExpr(): TableArgExprContext {
		let _localctx: TableArgExprContext = new TableArgExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 210, ClickHouseParser.RULE_tableArgExpr);
		try {
			this.state = 1944;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 266, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1941;
				this.nestedIdentifier();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1942;
				this.tableFunctionExpr();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1943;
				this.literal();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public databaseIdentifier(): DatabaseIdentifierContext {
		let _localctx: DatabaseIdentifierContext = new DatabaseIdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 212, ClickHouseParser.RULE_databaseIdentifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1946;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public floatingLiteral(): FloatingLiteralContext {
		let _localctx: FloatingLiteralContext = new FloatingLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 214, ClickHouseParser.RULE_floatingLiteral);
		let _la: number;
		try {
			this.state = 1956;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.FLOATING_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1948;
				this.match(ClickHouseParser.FLOATING_LITERAL);
				}
				break;
			case ClickHouseParser.DOT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1949;
				this.match(ClickHouseParser.DOT);
				this.state = 1950;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.OCTAL_LITERAL || _la === ClickHouseParser.DECIMAL_LITERAL)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			case ClickHouseParser.DECIMAL_LITERAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1951;
				this.match(ClickHouseParser.DECIMAL_LITERAL);
				this.state = 1952;
				this.match(ClickHouseParser.DOT);
				this.state = 1954;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 267, this._ctx) ) {
				case 1:
					{
					this.state = 1953;
					_la = this._input.LA(1);
					if (!(_la === ClickHouseParser.OCTAL_LITERAL || _la === ClickHouseParser.DECIMAL_LITERAL)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
					break;
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numberLiteral(): NumberLiteralContext {
		let _localctx: NumberLiteralContext = new NumberLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 216, ClickHouseParser.RULE_numberLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1959;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ClickHouseParser.DASH || _la === ClickHouseParser.PLUS) {
				{
				this.state = 1958;
				_la = this._input.LA(1);
				if (!(_la === ClickHouseParser.DASH || _la === ClickHouseParser.PLUS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 1967;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 270, this._ctx) ) {
			case 1:
				{
				this.state = 1961;
				this.floatingLiteral();
				}
				break;

			case 2:
				{
				this.state = 1962;
				this.match(ClickHouseParser.OCTAL_LITERAL);
				}
				break;

			case 3:
				{
				this.state = 1963;
				this.match(ClickHouseParser.DECIMAL_LITERAL);
				}
				break;

			case 4:
				{
				this.state = 1964;
				this.match(ClickHouseParser.HEXADECIMAL_LITERAL);
				}
				break;

			case 5:
				{
				this.state = 1965;
				this.match(ClickHouseParser.INF);
				}
				break;

			case 6:
				{
				this.state = 1966;
				this.match(ClickHouseParser.NAN_SQL);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 218, ClickHouseParser.RULE_literal);
		try {
			this.state = 1972;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.INF:
			case ClickHouseParser.NAN_SQL:
			case ClickHouseParser.FLOATING_LITERAL:
			case ClickHouseParser.OCTAL_LITERAL:
			case ClickHouseParser.DECIMAL_LITERAL:
			case ClickHouseParser.HEXADECIMAL_LITERAL:
			case ClickHouseParser.DASH:
			case ClickHouseParser.DOT:
			case ClickHouseParser.PLUS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1969;
				this.numberLiteral();
				}
				break;
			case ClickHouseParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1970;
				this.match(ClickHouseParser.STRING_LITERAL);
				}
				break;
			case ClickHouseParser.NULL_SQL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1971;
				this.match(ClickHouseParser.NULL_SQL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interval(): IntervalContext {
		let _localctx: IntervalContext = new IntervalContext(this._ctx, this.state);
		this.enterRule(_localctx, 220, ClickHouseParser.RULE_interval);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1974;
			_la = this._input.LA(1);
			if (!(_la === ClickHouseParser.DAY || _la === ClickHouseParser.HOUR || ((((_la - 107)) & ~0x1F) === 0 && ((1 << (_la - 107)) & ((1 << (ClickHouseParser.MINUTE - 107)) | (1 << (ClickHouseParser.MONTH - 107)) | (1 << (ClickHouseParser.QUARTER - 107)))) !== 0) || _la === ClickHouseParser.SECOND || _la === ClickHouseParser.WEEK || _la === ClickHouseParser.YEAR)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public keyword(): KeywordContext {
		let _localctx: KeywordContext = new KeywordContext(this._ctx, this.state);
		this.enterRule(_localctx, 222, ClickHouseParser.RULE_keyword);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1976;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ClickHouseParser.AFTER) | (1 << ClickHouseParser.ALIAS) | (1 << ClickHouseParser.ALL) | (1 << ClickHouseParser.ALTER) | (1 << ClickHouseParser.AND) | (1 << ClickHouseParser.ANTI) | (1 << ClickHouseParser.ANY) | (1 << ClickHouseParser.ARRAY) | (1 << ClickHouseParser.AS) | (1 << ClickHouseParser.ASCENDING) | (1 << ClickHouseParser.ASOF) | (1 << ClickHouseParser.AST) | (1 << ClickHouseParser.ASYNC) | (1 << ClickHouseParser.ATTACH) | (1 << ClickHouseParser.BETWEEN) | (1 << ClickHouseParser.BOTH) | (1 << ClickHouseParser.BY) | (1 << ClickHouseParser.CASE) | (1 << ClickHouseParser.CAST) | (1 << ClickHouseParser.CHECK) | (1 << ClickHouseParser.CLEAR) | (1 << ClickHouseParser.CLUSTER) | (1 << ClickHouseParser.CODEC) | (1 << ClickHouseParser.COLLATE) | (1 << ClickHouseParser.COLUMN) | (1 << ClickHouseParser.COMMENT) | (1 << ClickHouseParser.CONSTRAINT) | (1 << ClickHouseParser.CREATE) | (1 << ClickHouseParser.CROSS) | (1 << ClickHouseParser.CUBE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ClickHouseParser.CURRENT - 32)) | (1 << (ClickHouseParser.DATABASE - 32)) | (1 << (ClickHouseParser.DATABASES - 32)) | (1 << (ClickHouseParser.DATE - 32)) | (1 << (ClickHouseParser.DEDUPLICATE - 32)) | (1 << (ClickHouseParser.DEFAULT - 32)) | (1 << (ClickHouseParser.DELAY - 32)) | (1 << (ClickHouseParser.DELETE - 32)) | (1 << (ClickHouseParser.DESC - 32)) | (1 << (ClickHouseParser.DESCENDING - 32)) | (1 << (ClickHouseParser.DESCRIBE - 32)) | (1 << (ClickHouseParser.DETACH - 32)) | (1 << (ClickHouseParser.DICTIONARIES - 32)) | (1 << (ClickHouseParser.DICTIONARY - 32)) | (1 << (ClickHouseParser.DISK - 32)) | (1 << (ClickHouseParser.DISTINCT - 32)) | (1 << (ClickHouseParser.DISTRIBUTED - 32)) | (1 << (ClickHouseParser.DROP - 32)) | (1 << (ClickHouseParser.ELSE - 32)) | (1 << (ClickHouseParser.END - 32)) | (1 << (ClickHouseParser.ENGINE - 32)) | (1 << (ClickHouseParser.EVENTS - 32)) | (1 << (ClickHouseParser.EXISTS - 32)) | (1 << (ClickHouseParser.EXPLAIN - 32)) | (1 << (ClickHouseParser.EXPRESSION - 32)) | (1 << (ClickHouseParser.EXTRACT - 32)) | (1 << (ClickHouseParser.FETCHES - 32)) | (1 << (ClickHouseParser.FINAL - 32)) | (1 << (ClickHouseParser.FIRST - 32)) | (1 << (ClickHouseParser.FLUSH - 32)) | (1 << (ClickHouseParser.FOLLOWING - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ClickHouseParser.FOR - 64)) | (1 << (ClickHouseParser.FORMAT - 64)) | (1 << (ClickHouseParser.FREEZE - 64)) | (1 << (ClickHouseParser.FROM - 64)) | (1 << (ClickHouseParser.FULL - 64)) | (1 << (ClickHouseParser.FUNCTION - 64)) | (1 << (ClickHouseParser.GLOBAL - 64)) | (1 << (ClickHouseParser.GRANULARITY - 64)) | (1 << (ClickHouseParser.GROUP - 64)) | (1 << (ClickHouseParser.HAVING - 64)) | (1 << (ClickHouseParser.HIERARCHICAL - 64)) | (1 << (ClickHouseParser.ID - 64)) | (1 << (ClickHouseParser.IF - 64)) | (1 << (ClickHouseParser.ILIKE - 64)) | (1 << (ClickHouseParser.IN - 64)) | (1 << (ClickHouseParser.INDEX - 64)) | (1 << (ClickHouseParser.INJECTIVE - 64)) | (1 << (ClickHouseParser.INNER - 64)) | (1 << (ClickHouseParser.INSERT - 64)) | (1 << (ClickHouseParser.INTERVAL - 64)) | (1 << (ClickHouseParser.INTO - 64)) | (1 << (ClickHouseParser.IS - 64)) | (1 << (ClickHouseParser.IS_OBJECT_ID - 64)) | (1 << (ClickHouseParser.JOIN - 64)) | (1 << (ClickHouseParser.KEY - 64)) | (1 << (ClickHouseParser.KILL - 64)) | (1 << (ClickHouseParser.LAST - 64)) | (1 << (ClickHouseParser.LAYOUT - 64)) | (1 << (ClickHouseParser.LEADING - 64)) | (1 << (ClickHouseParser.LEFT - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (ClickHouseParser.LIFETIME - 96)) | (1 << (ClickHouseParser.LIKE - 96)) | (1 << (ClickHouseParser.LIMIT - 96)) | (1 << (ClickHouseParser.LIVE - 96)) | (1 << (ClickHouseParser.LOCAL - 96)) | (1 << (ClickHouseParser.LOGS - 96)) | (1 << (ClickHouseParser.MATERIALIZE - 96)) | (1 << (ClickHouseParser.MATERIALIZED - 96)) | (1 << (ClickHouseParser.MAX - 96)) | (1 << (ClickHouseParser.MERGES - 96)) | (1 << (ClickHouseParser.MIN - 96)) | (1 << (ClickHouseParser.MODIFY - 96)) | (1 << (ClickHouseParser.MOVE - 96)) | (1 << (ClickHouseParser.MUTATION - 96)) | (1 << (ClickHouseParser.NO - 96)) | (1 << (ClickHouseParser.NOT - 96)) | (1 << (ClickHouseParser.NULLS - 96)) | (1 << (ClickHouseParser.OFFSET - 96)) | (1 << (ClickHouseParser.ON - 96)) | (1 << (ClickHouseParser.OPTIMIZE - 96)) | (1 << (ClickHouseParser.OR - 96)) | (1 << (ClickHouseParser.ORDER - 96)) | (1 << (ClickHouseParser.OUTER - 96)) | (1 << (ClickHouseParser.OUTFILE - 96)) | (1 << (ClickHouseParser.OVER - 96)) | (1 << (ClickHouseParser.PARTITION - 96)) | (1 << (ClickHouseParser.POPULATE - 96)) | (1 << (ClickHouseParser.PRECEDING - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (ClickHouseParser.PREWHERE - 128)) | (1 << (ClickHouseParser.PRIMARY - 128)) | (1 << (ClickHouseParser.RANGE - 128)) | (1 << (ClickHouseParser.RELOAD - 128)) | (1 << (ClickHouseParser.REMOVE - 128)) | (1 << (ClickHouseParser.RENAME - 128)) | (1 << (ClickHouseParser.REPLACE - 128)) | (1 << (ClickHouseParser.REPLICA - 128)) | (1 << (ClickHouseParser.REPLICATED - 128)) | (1 << (ClickHouseParser.RIGHT - 128)) | (1 << (ClickHouseParser.ROLLUP - 128)) | (1 << (ClickHouseParser.ROW - 128)) | (1 << (ClickHouseParser.ROWS - 128)) | (1 << (ClickHouseParser.SAMPLE - 128)) | (1 << (ClickHouseParser.SELECT - 128)) | (1 << (ClickHouseParser.SEMI - 128)) | (1 << (ClickHouseParser.SENDS - 128)) | (1 << (ClickHouseParser.SET - 128)) | (1 << (ClickHouseParser.SETTINGS - 128)) | (1 << (ClickHouseParser.SHOW - 128)) | (1 << (ClickHouseParser.SOURCE - 128)) | (1 << (ClickHouseParser.START - 128)) | (1 << (ClickHouseParser.STOP - 128)) | (1 << (ClickHouseParser.SUBSTRING - 128)) | (1 << (ClickHouseParser.SYNC - 128)) | (1 << (ClickHouseParser.SYNTAX - 128)) | (1 << (ClickHouseParser.SYSTEM - 128)) | (1 << (ClickHouseParser.TABLE - 128)) | (1 << (ClickHouseParser.TABLES - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (ClickHouseParser.TEMPORARY - 160)) | (1 << (ClickHouseParser.TEST - 160)) | (1 << (ClickHouseParser.THEN - 160)) | (1 << (ClickHouseParser.TIES - 160)) | (1 << (ClickHouseParser.TIMEOUT - 160)) | (1 << (ClickHouseParser.TIMESTAMP - 160)) | (1 << (ClickHouseParser.TO - 160)) | (1 << (ClickHouseParser.TOP - 160)) | (1 << (ClickHouseParser.TOTALS - 160)) | (1 << (ClickHouseParser.TRAILING - 160)) | (1 << (ClickHouseParser.TRIM - 160)) | (1 << (ClickHouseParser.TRUNCATE - 160)) | (1 << (ClickHouseParser.TTL - 160)) | (1 << (ClickHouseParser.TYPE - 160)) | (1 << (ClickHouseParser.UNBOUNDED - 160)) | (1 << (ClickHouseParser.UNION - 160)) | (1 << (ClickHouseParser.UPDATE - 160)) | (1 << (ClickHouseParser.USE - 160)) | (1 << (ClickHouseParser.USING - 160)) | (1 << (ClickHouseParser.UUID - 160)) | (1 << (ClickHouseParser.VALUES - 160)) | (1 << (ClickHouseParser.VIEW - 160)) | (1 << (ClickHouseParser.VOLUME - 160)) | (1 << (ClickHouseParser.WATCH - 160)) | (1 << (ClickHouseParser.WHEN - 160)) | (1 << (ClickHouseParser.WHERE - 160)) | (1 << (ClickHouseParser.WINDOW - 160)) | (1 << (ClickHouseParser.WITH - 160)) | (1 << (ClickHouseParser.JSON_FALSE - 160)) | (1 << (ClickHouseParser.JSON_TRUE - 160)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public keywordForAlias(): KeywordForAliasContext {
		let _localctx: KeywordForAliasContext = new KeywordForAliasContext(this._ctx, this.state);
		this.enterRule(_localctx, 224, ClickHouseParser.RULE_keywordForAlias);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1978;
			_la = this._input.LA(1);
			if (!(_la === ClickHouseParser.DATE || _la === ClickHouseParser.FIRST || _la === ClickHouseParser.ID || _la === ClickHouseParser.KEY)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public alias(): AliasContext {
		let _localctx: AliasContext = new AliasContext(this._ctx, this.state);
		this.enterRule(_localctx, 226, ClickHouseParser.RULE_alias);
		try {
			this.state = 1982;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1980;
				this.match(ClickHouseParser.IDENTIFIER);
				}
				break;
			case ClickHouseParser.DATE:
			case ClickHouseParser.FIRST:
			case ClickHouseParser.ID:
			case ClickHouseParser.KEY:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1981;
				this.keywordForAlias();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 228, ClickHouseParser.RULE_identifier);
		try {
			this.state = 1987;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1984;
				this.match(ClickHouseParser.IDENTIFIER);
				}
				break;
			case ClickHouseParser.DAY:
			case ClickHouseParser.HOUR:
			case ClickHouseParser.MINUTE:
			case ClickHouseParser.MONTH:
			case ClickHouseParser.QUARTER:
			case ClickHouseParser.SECOND:
			case ClickHouseParser.WEEK:
			case ClickHouseParser.YEAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1985;
				this.interval();
				}
				break;
			case ClickHouseParser.AFTER:
			case ClickHouseParser.ALIAS:
			case ClickHouseParser.ALL:
			case ClickHouseParser.ALTER:
			case ClickHouseParser.AND:
			case ClickHouseParser.ANTI:
			case ClickHouseParser.ANY:
			case ClickHouseParser.ARRAY:
			case ClickHouseParser.AS:
			case ClickHouseParser.ASCENDING:
			case ClickHouseParser.ASOF:
			case ClickHouseParser.AST:
			case ClickHouseParser.ASYNC:
			case ClickHouseParser.ATTACH:
			case ClickHouseParser.BETWEEN:
			case ClickHouseParser.BOTH:
			case ClickHouseParser.BY:
			case ClickHouseParser.CASE:
			case ClickHouseParser.CAST:
			case ClickHouseParser.CHECK:
			case ClickHouseParser.CLEAR:
			case ClickHouseParser.CLUSTER:
			case ClickHouseParser.CODEC:
			case ClickHouseParser.COLLATE:
			case ClickHouseParser.COLUMN:
			case ClickHouseParser.COMMENT:
			case ClickHouseParser.CONSTRAINT:
			case ClickHouseParser.CREATE:
			case ClickHouseParser.CROSS:
			case ClickHouseParser.CUBE:
			case ClickHouseParser.CURRENT:
			case ClickHouseParser.DATABASE:
			case ClickHouseParser.DATABASES:
			case ClickHouseParser.DATE:
			case ClickHouseParser.DEDUPLICATE:
			case ClickHouseParser.DEFAULT:
			case ClickHouseParser.DELAY:
			case ClickHouseParser.DELETE:
			case ClickHouseParser.DESC:
			case ClickHouseParser.DESCENDING:
			case ClickHouseParser.DESCRIBE:
			case ClickHouseParser.DETACH:
			case ClickHouseParser.DICTIONARIES:
			case ClickHouseParser.DICTIONARY:
			case ClickHouseParser.DISK:
			case ClickHouseParser.DISTINCT:
			case ClickHouseParser.DISTRIBUTED:
			case ClickHouseParser.DROP:
			case ClickHouseParser.ELSE:
			case ClickHouseParser.END:
			case ClickHouseParser.ENGINE:
			case ClickHouseParser.EVENTS:
			case ClickHouseParser.EXISTS:
			case ClickHouseParser.EXPLAIN:
			case ClickHouseParser.EXPRESSION:
			case ClickHouseParser.EXTRACT:
			case ClickHouseParser.FETCHES:
			case ClickHouseParser.FINAL:
			case ClickHouseParser.FIRST:
			case ClickHouseParser.FLUSH:
			case ClickHouseParser.FOLLOWING:
			case ClickHouseParser.FOR:
			case ClickHouseParser.FORMAT:
			case ClickHouseParser.FREEZE:
			case ClickHouseParser.FROM:
			case ClickHouseParser.FULL:
			case ClickHouseParser.FUNCTION:
			case ClickHouseParser.GLOBAL:
			case ClickHouseParser.GRANULARITY:
			case ClickHouseParser.GROUP:
			case ClickHouseParser.HAVING:
			case ClickHouseParser.HIERARCHICAL:
			case ClickHouseParser.ID:
			case ClickHouseParser.IF:
			case ClickHouseParser.ILIKE:
			case ClickHouseParser.IN:
			case ClickHouseParser.INDEX:
			case ClickHouseParser.INJECTIVE:
			case ClickHouseParser.INNER:
			case ClickHouseParser.INSERT:
			case ClickHouseParser.INTERVAL:
			case ClickHouseParser.INTO:
			case ClickHouseParser.IS:
			case ClickHouseParser.IS_OBJECT_ID:
			case ClickHouseParser.JOIN:
			case ClickHouseParser.KEY:
			case ClickHouseParser.KILL:
			case ClickHouseParser.LAST:
			case ClickHouseParser.LAYOUT:
			case ClickHouseParser.LEADING:
			case ClickHouseParser.LEFT:
			case ClickHouseParser.LIFETIME:
			case ClickHouseParser.LIKE:
			case ClickHouseParser.LIMIT:
			case ClickHouseParser.LIVE:
			case ClickHouseParser.LOCAL:
			case ClickHouseParser.LOGS:
			case ClickHouseParser.MATERIALIZE:
			case ClickHouseParser.MATERIALIZED:
			case ClickHouseParser.MAX:
			case ClickHouseParser.MERGES:
			case ClickHouseParser.MIN:
			case ClickHouseParser.MODIFY:
			case ClickHouseParser.MOVE:
			case ClickHouseParser.MUTATION:
			case ClickHouseParser.NO:
			case ClickHouseParser.NOT:
			case ClickHouseParser.NULLS:
			case ClickHouseParser.OFFSET:
			case ClickHouseParser.ON:
			case ClickHouseParser.OPTIMIZE:
			case ClickHouseParser.OR:
			case ClickHouseParser.ORDER:
			case ClickHouseParser.OUTER:
			case ClickHouseParser.OUTFILE:
			case ClickHouseParser.OVER:
			case ClickHouseParser.PARTITION:
			case ClickHouseParser.POPULATE:
			case ClickHouseParser.PRECEDING:
			case ClickHouseParser.PREWHERE:
			case ClickHouseParser.PRIMARY:
			case ClickHouseParser.RANGE:
			case ClickHouseParser.RELOAD:
			case ClickHouseParser.REMOVE:
			case ClickHouseParser.RENAME:
			case ClickHouseParser.REPLACE:
			case ClickHouseParser.REPLICA:
			case ClickHouseParser.REPLICATED:
			case ClickHouseParser.RIGHT:
			case ClickHouseParser.ROLLUP:
			case ClickHouseParser.ROW:
			case ClickHouseParser.ROWS:
			case ClickHouseParser.SAMPLE:
			case ClickHouseParser.SELECT:
			case ClickHouseParser.SEMI:
			case ClickHouseParser.SENDS:
			case ClickHouseParser.SET:
			case ClickHouseParser.SETTINGS:
			case ClickHouseParser.SHOW:
			case ClickHouseParser.SOURCE:
			case ClickHouseParser.START:
			case ClickHouseParser.STOP:
			case ClickHouseParser.SUBSTRING:
			case ClickHouseParser.SYNC:
			case ClickHouseParser.SYNTAX:
			case ClickHouseParser.SYSTEM:
			case ClickHouseParser.TABLE:
			case ClickHouseParser.TABLES:
			case ClickHouseParser.TEMPORARY:
			case ClickHouseParser.TEST:
			case ClickHouseParser.THEN:
			case ClickHouseParser.TIES:
			case ClickHouseParser.TIMEOUT:
			case ClickHouseParser.TIMESTAMP:
			case ClickHouseParser.TO:
			case ClickHouseParser.TOP:
			case ClickHouseParser.TOTALS:
			case ClickHouseParser.TRAILING:
			case ClickHouseParser.TRIM:
			case ClickHouseParser.TRUNCATE:
			case ClickHouseParser.TTL:
			case ClickHouseParser.TYPE:
			case ClickHouseParser.UNBOUNDED:
			case ClickHouseParser.UNION:
			case ClickHouseParser.UPDATE:
			case ClickHouseParser.USE:
			case ClickHouseParser.USING:
			case ClickHouseParser.UUID:
			case ClickHouseParser.VALUES:
			case ClickHouseParser.VIEW:
			case ClickHouseParser.VOLUME:
			case ClickHouseParser.WATCH:
			case ClickHouseParser.WHEN:
			case ClickHouseParser.WHERE:
			case ClickHouseParser.WINDOW:
			case ClickHouseParser.WITH:
			case ClickHouseParser.JSON_FALSE:
			case ClickHouseParser.JSON_TRUE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1986;
				this.keyword();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifierOrNull(): IdentifierOrNullContext {
		let _localctx: IdentifierOrNullContext = new IdentifierOrNullContext(this._ctx, this.state);
		this.enterRule(_localctx, 230, ClickHouseParser.RULE_identifierOrNull);
		try {
			this.state = 1991;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ClickHouseParser.AFTER:
			case ClickHouseParser.ALIAS:
			case ClickHouseParser.ALL:
			case ClickHouseParser.ALTER:
			case ClickHouseParser.AND:
			case ClickHouseParser.ANTI:
			case ClickHouseParser.ANY:
			case ClickHouseParser.ARRAY:
			case ClickHouseParser.AS:
			case ClickHouseParser.ASCENDING:
			case ClickHouseParser.ASOF:
			case ClickHouseParser.AST:
			case ClickHouseParser.ASYNC:
			case ClickHouseParser.ATTACH:
			case ClickHouseParser.BETWEEN:
			case ClickHouseParser.BOTH:
			case ClickHouseParser.BY:
			case ClickHouseParser.CASE:
			case ClickHouseParser.CAST:
			case ClickHouseParser.CHECK:
			case ClickHouseParser.CLEAR:
			case ClickHouseParser.CLUSTER:
			case ClickHouseParser.CODEC:
			case ClickHouseParser.COLLATE:
			case ClickHouseParser.COLUMN:
			case ClickHouseParser.COMMENT:
			case ClickHouseParser.CONSTRAINT:
			case ClickHouseParser.CREATE:
			case ClickHouseParser.CROSS:
			case ClickHouseParser.CUBE:
			case ClickHouseParser.CURRENT:
			case ClickHouseParser.DATABASE:
			case ClickHouseParser.DATABASES:
			case ClickHouseParser.DATE:
			case ClickHouseParser.DAY:
			case ClickHouseParser.DEDUPLICATE:
			case ClickHouseParser.DEFAULT:
			case ClickHouseParser.DELAY:
			case ClickHouseParser.DELETE:
			case ClickHouseParser.DESC:
			case ClickHouseParser.DESCENDING:
			case ClickHouseParser.DESCRIBE:
			case ClickHouseParser.DETACH:
			case ClickHouseParser.DICTIONARIES:
			case ClickHouseParser.DICTIONARY:
			case ClickHouseParser.DISK:
			case ClickHouseParser.DISTINCT:
			case ClickHouseParser.DISTRIBUTED:
			case ClickHouseParser.DROP:
			case ClickHouseParser.ELSE:
			case ClickHouseParser.END:
			case ClickHouseParser.ENGINE:
			case ClickHouseParser.EVENTS:
			case ClickHouseParser.EXISTS:
			case ClickHouseParser.EXPLAIN:
			case ClickHouseParser.EXPRESSION:
			case ClickHouseParser.EXTRACT:
			case ClickHouseParser.FETCHES:
			case ClickHouseParser.FINAL:
			case ClickHouseParser.FIRST:
			case ClickHouseParser.FLUSH:
			case ClickHouseParser.FOLLOWING:
			case ClickHouseParser.FOR:
			case ClickHouseParser.FORMAT:
			case ClickHouseParser.FREEZE:
			case ClickHouseParser.FROM:
			case ClickHouseParser.FULL:
			case ClickHouseParser.FUNCTION:
			case ClickHouseParser.GLOBAL:
			case ClickHouseParser.GRANULARITY:
			case ClickHouseParser.GROUP:
			case ClickHouseParser.HAVING:
			case ClickHouseParser.HIERARCHICAL:
			case ClickHouseParser.HOUR:
			case ClickHouseParser.ID:
			case ClickHouseParser.IF:
			case ClickHouseParser.ILIKE:
			case ClickHouseParser.IN:
			case ClickHouseParser.INDEX:
			case ClickHouseParser.INJECTIVE:
			case ClickHouseParser.INNER:
			case ClickHouseParser.INSERT:
			case ClickHouseParser.INTERVAL:
			case ClickHouseParser.INTO:
			case ClickHouseParser.IS:
			case ClickHouseParser.IS_OBJECT_ID:
			case ClickHouseParser.JOIN:
			case ClickHouseParser.KEY:
			case ClickHouseParser.KILL:
			case ClickHouseParser.LAST:
			case ClickHouseParser.LAYOUT:
			case ClickHouseParser.LEADING:
			case ClickHouseParser.LEFT:
			case ClickHouseParser.LIFETIME:
			case ClickHouseParser.LIKE:
			case ClickHouseParser.LIMIT:
			case ClickHouseParser.LIVE:
			case ClickHouseParser.LOCAL:
			case ClickHouseParser.LOGS:
			case ClickHouseParser.MATERIALIZE:
			case ClickHouseParser.MATERIALIZED:
			case ClickHouseParser.MAX:
			case ClickHouseParser.MERGES:
			case ClickHouseParser.MIN:
			case ClickHouseParser.MINUTE:
			case ClickHouseParser.MODIFY:
			case ClickHouseParser.MONTH:
			case ClickHouseParser.MOVE:
			case ClickHouseParser.MUTATION:
			case ClickHouseParser.NO:
			case ClickHouseParser.NOT:
			case ClickHouseParser.NULLS:
			case ClickHouseParser.OFFSET:
			case ClickHouseParser.ON:
			case ClickHouseParser.OPTIMIZE:
			case ClickHouseParser.OR:
			case ClickHouseParser.ORDER:
			case ClickHouseParser.OUTER:
			case ClickHouseParser.OUTFILE:
			case ClickHouseParser.OVER:
			case ClickHouseParser.PARTITION:
			case ClickHouseParser.POPULATE:
			case ClickHouseParser.PRECEDING:
			case ClickHouseParser.PREWHERE:
			case ClickHouseParser.PRIMARY:
			case ClickHouseParser.QUARTER:
			case ClickHouseParser.RANGE:
			case ClickHouseParser.RELOAD:
			case ClickHouseParser.REMOVE:
			case ClickHouseParser.RENAME:
			case ClickHouseParser.REPLACE:
			case ClickHouseParser.REPLICA:
			case ClickHouseParser.REPLICATED:
			case ClickHouseParser.RIGHT:
			case ClickHouseParser.ROLLUP:
			case ClickHouseParser.ROW:
			case ClickHouseParser.ROWS:
			case ClickHouseParser.SAMPLE:
			case ClickHouseParser.SECOND:
			case ClickHouseParser.SELECT:
			case ClickHouseParser.SEMI:
			case ClickHouseParser.SENDS:
			case ClickHouseParser.SET:
			case ClickHouseParser.SETTINGS:
			case ClickHouseParser.SHOW:
			case ClickHouseParser.SOURCE:
			case ClickHouseParser.START:
			case ClickHouseParser.STOP:
			case ClickHouseParser.SUBSTRING:
			case ClickHouseParser.SYNC:
			case ClickHouseParser.SYNTAX:
			case ClickHouseParser.SYSTEM:
			case ClickHouseParser.TABLE:
			case ClickHouseParser.TABLES:
			case ClickHouseParser.TEMPORARY:
			case ClickHouseParser.TEST:
			case ClickHouseParser.THEN:
			case ClickHouseParser.TIES:
			case ClickHouseParser.TIMEOUT:
			case ClickHouseParser.TIMESTAMP:
			case ClickHouseParser.TO:
			case ClickHouseParser.TOP:
			case ClickHouseParser.TOTALS:
			case ClickHouseParser.TRAILING:
			case ClickHouseParser.TRIM:
			case ClickHouseParser.TRUNCATE:
			case ClickHouseParser.TTL:
			case ClickHouseParser.TYPE:
			case ClickHouseParser.UNBOUNDED:
			case ClickHouseParser.UNION:
			case ClickHouseParser.UPDATE:
			case ClickHouseParser.USE:
			case ClickHouseParser.USING:
			case ClickHouseParser.UUID:
			case ClickHouseParser.VALUES:
			case ClickHouseParser.VIEW:
			case ClickHouseParser.VOLUME:
			case ClickHouseParser.WATCH:
			case ClickHouseParser.WEEK:
			case ClickHouseParser.WHEN:
			case ClickHouseParser.WHERE:
			case ClickHouseParser.WINDOW:
			case ClickHouseParser.WITH:
			case ClickHouseParser.YEAR:
			case ClickHouseParser.JSON_FALSE:
			case ClickHouseParser.JSON_TRUE:
			case ClickHouseParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1989;
				this.identifier();
				}
				break;
			case ClickHouseParser.NULL_SQL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1990;
				this.match(ClickHouseParser.NULL_SQL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumValue(): EnumValueContext {
		let _localctx: EnumValueContext = new EnumValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 232, ClickHouseParser.RULE_enumValue);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1993;
			this.match(ClickHouseParser.STRING_LITERAL);
			this.state = 1994;
			this.match(ClickHouseParser.EQ_SINGLE);
			this.state = 1995;
			this.numberLiteral();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 69:
			return this.joinExpr_sempred(_localctx as JoinExprContext, predIndex);

		case 95:
			return this.columnExpr_sempred(_localctx as ColumnExprContext, predIndex);

		case 101:
			return this.tableExpr_sempred(_localctx as TableExprContext, predIndex);
		}
		return true;
	}
	private joinExpr_sempred(_localctx: JoinExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 3);

		case 1:
			return this.precpred(this._ctx, 4);
		}
		return true;
	}
	private columnExpr_sempred(_localctx: ColumnExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 2:
			return this.precpred(this._ctx, 16);

		case 3:
			return this.precpred(this._ctx, 15);

		case 4:
			return this.precpred(this._ctx, 14);

		case 5:
			return this.precpred(this._ctx, 11);

		case 6:
			return this.precpred(this._ctx, 10);

		case 7:
			return this.precpred(this._ctx, 9);

		case 8:
			return this.precpred(this._ctx, 8);

		case 9:
			return this.precpred(this._ctx, 19);

		case 10:
			return this.precpred(this._ctx, 18);

		case 11:
			return this.precpred(this._ctx, 13);

		case 12:
			return this.precpred(this._ctx, 7);
		}
		return true;
	}
	private tableExpr_sempred(_localctx: TableExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 13:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 4;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\xE8\u07D0\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
		"\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17" +
		"\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C" +
		"\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04" +
		"#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t" +
		"+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x04" +
		"4\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04" +
		"X\tX\x04Y\tY\x04Z\tZ\x04[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t" +
		"`\x04a\ta\x04b\tb\x04c\tc\x04d\td\x04e\te\x04f\tf\x04g\tg\x04h\th\x04" +
		"i\ti\x04j\tj\x04k\tk\x04l\tl\x04m\tm\x04n\tn\x04o\to\x04p\tp\x04q\tq\x04" +
		"r\tr\x04s\ts\x04t\tt\x04u\tu\x04v\tv\x03\x02\x03\x02\x07\x02\xEF\n\x02" +
		"\f\x02\x0E\x02\xF2\v\x02\x07\x02\xF4\n\x02\f\x02\x0E\x02\xF7\v\x02\x03" +
		"\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03\xFF\n\x03\x03\x03" +
		"\x03\x03\x05\x03\u0103\n\x03\x03\x03\x05\x03\u0106\n\x03\x03\x03\x05\x03" +
		"\u0109\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x05\x04\u011D\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05" +
		"\u0123\n\x05\x03\x05\x03\x05\x03\x05\x07\x05\u0128\n\x05\f\x05\x0E\x05" +
		"\u012B\v\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u0132\n\x06" +
		"\x03\x06\x03\x06\x03\x06\x05\x06\u0137\n\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x05\x06\u013E\n\x06\x03\x06\x03\x06\x03\x06\x05\x06\u0143" +
		"\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u014A\n\x06\x03" +
		"\x06\x03\x06\x03\x06\x05\x06\u014F\n\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x05\x06\u0155\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u015B\n\x06" +
		"\x03\x06\x03\x06\x03\x06\x05\x06\u0160\n\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x05\x06\u0166\n\x06\x03\x06\x03\x06\x03\x06\x05\x06\u016B\n\x06\x03" +
		"\x06\x03\x06\x03\x06\x03\x06\x05\x06\u0171\n\x06\x03\x06\x03\x06\x03\x06" +
		"\x05\x06\u0176\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u017C\n\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x05\x06\u018A\n\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x05\x06\u0191\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x05\x06\u0198\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u019F" +
		"\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u01A5\n\x06\x03\x06\x03" +
		"\x06\x03\x06\x05\x06\u01AA\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06" +
		"\u01B0\n\x06\x03\x06\x03\x06\x03\x06\x05\x06\u01B5\n\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x05\x06\u01BB\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x03\x06\x05\x06\u01C4\n\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u01CE\n\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u01D8\n\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06" +
		"\u01EC\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u01F4" +
		"\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u0203\n\x06\x03\x07\x03" +
		"\x07\x03\x07\x07\x07\u0208\n\x07\f\x07\x0E\x07\u020B\v\x07\x03\b\x03\b" +
		"\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x05\n\u0218\n\n" +
		"\x03\v\x03\v\x03\v\x03\v\x05\v\u021E\n\v\x03\f\x03\f\x03\f\x03\f\x05\f" +
		"\u0224\n\f\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\u022B\n\r\x03\r\x03\r\x05" +
		"\r\u022F\n\r\x03\r\x05\r\u0232\n\r\x03\r\x03\r\x03\r\x03\r\x05\r\u0238" +
		"\n\r\x03\r\x05\r\u023B\n\r\x03\r\x03\r\x03\r\x03\r\x05\r\u0241\n\r\x03" +
		"\r\x03\r\x05\r\u0245\n\r\x03\r\x05\r\u0248\n\r\x03\r\x03\r\x03\r\x03\r" +
		"\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\u0253\n\r\x03\r\x03\r\x05\r\u0257" +
		"\n\r\x03\r\x05\r\u025A\n\r\x03\r\x03\r\x03\r\x05\r\u025F\n\r\x05\r\u0261" +
		"\n\r\x03\r\x05\r\u0264\n\r\x03\r\x05\r\u0267\n\r\x03\r\x03\r\x03\r\x03" +
		"\r\x03\r\x03\r\x03\r\x03\r\x05\r\u0271\n\r\x03\r\x03\r\x05\r\u0275\n\r" +
		"\x03\r\x05\r\u0278\n\r\x03\r\x05\r\u027B\n\r\x03\r\x03\r\x03\r\x05\r\u0280" +
		"\n\r\x05\r\u0282\n\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\u028A\n" +
		"\r\x03\r\x05\r\u028D\n\r\x03\r\x05\r\u0290\n\r\x03\r\x03\r\x03\r\x03\r" +
		"\x05\r\u0296\n\r\x03\r\x03\r\x05\r\u029A\n\r\x03\r\x05\r\u029D\n\r\x03" +
		"\r\x05\r\u02A0\n\r\x03\r\x05\r\u02A3\n\r\x03\r\x05\r\u02A6\n\r\x03\r\x03" +
		"\r\x03\r\x05\r\u02AB\n\r\x03\r\x03\r\x03\r\x03\r\x05\r\u02B1\n\r\x03\r" +
		"\x03\r\x05\r\u02B5\n\r\x03\r\x05\r\u02B8\n\r\x03\r\x05\r\u02BB\n\r\x03" +
		"\r\x03\r\x05\r\u02BF\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x07\x0E\u02C5" +
		"\n\x0E\f\x0E\x0E\x0E\u02C8\v\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x07\x0F\u02D5\n\x0F\f" +
		"\x0F\x0E\x0F\u02D8\v\x0F\x03\x10\x05\x10\u02DB\n\x10\x03\x10\x03\x10\x03" +
		"\x10\x03\x10\x03\x10\x07\x10\u02E2\n\x10\f\x10\x0E\x10\u02E5\v\x10\x03" +
		"\x11\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12\u02EF" +
		"\n\x12\x03\x12\x05\x12\u02F2\n\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x07\x13\u02F9\n\x13\f\x13\x0E\x13\u02FC\v\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03" +
		"\x14\x03\x14\x03\x14\x05\x14\u030C\n\x14\x03\x14\x03\x14\x03\x15\x03\x15" +
		"\x03\x15\x03\x15\x03\x15\x07\x15\u0315\n\x15\f\x15\x0E\x15\u0318\v\x15" +
		"\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\u0329\n\x16\x03" +
		"\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x18\x03\x18\x03" +
		"\x18\x03\x18\x05\x18\u0336\n\x18\x03\x19\x03\x19\x03\x19\x03\x1A\x03\x1A" +
		"\x03\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x07\x1C" +
		"\u0345\n\x1C\f\x1C\x0E\x1C\u0348\v\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C" +
		"\x03\x1C\x03\x1C\x05\x1C\u0350\n\x1C\x03\x1D\x03\x1D\x05\x1D\u0354\n\x1D" +
		"\x03\x1D\x05\x1D\u0357\n\x1D\x03\x1D\x05\x1D\u035A\n\x1D\x03\x1D\x05\x1D" +
		"\u035D\n\x1D\x03\x1D\x05\x1D\u0360\n\x1D\x03\x1D\x05\x1D\u0363\n\x1D\x03" +
		"\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03 \x03" +
		" \x03 \x03 \x03!\x03!\x03!\x03!\x07!\u0375\n!\f!\x0E!\u0378\v!\x03\"\x03" +
		"\"\x05\"\u037C\n\"\x03\"\x03\"\x03\"\x05\"\u0381\n\"\x03\"\x05\"\u0384" +
		"\n\"\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x05#\u0390\n#\x03" +
		"$\x03$\x03$\x05$\u0395\n$\x03$\x03$\x05$\u0399\n$\x03$\x05$\u039C\n$\x03" +
		"$\x03$\x05$\u03A0\n$\x03$\x03$\x05$\u03A4\n$\x03$\x03$\x03$\x05$\u03A9" +
		"\n$\x03$\x05$\u03AC\n$\x03$\x03$\x05$\u03B0\n$\x05$\u03B2\n$\x03%\x03" +
		"%\x03%\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03\'\x03\'\x03\'\x03(\x03(" +
		"\x03(\x03(\x03(\x07(\u03C6\n(\f(\x0E(\u03C9\v(\x03(\x03(\x03)\x03)\x03" +
		")\x05)\u03D0\n)\x03)\x05)\u03D3\n)\x03*\x03*\x03*\x03*\x03*\x03*\x03*" +
		"\x03*\x05*\u03DD\n*\x03+\x03+\x05+\u03E1\n+\x03+\x03+\x03,\x03,\x03,\x03" +
		",\x05,\u03E9\n,\x03,\x03,\x05,\u03ED\n,\x03,\x03,\x03,\x05,\u03F2\n,\x03" +
		",\x03,\x05,\u03F6\n,\x03,\x03,\x05,\u03FA\n,\x03,\x03,\x05,\u03FE\n,\x03" +
		",\x03,\x05,\u0402\n,\x05,\u0404\n,\x03-\x03-\x03-\x03-\x03-\x03-\x05-" +
		"\u040C\n-\x03-\x03-\x05-\u0410\n-\x03-\x05-\u0413\n-\x03.\x03.\x03.\x03" +
		".\x03.\x03.\x05.\u041B\n.\x03/\x03/\x03/\x05/\u0420\n/\x03/\x03/\x03/" +
		"\x05/\u0425\n/\x03/\x05/\u0428\n/\x03/\x03/\x030\x030\x030\x030\x070\u0430" +
		"\n0\f0\x0E0\u0433\v0\x030\x030\x031\x031\x031\x031\x031\x051\u043C\n1" +
		"\x031\x031\x051\u0440\n1\x032\x032\x032\x052\u0445\n2\x032\x032\x052\u0449" +
		"\n2\x033\x033\x033\x033\x053\u044F\n3\x033\x053\u0452\n3\x033\x053\u0455" +
		"\n3\x033\x053\u0458\n3\x034\x034\x034\x034\x034\x034\x034\x034\x034\x03" +
		"4\x074\u0464\n4\f4\x0E4\u0467\v4\x034\x054\u046A\n4\x035\x035\x055\u046E" +
		"\n5\x035\x035\x035\x055\u0473\n5\x035\x055\u0476\n5\x035\x035\x036\x03" +
		"6\x036\x036\x076\u047E\n6\f6\x0E6\u0481\v6\x037\x037\x037\x037\x037\x05" +
		"7\u0488\n7\x038\x058\u048B\n8\x038\x038\x058\u048F\n8\x038\x058\u0492" +
		"\n8\x038\x038\x058\u0496\n8\x038\x058\u0499\n8\x038\x058\u049C\n8\x03" +
		"8\x058\u049F\n8\x038\x058\u04A2\n8\x038\x058\u04A5\n8\x038\x038\x058\u04A9" +
		"\n8\x038\x038\x058\u04AD\n8\x038\x058\u04B0\n8\x038\x058\u04B3\n8\x03" +
		"8\x058\u04B6\n8\x038\x058\u04B9\n8\x038\x058\u04BC\n8\x039\x039\x039\x03" +
		":\x03:\x03:\x03:\x05:\u04C5\n:\x03;\x03;\x03;\x03<\x05<\u04CB\n<\x03<" +
		"\x03<\x03<\x03<\x03=\x03=\x03=\x03=\x03=\x03=\x03=\x03>\x03>\x03>\x03" +
		"?\x03?\x03?\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x05@\u04E6\n@\x03" +
		"A\x03A\x03A\x03B\x03B\x03B\x03B\x03C\x03C\x03C\x03C\x03D\x03D\x03D\x03" +
		"D\x03D\x03E\x03E\x03E\x03E\x05E\u04FC\nE\x03F\x03F\x03F\x03G\x03G\x03" +
		"G\x05G\u0504\nG\x03G\x05G\u0507\nG\x03G\x03G\x03G\x03G\x05G\u050D\nG\x03" +
		"G\x03G\x03G\x03G\x03G\x03G\x05G\u0515\nG\x03G\x05G\u0518\nG\x03G\x03G" +
		"\x03G\x03G\x07G\u051E\nG\fG\x0EG\u0521\vG\x03H\x05H\u0524\nH\x03H\x03" +
		"H\x03H\x05H\u0529\nH\x03H\x05H\u052C\nH\x03H\x05H\u052F\nH\x03H\x03H\x05" +
		"H\u0533\nH\x03H\x03H\x05H\u0537\nH\x03H\x05H\u053A\nH\x05H\u053C\nH\x03" +
		"H\x05H\u053F\nH\x03H\x03H\x05H\u0543\nH\x03H\x03H\x05H\u0547\nH\x03H\x05" +
		"H\u054A\nH\x05H\u054C\nH\x05H\u054E\nH\x03I\x05I\u0551\nI\x03I\x03I\x03" +
		"I\x05I\u0556\nI\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x05J\u0561" +
		"\nJ\x03K\x03K\x03K\x03K\x05K\u0567\nK\x03L\x03L\x03L\x05L\u056C\nL\x03" +
		"M\x03M\x03M\x07M\u0571\nM\fM\x0EM\u0574\vM\x03N\x03N\x05N\u0578\nN\x03" +
		"N\x03N\x05N\u057C\nN\x03N\x03N\x05N\u0580\nN\x03O\x03O\x03O\x05O\u0585" +
		"\nO\x03P\x03P\x03P\x07P\u058A\nP\fP\x0EP\u058D\vP\x03Q\x03Q\x03Q\x03Q" +
		"\x03R\x05R\u0594\nR\x03R\x05R\u0597\nR\x03R\x05R\u059A\nR\x03S\x03S\x03" +
		"S\x03S\x03T\x03T\x03T\x03T\x03U\x03U\x03U\x03V\x03V\x03V\x03V\x03V\x03" +
		"V\x05V\u05AD\nV\x03W\x03W\x03W\x03W\x03W\x03W\x03W\x03W\x03W\x03W\x03" +
		"W\x03W\x05W\u05BB\nW\x03X\x03X\x03X\x03Y\x03Y\x03Y\x03Y\x03Y\x03Y\x03" +
		"Y\x03Y\x03Y\x03Y\x03Y\x05Y\u05CB\nY\x03Y\x05Y\u05CE\nY\x03Y\x03Y\x03Y" +
		"\x03Y\x03Y\x03Y\x03Y\x05Y\u05D7\nY\x03Y\x03Y\x05Y\u05DB\nY\x03Y\x03Y\x03" +
		"Y\x05Y\u05E0\nY\x03Y\x03Y\x03Y\x05Y\u05E5\nY\x03Y\x05Y\u05E8\nY\x05Y\u05EA" +
		"\nY\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03" +
		"Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x05Z\u0600\nZ\x03Z\x05Z\u0603\nZ\x03Z" +
		"\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x05Z\u060E\nZ\x03[\x03[\x05[" +
		"\u0612\n[\x03[\x05[\u0615\n[\x03[\x03[\x05[\u0619\n[\x03[\x03[\x05[\u061D" +
		"\n[\x03\\\x03\\\x03\\\x03]\x03]\x03]\x05]\u0625\n]\x03]\x03]\x05]\u0629" +
		"\n]\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x07^\u0634\n^\f^\x0E" +
		"^\u0637\v^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x07^\u0640\n^\f^\x0E^\u0643" +
		"\v^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x07^\u064C\n^\f^\x0E^\u064F\v^" +
		"\x03^\x03^\x03^\x03^\x03^\x05^\u0656\n^\x03^\x03^\x05^\u065A\n^\x03_\x03" +
		"_\x03_\x07_\u065F\n_\f_\x0E_\u0662\v_\x03`\x03`\x03`\x05`\u0667\n`\x03" +
		"`\x03`\x03`\x03`\x03`\x03`\x05`\u066F\n`\x03a\x03a\x03a\x05a\u0674\na" +
		"\x03a\x03a\x03a\x03a\x03a\x06a\u067B\na\ra\x0Ea\u067C\x03a\x03a\x05a\u0681" +
		"\na\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03" +
		"a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03" +
		"a\x03a\x05a\u06A0\na\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03" +
		"a\x03a\x03a\x03a\x03a\x03a\x05a\u06B1\na\x03a\x03a\x03a\x03a\x03a\x03" +
		"a\x03a\x03a\x03a\x03a\x05a\u06BD\na\x03a\x03a\x03a\x03a\x03a\x03a\x03" +
		"a\x03a\x05a\u06C7\na\x03a\x05a\u06CA\na\x03a\x03a\x05a\u06CE\na\x03a\x05" +
		"a\u06D1\na\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x05a\u06DD" +
		"\na\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03" +
		"a\x03a\x05a\u06EE\na\x03a\x03a\x05a\u06F2\na\x03a\x03a\x03a\x03a\x03a" +
		"\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x05a\u0703\na\x03a" +
		"\x05a\u0706\na\x03a\x03a\x05a\u070A\na\x03a\x05a\u070D\na\x03a\x03a\x03" +
		"a\x03a\x03a\x03a\x03a\x03a\x03a\x05a\u0718\na\x03a\x03a\x03a\x03a\x03" +
		"a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03a\x03" +
		"a\x03a\x03a\x03a\x05a\u0730\na\x03a\x03a\x03a\x03a\x03a\x05a\u0737\na" +
		"\x07a\u0739\na\fa\x0Ea\u073C\va\x03b\x03b\x03b\x07b\u0741\nb\fb\x0Eb\u0744" +
		"\vb\x03c\x03c\x05c\u0748\nc\x03d\x03d\x03d\x03d\x07d\u074E\nd\fd\x0Ed" +
		"\u0751\vd\x03d\x03d\x03d\x03d\x03d\x07d\u0758\nd\fd\x0Ed\u075B\vd\x05" +
		"d\u075D\nd\x03d\x03d\x03d\x03e\x03e\x03e\x05e\u0765\ne\x03e\x03e\x03f" +
		"\x03f\x03f\x05f\u076C\nf\x03g\x03g\x03g\x03g\x03g\x03g\x03g\x05g\u0775" +
		"\ng\x03g\x03g\x03g\x03g\x05g\u077B\ng\x07g\u077D\ng\fg\x0Eg\u0780\vg\x03" +
		"h\x03h\x03h\x05h\u0785\nh\x03h\x03h\x03i\x03i\x03i\x05i\u078C\ni\x03i" +
		"\x03i\x03j\x03j\x03j\x07j\u0793\nj\fj\x0Ej\u0796\vj\x03k\x03k\x03k\x05" +
		"k\u079B\nk\x03l\x03l\x03m\x03m\x03m\x03m\x03m\x03m\x05m\u07A5\nm\x05m" +
		"\u07A7\nm\x03n\x05n\u07AA\nn\x03n\x03n\x03n\x03n\x03n\x03n\x05n\u07B2" +
		"\nn\x03o\x03o\x03o\x05o\u07B7\no\x03p\x03p\x03q\x03q\x03r\x03r\x03s\x03" +
		"s\x05s\u07C1\ns\x03t\x03t\x03t\x05t\u07C6\nt\x03u\x03u\x05u\u07CA\nu\x03" +
		"v\x03v\x03v\x03v\x03v\x02\x02\x05\x8C\xC0\xCCw\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A" +
		"\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x02" +
		"4\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02" +
		"P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02" +
		"l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84" +
		"\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96" +
		"\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4\x02\xA6\x02\xA8" +
		"\x02\xAA\x02\xAC\x02\xAE\x02\xB0\x02\xB2\x02\xB4\x02\xB6\x02\xB8\x02\xBA" +
		"\x02\xBC\x02\xBE\x02\xC0\x02\xC2\x02\xC4\x02\xC6\x02\xC8\x02\xCA\x02\xCC" +
		"\x02\xCE\x02\xD0\x02\xD2\x02\xD4\x02\xD6\x02\xD8\x02\xDA\x02\xDC\x02\xDE" +
		"\x02\xE0\x02\xE2\x02\xE4\x02\xE6\x02\xE8\x02\xEA\x02\x02\x1E\b\x02\x05" +
		"\x05\x1A\x1A\x1D\x1D((ii\xAE\xAE\x04\x02\x11\x11\x1F\x1F\x05\x02\x05\x05" +
		"((ii\x04\x02++--\x04\x02..44\x05\x02\x10\x10\x9D\x9D\xA3\xA3\x04\x02!" +
		"!\x8E\x8E\x04\x02UUaa\x04\x02HHff\x05\x02\x06\x06\n\n\x0E\x0E\x06\x02" +
		"\x06\x06\t\n\x0E\x0E\x94\x94\x04\x02aa\x8D\x8D\x04\x02\x06\x06\n\n\x04" +
		"\x02ww\xCD\xCD\x04\x02\r\r+,\x04\x02??^^\x04\x02\x86\x86\x90\x90\x04\x02" +
		"EEQQ\x03\x02\x9A\x9B\x05\x02\x13\x13``\xAB\xAB\x05\x02\xC9\xC9\xDB\xDB" +
		"\xE4\xE4\x04\x02\xCE\xCF\xDC\xDC\x04\x02PPcc\x03\x02\xC4\xC5\x04\x02\xCF" +
		"\xCF\xDC\xDC\n\x02&&MMmmoo\x85\x85\x92\x92\xBA\xBA\xBF\xBF\x0E\x02\x04" +
		"%\'LNRTlnnpqstv\x83\x86\x91\x93\xB9\xBB\xBE\xC0\xC1\x06\x02%%??NN\\\\" +
		"\x02\u08EE\x02\xF5\x03\x02\x02\x02\x04\u0108\x03\x02\x02\x02\x06\u011C" +
		"\x03\x02\x02\x02\b\u011E\x03\x02\x02\x02\n\u0202\x03\x02\x02\x02\f\u0204" +
		"\x03\x02\x02\x02\x0E\u020C\x03\x02\x02\x02\x10\u0210\x03\x02\x02\x02\x12" +
		"\u0217\x03\x02\x02\x02\x14\u0219\x03\x02\x02\x02\x16\u021F\x03\x02\x02" +
		"\x02\x18\u02BE\x03\x02\x02\x02\x1A\u02C0\x03\x02\x02\x02\x1C\u02CB\x03" +
		"\x02\x02\x02\x1E\u02DA\x03\x02\x02\x02 \u02E6\x03\x02\x02\x02\"\u02EA" +
		"\x03\x02\x02\x02$\u02F3\x03\x02\x02\x02&\u0300\x03\x02\x02\x02(\u030F" +
		"\x03\x02\x02\x02*\u031C\x03\x02\x02\x02,\u032C\x03\x02\x02\x02.\u0331" +
		"\x03\x02\x02\x020\u0337\x03\x02\x02\x022\u033A\x03\x02\x02\x024\u033D" +
		"\x03\x02\x02\x026\u034F\x03\x02\x02\x028\u0351\x03\x02\x02\x02:\u0364" +
		"\x03\x02\x02\x02<\u0368\x03\x02\x02\x02>\u036C\x03\x02\x02\x02@\u0370" +
		"\x03\x02\x02\x02B\u0379\x03\x02\x02\x02D\u038F\x03\x02\x02\x02F\u03B1" +
		"\x03\x02\x02\x02H\u03B3\x03\x02\x02\x02J\u03B6\x03\x02\x02\x02L\u03BD" +
		"\x03";
	private static readonly _serializedATNSegment1: string =
		"\x02\x02\x02N\u03C0\x03\x02\x02\x02P\u03CC\x03\x02\x02\x02R\u03D4\x03" +
		"\x02\x02\x02T\u03DE\x03\x02\x02\x02V\u0403\x03\x02\x02\x02X\u0412\x03" +
		"\x02\x02\x02Z\u041A\x03\x02\x02\x02\\\u041C\x03\x02\x02\x02^\u042B\x03" +
		"\x02\x02\x02`\u043F\x03\x02\x02\x02b\u0441\x03\x02\x02\x02d\u044A\x03" +
		"\x02\x02\x02f\u0459\x03\x02\x02\x02h\u046B\x03\x02\x02\x02j\u0479\x03" +
		"\x02\x02\x02l\u0487\x03\x02\x02\x02n\u048A\x03\x02\x02\x02p\u04BD\x03" +
		"\x02\x02\x02r\u04C0\x03\x02\x02\x02t\u04C6\x03\x02\x02\x02v\u04CA\x03" +
		"\x02\x02\x02x\u04D0\x03\x02\x02\x02z\u04D7\x03\x02\x02\x02|\u04DA\x03" +
		"\x02\x02\x02~\u04DD\x03\x02\x02\x02\x80\u04E7\x03\x02\x02\x02\x82\u04EA" +
		"\x03\x02\x02\x02\x84\u04EE\x03\x02\x02\x02\x86\u04F2\x03\x02\x02\x02\x88" +
		"\u04F7\x03\x02\x02\x02\x8A\u04FD\x03\x02\x02\x02\x8C\u050C\x03\x02\x02" +
		"\x02\x8E\u054D\x03\x02\x02\x02\x90\u0555\x03\x02\x02\x02\x92\u0560\x03" +
		"\x02\x02\x02\x94\u0562\x03\x02\x02\x02\x96\u0568\x03\x02\x02\x02\x98\u056D" +
		"\x03\x02\x02\x02\x9A\u0575\x03\x02\x02\x02\x9C\u0581\x03\x02\x02\x02\x9E" +
		"\u0586\x03\x02\x02\x02\xA0\u058E\x03\x02\x02\x02\xA2\u0593\x03\x02\x02" +
		"\x02\xA4\u059B\x03\x02\x02\x02\xA6\u059F\x03\x02\x02\x02\xA8\u05A3\x03" +
		"\x02\x02\x02\xAA\u05AC\x03\x02\x02\x02\xAC\u05BA\x03\x02\x02\x02\xAE\u05BC" +
		"\x03\x02\x02\x02\xB0\u05E9\x03\x02\x02\x02\xB2\u060D\x03\x02\x02\x02\xB4" +
		"\u060F\x03\x02\x02\x02\xB6\u061E\x03\x02\x02\x02\xB8\u0621\x03\x02\x02" +
		"\x02\xBA\u0659\x03\x02\x02\x02\xBC\u065B\x03\x02\x02\x02\xBE\u066E\x03" +
		"\x02\x02\x02\xC0\u06F1\x03\x02\x02\x02\xC2\u073D\x03\x02\x02\x02\xC4\u0747" +
		"\x03\x02\x02\x02\xC6\u075C\x03\x02\x02\x02\xC8\u0764\x03\x02\x02\x02\xCA" +
		"\u0768\x03\x02\x02\x02\xCC\u0774\x03\x02\x02\x02\xCE\u0781\x03\x02\x02" +
		"\x02\xD0\u078B\x03\x02\x02\x02\xD2\u078F\x03\x02\x02\x02\xD4\u079A\x03" +
		"\x02\x02\x02\xD6\u079C\x03\x02\x02\x02\xD8\u07A6\x03\x02\x02\x02\xDA\u07A9" +
		"\x03\x02\x02\x02\xDC\u07B6\x03\x02\x02\x02\xDE\u07B8\x03\x02\x02\x02\xE0" +
		"\u07BA\x03\x02\x02\x02\xE2\u07BC\x03\x02\x02\x02\xE4\u07C0\x03\x02\x02" +
		"\x02\xE6\u07C5\x03\x02\x02\x02\xE8\u07C9\x03\x02\x02\x02\xEA\u07CB\x03" +
		"\x02\x02\x02\xEC\xF0\x05\x04\x03\x02\xED\xEF\x07\xE3\x02\x02\xEE\xED\x03" +
		"\x02\x02\x02\xEF\xF2\x03\x02\x02\x02\xF0\xEE\x03\x02\x02\x02\xF0\xF1\x03" +
		"\x02\x02\x02\xF1\xF4\x03\x02\x02\x02\xF2\xF0\x03\x02\x02\x02\xF3\xEC\x03" +
		"\x02\x02\x02\xF4\xF7\x03\x02\x02\x02\xF5\xF3\x03\x02\x02\x02\xF5\xF6\x03" +
		"\x02\x02\x02\xF6\xF8\x03\x02\x02\x02\xF7\xF5\x03\x02\x02\x02\xF8\xF9\x07" +
		"\x02\x02\x03\xF9\x03\x03\x02\x02\x02\xFA\xFE\x05\x06\x04\x02\xFB\xFC\x07" +
		"X\x02\x02\xFC\xFD\x07}\x02\x02\xFD\xFF\x07\xC7\x02\x02\xFE\xFB\x03\x02" +
		"\x02\x02\xFE\xFF\x03\x02\x02\x02\xFF\u0102\x03\x02\x02\x02\u0100\u0101" +
		"\x07C\x02\x02\u0101\u0103\x05\xE8u\x02\u0102\u0100\x03\x02\x02\x02\u0102" +
		"\u0103\x03\x02\x02\x02\u0103\u0105\x03\x02\x02\x02\u0104\u0106\x07\xE3" +
		"\x02\x02\u0105\u0104\x03\x02\x02\x02\u0105\u0106\x03\x02\x02\x02\u0106" +
		"\u0109\x03\x02\x02\x02\u0107\u0109\x05\\/\x02\u0108\xFA\x03\x02\x02\x02" +
		"\u0108\u0107\x03\x02\x02\x02\u0109\x05\x03\x02\x02\x02\u010A\u011D\x05" +
		"\b\x05\x02\u010B\u011D\x05\x14\v\x02\u010C\u011D\x05\x16\f\x02\u010D\u011D" +
		"\x05\x18\r\x02\u010E\u011D\x05T+\x02\u010F\u011D\x05V,\x02\u0110\u011D" +
		"\x05X-\x02\u0111\u011D\x05Z.\x02\u0112\u011D\x05b2\x02\u0113\u011D\x05" +
		"d3\x02\u0114\u011D\x05f4\x02\u0115\u011D\x05j6\x02\u0116\u011D\x05\xAE" +
		"X\x02\u0117\u011D\x05\xB0Y\x02\u0118\u011D\x05\xB2Z\x02\u0119\u011D\x05" +
		"\xB4[\x02\u011A\u011D\x05\xB6\\\x02\u011B\u011D\x05\xB8]\x02\u011C\u010A" +
		"\x03\x02\x02\x02\u011C\u010B\x03\x02\x02\x02\u011C\u010C\x03\x02\x02\x02" +
		"\u011C\u010D\x03\x02\x02\x02\u011C\u010E\x03\x02\x02\x02\u011C\u010F\x03" +
		"\x02\x02\x02\u011C\u0110\x03\x02\x02\x02\u011C\u0111\x03\x02\x02\x02\u011C" +
		"\u0112\x03\x02\x02\x02\u011C\u0113\x03\x02\x02\x02\u011C\u0114\x03\x02" +
		"\x02\x02\u011C\u0115\x03\x02\x02\x02\u011C\u0116\x03\x02\x02\x02\u011C" +
		"\u0117\x03\x02\x02\x02\u011C\u0118\x03\x02\x02\x02\u011C\u0119\x03\x02" +
		"\x02\x02\u011C\u011A\x03\x02\x02\x02\u011C\u011B\x03\x02\x02\x02\u011D" +
		"\x07\x03\x02\x02\x02\u011E\u011F\x07\x07\x02\x02\u011F\u0120\x07\xA0\x02" +
		"\x02\u0120\u0122\x05\xD0i\x02\u0121\u0123\x05.\x18\x02\u0122\u0121\x03" +
		"\x02\x02\x02\u0122\u0123\x03\x02\x02\x02\u0123\u0124\x03\x02\x02\x02\u0124" +
		"\u0129\x05\n\x06\x02\u0125\u0126\x07\xCD\x02\x02\u0126\u0128\x05\n\x06" +
		"\x02\u0127\u0125\x03\x02\x02\x02\u0128\u012B\x03\x02\x02\x02\u0129\u0127" +
		"\x03\x02\x02\x02\u0129\u012A\x03\x02\x02\x02\u012A\t\x03\x02\x02\x02\u012B" +
		"\u0129\x03\x02\x02\x02\u012C\u012D\x07\x03\x02\x02\u012D\u0131\x07\x1C" +
		"\x02\x02\u012E\u012F\x07O\x02\x02\u012F\u0130\x07t\x02\x02\u0130\u0132" +
		"\x079\x02\x02\u0131\u012E\x03\x02\x02\x02\u0131\u0132\x03\x02\x02\x02" +
		"\u0132\u0133\x03\x02\x02\x02\u0133\u0136\x05F$\x02\u0134\u0135\x07\x04" +
		"\x02\x02\u0135\u0137\x05\xCAf\x02\u0136\u0134\x03\x02\x02\x02\u0136\u0137" +
		"\x03\x02\x02\x02\u0137\u0203\x03\x02\x02\x02\u0138\u0139\x07\x03\x02\x02" +
		"\u0139\u013D\x07R\x02\x02\u013A\u013B\x07O\x02\x02\u013B\u013C\x07t\x02" +
		"\x02\u013C\u013E\x079\x02\x02\u013D\u013A\x03\x02\x02\x02\u013D\u013E" +
		"\x03\x02\x02\x02\u013E\u013F\x03\x02\x02\x02\u013F\u0142\x05J&\x02\u0140" +
		"\u0141\x07\x04\x02\x02\u0141\u0143\x05\xCAf\x02\u0142\u0140\x03\x02\x02" +
		"\x02\u0142\u0143\x03\x02\x02\x02\u0143\u0203\x03\x02\x02\x02\u0144\u0145" +
		"\x07\x03\x02\x02\u0145\u0149\x07\x84\x02\x02\u0146\u0147\x07O\x02\x02" +
		"\u0147\u0148\x07t\x02\x02\u0148\u014A\x079\x02\x02\u0149\u0146\x03\x02" +
		"\x02\x02\u0149\u014A\x03\x02\x02\x02\u014A\u014B\x03\x02\x02\x02\u014B" +
		"\u014E\x05L\'\x02\u014C\u014D\x07\x04\x02\x02\u014D\u014F\x05\xCAf\x02" +
		"\u014E\u014C\x03\x02\x02\x02\u014E\u014F\x03\x02\x02\x02\u014F\u0203\x03" +
		"\x02\x02\x02\u0150\u0151\x07\x11\x02\x02\u0151\u0154\x05\x12\n\x02\u0152" +
		"\u0153\x07E\x02\x02\u0153\u0155\x05\xD0i\x02\u0154\u0152\x03\x02\x02\x02" +
		"\u0154\u0155\x03\x02\x02\x02\u0155\u0203\x03\x02\x02\x02\u0156\u0157\x07" +
		"\x18\x02\x02\u0157\u015A\x07\x1C\x02\x02\u0158\u0159\x07O\x02\x02\u0159" +
		"\u015B\x079\x02\x02\u015A\u0158\x03\x02\x02\x02\u015A\u015B\x03\x02\x02" +
		"\x02\u015B\u015C\x03\x02\x02\x02\u015C\u015F\x05\xCAf\x02\u015D\u015E" +
		"\x07Q\x02\x02\u015E\u0160\x05\x12\n\x02\u015F\u015D\x03\x02\x02\x02\u015F" +
		"\u0160\x03\x02\x02\x02\u0160\u0203\x03\x02\x02\x02\u0161\u0162\x07\x18" +
		"\x02\x02\u0162\u0165\x07R\x02\x02\u0163\u0164\x07O\x02\x02\u0164\u0166" +
		"\x079\x02\x02\u0165\u0163\x03\x02\x02\x02\u0165\u0166\x03\x02\x02\x02" +
		"\u0166\u0167\x03\x02\x02\x02\u0167\u016A\x05\xCAf\x02\u0168\u0169\x07" +
		"Q\x02\x02\u0169\u016B\x05\x12\n\x02\u016A\u0168\x03\x02\x02\x02\u016A" +
		"\u016B\x03\x02\x02\x02\u016B\u0203\x03\x02\x02\x02\u016C\u016D\x07\x18" +
		"\x02\x02\u016D\u0170\x07\x84\x02\x02\u016E\u016F\x07O\x02\x02\u016F\u0171" +
		"\x079\x02\x02\u0170\u016E\x03\x02\x02\x02\u0170\u0171\x03\x02\x02\x02" +
		"\u0171\u0172\x03\x02\x02\x02\u0172\u0175\x05\xCAf\x02\u0173\u0174\x07" +
		"Q\x02\x02\u0174\u0176\x05\x12\n\x02\u0175\u0173\x03\x02\x02\x02\u0175" +
		"\u0176\x03\x02\x02\x02\u0176\u0203\x03\x02\x02\x02\u0177\u0178\x07\x1D" +
		"\x02\x02\u0178\u017B\x07\x1C\x02\x02\u0179\u017A\x07O\x02\x02\u017A\u017C" +
		"\x079\x02\x02\u017B\u0179\x03\x02\x02\x02\u017B\u017C\x03\x02\x02\x02" +
		"\u017C\u017D\x03\x02\x02\x02\u017D\u017E\x05\xCAf\x02\u017E\u017F\x07" +
		"\xC7\x02\x02\u017F\u0203\x03\x02\x02\x02\u0180\u0181\x07*\x02\x02\u0181" +
		"\u0182\x07\xBC\x02\x02\u0182\u0203\x05\xC0a\x02\u0183\u0184\x07.\x02\x02" +
		"\u0184\u0203\x05\x12\n\x02\u0185\u0186\x074\x02\x02\u0186\u0189\x07\x1C" +
		"\x02\x02\u0187\u0188\x07O\x02\x02\u0188\u018A\x079\x02\x02\u0189\u0187" +
		"\x03\x02\x02\x02\u0189\u018A\x03\x02\x02\x02\u018A\u018B\x03\x02\x02\x02" +
		"\u018B\u0203\x05\xCAf\x02\u018C\u018D\x074\x02\x02\u018D\u0190\x07R\x02" +
		"\x02\u018E\u018F\x07O\x02\x02\u018F\u0191\x079\x02\x02\u0190\u018E\x03" +
		"\x02\x02\x02\u0190\u0191\x03\x02\x02\x02\u0191\u0192\x03\x02\x02\x02\u0192" +
		"\u0203\x05\xCAf\x02\u0193\u0194\x074\x02\x02\u0194\u0197\x07\x84\x02\x02" +
		"\u0195\u0196\x07O\x02\x02\u0196\u0198\x079\x02\x02\u0197\u0195\x03\x02" +
		"\x02\x02\u0197\u0198\x03\x02\x02\x02\u0198\u0199\x03\x02\x02\x02\u0199" +
		"\u0203\x05\xCAf\x02\u019A\u019B\x074\x02\x02\u019B\u0203\x05\x12\n\x02" +
		"\u019C\u019E\x07D\x02\x02\u019D\u019F\x05\x12\n\x02\u019E\u019D\x03\x02" +
		"\x02\x02\u019E\u019F\x03\x02\x02\x02\u019F\u0203\x03\x02\x02\x02\u01A0" +
		"\u01A1\x07h\x02\x02\u01A1\u01A4\x07R\x02\x02\u01A2\u01A3\x07O\x02\x02" +
		"\u01A3\u01A5\x079\x02\x02\u01A4\u01A2\x03\x02\x02\x02\u01A4\u01A5\x03" +
		"\x02\x02\x02\u01A5\u01A6\x03\x02\x02\x02\u01A6\u01A9\x05\xCAf\x02\u01A7" +
		"\u01A8\x07Q\x02\x02\u01A8\u01AA\x05\x12\n\x02\u01A9\u01A7\x03\x02\x02" +
		"\x02\u01A9\u01AA\x03\x02\x02\x02\u01AA\u0203\x03\x02\x02\x02\u01AB\u01AC" +
		"\x07h\x02\x02\u01AC\u01AF\x07\x84\x02\x02\u01AD\u01AE\x07O\x02\x02\u01AE" +
		"\u01B0\x079\x02\x02\u01AF\u01AD\x03\x02\x02\x02\u01AF\u01B0\x03\x02\x02" +
		"\x02\u01B0\u01B1\x03\x02\x02\x02\u01B1\u01B4\x05\xCAf\x02\u01B2\u01B3" +
		"\x07Q\x02\x02\u01B3\u01B5\x05\x12\n\x02\u01B4\u01B2\x03\x02\x02\x02\u01B4" +
		"\u01B5\x03\x02\x02\x02\u01B5\u0203\x03\x02\x02\x02\u01B6\u01B7\x07n\x02" +
		"\x02\u01B7\u01BA\x07\x1C\x02\x02\u01B8\u01B9\x07O\x02\x02\u01B9\u01BB" +
		"\x079\x02\x02\u01BA\u01B8\x03\x02\x02\x02\u01BA\u01BB\x03\x02\x02\x02" +
		"\u01BB\u01BC\x03\x02\x02\x02\u01BC\u01BD\x05\xCAf\x02\u01BD\u01BE\x05" +
		"N(\x02\u01BE\u0203\x03\x02\x02\x02\u01BF\u01C0\x07n\x02\x02\u01C0\u01C3" +
		"\x07\x1C\x02\x02\u01C1\u01C2\x07O\x02\x02\u01C2\u01C4\x079\x02\x02\u01C3" +
		"\u01C1\x03\x02\x02\x02\u01C3\u01C4\x03\x02\x02\x02\u01C4\u01C5\x03\x02" +
		"\x02\x02\u01C5\u01C6\x05\xCAf\x02\u01C6\u01C7\x07\x1D\x02\x02\u01C7\u01C8" +
		"\x07\xC7\x02\x02\u01C8\u0203\x03\x02\x02\x02\u01C9\u01CA\x07n\x02\x02" +
		"\u01CA\u01CD\x07\x1C\x02\x02\u01CB\u01CC\x07O\x02\x02\u01CC\u01CE\x07" +
		"9\x02\x02\u01CD\u01CB\x03\x02\x02\x02\u01CD\u01CE\x03\x02\x02\x02\u01CE" +
		"\u01CF\x03\x02\x02\x02\u01CF\u01D0\x05\xCAf\x02\u01D0\u01D1\x07\x88\x02" +
		"\x02\u01D1\u01D2\x05\x10\t\x02\u01D2\u0203\x03\x02\x02\x02\u01D3\u01D4" +
		"\x07n\x02\x02\u01D4\u01D7\x07\x1C\x02\x02\u01D5\u01D6\x07O\x02\x02\u01D6" +
		"\u01D8\x079\x02\x02\u01D7\u01D5\x03\x02\x02\x02\u01D7\u01D8\x03\x02\x02" +
		"\x02\u01D8\u01D9\x03\x02\x02\x02\u01D9\u0203\x05F$\x02\u01DA\u01DB\x07" +
		"n\x02\x02\u01DB\u01DC\x07{\x02\x02\u01DC\u01DD\x07\x14\x02\x02\u01DD\u0203" +
		"\x05\xC0a\x02\u01DE\u01DF\x07n\x02\x02\u01DF\u0203\x05@!\x02\u01E0\u01E1" +
		"\x07p\x02\x02\u01E1\u01EB\x05\x12\n\x02\u01E2\u01E3\x07\xA8\x02\x02\u01E3" +
		"\u01E4\x071\x02\x02\u01E4\u01EC\x07\xC7\x02\x02\u01E5\u01E6\x07\xA8\x02" +
		"\x02\u01E6\u01E7\x07\xB8\x02\x02\u01E7\u01EC\x07\xC7\x02\x02\u01E8\u01E9" +
		"\x07\xA8\x02\x02\u01E9\u01EA\x07\xA0\x02\x02\u01EA\u01EC\x05\xD0i\x02" +
		"\u01EB\u01E2\x03\x02\x02\x02\u01EB\u01E5\x03\x02\x02\x02\u01EB\u01E8\x03" +
		"\x02\x02\x02\u01EC\u0203\x03\x02\x02\x02\u01ED\u01EE\x07\x88\x02\x02\u01EE" +
		"\u0203\x07\xAE\x02\x02\u01EF\u01F0\x07\x89\x02\x02\u01F0\u01F3\x07\x1C" +
		"\x02\x02\u01F1\u01F2\x07O\x02\x02\u01F2\u01F4\x079\x02\x02\u01F3\u01F1" +
		"\x03\x02\x02\x02\u01F3\u01F4\x03\x02\x02\x02\u01F4\u01F5\x03\x02\x02\x02" +
		"\u01F5\u01F6\x05\xCAf\x02\u01F6\u01F7\x07\xA8\x02\x02\u01F7\u01F8\x05" +
		"\xCAf\x02\u01F8\u0203\x03\x02\x02\x02\u01F9\u01FA\x07\x8A\x02\x02\u01FA" +
		"\u01FB\x05\x12\n\x02\u01FB\u01FC\x07E\x02\x02\u01FC\u01FD\x05\xD0i\x02" +
		"\u01FD\u0203\x03\x02\x02\x02\u01FE\u01FF\x07\xB2\x02\x02\u01FF\u0200\x05" +
		"\f\x07\x02\u0200\u0201\x05|?\x02\u0201\u0203\x03\x02\x02\x02\u0202\u012C" +
		"\x03\x02\x02\x02\u0202\u0138\x03\x02\x02\x02\u0202\u0144\x03\x02\x02\x02" +
		"\u0202\u0150\x03\x02\x02\x02\u0202\u0156\x03\x02\x02\x02\u0202\u0161\x03" +
		"\x02\x02\x02\u0202\u016C\x03\x02\x02\x02\u0202\u0177\x03\x02\x02\x02\u0202" +
		"\u0180\x03\x02\x02\x02\u0202\u0183\x03\x02\x02\x02\u0202\u0185\x03\x02" +
		"\x02\x02\u0202\u018C\x03\x02\x02\x02\u0202\u0193\x03\x02\x02\x02\u0202" +
		"\u019A\x03\x02\x02\x02\u0202\u019C\x03\x02\x02\x02\u0202\u01A0\x03\x02" +
		"\x02\x02\u0202\u01AB\x03\x02\x02\x02\u0202\u01B6\x03\x02\x02\x02\u0202" +
		"\u01BF\x03\x02\x02\x02\u0202\u01C9\x03\x02\x02\x02\u0202\u01D3\x03\x02" +
		"\x02\x02\u0202\u01DA\x03\x02\x02\x02\u0202\u01DE\x03\x02\x02\x02\u0202" +
		"\u01E0\x03\x02\x02\x02\u0202\u01ED\x03\x02\x02\x02\u0202\u01EF\x03\x02" +
		"\x02\x02\u0202\u01F9\x03\x02\x02\x02\u0202\u01FE\x03\x02\x02\x02\u0203" +
		"\v\x03\x02\x02\x02\u0204\u0209\x05\x0E\b\x02\u0205\u0206\x07\xCD\x02\x02" +
		"\u0206\u0208\x05\x0E\b\x02\u0207\u0205\x03\x02\x02\x02\u0208\u020B\x03" +
		"\x02\x02\x02\u0209\u0207\x03\x02\x02\x02\u0209\u020A\x03\x02\x02\x02\u020A" +
		"\r\x03\x02\x02\x02\u020B\u0209\x03\x02\x02\x02\u020C\u020D\x05\xCAf\x02" +
		"\u020D\u020E\x07\xD2\x02\x02\u020E\u020F\x05\xC0a\x02\u020F\x0F\x03\x02" +
		"\x02\x02\u0210\u0211\t\x02\x02\x02\u0211\x11\x03\x02\x02\x02\u0212\u0213" +
		"\x07\x7F\x02\x02\u0213\u0218\x05\xC0a\x02\u0214\u0215\x07\x7F\x02\x02" +
		"\u0215\u0216\x07N\x02\x02\u0216\u0218\x07\xC7\x02\x02\u0217\u0212\x03" +
		"\x02\x02\x02\u0217\u0214\x03\x02\x02\x02\u0218\x13\x03\x02\x02\x02\u0219" +
		"\u021A\x07\x11\x02\x02\u021A\u021B\x070\x02\x02\u021B\u021D\x05\xD0i\x02" +
		"\u021C\u021E\x05.\x18\x02\u021D\u021C\x03\x02\x02\x02\u021D\u021E\x03" +
		"\x02\x02\x02\u021E\x15\x03\x02\x02\x02\u021F\u0220\x07\x17\x02\x02\u0220" +
		"\u0221\x07\xA0\x02\x02\u0221\u0223\x05\xD0i\x02\u0222\u0224\x05\x12\n" +
		"\x02\u0223\u0222\x03\x02\x02\x02\u0223\u0224\x03\x02\x02\x02\u0224\x17" +
		"\x03\x02\x02\x02\u0225\u0226\t\x03\x02\x02\u0226\u022A\x07#\x02\x02\u0227" +
		"\u0228\x07O\x02\x02\u0228\u0229\x07t\x02\x02\u0229\u022B\x079\x02\x02" +
		"\u022A\u0227\x03\x02\x02\x02\u022A\u022B\x03\x02\x02\x02\u022B\u022C\x03" +
		"\x02\x02\x02\u022C\u022E\x05\xD6l\x02\u022D\u022F\x05.\x18\x02\u022E\u022D" +
		"\x03\x02\x02\x02\u022E\u022F\x03\x02\x02\x02\u022F\u0231\x03\x02\x02\x02" +
		"\u0230\u0232\x05B\"\x02\u0231\u0230\x03\x02\x02\x02\u0231\u0232\x03\x02" +
		"\x02\x02\u0232\u02BF\x03\x02\x02\x02\u0233\u023B\x07\x11\x02\x02\u0234" +
		"\u0237\x07\x1F\x02\x02\u0235\u0236\x07z\x02\x02\u0236\u0238\x07\x8A\x02" +
		"\x02\u0237\u0235\x03\x02\x02\x02\u0237\u0238\x03\x02\x02\x02\u0238\u023B" +
		"\x03\x02\x02\x02\u0239\u023B\x07\x8A\x02\x02\u023A\u0233\x03\x02\x02\x02" +
		"\u023A\u0234\x03\x02\x02\x02\u023A\u0239\x03\x02\x02\x02\u023B\u023C\x03" +
		"\x02\x02\x02\u023C\u0240\x070\x02\x02\u023D\u023E\x07O\x02\x02\u023E\u023F" +
		"\x07t\x02\x02\u023F\u0241\x079\x02\x02\u0240\u023D\x03\x02\x02\x02\u0240" +
		"\u0241\x03\x02\x02\x02\u0241\u0242\x03\x02\x02\x02\u0242\u0244\x05\xD0" +
		"i\x02\u0243\u0245\x050\x19\x02\u0244\u0243\x03\x02\x02\x02\u0244\u0245" +
		"\x03\x02\x02\x02\u0245\u0247\x03\x02\x02\x02\u0246\u0248\x05.\x18\x02" +
		"\u0247\u0246\x03\x02\x02\x02\u0247\u0248\x03\x02\x02\x02\u0248\u0249\x03" +
		"\x02\x02\x02\u0249\u024A\x05\x1A\x0E\x02\u024A\u024B\x05\x1E\x10\x02\u024B" +
		"\u02BF\x03\x02\x02\x02\u024C\u024D\t\x03\x02\x02\u024D\u024E\x07e\x02" +
		"\x02\u024E\u0252\x07\xB7\x02\x02\u024F\u0250\x07O\x02\x02\u0250\u0251" +
		"\x07t\x02\x02\u0251\u0253\x079\x02\x02\u0252\u024F\x03\x02\x02\x02\u0252" +
		"\u0253\x03\x02\x02\x02\u0253\u0254\x03\x02\x02\x02\u0254\u0256\x05\xD0" +
		"i\x02\u0255\u0257\x050\x19\x02\u0256\u0255\x03\x02\x02\x02\u0256\u0257" +
		"\x03\x02\x02\x02\u0257\u0259\x03\x02\x02\x02\u0258\u025A\x05.\x18\x02" +
		"\u0259\u0258\x03\x02\x02\x02\u0259\u025A\x03\x02\x02\x02\u025A\u0260\x03" +
		"\x02\x02\x02\u025B\u025C\x07\xBE\x02\x02\u025C\u025E\x07\xA6\x02\x02\u025D" +
		"\u025F\x07\xC5\x02\x02\u025E\u025D\x03\x02\x02\x02\u025E\u025F\x03\x02" +
		"\x02\x02\u025F\u0261\x03\x02\x02\x02\u0260\u025B\x03\x02\x02\x02\u0260" +
		"\u0261\x03\x02\x02\x02\u0261\u0263\x03\x02\x02\x02\u0262\u0264\x052\x1A" +
		"\x02\u0263\u0262\x03\x02\x02\x02\u0263\u0264\x03\x02\x02\x02\u0264\u0266" +
		"\x03\x02\x02\x02\u0265\u0267\x056\x1C\x02\u0266\u0265\x03\x02\x02\x02" +
		"\u0266\u0267\x03\x02\x02\x02\u0267\u0268\x03\x02\x02\x02\u0268\u0269\x05" +
		"4\x1B\x02\u0269\u02BF\x03\x02\x02\x02\u026A\u026B\t\x03\x02\x02\u026B" +
		"\u026C\x07i\x02\x02\u026C\u0270\x07\xB7\x02\x02\u026D\u026E\x07O\x02\x02" +
		"\u026E\u026F\x07t\x02\x02\u026F\u0271\x079\x02\x02\u0270\u026D\x03\x02" +
		"\x02\x02\u0270\u0271\x03\x02\x02\x02\u0271\u0272\x03\x02\x02\x02\u0272" +
		"\u0274\x05\xD0i\x02\u0273\u0275\x050\x19\x02\u0274\u0273\x03\x02\x02\x02" +
		"\u0274\u0275\x03\x02\x02\x02\u0275\u0277\x03\x02\x02\x02\u0276\u0278\x05" +
		".\x18\x02\u0277\u0276\x03\x02\x02\x02\u0277\u0278\x03\x02\x02\x02\u0278" +
		"\u027A\x03\x02\x02\x02\u0279\u027B\x056\x1C\x02\u027A\u0279\x03\x02\x02" +
		"\x02\u027A\u027B\x03\x02\x02\x02\u027B\u0281\x03\x02\x02\x02\u027C\u0282" +
		"\x052\x1A\x02\u027D\u027F\x058\x1D\x02\u027E\u0280\x07\x80\x02\x02\u027F" +
		"\u027E\x03\x02\x02\x02\u027F\u0280\x03\x02\x02\x02\u0280\u0282\x03\x02" +
		"\x02\x02\u0281\u027C\x03\x02\x02\x02\u0281\u027D\x03\x02\x02\x02\u0282" +
		"\u0283\x03\x02\x02\x02\u0283\u0284\x054\x1B\x02\u0284\u02BF\x03\x02\x02" +
		"\x02\u0285\u028D\x07\x11\x02\x02\u0286\u0289\x07\x1F\x02\x02\u0287\u0288" +
		"\x07z\x02\x02\u0288\u028A\x07\x8A\x02\x02\u0289\u0287\x03\x02\x02\x02" +
		"\u0289\u028A\x03\x02\x02\x02\u028A\u028D\x03\x02\x02\x02\u028B\u028D\x07" +
		"\x8A\x02\x02\u028C\u0285\x03\x02\x02\x02\u028C\u0286\x03\x02\x02\x02\u028C" +
		"\u028B\x03\x02\x02\x02\u028D\u028F\x03\x02\x02\x02\u028E\u0290\x07\xA2" +
		"\x02\x02\u028F\u028E\x03\x02\x02\x02\u028F\u0290\x03\x02\x02\x02\u0290" +
		"\u0291\x03\x02\x02\x02\u0291\u0295\x07\xA0\x02\x02\u0292\u0293\x07O\x02" +
		"\x02\u0293\u0294\x07t\x02\x02\u0294\u0296\x079\x02\x02\u0295\u0292\x03" +
		"\x02\x02\x02\u0295\u0296\x03\x02\x02\x02\u0296\u0297\x03\x02\x02\x02\u0297" +
		"\u0299\x05\xD0i\x02\u0298\u029A\x050\x19\x02\u0299\u0298\x03\x02\x02\x02" +
		"\u0299\u029A\x03\x02\x02\x02\u029A\u029C\x03\x02\x02\x02\u029B\u029D\x05" +
		".\x18\x02\u029C\u029B\x03\x02\x02\x02\u029C\u029D\x03\x02\x02\x02\u029D" +
		"\u029F\x03\x02\x02\x02\u029E\u02A0\x056\x1C\x02\u029F\u029E\x03\x02\x02" +
		"\x02\u029F\u02A0\x03\x02\x02\x02\u02A0\u02A2\x03\x02\x02\x02\u02A1\u02A3" +
		"\x058\x1D\x02\u02A2\u02A1\x03\x02\x02\x02\u02A2\u02A3\x03\x02\x02\x02" +
		"\u02A3\u02A5\x03\x02\x02\x02\u02A4\u02A6\x054\x1B\x02\u02A5\u02A4\x03" +
		"\x02\x02\x02\u02A5\u02A6\x03\x02\x02\x02\u02A6\u02BF\x03\x02\x02\x02\u02A7" +
		"\u02AA\t\x03\x02\x02\u02A8\u02A9\x07z\x02\x02\u02A9\u02AB\x07\x8A\x02" +
		"\x02\u02AA\u02A8\x03\x02\x02\x02\u02AA\u02AB\x03\x02\x02\x02\u02AB\u02AC" +
		"\x03\x02\x02\x02\u02AC\u02B0\x07\xB7\x02\x02\u02AD\u02AE\x07O\x02\x02" +
		"\u02AE\u02AF\x07t\x02\x02\u02AF\u02B1\x079\x02\x02\u02B0\u02AD\x03\x02" +
		"\x02\x02\u02B0\u02B1\x03\x02\x02\x02\u02B1\u02B2\x03\x02\x02\x02\u02B2" +
		"\u02B4\x05\xD0i\x02\u02B3\u02B5\x050\x19\x02\u02B4\u02B3\x03\x02\x02\x02" +
		"\u02B4\u02B5\x03\x02\x02\x02\u02B5\u02B7\x03\x02\x02\x02\u02B6\u02B8\x05" +
		".\x18\x02\u02B7\u02B6\x03\x02\x02\x02\u02B7\u02B8\x03\x02\x02\x02\u02B8" +
		"\u02BA\x03\x02\x02\x02\u02B9\u02BB\x056\x1C\x02\u02BA\u02B9\x03\x02\x02" +
		"\x02\u02BA\u02BB\x03\x02\x02\x02\u02BB\u02BC\x03\x02\x02\x02\u02BC\u02BD" +
		"\x054\x1B\x02\u02BD\u02BF\x03\x02\x02\x02\u02BE\u0225\x03\x02\x02\x02" +
		"\u02BE\u023A\x03\x02\x02\x02\u02BE\u024C\x03\x02\x02\x02\u02BE\u026A\x03" +
		"\x02\x02\x02\u02BE\u028C\x03\x02\x02\x02\u02BE\u02A7\x03\x02\x02\x02\u02BF" +
		"\x19\x03\x02\x02\x02\u02C0\u02C1\x07\xD8\x02\x02\u02C1\u02C6\x05\x1C\x0F" +
		"\x02\u02C2\u02C3\x07\xCD\x02\x02\u02C3\u02C5\x05\x1C\x0F\x02\u02C4\u02C2" +
		"\x03\x02\x02\x02\u02C5\u02C8\x03\x02\x02\x02\u02C6\u02C4\x03\x02\x02\x02" +
		"\u02C6\u02C7\x03\x02\x02\x02\u02C7\u02C9\x03\x02\x02\x02\u02C8\u02C6\x03" +
		"\x02\x02\x02\u02C9\u02CA\x07\xE2\x02\x02\u02CA\x1B\x03\x02\x02\x02\u02CB" +
		"\u02CC\x05\xE6t\x02\u02CC\u02D6\x05\xBA^\x02\u02CD\u02CE\x07(\x02\x02" +
		"\u02CE\u02D5\x05\xDCo\x02\u02CF\u02D0\x07;\x02\x02\u02D0\u02D5\x05\xC0" +
		"a\x02\u02D1\u02D5\x07L\x02\x02\u02D2\u02D5\x07T\x02\x02\u02D3\u02D5\x07" +
		"Z\x02\x02\u02D4\u02CD\x03\x02\x02\x02\u02D4\u02CF\x03\x02\x02\x02\u02D4" +
		"\u02D1\x03\x02\x02\x02\u02D4\u02D2\x03\x02\x02\x02\u02D4\u02D3\x03\x02" +
		"\x02\x02\u02D5\u02D8\x03\x02\x02\x02\u02D6\u02D4\x03\x02\x02\x02\u02D6" +
		"\u02D7\x03\x02\x02\x02\u02D7\x1D\x03\x02\x02\x02\u02D8\u02D6\x03\x02\x02" +
		"\x02\u02D9\u02DB\x05 \x11\x02\u02DA\u02D9\x03\x02\x02\x02\u02DA\u02DB" +
		"\x03\x02\x02\x02\u02DB\u02E3\x03\x02\x02\x02\u02DC\u02E2\x05$\x13\x02" +
		"\u02DD\u02E2\x05&\x14\x02\u02DE\u02E2\x05(\x15\x02\u02DF\u02E2\x05*\x16" +
		"\x02\u02E0\u02E2\x05,\x17\x02\u02E1\u02DC\x03\x02\x02\x02\u02E1\u02DD" +
		"\x03\x02\x02\x02\u02E1\u02DE\x03\x02\x02\x02\u02E1\u02DF\x03\x02\x02\x02" +
		"\u02E1\u02E0\x03\x02\x02\x02\u02E2\u02E5\x03\x02\x02\x02\u02E3\u02E1\x03" +
		"\x02\x02\x02\u02E3\u02E4\x03\x02\x02\x02\u02E4\x1F\x03\x02\x02\x02\u02E5" +
		"\u02E3\x03\x02\x02\x02\u02E6\u02E7\x07\x83\x02\x02\u02E7\u02E8\x07\\\x02" +
		"\x02\u02E8\u02E9\x05\xBC_\x02\u02E9!\x03\x02\x02\x02\u02EA\u02F1\x05\xE6" +
		"t\x02\u02EB\u02EE\x05\xE6t\x02\u02EC\u02ED\x07\xD8\x02\x02\u02ED\u02EF" +
		"\x07\xE2\x02\x02\u02EE\u02EC\x03\x02\x02\x02\u02EE\u02EF\x03\x02\x02\x02" +
		"\u02EF\u02F2\x03\x02\x02\x02\u02F0\u02F2\x05\xDCo\x02\u02F1\u02EB\x03" +
		"\x02\x02\x02\u02F1\u02F0\x03\x02\x02\x02\u02F2#\x03\x02\x02\x02\u02F3" +
		"\u02F4\x07\x99\x02\x02\u02F4\u02F5\x07\xD8\x02\x02\u02F5\u02F6\x05\xE6" +
		"t\x02\u02F6\u02FA\x07\xD8\x02\x02\u02F7\u02F9\x05\"\x12\x02\u02F8\u02F7" +
		"\x03\x02\x02\x02\u02F9\u02FC\x03\x02\x02\x02\u02FA\u02F8\x03\x02\x02\x02" +
		"\u02FA\u02FB\x03\x02\x02\x02\u02FB\u02FD\x03\x02\x02\x02\u02FC\u02FA\x03" +
		"\x02\x02\x02\u02FD\u02FE\x07\xE2\x02\x02\u02FE\u02FF\x07\xE2\x02\x02\u02FF" +
		"%\x03\x02\x02\x02\u0300\u0301\x07b\x02\x02\u0301\u030B\x07\xD8\x02\x02" +
		"\u0302\u030C\x07\xC5\x02\x02\u0303\u0304\x07l\x02\x02\u0304\u0305\x07" +
		"\xC5\x02\x02\u0305\u0306\x07j\x02\x02\u0306\u030C\x07\xC5\x02\x02\u0307" +
		"\u0308\x07j\x02\x02\u0308\u0309\x07\xC5\x02\x02\u0309\u030A\x07l\x02\x02" +
		"\u030A\u030C\x07\xC5\x02\x02\u030B\u0302\x03\x02\x02\x02\u030B\u0303\x03" +
		"\x02\x02\x02\u030B\u0307\x03\x02\x02\x02\u030C\u030D\x03\x02\x02\x02\u030D" +
		"\u030E\x07\xE2\x02\x02\u030E\'\x03\x02\x02\x02\u030F\u0310\x07_\x02\x02" +
		"\u0310\u0311\x07\xD8\x02\x02\u0311\u0312\x05\xE6t\x02\u0312\u0316\x07" +
		"\xD8\x02\x02\u0313\u0315\x05\"\x12\x02\u0314\u0313\x03\x02\x02\x02\u0315" +
		"\u0318\x03\x02\x02\x02\u0316\u0314\x03\x02\x02\x02\u0316\u0317\x03\x02" +
		"\x02\x02\u0317\u0319\x03\x02\x02\x02\u0318\u0316\x03\x02\x02\x02\u0319" +
		"\u031A\x07\xE2\x02\x02\u031A\u031B\x07\xE2\x02\x02\u031B)\x03\x02\x02" +
		"\x02\u031C\u031D\x07\x86\x02\x02\u031D\u0328\x07\xD8\x02\x02\u031E\u031F" +
		"\x07l\x02\x02\u031F\u0320\x05\xE6t\x02\u0320\u0321\x07j\x02\x02\u0321" +
		"\u0322\x05\xE6t\x02\u0322\u0329\x03\x02\x02\x02\u0323\u0324\x07j\x02\x02" +
		"\u0324\u0325\x05\xE6t\x02\u0325\u0326\x07l\x02\x02\u0326\u0327\x05\xE6" +
		"t\x02\u0327\u0329\x03\x02\x02\x02\u0328\u031E\x03\x02\x02\x02\u0328\u0323" +
		"\x03\x02\x02\x02\u0329\u032A\x03\x02\x02\x02\u032A\u032B\x07\xE2\x02\x02" +
		"\u032B+\x03\x02\x02\x02\u032C\u032D\x07\x97\x02\x02\u032D\u032E\x07\xD8" +
		"\x02\x02\u032E\u032F\x05\x9EP\x02\u032F\u0330\x07\xE2\x02\x02\u0330-\x03" +
		"\x02\x02\x02\u0331\u0332\x07x\x02\x02\u0332\u0335\x07\x19\x02\x02\u0333" +
		"\u0336\x05\xE6t\x02\u0334\u0336\x07\xC7\x02\x02\u0335\u0333\x03\x02\x02" +
		"\x02\u0335\u0334\x03\x02\x02\x02\u0336/\x03\x02\x02\x02\u0337\u0338\x07" +
		"\xB5\x02\x02\u0338\u0339\x07\xC7\x02\x02\u03391\x03\x02\x02\x02\u033A" +
		"\u033B\x07\xA8\x02\x02\u033B\u033C\x05\xD0i\x02\u033C3\x03\x02\x02\x02" +
		"\u033D\u033E\x07\f\x02\x02\u033E\u033F\x05j6\x02\u033F5\x03\x02\x02\x02" +
		"\u0340\u0341\x07\xD8\x02\x02\u0341\u0346\x05D#\x02\u0342\u0343\x07\xCD" +
		"\x02\x02\u0343\u0345\x05D#\x02\u0344\u0342\x03\x02\x02\x02\u0345\u0348" +
		"\x03\x02\x02\x02\u0346\u0344\x03\x02\x02\x02\u0346\u0347\x03\x02\x02\x02" +
		"\u0347\u0349\x03\x02\x02\x02\u0348\u0346\x03\x02\x02\x02\u0349\u034A\x07" +
		"\xE2\x02";
	private static readonly _serializedATNSegment2: string =
		"\x02\u034A\u0350\x03\x02\x02\x02\u034B\u034C\x07\f\x02\x02\u034C\u0350" +
		"\x05\xD0i\x02\u034D\u034E\x07\f\x02\x02\u034E\u0350\x05\xCEh\x02\u034F" +
		"\u0340\x03\x02\x02\x02\u034F\u034B\x03\x02\x02\x02\u034F\u034D\x03\x02" +
		"\x02\x02\u03507\x03\x02\x02\x02\u0351\u0353\x05B\"\x02\u0352\u0354\x05" +
		"\x82B\x02\u0353\u0352\x03\x02\x02\x02\u0353\u0354\x03\x02\x02\x02\u0354" +
		"\u0356\x03\x02\x02\x02\u0355\u0357\x05:\x1E\x02\u0356\u0355\x03\x02\x02" +
		"\x02\u0356\u0357\x03\x02\x02\x02\u0357\u0359\x03\x02\x02\x02\u0358\u035A" +
		"\x05<\x1F\x02\u0359\u0358\x03\x02\x02\x02\u0359\u035A\x03\x02\x02\x02" +
		"\u035A\u035C\x03\x02\x02\x02\u035B\u035D\x05> \x02\u035C\u035B\x03\x02" +
		"\x02\x02\u035C\u035D\x03\x02\x02\x02\u035D\u035F\x03\x02\x02\x02\u035E" +
		"\u0360\x05@!\x02\u035F\u035E\x03\x02\x02\x02\u035F\u0360\x03\x02\x02\x02" +
		"\u0360\u0362\x03\x02\x02\x02\u0361\u0363\x05\x8AF\x02\u0362\u0361\x03" +
		"\x02\x02\x02\u0362\u0363\x03\x02\x02\x02\u03639\x03\x02\x02\x02\u0364" +
		"\u0365\x07\x7F\x02\x02\u0365\u0366\x07\x14\x02\x02\u0366\u0367\x05\xC0" +
		"a\x02\u0367;\x03\x02\x02\x02\u0368\u0369\x07\x83\x02\x02\u0369\u036A\x07" +
		"\\\x02\x02\u036A\u036B\x05\xC0a\x02\u036B=\x03\x02\x02\x02\u036C\u036D" +
		"\x07\x91\x02\x02\u036D\u036E\x07\x14\x02\x02\u036E\u036F\x05\xC0a\x02" +
		"\u036F?\x03\x02\x02\x02\u0370\u0371\x07\xAE\x02\x02\u0371\u0376\x05R*" +
		"\x02\u0372\u0373\x07\xCD\x02\x02\u0373\u0375\x05R*\x02\u0374\u0372\x03" +
		"\x02\x02\x02\u0375\u0378\x03\x02\x02\x02\u0376\u0374\x03\x02\x02\x02\u0376" +
		"\u0377\x03\x02\x02\x02\u0377A\x03\x02\x02\x02\u0378\u0376\x03\x02\x02" +
		"\x02\u0379\u037B\x077\x02\x02\u037A\u037C\x07\xD2\x02\x02\u037B\u037A" +
		"\x03\x02\x02\x02\u037B\u037C\x03\x02\x02\x02\u037C\u037D\x03\x02\x02\x02" +
		"\u037D\u0383\x05\xE8u\x02\u037E\u0380\x07\xD8\x02\x02\u037F\u0381\x05" +
		"\xBC_\x02\u0380\u037F\x03\x02\x02\x02\u0380\u0381\x03\x02\x02\x02\u0381" +
		"\u0382\x03\x02\x02\x02\u0382\u0384\x07\xE2\x02\x02\u0383\u037E\x03\x02" +
		"\x02\x02\u0383\u0384\x03\x02\x02\x02\u0384C\x03\x02\x02\x02\u0385\u0390" +
		"\x05F$\x02\u0386\u0387\x07\x1E\x02\x02\u0387\u0388\x05\xE6t\x02\u0388" +
		"\u0389\x07\x17\x02\x02\u0389\u038A\x05\xC0a\x02\u038A\u0390\x03\x02\x02" +
		"\x02\u038B\u038C\x07R\x02\x02\u038C\u0390\x05J&\x02\u038D\u038E\x07\x84" +
		"\x02\x02\u038E\u0390\x05L\'\x02\u038F\u0385\x03\x02\x02\x02\u038F\u0386" +
		"\x03\x02\x02\x02\u038F\u038B\x03\x02\x02\x02\u038F\u038D\x03\x02\x02\x02" +
		"\u0390E\x03\x02\x02\x02\u0391\u0392\x05\xCAf\x02\u0392\u0394\x05\xBA^" +
		"\x02\u0393\u0395\x05H%\x02\u0394\u0393\x03\x02\x02\x02\u0394\u0395\x03" +
		"\x02\x02\x02\u0395\u0398\x03\x02\x02\x02\u0396\u0397\x07\x1D\x02\x02\u0397" +
		"\u0399\x07\xC7\x02\x02\u0398\u0396\x03\x02\x02\x02\u0398\u0399\x03\x02" +
		"\x02\x02\u0399\u039B\x03\x02\x02\x02\u039A\u039C\x05N(\x02\u039B\u039A" +
		"\x03\x02\x02\x02\u039B\u039C\x03\x02\x02\x02\u039C\u039F\x03\x02\x02\x02" +
		"\u039D\u039E\x07\xAE\x02\x02\u039E\u03A0\x05\xC0a\x02\u039F\u039D\x03" +
		"\x02\x02\x02\u039F\u03A0\x03\x02\x02\x02\u03A0\u03B2\x03\x02\x02\x02\u03A1" +
		"\u03A3\x05\xCAf\x02\u03A2\u03A4\x05\xBA^\x02\u03A3\u03A2\x03\x02\x02\x02" +
		"\u03A3\u03A4\x03\x02\x02\x02\u03A4\u03A5\x03\x02\x02\x02\u03A5\u03A8\x05" +
		"H%\x02\u03A6\u03A7\x07\x1D\x02\x02\u03A7\u03A9\x07\xC7\x02\x02\u03A8\u03A6" +
		"\x03\x02\x02\x02\u03A8\u03A9\x03\x02\x02\x02\u03A9\u03AB\x03\x02\x02\x02" +
		"\u03AA\u03AC\x05N(\x02\u03AB\u03AA\x03\x02\x02\x02\u03AB\u03AC\x03\x02" +
		"\x02\x02\u03AC\u03AF\x03\x02\x02\x02\u03AD\u03AE\x07\xAE\x02\x02\u03AE" +
		"\u03B0\x05\xC0a\x02\u03AF\u03AD\x03\x02\x02\x02\u03AF\u03B0\x03\x02\x02" +
		"\x02\u03B0\u03B2\x03\x02\x02\x02\u03B1\u0391\x03\x02\x02\x02\u03B1\u03A1" +
		"\x03\x02\x02\x02\u03B2G\x03\x02\x02\x02\u03B3\u03B4\t\x04\x02\x02\u03B4" +
		"\u03B5\x05\xC0a\x02\u03B5I\x03\x02\x02\x02\u03B6\u03B7\x05\xCAf\x02\u03B7" +
		"\u03B8\x05\xC0a\x02\u03B8\u03B9\x07\xAF\x02\x02\u03B9\u03BA\x05\xBA^\x02" +
		"\u03BA\u03BB\x07I\x02\x02\u03BB\u03BC\x07\xC5\x02\x02\u03BCK\x03\x02\x02" +
		"\x02\u03BD\u03BE\x05\xCAf\x02\u03BE\u03BF\x05h5\x02\u03BFM\x03\x02\x02" +
		"\x02\u03C0\u03C1\x07\x1A\x02\x02\u03C1\u03C2\x07\xD8\x02\x02\u03C2\u03C7" +
		"\x05P)\x02\u03C3\u03C4\x07\xCD\x02\x02\u03C4\u03C6\x05P)\x02\u03C5\u03C3" +
		"\x03\x02\x02\x02\u03C6\u03C9\x03\x02\x02\x02\u03C7\u03C5\x03\x02\x02\x02" +
		"\u03C7\u03C8\x03\x02\x02\x02\u03C8\u03CA\x03\x02\x02\x02\u03C9\u03C7\x03" +
		"\x02\x02\x02\u03CA\u03CB\x07\xE2\x02\x02\u03CBO\x03\x02\x02\x02\u03CC" +
		"\u03D2\x05\xE6t\x02\u03CD\u03CF\x07\xD8\x02\x02\u03CE\u03D0\x05\xBC_\x02" +
		"\u03CF\u03CE\x03\x02\x02\x02\u03CF\u03D0\x03\x02\x02\x02\u03D0\u03D1\x03" +
		"\x02\x02\x02\u03D1\u03D3\x07\xE2\x02\x02\u03D2\u03CD\x03\x02\x02\x02\u03D2" +
		"\u03D3\x03\x02\x02\x02\u03D3Q\x03\x02\x02\x02\u03D4\u03DC\x05\xC0a\x02" +
		"\u03D5\u03DD\x07*\x02\x02\u03D6\u03D7\x07\xA8\x02\x02\u03D7\u03D8\x07" +
		"1\x02\x02\u03D8\u03DD\x07\xC7\x02\x02\u03D9\u03DA\x07\xA8\x02\x02\u03DA" +
		"\u03DB\x07\xB8\x02\x02\u03DB\u03DD\x07\xC7\x02\x02\u03DC\u03D5\x03\x02" +
		"\x02\x02\u03DC\u03D6\x03\x02\x02\x02\u03DC\u03D9\x03\x02\x02\x02\u03DC" +
		"\u03DD\x03\x02\x02\x02\u03DDS\x03\x02\x02\x02\u03DE\u03E0\t\x05\x02\x02" +
		"\u03DF\u03E1\x07\xA0\x02\x02\u03E0\u03DF\x03\x02\x02\x02\u03E0\u03E1\x03" +
		"\x02\x02\x02\u03E1\u03E2\x03\x02\x02\x02\u03E2\u03E3\x05\xCCg\x02\u03E3" +
		"U\x03\x02\x02\x02\u03E4\u03E5\t\x06\x02\x02\u03E5\u03E8\x07#\x02\x02\u03E6" +
		"\u03E7\x07O\x02\x02\u03E7\u03E9\x079\x02\x02\u03E8\u03E6\x03\x02\x02\x02" +
		"\u03E8\u03E9\x03\x02\x02\x02\u03E9\u03EA\x03\x02\x02\x02\u03EA\u03EC\x05" +
		"\xD6l\x02\u03EB\u03ED\x05.\x18\x02\u03EC\u03EB\x03\x02\x02\x02\u03EC\u03ED" +
		"\x03\x02\x02\x02\u03ED\u0404\x03\x02\x02\x02\u03EE\u03F5\t\x06\x02\x02" +
		"\u03EF\u03F6\x070\x02\x02\u03F0\u03F2\x07\xA2\x02\x02\u03F1\u03F0\x03" +
		"\x02\x02\x02\u03F1\u03F2\x03\x02\x02\x02\u03F2\u03F3\x03\x02\x02\x02\u03F3" +
		"\u03F6\x07\xA0\x02\x02\u03F4\u03F6\x07\xB7\x02\x02\u03F5\u03EF\x03\x02" +
		"\x02\x02\u03F5\u03F1\x03\x02\x02\x02\u03F5\u03F4\x03\x02\x02\x02\u03F6" +
		"\u03F9\x03\x02\x02\x02\u03F7\u03F8\x07O\x02\x02\u03F8\u03FA\x079\x02\x02" +
		"\u03F9\u03F7\x03\x02\x02\x02\u03F9\u03FA\x03\x02\x02\x02\u03FA\u03FB\x03" +
		"\x02\x02\x02\u03FB\u03FD\x05\xD0i\x02\u03FC\u03FE\x05.\x18\x02\u03FD\u03FC" +
		"\x03\x02\x02\x02\u03FD\u03FE\x03\x02\x02\x02\u03FE\u0401\x03\x02\x02\x02" +
		"\u03FF\u0400\x07s\x02\x02\u0400\u0402\x07)\x02\x02\u0401\u03FF\x03\x02" +
		"\x02\x02\u0401\u0402\x03\x02\x02\x02\u0402\u0404\x03\x02\x02\x02\u0403" +
		"\u03E4\x03\x02\x02\x02\u0403\u03EE\x03\x02\x02\x02\u0404W\x03\x02\x02" +
		"\x02\u0405\u0406\x079\x02\x02\u0406\u0407\x07#\x02\x02\u0407\u0413\x05" +
		"\xD6l\x02\u0408\u040F\x079\x02\x02\u0409\u0410\x070\x02\x02\u040A\u040C" +
		"\x07\xA2\x02\x02\u040B\u040A\x03\x02\x02\x02\u040B\u040C\x03\x02\x02\x02" +
		"\u040C\u040D\x03\x02\x02\x02\u040D\u0410\x07\xA0\x02\x02\u040E\u0410\x07" +
		"\xB7\x02\x02\u040F\u0409\x03\x02\x02\x02\u040F\u040B\x03\x02\x02\x02\u040F" +
		"\u040E\x03\x02\x02\x02\u040F\u0410\x03\x02\x02\x02\u0410\u0411\x03\x02" +
		"\x02\x02\u0411\u0413\x05\xD0i\x02\u0412\u0405\x03\x02\x02\x02\u0412\u0408" +
		"\x03\x02\x02\x02\u0413Y\x03\x02\x02\x02\u0414\u0415\x07:\x02\x02\u0415" +
		"\u0416\x07\x0F\x02\x02\u0416\u041B\x05\x06\x04\x02\u0417\u0418\x07:\x02" +
		"\x02\u0418\u0419\x07\x9E\x02\x02\u0419\u041B\x05\x06\x04\x02\u041A\u0414" +
		"\x03\x02\x02\x02\u041A\u0417\x03\x02\x02\x02\u041B[\x03\x02\x02\x02\u041C" +
		"\u041D\x07V\x02\x02\u041D\u041F\x07X\x02\x02\u041E\u0420\x07\xA0\x02\x02" +
		"\u041F\u041E\x03\x02\x02\x02\u041F\u0420\x03\x02\x02\x02\u0420\u0424\x03" +
		"\x02\x02\x02\u0421\u0425\x05\xD0i\x02\u0422\u0423\x07G\x02\x02\u0423\u0425" +
		"\x05\xCEh\x02\u0424\u0421\x03\x02\x02\x02\u0424\u0422\x03\x02\x02\x02" +
		"\u0425\u0427\x03\x02\x02\x02\u0426\u0428\x05^0\x02\u0427\u0426\x03\x02" +
		"\x02\x02\u0427\u0428\x03\x02\x02\x02\u0428\u0429\x03\x02\x02\x02\u0429" +
		"\u042A\x05`1\x02\u042A]\x03\x02\x02\x02\u042B\u042C\x07\xD8\x02\x02\u042C" +
		"\u0431\x05\xCAf\x02\u042D\u042E\x07\xCD\x02\x02\u042E\u0430\x05\xCAf\x02" +
		"\u042F\u042D\x03\x02\x02\x02\u0430\u0433\x03\x02\x02\x02\u0431\u042F\x03" +
		"\x02\x02\x02\u0431\u0432\x03\x02\x02\x02\u0432\u0434\x03\x02\x02\x02\u0433" +
		"\u0431\x03\x02\x02\x02\u0434\u0435\x07\xE2\x02\x02\u0435_\x03\x02\x02" +
		"\x02\u0436\u0437\x07C\x02\x02\u0437\u0440\x05\xE6t\x02\u0438\u0440\x07" +
		"\xB6\x02\x02\u0439\u043B\x05j6\x02\u043A\u043C\x07\xE3\x02\x02\u043B\u043A" +
		"\x03\x02\x02\x02\u043B\u043C\x03\x02\x02\x02\u043C\u043D\x03\x02\x02\x02" +
		"\u043D\u043E\x07\x02\x02\x03\u043E\u0440\x03\x02\x02\x02\u043F\u0436\x03" +
		"\x02\x02\x02\u043F\u0438\x03\x02\x02\x02\u043F\u0439\x03\x02\x02\x02\u0440" +
		"a\x03\x02\x02\x02\u0441\u0442\x07]\x02\x02\u0442\u0444\x07q\x02\x02\u0443" +
		"\u0445\x05.\x18\x02\u0444\u0443\x03\x02\x02\x02\u0444\u0445\x03\x02\x02" +
		"\x02\u0445\u0446\x03\x02\x02\x02\u0446\u0448\x05|?\x02\u0447\u0449\t\x07" +
		"\x02\x02\u0448\u0447\x03\x02\x02\x02\u0448\u0449\x03\x02\x02\x02\u0449" +
		"c\x03\x02\x02\x02\u044A\u044B\x07y\x02\x02\u044B\u044C\x07\xA0\x02\x02" +
		"\u044C\u044E\x05\xD0i\x02\u044D\u044F\x05.\x18\x02\u044E\u044D\x03\x02" +
		"\x02\x02\u044E\u044F\x03\x02\x02\x02\u044F\u0451\x03\x02\x02\x02\u0450" +
		"\u0452\x05\x12\n\x02\u0451\u0450\x03\x02\x02\x02\u0451\u0452\x03\x02\x02" +
		"\x02\u0452\u0454\x03\x02\x02\x02\u0453\u0455\x07>\x02\x02\u0454\u0453" +
		"\x03\x02\x02\x02\u0454\u0455\x03\x02\x02\x02\u0455\u0457\x03\x02\x02\x02" +
		"\u0456\u0458\x07\'\x02\x02\u0457\u0456\x03\x02\x02\x02\u0457\u0458\x03" +
		"\x02\x02\x02\u0458e\x03\x02\x02\x02\u0459\u045A\x07\x89\x02\x02\u045A" +
		"\u045B\x07\xA0\x02\x02\u045B\u045C\x05\xD0i\x02\u045C\u045D\x07\xA8\x02" +
		"\x02\u045D\u0465\x05\xD0i\x02\u045E\u045F\x07\xCD\x02\x02\u045F\u0460" +
		"\x05\xD0i\x02\u0460\u0461\x07\xA8\x02\x02\u0461\u0462\x05\xD0i\x02\u0462" +
		"\u0464\x03\x02\x02\x02\u0463\u045E\x03\x02\x02\x02\u0464\u0467\x03\x02" +
		"\x02\x02\u0465\u0463\x03\x02\x02\x02\u0465\u0466\x03\x02\x02\x02\u0466" +
		"\u0469\x03\x02\x02\x02\u0467\u0465\x03\x02\x02\x02\u0468\u046A\x05.\x18" +
		"\x02\u0469\u0468\x03\x02\x02\x02\u0469\u046A\x03\x02\x02\x02\u046Ag\x03" +
		"\x02\x02\x02\u046B\u046D\x07\xD8\x02\x02\u046C\u046E\x05p9\x02\u046D\u046C" +
		"\x03\x02\x02\x02\u046D\u046E\x03\x02\x02\x02\u046E\u046F\x03\x02\x02\x02" +
		"\u046F\u0470\x07\x93\x02\x02\u0470\u0472\x05\xBC_\x02\u0471\u0473\x05" +
		"~@\x02\u0472\u0471\x03\x02\x02\x02\u0472\u0473\x03\x02\x02\x02\u0473\u0475" +
		"\x03\x02\x02\x02\u0474\u0476\x05\x84C\x02\u0475\u0474\x03\x02\x02\x02" +
		"\u0475\u0476\x03\x02\x02\x02\u0476\u0477\x03\x02\x02\x02\u0477\u0478\x07" +
		"\xE2\x02\x02\u0478i\x03\x02\x02\x02\u0479\u047F\x05l7\x02\u047A\u047B" +
		"\x07\xB1\x02\x02\u047B\u047C\x07\x06\x02\x02\u047C\u047E\x05l7\x02\u047D" +
		"\u047A\x03\x02\x02\x02\u047E\u0481\x03\x02\x02\x02\u047F\u047D\x03\x02" +
		"\x02\x02\u047F\u0480\x03\x02\x02\x02\u0480k\x03\x02\x02\x02\u0481\u047F" +
		"\x03\x02\x02\x02\u0482\u0488\x05n8\x02\u0483\u0484\x07\xD8\x02\x02\u0484" +
		"\u0485\x05j6\x02\u0485\u0486\x07\xE2\x02\x02\u0486\u0488\x03\x02\x02\x02" +
		"\u0487\u0482\x03\x02\x02\x02\u0487\u0483\x03\x02\x02\x02\u0488m\x03\x02" +
		"\x02\x02\u0489\u048B\x05p9\x02\u048A\u0489\x03\x02\x02\x02\u048A\u048B" +
		"\x03\x02\x02\x02\u048B\u048C\x03\x02\x02\x02\u048C\u048E\x07\x93\x02\x02" +
		"\u048D\u048F\x072\x02\x02\u048E\u048D\x03\x02\x02\x02\u048E\u048F\x03" +
		"\x02\x02\x02\u048F\u0491\x03\x02\x02\x02\u0490\u0492\x05r:\x02\u0491\u0490" +
		"\x03\x02\x02\x02\u0491\u0492\x03\x02\x02\x02\u0492\u0493\x03\x02\x02\x02" +
		"\u0493\u0495\x05\xBC_\x02\u0494\u0496\x05t;\x02\u0495\u0494\x03\x02\x02" +
		"\x02\u0495\u0496\x03\x02\x02\x02\u0496\u0498\x03\x02\x02\x02\u0497\u0499" +
		"\x05v<\x02\u0498\u0497\x03\x02\x02\x02\u0498\u0499\x03\x02\x02\x02\u0499" +
		"\u049B\x03\x02\x02\x02\u049A\u049C\x05x=\x02\u049B\u049A\x03\x02\x02\x02" +
		"\u049B\u049C\x03\x02\x02\x02\u049C\u049E\x03\x02\x02\x02\u049D\u049F\x05" +
		"z>\x02\u049E\u049D\x03\x02\x02\x02\u049E\u049F\x03\x02\x02\x02\u049F\u04A1" +
		"\x03\x02\x02\x02\u04A0\u04A2\x05|?\x02\u04A1\u04A0\x03\x02\x02\x02\u04A1" +
		"\u04A2\x03\x02\x02\x02\u04A2\u04A4\x03\x02\x02\x02\u04A3\u04A5\x05~@\x02" +
		"\u04A4\u04A3\x03\x02\x02\x02\u04A4\u04A5\x03\x02\x02\x02\u04A5\u04A8\x03" +
		"\x02\x02\x02\u04A6\u04A7\x07\xBE\x02\x02\u04A7\u04A9\t\b\x02\x02\u04A8" +
		"\u04A6\x03\x02\x02\x02\u04A8\u04A9\x03\x02\x02\x02\u04A9\u04AC\x03\x02" +
		"\x02\x02\u04AA\u04AB\x07\xBE\x02\x02\u04AB\u04AD\x07\xAA\x02\x02\u04AC" +
		"\u04AA\x03\x02\x02\x02\u04AC\u04AD\x03\x02\x02\x02\u04AD\u04AF\x03\x02" +
		"\x02\x02\u04AE\u04B0\x05\x80A\x02\u04AF\u04AE\x03\x02\x02\x02\u04AF\u04B0" +
		"\x03\x02\x02\x02\u04B0\u04B2\x03\x02\x02\x02\u04B1\u04B3\x05\x82B\x02" +
		"\u04B2\u04B1\x03\x02\x02\x02\u04B2\u04B3\x03\x02\x02\x02\u04B3\u04B5\x03" +
		"\x02\x02\x02\u04B4\u04B6\x05\x86D\x02\u04B5\u04B4\x03\x02\x02\x02\u04B5" +
		"\u04B6\x03\x02\x02\x02\u04B6\u04B8\x03\x02\x02\x02\u04B7\u04B9\x05\x88" +
		"E\x02\u04B8\u04B7\x03\x02\x02\x02\u04B8\u04B9\x03\x02\x02\x02\u04B9\u04BB" +
		"\x03\x02\x02\x02\u04BA\u04BC\x05\x8AF\x02\u04BB\u04BA\x03\x02\x02\x02" +
		"\u04BB\u04BC\x03\x02\x02\x02\u04BCo\x03\x02\x02\x02\u04BD\u04BE\x07\xBE" +
		"\x02\x02\u04BE\u04BF\x05\xBC_\x02\u04BFq\x03\x02\x02\x02\u04C0\u04C1\x07" +
		"\xA9\x02\x02\u04C1\u04C4\x07\xC5\x02\x02\u04C2\u04C3\x07\xBE\x02\x02\u04C3" +
		"\u04C5\x07\xA5\x02\x02\u04C4\u04C2\x03\x02\x02\x02\u04C4\u04C5\x03\x02" +
		"\x02\x02\u04C5s\x03\x02\x02\x02\u04C6\u04C7\x07E\x02\x02\u04C7\u04C8\x05" +
		"\x8CG\x02\u04C8u\x03\x02\x02\x02\u04C9\u04CB\t\t\x02\x02\u04CA\u04C9\x03" +
		"\x02\x02\x02\u04CA\u04CB\x03\x02\x02\x02\u04CB\u04CC\x03\x02\x02\x02\u04CC" +
		"\u04CD\x07\v\x02\x02\u04CD\u04CE\x07[\x02\x02\u04CE\u04CF\x05\xBC_\x02" +
		"\u04CFw\x03\x02\x02\x02\u04D0\u04D1\x07\xBD\x02\x02\u04D1\u04D2\x05\xE6" +
		"t\x02\u04D2\u04D3\x07\f\x02\x02\u04D3\u04D4\x07\xD8\x02\x02\u04D4\u04D5" +
		"\x05\xA2R\x02\u04D5\u04D6\x07\xE2\x02\x02\u04D6y\x03\x02\x02\x02\u04D7" +
		"\u04D8\x07\x82\x02\x02\u04D8\u04D9\x05\xC0a\x02\u04D9{\x03\x02\x02\x02" +
		"\u04DA\u04DB\x07\xBC\x02\x02\u04DB\u04DC\x05\xC0a\x02\u04DC}\x03\x02\x02" +
		"\x02\u04DD\u04DE\x07J\x02\x02\u04DE\u04E5\x07\x14\x02\x02\u04DF\u04E0" +
		"\t\b\x02\x02\u04E0\u04E1\x07\xD8\x02\x02\u04E1\u04E2\x05\xBC_\x02\u04E2" +
		"\u04E3\x07\xE2\x02\x02\u04E3\u04E6\x03\x02\x02\x02\u04E4\u04E6\x05\xBC" +
		"_\x02\u04E5\u04DF\x03\x02\x02\x02\u04E5\u04E4\x03\x02\x02\x02\u04E6\x7F" +
		"\x03\x02\x02\x02\u04E7\u04E8\x07K\x02\x02\u04E8\u04E9\x05\xC0a\x02\u04E9" +
		"\x81\x03\x02\x02\x02\u04EA\u04EB\x07{\x02\x02\u04EB\u04EC\x07\x14\x02" +
		"\x02\u04EC\u04ED\x05\x98M\x02\u04ED\x83\x03\x02\x02\x02\u04EE\u04EF\x07" +
		"{\x02\x02\u04EF\u04F0\x07\x14\x02\x02\u04F0\u04F1\x05\xBC_\x02\u04F1\x85" +
		"\x03\x02\x02\x02\u04F2\u04F3\x07d\x02\x02\u04F3\u04F4\x05\x96L\x02\u04F4" +
		"\u04F5\x07\x14\x02\x02\u04F5\u04F6\x05\xBC_\x02\u04F6\x87\x03\x02\x02" +
		"\x02\u04F7\u04F8\x07d\x02\x02\u04F8\u04FB\x05\x96L\x02\u04F9\u04FA\x07" +
		"\xBE\x02\x02\u04FA\u04FC\x07\xA5\x02\x02\u04FB\u04F9\x03\x02\x02\x02\u04FB" +
		"\u04FC\x03\x02\x02\x02\u04FC\x89\x03\x02\x02\x02\u04FD\u04FE\x07\x97\x02" +
		"\x02\u04FE\u04FF\x05\x9EP\x02\u04FF\x8B\x03\x02\x02\x02\u0500\u0501\b" +
		"G\x01\x02\u0501\u0503\x05\xCCg\x02\u0502\u0504\x07>\x02\x02\u0503\u0502" +
		"\x03\x02\x02\x02\u0503\u0504\x03\x02\x02\x02\u0504\u0506\x03\x02\x02\x02" +
		"\u0505\u0507\x05\x94K\x02\u0506\u0505\x03\x02\x02\x02\u0506\u0507\x03" +
		"\x02\x02\x02\u0507\u050D\x03\x02\x02\x02\u0508\u0509\x07\xD8\x02\x02\u0509" +
		"\u050A\x05\x8CG\x02\u050A\u050B\x07\xE2\x02\x02\u050B\u050D\x03\x02\x02" +
		"\x02\u050C\u0500\x03\x02\x02\x02\u050C\u0508\x03\x02\x02\x02\u050D\u051F" +
		"\x03\x02\x02\x02\u050E\u050F\f\x05\x02\x02\u050F\u0510\x05\x90I\x02\u0510" +
		"\u0511\x05\x8CG\x06\u0511\u051E\x03\x02\x02\x02\u0512\u0514\f\x06\x02" +
		"\x02\u0513\u0515\t\n\x02\x02\u0514\u0513\x03\x02\x02\x02\u0514\u0515\x03" +
		"\x02\x02\x02\u0515\u0517\x03\x02\x02\x02\u0516\u0518\x05\x8EH\x02\u0517" +
		"\u0516\x03\x02\x02\x02\u0517\u0518\x03\x02\x02\x02\u0518\u0519\x03\x02" +
		"\x02\x02\u0519\u051A\x07[\x02\x02\u051A\u051B\x05\x8CG\x02\u051B\u051C" +
		"\x05\x92J\x02\u051C\u051E\x03\x02\x02\x02\u051D\u050E\x03\x02\x02\x02" +
		"\u051D\u0512\x03\x02\x02\x02\u051E\u0521\x03\x02\x02\x02\u051F\u051D\x03" +
		"\x02\x02\x02\u051F\u0520\x03\x02\x02\x02\u0520\x8D\x03\x02\x02\x02\u0521" +
		"\u051F\x03\x02\x02\x02\u0522\u0524\t\v\x02\x02\u0523\u0522\x03\x02\x02" +
		"\x02\u0523\u0524\x03\x02\x02\x02\u0524\u0525\x03\x02\x02\x02\u0525\u052C" +
		"\x07U\x02\x02\u0526\u0528\x07U\x02\x02\u0527\u0529\t\v\x02\x02\u0528\u0527" +
		"\x03\x02\x02\x02\u0528\u0529\x03\x02\x02\x02\u0529\u052C\x03\x02\x02\x02" +
		"\u052A\u052C\t\v\x02\x02\u052B\u0523\x03\x02\x02\x02\u052B\u0526\x03\x02" +
		"\x02\x02\u052B\u052A\x03\x02\x02\x02\u052C\u054E\x03\x02\x02\x02\u052D" +
		"\u052F\t\f\x02\x02\u052E\u052D\x03\x02\x02\x02\u052E\u052F\x03\x02\x02" +
		"\x02\u052F\u0530\x03\x02\x02\x02\u0530\u0532\t\r\x02\x02\u0531\u0533\x07" +
		"|\x02\x02\u0532\u0531\x03\x02\x02\x02\u0532\u0533\x03\x02\x02\x02\u0533" +
		"\u053C\x03\x02\x02\x02\u0534\u0536\t\r\x02\x02\u0535\u0537\x07|\x02\x02" +
		"\u0536\u0535\x03\x02\x02\x02\u0536\u0537\x03\x02\x02\x02\u0537\u0539\x03" +
		"\x02\x02\x02\u0538\u053A\t\f\x02\x02\u0539\u0538\x03\x02\x02\x02\u0539" +
		"\u053A\x03\x02\x02\x02\u053A\u053C\x03\x02\x02\x02\u053B\u052E\x03\x02" +
		"\x02\x02\u053B\u0534\x03\x02\x02\x02\u053C\u054E\x03\x02\x02\x02\u053D" +
		"\u053F\t\x0E\x02\x02\u053E\u053D\x03\x02\x02\x02\u053E\u053F\x03\x02\x02" +
		"\x02\u053F\u0540\x03\x02\x02\x02\u0540\u0542\x07F\x02\x02\u0541\u0543" +
		"\x07|\x02\x02\u0542\u0541\x03\x02\x02\x02\u0542\u0543\x03\x02\x02\x02" +
		"\u0543\u054C\x03\x02\x02\x02\u0544\u0546\x07F\x02\x02\u0545\u0547\x07" +
		"|\x02\x02\u0546\u0545\x03\x02\x02\x02\u0546\u0547\x03\x02\x02\x02\u0547" +
		"\u0549\x03\x02\x02\x02\u0548\u054A\t\x0E\x02\x02\u0549\u0548\x03\x02\x02" +
		"\x02\u0549\u054A\x03\x02\x02\x02\u054A\u054C\x03\x02\x02\x02\u054B\u053E" +
		"\x03\x02\x02\x02\u054B\u0544\x03\x02\x02\x02\u054C\u054E\x03\x02\x02\x02" +
		"\u054D\u052B\x03\x02\x02\x02\u054D\u053B\x03\x02\x02\x02\u054D\u054B\x03" +
		"\x02\x02\x02\u054E\x8F\x03\x02\x02\x02\u054F\u0551\t\n\x02\x02\u0550\u054F" +
		"\x03\x02\x02\x02\u0550\u0551\x03\x02\x02\x02\u0551\u0552\x03\x02\x02\x02" +
		"\u0552\u0553\x07 \x02\x02\u0553\u0556\x07[\x02\x02\u0554\u0556\x07\xCD" +
		"\x02\x02\u0555\u0550\x03\x02\x02\x02\u0555\u0554\x03\x02\x02\x02\u0556" +
		"\x91\x03\x02\x02\x02\u0557\u0558\x07x\x02\x02\u0558\u0561\x05\xBC_\x02" +
		"\u0559\u055A\x07\xB4\x02\x02\u055A\u055B\x07\xD8\x02\x02\u055B\u055C\x05" +
		"\xBC_\x02\u055C\u055D\x07\xE2\x02\x02\u055D\u0561\x03\x02\x02\x02\u055E" +
		"\u055F\x07\xB4\x02\x02\u055F\u0561\x05\xBC_\x02\u0560\u0557\x03\x02\x02" +
		"\x02\u0560\u0559\x03\x02\x02\x02\u0560\u055E\x03\x02\x02\x02\u0561\x93" +
		"\x03\x02\x02\x02\u0562\u0563\x07\x91\x02\x02\u0563\u0566\x05\x9CO\x02" +
		"\u0564\u0565\x07w\x02\x02\u0565\u0567\x05\x9CO\x02\u0566\u0564\x03\x02" +
		"\x02\x02\u0566\u0567\x03\x02\x02\x02\u0567\x95\x03\x02\x02\x02\u0568\u056B" +
		"\x05\xC0a\x02\u0569\u056A\t\x0F\x02\x02\u056A\u056C\x05\xC0a\x02\u056B" +
		"\u0569\x03\x02\x02\x02\u056B\u056C\x03\x02\x02\x02\u056C\x97\x03\x02\x02" +
		"\x02\u056D\u0572\x05\x9AN\x02\u056E\u056F\x07\xCD\x02\x02\u056F\u0571" +
		"\x05\x9AN\x02\u0570\u056E\x03\x02\x02\x02\u0571\u0574\x03\x02\x02\x02" +
		"\u0572\u0570\x03\x02\x02\x02\u0572\u0573\x03\x02\x02\x02\u0573\x99\x03" +
		"\x02\x02\x02\u0574\u0572\x03\x02\x02\x02\u0575\u0577\x05\xC0a\x02\u0576" +
		"\u0578\t\x10\x02\x02\u0577\u0576\x03\x02\x02\x02\u0577\u0578\x03\x02\x02" +
		"\x02\u0578\u057B\x03\x02\x02\x02\u0579\u057A\x07v\x02\x02\u057A\u057C" +
		"\t\x11\x02\x02\u057B\u0579\x03\x02\x02\x02\u057B\u057C\x03\x02\x02\x02" +
		"\u057C\u057F\x03\x02\x02\x02\u057D\u057E\x07\x1B\x02\x02\u057E\u0580\x07" +
		"\xC7\x02\x02\u057F\u057D\x03\x02\x02\x02\u057F\u0580\x03\x02\x02\x02\u0580" +
		"\x9B\x03\x02\x02\x02\u0581\u0584\x05\xDAn\x02\u0582\u0583\x07\xE4\x02" +
		"\x02\u0583\u0585\x05\xDAn\x02\u0584\u0582\x03\x02\x02\x02\u0584\u0585" +
		"\x03\x02\x02\x02\u0585\x9D\x03\x02\x02\x02\u0586\u058B\x05\xA0Q\x02\u0587" +
		"\u0588\x07\xCD\x02\x02\u0588\u058A\x05\xA0Q\x02\u0589\u0587\x03\x02\x02" +
		"\x02\u058A\u058D\x03\x02\x02\x02\u058B\u0589\x03\x02\x02\x02\u058B\u058C" +
		"\x03\x02\x02\x02\u058C\x9F\x03\x02\x02\x02\u058D\u058B\x03\x02\x02\x02" +
		"\u058E\u058F\x05\xE6t\x02\u058F\u0590\x07\xD2\x02\x02\u0590\u0591\x05" +
		"\xDCo\x02\u0591\xA1\x03\x02\x02\x02\u0592\u0594\x05\xA4S\x02\u0593\u0592" +
		"\x03\x02\x02\x02\u0593\u0594\x03\x02\x02\x02\u0594\u0596\x03\x02\x02\x02" +
		"\u0595\u0597\x05\xA6T\x02\u0596\u0595\x03\x02\x02\x02\u0596\u0597\x03" +
		"\x02\x02\x02\u0597\u0599\x03\x02\x02\x02\u0598\u059A\x05\xA8U\x02\u0599" +
		"\u0598\x03\x02\x02\x02\u0599\u059A\x03\x02\x02\x02\u059A\xA3\x03\x02\x02" +
		"\x02\u059B\u059C\x07\x7F\x02\x02\u059C\u059D\x07\x14\x02\x02\u059D\u059E" +
		"\x05\xBC_\x02\u059E\xA5\x03\x02\x02\x02\u059F\u05A0\x07{\x02\x02\u05A0" +
		"\u05A1\x07\x14\x02\x02\u05A1\u05A2\x05\x98M\x02\u05A2\xA7\x03\x02\x02" +
		"\x02\u05A3\u05A4\t\x12\x02\x02\u05A4\u05A5\x05\xAAV\x02\u05A5\xA9\x03" +
		"\x02\x02\x02\u05A6\u05AD\x05\xACW\x02\u05A7\u05A8\x07\x12\x02\x02\u05A8" +
		"\u05A9\x05\xACW\x02\u05A9\u05AA\x07\b\x02\x02\u05AA\u05AB\x05\xACW\x02" +
		"\u05AB\u05AD\x03\x02\x02\x02\u05AC\u05A6\x03\x02\x02\x02\u05AC\u05A7\x03" +
		"\x02\x02\x02\u05AD\xAB\x03\x02\x02\x02\u05AE\u05AF\x07\"\x02\x02\u05AF" +
		"\u05BB\x07\x8F\x02\x02\u05B0\u05B1\x07\xB0\x02\x02\u05B1\u05BB\x07\x81" +
		"\x02\x02\u05B2\u05B3\x07\xB0\x02\x02\u05B3\u05BB\x07A\x02\x02\u05B4\u05B5" +
		"\x05\xDAn\x02\u05B5\u05B6\x07\x81\x02\x02\u05B6\u05BB\x03\x02\x02\x02" +
		"\u05B7\u05B8\x05\xDAn\x02\u05B8\u05B9\x07A\x02\x02\u05B9\u05BB\x03\x02" +
		"\x02\x02\u05BA\u05AE\x03\x02\x02\x02\u05BA\u05B0\x03\x02\x02\x02\u05BA" +
		"\u05B2\x03\x02\x02\x02\u05BA\u05B4\x03\x02\x02\x02\u05BA\u05B7\x03\x02" +
		"\x02\x02\u05BB\xAD\x03\x02\x02\x02\u05BC\u05BD\x07\x96\x02\x02\u05BD\u05BE" +
		"\x05\x9EP\x02\u05BE\xAF\x03\x02\x02\x02\u05BF\u05C0\x07\x98\x02\x02\u05C0" +
		"\u05C1\x07\x1F\x02\x02\u05C1\u05C2\x07#\x02\x02\u05C2\u05EA\x05\xD6l\x02" +
		"\u05C3\u05C4\x07\x98\x02\x02\u05C4\u05C5\x07\x1F\x02\x02\u05C5\u05C6\x07" +
		"0\x02\x02\u05C6\u05EA\x05\xD0i\x02\u05C7\u05C8\x07\x98\x02\x02\u05C8\u05CA" +
		"\x07\x1F\x02\x02\u05C9\u05CB\x07\xA2\x02\x02\u05CA\u05C9\x03\x02\x02\x02" +
		"\u05CA\u05CB\x03\x02\x02\x02\u05CB\u05CD\x03\x02\x02\x02\u05CC\u05CE\x07" +
		"\xA0\x02\x02\u05CD\u05CC\x03\x02\x02\x02\u05CD\u05CE\x03\x02\x02\x02\u05CE" +
		"\u05CF\x03\x02\x02\x02\u05CF\u05EA\x05\xD0i\x02\u05D0\u05D1\x07\x98\x02" +
		"\x02\u05D1\u05EA\x07$\x02\x02\u05D2\u05D3\x07\x98\x02\x02\u05D3\u05D6" +
		"\x07/\x02\x02\u05D4\u05D5\x07E\x02\x02\u05D5\u05D7\x05\xD6l\x02\u05D6" +
		"\u05D4\x03\x02\x02\x02\u05D6\u05D7\x03\x02\x02\x02\u05D7\u05EA\x03\x02" +
		"\x02\x02\u05D8\u05DA\x07\x98\x02\x02\u05D9\u05DB\x07\xA2\x02\x02\u05DA" +
		"\u05D9\x03\x02\x02\x02\u05DA\u05DB\x03\x02\x02\x02\u05DB\u05DC\x03\x02" +
		"\x02\x02\u05DC\u05DF\x07\xA1\x02\x02\u05DD\u05DE\t\x13\x02\x02\u05DE\u05E0" +
		"\x05\xD6l\x02\u05DF\u05DD\x03\x02\x02\x02\u05DF\u05E0\x03\x02\x02\x02" +
		"\u05E0\u05E4\x03\x02\x02\x02\u05E1\u05E2\x07c\x02\x02\u05E2\u05E5\x07" +
		"\xC7\x02\x02\u05E3\u05E5\x05|?\x02\u05E4\u05E1\x03\x02\x02\x02\u05E4\u05E3" +
		"\x03\x02\x02\x02\u05E4\u05E5\x03\x02\x02\x02\u05E5\u05E7\x03\x02\x02\x02" +
		"\u05E6\u05E8\x05\x88E\x02\u05E7\u05E6\x03\x02\x02\x02\u05E7\u05E8\x03" +
		"\x02\x02\x02\u05E8\u05EA\x03\x02\x02\x02\u05E9\u05BF\x03\x02\x02\x02\u05E9" +
		"\u05C3\x03\x02\x02\x02\u05E9\u05C7\x03\x02\x02\x02\u05E9\u05D0\x03\x02" +
		"\x02\x02\u05E9\u05D2\x03\x02\x02\x02\u05E9\u05D8\x03\x02\x02\x02\u05EA" +
		"\xB1\x03\x02\x02\x02\u05EB\u05EC\x07\x9F\x02\x02\u05EC\u05ED\x07@\x02" +
		"\x02\u05ED\u05EE\x073\x02\x02\u05EE\u060E\x05\xD0i\x02\u05EF\u05F0\x07" +
		"\x9F\x02\x02\u05F0\u05F1\x07@\x02\x02\u05F1\u060E\x07g\x02\x02\u05F2\u05F3" +
		"\x07\x9F\x02\x02\u05F3\u05F4\x07\x87\x02\x02\u05F4\u060E\x07/\x02\x02" +
		"\u05F5\u05F6\x07\x9F\x02\x02\u05F6\u05F7\x07\x87\x02\x02\u05F7\u05F8\x07" +
		"0\x02\x02\u05F8\u060E\x05\xD0i\x02\u05F9\u05FA\x07\x9F\x02\x02\u05FA\u0602" +
		"\t\x14\x02\x02\u05FB\u05FC\x073\x02\x02\u05FC\u0603\x07\x95\x02\x02\u05FD";
	private static readonly _serializedATNSegment3: string =
		"\u0603\x07=\x02\x02\u05FE\u0600\x07\xAE\x02\x02\u05FF\u05FE\x03\x02\x02" +
		"\x02\u05FF\u0600\x03\x02\x02\x02\u0600\u0601\x03\x02\x02\x02\u0601\u0603" +
		"\x07k\x02\x02\u0602\u05FB\x03\x02\x02\x02\u0602\u05FD\x03\x02\x02\x02" +
		"\u0602\u05FF\x03\x02\x02\x02\u0603\u0604\x03\x02\x02\x02\u0604\u060E\x05" +
		"\xD0i\x02\u0605\u0606\x07\x9F\x02\x02\u0606\u0607\t\x14\x02\x02\u0607" +
		"\u0608\x07\x8C\x02\x02\u0608\u060E\x07\x95\x02\x02\u0609\u060A\x07\x9F" +
		"\x02\x02\u060A\u060B\x07\x9D\x02\x02\u060B\u060C\x07\x8B\x02\x02\u060C" +
		"\u060E\x05\xD0i\x02\u060D\u05EB\x03\x02\x02\x02\u060D\u05EF\x03\x02\x02" +
		"\x02\u060D\u05F2\x03\x02\x02\x02\u060D\u05F5\x03\x02\x02\x02\u060D\u05F9" +
		"\x03\x02\x02\x02\u060D\u0605\x03\x02\x02\x02\u060D\u0609\x03\x02\x02\x02" +
		"\u060E\xB3\x03\x02\x02\x02\u060F\u0611\x07\xAD\x02\x02\u0610\u0612\x07" +
		"\xA2\x02\x02\u0611\u0610\x03\x02\x02\x02\u0611\u0612\x03\x02\x02\x02\u0612" +
		"\u0614\x03\x02\x02\x02\u0613\u0615\x07\xA0\x02\x02\u0614\u0613\x03\x02" +
		"\x02\x02\u0614\u0615\x03\x02\x02\x02\u0615\u0618\x03\x02\x02\x02\u0616" +
		"\u0617\x07O\x02\x02\u0617\u0619\x079\x02\x02\u0618\u0616\x03\x02\x02\x02" +
		"\u0618\u0619\x03\x02\x02\x02\u0619\u061A\x03\x02\x02\x02\u061A\u061C\x05" +
		"\xD0i\x02\u061B\u061D\x05.\x18\x02\u061C\u061B\x03\x02\x02\x02\u061C\u061D" +
		"\x03\x02\x02\x02\u061D\xB5\x03\x02\x02\x02\u061E\u061F\x07\xB3\x02\x02" +
		"\u061F\u0620\x05\xD6l\x02\u0620\xB7\x03\x02\x02\x02\u0621\u0622\x07\xB9" +
		"\x02\x02\u0622\u0624\x05\xD0i\x02\u0623\u0625\x078\x02\x02\u0624\u0623" +
		"\x03\x02\x02\x02\u0624\u0625\x03\x02\x02\x02\u0625\u0628\x03\x02\x02\x02" +
		"\u0626\u0627\x07d\x02\x02\u0627\u0629\x07\xC5\x02\x02\u0628\u0626\x03" +
		"\x02\x02\x02\u0628\u0629\x03\x02\x02\x02\u0629\xB9\x03\x02\x02\x02\u062A" +
		"\u065A\x05\xE6t\x02\u062B\u062C\x05\xE6t\x02\u062C\u062D\x07\xD8\x02\x02" +
		"\u062D\u062E\x05\xE6t\x02\u062E\u0635\x05\xBA^\x02\u062F\u0630\x07\xCD" +
		"\x02\x02\u0630\u0631\x05\xE6t\x02\u0631\u0632\x05\xBA^\x02\u0632\u0634" +
		"\x03\x02\x02\x02\u0633\u062F\x03\x02\x02\x02\u0634\u0637\x03\x02\x02\x02" +
		"\u0635\u0633\x03\x02\x02\x02\u0635\u0636\x03\x02\x02\x02\u0636\u0638\x03" +
		"\x02\x02\x02\u0637\u0635\x03\x02\x02\x02\u0638\u0639\x07\xE2\x02\x02\u0639" +
		"\u065A\x03\x02\x02\x02\u063A\u063B\x05\xE6t\x02\u063B\u063C\x07\xD8\x02" +
		"\x02\u063C\u0641\x05\xEAv\x02\u063D\u063E\x07\xCD\x02\x02\u063E\u0640" +
		"\x05\xEAv\x02\u063F\u063D\x03\x02\x02\x02\u0640\u0643\x03\x02\x02\x02" +
		"\u0641\u063F\x03\x02\x02\x02\u0641\u0642\x03\x02\x02\x02\u0642\u0644\x03" +
		"\x02\x02\x02\u0643\u0641\x03\x02\x02\x02\u0644\u0645\x07\xE2\x02\x02\u0645" +
		"\u065A\x03\x02\x02\x02\u0646\u0647\x05\xE6t\x02\u0647\u0648\x07\xD8\x02" +
		"\x02\u0648\u064D\x05\xBA^\x02\u0649\u064A\x07\xCD\x02\x02\u064A\u064C" +
		"\x05\xBA^\x02\u064B\u0649\x03\x02\x02\x02\u064C\u064F\x03\x02\x02\x02" +
		"\u064D\u064B\x03\x02\x02\x02\u064D\u064E\x03\x02\x02\x02\u064E\u0650\x03" +
		"\x02\x02\x02\u064F\u064D\x03\x02\x02\x02\u0650\u0651\x07\xE2\x02\x02\u0651" +
		"\u065A\x03\x02\x02\x02\u0652\u0653\x05\xE6t\x02\u0653\u0655\x07\xD8\x02" +
		"\x02\u0654\u0656\x05\xBC_\x02\u0655\u0654\x03\x02\x02\x02\u0655\u0656" +
		"\x03\x02\x02\x02\u0656\u0657\x03\x02\x02\x02\u0657\u0658\x07\xE2\x02\x02" +
		"\u0658\u065A\x03\x02\x02\x02\u0659\u062A\x03\x02\x02\x02\u0659\u062B\x03" +
		"\x02\x02\x02\u0659\u063A\x03\x02\x02\x02\u0659\u0646\x03\x02\x02\x02\u0659" +
		"\u0652\x03\x02\x02\x02\u065A\xBB\x03\x02\x02\x02\u065B\u0660\x05\xBE`" +
		"\x02\u065C\u065D\x07\xCD\x02\x02\u065D\u065F\x05\xBE`\x02\u065E\u065C" +
		"\x03\x02\x02\x02\u065F\u0662\x03\x02\x02\x02\u0660\u065E\x03\x02\x02\x02" +
		"\u0660\u0661\x03\x02\x02\x02\u0661\xBD\x03\x02\x02\x02\u0662\u0660\x03" +
		"\x02\x02\x02\u0663\u0664\x05\xD0i\x02\u0664\u0665\x07\xD0\x02\x02\u0665" +
		"\u0667\x03\x02\x02\x02\u0666\u0663\x03\x02\x02\x02\u0666\u0667\x03\x02" +
		"\x02\x02\u0667\u0668\x03\x02\x02\x02\u0668\u066F\x07\xC9\x02\x02\u0669" +
		"\u066A\x07\xD8\x02\x02\u066A\u066B\x05j6\x02\u066B\u066C\x07\xE2\x02\x02" +
		"\u066C\u066F\x03\x02\x02\x02\u066D\u066F\x05\xC0a\x02\u066E\u0666\x03" +
		"\x02\x02\x02\u066E\u0669\x03\x02\x02\x02\u066E\u066D\x03\x02\x02\x02\u066F" +
		"\xBF\x03\x02\x02\x02\u0670\u0671\ba\x01\x02\u0671\u0673\x07\x15\x02\x02" +
		"\u0672\u0674\x05\xC0a\x02\u0673\u0672\x03\x02\x02\x02\u0673\u0674\x03" +
		"\x02\x02\x02\u0674\u067A\x03\x02\x02\x02\u0675\u0676\x07\xBB\x02\x02\u0676" +
		"\u0677\x05\xC0a\x02\u0677\u0678\x07\xA4\x02\x02\u0678\u0679\x05\xC0a\x02" +
		"\u0679\u067B\x03\x02\x02\x02\u067A\u0675\x03\x02\x02\x02\u067B\u067C\x03" +
		"\x02\x02\x02\u067C\u067A\x03\x02\x02\x02\u067C\u067D\x03\x02\x02\x02\u067D" +
		"\u0680\x03\x02\x02\x02\u067E\u067F\x075\x02\x02\u067F\u0681\x05\xC0a\x02" +
		"\u0680\u067E\x03\x02\x02\x02\u0680\u0681\x03\x02\x02\x02\u0681\u0682\x03" +
		"\x02\x02\x02\u0682\u0683\x076\x02\x02\u0683\u06F2\x03\x02\x02\x02\u0684" +
		"\u0685\x07\x16\x02\x02\u0685\u0686\x07\xD8\x02\x02\u0686\u0687\x05\xC0" +
		"a\x02\u0687\u0688\x07\f\x02\x02\u0688\u0689\x05\xBA^\x02\u0689\u068A\x07" +
		"\xE2\x02\x02\u068A\u06F2\x03\x02\x02\x02\u068B\u068C\x07%\x02\x02\u068C" +
		"\u06F2\x07\xC7\x02\x02\u068D\u068E\x07<\x02\x02\u068E\u068F\x07\xD8\x02" +
		"\x02\u068F\u0690\x05\xDEp\x02\u0690\u0691\x07E\x02\x02\u0691\u0692\x05" +
		"\xC0a\x02\u0692\u0693\x07\xE2\x02\x02\u0693\u06F2\x03\x02\x02\x02\u0694" +
		"\u0695\x07W\x02\x02\u0695\u0696\x05\xC0a\x02\u0696\u0697\x05\xDEp\x02" +
		"\u0697\u06F2\x03\x02\x02\x02\u0698\u0699\x07\x9C\x02\x02\u0699\u069A\x07" +
		"\xD8\x02\x02\u069A\u069B\x05\xC0a\x02\u069B\u069C\x07E\x02\x02\u069C\u069F" +
		"\x05\xC0a\x02\u069D\u069E\x07B\x02\x02\u069E\u06A0\x05\xC0a\x02\u069F" +
		"\u069D\x03\x02\x02\x02\u069F\u06A0\x03\x02\x02\x02\u06A0\u06A1\x03\x02" +
		"\x02\x02\u06A1\u06A2\x07\xE2\x02\x02\u06A2\u06F2\x03\x02\x02\x02\u06A3" +
		"\u06A4\x07\xA7\x02\x02\u06A4\u06F2\x07\xC7\x02\x02\u06A5\u06A6\x07\xAC" +
		"\x02\x02\u06A6\u06A7\x07\xD8\x02\x02\u06A7\u06A8\t\x15\x02\x02\u06A8\u06A9" +
		"\x07\xC7\x02\x02\u06A9\u06AA\x07E\x02\x02\u06AA\u06AB\x05\xC0a\x02\u06AB" +
		"\u06AC\x07\xE2\x02\x02\u06AC\u06F2\x03\x02\x02\x02\u06AD\u06AE\x05\xE6" +
		"t\x02\u06AE\u06B0\x07\xD8\x02\x02\u06AF\u06B1\x05\xBC_\x02\u06B0\u06AF" +
		"\x03\x02\x02\x02\u06B0\u06B1\x03\x02\x02\x02\u06B1\u06B2\x03\x02\x02\x02" +
		"\u06B2\u06B3\x07\xE2\x02\x02\u06B3\u06B4\x03\x02\x02\x02\u06B4\u06B5\x07" +
		"~\x02\x02\u06B5\u06B6\x07\xD8\x02\x02\u06B6\u06B7\x05\xA2R\x02\u06B7\u06B8" +
		"\x07\xE2\x02\x02\u06B8\u06F2\x03\x02\x02\x02\u06B9\u06BA\x05\xE6t\x02" +
		"\u06BA\u06BC\x07\xD8\x02\x02\u06BB\u06BD\x05\xBC_\x02\u06BC\u06BB\x03" +
		"\x02\x02\x02\u06BC\u06BD\x03\x02\x02\x02\u06BD\u06BE\x03\x02\x02\x02\u06BE" +
		"\u06BF\x07\xE2\x02\x02\u06BF\u06C0\x03\x02\x02\x02\u06C0\u06C1\x07~\x02" +
		"\x02\u06C1\u06C2\x05\xE6t\x02\u06C2\u06F2\x03\x02\x02\x02\u06C3\u06C9" +
		"\x05\xE6t\x02\u06C4\u06C6\x07\xD8\x02\x02\u06C5\u06C7\x05\xBC_\x02\u06C6" +
		"\u06C5\x03\x02\x02\x02\u06C6\u06C7\x03\x02\x02\x02\u06C7\u06C8\x03\x02" +
		"\x02\x02\u06C8\u06CA\x07\xE2\x02\x02\u06C9\u06C4\x03\x02\x02\x02\u06C9" +
		"\u06CA\x03\x02\x02\x02\u06CA\u06CB\x03\x02\x02\x02\u06CB\u06CD\x07\xD8" +
		"\x02\x02\u06CC\u06CE\x072\x02\x02\u06CD\u06CC\x03\x02\x02\x02\u06CD\u06CE" +
		"\x03\x02\x02\x02\u06CE\u06D0\x03\x02\x02\x02\u06CF\u06D1\x05\xC2b\x02" +
		"\u06D0\u06CF\x03\x02\x02\x02\u06D0\u06D1\x03\x02\x02\x02\u06D1\u06D2\x03" +
		"\x02\x02\x02\u06D2\u06D3\x07\xE2\x02\x02\u06D3\u06F2\x03\x02\x02\x02\u06D4" +
		"\u06F2\x05\xDCo\x02\u06D5\u06D6\x07\xCF\x02\x02\u06D6\u06F2\x05\xC0a\x13" +
		"\u06D7\u06D8\x07t\x02\x02\u06D8\u06F2\x05\xC0a\x0E\u06D9\u06DA\x05\xD0" +
		"i\x02\u06DA\u06DB\x07\xD0\x02\x02\u06DB\u06DD\x03\x02\x02\x02\u06DC\u06D9" +
		"\x03\x02\x02\x02\u06DC\u06DD\x03\x02\x02\x02\u06DD\u06DE\x03\x02\x02\x02" +
		"\u06DE\u06F2\x07\xC9\x02\x02\u06DF\u06E0\x07\xD8\x02\x02\u06E0\u06E1\x05" +
		"j6\x02\u06E1\u06E2\x07\xE2\x02\x02\u06E2\u06F2\x03\x02\x02\x02\u06E3\u06E4" +
		"\x07\xD8\x02\x02\u06E4\u06E5\x05\xC0a\x02\u06E5\u06E6\x07\xE2\x02\x02" +
		"\u06E6\u06F2\x03\x02\x02\x02\u06E7\u06E8\x07\xD8\x02\x02\u06E8\u06E9\x05" +
		"\xBC_\x02\u06E9\u06EA\x07\xE2\x02\x02\u06EA\u06F2\x03\x02\x02\x02\u06EB" +
		"\u06ED\x07\xD6\x02\x02\u06EC\u06EE\x05\xBC_\x02\u06ED\u06EC\x03\x02\x02" +
		"\x02\u06ED\u06EE\x03\x02\x02\x02\u06EE\u06EF\x03\x02\x02\x02\u06EF\u06F2" +
		"\x07\xE1\x02\x02\u06F0\u06F2\x05\xC8e\x02\u06F1\u0670\x03\x02\x02\x02" +
		"\u06F1\u0684\x03\x02\x02\x02\u06F1\u068B\x03\x02\x02\x02\u06F1\u068D\x03" +
		"\x02\x02\x02\u06F1\u0694\x03\x02\x02\x02\u06F1\u0698\x03\x02\x02\x02\u06F1" +
		"\u06A3\x03\x02\x02\x02\u06F1\u06A5\x03\x02\x02\x02\u06F1\u06AD\x03\x02" +
		"\x02\x02\u06F1\u06B9\x03\x02\x02\x02\u06F1\u06C3\x03\x02\x02\x02\u06F1" +
		"\u06D4\x03\x02\x02\x02\u06F1\u06D5\x03\x02\x02\x02\u06F1\u06D7\x03\x02" +
		"\x02\x02\u06F1\u06DC\x03\x02\x02\x02\u06F1\u06DF\x03\x02\x02\x02\u06F1" +
		"\u06E3\x03\x02\x02\x02\u06F1\u06E7\x03\x02\x02\x02\u06F1\u06EB\x03\x02" +
		"\x02\x02\u06F1\u06F0\x03\x02\x02\x02\u06F2\u073A\x03\x02\x02\x02\u06F3" +
		"\u06F4\f\x12\x02\x02\u06F4\u06F5\t\x16\x02\x02\u06F5\u0739\x05\xC0a\x13" +
		"\u06F6\u06F7\f\x11\x02\x02\u06F7\u06F8\t\x17\x02\x02\u06F8\u0739\x05\xC0" +
		"a\x12\u06F9\u070C\f\x10\x02\x02\u06FA\u070D\x07\xD1\x02\x02\u06FB\u070D" +
		"\x07\xD2\x02\x02\u06FC\u070D\x07\xDA\x02\x02\u06FD\u070D\x07\xD7\x02\x02" +
		"\u06FE\u070D\x07\xD3\x02\x02\u06FF\u070D\x07\xD9\x02\x02\u0700\u070D\x07" +
		"\xD4\x02\x02\u0701\u0703\x07H\x02\x02\u0702\u0701\x03\x02\x02\x02\u0702" +
		"\u0703\x03\x02\x02\x02\u0703\u0705\x03\x02\x02\x02\u0704\u0706\x07t\x02" +
		"\x02\u0705\u0704\x03\x02\x02\x02\u0705\u0706\x03\x02\x02\x02\u0706\u0707" +
		"\x03\x02\x02\x02\u0707\u070D\x07Q\x02\x02\u0708\u070A\x07t\x02\x02\u0709" +
		"\u0708\x03\x02\x02\x02\u0709\u070A\x03\x02\x02\x02\u070A\u070B\x03\x02" +
		"\x02\x02\u070B\u070D\t\x18\x02\x02\u070C\u06FA\x03\x02\x02\x02\u070C\u06FB" +
		"\x03\x02\x02\x02\u070C\u06FC\x03\x02\x02\x02\u070C\u06FD\x03\x02\x02\x02" +
		"\u070C\u06FE\x03\x02\x02\x02\u070C\u06FF\x03\x02\x02\x02\u070C\u0700\x03" +
		"\x02\x02\x02\u070C\u0702\x03\x02\x02\x02\u070C\u0709\x03\x02\x02\x02\u070D" +
		"\u070E\x03\x02\x02\x02\u070E\u0739\x05\xC0a\x11\u070F\u0710\f\r\x02\x02" +
		"\u0710\u0711\x07\b\x02\x02\u0711\u0739\x05\xC0a\x0E\u0712\u0713\f\f\x02" +
		"\x02\u0713\u0714\x07z\x02\x02\u0714\u0739\x05\xC0a\r\u0715\u0717\f\v\x02" +
		"\x02\u0716\u0718\x07t\x02\x02\u0717\u0716\x03\x02\x02\x02\u0717\u0718" +
		"\x03\x02\x02\x02\u0718\u0719\x03\x02\x02\x02\u0719\u071A\x07\x12\x02\x02" +
		"\u071A\u071B\x05\xC0a\x02\u071B\u071C\x07\b\x02\x02\u071C\u071D\x05\xC0" +
		"a\f\u071D\u0739\x03\x02\x02\x02\u071E\u071F\f\n\x02\x02\u071F\u0720\x07" +
		"\xDD\x02\x02\u0720\u0721\x05\xC0a\x02\u0721\u0722\x07\xCC\x02\x02\u0722" +
		"\u0723\x05\xC0a\n\u0723\u0739\x03\x02\x02\x02\u0724\u0725\f\x15\x02\x02" +
		"\u0725\u0726\x07\xD6\x02\x02\u0726\u0727\x05\xC0a\x02\u0727\u0728\x07" +
		"\xE1\x02\x02\u0728\u0739\x03\x02\x02\x02\u0729\u072A\f\x14\x02\x02\u072A" +
		"\u072B\x07\xD0\x02\x02\u072B\u0739\x07\xC5\x02\x02\u072C\u072D\f\x0F\x02" +
		"\x02\u072D\u072F\x07Y\x02\x02\u072E\u0730\x07t\x02\x02\u072F\u072E\x03" +
		"\x02\x02\x02\u072F\u0730\x03\x02\x02\x02\u0730\u0731\x03\x02\x02\x02\u0731" +
		"\u0739\x07u\x02\x02\u0732\u0736\f\t\x02\x02\u0733\u0737\x05\xE4s\x02\u0734" +
		"\u0735\x07\f\x02\x02\u0735\u0737\x05\xE6t\x02\u0736\u0733\x03\x02\x02" +
		"\x02\u0736\u0734\x03\x02\x02\x02\u0737\u0739\x03\x02\x02\x02\u0738\u06F3" +
		"\x03\x02\x02\x02\u0738\u06F6\x03\x02\x02\x02\u0738\u06F9\x03\x02\x02\x02" +
		"\u0738\u070F\x03\x02\x02\x02\u0738\u0712\x03\x02\x02\x02\u0738\u0715\x03" +
		"\x02\x02\x02\u0738\u071E\x03\x02\x02\x02\u0738\u0724\x03\x02\x02\x02\u0738" +
		"\u0729\x03\x02\x02\x02\u0738\u072C\x03\x02\x02\x02\u0738\u0732\x03\x02" +
		"\x02\x02\u0739\u073C\x03\x02\x02\x02\u073A\u0738\x03\x02\x02\x02\u073A" +
		"\u073B\x03\x02\x02\x02\u073B\xC1\x03\x02\x02\x02\u073C\u073A\x03\x02\x02" +
		"\x02\u073D\u0742\x05\xC4c\x02\u073E\u073F\x07\xCD\x02\x02\u073F\u0741" +
		"\x05\xC4c\x02\u0740\u073E\x03\x02\x02\x02\u0741\u0744\x03\x02\x02\x02" +
		"\u0742\u0740\x03\x02\x02\x02\u0742\u0743\x03\x02\x02\x02\u0743\xC3\x03" +
		"\x02\x02\x02\u0744\u0742\x03\x02\x02\x02\u0745\u0748\x05\xC6d\x02\u0746" +
		"\u0748\x05\xC0a\x02\u0747\u0745\x03\x02\x02\x02\u0747\u0746\x03\x02\x02" +
		"\x02\u0748\xC5\x03\x02\x02\x02\u0749\u074A\x07\xD8\x02\x02\u074A\u074F" +
		"\x05\xE6t\x02\u074B\u074C\x07\xCD\x02\x02\u074C\u074E\x05\xE6t\x02\u074D" +
		"\u074B\x03\x02\x02\x02\u074E\u0751\x03\x02\x02\x02\u074F\u074D\x03\x02" +
		"\x02\x02\u074F\u0750\x03\x02\x02\x02\u0750\u0752\x03\x02\x02\x02\u0751" +
		"\u074F\x03\x02\x02\x02\u0752\u0753\x07\xE2\x02\x02\u0753\u075D\x03\x02" +
		"\x02\x02\u0754\u0759\x05\xE6t\x02\u0755\u0756\x07\xCD\x02\x02\u0756\u0758" +
		"\x05\xE6t\x02\u0757\u0755\x03\x02\x02\x02\u0758\u075B\x03\x02\x02\x02" +
		"\u0759\u0757\x03\x02\x02\x02\u0759\u075A\x03\x02\x02\x02\u075A\u075D\x03" +
		"\x02\x02\x02\u075B\u0759\x03\x02\x02\x02\u075C\u0749\x03\x02\x02\x02\u075C" +
		"\u0754\x03\x02\x02\x02\u075D\u075E\x03\x02\x02\x02\u075E\u075F\x07\xC8" +
		"\x02\x02\u075F\u0760\x05\xC0a\x02\u0760\xC7\x03\x02\x02\x02\u0761\u0762" +
		"\x05\xD0i\x02\u0762\u0763\x07\xD0\x02\x02\u0763\u0765\x03\x02\x02\x02" +
		"\u0764\u0761\x03\x02\x02\x02\u0764\u0765\x03\x02\x02\x02\u0765\u0766\x03" +
		"\x02\x02\x02\u0766\u0767\x05\xCAf\x02\u0767\xC9\x03\x02\x02\x02\u0768" +
		"\u076B\x05\xE6t\x02\u0769\u076A\x07\xD0\x02\x02\u076A\u076C\x05\xE6t\x02" +
		"\u076B\u0769\x03\x02\x02\x02\u076B\u076C\x03\x02\x02\x02\u076C\xCB\x03" +
		"\x02\x02\x02\u076D\u076E\bg\x01\x02\u076E\u0775\x05\xD0i\x02\u076F\u0775" +
		"\x05\xCEh\x02\u0770\u0771\x07\xD8\x02\x02\u0771\u0772\x05j6\x02\u0772" +
		"\u0773\x07\xE2\x02\x02\u0773\u0775\x03\x02\x02\x02\u0774\u076D\x03\x02" +
		"\x02\x02\u0774\u076F\x03\x02\x02\x02\u0774\u0770\x03\x02\x02\x02\u0775" +
		"\u077E\x03\x02\x02\x02\u0776\u077A\f\x03\x02\x02\u0777\u077B\x05\xE4s" +
		"\x02\u0778\u0779\x07\f\x02\x02\u0779\u077B\x05\xE6t\x02\u077A\u0777\x03" +
		"\x02\x02\x02\u077A\u0778\x03\x02\x02\x02\u077B\u077D\x03\x02\x02\x02\u077C" +
		"\u0776\x03\x02\x02\x02\u077D\u0780\x03\x02\x02\x02\u077E\u077C\x03\x02" +
		"\x02\x02\u077E\u077F\x03\x02\x02\x02\u077F\xCD\x03\x02\x02\x02\u0780\u077E" +
		"\x03\x02\x02\x02\u0781\u0782\x05\xE6t\x02\u0782\u0784\x07\xD8\x02\x02" +
		"\u0783\u0785\x05\xD2j\x02\u0784\u0783\x03\x02\x02\x02\u0784\u0785\x03" +
		"\x02\x02\x02\u0785\u0786\x03\x02\x02\x02\u0786\u0787\x07\xE2\x02\x02\u0787" +
		"\xCF\x03\x02\x02\x02\u0788\u0789\x05\xD6l\x02\u0789\u078A\x07\xD0\x02" +
		"\x02\u078A\u078C\x03\x02\x02\x02\u078B\u0788\x03\x02\x02\x02\u078B\u078C" +
		"\x03\x02\x02\x02\u078C\u078D\x03\x02\x02\x02\u078D\u078E\x05\xE6t\x02" +
		"\u078E\xD1\x03\x02\x02\x02\u078F\u0794\x05\xD4k\x02\u0790\u0791\x07\xCD" +
		"\x02\x02\u0791\u0793\x05\xD4k\x02\u0792\u0790\x03\x02\x02\x02\u0793\u0796" +
		"\x03\x02\x02\x02\u0794\u0792\x03\x02\x02\x02\u0794\u0795\x03\x02\x02\x02" +
		"\u0795\xD3\x03\x02\x02\x02\u0796\u0794\x03\x02\x02\x02\u0797\u079B\x05" +
		"\xCAf\x02\u0798\u079B\x05\xCEh\x02\u0799\u079B\x05\xDCo\x02\u079A\u0797" +
		"\x03\x02\x02\x02\u079A\u0798\x03\x02\x02\x02\u079A\u0799\x03\x02\x02\x02" +
		"\u079B\xD5\x03\x02\x02\x02\u079C\u079D\x05\xE6t\x02\u079D\xD7\x03\x02" +
		"\x02\x02\u079E\u07A7\x07\xC3\x02\x02\u079F\u07A0\x07\xD0\x02\x02\u07A0" +
		"\u07A7\t\x19\x02\x02\u07A1\u07A2\x07\xC5\x02\x02\u07A2\u07A4\x07\xD0\x02" +
		"\x02\u07A3\u07A5\t\x19\x02\x02\u07A4\u07A3\x03\x02\x02\x02\u07A4\u07A5" +
		"\x03\x02\x02\x02\u07A5\u07A7\x03\x02\x02\x02\u07A6\u079E\x03\x02\x02\x02" +
		"\u07A6\u079F\x03\x02\x02\x02\u07A6\u07A1\x03\x02\x02\x02\u07A7\xD9\x03" +
		"\x02\x02\x02\u07A8\u07AA\t\x1A\x02\x02\u07A9\u07A8\x03\x02\x02\x02\u07A9" +
		"\u07AA\x03\x02\x02\x02\u07AA\u07B1\x03\x02\x02\x02\u07AB\u07B2\x05\xD8" +
		"m\x02\u07AC\u07B2\x07\xC4\x02\x02\u07AD\u07B2\x07\xC5\x02\x02\u07AE\u07B2" +
		"\x07\xC6\x02\x02\u07AF\u07B2\x07S\x02\x02\u07B0\u07B2\x07r\x02\x02\u07B1" +
		"\u07AB\x03\x02\x02\x02\u07B1\u07AC\x03\x02\x02\x02\u07B1\u07AD\x03\x02" +
		"\x02\x02\u07B1\u07AE\x03\x02\x02\x02\u07B1\u07AF\x03\x02\x02\x02\u07B1" +
		"\u07B0\x03\x02\x02\x02\u07B2\xDB\x03\x02\x02\x02\u07B3\u07B7\x05\xDAn" +
		"\x02\u07B4\u07B7\x07\xC7\x02\x02\u07B5\u07B7\x07u\x02\x02\u07B6\u07B3" +
		"\x03\x02\x02\x02\u07B6\u07B4\x03\x02\x02\x02\u07B6\u07B5\x03\x02\x02\x02" +
		"\u07B7\xDD\x03\x02\x02\x02\u07B8\u07B9\t\x1B\x02\x02\u07B9\xDF\x03\x02" +
		"\x02\x02\u07BA\u07BB\t\x1C\x02\x02\u07BB\xE1\x03\x02\x02\x02\u07BC\u07BD" +
		"\t\x1D\x02\x02\u07BD\xE3\x03\x02\x02\x02\u07BE\u07C1\x07\xC2\x02\x02\u07BF" +
		"\u07C1\x05\xE2r\x02\u07C0\u07BE\x03\x02\x02\x02\u07C0\u07BF\x03\x02\x02" +
		"\x02\u07C1\xE5\x03\x02\x02\x02\u07C2\u07C6\x07\xC2\x02\x02\u07C3\u07C6" +
		"\x05\xDEp\x02\u07C4\u07C6\x05\xE0q\x02\u07C5\u07C2\x03\x02\x02\x02\u07C5" +
		"\u07C3\x03\x02\x02\x02\u07C5\u07C4\x03\x02\x02\x02\u07C6\xE7\x03\x02\x02" +
		"\x02\u07C7\u07CA\x05\xE6t\x02\u07C8\u07CA\x07u\x02\x02\u07C9\u07C7\x03" +
		"\x02\x02\x02\u07C9\u07C8\x03\x02\x02\x02\u07CA\xE9\x03\x02\x02\x02\u07CB" +
		"\u07CC\x07\xC7\x02\x02\u07CC\u07CD\x07\xD2\x02\x02\u07CD\u07CE\x05\xDA" +
		"n\x02\u07CE\xEB\x03\x02\x02\x02\u0115\xF0\xF5\xFE\u0102\u0105\u0108\u011C" +
		"\u0122\u0129\u0131\u0136\u013D\u0142\u0149\u014E\u0154\u015A\u015F\u0165" +
		"\u016A\u0170\u0175\u017B\u0189\u0190\u0197\u019E\u01A4\u01A9\u01AF\u01B4" +
		"\u01BA\u01C3\u01CD\u01D7\u01EB\u01F3\u0202\u0209\u0217\u021D\u0223\u022A" +
		"\u022E\u0231\u0237\u023A\u0240\u0244\u0247\u0252\u0256\u0259\u025E\u0260" +
		"\u0263\u0266\u0270\u0274\u0277\u027A\u027F\u0281\u0289\u028C\u028F\u0295" +
		"\u0299\u029C\u029F\u02A2\u02A5\u02AA\u02B0\u02B4\u02B7\u02BA\u02BE\u02C6" +
		"\u02D4\u02D6\u02DA\u02E1\u02E3\u02EE\u02F1\u02FA\u030B\u0316\u0328\u0335" +
		"\u0346\u034F\u0353\u0356\u0359\u035C\u035F\u0362\u0376\u037B\u0380\u0383" +
		"\u038F\u0394\u0398\u039B\u039F\u03A3\u03A8\u03AB\u03AF\u03B1\u03C7\u03CF" +
		"\u03D2\u03DC\u03E0\u03E8\u03EC\u03F1\u03F5\u03F9\u03FD\u0401\u0403\u040B" +
		"\u040F\u0412\u041A\u041F\u0424\u0427\u0431\u043B\u043F\u0444\u0448\u044E" +
		"\u0451\u0454\u0457\u0465\u0469\u046D\u0472\u0475\u047F\u0487\u048A\u048E" +
		"\u0491\u0495\u0498\u049B\u049E\u04A1\u04A4\u04A8\u04AC\u04AF\u04B2\u04B5" +
		"\u04B8\u04BB\u04C4\u04CA\u04E5\u04FB\u0503\u0506\u050C\u0514\u0517\u051D" +
		"\u051F\u0523\u0528\u052B\u052E\u0532\u0536\u0539\u053B\u053E\u0542\u0546" +
		"\u0549\u054B\u054D\u0550\u0555\u0560\u0566\u056B\u0572\u0577\u057B\u057F" +
		"\u0584\u058B\u0593\u0596\u0599\u05AC\u05BA\u05CA\u05CD\u05D6\u05DA\u05DF" +
		"\u05E4\u05E7\u05E9\u05FF\u0602\u060D\u0611\u0614\u0618\u061C\u0624\u0628" +
		"\u0635\u0641\u064D\u0655\u0659\u0660\u0666\u066E\u0673\u067C\u0680\u069F" +
		"\u06B0\u06BC\u06C6\u06C9\u06CD\u06D0\u06DC\u06ED\u06F1\u0702\u0705\u0709" +
		"\u070C\u0717\u072F\u0736\u0738\u073A\u0742\u0747\u074F\u0759\u075C\u0764" +
		"\u076B\u0774\u077A\u077E\u0784\u078B\u0794\u079A\u07A4\u07A6\u07A9\u07B1" +
		"\u07B6\u07C0\u07C5\u07C9";
	public static readonly _serializedATN: string = Utils.join(
		[
			ClickHouseParser._serializedATNSegment0,
			ClickHouseParser._serializedATNSegment1,
			ClickHouseParser._serializedATNSegment2,
			ClickHouseParser._serializedATNSegment3,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ClickHouseParser.__ATN) {
			ClickHouseParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ClickHouseParser._serializedATN));
		}

		return ClickHouseParser.__ATN;
	}

}

export class SqlContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ClickHouseParser.EOF, 0); }
	public queryStmt(): QueryStmtContext[];
	public queryStmt(i: number): QueryStmtContext;
	public queryStmt(i?: number): QueryStmtContext | QueryStmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QueryStmtContext);
		} else {
			return this.getRuleContext(i, QueryStmtContext);
		}
	}
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.SEMICOLON);
		} else {
			return this.getToken(ClickHouseParser.SEMICOLON, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_sql; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSql) {
			listener.enterSql(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSql) {
			listener.exitSql(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSql) {
			return visitor.visitSql(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QueryStmtContext extends ParserRuleContext {
	public query(): QueryContext | undefined {
		return this.tryGetRuleContext(0, QueryContext);
	}
	public INTO(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.INTO, 0); }
	public OUTFILE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OUTFILE, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.STRING_LITERAL, 0); }
	public FORMAT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FORMAT, 0); }
	public identifierOrNull(): IdentifierOrNullContext | undefined {
		return this.tryGetRuleContext(0, IdentifierOrNullContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SEMICOLON, 0); }
	public insertStmt(): InsertStmtContext | undefined {
		return this.tryGetRuleContext(0, InsertStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_queryStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterQueryStmt) {
			listener.enterQueryStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitQueryStmt) {
			listener.exitQueryStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitQueryStmt) {
			return visitor.visitQueryStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QueryContext extends ParserRuleContext {
	public alterStmt(): AlterStmtContext | undefined {
		return this.tryGetRuleContext(0, AlterStmtContext);
	}
	public attachStmt(): AttachStmtContext | undefined {
		return this.tryGetRuleContext(0, AttachStmtContext);
	}
	public checkStmt(): CheckStmtContext | undefined {
		return this.tryGetRuleContext(0, CheckStmtContext);
	}
	public createStmt(): CreateStmtContext | undefined {
		return this.tryGetRuleContext(0, CreateStmtContext);
	}
	public describeStmt(): DescribeStmtContext | undefined {
		return this.tryGetRuleContext(0, DescribeStmtContext);
	}
	public dropStmt(): DropStmtContext | undefined {
		return this.tryGetRuleContext(0, DropStmtContext);
	}
	public existsStmt(): ExistsStmtContext | undefined {
		return this.tryGetRuleContext(0, ExistsStmtContext);
	}
	public explainStmt(): ExplainStmtContext | undefined {
		return this.tryGetRuleContext(0, ExplainStmtContext);
	}
	public killStmt(): KillStmtContext | undefined {
		return this.tryGetRuleContext(0, KillStmtContext);
	}
	public optimizeStmt(): OptimizeStmtContext | undefined {
		return this.tryGetRuleContext(0, OptimizeStmtContext);
	}
	public renameStmt(): RenameStmtContext | undefined {
		return this.tryGetRuleContext(0, RenameStmtContext);
	}
	public selectUnionStmt(): SelectUnionStmtContext | undefined {
		return this.tryGetRuleContext(0, SelectUnionStmtContext);
	}
	public setStmt(): SetStmtContext | undefined {
		return this.tryGetRuleContext(0, SetStmtContext);
	}
	public showStmt(): ShowStmtContext | undefined {
		return this.tryGetRuleContext(0, ShowStmtContext);
	}
	public systemStmt(): SystemStmtContext | undefined {
		return this.tryGetRuleContext(0, SystemStmtContext);
	}
	public truncateStmt(): TruncateStmtContext | undefined {
		return this.tryGetRuleContext(0, TruncateStmtContext);
	}
	public useStmt(): UseStmtContext | undefined {
		return this.tryGetRuleContext(0, UseStmtContext);
	}
	public watchStmt(): WatchStmtContext | undefined {
		return this.tryGetRuleContext(0, WatchStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_query; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterQuery) {
			listener.enterQuery(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitQuery) {
			listener.exitQuery(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitQuery) {
			return visitor.visitQuery(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AlterStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_alterStmt; }
	public copyFrom(ctx: AlterStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class AlterTableStmtContext extends AlterStmtContext {
	public ALTER(): TerminalNode { return this.getToken(ClickHouseParser.ALTER, 0); }
	public TABLE(): TerminalNode { return this.getToken(ClickHouseParser.TABLE, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public alterTableClause(): AlterTableClauseContext[];
	public alterTableClause(i: number): AlterTableClauseContext;
	public alterTableClause(i?: number): AlterTableClauseContext | AlterTableClauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AlterTableClauseContext);
		} else {
			return this.getRuleContext(i, AlterTableClauseContext);
		}
	}
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(ctx: AlterStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableStmt) {
			listener.enterAlterTableStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableStmt) {
			listener.exitAlterTableStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableStmt) {
			return visitor.visitAlterTableStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AlterTableClauseContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_alterTableClause; }
	public copyFrom(ctx: AlterTableClauseContext): void {
		super.copyFrom(ctx);
	}
}
export class AlterTableClauseAddColumnContext extends AlterTableClauseContext {
	public ADD(): TerminalNode { return this.getToken(ClickHouseParser.ADD, 0); }
	public COLUMN(): TerminalNode { return this.getToken(ClickHouseParser.COLUMN, 0); }
	public tableColumnDfnt(): TableColumnDfntContext {
		return this.getRuleContext(0, TableColumnDfntContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public AFTER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.AFTER, 0); }
	public nestedIdentifier(): NestedIdentifierContext | undefined {
		return this.tryGetRuleContext(0, NestedIdentifierContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseAddColumn) {
			listener.enterAlterTableClauseAddColumn(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseAddColumn) {
			listener.exitAlterTableClauseAddColumn(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseAddColumn) {
			return visitor.visitAlterTableClauseAddColumn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseAddIndexContext extends AlterTableClauseContext {
	public ADD(): TerminalNode { return this.getToken(ClickHouseParser.ADD, 0); }
	public INDEX(): TerminalNode { return this.getToken(ClickHouseParser.INDEX, 0); }
	public tableIndexDfnt(): TableIndexDfntContext {
		return this.getRuleContext(0, TableIndexDfntContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public AFTER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.AFTER, 0); }
	public nestedIdentifier(): NestedIdentifierContext | undefined {
		return this.tryGetRuleContext(0, NestedIdentifierContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseAddIndex) {
			listener.enterAlterTableClauseAddIndex(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseAddIndex) {
			listener.exitAlterTableClauseAddIndex(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseAddIndex) {
			return visitor.visitAlterTableClauseAddIndex(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseAddProjectionContext extends AlterTableClauseContext {
	public ADD(): TerminalNode { return this.getToken(ClickHouseParser.ADD, 0); }
	public PROJECTION(): TerminalNode { return this.getToken(ClickHouseParser.PROJECTION, 0); }
	public tableProjectionDfnt(): TableProjectionDfntContext {
		return this.getRuleContext(0, TableProjectionDfntContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public AFTER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.AFTER, 0); }
	public nestedIdentifier(): NestedIdentifierContext | undefined {
		return this.tryGetRuleContext(0, NestedIdentifierContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseAddProjection) {
			listener.enterAlterTableClauseAddProjection(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseAddProjection) {
			listener.exitAlterTableClauseAddProjection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseAddProjection) {
			return visitor.visitAlterTableClauseAddProjection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseAttachContext extends AlterTableClauseContext {
	public ATTACH(): TerminalNode { return this.getToken(ClickHouseParser.ATTACH, 0); }
	public partitionClause(): PartitionClauseContext {
		return this.getRuleContext(0, PartitionClauseContext);
	}
	public FROM(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FROM, 0); }
	public tableIdentifier(): TableIdentifierContext | undefined {
		return this.tryGetRuleContext(0, TableIdentifierContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseAttach) {
			listener.enterAlterTableClauseAttach(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseAttach) {
			listener.exitAlterTableClauseAttach(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseAttach) {
			return visitor.visitAlterTableClauseAttach(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseClearColumnContext extends AlterTableClauseContext {
	public CLEAR(): TerminalNode { return this.getToken(ClickHouseParser.CLEAR, 0); }
	public COLUMN(): TerminalNode { return this.getToken(ClickHouseParser.COLUMN, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IN, 0); }
	public partitionClause(): PartitionClauseContext | undefined {
		return this.tryGetRuleContext(0, PartitionClauseContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseClearColumn) {
			listener.enterAlterTableClauseClearColumn(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseClearColumn) {
			listener.exitAlterTableClauseClearColumn(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseClearColumn) {
			return visitor.visitAlterTableClauseClearColumn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseClearIndexContext extends AlterTableClauseContext {
	public CLEAR(): TerminalNode { return this.getToken(ClickHouseParser.CLEAR, 0); }
	public INDEX(): TerminalNode { return this.getToken(ClickHouseParser.INDEX, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IN, 0); }
	public partitionClause(): PartitionClauseContext | undefined {
		return this.tryGetRuleContext(0, PartitionClauseContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseClearIndex) {
			listener.enterAlterTableClauseClearIndex(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseClearIndex) {
			listener.exitAlterTableClauseClearIndex(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseClearIndex) {
			return visitor.visitAlterTableClauseClearIndex(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseClearProjectionContext extends AlterTableClauseContext {
	public CLEAR(): TerminalNode { return this.getToken(ClickHouseParser.CLEAR, 0); }
	public PROJECTION(): TerminalNode { return this.getToken(ClickHouseParser.PROJECTION, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IN, 0); }
	public partitionClause(): PartitionClauseContext | undefined {
		return this.tryGetRuleContext(0, PartitionClauseContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseClearProjection) {
			listener.enterAlterTableClauseClearProjection(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseClearProjection) {
			listener.exitAlterTableClauseClearProjection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseClearProjection) {
			return visitor.visitAlterTableClauseClearProjection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseCommentContext extends AlterTableClauseContext {
	public COMMENT(): TerminalNode { return this.getToken(ClickHouseParser.COMMENT, 0); }
	public COLUMN(): TerminalNode { return this.getToken(ClickHouseParser.COLUMN, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public STRING_LITERAL(): TerminalNode { return this.getToken(ClickHouseParser.STRING_LITERAL, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseComment) {
			listener.enterAlterTableClauseComment(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseComment) {
			listener.exitAlterTableClauseComment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseComment) {
			return visitor.visitAlterTableClauseComment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseDeleteContext extends AlterTableClauseContext {
	public DELETE(): TerminalNode { return this.getToken(ClickHouseParser.DELETE, 0); }
	public WHERE(): TerminalNode { return this.getToken(ClickHouseParser.WHERE, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseDelete) {
			listener.enterAlterTableClauseDelete(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseDelete) {
			listener.exitAlterTableClauseDelete(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseDelete) {
			return visitor.visitAlterTableClauseDelete(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseDetachContext extends AlterTableClauseContext {
	public DETACH(): TerminalNode { return this.getToken(ClickHouseParser.DETACH, 0); }
	public partitionClause(): PartitionClauseContext {
		return this.getRuleContext(0, PartitionClauseContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseDetach) {
			listener.enterAlterTableClauseDetach(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseDetach) {
			listener.exitAlterTableClauseDetach(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseDetach) {
			return visitor.visitAlterTableClauseDetach(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseDropColumnContext extends AlterTableClauseContext {
	public DROP(): TerminalNode { return this.getToken(ClickHouseParser.DROP, 0); }
	public COLUMN(): TerminalNode { return this.getToken(ClickHouseParser.COLUMN, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseDropColumn) {
			listener.enterAlterTableClauseDropColumn(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseDropColumn) {
			listener.exitAlterTableClauseDropColumn(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseDropColumn) {
			return visitor.visitAlterTableClauseDropColumn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseDropIndexContext extends AlterTableClauseContext {
	public DROP(): TerminalNode { return this.getToken(ClickHouseParser.DROP, 0); }
	public INDEX(): TerminalNode { return this.getToken(ClickHouseParser.INDEX, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseDropIndex) {
			listener.enterAlterTableClauseDropIndex(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseDropIndex) {
			listener.exitAlterTableClauseDropIndex(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseDropIndex) {
			return visitor.visitAlterTableClauseDropIndex(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseDropProjectionContext extends AlterTableClauseContext {
	public DROP(): TerminalNode { return this.getToken(ClickHouseParser.DROP, 0); }
	public PROJECTION(): TerminalNode { return this.getToken(ClickHouseParser.PROJECTION, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseDropProjection) {
			listener.enterAlterTableClauseDropProjection(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseDropProjection) {
			listener.exitAlterTableClauseDropProjection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseDropProjection) {
			return visitor.visitAlterTableClauseDropProjection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseDropPartitionContext extends AlterTableClauseContext {
	public DROP(): TerminalNode { return this.getToken(ClickHouseParser.DROP, 0); }
	public partitionClause(): PartitionClauseContext {
		return this.getRuleContext(0, PartitionClauseContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseDropPartition) {
			listener.enterAlterTableClauseDropPartition(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseDropPartition) {
			listener.exitAlterTableClauseDropPartition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseDropPartition) {
			return visitor.visitAlterTableClauseDropPartition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseFreezePartitionContext extends AlterTableClauseContext {
	public FREEZE(): TerminalNode { return this.getToken(ClickHouseParser.FREEZE, 0); }
	public partitionClause(): PartitionClauseContext | undefined {
		return this.tryGetRuleContext(0, PartitionClauseContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseFreezePartition) {
			listener.enterAlterTableClauseFreezePartition(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseFreezePartition) {
			listener.exitAlterTableClauseFreezePartition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseFreezePartition) {
			return visitor.visitAlterTableClauseFreezePartition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseMaterializeIndexContext extends AlterTableClauseContext {
	public MATERIALIZE(): TerminalNode { return this.getToken(ClickHouseParser.MATERIALIZE, 0); }
	public INDEX(): TerminalNode { return this.getToken(ClickHouseParser.INDEX, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IN, 0); }
	public partitionClause(): PartitionClauseContext | undefined {
		return this.tryGetRuleContext(0, PartitionClauseContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseMaterializeIndex) {
			listener.enterAlterTableClauseMaterializeIndex(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseMaterializeIndex) {
			listener.exitAlterTableClauseMaterializeIndex(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseMaterializeIndex) {
			return visitor.visitAlterTableClauseMaterializeIndex(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseMaterializeProjectionContext extends AlterTableClauseContext {
	public MATERIALIZE(): TerminalNode { return this.getToken(ClickHouseParser.MATERIALIZE, 0); }
	public PROJECTION(): TerminalNode { return this.getToken(ClickHouseParser.PROJECTION, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IN, 0); }
	public partitionClause(): PartitionClauseContext | undefined {
		return this.tryGetRuleContext(0, PartitionClauseContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseMaterializeProjection) {
			listener.enterAlterTableClauseMaterializeProjection(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseMaterializeProjection) {
			listener.exitAlterTableClauseMaterializeProjection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseMaterializeProjection) {
			return visitor.visitAlterTableClauseMaterializeProjection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseModifyCodecContext extends AlterTableClauseContext {
	public MODIFY(): TerminalNode { return this.getToken(ClickHouseParser.MODIFY, 0); }
	public COLUMN(): TerminalNode { return this.getToken(ClickHouseParser.COLUMN, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public codecExpr(): CodecExprContext {
		return this.getRuleContext(0, CodecExprContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseModifyCodec) {
			listener.enterAlterTableClauseModifyCodec(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseModifyCodec) {
			listener.exitAlterTableClauseModifyCodec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseModifyCodec) {
			return visitor.visitAlterTableClauseModifyCodec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseModifyCommentContext extends AlterTableClauseContext {
	public MODIFY(): TerminalNode { return this.getToken(ClickHouseParser.MODIFY, 0); }
	public COLUMN(): TerminalNode { return this.getToken(ClickHouseParser.COLUMN, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public COMMENT(): TerminalNode { return this.getToken(ClickHouseParser.COMMENT, 0); }
	public STRING_LITERAL(): TerminalNode { return this.getToken(ClickHouseParser.STRING_LITERAL, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseModifyComment) {
			listener.enterAlterTableClauseModifyComment(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseModifyComment) {
			listener.exitAlterTableClauseModifyComment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseModifyComment) {
			return visitor.visitAlterTableClauseModifyComment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseModifyRemoveContext extends AlterTableClauseContext {
	public MODIFY(): TerminalNode { return this.getToken(ClickHouseParser.MODIFY, 0); }
	public COLUMN(): TerminalNode { return this.getToken(ClickHouseParser.COLUMN, 0); }
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public REMOVE(): TerminalNode { return this.getToken(ClickHouseParser.REMOVE, 0); }
	public tableColumnPropertyType(): TableColumnPropertyTypeContext {
		return this.getRuleContext(0, TableColumnPropertyTypeContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseModifyRemove) {
			listener.enterAlterTableClauseModifyRemove(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseModifyRemove) {
			listener.exitAlterTableClauseModifyRemove(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseModifyRemove) {
			return visitor.visitAlterTableClauseModifyRemove(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseModifyContext extends AlterTableClauseContext {
	public MODIFY(): TerminalNode { return this.getToken(ClickHouseParser.MODIFY, 0); }
	public COLUMN(): TerminalNode { return this.getToken(ClickHouseParser.COLUMN, 0); }
	public tableColumnDfnt(): TableColumnDfntContext {
		return this.getRuleContext(0, TableColumnDfntContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseModify) {
			listener.enterAlterTableClauseModify(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseModify) {
			listener.exitAlterTableClauseModify(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseModify) {
			return visitor.visitAlterTableClauseModify(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseModifyOrderByContext extends AlterTableClauseContext {
	public MODIFY(): TerminalNode { return this.getToken(ClickHouseParser.MODIFY, 0); }
	public ORDER(): TerminalNode { return this.getToken(ClickHouseParser.ORDER, 0); }
	public BY(): TerminalNode { return this.getToken(ClickHouseParser.BY, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseModifyOrderBy) {
			listener.enterAlterTableClauseModifyOrderBy(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseModifyOrderBy) {
			listener.exitAlterTableClauseModifyOrderBy(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseModifyOrderBy) {
			return visitor.visitAlterTableClauseModifyOrderBy(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseModifyTTLContext extends AlterTableClauseContext {
	public MODIFY(): TerminalNode { return this.getToken(ClickHouseParser.MODIFY, 0); }
	public ttlClause(): TtlClauseContext {
		return this.getRuleContext(0, TtlClauseContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseModifyTTL) {
			listener.enterAlterTableClauseModifyTTL(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseModifyTTL) {
			listener.exitAlterTableClauseModifyTTL(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseModifyTTL) {
			return visitor.visitAlterTableClauseModifyTTL(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseMovePartitionContext extends AlterTableClauseContext {
	public MOVE(): TerminalNode { return this.getToken(ClickHouseParser.MOVE, 0); }
	public partitionClause(): PartitionClauseContext {
		return this.getRuleContext(0, PartitionClauseContext);
	}
	public TO(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TO, 0); }
	public DISK(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DISK, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.STRING_LITERAL, 0); }
	public VOLUME(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.VOLUME, 0); }
	public TABLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TABLE, 0); }
	public tableIdentifier(): TableIdentifierContext | undefined {
		return this.tryGetRuleContext(0, TableIdentifierContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseMovePartition) {
			listener.enterAlterTableClauseMovePartition(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseMovePartition) {
			listener.exitAlterTableClauseMovePartition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseMovePartition) {
			return visitor.visitAlterTableClauseMovePartition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseRemoveTTLContext extends AlterTableClauseContext {
	public REMOVE(): TerminalNode { return this.getToken(ClickHouseParser.REMOVE, 0); }
	public TTL(): TerminalNode { return this.getToken(ClickHouseParser.TTL, 0); }
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseRemoveTTL) {
			listener.enterAlterTableClauseRemoveTTL(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseRemoveTTL) {
			listener.exitAlterTableClauseRemoveTTL(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseRemoveTTL) {
			return visitor.visitAlterTableClauseRemoveTTL(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseRenameContext extends AlterTableClauseContext {
	public RENAME(): TerminalNode { return this.getToken(ClickHouseParser.RENAME, 0); }
	public COLUMN(): TerminalNode { return this.getToken(ClickHouseParser.COLUMN, 0); }
	public nestedIdentifier(): NestedIdentifierContext[];
	public nestedIdentifier(i: number): NestedIdentifierContext;
	public nestedIdentifier(i?: number): NestedIdentifierContext | NestedIdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NestedIdentifierContext);
		} else {
			return this.getRuleContext(i, NestedIdentifierContext);
		}
	}
	public TO(): TerminalNode { return this.getToken(ClickHouseParser.TO, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseRename) {
			listener.enterAlterTableClauseRename(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseRename) {
			listener.exitAlterTableClauseRename(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseRename) {
			return visitor.visitAlterTableClauseRename(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseReplaceContext extends AlterTableClauseContext {
	public REPLACE(): TerminalNode { return this.getToken(ClickHouseParser.REPLACE, 0); }
	public partitionClause(): PartitionClauseContext {
		return this.getRuleContext(0, PartitionClauseContext);
	}
	public FROM(): TerminalNode { return this.getToken(ClickHouseParser.FROM, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseReplace) {
			listener.enterAlterTableClauseReplace(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseReplace) {
			listener.exitAlterTableClauseReplace(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseReplace) {
			return visitor.visitAlterTableClauseReplace(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlterTableClauseUpdateContext extends AlterTableClauseContext {
	public UPDATE(): TerminalNode { return this.getToken(ClickHouseParser.UPDATE, 0); }
	public assignmentExprList(): AssignmentExprListContext {
		return this.getRuleContext(0, AssignmentExprListContext);
	}
	public whereClause(): WhereClauseContext {
		return this.getRuleContext(0, WhereClauseContext);
	}
	constructor(ctx: AlterTableClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlterTableClauseUpdate) {
			listener.enterAlterTableClauseUpdate(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlterTableClauseUpdate) {
			listener.exitAlterTableClauseUpdate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlterTableClauseUpdate) {
			return visitor.visitAlterTableClauseUpdate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentExprListContext extends ParserRuleContext {
	public assignmentExpr(): AssignmentExprContext[];
	public assignmentExpr(i: number): AssignmentExprContext;
	public assignmentExpr(i?: number): AssignmentExprContext | AssignmentExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AssignmentExprContext);
		} else {
			return this.getRuleContext(i, AssignmentExprContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_assignmentExprList; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAssignmentExprList) {
			listener.enterAssignmentExprList(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAssignmentExprList) {
			listener.exitAssignmentExprList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAssignmentExprList) {
			return visitor.visitAssignmentExprList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentExprContext extends ParserRuleContext {
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public EQ_SINGLE(): TerminalNode { return this.getToken(ClickHouseParser.EQ_SINGLE, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_assignmentExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAssignmentExpr) {
			listener.enterAssignmentExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAssignmentExpr) {
			listener.exitAssignmentExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAssignmentExpr) {
			return visitor.visitAssignmentExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableColumnPropertyTypeContext extends ParserRuleContext {
	public ALIAS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ALIAS, 0); }
	public CODEC(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CODEC, 0); }
	public COMMENT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.COMMENT, 0); }
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DEFAULT, 0); }
	public MATERIALIZED(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MATERIALIZED, 0); }
	public TTL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TTL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableColumnPropertyType; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableColumnPropertyType) {
			listener.enterTableColumnPropertyType(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableColumnPropertyType) {
			listener.exitTableColumnPropertyType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableColumnPropertyType) {
			return visitor.visitTableColumnPropertyType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PartitionClauseContext extends ParserRuleContext {
	public PARTITION(): TerminalNode { return this.getToken(ClickHouseParser.PARTITION, 0); }
	public columnExpr(): ColumnExprContext | undefined {
		return this.tryGetRuleContext(0, ColumnExprContext);
	}
	public ID(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ID, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_partitionClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterPartitionClause) {
			listener.enterPartitionClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitPartitionClause) {
			listener.exitPartitionClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitPartitionClause) {
			return visitor.visitPartitionClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AttachStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_attachStmt; }
	public copyFrom(ctx: AttachStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class AttachDictionaryStmtContext extends AttachStmtContext {
	public ATTACH(): TerminalNode { return this.getToken(ClickHouseParser.ATTACH, 0); }
	public DICTIONARY(): TerminalNode { return this.getToken(ClickHouseParser.DICTIONARY, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	constructor(ctx: AttachStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAttachDictionaryStmt) {
			listener.enterAttachDictionaryStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAttachDictionaryStmt) {
			listener.exitAttachDictionaryStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAttachDictionaryStmt) {
			return visitor.visitAttachDictionaryStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CheckStmtContext extends ParserRuleContext {
	public CHECK(): TerminalNode { return this.getToken(ClickHouseParser.CHECK, 0); }
	public TABLE(): TerminalNode { return this.getToken(ClickHouseParser.TABLE, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public partitionClause(): PartitionClauseContext | undefined {
		return this.tryGetRuleContext(0, PartitionClauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_checkStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterCheckStmt) {
			listener.enterCheckStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitCheckStmt) {
			listener.exitCheckStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitCheckStmt) {
			return visitor.visitCheckStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CreateStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_createStmt; }
	public copyFrom(ctx: CreateStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class CreateDatabaseStmtContext extends CreateStmtContext {
	public DATABASE(): TerminalNode { return this.getToken(ClickHouseParser.DATABASE, 0); }
	public databaseIdentifier(): DatabaseIdentifierContext {
		return this.getRuleContext(0, DatabaseIdentifierContext);
	}
	public ATTACH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ATTACH, 0); }
	public CREATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CREATE, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	public engineExpr(): EngineExprContext | undefined {
		return this.tryGetRuleContext(0, EngineExprContext);
	}
	constructor(ctx: CreateStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterCreateDatabaseStmt) {
			listener.enterCreateDatabaseStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitCreateDatabaseStmt) {
			listener.exitCreateDatabaseStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitCreateDatabaseStmt) {
			return visitor.visitCreateDatabaseStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CreateDictionaryStmtContext extends CreateStmtContext {
	public DICTIONARY(): TerminalNode { return this.getToken(ClickHouseParser.DICTIONARY, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public dictionarySchemaClause(): DictionarySchemaClauseContext {
		return this.getRuleContext(0, DictionarySchemaClauseContext);
	}
	public dictionaryEngineClause(): DictionaryEngineClauseContext {
		return this.getRuleContext(0, DictionaryEngineClauseContext);
	}
	public ATTACH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ATTACH, 0); }
	public CREATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CREATE, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.REPLACE, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public uuidClause(): UuidClauseContext | undefined {
		return this.tryGetRuleContext(0, UuidClauseContext);
	}
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	public OR(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OR, 0); }
	constructor(ctx: CreateStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterCreateDictionaryStmt) {
			listener.enterCreateDictionaryStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitCreateDictionaryStmt) {
			listener.exitCreateDictionaryStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitCreateDictionaryStmt) {
			return visitor.visitCreateDictionaryStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CreateLiveViewStmtContext extends CreateStmtContext {
	public LIVE(): TerminalNode { return this.getToken(ClickHouseParser.LIVE, 0); }
	public VIEW(): TerminalNode { return this.getToken(ClickHouseParser.VIEW, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public subqueryClause(): SubqueryClauseContext {
		return this.getRuleContext(0, SubqueryClauseContext);
	}
	public ATTACH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ATTACH, 0); }
	public CREATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CREATE, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public uuidClause(): UuidClauseContext | undefined {
		return this.tryGetRuleContext(0, UuidClauseContext);
	}
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	public WITH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.WITH, 0); }
	public TIMEOUT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TIMEOUT, 0); }
	public destinationClause(): DestinationClauseContext | undefined {
		return this.tryGetRuleContext(0, DestinationClauseContext);
	}
	public tableSchemaClause(): TableSchemaClauseContext | undefined {
		return this.tryGetRuleContext(0, TableSchemaClauseContext);
	}
	public DECIMAL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DECIMAL_LITERAL, 0); }
	constructor(ctx: CreateStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterCreateLiveViewStmt) {
			listener.enterCreateLiveViewStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitCreateLiveViewStmt) {
			listener.exitCreateLiveViewStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitCreateLiveViewStmt) {
			return visitor.visitCreateLiveViewStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CreateMaterializedViewStmtContext extends CreateStmtContext {
	public MATERIALIZED(): TerminalNode { return this.getToken(ClickHouseParser.MATERIALIZED, 0); }
	public VIEW(): TerminalNode { return this.getToken(ClickHouseParser.VIEW, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public subqueryClause(): SubqueryClauseContext {
		return this.getRuleContext(0, SubqueryClauseContext);
	}
	public ATTACH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ATTACH, 0); }
	public CREATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CREATE, 0); }
	public destinationClause(): DestinationClauseContext | undefined {
		return this.tryGetRuleContext(0, DestinationClauseContext);
	}
	public engineClause(): EngineClauseContext | undefined {
		return this.tryGetRuleContext(0, EngineClauseContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public uuidClause(): UuidClauseContext | undefined {
		return this.tryGetRuleContext(0, UuidClauseContext);
	}
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	public tableSchemaClause(): TableSchemaClauseContext | undefined {
		return this.tryGetRuleContext(0, TableSchemaClauseContext);
	}
	public POPULATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.POPULATE, 0); }
	constructor(ctx: CreateStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterCreateMaterializedViewStmt) {
			listener.enterCreateMaterializedViewStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitCreateMaterializedViewStmt) {
			listener.exitCreateMaterializedViewStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitCreateMaterializedViewStmt) {
			return visitor.visitCreateMaterializedViewStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CreateTableStmtContext extends CreateStmtContext {
	public TABLE(): TerminalNode { return this.getToken(ClickHouseParser.TABLE, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public ATTACH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ATTACH, 0); }
	public CREATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CREATE, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.REPLACE, 0); }
	public TEMPORARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TEMPORARY, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public uuidClause(): UuidClauseContext | undefined {
		return this.tryGetRuleContext(0, UuidClauseContext);
	}
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	public tableSchemaClause(): TableSchemaClauseContext | undefined {
		return this.tryGetRuleContext(0, TableSchemaClauseContext);
	}
	public engineClause(): EngineClauseContext | undefined {
		return this.tryGetRuleContext(0, EngineClauseContext);
	}
	public subqueryClause(): SubqueryClauseContext | undefined {
		return this.tryGetRuleContext(0, SubqueryClauseContext);
	}
	public OR(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OR, 0); }
	constructor(ctx: CreateStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterCreateTableStmt) {
			listener.enterCreateTableStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitCreateTableStmt) {
			listener.exitCreateTableStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitCreateTableStmt) {
			return visitor.visitCreateTableStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CreateViewStmtContext extends CreateStmtContext {
	public VIEW(): TerminalNode { return this.getToken(ClickHouseParser.VIEW, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public subqueryClause(): SubqueryClauseContext {
		return this.getRuleContext(0, SubqueryClauseContext);
	}
	public ATTACH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ATTACH, 0); }
	public CREATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CREATE, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OR, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.REPLACE, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public uuidClause(): UuidClauseContext | undefined {
		return this.tryGetRuleContext(0, UuidClauseContext);
	}
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	public tableSchemaClause(): TableSchemaClauseContext | undefined {
		return this.tryGetRuleContext(0, TableSchemaClauseContext);
	}
	constructor(ctx: CreateStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterCreateViewStmt) {
			listener.enterCreateViewStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitCreateViewStmt) {
			listener.exitCreateViewStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitCreateViewStmt) {
			return visitor.visitCreateViewStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DictionarySchemaClauseContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public dictionaryAttrDfnt(): DictionaryAttrDfntContext[];
	public dictionaryAttrDfnt(i: number): DictionaryAttrDfntContext;
	public dictionaryAttrDfnt(i?: number): DictionaryAttrDfntContext | DictionaryAttrDfntContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DictionaryAttrDfntContext);
		} else {
			return this.getRuleContext(i, DictionaryAttrDfntContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_dictionarySchemaClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDictionarySchemaClause) {
			listener.enterDictionarySchemaClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDictionarySchemaClause) {
			listener.exitDictionarySchemaClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDictionarySchemaClause) {
			return visitor.visitDictionarySchemaClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DictionaryAttrDfntContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public columnTypeExpr(): ColumnTypeExprContext {
		return this.getRuleContext(0, ColumnTypeExprContext);
	}
	public DEFAULT(): TerminalNode[];
	public DEFAULT(i: number): TerminalNode;
	public DEFAULT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.DEFAULT);
		} else {
			return this.getToken(ClickHouseParser.DEFAULT, i);
		}
	}
	public literal(): LiteralContext[];
	public literal(i: number): LiteralContext;
	public literal(i?: number): LiteralContext | LiteralContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LiteralContext);
		} else {
			return this.getRuleContext(i, LiteralContext);
		}
	}
	public EXPRESSION(): TerminalNode[];
	public EXPRESSION(i: number): TerminalNode;
	public EXPRESSION(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.EXPRESSION);
		} else {
			return this.getToken(ClickHouseParser.EXPRESSION, i);
		}
	}
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public HIERARCHICAL(): TerminalNode[];
	public HIERARCHICAL(i: number): TerminalNode;
	public HIERARCHICAL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.HIERARCHICAL);
		} else {
			return this.getToken(ClickHouseParser.HIERARCHICAL, i);
		}
	}
	public INJECTIVE(): TerminalNode[];
	public INJECTIVE(i: number): TerminalNode;
	public INJECTIVE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.INJECTIVE);
		} else {
			return this.getToken(ClickHouseParser.INJECTIVE, i);
		}
	}
	public IS_OBJECT_ID(): TerminalNode[];
	public IS_OBJECT_ID(i: number): TerminalNode;
	public IS_OBJECT_ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.IS_OBJECT_ID);
		} else {
			return this.getToken(ClickHouseParser.IS_OBJECT_ID, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_dictionaryAttrDfnt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDictionaryAttrDfnt) {
			listener.enterDictionaryAttrDfnt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDictionaryAttrDfnt) {
			listener.exitDictionaryAttrDfnt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDictionaryAttrDfnt) {
			return visitor.visitDictionaryAttrDfnt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DictionaryEngineClauseContext extends ParserRuleContext {
	public dictionaryPrimaryKeyClause(): DictionaryPrimaryKeyClauseContext | undefined {
		return this.tryGetRuleContext(0, DictionaryPrimaryKeyClauseContext);
	}
	public sourceClause(): SourceClauseContext[];
	public sourceClause(i: number): SourceClauseContext;
	public sourceClause(i?: number): SourceClauseContext | SourceClauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SourceClauseContext);
		} else {
			return this.getRuleContext(i, SourceClauseContext);
		}
	}
	public lifetimeClause(): LifetimeClauseContext[];
	public lifetimeClause(i: number): LifetimeClauseContext;
	public lifetimeClause(i?: number): LifetimeClauseContext | LifetimeClauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LifetimeClauseContext);
		} else {
			return this.getRuleContext(i, LifetimeClauseContext);
		}
	}
	public layoutClause(): LayoutClauseContext[];
	public layoutClause(i: number): LayoutClauseContext;
	public layoutClause(i?: number): LayoutClauseContext | LayoutClauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LayoutClauseContext);
		} else {
			return this.getRuleContext(i, LayoutClauseContext);
		}
	}
	public rangeClause(): RangeClauseContext[];
	public rangeClause(i: number): RangeClauseContext;
	public rangeClause(i?: number): RangeClauseContext | RangeClauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RangeClauseContext);
		} else {
			return this.getRuleContext(i, RangeClauseContext);
		}
	}
	public dictionarySettingsClause(): DictionarySettingsClauseContext[];
	public dictionarySettingsClause(i: number): DictionarySettingsClauseContext;
	public dictionarySettingsClause(i?: number): DictionarySettingsClauseContext | DictionarySettingsClauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DictionarySettingsClauseContext);
		} else {
			return this.getRuleContext(i, DictionarySettingsClauseContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_dictionaryEngineClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDictionaryEngineClause) {
			listener.enterDictionaryEngineClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDictionaryEngineClause) {
			listener.exitDictionaryEngineClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDictionaryEngineClause) {
			return visitor.visitDictionaryEngineClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DictionaryPrimaryKeyClauseContext extends ParserRuleContext {
	public PRIMARY(): TerminalNode { return this.getToken(ClickHouseParser.PRIMARY, 0); }
	public KEY(): TerminalNode { return this.getToken(ClickHouseParser.KEY, 0); }
	public columnExprList(): ColumnExprListContext {
		return this.getRuleContext(0, ColumnExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_dictionaryPrimaryKeyClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDictionaryPrimaryKeyClause) {
			listener.enterDictionaryPrimaryKeyClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDictionaryPrimaryKeyClause) {
			listener.exitDictionaryPrimaryKeyClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDictionaryPrimaryKeyClause) {
			return visitor.visitDictionaryPrimaryKeyClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DictionaryArgExprContext extends ParserRuleContext {
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_dictionaryArgExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDictionaryArgExpr) {
			listener.enterDictionaryArgExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDictionaryArgExpr) {
			listener.exitDictionaryArgExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDictionaryArgExpr) {
			return visitor.visitDictionaryArgExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SourceClauseContext extends ParserRuleContext {
	public SOURCE(): TerminalNode { return this.getToken(ClickHouseParser.SOURCE, 0); }
	public LPAREN(): TerminalNode[];
	public LPAREN(i: number): TerminalNode;
	public LPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.LPAREN);
		} else {
			return this.getToken(ClickHouseParser.LPAREN, i);
		}
	}
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public RPAREN(): TerminalNode[];
	public RPAREN(i: number): TerminalNode;
	public RPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.RPAREN);
		} else {
			return this.getToken(ClickHouseParser.RPAREN, i);
		}
	}
	public dictionaryArgExpr(): DictionaryArgExprContext[];
	public dictionaryArgExpr(i: number): DictionaryArgExprContext;
	public dictionaryArgExpr(i?: number): DictionaryArgExprContext | DictionaryArgExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DictionaryArgExprContext);
		} else {
			return this.getRuleContext(i, DictionaryArgExprContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_sourceClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSourceClause) {
			listener.enterSourceClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSourceClause) {
			listener.exitSourceClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSourceClause) {
			return visitor.visitSourceClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LifetimeClauseContext extends ParserRuleContext {
	public LIFETIME(): TerminalNode { return this.getToken(ClickHouseParser.LIFETIME, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public DECIMAL_LITERAL(): TerminalNode[];
	public DECIMAL_LITERAL(i: number): TerminalNode;
	public DECIMAL_LITERAL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.DECIMAL_LITERAL);
		} else {
			return this.getToken(ClickHouseParser.DECIMAL_LITERAL, i);
		}
	}
	public MIN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MIN, 0); }
	public MAX(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MAX, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_lifetimeClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterLifetimeClause) {
			listener.enterLifetimeClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitLifetimeClause) {
			listener.exitLifetimeClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitLifetimeClause) {
			return visitor.visitLifetimeClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LayoutClauseContext extends ParserRuleContext {
	public LAYOUT(): TerminalNode { return this.getToken(ClickHouseParser.LAYOUT, 0); }
	public LPAREN(): TerminalNode[];
	public LPAREN(i: number): TerminalNode;
	public LPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.LPAREN);
		} else {
			return this.getToken(ClickHouseParser.LPAREN, i);
		}
	}
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public RPAREN(): TerminalNode[];
	public RPAREN(i: number): TerminalNode;
	public RPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.RPAREN);
		} else {
			return this.getToken(ClickHouseParser.RPAREN, i);
		}
	}
	public dictionaryArgExpr(): DictionaryArgExprContext[];
	public dictionaryArgExpr(i: number): DictionaryArgExprContext;
	public dictionaryArgExpr(i?: number): DictionaryArgExprContext | DictionaryArgExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DictionaryArgExprContext);
		} else {
			return this.getRuleContext(i, DictionaryArgExprContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_layoutClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterLayoutClause) {
			listener.enterLayoutClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitLayoutClause) {
			listener.exitLayoutClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitLayoutClause) {
			return visitor.visitLayoutClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RangeClauseContext extends ParserRuleContext {
	public RANGE(): TerminalNode { return this.getToken(ClickHouseParser.RANGE, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public MIN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MIN, 0); }
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public MAX(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MAX, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_rangeClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterRangeClause) {
			listener.enterRangeClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitRangeClause) {
			listener.exitRangeClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitRangeClause) {
			return visitor.visitRangeClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DictionarySettingsClauseContext extends ParserRuleContext {
	public SETTINGS(): TerminalNode { return this.getToken(ClickHouseParser.SETTINGS, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public settingExprList(): SettingExprListContext {
		return this.getRuleContext(0, SettingExprListContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_dictionarySettingsClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDictionarySettingsClause) {
			listener.enterDictionarySettingsClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDictionarySettingsClause) {
			listener.exitDictionarySettingsClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDictionarySettingsClause) {
			return visitor.visitDictionarySettingsClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClusterClauseContext extends ParserRuleContext {
	public ON(): TerminalNode { return this.getToken(ClickHouseParser.ON, 0); }
	public CLUSTER(): TerminalNode { return this.getToken(ClickHouseParser.CLUSTER, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_clusterClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterClusterClause) {
			listener.enterClusterClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitClusterClause) {
			listener.exitClusterClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitClusterClause) {
			return visitor.visitClusterClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UuidClauseContext extends ParserRuleContext {
	public UUID(): TerminalNode { return this.getToken(ClickHouseParser.UUID, 0); }
	public STRING_LITERAL(): TerminalNode { return this.getToken(ClickHouseParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_uuidClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterUuidClause) {
			listener.enterUuidClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitUuidClause) {
			listener.exitUuidClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitUuidClause) {
			return visitor.visitUuidClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DestinationClauseContext extends ParserRuleContext {
	public TO(): TerminalNode { return this.getToken(ClickHouseParser.TO, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_destinationClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDestinationClause) {
			listener.enterDestinationClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDestinationClause) {
			listener.exitDestinationClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDestinationClause) {
			return visitor.visitDestinationClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SubqueryClauseContext extends ParserRuleContext {
	public AS(): TerminalNode { return this.getToken(ClickHouseParser.AS, 0); }
	public selectUnionStmt(): SelectUnionStmtContext {
		return this.getRuleContext(0, SelectUnionStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_subqueryClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSubqueryClause) {
			listener.enterSubqueryClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSubqueryClause) {
			listener.exitSubqueryClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSubqueryClause) {
			return visitor.visitSubqueryClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableSchemaClauseContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableSchemaClause; }
	public copyFrom(ctx: TableSchemaClauseContext): void {
		super.copyFrom(ctx);
	}
}
export class SchemaDescriptionClauseContext extends TableSchemaClauseContext {
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public tableElementExpr(): TableElementExprContext[];
	public tableElementExpr(i: number): TableElementExprContext;
	public tableElementExpr(i?: number): TableElementExprContext | TableElementExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TableElementExprContext);
		} else {
			return this.getRuleContext(i, TableElementExprContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(ctx: TableSchemaClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSchemaDescriptionClause) {
			listener.enterSchemaDescriptionClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSchemaDescriptionClause) {
			listener.exitSchemaDescriptionClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSchemaDescriptionClause) {
			return visitor.visitSchemaDescriptionClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SchemaAsTableClauseContext extends TableSchemaClauseContext {
	public AS(): TerminalNode { return this.getToken(ClickHouseParser.AS, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	constructor(ctx: TableSchemaClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSchemaAsTableClause) {
			listener.enterSchemaAsTableClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSchemaAsTableClause) {
			listener.exitSchemaAsTableClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSchemaAsTableClause) {
			return visitor.visitSchemaAsTableClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SchemaAsFunctionClauseContext extends TableSchemaClauseContext {
	public AS(): TerminalNode { return this.getToken(ClickHouseParser.AS, 0); }
	public tableFunctionExpr(): TableFunctionExprContext {
		return this.getRuleContext(0, TableFunctionExprContext);
	}
	constructor(ctx: TableSchemaClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSchemaAsFunctionClause) {
			listener.enterSchemaAsFunctionClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSchemaAsFunctionClause) {
			listener.exitSchemaAsFunctionClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSchemaAsFunctionClause) {
			return visitor.visitSchemaAsFunctionClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EngineClauseContext extends ParserRuleContext {
	public engineExpr(): EngineExprContext {
		return this.getRuleContext(0, EngineExprContext);
	}
	public orderByClause(): OrderByClauseContext | undefined {
		return this.tryGetRuleContext(0, OrderByClauseContext);
	}
	public partitionByClause(): PartitionByClauseContext | undefined {
		return this.tryGetRuleContext(0, PartitionByClauseContext);
	}
	public primaryKeyClause(): PrimaryKeyClauseContext | undefined {
		return this.tryGetRuleContext(0, PrimaryKeyClauseContext);
	}
	public sampleByClause(): SampleByClauseContext | undefined {
		return this.tryGetRuleContext(0, SampleByClauseContext);
	}
	public ttlClause(): TtlClauseContext | undefined {
		return this.tryGetRuleContext(0, TtlClauseContext);
	}
	public settingsClause(): SettingsClauseContext | undefined {
		return this.tryGetRuleContext(0, SettingsClauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_engineClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterEngineClause) {
			listener.enterEngineClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitEngineClause) {
			listener.exitEngineClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitEngineClause) {
			return visitor.visitEngineClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PartitionByClauseContext extends ParserRuleContext {
	public PARTITION(): TerminalNode { return this.getToken(ClickHouseParser.PARTITION, 0); }
	public BY(): TerminalNode { return this.getToken(ClickHouseParser.BY, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_partitionByClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterPartitionByClause) {
			listener.enterPartitionByClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitPartitionByClause) {
			listener.exitPartitionByClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitPartitionByClause) {
			return visitor.visitPartitionByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryKeyClauseContext extends ParserRuleContext {
	public PRIMARY(): TerminalNode { return this.getToken(ClickHouseParser.PRIMARY, 0); }
	public KEY(): TerminalNode { return this.getToken(ClickHouseParser.KEY, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_primaryKeyClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterPrimaryKeyClause) {
			listener.enterPrimaryKeyClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitPrimaryKeyClause) {
			listener.exitPrimaryKeyClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitPrimaryKeyClause) {
			return visitor.visitPrimaryKeyClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SampleByClauseContext extends ParserRuleContext {
	public SAMPLE(): TerminalNode { return this.getToken(ClickHouseParser.SAMPLE, 0); }
	public BY(): TerminalNode { return this.getToken(ClickHouseParser.BY, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_sampleByClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSampleByClause) {
			listener.enterSampleByClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSampleByClause) {
			listener.exitSampleByClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSampleByClause) {
			return visitor.visitSampleByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TtlClauseContext extends ParserRuleContext {
	public TTL(): TerminalNode { return this.getToken(ClickHouseParser.TTL, 0); }
	public ttlExpr(): TtlExprContext[];
	public ttlExpr(i: number): TtlExprContext;
	public ttlExpr(i?: number): TtlExprContext | TtlExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TtlExprContext);
		} else {
			return this.getRuleContext(i, TtlExprContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_ttlClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTtlClause) {
			listener.enterTtlClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTtlClause) {
			listener.exitTtlClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTtlClause) {
			return visitor.visitTtlClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EngineExprContext extends ParserRuleContext {
	public ENGINE(): TerminalNode { return this.getToken(ClickHouseParser.ENGINE, 0); }
	public identifierOrNull(): IdentifierOrNullContext {
		return this.getRuleContext(0, IdentifierOrNullContext);
	}
	public EQ_SINGLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EQ_SINGLE, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RPAREN, 0); }
	public columnExprList(): ColumnExprListContext | undefined {
		return this.tryGetRuleContext(0, ColumnExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_engineExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterEngineExpr) {
			listener.enterEngineExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitEngineExpr) {
			listener.exitEngineExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitEngineExpr) {
			return visitor.visitEngineExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableElementExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableElementExpr; }
	public copyFrom(ctx: TableElementExprContext): void {
		super.copyFrom(ctx);
	}
}
export class TableElementExprColumnContext extends TableElementExprContext {
	public tableColumnDfnt(): TableColumnDfntContext {
		return this.getRuleContext(0, TableColumnDfntContext);
	}
	constructor(ctx: TableElementExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableElementExprColumn) {
			listener.enterTableElementExprColumn(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableElementExprColumn) {
			listener.exitTableElementExprColumn(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableElementExprColumn) {
			return visitor.visitTableElementExprColumn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TableElementExprConstraintContext extends TableElementExprContext {
	public CONSTRAINT(): TerminalNode { return this.getToken(ClickHouseParser.CONSTRAINT, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public CHECK(): TerminalNode { return this.getToken(ClickHouseParser.CHECK, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(ctx: TableElementExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableElementExprConstraint) {
			listener.enterTableElementExprConstraint(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableElementExprConstraint) {
			listener.exitTableElementExprConstraint(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableElementExprConstraint) {
			return visitor.visitTableElementExprConstraint(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TableElementExprIndexContext extends TableElementExprContext {
	public INDEX(): TerminalNode { return this.getToken(ClickHouseParser.INDEX, 0); }
	public tableIndexDfnt(): TableIndexDfntContext {
		return this.getRuleContext(0, TableIndexDfntContext);
	}
	constructor(ctx: TableElementExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableElementExprIndex) {
			listener.enterTableElementExprIndex(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableElementExprIndex) {
			listener.exitTableElementExprIndex(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableElementExprIndex) {
			return visitor.visitTableElementExprIndex(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TableElementExprProjectionContext extends TableElementExprContext {
	public PROJECTION(): TerminalNode { return this.getToken(ClickHouseParser.PROJECTION, 0); }
	public tableProjectionDfnt(): TableProjectionDfntContext {
		return this.getRuleContext(0, TableProjectionDfntContext);
	}
	constructor(ctx: TableElementExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableElementExprProjection) {
			listener.enterTableElementExprProjection(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableElementExprProjection) {
			listener.exitTableElementExprProjection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableElementExprProjection) {
			return visitor.visitTableElementExprProjection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableColumnDfntContext extends ParserRuleContext {
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public columnTypeExpr(): ColumnTypeExprContext | undefined {
		return this.tryGetRuleContext(0, ColumnTypeExprContext);
	}
	public tableColumnPropertyExpr(): TableColumnPropertyExprContext | undefined {
		return this.tryGetRuleContext(0, TableColumnPropertyExprContext);
	}
	public COMMENT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.COMMENT, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.STRING_LITERAL, 0); }
	public codecExpr(): CodecExprContext | undefined {
		return this.tryGetRuleContext(0, CodecExprContext);
	}
	public TTL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TTL, 0); }
	public columnExpr(): ColumnExprContext | undefined {
		return this.tryGetRuleContext(0, ColumnExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableColumnDfnt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableColumnDfnt) {
			listener.enterTableColumnDfnt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableColumnDfnt) {
			listener.exitTableColumnDfnt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableColumnDfnt) {
			return visitor.visitTableColumnDfnt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableColumnPropertyExprContext extends ParserRuleContext {
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DEFAULT, 0); }
	public MATERIALIZED(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MATERIALIZED, 0); }
	public ALIAS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ALIAS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableColumnPropertyExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableColumnPropertyExpr) {
			listener.enterTableColumnPropertyExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableColumnPropertyExpr) {
			listener.exitTableColumnPropertyExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableColumnPropertyExpr) {
			return visitor.visitTableColumnPropertyExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableIndexDfntContext extends ParserRuleContext {
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public TYPE(): TerminalNode { return this.getToken(ClickHouseParser.TYPE, 0); }
	public columnTypeExpr(): ColumnTypeExprContext {
		return this.getRuleContext(0, ColumnTypeExprContext);
	}
	public GRANULARITY(): TerminalNode { return this.getToken(ClickHouseParser.GRANULARITY, 0); }
	public DECIMAL_LITERAL(): TerminalNode { return this.getToken(ClickHouseParser.DECIMAL_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableIndexDfnt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableIndexDfnt) {
			listener.enterTableIndexDfnt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableIndexDfnt) {
			listener.exitTableIndexDfnt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableIndexDfnt) {
			return visitor.visitTableIndexDfnt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableProjectionDfntContext extends ParserRuleContext {
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public projectionSelectStmt(): ProjectionSelectStmtContext {
		return this.getRuleContext(0, ProjectionSelectStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableProjectionDfnt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableProjectionDfnt) {
			listener.enterTableProjectionDfnt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableProjectionDfnt) {
			listener.exitTableProjectionDfnt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableProjectionDfnt) {
			return visitor.visitTableProjectionDfnt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodecExprContext extends ParserRuleContext {
	public CODEC(): TerminalNode { return this.getToken(ClickHouseParser.CODEC, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public codecArgExpr(): CodecArgExprContext[];
	public codecArgExpr(i: number): CodecArgExprContext;
	public codecArgExpr(i?: number): CodecArgExprContext | CodecArgExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CodecArgExprContext);
		} else {
			return this.getRuleContext(i, CodecArgExprContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_codecExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterCodecExpr) {
			listener.enterCodecExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitCodecExpr) {
			listener.exitCodecExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitCodecExpr) {
			return visitor.visitCodecExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodecArgExprContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RPAREN, 0); }
	public columnExprList(): ColumnExprListContext | undefined {
		return this.tryGetRuleContext(0, ColumnExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_codecArgExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterCodecArgExpr) {
			listener.enterCodecArgExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitCodecArgExpr) {
			listener.exitCodecArgExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitCodecArgExpr) {
			return visitor.visitCodecArgExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TtlExprContext extends ParserRuleContext {
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public DELETE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DELETE, 0); }
	public TO(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TO, 0); }
	public DISK(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DISK, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.STRING_LITERAL, 0); }
	public VOLUME(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.VOLUME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_ttlExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTtlExpr) {
			listener.enterTtlExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTtlExpr) {
			listener.exitTtlExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTtlExpr) {
			return visitor.visitTtlExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DescribeStmtContext extends ParserRuleContext {
	public tableExpr(): TableExprContext {
		return this.getRuleContext(0, TableExprContext);
	}
	public DESCRIBE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DESCRIBE, 0); }
	public DESC(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DESC, 0); }
	public TABLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TABLE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_describeStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDescribeStmt) {
			listener.enterDescribeStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDescribeStmt) {
			listener.exitDescribeStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDescribeStmt) {
			return visitor.visitDescribeStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DropStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_dropStmt; }
	public copyFrom(ctx: DropStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class DropDatabaseStmtContext extends DropStmtContext {
	public DATABASE(): TerminalNode { return this.getToken(ClickHouseParser.DATABASE, 0); }
	public databaseIdentifier(): DatabaseIdentifierContext {
		return this.getRuleContext(0, DatabaseIdentifierContext);
	}
	public DETACH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DETACH, 0); }
	public DROP(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DROP, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	constructor(ctx: DropStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDropDatabaseStmt) {
			listener.enterDropDatabaseStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDropDatabaseStmt) {
			listener.exitDropDatabaseStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDropDatabaseStmt) {
			return visitor.visitDropDatabaseStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DropTableStmtContext extends DropStmtContext {
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public DETACH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DETACH, 0); }
	public DROP(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DROP, 0); }
	public DICTIONARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DICTIONARY, 0); }
	public TABLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TABLE, 0); }
	public VIEW(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.VIEW, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	public NO(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NO, 0); }
	public DELAY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DELAY, 0); }
	public TEMPORARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TEMPORARY, 0); }
	constructor(ctx: DropStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDropTableStmt) {
			listener.enterDropTableStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDropTableStmt) {
			listener.exitDropTableStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDropTableStmt) {
			return visitor.visitDropTableStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExistsStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_existsStmt; }
	public copyFrom(ctx: ExistsStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class ExistsDatabaseStmtContext extends ExistsStmtContext {
	public EXISTS(): TerminalNode { return this.getToken(ClickHouseParser.EXISTS, 0); }
	public DATABASE(): TerminalNode { return this.getToken(ClickHouseParser.DATABASE, 0); }
	public databaseIdentifier(): DatabaseIdentifierContext {
		return this.getRuleContext(0, DatabaseIdentifierContext);
	}
	constructor(ctx: ExistsStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterExistsDatabaseStmt) {
			listener.enterExistsDatabaseStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitExistsDatabaseStmt) {
			listener.exitExistsDatabaseStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitExistsDatabaseStmt) {
			return visitor.visitExistsDatabaseStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExistsTableStmtContext extends ExistsStmtContext {
	public EXISTS(): TerminalNode { return this.getToken(ClickHouseParser.EXISTS, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public DICTIONARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DICTIONARY, 0); }
	public TABLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TABLE, 0); }
	public VIEW(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.VIEW, 0); }
	public TEMPORARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TEMPORARY, 0); }
	constructor(ctx: ExistsStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterExistsTableStmt) {
			listener.enterExistsTableStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitExistsTableStmt) {
			listener.exitExistsTableStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitExistsTableStmt) {
			return visitor.visitExistsTableStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExplainStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_explainStmt; }
	public copyFrom(ctx: ExplainStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class ExplainASTStmtContext extends ExplainStmtContext {
	public EXPLAIN(): TerminalNode { return this.getToken(ClickHouseParser.EXPLAIN, 0); }
	public AST(): TerminalNode { return this.getToken(ClickHouseParser.AST, 0); }
	public query(): QueryContext {
		return this.getRuleContext(0, QueryContext);
	}
	constructor(ctx: ExplainStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterExplainASTStmt) {
			listener.enterExplainASTStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitExplainASTStmt) {
			listener.exitExplainASTStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitExplainASTStmt) {
			return visitor.visitExplainASTStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExplainSyntaxStmtContext extends ExplainStmtContext {
	public EXPLAIN(): TerminalNode { return this.getToken(ClickHouseParser.EXPLAIN, 0); }
	public SYNTAX(): TerminalNode { return this.getToken(ClickHouseParser.SYNTAX, 0); }
	public query(): QueryContext {
		return this.getRuleContext(0, QueryContext);
	}
	constructor(ctx: ExplainStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterExplainSyntaxStmt) {
			listener.enterExplainSyntaxStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitExplainSyntaxStmt) {
			listener.exitExplainSyntaxStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitExplainSyntaxStmt) {
			return visitor.visitExplainSyntaxStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InsertStmtContext extends ParserRuleContext {
	public INSERT(): TerminalNode { return this.getToken(ClickHouseParser.INSERT, 0); }
	public INTO(): TerminalNode { return this.getToken(ClickHouseParser.INTO, 0); }
	public dataClause(): DataClauseContext {
		return this.getRuleContext(0, DataClauseContext);
	}
	public tableIdentifier(): TableIdentifierContext | undefined {
		return this.tryGetRuleContext(0, TableIdentifierContext);
	}
	public FUNCTION(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FUNCTION, 0); }
	public tableFunctionExpr(): TableFunctionExprContext | undefined {
		return this.tryGetRuleContext(0, TableFunctionExprContext);
	}
	public TABLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TABLE, 0); }
	public columnsClause(): ColumnsClauseContext | undefined {
		return this.tryGetRuleContext(0, ColumnsClauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_insertStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterInsertStmt) {
			listener.enterInsertStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitInsertStmt) {
			listener.exitInsertStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitInsertStmt) {
			return visitor.visitInsertStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnsClauseContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public nestedIdentifier(): NestedIdentifierContext[];
	public nestedIdentifier(i: number): NestedIdentifierContext;
	public nestedIdentifier(i?: number): NestedIdentifierContext | NestedIdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NestedIdentifierContext);
		} else {
			return this.getRuleContext(i, NestedIdentifierContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_columnsClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnsClause) {
			listener.enterColumnsClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnsClause) {
			listener.exitColumnsClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnsClause) {
			return visitor.visitColumnsClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DataClauseContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_dataClause; }
	public copyFrom(ctx: DataClauseContext): void {
		super.copyFrom(ctx);
	}
}
export class DataClauseFormatContext extends DataClauseContext {
	public FORMAT(): TerminalNode { return this.getToken(ClickHouseParser.FORMAT, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(ctx: DataClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDataClauseFormat) {
			listener.enterDataClauseFormat(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDataClauseFormat) {
			listener.exitDataClauseFormat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDataClauseFormat) {
			return visitor.visitDataClauseFormat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DataClauseValuesContext extends DataClauseContext {
	public VALUES(): TerminalNode { return this.getToken(ClickHouseParser.VALUES, 0); }
	constructor(ctx: DataClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDataClauseValues) {
			listener.enterDataClauseValues(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDataClauseValues) {
			listener.exitDataClauseValues(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDataClauseValues) {
			return visitor.visitDataClauseValues(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DataClauseSelectContext extends DataClauseContext {
	public selectUnionStmt(): SelectUnionStmtContext {
		return this.getRuleContext(0, SelectUnionStmtContext);
	}
	public EOF(): TerminalNode { return this.getToken(ClickHouseParser.EOF, 0); }
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SEMICOLON, 0); }
	constructor(ctx: DataClauseContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDataClauseSelect) {
			listener.enterDataClauseSelect(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDataClauseSelect) {
			listener.exitDataClauseSelect(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDataClauseSelect) {
			return visitor.visitDataClauseSelect(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KillStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_killStmt; }
	public copyFrom(ctx: KillStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class KillMutationStmtContext extends KillStmtContext {
	public KILL(): TerminalNode { return this.getToken(ClickHouseParser.KILL, 0); }
	public MUTATION(): TerminalNode { return this.getToken(ClickHouseParser.MUTATION, 0); }
	public whereClause(): WhereClauseContext {
		return this.getRuleContext(0, WhereClauseContext);
	}
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	public SYNC(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SYNC, 0); }
	public ASYNC(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ASYNC, 0); }
	public TEST(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TEST, 0); }
	constructor(ctx: KillStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterKillMutationStmt) {
			listener.enterKillMutationStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitKillMutationStmt) {
			listener.exitKillMutationStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitKillMutationStmt) {
			return visitor.visitKillMutationStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptimizeStmtContext extends ParserRuleContext {
	public OPTIMIZE(): TerminalNode { return this.getToken(ClickHouseParser.OPTIMIZE, 0); }
	public TABLE(): TerminalNode { return this.getToken(ClickHouseParser.TABLE, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	public partitionClause(): PartitionClauseContext | undefined {
		return this.tryGetRuleContext(0, PartitionClauseContext);
	}
	public FINAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FINAL, 0); }
	public DEDUPLICATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DEDUPLICATE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_optimizeStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterOptimizeStmt) {
			listener.enterOptimizeStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitOptimizeStmt) {
			listener.exitOptimizeStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitOptimizeStmt) {
			return visitor.visitOptimizeStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RenameStmtContext extends ParserRuleContext {
	public RENAME(): TerminalNode { return this.getToken(ClickHouseParser.RENAME, 0); }
	public TABLE(): TerminalNode { return this.getToken(ClickHouseParser.TABLE, 0); }
	public tableIdentifier(): TableIdentifierContext[];
	public tableIdentifier(i: number): TableIdentifierContext;
	public tableIdentifier(i?: number): TableIdentifierContext | TableIdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TableIdentifierContext);
		} else {
			return this.getRuleContext(i, TableIdentifierContext);
		}
	}
	public TO(): TerminalNode[];
	public TO(i: number): TerminalNode;
	public TO(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.TO);
		} else {
			return this.getToken(ClickHouseParser.TO, i);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_renameStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterRenameStmt) {
			listener.enterRenameStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitRenameStmt) {
			listener.exitRenameStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitRenameStmt) {
			return visitor.visitRenameStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ProjectionSelectStmtContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public SELECT(): TerminalNode { return this.getToken(ClickHouseParser.SELECT, 0); }
	public columnExprList(): ColumnExprListContext {
		return this.getRuleContext(0, ColumnExprListContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public withClause(): WithClauseContext | undefined {
		return this.tryGetRuleContext(0, WithClauseContext);
	}
	public groupByClause(): GroupByClauseContext | undefined {
		return this.tryGetRuleContext(0, GroupByClauseContext);
	}
	public projectionOrderByClause(): ProjectionOrderByClauseContext | undefined {
		return this.tryGetRuleContext(0, ProjectionOrderByClauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_projectionSelectStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterProjectionSelectStmt) {
			listener.enterProjectionSelectStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitProjectionSelectStmt) {
			listener.exitProjectionSelectStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitProjectionSelectStmt) {
			return visitor.visitProjectionSelectStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectUnionStmtContext extends ParserRuleContext {
	public selectStmtWithParens(): SelectStmtWithParensContext[];
	public selectStmtWithParens(i: number): SelectStmtWithParensContext;
	public selectStmtWithParens(i?: number): SelectStmtWithParensContext | SelectStmtWithParensContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SelectStmtWithParensContext);
		} else {
			return this.getRuleContext(i, SelectStmtWithParensContext);
		}
	}
	public UNION(): TerminalNode[];
	public UNION(i: number): TerminalNode;
	public UNION(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.UNION);
		} else {
			return this.getToken(ClickHouseParser.UNION, i);
		}
	}
	public ALL(): TerminalNode[];
	public ALL(i: number): TerminalNode;
	public ALL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.ALL);
		} else {
			return this.getToken(ClickHouseParser.ALL, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_selectUnionStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSelectUnionStmt) {
			listener.enterSelectUnionStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSelectUnionStmt) {
			listener.exitSelectUnionStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSelectUnionStmt) {
			return visitor.visitSelectUnionStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectStmtWithParensContext extends ParserRuleContext {
	public selectStmt(): SelectStmtContext | undefined {
		return this.tryGetRuleContext(0, SelectStmtContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LPAREN, 0); }
	public selectUnionStmt(): SelectUnionStmtContext | undefined {
		return this.tryGetRuleContext(0, SelectUnionStmtContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_selectStmtWithParens; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSelectStmtWithParens) {
			listener.enterSelectStmtWithParens(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSelectStmtWithParens) {
			listener.exitSelectStmtWithParens(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSelectStmtWithParens) {
			return visitor.visitSelectStmtWithParens(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_selectStmt; }
	public copyFrom(ctx: SelectStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class RegularQuerySpecificationContext extends SelectStmtContext {
	public SELECT(): TerminalNode { return this.getToken(ClickHouseParser.SELECT, 0); }
	public columnExprList(): ColumnExprListContext {
		return this.getRuleContext(0, ColumnExprListContext);
	}
	public withClause(): WithClauseContext | undefined {
		return this.tryGetRuleContext(0, WithClauseContext);
	}
	public DISTINCT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DISTINCT, 0); }
	public topClause(): TopClauseContext | undefined {
		return this.tryGetRuleContext(0, TopClauseContext);
	}
	public fromClause(): FromClauseContext | undefined {
		return this.tryGetRuleContext(0, FromClauseContext);
	}
	public arrayJoinClause(): ArrayJoinClauseContext | undefined {
		return this.tryGetRuleContext(0, ArrayJoinClauseContext);
	}
	public windowClause(): WindowClauseContext | undefined {
		return this.tryGetRuleContext(0, WindowClauseContext);
	}
	public prewhereClause(): PrewhereClauseContext | undefined {
		return this.tryGetRuleContext(0, PrewhereClauseContext);
	}
	public whereClause(): WhereClauseContext | undefined {
		return this.tryGetRuleContext(0, WhereClauseContext);
	}
	public groupByClause(): GroupByClauseContext | undefined {
		return this.tryGetRuleContext(0, GroupByClauseContext);
	}
	public WITH(): TerminalNode[];
	public WITH(i: number): TerminalNode;
	public WITH(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.WITH);
		} else {
			return this.getToken(ClickHouseParser.WITH, i);
		}
	}
	public TOTALS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TOTALS, 0); }
	public havingClause(): HavingClauseContext | undefined {
		return this.tryGetRuleContext(0, HavingClauseContext);
	}
	public orderByClause(): OrderByClauseContext | undefined {
		return this.tryGetRuleContext(0, OrderByClauseContext);
	}
	public limitByClause(): LimitByClauseContext | undefined {
		return this.tryGetRuleContext(0, LimitByClauseContext);
	}
	public limitClause(): LimitClauseContext | undefined {
		return this.tryGetRuleContext(0, LimitClauseContext);
	}
	public settingsClause(): SettingsClauseContext | undefined {
		return this.tryGetRuleContext(0, SettingsClauseContext);
	}
	public CUBE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CUBE, 0); }
	public ROLLUP(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ROLLUP, 0); }
	constructor(ctx: SelectStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterRegularQuerySpecification) {
			listener.enterRegularQuerySpecification(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitRegularQuerySpecification) {
			listener.exitRegularQuerySpecification(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitRegularQuerySpecification) {
			return visitor.visitRegularQuerySpecification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WithClauseContext extends ParserRuleContext {
	public WITH(): TerminalNode { return this.getToken(ClickHouseParser.WITH, 0); }
	public columnExprList(): ColumnExprListContext {
		return this.getRuleContext(0, ColumnExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_withClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterWithClause) {
			listener.enterWithClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitWithClause) {
			listener.exitWithClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitWithClause) {
			return visitor.visitWithClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TopClauseContext extends ParserRuleContext {
	public TOP(): TerminalNode { return this.getToken(ClickHouseParser.TOP, 0); }
	public DECIMAL_LITERAL(): TerminalNode { return this.getToken(ClickHouseParser.DECIMAL_LITERAL, 0); }
	public WITH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.WITH, 0); }
	public TIES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TIES, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_topClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTopClause) {
			listener.enterTopClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTopClause) {
			listener.exitTopClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTopClause) {
			return visitor.visitTopClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FromClauseContext extends ParserRuleContext {
	public FROM(): TerminalNode { return this.getToken(ClickHouseParser.FROM, 0); }
	public joinExpr(): JoinExprContext {
		return this.getRuleContext(0, JoinExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_fromClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterFromClause) {
			listener.enterFromClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitFromClause) {
			listener.exitFromClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitFromClause) {
			return visitor.visitFromClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayJoinClauseContext extends ParserRuleContext {
	public ARRAY(): TerminalNode { return this.getToken(ClickHouseParser.ARRAY, 0); }
	public JOIN(): TerminalNode { return this.getToken(ClickHouseParser.JOIN, 0); }
	public columnExprList(): ColumnExprListContext {
		return this.getRuleContext(0, ColumnExprListContext);
	}
	public LEFT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LEFT, 0); }
	public INNER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.INNER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_arrayJoinClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterArrayJoinClause) {
			listener.enterArrayJoinClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitArrayJoinClause) {
			listener.exitArrayJoinClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitArrayJoinClause) {
			return visitor.visitArrayJoinClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WindowClauseContext extends ParserRuleContext {
	public WINDOW(): TerminalNode { return this.getToken(ClickHouseParser.WINDOW, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public AS(): TerminalNode { return this.getToken(ClickHouseParser.AS, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public windowExpr(): WindowExprContext {
		return this.getRuleContext(0, WindowExprContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_windowClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterWindowClause) {
			listener.enterWindowClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitWindowClause) {
			listener.exitWindowClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitWindowClause) {
			return visitor.visitWindowClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrewhereClauseContext extends ParserRuleContext {
	public PREWHERE(): TerminalNode { return this.getToken(ClickHouseParser.PREWHERE, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_prewhereClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterPrewhereClause) {
			listener.enterPrewhereClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitPrewhereClause) {
			listener.exitPrewhereClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitPrewhereClause) {
			return visitor.visitPrewhereClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhereClauseContext extends ParserRuleContext {
	public WHERE(): TerminalNode { return this.getToken(ClickHouseParser.WHERE, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_whereClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterWhereClause) {
			listener.enterWhereClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitWhereClause) {
			listener.exitWhereClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitWhereClause) {
			return visitor.visitWhereClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupByClauseContext extends ParserRuleContext {
	public GROUP(): TerminalNode { return this.getToken(ClickHouseParser.GROUP, 0); }
	public BY(): TerminalNode { return this.getToken(ClickHouseParser.BY, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LPAREN, 0); }
	public columnExprList(): ColumnExprListContext | undefined {
		return this.tryGetRuleContext(0, ColumnExprListContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RPAREN, 0); }
	public CUBE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CUBE, 0); }
	public ROLLUP(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ROLLUP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_groupByClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterGroupByClause) {
			listener.enterGroupByClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitGroupByClause) {
			listener.exitGroupByClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitGroupByClause) {
			return visitor.visitGroupByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class HavingClauseContext extends ParserRuleContext {
	public HAVING(): TerminalNode { return this.getToken(ClickHouseParser.HAVING, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_havingClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterHavingClause) {
			listener.enterHavingClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitHavingClause) {
			listener.exitHavingClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitHavingClause) {
			return visitor.visitHavingClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OrderByClauseContext extends ParserRuleContext {
	public ORDER(): TerminalNode { return this.getToken(ClickHouseParser.ORDER, 0); }
	public BY(): TerminalNode { return this.getToken(ClickHouseParser.BY, 0); }
	public orderExprList(): OrderExprListContext {
		return this.getRuleContext(0, OrderExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_orderByClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterOrderByClause) {
			listener.enterOrderByClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitOrderByClause) {
			listener.exitOrderByClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitOrderByClause) {
			return visitor.visitOrderByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ProjectionOrderByClauseContext extends ParserRuleContext {
	public ORDER(): TerminalNode { return this.getToken(ClickHouseParser.ORDER, 0); }
	public BY(): TerminalNode { return this.getToken(ClickHouseParser.BY, 0); }
	public columnExprList(): ColumnExprListContext {
		return this.getRuleContext(0, ColumnExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_projectionOrderByClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterProjectionOrderByClause) {
			listener.enterProjectionOrderByClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitProjectionOrderByClause) {
			listener.exitProjectionOrderByClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitProjectionOrderByClause) {
			return visitor.visitProjectionOrderByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LimitByClauseContext extends ParserRuleContext {
	public LIMIT(): TerminalNode { return this.getToken(ClickHouseParser.LIMIT, 0); }
	public limitExpr(): LimitExprContext {
		return this.getRuleContext(0, LimitExprContext);
	}
	public BY(): TerminalNode { return this.getToken(ClickHouseParser.BY, 0); }
	public columnExprList(): ColumnExprListContext {
		return this.getRuleContext(0, ColumnExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_limitByClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterLimitByClause) {
			listener.enterLimitByClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitLimitByClause) {
			listener.exitLimitByClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitLimitByClause) {
			return visitor.visitLimitByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LimitClauseContext extends ParserRuleContext {
	public LIMIT(): TerminalNode { return this.getToken(ClickHouseParser.LIMIT, 0); }
	public limitExpr(): LimitExprContext {
		return this.getRuleContext(0, LimitExprContext);
	}
	public WITH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.WITH, 0); }
	public TIES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TIES, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_limitClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterLimitClause) {
			listener.enterLimitClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitLimitClause) {
			listener.exitLimitClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitLimitClause) {
			return visitor.visitLimitClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SettingsClauseContext extends ParserRuleContext {
	public SETTINGS(): TerminalNode { return this.getToken(ClickHouseParser.SETTINGS, 0); }
	public settingExprList(): SettingExprListContext {
		return this.getRuleContext(0, SettingExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_settingsClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSettingsClause) {
			listener.enterSettingsClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSettingsClause) {
			listener.exitSettingsClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSettingsClause) {
			return visitor.visitSettingsClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JoinExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_joinExpr; }
	public copyFrom(ctx: JoinExprContext): void {
		super.copyFrom(ctx);
	}
}
export class JoinExprOpContext extends JoinExprContext {
	public joinExpr(): JoinExprContext[];
	public joinExpr(i: number): JoinExprContext;
	public joinExpr(i?: number): JoinExprContext | JoinExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(JoinExprContext);
		} else {
			return this.getRuleContext(i, JoinExprContext);
		}
	}
	public JOIN(): TerminalNode { return this.getToken(ClickHouseParser.JOIN, 0); }
	public joinConstraintClause(): JoinConstraintClauseContext {
		return this.getRuleContext(0, JoinConstraintClauseContext);
	}
	public joinOp(): JoinOpContext | undefined {
		return this.tryGetRuleContext(0, JoinOpContext);
	}
	public GLOBAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.GLOBAL, 0); }
	public LOCAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LOCAL, 0); }
	constructor(ctx: JoinExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterJoinExprOp) {
			listener.enterJoinExprOp(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitJoinExprOp) {
			listener.exitJoinExprOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitJoinExprOp) {
			return visitor.visitJoinExprOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class JoinExprCrossOpContext extends JoinExprContext {
	public joinExpr(): JoinExprContext[];
	public joinExpr(i: number): JoinExprContext;
	public joinExpr(i?: number): JoinExprContext | JoinExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(JoinExprContext);
		} else {
			return this.getRuleContext(i, JoinExprContext);
		}
	}
	public joinOpCross(): JoinOpCrossContext {
		return this.getRuleContext(0, JoinOpCrossContext);
	}
	constructor(ctx: JoinExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterJoinExprCrossOp) {
			listener.enterJoinExprCrossOp(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitJoinExprCrossOp) {
			listener.exitJoinExprCrossOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitJoinExprCrossOp) {
			return visitor.visitJoinExprCrossOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class JoinExprTableContext extends JoinExprContext {
	public tableExpr(): TableExprContext {
		return this.getRuleContext(0, TableExprContext);
	}
	public FINAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FINAL, 0); }
	public sampleClause(): SampleClauseContext | undefined {
		return this.tryGetRuleContext(0, SampleClauseContext);
	}
	constructor(ctx: JoinExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterJoinExprTable) {
			listener.enterJoinExprTable(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitJoinExprTable) {
			listener.exitJoinExprTable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitJoinExprTable) {
			return visitor.visitJoinExprTable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class JoinExprParensContext extends JoinExprContext {
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public joinExpr(): JoinExprContext {
		return this.getRuleContext(0, JoinExprContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	constructor(ctx: JoinExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterJoinExprParens) {
			listener.enterJoinExprParens(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitJoinExprParens) {
			listener.exitJoinExprParens(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitJoinExprParens) {
			return visitor.visitJoinExprParens(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JoinOpContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_joinOp; }
	public copyFrom(ctx: JoinOpContext): void {
		super.copyFrom(ctx);
	}
}
export class JoinOpInnerContext extends JoinOpContext {
	public INNER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.INNER, 0); }
	public ALL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ALL, 0); }
	public ANY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ANY, 0); }
	public ASOF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ASOF, 0); }
	constructor(ctx: JoinOpContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterJoinOpInner) {
			listener.enterJoinOpInner(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitJoinOpInner) {
			listener.exitJoinOpInner(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitJoinOpInner) {
			return visitor.visitJoinOpInner(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class JoinOpLeftRightContext extends JoinOpContext {
	public LEFT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LEFT, 0); }
	public RIGHT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RIGHT, 0); }
	public OUTER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OUTER, 0); }
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SEMI, 0); }
	public ALL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ALL, 0); }
	public ANTI(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ANTI, 0); }
	public ANY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ANY, 0); }
	public ASOF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ASOF, 0); }
	constructor(ctx: JoinOpContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterJoinOpLeftRight) {
			listener.enterJoinOpLeftRight(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitJoinOpLeftRight) {
			listener.exitJoinOpLeftRight(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitJoinOpLeftRight) {
			return visitor.visitJoinOpLeftRight(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class JoinOpFullContext extends JoinOpContext {
	public FULL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FULL, 0); }
	public OUTER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OUTER, 0); }
	public ALL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ALL, 0); }
	public ANY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ANY, 0); }
	constructor(ctx: JoinOpContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterJoinOpFull) {
			listener.enterJoinOpFull(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitJoinOpFull) {
			listener.exitJoinOpFull(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitJoinOpFull) {
			return visitor.visitJoinOpFull(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JoinOpCrossContext extends ParserRuleContext {
	public CROSS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CROSS, 0); }
	public JOIN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.JOIN, 0); }
	public GLOBAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.GLOBAL, 0); }
	public LOCAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LOCAL, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.COMMA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_joinOpCross; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterJoinOpCross) {
			listener.enterJoinOpCross(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitJoinOpCross) {
			listener.exitJoinOpCross(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitJoinOpCross) {
			return visitor.visitJoinOpCross(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JoinConstraintClauseContext extends ParserRuleContext {
	public ON(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ON, 0); }
	public columnExprList(): ColumnExprListContext {
		return this.getRuleContext(0, ColumnExprListContext);
	}
	public USING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.USING, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_joinConstraintClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterJoinConstraintClause) {
			listener.enterJoinConstraintClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitJoinConstraintClause) {
			listener.exitJoinConstraintClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitJoinConstraintClause) {
			return visitor.visitJoinConstraintClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SampleClauseContext extends ParserRuleContext {
	public SAMPLE(): TerminalNode { return this.getToken(ClickHouseParser.SAMPLE, 0); }
	public ratioExpr(): RatioExprContext[];
	public ratioExpr(i: number): RatioExprContext;
	public ratioExpr(i?: number): RatioExprContext | RatioExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RatioExprContext);
		} else {
			return this.getRuleContext(i, RatioExprContext);
		}
	}
	public OFFSET(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OFFSET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_sampleClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSampleClause) {
			listener.enterSampleClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSampleClause) {
			listener.exitSampleClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSampleClause) {
			return visitor.visitSampleClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LimitExprContext extends ParserRuleContext {
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.COMMA, 0); }
	public OFFSET(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OFFSET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_limitExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterLimitExpr) {
			listener.enterLimitExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitLimitExpr) {
			listener.exitLimitExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitLimitExpr) {
			return visitor.visitLimitExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OrderExprListContext extends ParserRuleContext {
	public orderExpr(): OrderExprContext[];
	public orderExpr(i: number): OrderExprContext;
	public orderExpr(i?: number): OrderExprContext | OrderExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(OrderExprContext);
		} else {
			return this.getRuleContext(i, OrderExprContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_orderExprList; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterOrderExprList) {
			listener.enterOrderExprList(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitOrderExprList) {
			listener.exitOrderExprList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitOrderExprList) {
			return visitor.visitOrderExprList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OrderExprContext extends ParserRuleContext {
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public NULLS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NULLS, 0); }
	public COLLATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.COLLATE, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.STRING_LITERAL, 0); }
	public ASCENDING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ASCENDING, 0); }
	public DESCENDING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DESCENDING, 0); }
	public DESC(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DESC, 0); }
	public FIRST(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FIRST, 0); }
	public LAST(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LAST, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_orderExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterOrderExpr) {
			listener.enterOrderExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitOrderExpr) {
			listener.exitOrderExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitOrderExpr) {
			return visitor.visitOrderExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RatioExprContext extends ParserRuleContext {
	public numberLiteral(): NumberLiteralContext[];
	public numberLiteral(i: number): NumberLiteralContext;
	public numberLiteral(i?: number): NumberLiteralContext | NumberLiteralContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NumberLiteralContext);
		} else {
			return this.getRuleContext(i, NumberLiteralContext);
		}
	}
	public SLASH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SLASH, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_ratioExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterRatioExpr) {
			listener.enterRatioExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitRatioExpr) {
			listener.exitRatioExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitRatioExpr) {
			return visitor.visitRatioExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SettingExprListContext extends ParserRuleContext {
	public settingExpr(): SettingExprContext[];
	public settingExpr(i: number): SettingExprContext;
	public settingExpr(i?: number): SettingExprContext | SettingExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SettingExprContext);
		} else {
			return this.getRuleContext(i, SettingExprContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_settingExprList; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSettingExprList) {
			listener.enterSettingExprList(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSettingExprList) {
			listener.exitSettingExprList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSettingExprList) {
			return visitor.visitSettingExprList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SettingExprContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public EQ_SINGLE(): TerminalNode { return this.getToken(ClickHouseParser.EQ_SINGLE, 0); }
	public literal(): LiteralContext {
		return this.getRuleContext(0, LiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_settingExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSettingExpr) {
			listener.enterSettingExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSettingExpr) {
			listener.exitSettingExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSettingExpr) {
			return visitor.visitSettingExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WindowExprContext extends ParserRuleContext {
	public winPartitionByClause(): WinPartitionByClauseContext | undefined {
		return this.tryGetRuleContext(0, WinPartitionByClauseContext);
	}
	public winOrderByClause(): WinOrderByClauseContext | undefined {
		return this.tryGetRuleContext(0, WinOrderByClauseContext);
	}
	public winFrameClause(): WinFrameClauseContext | undefined {
		return this.tryGetRuleContext(0, WinFrameClauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_windowExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterWindowExpr) {
			listener.enterWindowExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitWindowExpr) {
			listener.exitWindowExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitWindowExpr) {
			return visitor.visitWindowExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WinPartitionByClauseContext extends ParserRuleContext {
	public PARTITION(): TerminalNode { return this.getToken(ClickHouseParser.PARTITION, 0); }
	public BY(): TerminalNode { return this.getToken(ClickHouseParser.BY, 0); }
	public columnExprList(): ColumnExprListContext {
		return this.getRuleContext(0, ColumnExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_winPartitionByClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterWinPartitionByClause) {
			listener.enterWinPartitionByClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitWinPartitionByClause) {
			listener.exitWinPartitionByClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitWinPartitionByClause) {
			return visitor.visitWinPartitionByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WinOrderByClauseContext extends ParserRuleContext {
	public ORDER(): TerminalNode { return this.getToken(ClickHouseParser.ORDER, 0); }
	public BY(): TerminalNode { return this.getToken(ClickHouseParser.BY, 0); }
	public orderExprList(): OrderExprListContext {
		return this.getRuleContext(0, OrderExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_winOrderByClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterWinOrderByClause) {
			listener.enterWinOrderByClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitWinOrderByClause) {
			listener.exitWinOrderByClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitWinOrderByClause) {
			return visitor.visitWinOrderByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WinFrameClauseContext extends ParserRuleContext {
	public winFrameExtend(): WinFrameExtendContext {
		return this.getRuleContext(0, WinFrameExtendContext);
	}
	public ROWS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ROWS, 0); }
	public RANGE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RANGE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_winFrameClause; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterWinFrameClause) {
			listener.enterWinFrameClause(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitWinFrameClause) {
			listener.exitWinFrameClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitWinFrameClause) {
			return visitor.visitWinFrameClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WinFrameExtendContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_winFrameExtend; }
	public copyFrom(ctx: WinFrameExtendContext): void {
		super.copyFrom(ctx);
	}
}
export class FrameStartContext extends WinFrameExtendContext {
	public winFrameBound(): WinFrameBoundContext {
		return this.getRuleContext(0, WinFrameBoundContext);
	}
	constructor(ctx: WinFrameExtendContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterFrameStart) {
			listener.enterFrameStart(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitFrameStart) {
			listener.exitFrameStart(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitFrameStart) {
			return visitor.visitFrameStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FrameBetweenContext extends WinFrameExtendContext {
	public BETWEEN(): TerminalNode { return this.getToken(ClickHouseParser.BETWEEN, 0); }
	public winFrameBound(): WinFrameBoundContext[];
	public winFrameBound(i: number): WinFrameBoundContext;
	public winFrameBound(i?: number): WinFrameBoundContext | WinFrameBoundContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WinFrameBoundContext);
		} else {
			return this.getRuleContext(i, WinFrameBoundContext);
		}
	}
	public AND(): TerminalNode { return this.getToken(ClickHouseParser.AND, 0); }
	constructor(ctx: WinFrameExtendContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterFrameBetween) {
			listener.enterFrameBetween(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitFrameBetween) {
			listener.exitFrameBetween(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitFrameBetween) {
			return visitor.visitFrameBetween(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WinFrameBoundContext extends ParserRuleContext {
	public CURRENT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CURRENT, 0); }
	public ROW(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ROW, 0); }
	public UNBOUNDED(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.UNBOUNDED, 0); }
	public PRECEDING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.PRECEDING, 0); }
	public FOLLOWING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FOLLOWING, 0); }
	public numberLiteral(): NumberLiteralContext | undefined {
		return this.tryGetRuleContext(0, NumberLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_winFrameBound; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterWinFrameBound) {
			listener.enterWinFrameBound(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitWinFrameBound) {
			listener.exitWinFrameBound(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitWinFrameBound) {
			return visitor.visitWinFrameBound(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SetStmtContext extends ParserRuleContext {
	public SET(): TerminalNode { return this.getToken(ClickHouseParser.SET, 0); }
	public settingExprList(): SettingExprListContext {
		return this.getRuleContext(0, SettingExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_setStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSetStmt) {
			listener.enterSetStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSetStmt) {
			listener.exitSetStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSetStmt) {
			return visitor.visitSetStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ShowStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_showStmt; }
	public copyFrom(ctx: ShowStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class ShowCreateDatabaseStmtContext extends ShowStmtContext {
	public SHOW(): TerminalNode { return this.getToken(ClickHouseParser.SHOW, 0); }
	public CREATE(): TerminalNode { return this.getToken(ClickHouseParser.CREATE, 0); }
	public DATABASE(): TerminalNode { return this.getToken(ClickHouseParser.DATABASE, 0); }
	public databaseIdentifier(): DatabaseIdentifierContext {
		return this.getRuleContext(0, DatabaseIdentifierContext);
	}
	constructor(ctx: ShowStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterShowCreateDatabaseStmt) {
			listener.enterShowCreateDatabaseStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitShowCreateDatabaseStmt) {
			listener.exitShowCreateDatabaseStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitShowCreateDatabaseStmt) {
			return visitor.visitShowCreateDatabaseStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ShowCreateDictionaryStmtContext extends ShowStmtContext {
	public SHOW(): TerminalNode { return this.getToken(ClickHouseParser.SHOW, 0); }
	public CREATE(): TerminalNode { return this.getToken(ClickHouseParser.CREATE, 0); }
	public DICTIONARY(): TerminalNode { return this.getToken(ClickHouseParser.DICTIONARY, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	constructor(ctx: ShowStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterShowCreateDictionaryStmt) {
			listener.enterShowCreateDictionaryStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitShowCreateDictionaryStmt) {
			listener.exitShowCreateDictionaryStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitShowCreateDictionaryStmt) {
			return visitor.visitShowCreateDictionaryStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ShowCreateTableStmtContext extends ShowStmtContext {
	public SHOW(): TerminalNode { return this.getToken(ClickHouseParser.SHOW, 0); }
	public CREATE(): TerminalNode { return this.getToken(ClickHouseParser.CREATE, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public TEMPORARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TEMPORARY, 0); }
	public TABLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TABLE, 0); }
	constructor(ctx: ShowStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterShowCreateTableStmt) {
			listener.enterShowCreateTableStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitShowCreateTableStmt) {
			listener.exitShowCreateTableStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitShowCreateTableStmt) {
			return visitor.visitShowCreateTableStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ShowDatabasesStmtContext extends ShowStmtContext {
	public SHOW(): TerminalNode { return this.getToken(ClickHouseParser.SHOW, 0); }
	public DATABASES(): TerminalNode { return this.getToken(ClickHouseParser.DATABASES, 0); }
	constructor(ctx: ShowStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterShowDatabasesStmt) {
			listener.enterShowDatabasesStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitShowDatabasesStmt) {
			listener.exitShowDatabasesStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitShowDatabasesStmt) {
			return visitor.visitShowDatabasesStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ShowDictionariesStmtContext extends ShowStmtContext {
	public SHOW(): TerminalNode { return this.getToken(ClickHouseParser.SHOW, 0); }
	public DICTIONARIES(): TerminalNode { return this.getToken(ClickHouseParser.DICTIONARIES, 0); }
	public FROM(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FROM, 0); }
	public databaseIdentifier(): DatabaseIdentifierContext | undefined {
		return this.tryGetRuleContext(0, DatabaseIdentifierContext);
	}
	constructor(ctx: ShowStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterShowDictionariesStmt) {
			listener.enterShowDictionariesStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitShowDictionariesStmt) {
			listener.exitShowDictionariesStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitShowDictionariesStmt) {
			return visitor.visitShowDictionariesStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ShowTablesStmtContext extends ShowStmtContext {
	public SHOW(): TerminalNode { return this.getToken(ClickHouseParser.SHOW, 0); }
	public TABLES(): TerminalNode { return this.getToken(ClickHouseParser.TABLES, 0); }
	public TEMPORARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TEMPORARY, 0); }
	public databaseIdentifier(): DatabaseIdentifierContext | undefined {
		return this.tryGetRuleContext(0, DatabaseIdentifierContext);
	}
	public LIKE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LIKE, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.STRING_LITERAL, 0); }
	public whereClause(): WhereClauseContext | undefined {
		return this.tryGetRuleContext(0, WhereClauseContext);
	}
	public limitClause(): LimitClauseContext | undefined {
		return this.tryGetRuleContext(0, LimitClauseContext);
	}
	public FROM(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FROM, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IN, 0); }
	constructor(ctx: ShowStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterShowTablesStmt) {
			listener.enterShowTablesStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitShowTablesStmt) {
			listener.exitShowTablesStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitShowTablesStmt) {
			return visitor.visitShowTablesStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SystemStmtContext extends ParserRuleContext {
	public SYSTEM(): TerminalNode { return this.getToken(ClickHouseParser.SYSTEM, 0); }
	public FLUSH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FLUSH, 0); }
	public DISTRIBUTED(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DISTRIBUTED, 0); }
	public tableIdentifier(): TableIdentifierContext | undefined {
		return this.tryGetRuleContext(0, TableIdentifierContext);
	}
	public LOGS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LOGS, 0); }
	public RELOAD(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RELOAD, 0); }
	public DICTIONARIES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DICTIONARIES, 0); }
	public DICTIONARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DICTIONARY, 0); }
	public START(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.START, 0); }
	public STOP(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.STOP, 0); }
	public SENDS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SENDS, 0); }
	public FETCHES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FETCHES, 0); }
	public MERGES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MERGES, 0); }
	public TTL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TTL, 0); }
	public REPLICATED(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.REPLICATED, 0); }
	public SYNC(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SYNC, 0); }
	public REPLICA(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.REPLICA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_systemStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterSystemStmt) {
			listener.enterSystemStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitSystemStmt) {
			listener.exitSystemStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitSystemStmt) {
			return visitor.visitSystemStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TruncateStmtContext extends ParserRuleContext {
	public TRUNCATE(): TerminalNode { return this.getToken(ClickHouseParser.TRUNCATE, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public TEMPORARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TEMPORARY, 0); }
	public TABLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TABLE, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public clusterClause(): ClusterClauseContext | undefined {
		return this.tryGetRuleContext(0, ClusterClauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_truncateStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTruncateStmt) {
			listener.enterTruncateStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTruncateStmt) {
			listener.exitTruncateStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTruncateStmt) {
			return visitor.visitTruncateStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UseStmtContext extends ParserRuleContext {
	public USE(): TerminalNode { return this.getToken(ClickHouseParser.USE, 0); }
	public databaseIdentifier(): DatabaseIdentifierContext {
		return this.getRuleContext(0, DatabaseIdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_useStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterUseStmt) {
			listener.enterUseStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitUseStmt) {
			listener.exitUseStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitUseStmt) {
			return visitor.visitUseStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WatchStmtContext extends ParserRuleContext {
	public WATCH(): TerminalNode { return this.getToken(ClickHouseParser.WATCH, 0); }
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	public EVENTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EVENTS, 0); }
	public LIMIT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LIMIT, 0); }
	public DECIMAL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DECIMAL_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_watchStmt; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterWatchStmt) {
			listener.enterWatchStmt(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitWatchStmt) {
			listener.exitWatchStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitWatchStmt) {
			return visitor.visitWatchStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnTypeExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_columnTypeExpr; }
	public copyFrom(ctx: ColumnTypeExprContext): void {
		super.copyFrom(ctx);
	}
}
export class ColumnTypeExprSimpleContext extends ColumnTypeExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(ctx: ColumnTypeExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnTypeExprSimple) {
			listener.enterColumnTypeExprSimple(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnTypeExprSimple) {
			listener.exitColumnTypeExprSimple(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnTypeExprSimple) {
			return visitor.visitColumnTypeExprSimple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnTypeExprNestedContext extends ColumnTypeExprContext {
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public columnTypeExpr(): ColumnTypeExprContext[];
	public columnTypeExpr(i: number): ColumnTypeExprContext;
	public columnTypeExpr(i?: number): ColumnTypeExprContext | ColumnTypeExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnTypeExprContext);
		} else {
			return this.getRuleContext(i, ColumnTypeExprContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(ctx: ColumnTypeExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnTypeExprNested) {
			listener.enterColumnTypeExprNested(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnTypeExprNested) {
			listener.exitColumnTypeExprNested(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnTypeExprNested) {
			return visitor.visitColumnTypeExprNested(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnTypeExprEnumContext extends ColumnTypeExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public enumValue(): EnumValueContext[];
	public enumValue(i: number): EnumValueContext;
	public enumValue(i?: number): EnumValueContext | EnumValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EnumValueContext);
		} else {
			return this.getRuleContext(i, EnumValueContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(ctx: ColumnTypeExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnTypeExprEnum) {
			listener.enterColumnTypeExprEnum(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnTypeExprEnum) {
			listener.exitColumnTypeExprEnum(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnTypeExprEnum) {
			return visitor.visitColumnTypeExprEnum(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnTypeExprComplexContext extends ColumnTypeExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public columnTypeExpr(): ColumnTypeExprContext[];
	public columnTypeExpr(i: number): ColumnTypeExprContext;
	public columnTypeExpr(i?: number): ColumnTypeExprContext | ColumnTypeExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnTypeExprContext);
		} else {
			return this.getRuleContext(i, ColumnTypeExprContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(ctx: ColumnTypeExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnTypeExprComplex) {
			listener.enterColumnTypeExprComplex(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnTypeExprComplex) {
			listener.exitColumnTypeExprComplex(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnTypeExprComplex) {
			return visitor.visitColumnTypeExprComplex(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnTypeExprParamContext extends ColumnTypeExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public columnExprList(): ColumnExprListContext | undefined {
		return this.tryGetRuleContext(0, ColumnExprListContext);
	}
	constructor(ctx: ColumnTypeExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnTypeExprParam) {
			listener.enterColumnTypeExprParam(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnTypeExprParam) {
			listener.exitColumnTypeExprParam(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnTypeExprParam) {
			return visitor.visitColumnTypeExprParam(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnExprListContext extends ParserRuleContext {
	public columnsExpr(): ColumnsExprContext[];
	public columnsExpr(i: number): ColumnsExprContext;
	public columnsExpr(i?: number): ColumnsExprContext | ColumnsExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnsExprContext);
		} else {
			return this.getRuleContext(i, ColumnsExprContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_columnExprList; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprList) {
			listener.enterColumnExprList(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprList) {
			listener.exitColumnExprList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprList) {
			return visitor.visitColumnExprList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnsExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_columnsExpr; }
	public copyFrom(ctx: ColumnsExprContext): void {
		super.copyFrom(ctx);
	}
}
export class ColumnsExprAsteriskContext extends ColumnsExprContext {
	public ASTERISK(): TerminalNode { return this.getToken(ClickHouseParser.ASTERISK, 0); }
	public tableIdentifier(): TableIdentifierContext | undefined {
		return this.tryGetRuleContext(0, TableIdentifierContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DOT, 0); }
	constructor(ctx: ColumnsExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnsExprAsterisk) {
			listener.enterColumnsExprAsterisk(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnsExprAsterisk) {
			listener.exitColumnsExprAsterisk(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnsExprAsterisk) {
			return visitor.visitColumnsExprAsterisk(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnsExprSubqueryContext extends ColumnsExprContext {
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public selectUnionStmt(): SelectUnionStmtContext {
		return this.getRuleContext(0, SelectUnionStmtContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	constructor(ctx: ColumnsExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnsExprSubquery) {
			listener.enterColumnsExprSubquery(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnsExprSubquery) {
			listener.exitColumnsExprSubquery(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnsExprSubquery) {
			return visitor.visitColumnsExprSubquery(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnsExprColumnContext extends ColumnsExprContext {
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(ctx: ColumnsExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnsExprColumn) {
			listener.enterColumnsExprColumn(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnsExprColumn) {
			listener.exitColumnsExprColumn(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnsExprColumn) {
			return visitor.visitColumnsExprColumn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_columnExpr; }
	public copyFrom(ctx: ColumnExprContext): void {
		super.copyFrom(ctx);
	}
}
export class ColumnExprCaseContext extends ColumnExprContext {
	public CASE(): TerminalNode { return this.getToken(ClickHouseParser.CASE, 0); }
	public END(): TerminalNode { return this.getToken(ClickHouseParser.END, 0); }
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public WHEN(): TerminalNode[];
	public WHEN(i: number): TerminalNode;
	public WHEN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.WHEN);
		} else {
			return this.getToken(ClickHouseParser.WHEN, i);
		}
	}
	public THEN(): TerminalNode[];
	public THEN(i: number): TerminalNode;
	public THEN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.THEN);
		} else {
			return this.getToken(ClickHouseParser.THEN, i);
		}
	}
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ELSE, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprCase) {
			listener.enterColumnExprCase(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprCase) {
			listener.exitColumnExprCase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprCase) {
			return visitor.visitColumnExprCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprCastContext extends ColumnExprContext {
	public CAST(): TerminalNode { return this.getToken(ClickHouseParser.CAST, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public AS(): TerminalNode { return this.getToken(ClickHouseParser.AS, 0); }
	public columnTypeExpr(): ColumnTypeExprContext {
		return this.getRuleContext(0, ColumnTypeExprContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprCast) {
			listener.enterColumnExprCast(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprCast) {
			listener.exitColumnExprCast(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprCast) {
			return visitor.visitColumnExprCast(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprDateContext extends ColumnExprContext {
	public DATE(): TerminalNode { return this.getToken(ClickHouseParser.DATE, 0); }
	public STRING_LITERAL(): TerminalNode { return this.getToken(ClickHouseParser.STRING_LITERAL, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprDate) {
			listener.enterColumnExprDate(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprDate) {
			listener.exitColumnExprDate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprDate) {
			return visitor.visitColumnExprDate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprExtractContext extends ColumnExprContext {
	public EXTRACT(): TerminalNode { return this.getToken(ClickHouseParser.EXTRACT, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public interval(): IntervalContext {
		return this.getRuleContext(0, IntervalContext);
	}
	public FROM(): TerminalNode { return this.getToken(ClickHouseParser.FROM, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprExtract) {
			listener.enterColumnExprExtract(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprExtract) {
			listener.exitColumnExprExtract(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprExtract) {
			return visitor.visitColumnExprExtract(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprIntervalContext extends ColumnExprContext {
	public INTERVAL(): TerminalNode { return this.getToken(ClickHouseParser.INTERVAL, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public interval(): IntervalContext {
		return this.getRuleContext(0, IntervalContext);
	}
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprInterval) {
			listener.enterColumnExprInterval(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprInterval) {
			listener.exitColumnExprInterval(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprInterval) {
			return visitor.visitColumnExprInterval(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprSubstringContext extends ColumnExprContext {
	public SUBSTRING(): TerminalNode { return this.getToken(ClickHouseParser.SUBSTRING, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public FROM(): TerminalNode { return this.getToken(ClickHouseParser.FROM, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public FOR(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FOR, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprSubstring) {
			listener.enterColumnExprSubstring(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprSubstring) {
			listener.exitColumnExprSubstring(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprSubstring) {
			return visitor.visitColumnExprSubstring(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprTimestampContext extends ColumnExprContext {
	public TIMESTAMP(): TerminalNode { return this.getToken(ClickHouseParser.TIMESTAMP, 0); }
	public STRING_LITERAL(): TerminalNode { return this.getToken(ClickHouseParser.STRING_LITERAL, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprTimestamp) {
			listener.enterColumnExprTimestamp(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprTimestamp) {
			listener.exitColumnExprTimestamp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprTimestamp) {
			return visitor.visitColumnExprTimestamp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprTrimContext extends ColumnExprContext {
	public TRIM(): TerminalNode { return this.getToken(ClickHouseParser.TRIM, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public STRING_LITERAL(): TerminalNode { return this.getToken(ClickHouseParser.STRING_LITERAL, 0); }
	public FROM(): TerminalNode { return this.getToken(ClickHouseParser.FROM, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public BOTH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.BOTH, 0); }
	public LEADING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LEADING, 0); }
	public TRAILING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TRAILING, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprTrim) {
			listener.enterColumnExprTrim(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprTrim) {
			listener.exitColumnExprTrim(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprTrim) {
			return visitor.visitColumnExprTrim(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprWinFunctionContext extends ColumnExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public OVER(): TerminalNode { return this.getToken(ClickHouseParser.OVER, 0); }
	public LPAREN(): TerminalNode[];
	public LPAREN(i: number): TerminalNode;
	public LPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.LPAREN);
		} else {
			return this.getToken(ClickHouseParser.LPAREN, i);
		}
	}
	public windowExpr(): WindowExprContext {
		return this.getRuleContext(0, WindowExprContext);
	}
	public RPAREN(): TerminalNode[];
	public RPAREN(i: number): TerminalNode;
	public RPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.RPAREN);
		} else {
			return this.getToken(ClickHouseParser.RPAREN, i);
		}
	}
	public columnExprList(): ColumnExprListContext | undefined {
		return this.tryGetRuleContext(0, ColumnExprListContext);
	}
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprWinFunction) {
			listener.enterColumnExprWinFunction(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprWinFunction) {
			listener.exitColumnExprWinFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprWinFunction) {
			return visitor.visitColumnExprWinFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprWinFunctionTargetContext extends ColumnExprContext {
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public OVER(): TerminalNode { return this.getToken(ClickHouseParser.OVER, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RPAREN, 0); }
	public columnExprList(): ColumnExprListContext | undefined {
		return this.tryGetRuleContext(0, ColumnExprListContext);
	}
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprWinFunctionTarget) {
			listener.enterColumnExprWinFunctionTarget(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprWinFunctionTarget) {
			listener.exitColumnExprWinFunctionTarget(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprWinFunctionTarget) {
			return visitor.visitColumnExprWinFunctionTarget(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprFunctionContext extends ColumnExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LPAREN(): TerminalNode[];
	public LPAREN(i: number): TerminalNode;
	public LPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.LPAREN);
		} else {
			return this.getToken(ClickHouseParser.LPAREN, i);
		}
	}
	public RPAREN(): TerminalNode[];
	public RPAREN(i: number): TerminalNode;
	public RPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.RPAREN);
		} else {
			return this.getToken(ClickHouseParser.RPAREN, i);
		}
	}
	public DISTINCT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DISTINCT, 0); }
	public columnArgList(): ColumnArgListContext | undefined {
		return this.tryGetRuleContext(0, ColumnArgListContext);
	}
	public columnExprList(): ColumnExprListContext | undefined {
		return this.tryGetRuleContext(0, ColumnExprListContext);
	}
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprFunction) {
			listener.enterColumnExprFunction(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprFunction) {
			listener.exitColumnExprFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprFunction) {
			return visitor.visitColumnExprFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprLiteralContext extends ColumnExprContext {
	public literal(): LiteralContext {
		return this.getRuleContext(0, LiteralContext);
	}
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprLiteral) {
			listener.enterColumnExprLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprLiteral) {
			listener.exitColumnExprLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprLiteral) {
			return visitor.visitColumnExprLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprArrayAccessContext extends ColumnExprContext {
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public LBRACKET(): TerminalNode { return this.getToken(ClickHouseParser.LBRACKET, 0); }
	public RBRACKET(): TerminalNode { return this.getToken(ClickHouseParser.RBRACKET, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprArrayAccess) {
			listener.enterColumnExprArrayAccess(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprArrayAccess) {
			listener.exitColumnExprArrayAccess(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprArrayAccess) {
			return visitor.visitColumnExprArrayAccess(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprTupleAccessContext extends ColumnExprContext {
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public DOT(): TerminalNode { return this.getToken(ClickHouseParser.DOT, 0); }
	public DECIMAL_LITERAL(): TerminalNode { return this.getToken(ClickHouseParser.DECIMAL_LITERAL, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprTupleAccess) {
			listener.enterColumnExprTupleAccess(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprTupleAccess) {
			listener.exitColumnExprTupleAccess(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprTupleAccess) {
			return visitor.visitColumnExprTupleAccess(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprNegateContext extends ColumnExprContext {
	public DASH(): TerminalNode { return this.getToken(ClickHouseParser.DASH, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprNegate) {
			listener.enterColumnExprNegate(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprNegate) {
			listener.exitColumnExprNegate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprNegate) {
			return visitor.visitColumnExprNegate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprPrecedence1Context extends ColumnExprContext {
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public ASTERISK(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ASTERISK, 0); }
	public SLASH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SLASH, 0); }
	public PERCENT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.PERCENT, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprPrecedence1) {
			listener.enterColumnExprPrecedence1(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprPrecedence1) {
			listener.exitColumnExprPrecedence1(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprPrecedence1) {
			return visitor.visitColumnExprPrecedence1(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprPrecedence2Context extends ColumnExprContext {
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.PLUS, 0); }
	public DASH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DASH, 0); }
	public CONCAT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CONCAT, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprPrecedence2) {
			listener.enterColumnExprPrecedence2(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprPrecedence2) {
			listener.exitColumnExprPrecedence2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprPrecedence2) {
			return visitor.visitColumnExprPrecedence2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprPrecedence3Context extends ColumnExprContext {
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public EQ_DOUBLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EQ_DOUBLE, 0); }
	public EQ_SINGLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EQ_SINGLE, 0); }
	public NOT_EQ(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT_EQ, 0); }
	public LE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LE, 0); }
	public GE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.GE, 0); }
	public LT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.GT, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IN, 0); }
	public LIKE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LIKE, 0); }
	public ILIKE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ILIKE, 0); }
	public GLOBAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.GLOBAL, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprPrecedence3) {
			listener.enterColumnExprPrecedence3(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprPrecedence3) {
			listener.exitColumnExprPrecedence3(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprPrecedence3) {
			return visitor.visitColumnExprPrecedence3(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprIsNullContext extends ColumnExprContext {
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public IS(): TerminalNode { return this.getToken(ClickHouseParser.IS, 0); }
	public NULL_SQL(): TerminalNode { return this.getToken(ClickHouseParser.NULL_SQL, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprIsNull) {
			listener.enterColumnExprIsNull(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprIsNull) {
			listener.exitColumnExprIsNull(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprIsNull) {
			return visitor.visitColumnExprIsNull(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprNotContext extends ColumnExprContext {
	public NOT(): TerminalNode { return this.getToken(ClickHouseParser.NOT, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprNot) {
			listener.enterColumnExprNot(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprNot) {
			listener.exitColumnExprNot(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprNot) {
			return visitor.visitColumnExprNot(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprAndContext extends ColumnExprContext {
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public AND(): TerminalNode { return this.getToken(ClickHouseParser.AND, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprAnd) {
			listener.enterColumnExprAnd(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprAnd) {
			listener.exitColumnExprAnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprAnd) {
			return visitor.visitColumnExprAnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprOrContext extends ColumnExprContext {
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public OR(): TerminalNode { return this.getToken(ClickHouseParser.OR, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprOr) {
			listener.enterColumnExprOr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprOr) {
			listener.exitColumnExprOr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprOr) {
			return visitor.visitColumnExprOr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprBetweenContext extends ColumnExprContext {
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public BETWEEN(): TerminalNode { return this.getToken(ClickHouseParser.BETWEEN, 0); }
	public AND(): TerminalNode { return this.getToken(ClickHouseParser.AND, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprBetween) {
			listener.enterColumnExprBetween(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprBetween) {
			listener.exitColumnExprBetween(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprBetween) {
			return visitor.visitColumnExprBetween(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprTernaryOpContext extends ColumnExprContext {
	public columnExpr(): ColumnExprContext[];
	public columnExpr(i: number): ColumnExprContext;
	public columnExpr(i?: number): ColumnExprContext | ColumnExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnExprContext);
		} else {
			return this.getRuleContext(i, ColumnExprContext);
		}
	}
	public QUERY(): TerminalNode { return this.getToken(ClickHouseParser.QUERY, 0); }
	public COLON(): TerminalNode { return this.getToken(ClickHouseParser.COLON, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprTernaryOp) {
			listener.enterColumnExprTernaryOp(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprTernaryOp) {
			listener.exitColumnExprTernaryOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprTernaryOp) {
			return visitor.visitColumnExprTernaryOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprAliasContext extends ColumnExprContext {
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public alias(): AliasContext | undefined {
		return this.tryGetRuleContext(0, AliasContext);
	}
	public AS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.AS, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprAlias) {
			listener.enterColumnExprAlias(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprAlias) {
			listener.exitColumnExprAlias(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprAlias) {
			return visitor.visitColumnExprAlias(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprAsteriskContext extends ColumnExprContext {
	public ASTERISK(): TerminalNode { return this.getToken(ClickHouseParser.ASTERISK, 0); }
	public tableIdentifier(): TableIdentifierContext | undefined {
		return this.tryGetRuleContext(0, TableIdentifierContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DOT, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprAsterisk) {
			listener.enterColumnExprAsterisk(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprAsterisk) {
			listener.exitColumnExprAsterisk(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprAsterisk) {
			return visitor.visitColumnExprAsterisk(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprSubqueryContext extends ColumnExprContext {
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public selectUnionStmt(): SelectUnionStmtContext {
		return this.getRuleContext(0, SelectUnionStmtContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprSubquery) {
			listener.enterColumnExprSubquery(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprSubquery) {
			listener.exitColumnExprSubquery(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprSubquery) {
			return visitor.visitColumnExprSubquery(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprParensContext extends ColumnExprContext {
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprParens) {
			listener.enterColumnExprParens(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprParens) {
			listener.exitColumnExprParens(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprParens) {
			return visitor.visitColumnExprParens(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprTupleContext extends ColumnExprContext {
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public columnExprList(): ColumnExprListContext {
		return this.getRuleContext(0, ColumnExprListContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprTuple) {
			listener.enterColumnExprTuple(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprTuple) {
			listener.exitColumnExprTuple(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprTuple) {
			return visitor.visitColumnExprTuple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprArrayContext extends ColumnExprContext {
	public LBRACKET(): TerminalNode { return this.getToken(ClickHouseParser.LBRACKET, 0); }
	public RBRACKET(): TerminalNode { return this.getToken(ClickHouseParser.RBRACKET, 0); }
	public columnExprList(): ColumnExprListContext | undefined {
		return this.tryGetRuleContext(0, ColumnExprListContext);
	}
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprArray) {
			listener.enterColumnExprArray(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprArray) {
			listener.exitColumnExprArray(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprArray) {
			return visitor.visitColumnExprArray(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ColumnExprIdentifierContext extends ColumnExprContext {
	public columnIdentifier(): ColumnIdentifierContext {
		return this.getRuleContext(0, ColumnIdentifierContext);
	}
	constructor(ctx: ColumnExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnExprIdentifier) {
			listener.enterColumnExprIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnExprIdentifier) {
			listener.exitColumnExprIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnExprIdentifier) {
			return visitor.visitColumnExprIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnArgListContext extends ParserRuleContext {
	public columnArgExpr(): ColumnArgExprContext[];
	public columnArgExpr(i: number): ColumnArgExprContext;
	public columnArgExpr(i?: number): ColumnArgExprContext | ColumnArgExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnArgExprContext);
		} else {
			return this.getRuleContext(i, ColumnArgExprContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_columnArgList; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnArgList) {
			listener.enterColumnArgList(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnArgList) {
			listener.exitColumnArgList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnArgList) {
			return visitor.visitColumnArgList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnArgExprContext extends ParserRuleContext {
	public columnLambdaExpr(): ColumnLambdaExprContext | undefined {
		return this.tryGetRuleContext(0, ColumnLambdaExprContext);
	}
	public columnExpr(): ColumnExprContext | undefined {
		return this.tryGetRuleContext(0, ColumnExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_columnArgExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnArgExpr) {
			listener.enterColumnArgExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnArgExpr) {
			listener.exitColumnArgExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnArgExpr) {
			return visitor.visitColumnArgExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnLambdaExprContext extends ParserRuleContext {
	public ARROW(): TerminalNode { return this.getToken(ClickHouseParser.ARROW, 0); }
	public columnExpr(): ColumnExprContext {
		return this.getRuleContext(0, ColumnExprContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LPAREN, 0); }
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_columnLambdaExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnLambdaExpr) {
			listener.enterColumnLambdaExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnLambdaExpr) {
			listener.exitColumnLambdaExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnLambdaExpr) {
			return visitor.visitColumnLambdaExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnIdentifierContext extends ParserRuleContext {
	public nestedIdentifier(): NestedIdentifierContext {
		return this.getRuleContext(0, NestedIdentifierContext);
	}
	public tableIdentifier(): TableIdentifierContext | undefined {
		return this.tryGetRuleContext(0, TableIdentifierContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_columnIdentifier; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterColumnIdentifier) {
			listener.enterColumnIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitColumnIdentifier) {
			listener.exitColumnIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitColumnIdentifier) {
			return visitor.visitColumnIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NestedIdentifierContext extends ParserRuleContext {
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_nestedIdentifier; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterNestedIdentifier) {
			listener.enterNestedIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitNestedIdentifier) {
			listener.exitNestedIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitNestedIdentifier) {
			return visitor.visitNestedIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableExpr; }
	public copyFrom(ctx: TableExprContext): void {
		super.copyFrom(ctx);
	}
}
export class TableExprIdentifierContext extends TableExprContext {
	public tableIdentifier(): TableIdentifierContext {
		return this.getRuleContext(0, TableIdentifierContext);
	}
	constructor(ctx: TableExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableExprIdentifier) {
			listener.enterTableExprIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableExprIdentifier) {
			listener.exitTableExprIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableExprIdentifier) {
			return visitor.visitTableExprIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TableExprFunctionContext extends TableExprContext {
	public tableFunctionExpr(): TableFunctionExprContext {
		return this.getRuleContext(0, TableFunctionExprContext);
	}
	constructor(ctx: TableExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableExprFunction) {
			listener.enterTableExprFunction(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableExprFunction) {
			listener.exitTableExprFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableExprFunction) {
			return visitor.visitTableExprFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TableExprSubqueryContext extends TableExprContext {
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public selectUnionStmt(): SelectUnionStmtContext {
		return this.getRuleContext(0, SelectUnionStmtContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	constructor(ctx: TableExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableExprSubquery) {
			listener.enterTableExprSubquery(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableExprSubquery) {
			listener.exitTableExprSubquery(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableExprSubquery) {
			return visitor.visitTableExprSubquery(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TableExprAliasContext extends TableExprContext {
	public tableExpr(): TableExprContext {
		return this.getRuleContext(0, TableExprContext);
	}
	public alias(): AliasContext | undefined {
		return this.tryGetRuleContext(0, AliasContext);
	}
	public AS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.AS, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(ctx: TableExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableExprAlias) {
			listener.enterTableExprAlias(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableExprAlias) {
			listener.exitTableExprAlias(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableExprAlias) {
			return visitor.visitTableExprAlias(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableFunctionExprContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LPAREN(): TerminalNode { return this.getToken(ClickHouseParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ClickHouseParser.RPAREN, 0); }
	public tableArgList(): TableArgListContext | undefined {
		return this.tryGetRuleContext(0, TableArgListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableFunctionExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableFunctionExpr) {
			listener.enterTableFunctionExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableFunctionExpr) {
			listener.exitTableFunctionExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableFunctionExpr) {
			return visitor.visitTableFunctionExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableIdentifierContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public databaseIdentifier(): DatabaseIdentifierContext | undefined {
		return this.tryGetRuleContext(0, DatabaseIdentifierContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableIdentifier; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableIdentifier) {
			listener.enterTableIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableIdentifier) {
			listener.exitTableIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableIdentifier) {
			return visitor.visitTableIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableArgListContext extends ParserRuleContext {
	public tableArgExpr(): TableArgExprContext[];
	public tableArgExpr(i: number): TableArgExprContext;
	public tableArgExpr(i?: number): TableArgExprContext | TableArgExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TableArgExprContext);
		} else {
			return this.getRuleContext(i, TableArgExprContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.COMMA);
		} else {
			return this.getToken(ClickHouseParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableArgList; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableArgList) {
			listener.enterTableArgList(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableArgList) {
			listener.exitTableArgList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableArgList) {
			return visitor.visitTableArgList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableArgExprContext extends ParserRuleContext {
	public nestedIdentifier(): NestedIdentifierContext | undefined {
		return this.tryGetRuleContext(0, NestedIdentifierContext);
	}
	public tableFunctionExpr(): TableFunctionExprContext | undefined {
		return this.tryGetRuleContext(0, TableFunctionExprContext);
	}
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_tableArgExpr; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterTableArgExpr) {
			listener.enterTableArgExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitTableArgExpr) {
			listener.exitTableArgExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitTableArgExpr) {
			return visitor.visitTableArgExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DatabaseIdentifierContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_databaseIdentifier; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterDatabaseIdentifier) {
			listener.enterDatabaseIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitDatabaseIdentifier) {
			listener.exitDatabaseIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitDatabaseIdentifier) {
			return visitor.visitDatabaseIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FloatingLiteralContext extends ParserRuleContext {
	public FLOATING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FLOATING_LITERAL, 0); }
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DOT, 0); }
	public DECIMAL_LITERAL(): TerminalNode[];
	public DECIMAL_LITERAL(i: number): TerminalNode;
	public DECIMAL_LITERAL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ClickHouseParser.DECIMAL_LITERAL);
		} else {
			return this.getToken(ClickHouseParser.DECIMAL_LITERAL, i);
		}
	}
	public OCTAL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OCTAL_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_floatingLiteral; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterFloatingLiteral) {
			listener.enterFloatingLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitFloatingLiteral) {
			listener.exitFloatingLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitFloatingLiteral) {
			return visitor.visitFloatingLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumberLiteralContext extends ParserRuleContext {
	public floatingLiteral(): FloatingLiteralContext | undefined {
		return this.tryGetRuleContext(0, FloatingLiteralContext);
	}
	public OCTAL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OCTAL_LITERAL, 0); }
	public DECIMAL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DECIMAL_LITERAL, 0); }
	public HEXADECIMAL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.HEXADECIMAL_LITERAL, 0); }
	public INF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.INF, 0); }
	public NAN_SQL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NAN_SQL, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.PLUS, 0); }
	public DASH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DASH, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_numberLiteral; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterNumberLiteral) {
			listener.enterNumberLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitNumberLiteral) {
			listener.exitNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitNumberLiteral) {
			return visitor.visitNumberLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public numberLiteral(): NumberLiteralContext | undefined {
		return this.tryGetRuleContext(0, NumberLiteralContext);
	}
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.STRING_LITERAL, 0); }
	public NULL_SQL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NULL_SQL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_literal; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitLiteral) {
			listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntervalContext extends ParserRuleContext {
	public SECOND(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SECOND, 0); }
	public MINUTE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MINUTE, 0); }
	public HOUR(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.HOUR, 0); }
	public DAY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DAY, 0); }
	public WEEK(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.WEEK, 0); }
	public MONTH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MONTH, 0); }
	public QUARTER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.QUARTER, 0); }
	public YEAR(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.YEAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_interval; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterInterval) {
			listener.enterInterval(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitInterval) {
			listener.exitInterval(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitInterval) {
			return visitor.visitInterval(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeywordContext extends ParserRuleContext {
	public AFTER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.AFTER, 0); }
	public ALIAS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ALIAS, 0); }
	public ALL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ALL, 0); }
	public ALTER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ALTER, 0); }
	public AND(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.AND, 0); }
	public ANTI(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ANTI, 0); }
	public ANY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ANY, 0); }
	public ARRAY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ARRAY, 0); }
	public AS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.AS, 0); }
	public ASCENDING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ASCENDING, 0); }
	public ASOF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ASOF, 0); }
	public AST(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.AST, 0); }
	public ASYNC(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ASYNC, 0); }
	public ATTACH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ATTACH, 0); }
	public BETWEEN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.BETWEEN, 0); }
	public BOTH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.BOTH, 0); }
	public BY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.BY, 0); }
	public CASE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CASE, 0); }
	public CAST(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CAST, 0); }
	public CHECK(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CHECK, 0); }
	public CLEAR(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CLEAR, 0); }
	public CLUSTER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CLUSTER, 0); }
	public CODEC(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CODEC, 0); }
	public COLLATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.COLLATE, 0); }
	public COLUMN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.COLUMN, 0); }
	public COMMENT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.COMMENT, 0); }
	public CONSTRAINT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CONSTRAINT, 0); }
	public CREATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CREATE, 0); }
	public CROSS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CROSS, 0); }
	public CUBE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CUBE, 0); }
	public CURRENT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.CURRENT, 0); }
	public DATABASE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DATABASE, 0); }
	public DATABASES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DATABASES, 0); }
	public DATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DATE, 0); }
	public DEDUPLICATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DEDUPLICATE, 0); }
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DEFAULT, 0); }
	public DELAY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DELAY, 0); }
	public DELETE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DELETE, 0); }
	public DESCRIBE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DESCRIBE, 0); }
	public DESC(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DESC, 0); }
	public DESCENDING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DESCENDING, 0); }
	public DETACH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DETACH, 0); }
	public DICTIONARIES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DICTIONARIES, 0); }
	public DICTIONARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DICTIONARY, 0); }
	public DISK(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DISK, 0); }
	public DISTINCT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DISTINCT, 0); }
	public DISTRIBUTED(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DISTRIBUTED, 0); }
	public DROP(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DROP, 0); }
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ELSE, 0); }
	public END(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.END, 0); }
	public ENGINE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ENGINE, 0); }
	public EVENTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EVENTS, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXISTS, 0); }
	public EXPLAIN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXPLAIN, 0); }
	public EXPRESSION(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXPRESSION, 0); }
	public EXTRACT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.EXTRACT, 0); }
	public FETCHES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FETCHES, 0); }
	public FINAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FINAL, 0); }
	public FIRST(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FIRST, 0); }
	public FLUSH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FLUSH, 0); }
	public FOR(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FOR, 0); }
	public FOLLOWING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FOLLOWING, 0); }
	public FORMAT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FORMAT, 0); }
	public FREEZE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FREEZE, 0); }
	public FROM(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FROM, 0); }
	public FULL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FULL, 0); }
	public FUNCTION(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FUNCTION, 0); }
	public GLOBAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.GLOBAL, 0); }
	public GRANULARITY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.GRANULARITY, 0); }
	public GROUP(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.GROUP, 0); }
	public HAVING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.HAVING, 0); }
	public HIERARCHICAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.HIERARCHICAL, 0); }
	public ID(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ID, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IF, 0); }
	public ILIKE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ILIKE, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IN, 0); }
	public INDEX(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.INDEX, 0); }
	public INJECTIVE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.INJECTIVE, 0); }
	public INNER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.INNER, 0); }
	public INSERT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.INSERT, 0); }
	public INTERVAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.INTERVAL, 0); }
	public INTO(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.INTO, 0); }
	public IS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IS, 0); }
	public IS_OBJECT_ID(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IS_OBJECT_ID, 0); }
	public JOIN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.JOIN, 0); }
	public JSON_FALSE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.JSON_FALSE, 0); }
	public JSON_TRUE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.JSON_TRUE, 0); }
	public KEY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.KEY, 0); }
	public KILL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.KILL, 0); }
	public LAST(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LAST, 0); }
	public LAYOUT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LAYOUT, 0); }
	public LEADING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LEADING, 0); }
	public LEFT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LEFT, 0); }
	public LIFETIME(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LIFETIME, 0); }
	public LIKE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LIKE, 0); }
	public LIMIT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LIMIT, 0); }
	public LIVE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LIVE, 0); }
	public LOCAL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LOCAL, 0); }
	public LOGS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.LOGS, 0); }
	public MATERIALIZE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MATERIALIZE, 0); }
	public MATERIALIZED(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MATERIALIZED, 0); }
	public MAX(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MAX, 0); }
	public MERGES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MERGES, 0); }
	public MIN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MIN, 0); }
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MODIFY, 0); }
	public MOVE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MOVE, 0); }
	public MUTATION(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.MUTATION, 0); }
	public NO(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NO, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NOT, 0); }
	public NULLS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NULLS, 0); }
	public OFFSET(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OFFSET, 0); }
	public ON(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ON, 0); }
	public OPTIMIZE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OPTIMIZE, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OR, 0); }
	public ORDER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ORDER, 0); }
	public OUTER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OUTER, 0); }
	public OUTFILE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OUTFILE, 0); }
	public OVER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.OVER, 0); }
	public PARTITION(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.PARTITION, 0); }
	public POPULATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.POPULATE, 0); }
	public PRECEDING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.PRECEDING, 0); }
	public PREWHERE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.PREWHERE, 0); }
	public PRIMARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.PRIMARY, 0); }
	public RANGE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RANGE, 0); }
	public RELOAD(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RELOAD, 0); }
	public REMOVE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.REMOVE, 0); }
	public RENAME(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RENAME, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.REPLACE, 0); }
	public REPLICA(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.REPLICA, 0); }
	public REPLICATED(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.REPLICATED, 0); }
	public RIGHT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.RIGHT, 0); }
	public ROLLUP(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ROLLUP, 0); }
	public ROW(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ROW, 0); }
	public ROWS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ROWS, 0); }
	public SAMPLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SAMPLE, 0); }
	public SELECT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SELECT, 0); }
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SEMI, 0); }
	public SENDS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SENDS, 0); }
	public SET(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SET, 0); }
	public SETTINGS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SETTINGS, 0); }
	public SHOW(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SHOW, 0); }
	public SOURCE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SOURCE, 0); }
	public START(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.START, 0); }
	public STOP(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.STOP, 0); }
	public SUBSTRING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SUBSTRING, 0); }
	public SYNC(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SYNC, 0); }
	public SYNTAX(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SYNTAX, 0); }
	public SYSTEM(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.SYSTEM, 0); }
	public TABLE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TABLE, 0); }
	public TABLES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TABLES, 0); }
	public TEMPORARY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TEMPORARY, 0); }
	public TEST(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TEST, 0); }
	public THEN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.THEN, 0); }
	public TIES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TIES, 0); }
	public TIMEOUT(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TIMEOUT, 0); }
	public TIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TIMESTAMP, 0); }
	public TOTALS(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TOTALS, 0); }
	public TRAILING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TRAILING, 0); }
	public TRIM(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TRIM, 0); }
	public TRUNCATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TRUNCATE, 0); }
	public TO(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TO, 0); }
	public TOP(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TOP, 0); }
	public TTL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TTL, 0); }
	public TYPE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.TYPE, 0); }
	public UNBOUNDED(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.UNBOUNDED, 0); }
	public UNION(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.UNION, 0); }
	public UPDATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.UPDATE, 0); }
	public USE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.USE, 0); }
	public USING(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.USING, 0); }
	public UUID(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.UUID, 0); }
	public VALUES(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.VALUES, 0); }
	public VIEW(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.VIEW, 0); }
	public VOLUME(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.VOLUME, 0); }
	public WATCH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.WATCH, 0); }
	public WHEN(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.WHEN, 0); }
	public WHERE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.WHERE, 0); }
	public WINDOW(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.WINDOW, 0); }
	public WITH(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.WITH, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_keyword; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterKeyword) {
			listener.enterKeyword(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitKeyword) {
			listener.exitKeyword(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitKeyword) {
			return visitor.visitKeyword(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeywordForAliasContext extends ParserRuleContext {
	public DATE(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.DATE, 0); }
	public FIRST(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.FIRST, 0); }
	public ID(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.ID, 0); }
	public KEY(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.KEY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_keywordForAlias; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterKeywordForAlias) {
			listener.enterKeywordForAlias(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitKeywordForAlias) {
			listener.exitKeywordForAlias(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitKeywordForAlias) {
			return visitor.visitKeywordForAlias(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AliasContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IDENTIFIER, 0); }
	public keywordForAlias(): KeywordForAliasContext | undefined {
		return this.tryGetRuleContext(0, KeywordForAliasContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_alias; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterAlias) {
			listener.enterAlias(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitAlias) {
			listener.exitAlias(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitAlias) {
			return visitor.visitAlias(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.IDENTIFIER, 0); }
	public interval(): IntervalContext | undefined {
		return this.tryGetRuleContext(0, IntervalContext);
	}
	public keyword(): KeywordContext | undefined {
		return this.tryGetRuleContext(0, KeywordContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_identifier; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterIdentifier) {
			listener.enterIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitIdentifier) {
			listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierOrNullContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public NULL_SQL(): TerminalNode | undefined { return this.tryGetToken(ClickHouseParser.NULL_SQL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_identifierOrNull; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterIdentifierOrNull) {
			listener.enterIdentifierOrNull(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitIdentifierOrNull) {
			listener.exitIdentifierOrNull(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitIdentifierOrNull) {
			return visitor.visitIdentifierOrNull(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumValueContext extends ParserRuleContext {
	public STRING_LITERAL(): TerminalNode { return this.getToken(ClickHouseParser.STRING_LITERAL, 0); }
	public EQ_SINGLE(): TerminalNode { return this.getToken(ClickHouseParser.EQ_SINGLE, 0); }
	public numberLiteral(): NumberLiteralContext {
		return this.getRuleContext(0, NumberLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ClickHouseParser.RULE_enumValue; }
	// @Override
	public enterRule(listener: ClickHouseParserListener): void {
		if (listener.enterEnumValue) {
			listener.enterEnumValue(this);
		}
	}
	// @Override
	public exitRule(listener: ClickHouseParserListener): void {
		if (listener.exitEnumValue) {
			listener.exitEnumValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ClickHouseParserVisitor<Result>): Result {
		if (visitor.visitEnumValue) {
			return visitor.visitEnumValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


