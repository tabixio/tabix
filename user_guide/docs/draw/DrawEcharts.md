## Direct chart by JS code


Доступно у любого типа DRAWMAP / DRAWC3 / DRAWCHART -> результат ф-ции передается в обьект графика как настройки


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

