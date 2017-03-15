Example

http://c3js.org/samples/simple_multiple.html

```sql
    
select 1

DRAW_C3
function (d)
{
    let x={
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ]
        }};
    return x;
}
    
```

