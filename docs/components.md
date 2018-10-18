
## ACE JS

add props

* dataStructure - must be API.getDatabaseStructure instance of `DatabaseStructure`
* currentDatabaseName - string

```javascript
    async connect()
    {
        let connection={host:'http://tabix.dev7:8123/',login:'default',password:''};
        let a=new API(connection);
        await a.init();
        this.dataStructure=a.getDatabaseStructure();
        this.currentDatabaseName='default';
        // this.forceUpdate();
    }
    render() {
        return (
                    <AceEditor
                        mode="clickhouse" focus={true}
                        theme="cobalt"
                        onChange={this.onChange}
                        dataStructure={this.dataStructure}
                        currentDatabaseName={this.currentDatabaseName}
                        name="UNIQUE_ID_OF_DIV"

                    />
        )
    }

```


## HotTable

HotTable support props:

* dark - Bool
* `data` if data instance of `DataDecorator` - auto render result from Query



```javascript

    // load data
    async connect()
    {
        let connection={host:'http://tabix.dev7:8123/',login:'default',password:''};
        let a=new API(connection);
        this.sinCosData=await a.fetch('select number,sin(number) as sin,cos(number) as cos FROM system.numbers LIMIT 100');
    }


    render() {
        if (this.sinCosData)
        {
            table= <HotTable dark='true' data={this.sinCosData} width='600' height='300' />;
        } else {
            table= <div>Data not load</div>;
        }

        return (
                  <div>  {table}  </div>
        )
    }

```