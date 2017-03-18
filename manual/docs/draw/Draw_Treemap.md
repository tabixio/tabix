## SQL


```sql
SELECT 'RU' as cntr,'MOS' as city,'Izmailovo' as Street,331 as counter
UNION ALL
SELECT 'RU' as cntr,'MOS' as city,'Shelkovo' as Street,931 as counter
UNION ALL
SELECT 'RU' as cntr,'MOS' as city,'Perovo' as Street,7331 as counter
UNION ALL
SELECT 'RU' as cntr,'SPB' as city, 'Centralnay' as Street,5331 as counter
UNION ALL
SELECT 'RU' as cntr,'SPB' as city, 'Vokzalnay' as Street,3413 as counter
UNION ALL
SELECT 'DE' as cntr,'Munxen' as city, 'Destren' as Street,8413 as counter
DRAW_TREEMAP
{
    path:'cntr.city.Street.counter'
}
```

![DRAW_Treemap](/img/draw-treemap.png)



Short :

```sql
SELECT 'RU' as cntr,'MOS' as city,'Izmailovo' as Street,331 as counter
UNION ALL
SELECT 'RU' as cntr,'MOS' as city,'Shelkovo' as Street,931 as counter
DRAW_TREEMAP
'cntr.city.Street.counter'

```


JSAPI :

* https://ecomfe.github.io/echarts-doc/public/en/option.html#series-treemap

Echarts examples :

* [Echarts Data Json](https://ecomfe.github.io/echarts-examples/public/data/asset/data/disk.tree.json)
* [Echarts example](https://ecomfe.github.io/echarts-examples/public/editor.html?c=treemap-disk)


```SQL
DRAW_TREEMAP
{
    path:'cntr.city.Street.counter',
    title:'My Title Chart',
    tooltip:'My tooltip',
    valueformat:'0.0b',//tooltip format by numbrojs

}

```

Original, the the data format of series-treemap.data is a forest.

```javascript
[ // Tips, the top level is an array.
    {
        value: 1212,
        children: [
            {
                value: 2323,    // The value of this node, indicating the area size.
                id: 'someid-1', // id is not mandatory.
                name: 'description of this node', // show the description text in rectangle.
                children: [...],
                label: {        // The label config of this node (if necessary).
                },
                itemStyle: {    // the itemStyle of this node (if necessary).
                }
            },
            {
                value: 4545,
                id: 'someid-2',
                name: 'description of this node',
                children: [
                    {
                        value: 5656,
                        id: 'someid-3',
                        name: 'description of this node',
                        children: [...]
                    },
                    ...
                ]
            }
        ]
    },
...

```



Convert table to forest :

```
| region | city | Street    | count_people |
| RU     | MSK  | Shelkovo  |   1232       |
| RU     | SPB  | Morskay   |   1211       |

=>

path : "region.city.street.count_people"

```



