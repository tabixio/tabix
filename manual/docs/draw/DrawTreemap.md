https://en.wikipedia.org/wiki/Treemapping



JSAPI :

* https://ecomfe.github.io/echarts-doc/public/en/option.html#series-treemap

Echarts examples :

* [Echarts Data Json](https://ecomfe.github.io/echarts-examples/public/data/asset/data/disk.tree.json)
* [Echarts example](https://ecomfe.github.io/echarts-examples/public/editor.html?c=treemap-disk)


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

path : "region.city.street",
value:"count_people"




```

Use code :
http://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
+ lodash


