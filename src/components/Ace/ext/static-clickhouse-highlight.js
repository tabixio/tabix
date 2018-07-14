const ch_keywords = (
    'SELECT|CASE|THEN|DISTINCT|INSERT|UPDATE|DELETE|WHERE|AND|OR|OFFSET|HAVING|AS|FROM|' +
    'WHEN|ELSE|END|TYPE|LEFT|RIGHT|JOIN|ON|OUTER|DESC|ASC|UNION|CREATE|TABLE|PRIMARY|KEY|' +
    'FOREIGN|NOT|REFERENCES|INNER|CROSS|NATURAL|DATABASE|DROP|GRANT|' +
    'ANY|BETWEEN|ATTACH|DETACH|CAST|WITH|BIT_AND|BIT_OR|TO|BIT_XOR|DESCRIBE|OPTIMIZE|PREWHERE|TOTALS|DATABASES|PROCESSLIST|SHOW|IF'
);

const ch_dataTypes = (
    'date|' +
    'integer|' +
    'uint8|uint16|uint32|uint64|int8|int16|int32|int64|float32|float64|datetime|enum8|enum16|' +
    'fixedstring|array|tuple|string'+
    'MergeTree|SummingMergeTree|ReplacingMergeTree|ReplicatedMergeTree|Buffer|ReplicatedCollapsingMergeTree|CollapsingMergeTree|AggregatingMergeTree|Merge|Memory|GraphiteMergeTree|ReplicatedAggregatingMergeTree|ReplicatedSummingMergeTree'
);

const ch_constants = (
    'true|false|NULL'
);
const ch_drawCommands = [
    'DRAW_GMAPS',
    'DRAW_GRAPH',
    'DRAW_PLOTLY',
    'DRAW_CALENDAR',
    'DRAW_TEXT',
    'DRAW_HEATMAP',
    'DRAW_CHART',
    'DRAW_BAR',
    'DRAW_GRIDCHART',
    'DRAW_FLATTREE',
    'DRAW_RIVER',
    'DRAW_RAW',
    'DRAW_SANKEYS',
    'DRAW_TREEMAP',
    'DRAW_C3',
    'DRAW_MAP'
];
const ch_doubleWordKeywords=[
    'INSERT INTO',
    'IF NOT EXISTS',
    'RENAME TABLE',
    'IF EXISTS',
    'GROUP BY',
    'ORDER BY',
    'UNION ALL',
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
    'CLEAR COLUMN IN PARTITION'
];
const ch_delimiter=';;';
export {
    ch_keywords,
    ch_dataTypes,
    ch_constants,
    ch_drawCommands,
    ch_doubleWordKeywords,
    ch_delimiter,
};