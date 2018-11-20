import { TabEditorModel } from 'models';

const tabs: ReadonlyArray<TabEditorModel> = [
  TabEditorModel.from({
    title: 'SQL 1',
    content: `
SELECT toInt64(9007199254740900+number) as bkig FROM  numbers(4) ORDER BY number DESC 
;;
SELECT 
toFloat32(sin(rand())) as xF32,
toFloat64(sin(rand())) as xF64,
now(),
toInt64(9007199254740982+number) as gran,
toInt64(11117311154531369000+number) as singun,
toUInt64(11117311154531369000+number) as nunun,
toInt16(now()+number) as xInt16,
toInt32(now()+number) as xInt32,
toInt64(now()+number) as xInt64
FROM  numbers(10) ORDER BY number DESC
;;
select * from cities
;;
SELECT * FROM system.tables FORMAT TSV
;;
SELECT 33 FORMAT JSON 
;;
SELECT 44 
;;
SELECT 55
;;
select number,sin(number) as sin,cos(number) as cos FROM  numbers(123) ORDER BY number DESC
;;
SELECT * FROM system.tables

`,
    currentDatabase: 'default',
  }),
  TabEditorModel.from({
    title: 'SQL 2',
    content: `CREATE TABLE data (ts DATETIME,id VARCHAR,version UInt64, v0 Nullable(DOUBLE), v1 Nullable(DOUBLE)) ENGINE=Null
CREATE MATERIALIZED VIEW dataAgg ENGINE=AggregatingMergeTree PARTITION BY toStartOfDay(ts) ORDER BY (ts,id) AS SELECT ts, id, maxState(version) as version, anyLastState(v0) as v0, anyLastState(v1) as v1 FROM (select * from data order by version) GROUP BY ts,id;

insert into data values(toDateTime('2018-10-11 08:00:00'),'id1',0,0.0,null);
insert into data values(toDateTime('2018-10-11 08:00:00'), 'id1',3,3.0,3.0);
insert into data values(toDateTime('2018-10-11 08:00:00'),'id1',1,1.0,1.0);
insert into data values(toDateTime('2018-10-11 08:00:00'),'id1',2,2.0,2.0);

select ts,id,maxMerge(version),anyLastMerge(v0),anyLastMerge(v1) from (select * from dataAgg order by version) group by ts,id;
;;

SELECT 323;;73709551615, 0xDEADBEEF, 01, 0.1, 1e100, -1e-100, inf, nan
;;
SELECT arrayFilter(x -> x LIKE '%World%', ['Hello', 'abc World']) AS res
;;
SELECT field2 , sin(number) as sin  FROM system.numbers
sin( cos(DepTimeBlk) ) , bar(123)  -- support.function 
var1 , var2 , var3          -- markup.heading
OriginWac,DepTimeBlk,DepTime,OriginAirportSeqID      -- variable.parameter
true|false|NULL    -- const
system.numbers_mt | system.numbers -- tables
ReplicatedCollapsingMergeTree -- dataTypes
SYSTEM RELOAD CONFIG -- doubleSysWord

CREATE TABLE IF NOT EXISTS all_hits ON CLUSTER cluster (p Date, i Int32) ENGINE = Distributed(cluster, default, hits)
DROP DATABASE IF EXISTS db ON CLUSTER cluster
SHOW TEMPORARY TABLES FROM default LIKE 'pattern' INTO OUTFILE filename FORMAT JSON
SELECT s, arr, a FROM arrays_test ARRAY JOIN arr AS a
;;
SELECT
  domainWithoutWWW(URL) AS domain,
  domainWithoutWWW(REFERRER_URL) AS referrer,
  device_type,
  count() cnt
FROM hits
GROUP BY domain, referrer, device_type
ORDER BY cnt DESC
LIMIT 5 BY domain, device_type
LIMIT 100
;;
1, 18446744073709551615, 0xDEADBEEF, 01, 0.1, 1e100, -1e-100, inf, nan
;;
1 + 2 * 3 + 4
;;
SELECT arrayFilter(x -> x LIKE '%World%', ['Hello', 'abc World']) AS res
;;SELECT 1 as ping;;SELECT 2 as ping;;
SELECT 3
;; 
SELECT * from default.arrays_test_ints`,
    currentDatabase: 'default',
  }),
];

export default tabs;
