
## Tabix\DBS\Storage:function structure()

need return array with [`columns`,`tables`,`databases`], and [`functions`,`dictionaries`]


### columns 
```
[       {
            "database": "etldata",
            "table": "ead_tags",
            "name": "comment",
            "type": "varchar(255)",
            "default_kind": null,
            "default_expression": "",
            "title": "Comment text"
        },
]

```

### tables 

```
[  {
            "database": "etldata",
            "name": "ead_tags",
            "engine": "InnoDB",
            "sizedata": "16384",
            "sizeindex": "32768"
   },]
```


### functions

``` 
{
     "name": "findClusterIndex",
     "is_aggregate": 0, 
     "title" : ""
},
```


### dictionaries

```
"dictionaries": 
[
        {   
        
        }
],
```

## Client 

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



columns : [ "server_id"."database"."table"."name_column" ]  = 
    [
                    "server_id" : "___",
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
    ]

servers : ["server_name"] = 
    [
        "type":"clickhouse",
        "databases" : ['name1','name2'],
        "dictionaries" : [...],
        "tables" : [
                { 
                    "database": "default",
                    "name": "arrays_test",
                    "engine": "Memory",
                    "title":"",
                }
        ]        
    ]




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

 "functions": [
                
            ....],
"tables": [
                {
                    "database": "default",
                    "name": "arrays_test",
                    "engine": "Memory",
                    "title":"",
                },
            ....],



meta:[ ]
data:[ ]
```
