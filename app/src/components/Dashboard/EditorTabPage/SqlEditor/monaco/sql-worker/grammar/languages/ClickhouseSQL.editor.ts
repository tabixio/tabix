import { languages } from 'monaco-editor';

const language = <languages.IMonarchLanguage>{
  base: 'sql',
  defaultToken: '',
  tokenPostfix: '.sql',
  ignoreCase: true,
  number: /\d+(\.\d+)?/,
  brackets: [
    { open: '[', close: ']', token: 'delimiter.square' },
    { open: '(', close: ')', token: 'delimiter.parenthesis' },
  ],
  fields: [],
  dbtables: [],
  tables: [],
  tabixCommands: [],
  keywordsGlobal: [
    'SELECT',
    'CASE',
    'THEN',
    'INSERT',
    'UPDATE',
    'DELETE',
    'WHERE',
    'OFFSET',
    'HAVING',
    'AS',
    'FROM',
    'WHEN',
    'ELSE',
    'USING',
    'END',
    'TYPE',
    'LEFT',
    'RIGHT',
    'JOIN',
    'ON',
    'OUTER',
    'DESC',
    'ASC',
    'UNION',
    'CREATE',
    'TABLE',
    'PRIMARY',
    'KEY FOREIGN',
    'NOT',
    'REFERENCES',
    'INNER',
    'CROSS',
    'NATURAL',
    'DATABASE',
    'DROP',
    'GRANT',
    'ARRAY JOIN',
    'ANY',
    'BETWEEN',
    'ENGINE',
    'ATTACH',
    'DETACH',
    'CAST',
    'WITH',
    'BIT_AND',
    'BIT_OR',
    'TO',
    'BIT_XOR',
    'DESCRIBE',
    'OPTIMIZE',
    'PREWHERE',
    'TOTALS',
    'DATABASES',
    'PROCESSLIST',
    'SHOW',
    'IF',
  ],
  keywords: [
    // FORM
    'FORMAT JSON',
    'FORMAT JSONCompact',
    'FORMAT JSONEachRow',
    'FORMAT TSV',
    'FORMAT TabSeparated',
    'FORMAT TabSeparatedWithNames',
    'FORMAT TabSeparatedWithNamesAndTypes',
    'FORMAT TabSeparatedRaw',
    'FORMAT BlockTabSeparated',
    'FORMAT TSKV',
    'FORMAT CSV',
    'FORMAT CSVWithNames',
    // SYS
    'SYSTEM RELOAD CONFIG',
    'DROP TEMPORARY TABLE',
    'EXISTS TEMPORARY TABLE',
    'SYSTEM RELOAD DICTIONARY',
    'SYSTEM RELOAD DICTIONARIES',
    'SYSTEM DROP DNS CACHE',
    'SYSTEM SHUTDOWN',
    'SYSTEM KILL',
    'CLEAR COLUMN IN PARTITION',
    'SYSTEM FLUSH LOGS',
  ],
  typeKeywords: [
    'date',
    'integer',
    'uint8',
    'uint16',
    'uint32',
    'uint64',
    'int8',
    'int16',
    'int32',
    'int64',
    'float32',
    'float64',
    'datetime',
    'enum8',
    'enum16',
    'fixedstring',
    'array',
    'tuple',
    'string',
    'Distributed',
    'Tinylog',
    'MergeTree',
    'SummingMergeTree',
    'ReplacingMergeTree',
    'ReplicatedMergeTree',
    'Buffer',
    'ReplicatedCollapsingMergeTree',
    'CollapsingMergeTree',
    'AggregatingMergeTree',
    'Merge',
    'Memory',
    'GraphiteMergeTree',
    'ReplicatedAggregatingMergeTree',
    'ReplicatedSummingMergeTree',
  ],
  operators: [
    // Logical
    'ALL',
    'AND',
    'ANY',
    'BETWEEN',
    'EXISTS',
    'IN',
    'LIKE',
    'NOT',
    'OR',
    'SOME',
    // Set
    'EXCEPT',
    'INTERSECT',
    'UNION',
    // Join
    'APPLY',
    'CROSS',
    'FULL',
    'INNER',
    'JOIN',
    'LEFT',
    'OUTER',
    'RIGHT',
    // Predicates
    'CONTAINS',
    'FREETEXT',
    'IS',
  ],
  builtinFunctions: [
    // Aggregate
    'AVG',
  ],
  //
  // formatResult: [
  //     'FORMAT JSON',
  //     'FORMAT JSONCompact',
  //     'FORMAT JSONEachRow',
  //     'FORMAT TSV',
  //     'FORMAT TabSeparated',
  //     'FORMAT TabSeparatedWithNames',
  //     'FORMAT TabSeparatedWithNamesAndTypes',
  //     'FORMAT TabSeparatedRaw',
  //     'FORMAT BlockTabSeparated',
  //     'FORMAT TSKV',
  //     'FORMAT CSV',
  //     'FORMAT CSVWithNames',
  // ],
  builtinVariables: ['true', 'false', 'NULL'],
  pseudoColumns: ['$ROWGUID', '$PARTITION'],
  drawCommands: ['DRAW_CHART', 'DRAW_BAR'],
  tokenizer: {
    root: [
      { include: '@comments' },
      { include: '@whitespace' },
      { include: '@keywordsDouble' },
      { include: '@keywordsDML' },
      { include: '@pseudoColumns' },
      { include: '@numbers' },
      { include: '@strings' },
      { include: '@complexIdentifiers' },
      { include: '@scopes' },
      [/;;|;/, 'warn-token'],
      [/[;,.]/, 'delimiter'],
      [/[()]/, '@brackets'],
      [
        /\b(\w+\.[`"][\w.]+["`])|\b(\w+\.\w+)\b/,
        {
          cases: {
            '@dbtables': 'keyword.dbtable',
            '@default': 'identifier',
          },
        },
      ],
      [
        /[\w@#$]+/,
        {
          cases: {
            '@keywords': 'keyword',
            '@keywordsGlobal': 'keyword',
            '@typeKeywords': 'keyword.type',
            '@fields': 'metatag',
            '@tables': 'keyword.table',
            '@operators': 'operator',
            '@builtinVariables': 'predefined',
            '@builtinFunctions': 'predefined',
            '@drawCommands': 'tabix',
            '@default': 'identifier',
          },
        },
      ],
      // ['/[!<>]?=|<>|<|>/', 'keyword.operator.comparison.sql'],
      [/[<>=!%&+\-*/|~^]/, 'operator'],
    ],
    whitespace: [[/\s+/, 'white']],
    comments: [
      [/--+.*/, 'comment'],
      [/\/\*/, { token: 'comment.quote', next: '@comment' }],
    ],
    comment: [
      [/[^*/]+/, 'comment'],
      // Not supporting nested comments, as nested comments seem to not be standard?
      // i.e. http://stackoverflow.com/questions/728172/are-there-multiline-comment-delimiters-in-sql-that-are-vendor-agnostic
      // [/\/\*/, { token: 'comment.quote', next: '@push' }],    // nested comment not allowed :-(
      [/\*\//, { token: 'comment.quote', next: '@pop' }],
      [/./, 'comment'],
    ],
    keywordsDML: [
      [
        '\\b(select(\\s+distinct)?|insert\\s+(ignore\\s+)?into|' +
          'update|delete|from|set|where|group\\sby|' +
          'or|like|and|union(\\s+all)?|having|order\\sby|limit|LIMIT\\W+\\d+\\W+BY\\W+|' +
          '(GLOBAL)?\\s+(ANY|ALL)?\\s+(INNER|LEFT)\\s+join|' +
          '(ANY|ALL)?\\s+(INNER|LEFT)\\s+join|' +
          '(INNER|LEFT)\\s+join|' +
          '(left|right)(\\s+outer)?\\s+join|' +
          'ARRAY\\W+JOIN |' +
          'PREWHERE|' +
          'JOIN|' +
          'SAMPLE|' +
          'INTO\\W+OUTFILE|' +
          'WITH\\W+TOTALS|' +
          'WITH\\W+CUBE|' +
          'natural(\\s+(left|right)(\\s+outer)?)?\\s+join)' +
          '\\b',
        {
          cases: {
            '@default': 'keyword.other.DML',
          },
        },
      ],
      [
        '\\bcreate(\\sMATERIALIZED)?\\s+(database|view)(\\s+if\\s+not\\s+exists)?',
        { cases: { '@default': 'keyword.other.create.sql' } },
      ],
      // "match": "(?i:^\\s*(create(?:\\s+or\\s+replace)?)\\s+(aggregate|conversion|database|domain|function|group|(unique\\s+)?index|language|operator class|operator|rule|schema|sequence|table|tablespace|trigger|type|user|view)\\s+)(['\"`]?)(\\w+)\\4",
      // "name": "meta.create.sql"
      ['\\bAS\\b', { cases: { '@default': 'keyword.other.alias.sql' } }],
      ['\\b(DESC|ASC)\\b', { cases: { '@default': 'keyword.other.order.sql' } }],
      // "keyword.other.object-comments.sql"=>"(?i:^\\s*(comment\\s+on\\s+(table|column|aggregate|constraint|database|domain|function|index|operator|rule|schema|sequence|trigger|type|view))\\s+.*?\\s+(is)\\s+)"
    ],
    // "captures": {
    //   "1": {
    //     "name": "constant.other.database-name.sql"
    //   },
    //   "2": {
    //     "name": "constant.other.table-name.sql"
    //   }
    // },
    // "match": "(\\w+?)\\.(\\w+)"
    // "match": "((?<!@)@)\\b(\\w+)\\b",
    // "name": "text.variable"
    keywordsDouble: [
      [
        'INSERT\\W+INTO|RENAME\\W+TABLE|IF\\W+NOT\\W+EXISTS|IF\\W+EXISTS|' +
          'SYSTEM\\W+RELOAD\\W+CONFIG|' +
          'DROP\\W+TEMPORARY\\W+TABLE|' +
          'EXISTS\\W+TEMPORARY\\W+TABLE|' +
          'SYSTEM\\W+RELOAD\\W+DICTIONARY|' +
          'CHECK\\W+TABLE|' +
          'SYSTEM\\W+RELOAD\\W+DICTIONARIES|' +
          'SYSTEM\\W+DROP\\W+DNS\\W+CACHE|' +
          'SYSTEM\\W+SHUTDOWN|' +
          'SYSTEM\\W+KILL|' +
          'CLEAR\\W+COLUMN\\W+IN\\W+PARTITION|SYSTEM\\W+FLUSH\\W+LOGS',
        {
          cases: {
            '@default': 'keyword',
          },
        },
      ],
      [
        'FORMAT\\W+XML|FORMAT\\W+Vertical|FORMAT\\W+JSONCompact|FORMAT\\W+Pretty(CompactNoEscapes|Space|SpaceNoEscape|NoEscapes|CompactMonoBlock|Compact)?|FORMAT\\W+TSV|FORMAT\\W+JSONEachRow|FORMAT\\W+TSKV|FORMAT\\W+TabSeparatedWithNames|FORMAT\\W+TabSeparatedWithNamesAndTypes|FORMAT\\W+TabSeparatedRaw|FORMAT\\W+BlockTabSeparated|FORMAT\\W+CSVWithNames|FORMAT\\W+CSV|FORMAT\\W+JSON|FORMAT\\W+TabSeparated',
        {
          cases: {
            '@default': 'storage',
          },
        },
      ],
    ],
    pseudoColumns: [
      [
        /[$][A-Za-z_][\w@#$]*/,
        {
          cases: {
            '@pseudoColumns': 'predefined',
            '@default': 'identifier',
          },
        },
      ],
    ],
    numbers: [
      [/0[xX][0-9a-fA-F]*/, 'number'],
      [/[$][+-]*\d*(\.\d*)?/, 'number'],
      [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number'],
    ],
    strings: [
      [/N'/, { token: 'string', next: '@string' }],
      [/'/, { token: 'string', next: '@string' }],
    ],
    string: [
      [/[^']+/, 'string'],
      [/''/, 'string'],
      [/'/, { token: 'string', next: '@pop' }],
    ],
    complexIdentifiers: [
      [/\[/, { token: 'identifier.quote', next: '@bracketedIdentifier' }],
      [/"/, { token: 'identifier.quote', next: '@quotedIdentifier' }],
    ],
    bracketedIdentifier: [
      [/[^\]]+/, 'identifier'],
      [/]]/, 'identifier'],
      [/]/, { token: 'identifier.quote', next: '@pop' }],
    ],
    quotedIdentifier: [
      [/[^"]+/, 'identifier'],
      [/""/, 'identifier'],
      [/"/, { token: 'identifier.quote', next: '@pop' }],
    ],
    scopes: [
      [/BEGIN\s+(DISTRIBUTED\s+)?TRAN(SACTION)?\b/i, 'keyword'],
      [/BEGIN\s+TRY\b/i, { token: 'keyword.try' }],
      [/END\s+TRY\b/i, { token: 'keyword.try' }],
      [/BEGIN\s+CATCH\b/i, { token: 'keyword.catch' }],
      [/END\s+CATCH\b/i, { token: 'keyword.catch' }],
      [/(BEGIN|CASE)\b/i, { token: 'keyword.block' }],
      [/END\b/i, { token: 'keyword.block' }],
      [/WHEN\b/i, { token: 'keyword.choice' }],
      [/THEN\b/i, { token: 'keyword.choice' }],
    ],
  },
};

// This config defines the editor's behavior.
const configuration: languages.LanguageConfiguration = {
  comments: {
    lineComment: '--',
    blockComment: ['/*', '*/'],
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  folding: {
    markers: {
      // start: new RegExp("^\\s*(#|\/\/)region\\b"),
      // start: /^\s*{\b/,
      start: /\(/,
      end: /\)/,
      // end: /^\s*}\b/
    },
  },
  autoClosingPairs: [
    { open: '{', close: '}', notIn: ['string', 'comment'] },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"', notIn: ['string', 'comment'] },
    { open: "'", close: "'", notIn: ['string', 'comment'] },
    { open: '`', close: '`' },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: '`', close: '`' },
  ],
  // wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
};

export const ClickhouseSQLMonaco = {
  language,
  configuration,
};
