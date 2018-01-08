@todo - write here@

{
    {
    
    }
}

Per server : 

* Functions Lists 
* Dictionaries
* Databases 
* Tables.columns
 
 
 
Need : 
* getAllFieldsInDatabase(_dbname_) === {uciq_fields}
* getUniqueDatabaseTables()
* getAllFieldsInDatabase(_dbname_)
 

All support engine must return array
```

"type": "clickhouse",
"id": "chDevelop2",
"structure": {
    "columns": [
        {
            "database": "default",
            "table": "arrays_test",
            "name": "s",
            "type": "String",
            "default_kind": "",
            "default_expression": "",
            "data_compressed_bytes": "0",
            "data_uncompressed_bytes": "0",
            "marks_bytes": "0",
            "title":"",
        },
    ....],
"databases": [
        {
            "name": "default"
        },
    ....],
"dictionaries": [
        
        ],
 "functions": [
                 {
                     "name": "findClusterIndex",
                     "is_aggregate": 0
                 },
            ....],
"tables": [
                {
                    "database": "default",
                    "name": "arrays_test",
                    "engine": "Memory"
                },
            ....],



meta:[ ]
data:[ ]
```