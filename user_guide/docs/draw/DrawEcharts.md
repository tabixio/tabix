## Direct chart by JS code


example

```sql

SELECT 1
DRAWECHARTS
function (d)
{
    console.log(d.data);
    console.log(d.meta);
    return {series:[]};
}


```


Function arguments : ( dataProvider  )

## Object data

dataProvider.data - result from SQL
dataProvider.meta - columns meta

