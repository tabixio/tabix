### Scatter

```sql
select number as nu,
sin(number) as s,
cos(number) as c 
from system.numbers limit 40
DRAW_PLOTLY { 
    trace:{x:data.nu,y:data.s,type:'scatter',name:'sin()'},
    trace1:{x:data.nu,y:data.c,type:'scatter',name:'cos()'}
}
```


### 3D

```sql
select number as nu,
sin(number) as s,
cos(number) as c 
from system.numbers limit 100
DRAW_PLOTLY { 
    trace:{x:data.nu,y:data.s,z:data.c,type:'scatter3d'},
    
    
    layout : {
            title: 'sinsin+coscos Plot',
            showlegend: false,
            autosize: true,
              scene: {
                xaxis: {title: 'number'},
                yaxis: {title: 'sinsin'},
                zaxis: {title: 'coscos'}
              }
}
}
```

