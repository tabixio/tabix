https://docs.google.com/document/d/1HfG3eUX-IXvw_iyni-TFj7Uk0jQICqVWdMWLM5_foqQ/edit

## Виджеты

Идея: все что можно показывать в результате запроса - это виджет.
Результат запроса - данные, которые могут быть таблицей с предустановленной сортировкой, ECharts или PlotLy схемой с заданными параметрами (пресетами).

Это может быть просто текст, готовые реализации:
- https://grafana.com/grafana
- https://redash.io/

Для чего: для построения Dashboards.

Допустим у храню в базе все свои покупки, и написал, 3 запроса:

1) Получить список всем продуктов купленных в магазиние - хочу его в виде таблицы размером [3,6], с отображением
2) График в виде BAR для отображения самых покупаемых мной продуктов.
3) Сумма денег потраченная за каждый день.

## Gridser

Каждый виджет размещается в сетке Gridser, или похожем компоненте.
Для изменения его размера

http://take.ms/FYWoN



------

# Angular реализация

### class Widget - самый вернхий класс

```
this.data = DataProvider; // ссылка на данные в DataProvider
this.drawCommnads = draw;	// ссылка на описание комманды если она была указана в SQL [DRAW_BAR,DRAW_PLOTLY]
this.size[X,Y] - размеры в Gridser
this.isDark - светлая / темная тема
```

getSizeElementHeight & getSizeElementWidth - получить размеры внутри Gridser элемента при resize


### class WidgetDraw extends Widget - для ECharts

```
this._list = {
            // 'SCATTERMAP': DrawEcharts,
            'GRAPH': DrawEchartsGraph,
            'PLOTLY': DrawPlotly,
            'HEATMAP': DrawEchartsHeatmap,
            'CALENDAR': DrawEchartsCalendar,
            'RAW': DrawEchartsMap,
            'BAR': DrawEchartsBar,
            'RIVER': DrawEchartsRiver,
            'MAP': DrawEchartsMap,
            'GMAPS': DrawGoogleMap,
            'TREEMAP': DrawEchartsTreemap,
            'FLATTREE': DrawEchartsFlatTree,
            'SANKEYS': DrawEchartsSunkeys,
            'CHART': DrawEchartsChart,
            'GRIDCHART': DrawEchartsGridChart,
            'TEXT': DrawText,
        };
```
Список поддерживаемых комманд и класс соответсвия

Если была комманда BAR то вызываем класс `DrawEchartsBar`

```
// Если не указан размер то constructor предустановит
 if (!this.sizeX && !this.sizeY)
        {
            this.sizeX = 6;// ширина
            this.sizeY = 3;// высота
        }
```


### class WidgetTable extends Widget - отрисовка таблицы hotTable (handsonTable)

https://github.com/tabixio/tabix/blob/master/src/app/draw/widget-table.js

initTableWSize() - автоподстройка размера табилцы в Gridser исходя из данных

destroy() - нужно следить за утечкой в handsonTable

updateData() - если данные у DataProvider поменялись,

```
		this.data.update($data);
        this.handsonTable.loadData($data);
        this.handsonTable.updateSettings({
            columnSorting: {
                column: sortColumn,
                sortOrder
            }
        });
        this.handsonTable.render();
```
onResize() - при изменении размера

```
this.handsonTable.updateSettings(
            {
                width:new_W,
                height:new_H
            }
);

this.handsonTable.render();
```

### class DrawBasicChart - верхний класс для графиков

https://github.com/tabixio/tabix/blob/master/src/app/draw/draw.js

```
        this.init = false; // пока дочернии классы не сделали true - не рисовать
        this.options = {}; // настроики пустые


```

Ф-ции помошники справочники, относятся скорее к DataProvider ( там им и место )
```
isNumericColumn(col)
isStringColumn(col)
getColumnPosition(col)
haveColumn(col)
getColumnByType(type)
getDateTimeColumn()
getDateColumn()
getColumns(position)
getFirstColumn()
```


Комманды DRAW может содержать JavaScript код, пример:
https://tabix.io/doc/draw/Draw_Chart/

```
SELECT sin(number) as s,cos(number) as c,number
FROM system.numbers where number<12 LIMIT 12
DRAW_CHART
{
    xAxis:'number',
    yAxis:'s'
}
```

Означает отрисуй по оси X колонку number, по оси Y - колонку `s`


Реализация в Angular: 


```
constructor{ 
	 this.drawCodeObject = this.initDrawCodeObject(); 
} 


initDrawCodeObject() {       
  // оборачивем текст в скобки
  let code = '(' + codeDrawText + ')';
  // в лоб  eval 
  let obj = eval(code);
  // запоминаем тип это может быть число / обьект / строка
  let type = typeof obj;

  draw = {
      isok: true,
      code: obj,
      type: type,
      exec: !!(obj && obj.constructor && obj.call && obj.apply)
  };      
 return draw;
}   



```        



### class DrawEcharts extends DrawBasicChart - верхний класс для Echarts

https://github.com/tabixio/tabix/blob/master/src/app/draw/draw-echarts.js


Echarts строится из обьекта options, содержащего {dataZoom,textStyle,toolbox,series,legend,...}

Базовый класс - задает default options такие как dataZoom,title,legend ...
Орделяет как отрисовывать isDark=[0\1]


При создании ECharts можно в комманде DRAW сразу указать все что нужно в options 


```

preProcessor() {  // preProcessor вызывается до ф-ции create()


// обьединяем обьекты options 
initChartByJsCode() {
        if (this.isExecutableCode()) {
            // тут вызываем jscode -> резульатт this.options
            let o = this.executableCode();
            // обьединяем обьекты
            this.options = Object.assign(this.options, o);
            return true;
        }

        // Если это не код инициализация как обычно
        return false;
}


 	this.init = this.create(); // это доступно в классах ниже - т/к они реализуют этот "интерфейс" т/е содержат ф-цию create()             
}
}

```


getParameterPath - Нужен для комманды типа 

```
SELECT 'RU' as cntr,'SPB' as city,8 as value,'Centralnay' as Street,1 as strval
UNION ALL
SELECT 'RU' as cntr,'SPB' as city,8 as value,'Vokzalnay' as Street,3 as strval

DRAW_SANKEYS
{
    settings:'cntr.value.city.strval.Street'
}
```


Где перечисляются путь следования по колонкам  


https://tabix.io/doc/draw/Draw_Sankeys/ 



### class DrawEchartsChart extends DrawEcharts

  create() - все что нужно для постоения


  Далее каждый `DrawEcharts****` делает свою магию на данными и преобразует их в this.options.series, ищет колонки по типу номеру используя isNumericColumn|getColumnByType и т.д. 

### class DrawEchartsBar extends DrawEchartsChart

Фактически всю работу на себя берет DrawEchartsChart, тут просто говорим что делаем BAR  
```
  preCreate(drw) {
        this.preference.bar=true;
        return {
        };
    }
```    






### Последовательность 

Была идея сделать такую последовательность типа жизненный цикл виджета: 
```
> preProcessor()
-->preCreate()
-->create()
-->postCreate()
> postProcessor()
```
